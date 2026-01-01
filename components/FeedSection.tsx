import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Tag, ChevronRight, ChevronUp, FileText, ExternalLink, Search } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  date: string;
  content: string;
  rawUrl: string;
  fileName: string;
}

const REPO_OWNER = 'marllondevsec';
const REPO_NAME = 'ARTICLES';
const BRANCH = 'main';

const FeedSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // 1. Fetch directory contents
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/`);
        
        if (!response.ok) {
           if (response.status === 403) throw new Error("GitHub API Rate Limit Exceeded. Try again later.");
           if (response.status === 404) throw new Error("Articles repository not found.");
           throw new Error("Failed to fetch article list.");
        }

        const files = await response.json();

        // 2. Filter for .md files
        const mdFiles = files.filter((file: any) => file.name.endsWith('.md') && file.type === 'file');

        if (mdFiles.length === 0) {
           setLoading(false);
           return;
        }

        // 3. Fetch content for each file
        const articlePromises = mdFiles.map(async (file: any) => {
           const contentRes = await fetch(file.download_url);
           const text = await contentRes.text();
           
           // Simple parsing: Try to find first H1 for title, otherwise use filename
           const titleMatch = text.match(/^#\s+(.+)$/m);
           const title = titleMatch ? titleMatch[1] : file.name.replace('.md', '');
           
           // Simple date approximation (since we don't want to make 30 calls for commit history)
           // We'll leave date empty or use current if not available, usually handled via frontmatter but we'll use "ARCHIVED" for now
           const date = "ARCHIVED"; 

           return {
             id: file.sha,
             title,
             date,
             content: text,
             rawUrl: file.download_url,
             fileName: file.name
           };
        });

        const fetchedArticles = await Promise.all(articlePromises);
        setArticles(fetchedArticles);

      } catch (err: any) {
        setError(err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedArticleId(prev => prev === id ? null : id);
  };

  // Function to transform image URLs relative to the repo to absolute raw GitHub URLs
  const transformImageUri = (src: string, article: Article) => {
      if (src.startsWith('http')) return src;
      // Handle relative paths like ./assets/img.png or assets/img.png
      const cleanPath = src.replace(/^\.?\//, '');
      return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${cleanPath}`;
  };

  const filteredArticles = articles.filter(article => {
    const query = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.fileName.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query)
    );
  });

  if (loading) {
     return (
        <div className="p-12 text-center flex flex-col items-center">
           <div className="w-12 h-12 border-4 border-t-[#00ff41] border-r-transparent border-b-[#00ff41] border-l-transparent rounded-full animate-spin mb-4"></div>
           <span className="text-[#00ff41] animate-pulse font-mono">DECRYPTING_ARCHIVES...</span>
        </div>
     );
  }

  if (error) {
     return (
        <div className="p-6 border border-red-500 bg-red-900/10 text-red-500 font-mono text-center">
           <p className="mb-2">ERROR_ACCESSING_DATABASE: {error}</p>
           <a 
             href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`} 
             target="_blank" 
             rel="noopener noreferrer"
             className="inline-flex items-center underline hover:text-white mt-2"
           >
             <ExternalLink size={14} className="mr-2" />
             Access Raw Archives
           </a>
        </div>
     );
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-[#00ff41]/50 group-focus-within:text-[#00ff41]" />
        </div>
        <input
          type="text"
          placeholder="SEARCH_DATABASE_QUERY..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-black border-2 border-[#00ff41]/50 text-[#00ff41] pl-12 pr-4 py-3 focus:outline-none focus:border-[#00ff41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] font-mono placeholder-[#00ff41]/30 uppercase transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#00ff41]/30 text-xs">
          [FILTER_ENABLED]
        </div>
      </div>

      {/* Content List */}
      {articles.length === 0 ? (
          <div className="text-[#00ff41]/50 text-center font-mono">NO_DATA_FOUND_IN_SECTOR</div>
      ) : filteredArticles.length === 0 ? (
          <div className="border border-[#00ff41]/30 bg-black/50 p-8 text-center">
            <p className="text-[#00ff41] font-mono text-lg mb-2">QUERY_RETURNED_ZERO_RESULTS</p>
            <p className="text-[#00ff41]/50 text-sm">Target data not found in current sector.</p>
          </div>
      ) : (
        <div className="space-y-10">
          {filteredArticles.map((item) => {
            const isExpanded = expandedArticleId === item.id;
            
            // Remove the first H1 from the body content to avoid duplicate titles in the card
            const displayContent = item.content.replace(/^#\s+.+$/m, '').trim();
            
            // Truncate for preview
            const previewContent = displayContent.substring(0, 300) + (displayContent.length > 300 ? '...' : '');

            return (
              <article key={item.id} className="border-l-4 border-[#00ff41] bg-black/80 p-6 relative group hover:bg-[#00ff41]/5 transition-colors">
                
                <div className="flex flex-col gap-4">
                  {/* Header Info */}
                  <div className="flex items-center text-xs font-mono text-[#00ff41]/70 mb-1 space-x-4 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FileText size={12} className="mr-2" />
                      {item.fileName}
                    </div>
                    <div className="text-[#00ff41]">||</div>
                    <div className="flex items-center">
                      <span className="border border-[#00ff41]/30 px-2 py-0.5 rounded-sm">
                         MARKDOWN
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold text-white group-hover:text-[#00ff41] transition-colors text-neon-bright">
                    {item.title}
                  </h3>
                  
                  {/* Content Container (Black Box) */}
                  <div className={`bg-black border border-[#00ff41]/30 p-6 shadow-sm transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-full' : 'max-h-[200px]'}`}>
                    <div className="prose prose-invert prose-p:text-[#00ff41]/90 prose-headings:text-white prose-a:text-[#00ff41] prose-code:text-[#00ff41] max-w-none font-mono">
                       <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          urlTransform={(src) => transformImageUri(src, item)}
                          components={{
                            // Customizing Markdown Elements to match theme
                            h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white border-b border-[#00ff41]/50 pb-2 mb-4 mt-6" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-xl font-bold text-white mt-6 mb-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-lg font-bold text-[#00ff41] mt-4 mb-2" {...props} />,
                            p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-[#00ff41]/90 text-lg" {...props} />,
                            a: ({node, ...props}) => <a className="text-white underline decoration-[#00ff41] hover:text-[#00ff41] transition-colors" target="_blank" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 text-[#00ff41]/80" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 text-[#00ff41]/80" {...props} />,
                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#00ff41] pl-4 italic text-[#00ff41]/60 my-4" {...props} />,
                            code: ({node, inline, className, children, ...props}: any) => {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline ? (
                                  <div className="bg-[#111] border border-[#00ff41]/30 rounded p-4 my-4 overflow-x-auto shadow-inner">
                                    <code className={`${className} text-sm text-[#00ff41]`} {...props}>
                                      {children}
                                    </code>
                                  </div>
                                ) : (
                                  <code className="bg-[#00ff41]/20 px-1 py-0.5 rounded text-white text-sm" {...props}>
                                    {children}
                                  </code>
                                )
                            },
                            img: ({node, ...props}) => (
                               <div className="border border-[#00ff41]/50 bg-black p-1 my-6 inline-block">
                                  <img className="max-w-full h-auto opacity-90 hover:opacity-100 transition-opacity" {...props} alt={props.alt || 'Article Image'} />
                               </div>
                            ),
                            table: ({node, ...props}) => <div className="overflow-x-auto my-6"><table className="min-w-full border border-[#00ff41]/30" {...props} /></div>,
                            th: ({node, ...props}) => <th className="border border-[#00ff41]/30 p-2 bg-[#00ff41]/10 text-white font-bold text-left" {...props} />,
                            td: ({node, ...props}) => <td className="border border-[#00ff41]/30 p-2 text-[#00ff41]/80" {...props} />,
                          }}
                       >
                          {isExpanded ? displayContent : previewContent}
                       </ReactMarkdown>
                    </div>
                    
                    {/* Gradient fade for closed state */}
                    {!isExpanded && (
                       <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                    )}
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <button 
                      onClick={() => toggleExpand(item.id)}
                      className="flex items-center text-sm font-bold uppercase bg-[#00ff41] text-black px-6 py-2 hover:bg-white transition-colors"
                    >
                      {isExpanded ? (
                        <>COLLAPSE_DATA <ChevronUp size={16} className="ml-1" /></>
                      ) : (
                        <>DECRYPT_FULL_FILE <ChevronRight size={16} className="ml-1" /></>
                      )}
                    </button>
                    
                    <a href={item.rawUrl} target="_blank" rel="noopener noreferrer" className="text-[#00ff41]/50 hover:text-[#00ff41] text-xs flex items-center">
                       <ExternalLink size={12} className="mr-1" /> RAW_SOURCE
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeedSection;