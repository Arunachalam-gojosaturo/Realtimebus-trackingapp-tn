
import React from 'react';

export const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600 blur-[150px] rounded-full"></div>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 gap-16 py-20">
        <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-black uppercase tracking-widest">
            <i className="fas fa-sparkles"></i>
            Next-Gen Transit for Tamil Nadu
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
            Navigate Your City <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Like a Pro.</span>
          </h1>
          <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed">
            Real-time bus tracking across all 38 districts. Powered by AI insights, advanced route planning, and live fleet diagnostics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={onStart}
              className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-2xl shadow-indigo-600/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            >
              Get Started Now
              <i className="fas fa-arrow-right"></i>
            </button>
            <button className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl border border-slate-800 transition-all">
              View Schedules
            </button>
          </div>
          
          <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
            <div className="text-center lg:text-left">
              <p className="text-2xl font-black text-white">2.5M+</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Commuters</p>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="text-center lg:text-left">
              <p className="text-2xl font-black text-white">45,000</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Daily Trips</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative hidden lg:block">
          <div className="relative z-20 w-full aspect-square bg-gradient-to-br from-indigo-500/20 to-transparent rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000" 
              alt="Modern Bus"
              className="w-full h-full object-cover mix-blend-overlay opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            
            {/* Floating UI Elements */}
            <div className="absolute bottom-10 left-10 right-10 p-6 glass border border-white/10 rounded-3xl animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <p className="text-white font-black text-sm">Route 12G - On Time</p>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Chennai Central → Guindy</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/30 blur-[60px] rounded-full"></div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-slate-500">
          <i className="fas fa-location-dot"></i>
          <span className="text-xs font-bold uppercase tracking-widest">Serving all major cities in Tamil Nadu</span>
        </div>
        <div className="flex gap-6 text-slate-400 text-lg">
          <i className="fab fa-apple cursor-pointer hover:text-white transition-colors"></i>
          <i className="fab fa-google-play cursor-pointer hover:text-white transition-colors"></i>
          <i className="fab fa-twitter cursor-pointer hover:text-white transition-colors"></i>
        </div>
      </footer>
    </div>
  );
};
