import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, ArrowRight, Radio, AlertTriangle } from 'lucide-react';

interface ArticlePreview {
  title: string;
  content: string;
  url: string;
}

const REPO_OWNER = 'marllondevsec';
const REPO_NAME = 'ARTICLES';

interface LatestArticleProps {
  onReadMore: () => void;
}

const LatestArticle: React.FC<LatestArticleProps> = ({ onReadMore }) => {
  const [article, setArticle] = useState<ArticlePreview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/`);
        if (!response.ok) throw new Error("Failed");
        
        const files = await response.json();
        // Filter md files
        const mdFiles = files.filter((file: any) => file.name.endsWith('.md') && file.type === 'file');
        
        if (mdFiles.length > 0) {
           // Get the first one (or logic to sort by date if files have dates in names)
           // Currently taking the top of the list
           const latestFile = mdFiles[0]; 
           
           const contentRes = await fetch(latestFile.download_url);
           const text = await contentRes.text();

           // Parse Title
           const titleMatch = text.match(/^#\s+(.+)$/m);
           const title = titleMatch ? titleMatch[1] : latestFile.name.replace('.md', '');

           // Remove title from body for preview
           const cleanContent = text.replace(/^#\s+.+$/m, '').trim();

           setArticle({
             title,
             content: cleanContent,
             url: latestFile.download_url
           });
        }
      } catch (err) {
        console.error("Latest article fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  if (loading) {
    return (
      <div className="border border-[#00ff41]/30 bg-black p-6 mb-6 animate-pulse flex flex-col items-center justify-center h-48">
         <div className="text-[#00ff41] font-mono tracking-widest uppercase mb-2">Intercepting Data Stream...</div>
         <div className="w-full max-w-xs h-1 bg-[#00ff41]/20 overflow-hidden">
            <div className="h-full bg-[#00ff41] w-1/3 animate-[shimmer_1s_infinite]"></div>
         </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="border-2 border-[#00ff41] bg-black/90 mb-8 relative overflow-hidden group hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-all duration-300">
      
      {/* Header Strip */}
      <div className="bg-[#00ff41]/10 border-b border-[#00ff41] p-3 flex justify-between items-center">
         <div className="flex items-center gap-2 text-[#00ff41] font-bold uppercase tracking-widest text-sm">
            <Radio size={16} className="animate-pulse text-red-500" />
            <span>LATEST_INTELLIGENCE // INTERCEPTED</span>
         </div>
         <div className="text-[10px] font-mono text-[#00ff41]/50 hidden sm:block">
            PRIORITY: HIGH
         </div>
      </div>

      <div className="p-6">
         <div className="flex items-start gap-4">
            <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 border border-[#00ff41]/50 bg-[#00ff41]/5 shrink-0">
               <FileText size={24} className="text-[#00ff41] mb-1" />
               <span className="text-[10px] font-mono text-[#00ff41]">.MD</span>
            </div>

            <div className="flex-grow">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#00ff41] transition-colors">
                  {article.title}
                </h3>
                
                {/* Preview Text (Clean Markdown) */}
                <div className="prose prose-invert prose-p:text-[#00ff41]/80 prose-p:font-mono prose-p:text-sm prose-p:leading-relaxed max-h-[100px] overflow-hidden relative mb-4">
                   <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {article.content.substring(0, 250) + "..."}
                   </ReactMarkdown>
                   <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent"></div>
                </div>

                <button 
                  onClick={onReadMore}
                  className="inline-flex items-center gap-2 bg-[#00ff41] text-black px-5 py-2 font-bold uppercase text-sm hover:bg-white hover:shadow-[0_0_15px_#00ff41] transition-all"
                >
                  ACCESS_FULL_DATA <ArrowRight size={16} />
                </button>
            </div>
         </div>
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 border-[20px] border-[#00ff41]/5 rounded-full pointer-events-none"></div>
    </div>
  );
};

export default LatestArticle;