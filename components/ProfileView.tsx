
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onUpdate: (updates: Partial<User>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'settings'>('details');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
      // Optional: Add a toast notification here
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-fade-in">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-36 h-36 rounded-[3rem] bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white text-5xl font-black shadow-2xl border-8 border-white dark:border-slate-900">
            {formData.name.charAt(0).toUpperCase() || 'V'}
          </div>
          <button className="absolute bottom-1 right-1 w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-4 border-slate-50 dark:border-slate-900 flex items-center justify-center text-indigo-600 hover:scale-110 transition-transform">
            <i className="fas fa-pencil-alt text-sm"></i>
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{formData.name || 'Transit Voyager'}</h2>
          <p className="text-xs font-black text-indigo-500 uppercase tracking-[0.3em] mt-1">{user.role} Authorization Active</p>
        </div>
      </div>

      <div className="flex p-1.5 bg-slate-200/50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setActiveSubTab('details')}
          className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'details' ? 'bg-white dark:bg-slate-800 shadow-lg text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          My Profile
        </button>
        <button 
          onClick={() => setActiveSubTab('settings')}
          className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'settings' ? 'bg-white dark:bg-slate-800 shadow-lg text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Preferences
        </button>
      </div>

      {activeSubTab === 'details' ? (
        <div className="glass dark:bg-slate-900/40 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8">
          <div className="space-y-6">
            <InputField 
              label="Legal Full Name" 
              name="name" 
              value={formData.name} 
              icon="fa-user" 
              onChange={handleInputChange} 
            />
            <InputField 
              label="Primary Contact Email" 
              name="email" 
              value={formData.email} 
              icon="fa-envelope" 
              onChange={handleInputChange} 
            />
            <InputField 
              label="Mobile Registry" 
              name="phone" 
              value={formData.phone} 
              icon="fa-phone" 
              placeholder="+91" 
              onChange={handleInputChange} 
            />
          </div>
          
          <button 
            onClick={handleSave} disabled={isSaving}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
          >
            {isSaving ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-check-circle"></i>}
            {isSaving ? 'Syncing...' : 'Update Records'}
          </button>
        </div>
      ) : (
        <div className="glass dark:bg-slate-900/40 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">System Settings</h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Version 2.4.0-Pro</span>
          </div>
          <div className="space-y-4">
            <SettingToggle icon="fa-bell" label="Service Notifications" desc="Real-time delay and route alerts" defaultOn />
            <SettingToggle icon="fa-location-crosshairs" label="Location Precision" desc="High-accuracy arrival estimates" defaultOn />
            <SettingToggle icon="fa-shield-halved" label="Privacy Mode" desc="Mask my exact pick-up location" />
            <SettingToggle icon="fa-palette" label="High Contrast Theme" desc="Enhanced accessibility for outdoors" />
          </div>
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
             <button className="w-full py-4 text-red-500 dark:text-red-400 font-black text-xs uppercase tracking-[0.2em] hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all">
                Deactivate Account Profile
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, name, value, icon, placeholder, onChange }: any) => (
  <div className="space-y-2">
    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{label}</label>
    <div className="relative group">
      <i className={`fas ${icon} absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors`}></i>
      <input 
        type="text" 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold focus:ring-4 ring-indigo-500/10 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
      />
    </div>
  </div>
);

const SettingToggle = ({ icon, label, desc, defaultOn }: any) => {
  const [isOn, setIsOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer" onClick={() => setIsOn(!isOn)}>
      <div className="flex gap-4 items-center">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${isOn ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <div>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">{label}</p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter mt-0.5">{desc}</p>
        </div>
      </div>
      <div className={`w-14 h-7 rounded-full relative p-1 transition-colors duration-300 ${isOn ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 transform ${isOn ? 'translate-x-7' : 'translate-x-0'}`}></div>
      </div>
    </div>
  );
};
