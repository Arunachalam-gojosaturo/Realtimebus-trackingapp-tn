
import React from 'react';
import { User, City, DashboardStats, CommuteInsight } from '../types';

interface HomeViewProps {
  user: User;
  city: City;
  stats: DashboardStats;
  insights: CommuteInsight[];
  onNavigate: (tab: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ user, city, stats, insights, onNavigate }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest">District Intelligence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium capitalize">{city} Hub</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Vanakkam, {user.name.split(' ')[0]}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 max-w-lg">Advanced fleet diagnostics show 98% network stability in the {city} region today.</p>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
           <button 
             onClick={() => onNavigate('tracking')}
             className="flex-1 lg:flex-none px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 transition-all active:scale-95"
           >
             <i className="fas fa-location-crosshairs"></i>
             Live Tracking
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <HomeStat title="Fleet Health" value="Optimal" icon="fa-heart-pulse" color="text-emerald-500" trend="+2%" />
        <HomeStat title="Live Services" value={stats.activeBuses} icon="fa-bus" color="text-indigo-500" trend="Active" />
        <HomeStat title="District Load" value="High" icon="fa-users" color="text-blue-500" trend="Moderate" />
        <HomeStat title="Avg Delay" value="1.8m" icon="fa-bolt" color="text-amber-500" trend="-0.4m" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-8">
          <div className="relative h-[320px] rounded-[3rem] overflow-hidden group shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1400" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Public Transit"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent"></div>
            <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-xl">
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.3em] mb-4">Journey Optimisation</span>
              <h3 className="text-white text-4xl font-extrabold tracking-tighter mb-4 leading-tight">Elite Route Planning <br/> at Your Fingertips</h3>
              <p className="text-slate-300 text-base mb-8 line-clamp-2">Discover sub-10 minute wait times and zero-congestion routes tailored to your schedule.</p>
              <button 
                onClick={() => onNavigate('planner')}
                className="w-fit px-10 py-4 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                Plan Journey
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div onClick={() => onNavigate('tools')} className="glass dark:bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group shadow-sm">
               <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:rotate-6 transition-transform">
                 <i className="fas fa-money-bill-transfer text-2xl"></i>
               </div>
               <h4 className="font-extrabold text-2xl mb-3">Fare Predictive AI</h4>
               <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Get accurate pricing for ordinary, express, and deluxe services based on live stage data.</p>
            </div>
            <div className="glass dark:bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm">
               <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:rotate-6 transition-transform">
                 <i className="fas fa-leaf text-2xl"></i>
               </div>
               <h4 className="font-extrabold text-2xl mb-3">Green Commute</h4>
               <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Your public transit choice saved 12.4kg of CO2 today. View your district leaderboard.</p>
            </div>
          </div>
        </div>

        <div className="glass dark:bg-slate-900/60 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 space-y-8 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-2xl tracking-tight flex items-center gap-3">
              <i className="fas fa-sparkles text-indigo-500"></i>
              Vazhikatti AI
            </h3>
            <div className="flex items-center gap-1.5">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-[10px] font-black text-emerald-500 uppercase">Live</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {insights.length > 0 ? insights.map((insight, i) => (
              <div key={i} className="group relative">
                <div className={`p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-400/30 transition-all ${
                  insight.severity === 'warning' ? 'border-l-4 border-l-amber-500' : 
                  insight.severity === 'success' ? 'border-l-4 border-l-emerald-500' : 
                  'border-l-4 border-l-indigo-500'
                }`}>
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">{insight.title}</p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">{insight.content}</p>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400 italic text-sm text-center">
                <i className="fas fa-brain text-3xl mb-4 opacity-10"></i>
                <p>AI is processing district feeds...</p>
              </div>
            )}
          </div>
          
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
             <button className="w-full py-5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95">Network Diagnostic View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeStat = ({ title, value, icon, color, trend }: any) => (
  <div className="glass dark:bg-slate-900/40 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 flex items-center gap-5 group hover:border-indigo-500/30 transition-all shadow-sm">
    <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-slate-950 flex items-center justify-center text-2xl ${color} shadow-sm group-hover:scale-105 transition-transform`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{title}</p>
        <span className="text-[9px] font-bold text-emerald-500">{trend}</span>
      </div>
      <p className="text-2xl font-black tracking-tight">{value}</p>
    </div>
  </div>
);
