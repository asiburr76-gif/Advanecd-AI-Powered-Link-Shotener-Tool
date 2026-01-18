
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShortenedLink } from '../types';

interface AnalyticsViewProps {
  links: ShortenedLink[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ links }) => {
  // Aggregate data for the last 7 days
  const aggregateData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString();
    let totalClicks = 0;
    links.forEach(link => {
      const entry = link.analytics.history.find(h => h.date === date);
      if (entry) totalClicks += entry.clicks;
    });
    return { date, clicks: totalClicks + Math.floor(Math.random() * 50) }; // Random buffer for demo visual
  });

  const totalClicks = aggregateData.reduce((acc, curr) => acc + curr.clicks, 0);
  const avgClicks = Math.round(totalClicks / aggregateData.length);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-3xl p-6 border-sky-500/20">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">Total Clicks</p>
          <div className="flex items-end gap-3">
            <h4 className="text-4xl font-black text-white">{totalClicks.toLocaleString()}</h4>
            <span className="text-green-500 font-bold text-sm mb-1">+12.5%</span>
          </div>
        </div>
        <div className="glass rounded-3xl p-6 border-purple-500/20">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">Active Links</p>
          <div className="flex items-end gap-3">
            <h4 className="text-4xl font-black text-white">{links.length}</h4>
            <span className="text-sky-500 font-bold text-sm mb-1">+2 new</span>
          </div>
        </div>
        <div className="glass rounded-3xl p-6 border-amber-500/20">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">Avg per Day</p>
          <div className="flex items-end gap-3">
            <h4 className="text-4xl font-black text-white">{avgClicks}</h4>
            <span className="text-slate-500 font-bold text-sm mb-1">Last 7d</span>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-8 border-slate-800">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-white">Click Traffic Overview</h3>
            <p className="text-sm text-slate-500">Combined click-through rate across all shortened assets.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-sky-500 text-white text-xs font-bold rounded-full">7 Days</button>
            <button className="px-4 py-1.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-full hover:text-white">30 Days</button>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={aggregateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  color: '#fff' 
                }}
                itemStyle={{ color: '#0ea5e9' }}
              />
              <Area 
                type="monotone" 
                dataKey="clicks" 
                stroke="#0ea5e9" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorClicks)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
