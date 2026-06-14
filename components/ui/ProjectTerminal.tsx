'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export const ProjectTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'OPTIMA SOLUTIONS [SYSTEM SHELL VERSION 1.0.0]',
    'SYSTEMS STATUS: ONLINE | SECURE_REG: GCC_SOUTH_1',
    'TYPE /help FOR AVAILABLE PROTOCOLS.',
    '',
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Scroll to bottom when history changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, `$ ${cmd}`];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    switch (trimmed) {
      case '/help':
        newHistory.push(
          'AVAILABLE PROTOCOLS:',
          '  /services       List core capabilities',
          '  /projects       Navigate to project index',
          '  /contact        Open communication protocol',
          '  /system-status  Perform telemetry analysis',
          '  /clear          Flush terminal output history'
        );
        break;
      case '/services':
        newHistory.push(
          '- Custom Web Applications [DEV.01]',
          '- Managed Cloud Hosting   [OPS.02]',
          '- Digital Transformation  [TRANS.03]'
        );
        break;
      case '/projects':
        newHistory.push('REDIRECTING TO PROJECT MATRIX [NAV.01]...');
        setHistory(newHistory);
        setTimeout(() => router.push('/projects'), 1000);
        return;
      case '/contact':
        newHistory.push('ESTABLISHING SECURE COMM CHANNEL...');
        setHistory(newHistory);
        setTimeout(() => router.push('/contact'), 1000);
        return;
      case '/system-status':
        newHistory.push(
          'RUNNING DIAGNOSTICS...',
          '  CPU LOAD: 14% | LATENCY: 22ms',
          '  SERVER NODE: AZURE_GCC_WEST',
          '  DB STACK: SUPABASE_LIVE [STABLE]',
          '  SSL CERTIFICATE: SECURED (RSA_4096)',
          'ALL SYSTEMS VIBRANT.'
        );
        break;
      case '/clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newHistory.push(`COMMAND NOT RECOGNIZED: "${cmd}". TYPE /help FOR PROTOCOLS.`);
        break;
    }

    newHistory.push('');
    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono text-xs select-none">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-cyber/40 bg-navy/95 text-cyber hover:bg-cyber/10 transition-colors shadow-lg animate-pulse"
        >
          <span className="w-2 h-2 bg-cyber rounded-full animate-ping"></span>
          <span>[SYS_CONSOLE]</span>
        </button>
      )}

      {/* Terminal Shell Window */}
      {isOpen && (
        <div className="w-[320px] sm:w-[400px] h-[280px] flex flex-col border border-cyber bg-navy/95 text-off-white shadow-2xl relative">
          {/* Top Panel Bar */}
          <div className="flex justify-between items-center bg-navy-soft border-b border-cyber/30 px-3 py-1.5 text-[10px] text-cyber/80">
            <span className="tracking-widest">OPTIMA_SH_v1.0.0</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-rose-500 font-bold transition-colors cursor-pointer px-1"
            >
              [X]
            </button>
          </div>

          {/* Terminal History Container */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-cyber/20"
          >
            {history.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('$')
                    ? 'text-cyber'
                    : line.startsWith('-') || line.startsWith(' ')
                    ? 'text-muted-light'
                    : 'text-off-white'
                }
              >
                {line}
              </div>
            ))}
          </div>

          {/* Terminal Form Input */}
          <form
            onSubmit={handleSubmit}
            className="flex border-t border-cyber/30 bg-navy-soft items-center px-3 py-2"
          >
            <span className="text-cyber mr-2 font-bold">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type /help..."
              className="flex-1 bg-transparent text-cyber outline-none border-none placeholder-cyber/30 text-xs py-0.5"
              autoFocus
            />
          </form>

          {/* Corner brackets details */}
          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyber pointer-events-none"></span>
          <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyber pointer-events-none"></span>
          <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyber pointer-events-none"></span>
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyber pointer-events-none"></span>
        </div>
      )}
    </div>
  );
};
