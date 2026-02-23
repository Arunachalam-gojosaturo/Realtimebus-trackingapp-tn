
import React from 'react';
import { DashboardStats, CommuteInsight } from '../types';

interface DashboardProps {
  stats: DashboardStats;
  insights: CommuteInsight[];
  loadingInsights: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, insights, loadingInsights }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Live Buses" value={stats.activeBuses} icon="fa-bus" color="text-indigo-600" />
        <StatCard title="On Time" value={`${stats.onTimePercentage}%`} icon="fa-clock" color="text-emerald-500" />
        <StatCard title="Passengers" value={`${stats.dailyPassengers}k`} icon="fa-users" color="text-blue-500" />
        <StatCard title="Active Alerts" value={stats.alerts} icon="fa-triangle-exclamation" color="text-amber-500" />
      </div>

      <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-sparkles text-indigo-500"></i>
            AI Route Insights
          </h2>
          <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 rounded-lg">Gemini Powered</span>
        </div>
        
        {loadingInsights ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <i className="fas fa-spinner fa-spin text-2xl mb-2"></i>
            <p className="text-sm">Vazhikatti AI is analyzing traffic...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <div key={idx} className={`p-4 rounded-xl border-l-4 ${
                insight.severity === 'warning' ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-500' : 
                insight.severity === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-500' :
                'bg-blue-50 dark:bg-blue-900/10 border-blue-500'
              }`}>
                <h4 className="font-bold text-sm mb-1">{insight.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{insight.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: string, color: string }) => (
  <div className="glass p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
    <i className={`fas ${icon} ${color} text-xl mb-2`}></i>
    <span className="text-2xl font-bold">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{title}</span>
  </div>
);
