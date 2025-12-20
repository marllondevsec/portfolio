import { Project, SkillCategory, StudyPost, WorkflowStep } from './types';
import { Terminal, Shield, Cpu, Code, Search, FlaskConical, CheckCircle, Repeat } from 'lucide-react';

export const HERO_DATA = {
  title: "Marllon",
  subtitle: "Segurança Cibernética & Desenvolvimento",
  role: "Estudante de Ciência da Computação • Testes de Intrusão • C/C++ • Python • Linux/Windows",
};

export const ABOUT_TEXT = `Olá — eu sou o Marllon. Trabalho com tecnologia desde 2021 e estou na reta final do bacharelado em Ciência da Computação. Foi o curso que me fez descobrir a paixão pela segurança cibernética e pelo desenvolvimento de software. Participei de testes de intrusão em cenários variados — desde infraestrutura até aplicações web — e obtive sucesso em avaliações reais, incluindo a identificação de duas falhas críticas (OWASP Top 10) em um portal público.

Meu fluxo de trabalho segue método científico: observar → hipotetizar → testar → validar → repetir. Sou dedicado a aprender rapidamente e a adaptar-me a novos desafios em poucos dias para entregar resultados eficientes e continuamente otimizados.`;

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: "Teste de Intrusão — Portal Público",
    description: "Identificação e validação de 2 vulnerabilidades críticas classificadas no OWASP Top 10; documento de mitigação entregue.",
    tech: ["Burp Suite", "Manual Review", "PoC"],
    link: "https://github.com/marllondevsec",
    impact: "Redução de risco crítico em infraestrutura governamental.",
    isWriteUp: true
  },
  {
    id: 'p2',
    title: "SPUTNIK Framework",
    description: "Framework para estudar ofuscação e descriptografia de payloads; modular, com suporte a mbedTLS e BCrypt. Desenvolvido em Python e C++.",
    tech: ["C++", "Python", "mbedTLS", "WinAPI"],
    link: "https://github.com/marllondevsec",
    impact: "Ferramenta de estudo para evasão e análise de malware."
  },
  {
    id: 'p3',
    title: "Rubberducky",
    description: "Script para automação e injeçao de codigo.",
    tech: ["C++", "Arduino", "Linux"],
    link: "https://github.com/marllondevsec",
    impact: "injeçao de codigo automatico via badusb."
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Linguagens",
    skills: ["C", "C++", "Python", "Bash", "JavaScript/TypeScript"],
    icon: Code
  },
  {
    title: "Plataformas & OS",
    skills: ["Linux (Debian/Arch)", "Windows (WinAPI)", "Docker"],
    icon: Terminal
  },
  {
    title: "Ferramentas",
    skills: ["Burp Suite", "GDB", "IDA Pro", "Wireshark", "Metasploit"],
    icon: Cpu
  },
  {
    title: "Segurança",
    skills: ["Pentest Web/Infra", "Análise de Malware", "Engenharia Reversa", "Criptografia"],
    icon: Shield
  }
];

export const WORKFLOW: WorkflowStep[] = [
  { id: 1, label: "Observar", icon: Search },
  { id: 2, label: "Hipotetizar", icon: FlaskConical },
  { id: 3, label: "Testar", icon: Terminal },
  { id: 4, label: "Validar", icon: CheckCircle },
  { id: 5, label: "Repetir", icon: Repeat },
];

export const STUDIES: StudyPost[] = [
  { id: 's1', title: "Como abordei uma falha XSS Stored", summary: "Análise detalhada de um caso real encontrado em bug bounty, desde a injeção até a exfiltração.", date: "Out 2023" },
  { id: 's2', title: "Diferentes formas de ofuscação em C++", summary: "Estudo comparativo sobre técnicas de ofuscação de strings e fluxo de controle para evadir assinaturas estáticas.", date: "Nov 2023" },
  { id: 's3', title: "Metodologia para Testes de Intrusão", summary: "Organizando o caos: como manter a consistência e cobertura durante um pentest black-box.", date: "Dez 2023" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/marllondevsec",
  linkedin: "https://www.linkedin.com/in/marllondevsec/",
  email: "marllondevsec.comercial@gmail.com"
};