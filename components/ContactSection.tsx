import React from 'react';
import { Mail, Send, Shield, MapPin, Terminal, ExternalLink } from 'lucide-react';

const ContactSection: React.FC = () => {
  const email = "marllondevsec.comercial@gmail.com";
  const telegramHandle = "@GhostKernel";
  const telegramUrl = "https://t.me/GhostKernel";
  const mailtoUrl = `mailto:${email}`;

  return (
    <div className="animate-fade-in space-y-8">
      
      {/* Header */}
      <div className="border-b border-dashed border-[#00ff41] pb-4 mb-6">
        <h2 className="text-3xl font-bold text-white text-neon-bright flex items-center gap-3">
           <Shield className="text-[#00ff41]" /> 
           SECURE_COMMUNICATION_UPLINK
        </h2>
        <p className="text-[#00ff41]/60 font-mono mt-2 text-sm uppercase tracking-widest">
           ENCRYPTION: AES-256 // CHANNEL: ENCRYPTED
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Email Card */}
        <a 
          href={mailtoUrl}
          className="group block cursor-pointer"
        >
          <div className="h-full bg-black border-2 border-[#00ff41]/50 p-6 relative overflow-hidden transition-all duration-300 hover:border-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] hover:-translate-y-1">
             <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <Mail size={48} className="text-[#00ff41]" />
             </div>
             
             <div className="flex items-center gap-2 text-[#00ff41] font-bold tracking-widest uppercase mb-4 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse"></span>
                ELECTRONIC_MAIL
             </div>
             
             <h3 className="text-2xl text-white font-bold mb-1 group-hover:text-[#00ff41] transition-colors">EMAIL_RELAY</h3>
             <p className="text-[#00ff41]/80 font-mono text-sm md:text-base mb-6 break-all">
                {email}
             </p>
             
             <div className="inline-flex items-center gap-2 bg-[#00ff41]/10 px-4 py-2 border border-[#00ff41]/30 group-hover:bg-[#00ff41] group-hover:text-black transition-colors font-bold text-sm cursor-pointer">
                SEND_PAYLOAD <Send size={14} />
             </div>
          </div>
        </a>

        {/* Telegram Card */}
        <a 
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block cursor-pointer"
        >
          <div className="h-full bg-black border-2 border-[#00ff41]/50 p-6 relative overflow-hidden transition-all duration-300 hover:border-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] hover:-translate-y-1">
             <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <Send size={48} className="text-[#00ff41] -rotate-45 translate-x-1 translate-y-1" />
             </div>
             
             <div className="flex items-center gap-2 text-[#00ff41] font-bold tracking-widest uppercase mb-4 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse"></span>
                ENCRYPTED_MESSAGING
             </div>
             
             <h3 className="text-2xl text-white font-bold mb-1 group-hover:text-[#00ff41] transition-colors">TELEGRAM</h3>
             <p className="text-[#00ff41]/80 font-mono text-lg mb-6">{telegramHandle}</p>
             
             <div className="inline-flex items-center gap-2 bg-[#00ff41]/10 px-4 py-2 border border-[#00ff41]/30 group-hover:bg-[#00ff41] group-hover:text-black transition-colors font-bold text-sm cursor-pointer">
                ESTABLISH_LINK <ExternalLink size={14} />
             </div>
          </div>
        </a>
      </div>

      {/* Terminal Decor / Location */}
      <div className="border border-[#00ff41]/30 bg-black/50 p-4 font-mono text-sm mt-8">
         <div className="flex items-center gap-2 text-[#00ff41] mb-2 border-b border-[#00ff41]/20 pb-2">
            <Terminal size={14} /> 
            <span>TRACE_ROUTE_RESULT</span>
         </div>
         <div className="space-y-1 text-[#00ff41]/70">
            <div className="flex justify-between items-center">
               <span>> TARGET_LOCATION:</span>
               <span className="text-white flex items-center gap-2">
                 <MapPin size={14} className="text-[#00ff41]" /> 
                 RIO DE JANEIRO, BRAZIL
               </span>
            </div>
            <div className="flex justify-between">
               <span>> TIMEZONE:</span>
               <span className="text-white">GMT-3 (Brasilia Standard Time)</span>
            </div>
            <div className="flex justify-between">
               <span>> STATUS:</span>
               <span className="text-[#00ff41] animate-pulse font-bold">LISTENING...</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ContactSection;