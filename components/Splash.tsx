
import React, { useEffect, useState } from 'react';

export const Splash: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center text-white">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl shadow-indigo-500/50 animate-bounce">
          <i className="fas fa-bus-simple"></i>
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-xs border-4 border-slate-950">
          <i className="fas fa-bolt"></i>
        </div>
      </div>
      
      <h1 className="text-3xl font-black tracking-tighter mb-2 animate-pulse">
        TN TRANSIT <span className="text-indigo-500 text-sm font-bold tracking-widest block text-center mt-1 uppercase">Vazhikatti Pro</span>
      </h1>
      
      <div className="w-64 h-1.5 bg-slate-800 rounded-full mt-10 overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-indigo-600 to-blue-400 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Initialising Fleet Systems...</p>
    </div>
  );
};
