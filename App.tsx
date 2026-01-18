
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LinkShortener from './components/LinkShortener';
import LinkCard from './components/LinkCard';
import AnalyticsView from './components/AnalyticsView';
import { ShortenedLink, TabType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DASHBOARD);
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Initial demo data
  useEffect(() => {
    const savedLinks = localStorage.getItem('linkpulse_links');
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    } else {
      const demoLinks: ShortenedLink[] = [
        {
          id: '1',
          originalUrl: 'https://developer.google.com/gemini',
          shortCode: 'gm-dev',
          title: 'Google Gemini Developers',
          tags: ['AI', 'Google', 'Dev'],
          summary: 'Powerful generative AI models for developers.',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          analytics: {
            clicks: 1245,
            history: Array.from({ length: 7 }, (_, i) => ({
              date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
              clicks: Math.floor(Math.random() * 200) + 100
            }))
          }
        },
        {
          id: '2',
          originalUrl: 'https://tailwindcss.com/docs/installation',
          shortCode: 'tw-docs',
          title: 'Tailwind CSS Installation',
          tags: ['UI', 'CSS', 'Framework'],
          summary: 'Quick start guide for Tailwind CSS styling.',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          analytics: {
            clicks: 856,
            history: Array.from({ length: 7 }, (_, i) => ({
              date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
              clicks: Math.floor(Math.random() * 100) + 50
            }))
          }
        }
      ];
      setLinks(demoLinks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('linkpulse_links', JSON.stringify(links));
  }, [links]);

  const handleAddLink = (newLink: ShortenedLink) => {
    setLinks([newLink, ...links]);
    setActiveTab(TabType.LINKS);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const filteredLinks = links.filter(l => 
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow overflow-y-auto p-4 md:p-10 relative">
        {/* Background blobs for aesthetics */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                {activeTab === TabType.DASHBOARD && "Command Center"}
                {activeTab === TabType.LINKS && "My Assets"}
                {activeTab === TabType.ANALYTICS && "Performance Insights"}
                {activeTab === TabType.SETTINGS && "Configurations"}
              </h1>
              <p className="text-slate-400 mt-1">
                {activeTab === TabType.DASHBOARD && "Overview of your workspace performance."}
                {activeTab === TabType.LINKS && `Managing ${links.length} shortened destinations.`}
                {activeTab === TabType.ANALYTICS && "Real-time engagement tracking."}
                {activeTab === TabType.SETTINGS && "Personalize your platform experience."}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search links..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 pl-10 focus:outline-none focus:ring-1 focus:ring-sky-500 w-full md:w-64 transition-all"
                />
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-sky-500 transition-colors">
                <img src="https://picsum.photos/100/100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>

          {activeTab === TabType.DASHBOARD && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <LinkShortener onAddLink={handleAddLink} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Quick Stats on Dashboard */}
                 <div className="glass p-6 rounded-3xl col-span-1 flex flex-col justify-center">
                    <span className="text-sky-400 font-bold text-xs uppercase mb-2">Engaged Audience</span>
                    <h5 className="text-2xl font-bold text-white">4.2k Unique</h5>
                    <p className="text-slate-500 text-sm mt-1">Growth up by 22% this month.</p>
                 </div>
                 <div className="glass p-6 rounded-3xl col-span-1 lg:col-span-2 overflow-hidden flex items-center justify-between gap-8">
                    <div>
                      <span className="text-purple-400 font-bold text-xs uppercase mb-2">Smart Prediction</span>
                      <h5 className="text-xl font-bold text-white">Your links are trending in <span className="text-purple-400">#Tech</span></h5>
                      <p className="text-slate-500 text-sm mt-1">AI suggests sharing to LinkedIn for +40% reach.</p>
                    </div>
                    <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                       <svg className="w-10 h-10 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                       </svg>
                    </div>
                 </div>
              </div>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                  <button onClick={() => setActiveTab(TabType.LINKS)} className="text-sky-400 text-sm font-bold hover:underline">View All Assets</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLinks.slice(0, 3).map(link => (
                    <LinkCard key={link.id} link={link} onDelete={handleDeleteLink} />
                  ))}
                  {filteredLinks.length === 0 && (
                    <div className="col-span-full py-20 text-center glass rounded-3xl">
                      <p className="text-slate-500">No links found. Try shortening a URL above!</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {activeTab === TabType.LINKS && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-800 rounded-xl text-sm font-bold border border-slate-700 hover:bg-slate-700 transition-colors">Filter: Date</button>
                    <button className="px-4 py-2 bg-slate-800 rounded-xl text-sm font-bold border border-slate-700 hover:bg-slate-700 transition-colors">Tags</button>
                  </div>
                  <button 
                    onClick={() => { setActiveTab(TabType.DASHBOARD); setTimeout(() => window.scrollTo({top: 0, behavior: 'smooth'}), 100); }} 
                    className="px-6 py-2 bg-sky-500 text-white font-bold rounded-xl shadow-lg hover:shadow-sky-500/20"
                  >
                    + Create Link
                  </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLinks.map(link => (
                  <LinkCard key={link.id} link={link} onDelete={handleDeleteLink} />
                ))}
                {filteredLinks.length === 0 && (
                  <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed border-slate-700">
                    <p className="text-slate-500">No assets found in your library.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === TabType.ANALYTICS && (
            <AnalyticsView links={links} />
          )}

          {activeTab === TabType.SETTINGS && (
            <div className="glass rounded-3xl p-10 animate-in fade-in duration-500 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Platform Preferences</h2>
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">Auto-AI Enrichment</h4>
                    <p className="text-sm text-slate-500">Let Gemini automatically generate titles and tags.</p>
                  </div>
                  <div className="w-12 h-6 bg-sky-500 rounded-full relative p-1 cursor-pointer">
                    <div className="absolute right-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">QR Code Generation</h4>
                    <p className="text-sm text-slate-500">Include QR codes in your link management cards.</p>
                  </div>
                  <div className="w-12 h-6 bg-sky-500 rounded-full relative p-1 cursor-pointer">
                    <div className="absolute right-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">Link Domain</h4>
                    <p className="text-sm text-slate-500">The base domain for your shortened links.</p>
                  </div>
                  <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm outline-none">
                    <option>lp.ai</option>
                    <option>shrt.ly</option>
                    <option>custom.me</option>
                  </select>
                </div>
                <hr className="border-slate-800" />
                <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-colors border border-slate-700">
                  Save All Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Floating action button for mobile */}
        <button 
          onClick={() => { setActiveTab(TabType.DASHBOARD); }}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-2xl neon-glow active:scale-90 transition-transform z-50"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </main>
    </div>
  );
};

export default App;
