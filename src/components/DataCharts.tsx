import { useRef, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#ff0022', '#ff6b00', '#ffb700', '#00d4ff', '#22c55e', '#f6f6f6'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0c0c0c] border border-white/20 px-4 py-3">
        <p className="text-xs text-[#f6f6f6]/60 mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-sm font-bold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}{entry.payload?.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface ChartConfig {
  type: 'bar' | 'pie';
  title: string;
  data: Record<string, any>[];
  xKey?: string;
  dataKey?: string;
  nameKey?: string;
  valueKey?: string;
  color?: string;
  unit?: string;
}

interface DataChartsProps {
  charts: ChartConfig[];
}

export default function DataCharts({ charts }: DataChartsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full py-8">
      <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#f6f6f6]/30 border border-white/10 px-2 py-1">DATA JOURNALISM</span>
        <span className="text-xs text-[#f6f6f6]/20">数据新闻</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {charts.map((chart, idx) => (
          <div
            key={idx}
            className={`border border-white/10 bg-white/[0.01] p-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${idx * 200}ms` }}
          >
            <h4 className="text-sm font-bold text-[#f6f6f6] mb-1">{chart.title}</h4>
            <p className="text-[10px] text-[#f6f6f6]/30 mb-4">数据来源：公开报道整理</p>
            <ResponsiveContainer width="100%" height={chart.type === 'pie' ? 280 : 240}>
              {chart.type === 'bar' ? (
                <BarChart data={chart.data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(246,246,246,0.05)" />
                  <XAxis dataKey={chart.xKey} tick={{ fill: 'rgba(246,246,246,0.35)', fontSize: 10 }} axisLine={{ stroke: 'rgba(246,246,246,0.1)' }} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(246,246,246,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey={chart.dataKey!} name={chart.title} fill={chart.color || COLORS[idx]} radius={[2, 2, 0, 0]} maxBarSize={45} />
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={chart.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey={chart.valueKey!}
                    nameKey={chart.nameKey!}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ stroke: 'rgba(246,246,246,0.2)' }}
                  >
                    {chart.data.map((_: any, i: number) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
