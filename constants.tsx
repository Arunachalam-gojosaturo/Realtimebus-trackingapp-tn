
import { City, BusStop, Bus } from './types';

export const TN_CITIES: City[] = [
  'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Tirunelveli',
  'Erode', 'Tiruppur', 'Vellore', 'Thoothukudi', 'Nagercoil', 'Thanjavur', 'Dindigul',
  'Ranipet', 'Tenkasi', 'Kanchipuram', 'Chengalpattu', 'Tiruvallur', 'Cuddalore',
  'Villupuram', 'Kanyakumari', 'Karur', 'Namakkal', 'Nilgiris', 'Theni'
];

const CITY_COORDS: Record<City, { lat: number, lng: number }> = {
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Coimbatore: { lat: 11.0168, lng: 76.9558 },
  Madurai: { lat: 9.9252, lng: 78.1198 },
  Trichy: { lat: 10.7905, lng: 78.7047 },
  Salem: { lat: 11.6643, lng: 78.1460 },
  Tirunelveli: { lat: 8.7139, lng: 77.7567 },
  Erode: { lat: 11.3410, lng: 77.7172 },
  Tiruppur: { lat: 11.1085, lng: 77.3411 },
  Vellore: { lat: 12.9165, lng: 79.1325 },
  Thoothukudi: { lat: 8.7642, lng: 78.1348 },
  Nagercoil: { lat: 8.1833, lng: 77.4119 },
  Thanjavur: { lat: 10.7870, lng: 79.1378 },
  Dindigul: { lat: 10.3673, lng: 77.9803 },
  Ranipet: { lat: 12.9271, lng: 79.3326 },
  Tenkasi: { lat: 8.9591, lng: 77.3151 },
  Kanchipuram: { lat: 12.8342, lng: 79.7036 },
  Chengalpattu: { lat: 12.6841, lng: 79.9836 },
  Tiruvallur: { lat: 13.1437, lng: 79.9113 },
  Cuddalore: { lat: 11.7480, lng: 79.7714 },
  Villupuram: { lat: 11.9401, lng: 79.4861 },
  Kanyakumari: { lat: 8.0883, lng: 77.5385 },
  Karur: { lat: 10.9601, lng: 78.0766 },
  Namakkal: { lat: 11.2189, lng: 78.1672 },
  Nilgiris: { lat: 11.4100, lng: 76.7031 },
  Theni: { lat: 10.0104, lng: 77.4768 }
};

export const STOPS: Record<City, BusStop[]> = TN_CITIES.reduce((acc, city) => {
  const base = CITY_COORDS[city];
  acc[city] = [
    { id: `${city.toLowerCase()}-1`, name: `${city} Central Bus Stand`, lat: base.lat, lng: base.lng },
    { id: `${city.toLowerCase()}-2`, name: `${city} Railway Jn`, lat: base.lat + 0.015, lng: base.lng + 0.01 },
    { id: `${city.toLowerCase()}-3`, name: `${city} Government Hospital`, lat: base.lat - 0.015, lng: base.lng - 0.01 },
    { id: `${city.toLowerCase()}-4`, name: `${city} Market Square`, lat: base.lat + 0.01, lng: base.lng + 0.02 },
    { id: `${city.toLowerCase()}-5`, name: `${city} Bypass Junction`, lat: base.lat - 0.01, lng: base.lng - 0.02 },
  ];
  return acc;
}, {} as Record<City, BusStop[]>);

export const INITIAL_BUSES: Bus[] = TN_CITIES.flatMap(city => {
  const base = CITY_COORDS[city];
  return [
    {
      id: `bus-${city}-1`,
      number: `TN-${Math.floor(Math.random() * 99 + 1)} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(1000 + Math.random() * 9000)}`,
      route: `${city} Circular Route 1`,
      city: city,
      currentStopId: `${city.toLowerCase()}-1`,
      nextStopId: `${city.toLowerCase()}-2`,
      progress: Math.random() * 100,
      status: Math.random() > 0.85 ? 'Delayed' : 'On Time',
      occupancy: Math.random() > 0.7 ? 'High' : (Math.random() > 0.4 ? 'Medium' : 'Low'),
      lastUpdated: new Date().toLocaleTimeString(),
      lat: base.lat + (Math.random() - 0.5) * 0.02,
      lng: base.lng + (Math.random() - 0.5) * 0.02,
      direction: Math.random() * 360
    },
    {
      id: `bus-${city}-2`,
      number: `TN-${Math.floor(Math.random() * 99 + 1)} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(1000 + Math.random() * 9000)}`,
      route: `${city} Main Road Exp`,
      city: city,
      currentStopId: `${city.toLowerCase()}-4`,
      nextStopId: `${city.toLowerCase()}-5`,
      progress: Math.random() * 100,
      status: 'On Time',
      occupancy: 'Medium',
      lastUpdated: new Date().toLocaleTimeString(),
      lat: base.lat + (Math.random() - 0.5) * 0.02,
      lng: base.lng + (Math.random() - 0.5) * 0.02,
      direction: Math.random() * 360
    }
  ];
});
