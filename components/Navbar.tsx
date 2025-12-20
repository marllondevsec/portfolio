import React, { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Projetos', href: '#projetos' },
  { name: 'Skills', href: '#skills' },
  { name: 'Estudos', href: '#estudos' },
  { name: 'Contato', href: '#contato' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="p-1 bg-accent/10 rounded border border-accent/20 group-hover:border-accent transition-colors">
              <Terminal size={20} className="text-accent" />
            </div>
            <span className="font-mono font-bold text-lg tracking-tighter text-white">
              marllon<span className="text-accent">.dev</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-mono text-muted hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="px-4 py-2 text-xs font-mono font-bold text-background bg-accent rounded hover:bg-accentHover transition-all transform hover:-translate-y-0.5 shadow-[0_0_10px_rgba(57,217,138,0.3)]">
              CV.pdf
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-mono text-gray-300 hover:text-accent hover:bg-white/5 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
             <a
                href="#"
                className="block mt-4 px-3 py-3 text-center text-base font-mono font-bold text-background bg-accent rounded hover:bg-accentHover"
                onClick={() => setIsOpen(false)}
              >
                Download CV
              </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;