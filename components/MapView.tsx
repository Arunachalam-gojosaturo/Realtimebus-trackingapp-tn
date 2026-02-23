
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Bus, BusStop } from '../types';

interface MapViewProps {
  buses: Bus[];
  stops: BusStop[];
  onBusClick: (bus: Bus) => void;
}

export const MapView: React.FC<MapViewProps> = ({ buses, stops, onBusClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (!svgRef.current || stops.length === 0) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const latExtent = d3.extent(stops, d => d.lat) as [number, number];
    const lngExtent = d3.extent(stops, d => d.lng) as [number, number];
    
    const pad = 0.03 / zoomLevel;
    const x = d3.scaleLinear().domain([lngExtent[0] - pad, lngExtent[1] + pad]).range([60, width - 60]);
    const y = d3.scaleLinear().domain([latExtent[0] - pad, latExtent[1] + pad]).range([height - 60, 60]);

    const g = svg.append('g');
    
    // Background Grid with low contrast
    const isDark = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? '#1e293b' : '#f1f5f9';
    
    for(let i=0; i<30; i++) {
      g.append('line').attr('x1', 0).attr('x2', width).attr('y1', i*40).attr('y2', i*40).attr('stroke', gridColor).attr('stroke-width', 1);
      g.append('line').attr('y1', 0).attr('y2', height).attr('x1', i*40).attr('x2', i*40).attr('stroke', gridColor).attr('stroke-width', 1);
    }

    // Connect stops with smooth curve
    const lineGen = d3.line<BusStop>().x(d => x(d.lng)).y(d => y(d.lat)).curve(d3.curveBundle.beta(0.85));
    g.append('path')
      .datum(stops)
      .attr('fill', 'none')
      .attr('stroke', '#6366f1')
      .attr('stroke-width', 10)
      .attr('stroke-linecap', 'round')
      .attr('opacity', isDark ? 0.08 : 0.06)
      .attr('d', lineGen);

    // Stops rendering
    const stopMarkers = g.selectAll('.stop')
      .data(stops)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${x(d.lng)}, ${y(d.lat)})`);

    stopMarkers.append('circle')
      .attr('r', 5)
      .attr('fill', isDark ? '#0f172a' : '#fff')
      .attr('stroke', isDark ? '#334155' : '#cbd5e1')
      .attr('stroke-width', 2);

    stopMarkers.append('text')
      .attr('dy', 16)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-[8px] font-black fill-slate-400 dark:fill-slate-600 uppercase tracking-tighter pointer-events-none')
      .text(d => d.name.split(' ')[0]);

    // Buses rendering
    const busGroups = g.selectAll('.bus')
      .data(buses)
      .enter()
      .append('g')
      .attr('class', 'cursor-pointer transition-all duration-1000')
      .attr('transform', d => `translate(${x(d.lng)}, ${y(d.lat)})`)
      .on('click', (event, d) => onBusClick(d));

    // Direction Triangle
    busGroups.append('path')
      .attr('d', 'M0 -14 L5 -6 L-5 -6 Z')
      .attr('fill', d => d.status === 'Delayed' ? '#ef4444' : '#6366f1')
      .attr('transform', d => `rotate(${d.direction})`);

    // Main Body
    busGroups.append('rect')
      .attr('x', -11).attr('y', -7).attr('width', 22).attr('height', 14).attr('rx', 4)
      .attr('fill', d => d.status === 'Delayed' ? '#ef4444' : '#4f46e5')
      .attr('stroke', '#fff').attr('stroke-width', 2);

    // Label
    busGroups.append('text')
      .attr('dy', -20)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-[9px] font-black fill-slate-900 dark:fill-white drop-shadow-md')
      .text(d => d.number.split(' ')[0]);

  }, [buses, stops, onBusClick, zoomLevel]);

  return (
    <div className="relative w-full h-[550px] bg-white dark:bg-slate-950 rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
      <svg ref={svgRef} className="w-full h-full" />
      
      {/* Controls */}
      <div className="absolute top-8 right-8 flex flex-col gap-3">
        <button onClick={() => setZoomLevel(l => Math.min(4, l + 0.5))} className="w-12 h-12 glass dark:bg-slate-900 rounded-2xl flex items-center justify-center text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"><i className="fas fa-plus"></i></button>
        <button onClick={() => setZoomLevel(l => Math.max(0.5, l - 0.5))} className="w-12 h-12 glass dark:bg-slate-900 rounded-2xl flex items-center justify-center text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"><i className="fas fa-minus"></i></button>
      </div>

      <div className="absolute bottom-8 left-8 glass dark:bg-slate-900/80 p-5 rounded-[2rem] border border-white/50 dark:border-slate-800 shadow-2xl backdrop-blur-xl">
         <h4 className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.2em] mb-4">Signal Protocol</h4>
         <div className="space-y-3">
           <LegendItem color="bg-indigo-600" label="Active Express" />
           <LegendItem color="bg-red-500" label="Distress/Delay" />
           <LegendItem color="bg-slate-300 dark:bg-slate-700" label="Regional Stop" />
         </div>
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }: any) => (
  <div className="flex items-center gap-3">
    <div className={`w-3.5 h-3.5 rounded-lg ${color} shadow-sm`}></div>
    <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-tighter">{label}</span>
  </div>
);
