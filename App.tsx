
import React, { useState, useEffect, useMemo } from 'react';
import { City, Bus, DashboardStats, CommuteInsight, User, TransitAlert, AppTab } from './types';
import { TN_CITIES, STOPS, INITIAL_BUSES } from './constants';
import { getCommuteInsights } from './services/geminiService';
import { ThemeToggle } from './components/ThemeToggle';
import { MapView } from './components/MapView';
import { BusCard } from './components/BusCard';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { AdminPanel } from './components/AdminPanel';
import { FareCalculator } from './components/FareCalculator';
import { RoutePlanner } from './components/RoutePlanner';
import { Splash } from './components/Splash';
import { LandingPage } from './components/LandingPage';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ProfileView } from './components/ProfileView';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedCity, setSelectedCity] = useState<City>('Chennai');
  const [buses, setBuses] = useState<Bus[]>(INITIAL_BUSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [insights, setInsights] = useState<CommuteInsight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [alerts, setAlerts] = useState<TransitAlert[]>([
    { id: '1', type: 'general', message: 'Fleet monitoring systems are fully operational.', timestamp: new Date().toISOString() }
  ]);

  const handleLogin = (newUser: User) => setUser(newUser);
  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };
  const handleUpdateUser = (updates: Partial<User>) => {
    if (user) setUser({ ...user, ...updates });
  };

  const updateBus = (busId: string, updates: Partial<Bus>) => {
    setBuses(prev => prev.map(bus => (bus.id === busId ? { ...bus, ...updates } : bus)));
  };

  const stats: DashboardStats = useMemo(() => {
    const cityBuses = buses.filter(b => b.city === selectedCity);
    return {
      activeBuses: cityBuses.length,
      onTimePercentage: cityBuses.length ? Math.round((cityBuses.filter(b => b.status === 'On Time').length / cityBuses.length) * 100) : 0,
      dailyPassengers: 350 + Math.floor(Math.random() * 100),
      alerts: cityBuses.filter(b => b.status === 'Delayed').length,
      avgWaitTime: 8 + Math.floor(Math.random() * 5)
    };
  }, [buses, selectedCity]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) return;
    setLoadingInsights(true);
    getCommuteInsights(selectedCity).then(data => {
      setInsights(data);
      setLoadingInsights(false);
    });
  }, [selectedCity, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev => prev.map(bus => {
        let newProgress = bus.progress + (Math.random() * 1.5);
        if (newProgress >= 100) newProgress = 0;
        return {
          ...bus,
          progress: newProgress,
          lastUpdated: new Date().toLocaleTimeString(),
          lat: bus.lat + (Math.random() - 0.5) * 0.0006,
          lng: bus.lng + (Math.random() - 0.5) * 0.0006,
          direction: bus.direction + (Math.random() - 0.5) * 15
        };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredBuses = useMemo(() => {
    return buses.filter(bus => 
      bus.city === selectedCity && 
      (bus.number.toLowerCase().includes(searchQuery.toLowerCase()) || 
       bus.route.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [buses, selectedCity, searchQuery]);

  if (showSplash) return <Splash onComplete={() => setShowSplash(false)} />;
  if (!user) return <LandingPage onStart={() => setUser({} as any)} />;
  if (Object.keys(user).length === 0) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 flex flex-col md:flex-row">
      {/* Navigation - Sidebar (Desktop) */}
      <aside className="fixed left-0 top-0 bottom-0 w-24 lg:w-72 hidden md:flex flex-col glass border-r border-slate-200 dark:border-slate-800 z-50">
        <div className="p-10 flex justify-center lg:justify-start">
           <div className="w-14 h-14 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-2xl shadow-xl shadow-indigo-500/20">
              <i className="fas fa-bus-simple"></i>
           </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarBtn active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon="fa-house" label="Home Hub" />
          <SidebarBtn active={activeTab === 'tracking'} onClick={() => setActiveTab('tracking')} icon="fa-map-location-dot" label="Fleet Track" />
          <SidebarBtn active={activeTab === 'planner'} onClick={() => setActiveTab('planner')} icon="fa-route" label="Route Plan" />
          <SidebarBtn active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} icon="fa-toolbox" label="Tools" />
          <SidebarBtn active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon="fa-circle-info" label="Project Details" />
          {user.role === 'admin' && <SidebarBtn active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} icon="fa-shield-halved" label="Admin Terminal" />}
        </nav>

        <div className="p-8 space-y-6">
           <ThemeToggle theme={theme} toggle={toggleTheme} />
           <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-black text-xs uppercase tracking-widest">
             <i className="fas fa-power-off text-lg"></i>
             <span className="hidden lg:block">Exit</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:pl-24 lg:pl-72 flex flex-col main-content min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-slate-200 dark:border-slate-800 px-6 lg:px-10 py-5 flex items-center justify-between">
           <div className="flex items-center gap-4 lg:gap-8 flex-1">
              <div className="relative group">
                <select 
                  value={selectedCity} onChange={(e) => setSelectedCity(e.target.value as City)}
                  className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-4 pr-10 py-3 text-xs font-black uppercase tracking-widest focus:ring-4 ring-indigo-500/10 transition-all cursor-pointer outline-none shadow-sm"
                >
                  {TN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"></i>
              </div>

              <div className="relative flex-1 max-w-md hidden sm:block">
                <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input 
                  type="text" placeholder="Route or bus #..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900/50 border-none rounded-2xl pl-12 pr-6 py-3 text-sm focus:ring-4 ring-indigo-500/10 outline-none font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>
           </div>

           <div className="flex items-center gap-4 lg:gap-8 ml-4">
              <div onClick={() => setActiveTab('profile')} className="hidden sm:flex flex-col items-end cursor-pointer group">
                <span className="text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{user.name || 'Anonymous'}</span>
                <span className={`text-[10px] uppercase font-black tracking-widest ${user.role === 'admin' ? 'text-red-500' : 'text-indigo-500'}`}>{user.role || 'Guest'}</span>
              </div>
              <div onClick={() => setActiveTab('profile')} className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-xl shadow-indigo-500/20 text-lg border-2 border-white dark:border-slate-800 cursor-pointer hover:scale-105 active:scale-95 transition-all">
                 {user.name ? user.name.charAt(0).toUpperCase() : 'V'}
              </div>
           </div>
        </header>

        {/* Dynamic Viewport */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="animate-fade-in">
            {activeTab === 'home' && (
              <HomeView user={user} city={selectedCity} stats={stats} insights={insights} onNavigate={(tab) => setActiveTab(tab)} />
            )}
            {activeTab === 'tracking' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                 <div className="xl:col-span-2 space-y-8">
                   <div className="flex justify-between items-center">
                      <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Live Monitor</h2>
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full">
                         <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                         <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Diagnostics</span>
                      </div>
                   </div>
                   <MapView buses={filteredBuses} stops={STOPS[selectedCity]} onBusClick={setSelectedBus} />
                   {selectedBus && (
                     <div className="glass dark:bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
                       <div className="flex justify-between items-center mb-6">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                               <i className="fas fa-bus"></i>
                            </div>
                            <div>
                               <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedBus.number}</h3>
                               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selectedBus.route}</p>
                            </div>
                         </div>
                         <button onClick={() => setSelectedBus(null)} className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><i className="fas fa-times"></i></button>
                       </div>
                       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                          <AnalyticBox label="Load" value={selectedBus.occupancy} sub="District Flow" highlight={selectedBus.occupancy === 'High'} />
                          <AnalyticBox label="Status" value={selectedBus.status} sub="Fleet Log" highlight={selectedBus.status === 'Delayed'} />
                          <AnalyticBox label="Next ETA" value="6m" sub="Scheduled" />
                          <AnalyticBox label="Signal" value="Optimal" sub="GPS Link" />
                       </div>
                     </div>
                   )}
                 </div>
                 <div className="space-y-6">
                    <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                       <i className="fas fa-list-ul text-indigo-500"></i>
                       Nearby Services
                    </h2>
                    <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                       {filteredBuses.map(b => <BusCard key={b.id} bus={b} onClick={() => setSelectedBus(b)} />)}
                    </div>
                 </div>
              </div>
            )}
            {activeTab === 'planner' && <div className="max-w-2xl mx-auto"><RoutePlanner city={selectedCity} /></div>}
            {activeTab === 'tools' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <FareCalculator />
                <div className="glass dark:bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
                  <h3 className="text-xl font-black mb-8 flex items-center gap-4">
                     <i className="fas fa-bookmark text-indigo-500"></i>
                     Frequent Hubs
                  </h3>
                  <div className="space-y-4">
                     {['Guindy Circular - 12G', 'Central Express - 45B', 'CMBT Link - D70'].map(r => (
                       <div key={r} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex justify-between items-center group cursor-pointer hover:border-indigo-500/50 transition-all">
                          <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{r}</span>
                          <i className="fas fa-chevron-right text-[10px] text-slate-300 group-hover:text-indigo-500"></i>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'about' && <AboutView />}
            {activeTab === 'profile' && <ProfileView user={user} onUpdate={handleUpdateUser} />}
            {activeTab === 'admin' && user.role === 'admin' && (
              <AdminPanel 
                buses={buses} 
                alerts={alerts} 
                onAddAlert={(msg, type) => {
                  const alert: TransitAlert = { id: Date.now().toString(), type, message: msg, timestamp: new Date().toISOString() };
                  setAlerts([alert, ...alerts]);
                }} 
                onUpdateBus={updateBus} 
              />
            )}
          </div>
        </main>

        {/* Navigation - Bottom (Mobile) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-200 dark:border-slate-800 py-4 flex justify-around items-center z-50 px-6 safe-area-inset-bottom">
           <MobileNavBtn active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon="fa-house" label="Home" />
           <MobileNavBtn active={activeTab === 'tracking'} onClick={() => setActiveTab('tracking')} icon="fa-map-location-dot" label="Track" />
           <MobileNavBtn active={activeTab === 'planner'} onClick={() => setActiveTab('planner')} icon="fa-route" label="Plan" />
           <MobileNavBtn active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon="fa-circle-info" label="About" />
           <MobileNavBtn active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon="fa-user-circle" label="Me" />
        </nav>
      </div>
    </div>
  );
};

const SidebarBtn = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`w-full flex items-center justify-center lg:justify-start gap-6 p-5 rounded-[2rem] transition-all relative overflow-hidden group ${active ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-indigo-600'}`}>
    {active && <div className="absolute left-0 top-0 bottom-0 w-2 bg-white rounded-r-full"></div>}
    <i className={`fas ${icon} text-lg transition-transform group-hover:scale-110`}></i>
    <span className="hidden lg:block font-black text-[11px] uppercase tracking-widest">{label}</span>
  </button>
);

const MobileNavBtn = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-indigo-600 -translate-y-1.5' : 'text-slate-400'}`}>
    <i className={`fas ${icon} text-xl`}></i>
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const AnalyticBox = ({ label, value, sub, highlight }: any) => (
  <div className={`p-6 rounded-4xl border transition-all ${highlight ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30' : 'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 shadow-sm'}`}>
    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">{label}</p>
    <p className={`text-2xl font-black tracking-tight ${highlight ? 'text-red-600 dark:text-red-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{value}</p>
    <p className="text-[10px] text-slate-400 font-bold mt-1 opacity-60 uppercase tracking-tighter">{sub}</p>
  </div>
);

export default App;
