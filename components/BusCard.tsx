
import React from 'react';
import { Bus } from '../types';

interface BusCardProps {
  bus: Bus;
  onClick?: () => void;
}

export const BusCard: React.FC<BusCardProps> = ({ bus, onClick }) => {
  const isDelayed = bus.status === 'Delayed';
  const statusColor = isDelayed ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400';
  const occupancyColor = bus.occupancy === 'High' ? 'text-amber-500' : 'text-indigo-500';

  return (
    <div 
      onClick={onClick}
      className="glass dark:bg-slate-900/40 p-5 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4 items-center">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${isDelayed ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-500'} transition-colors`}>
            <i className="fas fa-bus-simple"></i>
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {bus.number.split(' ')[0]}
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bus.route.split(' ')[0]} Route</p>
          </div>
        </div>
        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${isDelayed ? 'bg-red-50 text-red-600 dark:bg-red-900/30' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30'}`}>
          {bus.status}
        </span>
      </div>

      <div className="space-y-4 px-1">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">District Load</span>
            <span className={`text-sm font-extrabold ${occupancyColor}`}>{bus.occupancy}</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400">{bus.progress.toFixed(0)}% Completed</span>
        </div>
        
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-in-out ${isDelayed ? 'bg-red-500' : 'bg-indigo-500'}`} 
            style={{ width: `${bus.progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-widest pt-1">
          <span className="max-w-[80px] truncate">{bus.currentStopId.split('-')[1]} Station</span>
          <span className="max-w-[80px] truncate text-right">{bus.nextStopId.split('-')[1]} Station</span>
        </div>
      </div>
    </div>
  );
};
