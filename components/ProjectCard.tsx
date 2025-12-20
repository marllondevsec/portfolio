import React from 'react';
import { Github, ExternalLink, FileText } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative bg-card rounded-lg border border-gray-800 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_4px_20px_rgba(57,217,138,0.1)] flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-background rounded-md border border-gray-800 group-hover:border-accent/30 transition-colors">
            {project.isWriteUp ? <FileText className="text-accent" size={24} /> : <Github className="text-white" size={24} />}
        </div>
        <div className="flex gap-3">
            {project.isWriteUp && (
                 <span className="px-2 py-1 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    WRITE-UP
                 </span>
            )}
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed">
        {project.description}
      </p>

      {project.impact && (
          <div className="mb-4 p-3 bg-accent/5 rounded border-l-2 border-accent">
            <p className="text-xs text-gray-300">
                <span className="font-bold text-accent font-mono">>> IMPACTO:</span> {project.impact}
            </p>
          </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t) => (
          <span key={t} className="text-xs font-mono text-accent/80">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;