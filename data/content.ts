import { CVData, FeedItem } from '../types';

export const INTRO_QUOTE = "You can't defend what you don't understand..";
export const INTRO_AUTHOR = "- Marco Ranum";

export const CV_CONTENT: CVData = {
  summary: "IT professional with experience in internal technical support, systems, and infrastructure, working with Linux environments and web applications. Skilled in troubleshooting, basic monitoring, system maintenance, and service configuration (HTTPS/TLS). Strong foundation in operating systems, networking, and programming, with practical knowledge of cybersecurity best practices applied to daily operations. Seeking opportunities as an Infrastructure Analyst, NOC/SOC Jr., or Technical Support specialist.",
  skills: [
    "Linux Administration & Services",
    "Networking (TCP/IP, DNS, HTTP/HTTPS)",
    "Zabbix (Monitoring)",
    "Git / Version Control",
    "Docker Fundamentals",
    "Web Security (Burp Suite)",
    "C / C++ / Python / Java",
    "SQL / Databases",
    "Security Fundamentals (TLS, RBAC)"
  ],
  tools: [
    "Burp Suite", "Charles Proxy", "Bettercap", "Wireshark", 
    "ffuf", "Nmap", "Ghidra", "SQLMap", 
    "Metasploit", "SEToolkit", "BeEF XSS", "Hydra", 
    "Hashcat", "John the Ripper", "Aircrack-ng", "Airgeddon", 
    "Mimikatz", "Crunch", "Netcat", "Autopsy"
  ],
  experience: [
    {
      role: "Technical Lead / Developer",
      company: "FutureWave (Early-Stage Startup)",
      period: "01/2025 – 11/2025",
      description: "• Developed and maintained automation systems for small businesses.\n• Implemented basic security controls (authentication, access control, data protection).\n• Integrated external services and APIs.\n• Provided technical support and troubleshooting for applications and services.\n• Configured and maintained Linux environments.\n• Managed code organization and version control (Git).\n• Worked in a live production environment, validating requirements and supporting end users."
    },
    {
      role: "Internal Service Desk / Technical Support Intern",
      company: "A5 Marketing Ltda",
      period: "04/2024 – 01/2025",
      description: "• Provided technical support for web environments and internal tools.\n• Performed basic website and web infrastructure maintenance.\n• Configured HTTPS/TLS for applications.\n• Assisted in operational tasks on internal digital platforms."
    }
  ],
  education: [
    {
      degree: "Bachelor in Computer Science",
      institution: "UNESA | 2023 – 2027",
      details: "Key Coursework:\n• Operating Systems (Linux and Windows)\n• Computer Networks & Architecture\n• Data Structures and Algorithms\n• Information Security & Applied Cryptography\n• Privacy and Data Protection (LGPD)"
    },
    {
      degree: "Certificate: Ethical Hacker",
      institution: "Cisco Networking Academy | 2024",
      details: "Introductory certification in information security fundamentals, covering vulnerability identification, basic security testing, network and application security, risk analysis, and best protection practices.\n\nVerified Badge: Cisco Networking Academy"
    }
  ]
};

// Add new posts here to update the feed
export const FEED_CONTENT: FeedItem[] = [
  {
    id: '1',
    title: 'Welcome to the System',
    date: '2023-10-27',
    content: 'Initializing portfolio sequence... exploring the depths of reverse engineering and malware analysis. Stay tuned for updates on my latest research.',
    imageUrl: 'https://picsum.photos/800/400',
    tags: ['intro', 'cybersecurity']
  },
  {
    id: '2',
    title: 'Analyzing Memory Dumps',
    date: '2023-11-15',
    content: 'Deep diving into Windows internals today. Understanding how the kernel handles memory allocation is crucial for spotting anomalies in forensic analysis.',
    tags: ['forensics', 'windows', 'kernel']
  }
];