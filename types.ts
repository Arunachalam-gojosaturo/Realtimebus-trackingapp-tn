
export type City = 
  | 'Chennai' | 'Coimbatore' | 'Madurai' | 'Trichy' | 'Salem' | 'Tirunelveli'
  | 'Erode' | 'Tiruppur' | 'Vellore' | 'Thoothukudi' | 'Nagercoil' | 'Thanjavur' | 'Dindigul'
  | 'Ranipet' | 'Tenkasi' | 'Kanchipuram' | 'Chengalpattu' | 'Tiruvallur' | 'Cuddalore'
  | 'Villupuram' | 'Kanyakumari' | 'Karur' | 'Namakkal' | 'Nilgiris' | 'Theni';

export interface User {
  id: string;
  name: string;
  role: 'user' | 'admin';
  email: string;
  savedRoutes: string[];
  phone?: string;
  avatar?: string;
  preferences?: {
    notifications: boolean;
    locationSharing: boolean;
  };
}

export interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface Bus {
  id: string;
  number: string;
  route: string;
  city: City;
  currentStopId: string;
  nextStopId: string;
  progress: number;
  status: 'On Time' | 'Delayed' | 'Early';
  occupancy: 'Low' | 'Medium' | 'High';
  lastUpdated: string;
  lat: number;
  lng: number;
  direction: number;
}

export interface CommuteInsight {
  title: string;
  content: string;
  severity: 'info' | 'warning' | 'success';
}

export interface DashboardStats {
  activeBuses: number;
  onTimePercentage: number;
  dailyPassengers: number;
  alerts: number;
  avgWaitTime: number;
}

export interface TransitAlert {
  id: string;
  type: 'traffic' | 'weather' | 'maintenance' | 'general';
  message: string;
  timestamp: string;
}

export type AppTab = 'home' | 'tracking' | 'planner' | 'tools' | 'admin' | 'dashboard' | 'about' | 'profile';
