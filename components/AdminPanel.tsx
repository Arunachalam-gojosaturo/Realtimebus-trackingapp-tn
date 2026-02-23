
import React, { useState } from 'react';
import { Bus, TransitAlert, City } from '../types';
import { TN_CITIES } from '../constants';

interface AdminPanelProps {
  buses: Bus[];
  alerts: TransitAlert[];
  onAddAlert: (msg: string, type: TransitAlert['type']) => void;
  onUpdateBus: (busId: string, updates: Partial<Bus>) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ buses, alerts, onAddAlert, onUpdateBus }) => {
  const [newAlert, setNewAlert] = useState('');
  const [alertType, setAlertType] = useState<TransitAlert['type']>('general');
  const [activeView, setActiveView] = useState<'fleet' | 'comms'>('fleet');

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center justify-between">
         <h2 className="text-3xl font-black tracking-tighter">Command Center</h2>
         <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setActiveView('fleet')}
              className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === 'fleet' ? 'bg-white dark:bg-slate-800 shadow-md text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Fleet Matrix
            </button>
            <button 
              onClick={() => setActiveView('comms')}
              className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === 'comms' ? 'bg-white dark:bg-slate-800 shadow-md text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Comms Relay
            </button>
         </div>
      </div>

      {activeView === 'fleet' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass dark:bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
            <h2 className="text-xl font-extrabold mb-8 flex items-center gap-3">
              <i className="fas fa-server text-indigo-500"></i>
              District Fleet Telemetry
            </h2>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left border-separate border-spacing-y-3">
                <thead className="text-[10px] uppercase text-slate-400 font-black tracking-widest">
                  <tr>
                    <th className="px-4 pb-2">Unit ID</th>
                    <th className="px-4 pb-2">District</th>
                    <th className="px-4 pb-2">Signal</th>
                    <th className="px-4 pb-2 text-right">Relay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-transparent">
                  {buses.slice(0, 10).map(bus => (
                    <tr key={bus.id} className="group bg-slate-50/50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-900 transition-all rounded-2xl overflow-hidden shadow-sm">
                      <td className="px-4 py-4 font-extrabold rounded-l-2xl">{bus.number.split(' ')[0]}</td>
                      <td className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-tighter">{bus.city}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                           <span className={`w-2 h-2 rounded-full ${bus.status === 'Delayed' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                           <span className={`text-[10px] font-black uppercase ${bus.status === 'Delayed' ? 'text-red-500' : 'text-emerald-500'}`}>
                             {bus.status === 'Delayed' ? 'Alert' : 'Nominal'}
                           </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right rounded-r-2xl">
                        <button 
                          onClick={() => onUpdateBus(bus.id, { status: bus.status === 'Delayed' ? 'On Time' : 'Delayed' })}
                          className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95"
                        >
                          <i className="fas fa-arrows-rotate text-xs"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass dark:bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
            <h2 className="text-xl font-extrabold mb-8 flex items-center gap-3">
              <i className="fas fa-tower-broadcast text-amber-500"></i>
              Broadcast Terminal
            </h2>
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Secure Message Stream</label>
                <textarea 
                  value={newAlert}
                  onChange={(e) => setNewAlert(e.target.value)}
                  placeholder="Dispatch fleet alerts to active commuters..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-sm font-medium focus:ring-4 ring-indigo-500/10 outline-none h-40 transition-all"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Signal Priority</label>
                  <select 
                    value={alertType}
                    onChange={(e) => setAlertType(e.target.value as any)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest outline-none transition-all focus:ring-4 ring-indigo-500/10"
                  >
                    <option value="general">Standard Dispatch</option>
                    <option value="traffic">Traffic Obstruction</option>
                    <option value="weather">Meteorological Alert</option>
                    <option value="maintenance">Fleet Maintenance</option>
                  </select>
                </div>
                <button 
                  onClick={() => { if(newAlert) { onAddAlert(newAlert, alertType); setNewAlert(''); } }}
                  className="self-end px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5 active:scale-95 text-xs uppercase tracking-widest"
                >
                  Broadcast
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass dark:bg-slate-900/60 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 h-[600px] flex flex-col shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-500/20">
                   <i className="fas fa-headset"></i>
                </div>
                <div>
                   <h2 className="font-extrabold text-2xl tracking-tight">Active Comms Relay</h2>
                   <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1">Status: Operational</p>
                </div>
             </div>
             <div className="flex gap-4">
                <button className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400"><i className="fas fa-gear text-xs"></i></button>
                <button className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400"><i className="fas fa-expand text-xs"></i></button>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
             <ChatBubble sender="Driver-122" msg="Congestion at Madurai Junction. ETA adjusted by +8 mins." time="10:04 AM" />
             <ChatBubble sender="System" msg="Automated reroute suggestion sent to Fleet 12." time="10:05 AM" isSystem />
             <ChatBubble sender="Dispatch Control" msg="Acknowledged. Standby for weather update." time="10:06 AM" />
             <ChatBubble sender="Driver-89" msg="Mechanical alert on unit TN-45-A-1022. Proceeding to base." time="10:10 AM" isUrgent />
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex gap-6">
             <input 
               type="text" 
               placeholder="Transmit data to active units..." 
               className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-8 py-5 text-sm font-medium outline-none focus:ring-4 ring-indigo-500/10 transition-all" 
             />
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20 transition-all transform active:scale-90">
               <i className="fas fa-paper-plane text-lg"></i>
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ChatBubble = ({ sender, msg, time, isSystem, isUrgent }: any) => (
  <div className={`flex flex-col ${isSystem ? 'items-center py-4' : 'items-start'}`}>
    <div className={`max-w-[75%] p-5 rounded-[2rem] text-sm shadow-sm ${
      isSystem ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 italic font-medium px-10' : 
      (isUrgent ? 'bg-red-50 dark:bg-red-950/20 border-2 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800 font-medium')
    }`}>
      {!isSystem && <span className="block font-black text-[9px] uppercase mb-1.5 opacity-60 tracking-widest">{sender}</span>}
      {msg}
    </div>
    {!isSystem && <span className="text-[9px] text-slate-400 font-bold mt-2 mx-6 uppercase tracking-widest">{time}</span>}
  </div>
);
