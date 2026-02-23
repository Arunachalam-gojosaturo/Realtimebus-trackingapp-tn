
import React, { useState } from 'react';
// Fix: Import STOPS from constants instead of types
import { BusStop, City } from '../types';
import { STOPS } from '../constants';

interface RoutePlannerProps {
  city: City;
}

export const RoutePlanner: React.FC<RoutePlannerProps> = ({ city }) => {
  const cityStops = STOPS[city] || [];
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handlePlan = () => {
    if (!source || !dest) return;
    // Simulate finding routes
    setResults([
      { bus: 'Route 12A', time: '12 mins', fare: '₹15', occupancy: 'Low' },
      { bus: 'Exp 404', time: '18 mins', fare: '₹25', occupancy: 'Medium' }
    ]);
  };

  return (
    <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-black mb-6 flex items-center gap-2">
        <i className="fas fa-route text-indigo-600"></i>
        Route Planner
      </h2>
      <div className="space-y-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Starting From</label>
          <select 
            value={source} onChange={(e) => setSource(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-indigo-500"
          >
            <option value="">Select Stop</option>
            {cityStops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="relative flex justify-center -my-2 z-10">
          <button className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800">
            <i className="fas fa-arrow-down-up-across-line text-xs"></i>
          </button>
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Destination</label>
          <select 
            value={dest} onChange={(e) => setDest(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-indigo-500"
          >
            <option value="">Select Stop</option>
            {cityStops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <button 
          onClick={handlePlan}
          className="w-full py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          Find Best Routes
        </button>

        {results.length > 0 && (
          <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {results.map((r, i) => (
              <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-indigo-600">{r.bus}</p>
                  <p className="text-[10px] text-slate-500 uppercase">Fare: {r.fare} • ETA: {r.time}</p>
                </div>
                <span className={`text-[9px] px-2 py-1 rounded-lg font-bold ${r.occupancy === 'Low' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  {r.occupancy} Load
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
