
import React, { useState } from 'react';
import { analyzeUrl } from '../services/geminiService';
import { ShortenedLink } from '../types';

interface LinkShortenerProps {
  onAddLink: (link: ShortenedLink) => void;
}

const LinkShortener: React.FC<LinkShortenerProps> = ({ onAddLink }) => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !url.startsWith('http')) {
      alert('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setIsAnalyzing(true);
    try {
      const enrichment = await analyzeUrl(url);
      const shortCode = Math.random().toString(36).substring(2, 8);
      
      const newLink: ShortenedLink = {
        id: crypto.randomUUID(),
        originalUrl: url,
        shortCode: shortCode,
        title: enrichment.title,
        tags: enrichment.tags,
        summary: enrichment.summary,
        createdAt: new Date().toISOString(),
        analytics: {
          clicks: 0,
          history: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            clicks: 0
          }))
        }
      };

      onAddLink(newLink);
      setUrl('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-8 mb-10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg className="w-24 h-24 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Shorten a New URL</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 relative z-10">
        <div className="flex-grow relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here (e.g., https://example.com/very/long/path)..."
            className="w-full bg-slate-900/50 border border-slate-700 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder-slate-500"
            disabled={isAnalyzing}
          />
          {isAnalyzing && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-sky-500"></div>
              <span className="text-sky-400 text-sm font-medium">AI Analyzing...</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isAnalyzing || !url}
          className={`px-10 py-4 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-sky-500/20 active:scale-95 flex items-center justify-center gap-2 ${isAnalyzing ? 'animate-pulse' : ''}`}
        >
          {isAnalyzing ? 'Processing...' : 'Shorten'}
          {!isAnalyzing && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </button>
      </form>
      
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          AI-Powered Descriptions
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
          Instant Redirection
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
          Advanced Analytics
        </div>
      </div>
    </div>
  );
};

export default LinkShortener;
