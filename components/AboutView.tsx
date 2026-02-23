
import React from 'react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest">
          <i className="fas fa-project-diagram"></i>
          Official Project Hub
        </div>
        <h2 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Our Mission</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Pioneering the future of public transportation in Tamil Nadu through advanced real-time tracking and AI-driven diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass dark:bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 mb-6">
            <i className="fas fa-layer-group text-xl"></i>
          </div>
          <h3 className="text-xl font-black mb-6 text-slate-900 dark:text-white">Project Identity</h3>
          <div className="space-y-5">
            <DetailItem label="Group Code" value="12141-G67" />
            <DetailItem label="Official Title" value="Mobile Application for Real-time Bus Tracking in Tamil Nadu Cities" />
            <DetailItem label="Project Mentor" value="LOGANAYAKI K" />
          </div>
        </div>

        <div className="glass dark:bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
            <i className="fas fa-user-group text-xl"></i>
          </div>
          <h3 className="text-xl font-black mb-6 text-slate-900 dark:text-white">Lead Contributors</h3>
          <div className="space-y-3">
            {['ABINAYA V', 'AKSHAYA P', 'Anushiya V', 'Arunachalam M'].map((name, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{name}</span>
                <span className="text-[10px] font-black uppercase text-indigo-500 opacity-60">Full-Stack Dev</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass dark:bg-indigo-900/10 p-10 rounded-[3rem] border border-indigo-100 dark:border-indigo-900/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full"></div>
        <div className="relative flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center text-indigo-600 text-3xl mb-8 shadow-lg">
            <i className="fas fa-envelope-open-text"></i>
          </div>
          <h4 className="text-2xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">TANII Official Communication</h4>
          <div className="bg-white/50 dark:bg-slate-950/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 italic text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            "Dear Participant, Greetings from TANII. We are pleased to inform you that your project group has been successfully formed. Please find the details regarding access to the AI Mentor Portal shortly."
          </div>
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
             <div className="flex flex-col items-center">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Powered By</span>
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">ICT Academy</span>
             </div>
             <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
             <div className="flex flex-col items-center">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sponsored By</span>
                <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">TANII Hub</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">{value}</p>
  </div>
);
