import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Sparkles, RotateCcw } from 'lucide-react';
import { ChatMessageBubble } from './ChatMessage';
import { chatWithGroqStream, type ChatMessage } from '../../lib/groqClient';

import { useTheme } from '../../hooks/useTheme';

interface DisplayMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

const STARTER_QUESTIONS = [
  '🐍 What learning paths does ADSC.Py offer?',
  '📅 Any upcoming sessions or workshops?',
  '🚀 How can I join the community?',
  '💼 What opportunities are available?',
  '🛠️ Show me project blueprints',
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Lock body scroll on mobile when chat is full-screen open
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 639px)').matches;
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  const buildConversationHistory = (): ChatMessage[] => {
    return messages
      .filter(m => !m.isStreaming)
      .map(m => ({ role: m.role, content: m.content }));
  };

  const handleSend = async (messageText?: string) => {
    const text = (messageText || input).trim();
    if (!text || isLoading) return;

    setInput('');
    setHasError(false);

    // Add user message
    const userMsg: DisplayMessage = {
      id: generateId(),
      role: 'user',
      content: text,
    };

    // Add placeholder assistant message for streaming
    const botMsgId = generateId();
    const botMsg: DisplayMessage = {
      id: botMsgId,
      role: 'assistant',
      content: '',
      isStreaming: true,
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setIsLoading(true);

    const conversationHistory = buildConversationHistory();

    await chatWithGroqStream(
      conversationHistory,
      text,
      // onChunk — append text to the streaming message
      (chunk) => {
        setMessages(prev =>
          prev.map(m =>
            m.id === botMsgId
              ? { ...m, content: m.content + chunk }
              : m
          )
        );
      },
      // onDone — mark streaming as complete
      () => {
        setMessages(prev =>
          prev.map(m =>
            m.id === botMsgId ? { ...m, isStreaming: false } : m
          )
        );
        setIsLoading(false);
      },
      // onError — show error in the bot message
      (error) => {
        setMessages(prev =>
          prev.map(m =>
            m.id === botMsgId
              ? {
                  ...m,
                  content: `⚠️ ${error.message || 'Something went wrong. Please try again.'}`,
                  isStreaming: false,
                }
              : m
          )
        );
        setIsLoading(false);
        setHasError(true);
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleStarterClick = (question: string) => {
    // Remove the emoji prefix for a cleaner query
    const cleanQuestion = question.replace(/^[^\w]*/, '').trim();
    handleSend(cleanQuestion);
  };

  const handleReset = () => {
    setMessages([]);
    setHasError(false);
  };

  return (
    <>
      {/* ── Floating Chat Button ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-[#FFD43B] border-2 border-zinc-900 shadow-[4px_4px_0px_0px_var(--pixel-shadow-color)] flex items-center justify-center hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--pixel-shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_var(--pixel-shadow-color)] transition-all duration-150 cursor-pointer chat-button-bounce group"
          aria-label="Open ADSC Bot chat"
          id="adsc-chat-trigger"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* ── Chat Panel ── */}
      {isOpen && (
        <div
          className={`fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full h-[100dvh] sm:w-[420px] sm:h-[580px] sm:max-h-[85vh] flex flex-col border-0 sm:border-2 shadow-none sm:shadow-[6px_6px_0px_0px_var(--pixel-shadow-color)] chat-panel-enter transition-all duration-200 ${
            isDark
              ? 'bg-zinc-900 border-zinc-700'
              : 'bg-white border-zinc-900'
          }`}
          role="dialog"
          aria-label="ADSC Bot Chat"
          id="adsc-chat-panel"
        >
          {/* ── Header ── */}
          <div className={`flex items-center justify-between px-4 py-3 shrink-0 border-b-2 transition-colors duration-300 ${
            isDark
              ? 'bg-zinc-950 text-white border-zinc-700'
              : 'bg-zinc-900 text-white border-zinc-900'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#FFD43B] border-2 border-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-zinc-900" />
              </div>
              <div>
                <h3 className="font-pixel text-xs leading-none tracking-wide">ADSC BOT</h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  {isLoading ? 'Thinking...' : 'Online • ADSC.Py Assistant'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleReset}
                  className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="Reset conversation"
                  title="New conversation"
                >
                  <RotateCcw className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* ── Messages Area ── */}
          <div
            ref={chatContainerRef}
            className={`flex-1 overflow-y-auto px-3.5 sm:px-4 py-4 space-y-3 chat-scrollbar transition-colors duration-300 ${
              isDark
                ? 'bg-zinc-900 chat-scrollbar-dark'
                : 'bg-zinc-50/50 bg-pixel-grid-dense'
            }`}
          >
            {/* Welcome message when empty */}
            {messages.length === 0 && (
              <div className="space-y-4 chat-message-enter">
                {/* Bot intro */}
                <div className="flex items-start gap-2.5">
                  <div className={`shrink-0 w-7 h-7 border-2 bg-[#FFD43B] flex items-center justify-center ${
                    isDark
                      ? 'border-zinc-600 shadow-[2px_2px_0px_0px_#3f3f46]'
                      : 'border-zinc-900 shadow-[2px_2px_0px_0px_#121212]'
                  }`}>
                    <Sparkles className="w-4 h-4 text-zinc-900" />
                  </div>
                  <div className={`max-w-[88%] sm:max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed border-2 ${
                    isDark
                      ? 'border-zinc-700 bg-zinc-800 text-zinc-200 shadow-[2px_2px_0px_0px_#3f3f46]'
                      : 'border-zinc-900 bg-white text-zinc-800 shadow-[2px_2px_0px_0px_#121212]'
                  }`}>
                    <p className={`font-bold mb-1 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                      Hey there! 👋 I'm ADSC Bot
                    </p>
                    <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>
                      I can help you explore ADSC.Py — learning paths, sessions, projects, opportunities, and more. Ask me anything about the community!
                    </p>
                  </div>
                </div>

                {/* Starter questions */}
                <div className="pl-7 sm:pl-9 space-y-1.5">
                  <p className={`text-[10px] font-pixel uppercase tracking-wider ${
                    isDark ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>Try asking:</p>
                  {STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleStarterClick(q)}
                      className={`block w-full text-left px-3 py-2 text-[12px] font-medium border-2 transition-all duration-150 cursor-pointer break-words ${
                        isDark
                          ? 'text-zinc-300 bg-zinc-800 border-zinc-700 hover:border-zinc-500 hover:shadow-[2px_2px_0px_0px_#3f3f46] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                          : 'text-zinc-700 bg-white border-zinc-200 hover:border-zinc-900 hover:shadow-[2px_2px_0px_0px_#121212] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg) => (
              <ChatMessageBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
                isStreaming={msg.isStreaming}
                isDark={isDark}
              />
            ))}

            {/* Typing indicator */}
            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="flex items-center gap-2.5 pl-0.5">
                <div className={`shrink-0 w-7 h-7 border-2 bg-[#FFD43B] flex items-center justify-center ${
                  isDark
                    ? 'border-zinc-600 shadow-[2px_2px_0px_0px_#3f3f46]'
                    : 'border-zinc-900 shadow-[2px_2px_0px_0px_#121212]'
                }`}>
                  <Sparkles className="w-4 h-4 text-zinc-900" />
                </div>
                <div className={`flex items-center gap-1 px-3 py-2 border-2 ${
                  isDark
                    ? 'border-zinc-700 bg-zinc-800 shadow-[2px_2px_0px_0px_#3f3f46]'
                    : 'border-zinc-900 bg-white shadow-[2px_2px_0px_0px_#121212]'
                }`}>
                  <span className={`typing-dot w-1.5 h-1.5 rounded-full ${isDark ? 'bg-zinc-500' : 'bg-zinc-400'}`} />
                  <span className={`typing-dot w-1.5 h-1.5 rounded-full [animation-delay:0.15s] ${isDark ? 'bg-zinc-500' : 'bg-zinc-400'}`} />
                  <span className={`typing-dot w-1.5 h-1.5 rounded-full [animation-delay:0.3s] ${isDark ? 'bg-zinc-500' : 'bg-zinc-400'}`} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input Area ── */}
          <div className={`shrink-0 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t-2 transition-colors duration-300 ${
            isDark
              ? 'bg-zinc-950 border-zinc-700'
              : 'bg-white border-zinc-900'
          }`}>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isLoading ? 'ADSC Bot is thinking...' : 'Ask about ADSC.Py...'}
                disabled={isLoading}
                className={`flex-1 px-3 py-2.5 text-base sm:text-[13px] border-2 focus:outline-none focus:ring-2 focus:ring-[#FFD43B] focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors duration-300 ${
                  isDark
                    ? 'border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:ring-offset-zinc-950'
                    : 'border-zinc-900 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-offset-white'
                }`}
                id="adsc-chat-input"
                autoComplete="off"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`w-10 h-10 bg-[#4285F4] border-2 text-white flex items-center justify-center hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 cursor-pointer shrink-0 ${
                  isDark
                    ? 'border-zinc-600 shadow-[2px_2px_0px_0px_#3f3f46] hover:shadow-[3px_3px_0px_0px_#3f3f46] active:shadow-[0px_0px_0px_0px_#3f3f46] disabled:hover:shadow-[2px_2px_0px_0px_#3f3f46]'
                    : 'border-zinc-900 shadow-[2px_2px_0px_0px_#121212] hover:shadow-[3px_3px_0px_0px_#121212] active:shadow-[0px_0px_0px_0px_#121212] disabled:hover:shadow-[2px_2px_0px_0px_#121212]'
                }`}
                aria-label="Send message"
                id="adsc-chat-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className={`text-[9px] mt-1.5 text-center font-mono ${
              isDark ? 'text-zinc-600' : 'text-zinc-400'
            }`}>
              Powered by Groq • ADSC.Py Community AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
