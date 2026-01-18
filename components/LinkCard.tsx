
import React, { useState } from 'react';
import { ShortenedLink } from '../types';

interface LinkCardProps {
  link: ShortenedLink;
  onDelete: (id: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const shortUrl = `lp.ai/${link.shortCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVisit = () => {
    // Simulating the redirection to the original URL
    window.open(link.originalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="glass rounded-2xl p-6 border-slate-700/50 hover:border-sky-500/50 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-1">
            {link.title}
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1 break-all line-clamp-1">{link.originalUrl}</p>
        </div>
        <button 
          onClick={() => onDelete(link.id)}
          className="p-2 text-slate-600 hover:text-red-400 transition-colors"
          title="Delete Link"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="bg-slate-900/80 rounded-xl p-4 flex items-center justify-between mb-4 border border-slate-800">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-bold mb-1">Short Link (Simulation)</span>
          <span className="font-mono text-sky-400 font-bold tracking-wider">{shortUrl}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleVisit}
            className="p-2 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-white transition-all"
            title="Visit Original URL"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
          <button 
            onClick={copyToClipboard}
            className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-500 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
            title="Copy to Clipboard"
          >
            {copied ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-400 mb-4 line-clamp-2 italic">"{link.summary}"</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {link.tags.map((tag, idx) => (
          <span key={idx} className="px-2 py-1 bg-slate-800 text-slate-400 rounded-md text-[10px] font-bold uppercase tracking-widest border border-slate-700">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <div className="flex items-center gap-4">
           <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Clicks</span>
            <span className="text-sm font-bold text-white">{link.analytics.clicks.toLocaleString()}</span>
          </div>
          <div className="flex flex-col border-l border-slate-800 pl-4">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Created</span>
            <span className="text-sm font-medium text-slate-400">{new Date(link.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="h-12 w-12 bg-white p-1 rounded-lg cursor-pointer hover:scale-110 transition-transform" onClick={handleVisit}>
           <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(link.originalUrl)}`} 
            alt="QR Code"
            className="w-full h-full object-contain"
           />
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
