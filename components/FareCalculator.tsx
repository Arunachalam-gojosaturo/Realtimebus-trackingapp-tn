
import React, { useState } from 'react';

export const FareCalculator: React.FC = () => {
  const [distance, setDistance] = useState<number>(0);
  const [type, setType] = useState<'ordinary' | 'express' | 'luxury'>('ordinary');

  const rates = { ordinary: 0.58, express: 0.75, luxury: 1.25 };
  const baseFare = { ordinary: 5, express: 10, luxury: 20 };
  
  const fare = Math.max(baseFare[type], Math.round(distance * rates[type]));

  return (
    <div className="glass dark:bg-slate-900/40 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl">
      <h2 className="text-2xl font-black mb-8 flex items-center gap-4 tracking-tight">
        <i className="fas fa-coins text-amber-500"></i>
        Fare Prediction Engine
      </h2>
      <div className="space-y-10">
        <div>
          <div className="flex justify-between mb-4 px-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Travel Distance</label>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{distance} km</span>
          </div>
          <input 
            type="range" min="0" max="150" value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[9px] mt-3 font-black text-slate-400 uppercase tracking-widest px-1">
             <span>0 km</span>
             <span>District Boundary (150km)</span>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Service Configuration</label>
          <div className="grid grid-cols-3 gap-4">
            {(['ordinary', 'express', 'luxury'] as const).map(t => (
              <button 
                key={t}
                onClick={() => setType(t)}
                className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all transform active:scale-95 ${type === t ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm border border-transparent'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-8 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/20 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform"></div>
          <p className="text-[10px] text-indigo-500 dark:text-indigo-400 uppercase font-black tracking-[0.3em] mb-2">Predicted Ticket Cost</p>
          <div className="flex items-center justify-center gap-2">
             <span className="text-xl font-bold text-indigo-400 dark:text-indigo-600 opacity-50">₹</span>
             <p className="text-5xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">{fare}</p>
          </div>
          <p className="text-[8px] text-slate-400 dark:text-slate-500 mt-4 uppercase font-bold tracking-widest">*Calculated based on standard state transit tariffs.</p>
        </div>
      </div>
    </div>
  );
};
