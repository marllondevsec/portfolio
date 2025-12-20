import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Section from './components/Section';
import ProjectCard from './components/ProjectCard';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Download, 
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { 
  HERO_DATA, 
  ABOUT_TEXT, 
  PROJECTS, 
  SKILLS, 
  WORKFLOW, 
  STUDIES, 
  SOCIAL_LINKS 
} from './constants';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-gray-300 selection:bg-accent/20 selection:text-accent">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="font-mono text-accent mb-4 tracking-wide">Hi, my name is</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {HERO_DATA.title}.
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-muted mb-8 tracking-tight">
            Segurança Cibernética & <br className="hidden md:block"/>Desenvolvimento.
          </h2>
          <p className="max-w-xl text-lg text-gray-400 mb-12 leading-relaxed">
            {HERO_DATA.role}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projetos" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold font-mono text-background bg-accent rounded hover:bg-accentHover transition-all hover:shadow-[0_0_20px_rgba(57,217,138,0.4)]">
              Ver Projetos
              <ArrowRight size={16} className="ml-2" />
            </a>
            <a href="#contato" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold font-mono text-accent border border-accent rounded hover:bg-accent/10 transition-colors">
              Fale Comigo
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
            <a href="#sobre" className="text-muted hover:text-accent transition-colors">
                <ChevronDown size={24} />
            </a>
        </div>
      </section>

      {/* About Section */}
      <Section id="sobre" title="Sobre Mim">
        <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-2 text-gray-400 leading-relaxed text-lg whitespace-pre-line">
                {ABOUT_TEXT}
            </div>
            <div className="relative group">
                <div className="absolute inset-0 bg-accent rounded opacity-20 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                <div className="relative bg-card p-6 rounded border border-gray-800 text-center md:text-left">
                     <div className="aspect-square bg-gray-800 rounded mb-4 overflow-hidden relative">
                         {/* Placeholder for professional photo */}
                         <img 
                            src="https://picsum.photos/400/400" 
                            alt="Marllon Avatar" 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                         />
                     </div>
                     <p className="font-mono text-xs text-accent text-center">./profile_pic.jpg</p>
                </div>
            </div>
        </div>
      </Section>

      {/* Workflow Section */}
      <div className="bg-card/30 border-y border-white/5">
        <Section id="workflow" className="py-12">
            <h3 className="text-center font-mono text-accent mb-12 text-sm tracking-widest">>> WORKFLOW_EXECUTION_SEQUENCE</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {WORKFLOW.map((step, index) => (
                    <div key={step.id} className={`flex flex-col items-center text-center p-4 relative ${index !== WORKFLOW.length -1 ? 'md:after:content-["→"] md:after:absolute md:after:-right-3 md:after:top-1/2 md:after:-translate-y-1/2 md:after:text-gray-700 md:after:text-xl' : ''}`}>
                        <div className="w-12 h-12 bg-background border border-accent/20 rounded-full flex items-center justify-center mb-4 text-accent shadow-[0_0_15px_rgba(57,217,138,0.1)]">
                            <step.icon size={20} />
                        </div>
                        <h4 className="font-mono font-bold text-white text-sm">{step.label}</h4>
                    </div>
                ))}
            </div>
        </Section>
      </div>

      {/* Skills Section */}
      <Section id="skills" title="Skills & Tech">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((category) => (
                <div key={category.title} className="bg-card p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <category.icon className="text-accent" size={24} />
                        <h3 className="font-bold text-white">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                        {category.skills.map(skill => (
                            <li key={skill} className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projetos" title="Projetos Selecionados">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-12 text-center">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline">
                Ver mais no GitHub <ExternalLink size={14} />
            </a>
        </div>
      </Section>

      {/* Studies / Blog Section */}
      <Section id="estudos" title="Estudos & Write-ups">
        <div className="grid md:grid-cols-3 gap-6">
            {STUDIES.map(post => (
                <article key={post.id} className="bg-card p-6 rounded border border-gray-800 hover:border-accent/40 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-mono text-accent">{post.date}</span>
                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-200 mb-3 group-hover:text-accent transition-colors">{post.title}</h3>
                    <p className="text-sm text-gray-500">{post.summary}</p>
                </article>
            ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contato" title="Contato" className="mb-20">
        <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Vamos conversar?</h3>
            <p className="text-gray-400 mb-12">
                Estou atualmente aberto a novas oportunidades, colaborações em pesquisa de segurança ou projetos de desenvolvimento. Minha caixa de entrada está sempre aberta.
            </p>
            
            <div className="flex justify-center gap-6 mb-12">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="p-4 bg-card rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-accent transition-all hover:scale-110">
                    <Github size={24} />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-card rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-accent transition-all hover:scale-110">
                    <Linkedin size={24} />
                </a>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="p-4 bg-card rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-accent transition-all hover:scale-110">
                    <Mail size={24} />
                </a>
            </div>

            <a href={`mailto:${SOCIAL_LINKS.email}`} className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold font-mono text-background bg-accent rounded hover:bg-accentHover transition-all">
                Diga Olá
            </a>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 bg-card text-center border-t border-white/5">
        <div className="font-mono text-sm text-gray-500">
            <p className="mb-2">Desenhado & Construído por Marllon</p>
            <div className="flex justify-center items-center gap-2">
                <span className="text-accent">© {new Date().getFullYear()}</span>
                <span>•</span>
                <span>Ciência da Computação</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;