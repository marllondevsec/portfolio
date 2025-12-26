import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal as TerminalIcon } from 'lucide-react';

const TerminalContact: React.FC = () => {
  const [step, setStep] = useState<'IDLE' | 'EMAIL' | 'MESSAGE' | 'SENDING' | 'SUCCESS'>('IDLE');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<string[]>(['> INITIALIZING SECURE CONNECTION...', '> WAITING FOR USER INPUT...']);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, step]);

  // Focus input when clicking the terminal
  const handleTerminalClick = () => {
    if (inputRef.current && (step === 'EMAIL' || step === 'MESSAGE')) {
      inputRef.current.focus();
    }
  };

  const startSequence = () => {
    setStep('EMAIL');
    setHistory(prev => [...prev, '> INITIATE UPLINK SEQUENCE [Y/N]? Y', '> ENTER ORIGIN IDENTITY (YOUR EMAIL):']);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const val = inputVal;
    setInputVal('');

    if (step === 'EMAIL') {
      setEmail(val);
      setHistory(prev => [...prev, `> ${val}`, '> IDENTITY VERIFIED.', '> ENTER TRANSMISSION DATA (MESSAGE):']);
      setStep('MESSAGE');
    } else if (step === 'MESSAGE') {
      setMessage(val);
      setHistory(prev => [...prev, `> [DATA HIDDEN]`, '> PREPARING PAYLOAD...', '> ENCRYPTING PACKETS...']);
      setStep('SENDING');
      simulateSending(val);
    }
  };

  const simulateSending = (finalMsg: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setHistory(prev => [...prev, `> UPLOADING... ${progress}%`]);
      
      if (progress >= 100) {
        clearInterval(interval);
        setStep('SUCCESS');
        setHistory(prev => [
          ...prev, 
          '> UPLOAD COMPLETE.', 
          '> ESTABLISHING EXTERNAL MAIL CLIENT LINK...',
          '> SESSION TERMINATED.'
        ]);
        
        // Construct mailto link
        const subject = `[ENCRYPTED UPLINK] Transmission from ${email}`;
        const body = `ORIGIN: ${email}\n\nPAYLOAD:\n${finalMsg}`;
        window.location.href = `mailto:marllondevsec.comercial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    }, 600);
  };

  return (
    <div 
      className="bg-black/90 border border-hacker-green p-4 font-mono text-sm md:text-base shadow-neon min-h-[300px] flex flex-col cursor-text"
      onClick={handleTerminalClick}
    >
      {/* Terminal Output History */}
      <div className="flex-grow space-y-1 text-terminal-light overflow-y-auto mb-4">
        {history.map((line, idx) => (
          <div key={idx} className="break-words">
            <span className="text-hacker-green mr-2">{line.startsWith('>') ? '' : '>'}</span>
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Input Area */}
      <div className="mt-2 border-t border-hacker-green/30 pt-2">
        {step === 'IDLE' && (
          <button 
            onClick={startSequence}
            className="flex items-center gap-2 text-hacker-green hover:bg-hacker-green hover:text-black px-4 py-2 border border-hacker-green transition-colors animate-pulse"
          >
            <TerminalIcon size={16} />
            [ INITIATE_UPLINK ]
          </button>
        )}

        {(step === 'EMAIL' || step === 'MESSAGE') && (
          <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
            <span className="text-hacker-green font-bold whitespace-nowrap">root@guest:~$</span>
            <input
              ref={inputRef}
              type={step === 'EMAIL' ? 'email' : 'text'}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="bg-transparent border-none outline-none text-white w-full font-terminal text-lg focus:ring-0"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <button type="submit" className="text-hacker-green opacity-50 hover:opacity-100">
              <Send size={16} />
            </button>
          </form>
        )}

        {step === 'SENDING' && (
          <div className="text-hacker-green animate-pulse">
            > PROCESSING_REQUEST... <span className="inline-block w-2 h-4 bg-hacker-green ml-1 animate-blink"></span>
          </div>
        )}

        {step === 'SUCCESS' && (
           <div className="text-neon-red mt-2">
             > TRANSMISSION_HANDOFF_COMPLETE. CHECK YOUR DEFAULT MAIL CLIENT.
             <button 
               onClick={() => {
                 setStep('IDLE');
                 setHistory(['> RESETTING CONNECTION...', '> READY.']);
                 setEmail('');
                 setMessage('');
               }}
               className="block mt-4 text-xs underline hover:text-white cursor-pointer"
             >
               [ RESET_TERMINAL ]
             </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default TerminalContact;