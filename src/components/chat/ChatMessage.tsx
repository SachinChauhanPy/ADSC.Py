import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  isDark?: boolean;
}

/**
 * Markdown renderer for bot responses inside a small chat widget.
 * Handles: ### headings, **bold**, [links](url), `code`,
 * bullet/numbered lists, table rows → bullet conversion, and line breaks.
 * Accepts isDark to adapt text colors.
 */
function renderContent(content: string, isDark: boolean): React.ReactNode[] {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    // ── Skip table separator lines like |---|---|
    if (/^\|[-\s|:]+\|$/.test(trimmed)) {
      return;
    }

    // ── Markdown heading: ### Title, ## Title, # Title
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const sizeClass = level === 1
        ? 'text-[14px] font-extrabold'
        : 'text-[13px] font-bold';
      elements.push(
        <p key={lineIdx} className={`${sizeClass} mt-1.5 mb-0.5 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
          {renderInline(text, isDark)}
        </p>
      );
      return;
    }

    // ── Horizontal rule: --- or ***
    if (/^[-*_]{3,}$/.test(trimmed)) {
      elements.push(
        <div key={lineIdx} className={`border-t my-1.5 ${isDark ? 'border-zinc-700' : 'border-zinc-200'}`} />
      );
      return;
    }

    // ── Markdown table row: | cell | cell | → convert to bullet list item
    if (/^\|(.+)\|$/.test(trimmed)) {
      const cells = trimmed
        .split('|')
        .map(c => c.trim())
        .filter(c => c.length > 0);

      if (cells.length > 0) {
        const formatted = cells.length >= 2
          ? `**${cells[0]}** — ${cells.slice(1).join(' · ')}`
          : cells[0];

        elements.push(
          <div key={lineIdx} className="flex items-start gap-1.5 ml-1">
            <span className="text-[#FFD43B] font-bold text-xs mt-0.5 shrink-0">▸</span>
            <span>{renderInline(formatted, isDark)}</span>
          </div>
        );
      }
      return;
    }

    // ── Bullet list item: - item, * item, • item
    const bulletMatch = trimmed.match(/^[-•*]\s+(.*)/);
    if (bulletMatch) {
      elements.push(
        <div key={lineIdx} className="flex items-start gap-1.5 ml-1">
          <span className="text-[#FFD43B] font-bold text-xs mt-0.5 shrink-0">▸</span>
          <span>{renderInline(bulletMatch[1], isDark)}</span>
        </div>
      );
      return;
    }

    // ── Numbered list item: 1. item, 2) item
    const numMatch = trimmed.match(/^(\d+)[.)]\s+(.*)/);
    if (numMatch) {
      elements.push(
        <div key={lineIdx} className="flex items-start gap-1.5 ml-1">
          <span className="text-[#4285F4] font-bold text-xs mt-0.5 shrink-0 font-mono">{numMatch[1]}.</span>
          <span>{renderInline(numMatch[2], isDark)}</span>
        </div>
      );
      return;
    }

    // ── Empty line → small spacer
    if (trimmed === '') {
      elements.push(<div key={lineIdx} className="h-1" />);
      return;
    }

    // ── Normal text paragraph
    elements.push(
      <p key={lineIdx} className="leading-relaxed">
        {renderInline(trimmed, isDark)}
      </p>
    );
  });

  return elements;
}

/** Inline markdown: **bold**, `code`, [text](url) */
function renderInline(text: string, isDark: boolean): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // **bold**
      parts.push(
        <strong key={match.index} className={`font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // `code`
      parts.push(
        <code
          key={match.index}
          className={`px-1 py-0.5 text-[11px] font-mono border break-all ${
            isDark
              ? 'bg-zinc-700 text-zinc-200 border-zinc-600'
              : 'bg-zinc-100 text-zinc-800 border-zinc-200'
          }`}
        >
          {match[3]}
        </code>
      );
    } else if (match[4] && match[5]) {
      // [text](url)
      parts.push(
        <a
          key={match.index}
          href={match[5]}
          target="_blank"
          rel="noreferrer"
          className={`underline underline-offset-2 font-bold break-all transition-colors ${
            isDark ? 'text-[#7aafff] hover:text-white' : 'text-[#3367D6] hover:text-[#1a4299]'
          }`}
        >
          {match[4]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export function ChatMessageBubble({ role, content, isStreaming, isDark = false }: ChatMessageProps) {
  const isBot = role === 'assistant';

  return (
    <div
      className={`flex items-start gap-2.5 chat-message-enter ${
        isBot ? 'justify-start' : 'justify-end'
      }`}
    >
      {/* Bot avatar */}
      {isBot && (
        <div className={`shrink-0 w-7 h-7 border-2 bg-[#FFD43B] flex items-center justify-center ${
          isDark
            ? 'border-zinc-600 shadow-[2px_2px_0px_0px_#3f3f46]'
            : 'border-zinc-900 shadow-[2px_2px_0px_0px_#121212]'
        }`}>
          <Bot className="w-4 h-4 text-zinc-900" />
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`max-w-[88%] sm:max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed border-2 break-words overflow-hidden ${
          isBot
            ? isDark
              ? 'bg-zinc-800 text-zinc-300 border-zinc-700 shadow-[2px_2px_0px_0px_#3f3f46]'
              : 'bg-white text-zinc-800 border-zinc-900 shadow-[2px_2px_0px_0px_#121212]'
            : isDark
              ? 'bg-[#3367D6] text-white border-zinc-600 shadow-[2px_2px_0px_0px_#3f3f46]'
              : 'bg-[#4285F4] text-white border-zinc-900 shadow-[2px_2px_0px_0px_#121212]'
        }`}
      >
        <div className="space-y-1">
          {renderContent(content, isDark)}
        </div>
        {isStreaming && (
          <span className={`inline-block w-1.5 h-4 ml-0.5 animate-pulse ${isDark ? 'bg-zinc-500' : 'bg-zinc-400'}`} />
        )}
      </div>

      {/* User avatar */}
      {!isBot && (
        <div className={`shrink-0 w-7 h-7 border-2 bg-[#4285F4] flex items-center justify-center ${
          isDark
            ? 'border-zinc-600 shadow-[2px_2px_0px_0px_#3f3f46]'
            : 'border-zinc-900 shadow-[2px_2px_0px_0px_#121212]'
        }`}>
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}
