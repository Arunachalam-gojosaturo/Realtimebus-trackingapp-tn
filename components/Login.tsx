
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth logic
    const role: 'admin' | 'user' = email.includes('admin') ? 'admin' : 'user';
    // Fix: Added missing savedRoutes property to match User interface
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0] || 'Transit Voyager',
      email: email || 'user@tntransit.com',
      role: role,
      savedRoutes: []
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[100px] rounded-full"></div>

      <div className="relative w-full max-w-md animate-in zoom-in-95 duration-500">
        <div className="glass p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl text-white text-3xl mb-4 shadow-lg shadow-indigo-200 dark:shadow-none">
              <i className="fas fa-bus-simple"></i>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">TN Transit <span className="text-indigo-600">Live</span></h1>
            <p className="text-slate-500 text-sm">{isLogin ? 'Sign in to your transit account' : 'Join the smarter commute network'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-4 text-slate-400 text-xs">
            <span>Chennai</span>
            <span>•</span>
            <span>Madurai</span>
            <span>•</span>
            <span>Coimbatore</span>
          </div>
        </div>
      </div>
    </div>
  );
};
