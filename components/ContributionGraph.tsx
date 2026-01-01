import React, { useEffect, useState } from 'react';

interface Contribution {
  date: string;
  count: number;
  level: number; // 0-4
}

interface ApiResponse {
  total: { [year: string]: number };
  contributions: Contribution[];
}

const ContributionGraph: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Uses a public proxy to fetch GitHub contribution data without needing an API key on the client
    fetch('https://github-contributions-api.jogruber.de/v4/marllondevsec?y=last')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to fetch graph", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[150px] flex items-center justify-center border border-[#00ff41]/20 bg-[#00ff41]/5 animate-pulse">
        <div className="text-[#00ff41] font-mono text-xs">LOADING_DATA_STREAM...</div>
      </div>
    );
  }

  if (!data || !data.contributions) {
     return (
        <div className="w-full h-[150px] flex items-center justify-center border border-red-500/50 bg-red-900/10">
          <div className="text-red-500 font-mono text-xs">CONNECTION_REFUSED</div>
        </div>
     );
  }

  // Process data into weeks
  const weeks: Contribution[][] = [];
  let currentWeek: Contribution[] = [];
  
  // The API returns a flat array of days. We need to chunk them into weeks (Sunday to Saturday or similar)
  const lastYearContributions = data.contributions.slice(-371); // Approx 53 weeks

  lastYearContributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === lastYearContributions.length - 1) {
       weeks.push(currentWeek);
       currentWeek = [];
    }
  });

  // Calculate Month Labels positions
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthLabels: { x: number; label: string }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, index) => {
      // Use the first day of the week to determine the month
      if (week.length > 0) {
          const date = new Date(week[0].date);
          // Fix for timezone issues potentially shifting date, strictly speaking usually safe with YYYY-MM-DD string parsing in standard browsers
          // but relying on .getMonth() is fine.
          const month = date.getMonth(); 
          
          if (month !== lastMonth) {
              // Ensure we don't put a label if it's too close to the end (optional, but clean)
              monthLabels.push({ x: index * 14, label: monthNames[month] });
              lastMonth = month;
          }
      }
  });


  // Helper for colors
  const getColor = (level: number) => {
      switch(level) {
          case 1: return 'rgba(0, 255, 65, 0.25)';
          case 2: return 'rgba(0, 255, 65, 0.5)';
          case 3: return 'rgba(0, 255, 65, 0.75)';
          case 4: return '#00ff41';
          case 0: 
          default: return 'rgba(0, 255, 65, 0.05)';
      }
  };

  const totalContributions = Object.values(data.total).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="w-full">
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <svg 
          width={weeks.length * 14 + 20} 
          height={150} 
          viewBox={`0 0 ${weeks.length * 14 + 20} 150`} 
          className="block min-w-max"
        >
          {/* Month Labels */}
          {monthLabels.map((label, i) => (
               <text 
                  key={i} 
                  x={label.x} 
                  y={12} 
                  fill="#00ff41" 
                  className="text-[10px] opacity-70 font-mono uppercase"
               >
                  {label.label}
               </text>
          ))}

          {weeks.map((week, wIndex) => (
            <g key={wIndex} transform={`translate(${wIndex * 14}, 20)`}>
              {week.map((day, dIndex) => (
                <rect
                  key={day.date}
                  x={0}
                  y={dIndex * 15} // 12px height + 3px gap
                  width={11}
                  height={11}
                  rx={2}
                  ry={2}
                  fill={getColor(day.level)}
                  className="hover:stroke-[#00ff41] hover:stroke-1 transition-all"
                >
                  <title>{`${day.date}: ${day.count} contributions`}</title>
                </rect>
              ))}
            </g>
          ))}
        </svg>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mt-3 pt-3 border-t border-[#00ff41]/20">
         <div className="flex items-baseline gap-2 self-start md:self-auto group">
             <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_8px_rgba(0,255,65,0.8)] group-hover:text-[#00ff41] transition-colors">
                {totalContributions}
             </span>
             <span className="text-xs text-[#00ff41] font-mono tracking-widest uppercase opacity-80 mb-1">
                Contributions (Last Year)
             </span>
         </div>

         <div className="flex items-center gap-1 text-[10px] text-[#00ff41]/60 font-mono uppercase mt-2 md:mt-0">
            <span>Less</span>
            <div className="w-3 h-3 rounded-[2px]" style={{background: getColor(0)}}></div>
            <div className="w-3 h-3 rounded-[2px]" style={{background: getColor(1)}}></div>
            <div className="w-3 h-3 rounded-[2px]" style={{background: getColor(2)}}></div>
            <div className="w-3 h-3 rounded-[2px]" style={{background: getColor(3)}}></div>
            <div className="w-3 h-3 rounded-[2px]" style={{background: getColor(4)}}></div>
            <span>More</span>
         </div>
      </div>
    </div>
  );
};

export default ContributionGraph;