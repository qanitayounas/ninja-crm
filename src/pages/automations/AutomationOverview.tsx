import { 
  Zap, PlayCircle, CheckCircle2, XCircle, ArrowUpRight
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Card, cn } from '../../components/ui';
import { automationsData } from '../../data/automationsData';

const COLORS = ['#D4FF00', '#BFA9FF', '#3B82F6', '#F97316'];

export const AutomationOverview = () => {
  const { kpis, chartData, pieData, topWorkflows, recentActivity } = automationsData;

  const renderKPIIcon = (title: string) => {
    switch (title) {
      case 'Triggers Today': return <Zap size={20} className="text-ninja-dark" />;
      case 'Active Workflows': return <PlayCircle size={20} className="text-white" />;
      case 'Success Rate': return <CheckCircle2 size={20} className="text-white" />;
      default: return <ArrowUpRight size={20} className="text-ninja-dark" />;
    }
  };

  const getKPIColor = (style: string) => {
    switch (style) {
      case 'yellow': return 'bg-ninja-yellow';
      case 'purple': return 'bg-ninja-purple';
      case 'green': return 'bg-green-500';
      case 'lime': return 'bg-[#C1FF00]';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="p-5 border-none shadow-sm flex flex-col justify-between min-h-[140px]">
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-xl", getKPIColor(kpi.iconStyle))}>
                {renderKPIIcon(kpi.title)}
              </div>
              {kpi.change && (
                <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                  {kpi.change}
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{kpi.title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-ninja-dark leading-none">{kpi.value}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium mt-1">{kpi.subtitle}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-6 border-none shadow-sm">
          <h3 className="text-lg font-bold text-ninja-dark mb-6">Automation Activity (7 days)</h3>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                <Line type="monotone" dataKey="triggers" name="Triggers" stroke="#D4FF00" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="conversions" name="Conversions" stroke="#BFA9FF" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-ninja-yellow" />
              <span className="text-xs font-bold text-gray-500">Triggers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-ninja-purple" />
              <span className="text-xs font-bold text-gray-500">Conversions</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm flex flex-col bg-ninja-dark text-white">
          <h3 className="text-base font-bold text-white mb-4">By Type</h3>
          <div className="flex-1 h-[200px] min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                    return (
                      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold">
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-y-3 mt-4">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-bold text-white/70">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Lists Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="p-6 border-none shadow-sm">
          <h3 className="text-base font-bold text-ninja-dark mb-6">Top Workflows</h3>
          <div className="flex flex-col gap-4">
            {topWorkflows.map((wk, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn("px-2.5 py-1.5 rounded-lg text-xs font-black", wk.color)}>
                    {wk.id}
                  </div>
                  <div>
                    <p className="font-bold text-ninja-dark text-sm">{wk.name}</p>
                    <p className="text-[10px] font-bold text-gray-400">{wk.platform}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-ninja-dark text-sm">{wk.rate}</p>
                  <p className="text-[10px] font-bold text-gray-400">{wk.triggers} triggers</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm">
          <h3 className="text-base font-bold text-ninja-dark mb-6">Recent Activity</h3>
          <div className="flex flex-col gap-5">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="mt-1">
                  {activity.status === 'success' ? (
                    <CheckCircle2 size={16} className="text-green-500" />
                  ) : (
                    <XCircle size={16} className="text-red-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-ninja-dark">{activity.text}</p>
                  <p className="text-xs font-bold text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
