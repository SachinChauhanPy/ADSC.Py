import React, { useState, useEffect, useRef } from 'react';
import type { MetaFunction } from 'react-router';
import { Link, useLocation } from 'react-router';
import { Shell } from '../components/layout/Shell';
import { getSeoMeta } from '../lib/seo';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Volume2, VolumeX, Sparkles, HelpCircle, RotateCcw, ArrowLeft } from 'lucide-react';

export const meta: MetaFunction = ({ location }) => {
  return getSeoMeta('not-found', [
    { title: "404 — Syntax Error Minigame | ADSC.Py" },
    { name: "description", content: "Oops! Page not found. Demolish the pixelated 404 bricks to resolve the route!" }
  ], location.pathname);
};

// Spell out "404" using a high-density 25-column by 9-row pixel grid
const PIXEL_404_GRID = [
  // C1: '4'               spacing   C2: '0'               spacing   C3: '4'
  [0,0,0,1,1,0,0,          0,0,      0,1,1,1,1,1,0,        0,0,      0,0,0,1,1,0,0], // Row 0
  [0,0,1,0,1,0,0,          0,0,      1,1,0,0,0,1,1,        0,0,      0,0,1,0,1,0,0], // Row 1
  [0,1,0,0,1,0,0,          0,0,      1,0,0,0,0,0,1,        0,0,      0,1,0,0,1,0,0], // Row 2
  [1,0,0,0,1,0,0,          0,0,      1,0,0,0,0,0,1,        0,0,      1,0,0,0,1,0,0], // Row 3
  [1,1,1,1,1,1,1,          0,0,      1,0,0,0,0,0,1,        0,0,      1,1,1,1,1,1,1], // Row 4
  [0,0,0,0,1,0,0,          0,0,      1,0,0,0,0,0,1,        0,0,      0,0,0,0,1,0,0], // Row 5
  [0,0,0,0,1,0,0,          0,0,      1,0,0,0,0,0,1,        0,0,      0,0,0,0,1,0,0], // Row 6
  [0,0,0,0,1,0,0,          0,0,      1,1,0,0,0,1,1,        0,0,      0,0,0,0,1,0,0], // Row 7
  [0,0,0,0,1,0,0,          0,0,      0,1,1,1,1,1,0,        0,0,      0,0,0,0,1,0,0]  // Row 8
];

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  active: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
}

export default function NotFoundPage() {
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [ballMoving, setBallMoving] = useState<boolean>(false);

  // Mutable Game State Reference (800x450 base coordinates)
  const stateRef = useRef({
    ballX: 400,
    ballY: 400,
    ballDx: 1.2, // Very slow, easy to track speed
    ballDy: -1.2,
    ballRadius: 9,
    paddleX: 340,
    paddleWidth: 120,
    paddleHeight: 12,
    paddleY: 420,
    bricks: [] as Brick[],
    particles: [] as Particle[],
    lives: 3,
    score: 0,
    ballMoving: false,
    gameOver: false,
    gameWon: false
  });

  // Sound Synth Helpers (Web Audio API)
  const playSound = (type: 'brick' | 'paddle' | 'lose' | 'win') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'brick') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(580, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'paddle') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(170, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(210, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === 'lose') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'win') {
        const now = ctx.currentTime;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(261.63, now); // C4
        osc.frequency.setValueAtTime(329.63, now + 0.1); // E4
        osc.frequency.setValueAtTime(392.00, now + 0.2); // G4
        osc.frequency.setValueAtTime(523.25, now + 0.3); // C5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start();
        osc.stop(now + 0.5);
      }
    } catch (e) {
      console.warn("Audio Context blocked.", e);
    }
  };

  // Initialize Bricks Grid (Spells 404 in high-density layout)
  const initBricks = () => {
    const brickRows = 9;
    const brickCols = 25;
    const brickWidth = 24;
    const brickHeight = 16;
    const brickPadding = 3;
    const offsetTop = 60;
    const offsetLeft = 64; // centers the spelling on an 800px canvas
    const rowColors = [
      '#EA4335', '#EA4335', // Google Red
      '#FBBC04', '#FBBC04', // Google Yellow
      '#34A853', '#34A853', // Google Green
      '#4285F4', '#4285F4', // Google Blue
      '#9333EA'             // Purple Accent
    ];

    const newBricks: Brick[] = [];
    for (let r = 0; r < brickRows; r++) {
      for (let c = 0; c < brickCols; c++) {
        if (PIXEL_404_GRID[r][c] === 1) {
          const brickX = c * (brickWidth + brickPadding) + offsetLeft;
          const brickY = r * (brickHeight + brickPadding) + offsetTop;
          newBricks.push({
            x: brickX,
            y: brickY,
            width: brickWidth,
            height: brickHeight,
            color: rowColors[r],
            active: true
          });
        }
      }
    }
    return newBricks;
  };

  // Exploding Particle Burst Effect
  const spawnParticles = (x: number, y: number, color: string) => {
    const s = stateRef.current;
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      s.particles.push({
        x: x + 12,
        y: y + 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        alpha: 1.0,
        size: 2 + Math.random() * 3
      });
    }
  };

  const resetBall = () => {
    const s = stateRef.current;
    s.ballMoving = false;
    setBallMoving(false);
    s.ballX = s.paddleX + s.paddleWidth / 2;
    s.ballY = s.paddleY - s.ballRadius;
    s.ballDx = (Math.random() > 0.5 ? 1.2 : -1.2);
    s.ballDy = -1.2;
  };

  const restartGame = () => {
    const s = stateRef.current;
    s.bricks = initBricks();
    s.particles = [];
    s.lives = 3;
    s.score = 0;
    s.gameOver = false;
    s.gameWon = false;
    s.paddleX = 340;

    setLives(3);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    resetBall();
  };

  const launchBall = () => {
    const s = stateRef.current;
    if (s.gameOver || s.gameWon || s.ballMoving) return;
    s.ballMoving = true;
    setBallMoving(true);
  };

  // Setup control listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = ((e.clientX - rect.left) / rect.width) * 800;
      const s = stateRef.current;
      s.paddleX = Math.max(0, Math.min(800 - s.paddleWidth, relativeX - s.paddleWidth / 2));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (e.key === 'ArrowRight' || e.key === 'Right') {
        s.paddleX = Math.min(800 - s.paddleWidth, s.paddleX + 25);
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        s.paddleX = Math.max(0, s.paddleX - 25);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        launchBall();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const relativeX = ((touch.clientX - rect.left) / rect.width) * 800;
      const s = stateRef.current;
      s.paddleX = Math.max(0, Math.min(800 - s.paddleWidth, relativeX - s.paddleWidth / 2));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchmove', handleTouchMove);

    restartGame();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Frame Draw & Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const draw = () => {
      const s = stateRef.current;

      // Draw Retro Screen background
      ctx.fillStyle = '#18181b'; // zinc-900
      ctx.fillRect(0, 0, 800, 450);

      // CRT Scan lines
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      for (let i = 0; i < 800; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 450);
        ctx.stroke();
      }
      for (let j = 0; j < 450; j += 40) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(800, j);
        ctx.stroke();
      }

      // Draw Brick blocks
      s.bricks.forEach((brick) => {
        if (brick.active) {
          ctx.fillStyle = brick.color;
          ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
          
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);

          // Top glare highlight
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fillRect(brick.x + 2, brick.y + 2, brick.width - 4, 3);
        }
      });

      // Draw Particles
      s.particles = s.particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        return p.alpha > 0;
      });

      s.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      });

      // Rest ball on paddle if not launched
      if (!s.ballMoving && !s.gameOver && !s.gameWon) {
        s.ballX = s.paddleX + s.paddleWidth / 2;
        s.ballY = s.paddleY - s.ballRadius;
      }

      // Draw Paddle
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(s.paddleX, s.paddleY, s.paddleWidth, s.paddleHeight);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(s.paddleX, s.paddleY, s.paddleWidth, s.paddleHeight);

      // Draw Python Ball (Green circle with snake eyes)
      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, s.ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#34A853';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();

      // Snake eyes
      ctx.fillStyle = '#FFD43B';
      ctx.fillRect(s.ballX - 3, s.ballY - 3, 2, 2);
      ctx.fillRect(s.ballX + 1, s.ballY - 3, 2, 2);

      // Prompt text overlay
      if (!s.ballMoving && !s.gameOver && !s.gameWon) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Courier, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK SCREEN OR PRESS SPACE TO LAUNCH PYTHON BALL', 400, 360);
      }

      // Game engine math
      if (s.ballMoving && !s.gameOver && !s.gameWon) {
        // Left/Right wall bounces
        if (s.ballX + s.ballDx > 800 - s.ballRadius || s.ballX + s.ballDx < s.ballRadius) {
          s.ballDx = -s.ballDx;
          playSound('paddle');
        }
        // Top wall bounces
        if (s.ballY + s.ballDy < s.ballRadius) {
          s.ballDy = -s.ballDy;
          playSound('paddle');
        }

        // Paddle hit bounces
        if (s.ballY + s.ballDy > s.paddleY - s.ballRadius) {
          if (s.ballX > s.paddleX && s.ballX < s.paddleX + s.paddleWidth) {
            s.ballDy = -s.ballDy;
            // Angling based on impact offset
            const hitPoint = s.ballX - (s.paddleX + s.paddleWidth / 2);
            s.ballDx = hitPoint * 0.08;
            playSound('paddle');
          } else if (s.ballY + s.ballDy > 450) {
            // Drop ball
            s.lives -= 1;
            setLives(s.lives);
            playSound('lose');
            if (s.lives === 0) {
              s.gameOver = true;
              setGameOver(true);
            } else {
              resetBall();
            }
          }
        }

        // Brick collision grid loop
        for (let i = 0; i < s.bricks.length; i++) {
          const b = s.bricks[i];
          if (b.active) {
            if (
              s.ballX > b.x - s.ballRadius &&
              s.ballX < b.x + b.width + s.ballRadius &&
              s.ballY > b.y - s.ballRadius &&
              s.ballY < b.y + b.height + s.ballRadius
            ) {
              b.active = false;
              s.ballDy = -s.ballDy;
              s.score += 10;
              setScore(s.score);
              playSound('brick');
              spawnParticles(b.x, b.y, b.color);

              // Check Win
              const activeCount = s.bricks.filter(brick => brick.active).length;
              if (activeCount === 0) {
                s.gameWon = true;
                setGameWon(true);
                playSound('win');
              }
              break;
            }
          }
        }

        // Move Ball
        s.ballX += s.ballDx;
        s.ballY += s.ballDy;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [soundEnabled]);

  return (
    <Shell>
      <div className="max-w-5xl mx-auto py-4 px-4 space-y-8 select-none">
        
        {/* Navigation Breadcrumbs */}
        <div className="text-left">
          <Breadcrumbs items={[{ name: 'Page Not Found', item: '/404' }]} />
        </div>

        {/* Page Title & Error Banner */}
        <div className="text-center space-y-3">
          <div className="pixel-badge bg-[#EA4335] text-white inline-flex items-center gap-1 font-bold">
            <span>SYS_STATUS_404</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            IndentationError: Page Not Aligned
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-semibold max-w-xl mx-auto">
            You got trapped in Tutorial Hell! Smash the pixelated 404 blocks with the Python ball to resolve the route.
          </p>
        </div>

        {/* FULL PAGE DYNAMIC GAMEBOARD */}
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Status Parameters Bar */}
          <div className="pixel-card-static p-4 bg-zinc-950 text-white flex items-center justify-between font-mono text-xs border-2 border-zinc-900 shadow-[4px_4px_0px_#121212] select-none">
            <div className="flex items-center gap-6">
              <span>SCORE: <strong className="text-[#FFD43B] font-bold">{score}</strong></span>
              <span>LIVES: <strong className="text-[#EA4335] font-bold">{"❤️".repeat(lives)}</strong></span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1 hover:text-white text-zinc-400"
                title={soundEnabled ? "Mute Game Sounds" : "Unmute Game Sounds"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <span className={`px-2 py-0.5 text-[10px] rounded font-pixel ${
                ballMoving ? 'bg-[#34A853] text-zinc-900' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {ballMoving ? 'COMPILING' : 'STANDBY'}
              </span>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div 
            onClick={launchBall}
            className="relative border-4 border-zinc-950 shadow-[8px_8px_0px_#121212] bg-zinc-900 overflow-hidden cursor-ew-resize rounded"
          >
            <canvas
              ref={canvasRef}
              width={800}
              height={450}
              className="w-full h-auto block select-none"
            />

            {/* CRT scanlines effect overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[size:100%_4px,3px_100%] opacity-35" />

            {/* Game Over Screen */}
            {gameOver && (
              <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center space-y-4 p-4 text-center animate-fade-in border-2 border-red-500">
                <span className="font-pixel text-xs text-red-400">STATUS: RECURSION_DEPTH_EXCEEDED</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">Compilation Failed</h3>
                <p className="text-xs text-zinc-300 font-mono max-w-xs">
                  Your Python ball fell past the bounds. Break the loop to escape!
                </p>
                <button
                  onClick={restartGame}
                  className="pixel-btn px-4 py-2.5 bg-white text-zinc-800 text-xs flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#ea4335]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>RETRY RESOLUTION</span>
                </button>
              </div>
            )}

            {/* Win Victory Screen */}
            {gameWon && (
              <div className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center space-y-4 p-4 text-center animate-fade-in border-2 border-emerald-500">
                <span className="font-pixel text-xs text-emerald-400">STATUS: BUILD_SUCCESSFUL</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-[#FFD43B]" />
                  <span>Bricks Cleared! Path Unlocked</span>
                </h3>
                <p className="text-xs text-zinc-300 font-mono max-w-xs">
                  You broke through the 404 boundary! Access granted back home.
                </p>
                <Link
                  to="/"
                  className="pixel-btn-python text-xs px-6 py-3 flex items-center gap-1.5 font-bold shadow-[3px_3px_0px_#ffffff] animate-bounce"
                >
                  <span>COMPILE OUT OF TUTORIAL HELL</span>
                </Link>
              </div>
            )}

          </div>

          {/* Quick instructions */}
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono justify-center">
            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
            <span>Use Left/Right keyboard arrows, touch/swipe or hover cursor to control paddle.</span>
          </div>

        </div>

        {/* Resolved fallbacks directory links (9. Internal Link Web) */}
        <div className="pt-8 border-t-2 border-zinc-100 space-y-4 text-left">
          <h3 className="font-pixel text-xs text-zinc-900 font-bold uppercase tracking-wider">
            RESOLVED DIRECTORY FALLBACKS:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              to="/journey" 
              className="pixel-card-static p-4 bg-white border-2 border-zinc-900 hover:bg-zinc-50 transition-colors flex flex-col justify-between space-y-3 shadow-[2px_2px_0px_#121212]"
            >
              <div className="space-y-1">
                <span className="font-pixel text-[9px] text-[#4285F4] font-bold">ROUTE_01</span>
                <h4 className="font-extrabold text-sm text-zinc-800">Python Journey Map</h4>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans font-medium">Explore specific career domains and tool roadmaps.</p>
            </Link>

            <Link 
              to="/paths" 
              className="pixel-card-static p-4 bg-white border-2 border-zinc-900 hover:bg-zinc-50 transition-colors flex flex-col justify-between space-y-3 shadow-[2px_2px_0px_#121212]"
            >
              <div className="space-y-1">
                <span className="font-pixel text-[9px] text-[#34A853] font-bold">ROUTE_02</span>
                <h4 className="font-extrabold text-sm text-zinc-800">Project Blueprints</h4>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans font-medium">Step-by-step checklists to escape tutorial hell.</p>
            </Link>

            <Link 
              to="/sessions" 
              className="pixel-card-static p-4 bg-white border-2 border-zinc-900 hover:bg-zinc-50 transition-colors flex flex-col justify-between space-y-3 shadow-[2px_2px_0px_#121212]"
            >
              <div className="space-y-1">
                <span className="font-pixel text-[9px] text-[#EA4335] font-bold">ROUTE_03</span>
                <h4 className="font-extrabold text-sm text-zinc-800">Workshops & Slides</h4>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans font-medium">Slides and code repos from live mentor lessons.</p>
            </Link>

            <Link 
              to="/community" 
              className="pixel-card-static p-4 bg-white border-2 border-zinc-900 hover:bg-zinc-50 transition-colors flex flex-col justify-between space-y-3 shadow-[2px_2px_0px_#121212]"
            >
              <div className="space-y-1">
                <span className="font-pixel text-[9px] text-[#FBBC04] font-bold">ROUTE_04</span>
                <h4 className="font-extrabold text-sm text-zinc-800">Core Maintainers</h4>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans font-medium">Connect with student programmers leading the club.</p>
            </Link>
          </div>
        </div>

        {/* Action Escape bottom row */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link 
            to="/" 
            className="pixel-btn text-xs px-5 py-2.5 flex items-center gap-1.5 font-bold bg-white text-zinc-800 border-2 border-zinc-900 shadow-[2px_2px_0px_#121212]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Force Exit to Home</span>
          </Link>
        </div>

      </div>
    </Shell>
  );
}
