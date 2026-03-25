import { useState } from 'react';
import { 
  Zap, GitBranch, FileText, Sparkles, Bell, Settings, 
  ArrowUpRight, PlayCircle, CheckCircle2, XCircle, ChevronRight
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { Card, Button, cn } from '../components/ui';
import { automationsData } from '../data/automationsData';

const COLORS = ['#D4FF00', '#BFA9FF', '#3B82F6', '#F97316'];

const NavItem = ({ icon: Icon, label, active = false, dot = false }: { icon: any, label: string, active?: boolean, dot?: boolean }) => (
  <button className={cn(
    "w-full flex items-center justify-between p-4 rounded-xl transition-all font-bold",
    active ? "bg-ninja-yellow text-ninja-dark shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-ninja-dark"
  )}>
    <div className="flex items-center gap-3">
      <Icon size={20} />
      <span>{label}</span>
    </div>
    {dot && <div className="w-2 h-2 rounded-full bg-orange-400" />}
  </button>
);

export const AutomationsPage = () => {
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
    switch(style) {
      case 'yellow': return 'bg-ninja-yellow';
      case 'purple': return 'bg-ninja-purple';
      case 'green': return 'bg-green-500';
      case 'lime': return 'bg-[#C1FF00]';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-10 animate-in fade-in duration-500 min-w-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Automation</h1>
          <p className="text-gray-400 font-medium">Workflow Control</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 min-w-0">
      {/* Left Sub-Sidebar */}
      <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-6">
        <nav className="flex flex-col gap-2">
          <NavItem icon={Zap} label="Overview" active />
          <NavItem icon={GitBranch} label="Workflows" />
          <NavItem icon={FileText} label="Templates" />
          <NavItem icon={Sparkles} label="MagnusFlow" dot />
          <NavItem icon={Bell} label="Alerts" />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        {/* Premium Card */}
        <div className="mt-4 lg:mt-auto bg-gradient-to-br from-ninja-yellow/40 to-ninja-purple/20 p-6 rounded-3xl border border-ninja-yellow/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-ninja-yellow/20 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-ninja-dark font-black">
              <Sparkles size={18} />
              <span>MagnusFlow Premium</span>
            </div>
            <p className="text-xs text-ninja-dark/70 font-bold leading-relaxed">
              Advanced organization for workflows at scale
            </p>
            <Button className="mt-2 text-xs py-2.5 bg-white text-ninja-dark hover:bg-gray-50 border border-transparent hover:border-ninja-yellow w-full flex items-center justify-center gap-2">
              <span>Explore</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Dashboard */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        
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

          <Card className="p-6 border-none shadow-sm flex flex-col">
            <h3 className="text-base font-bold text-ninja-dark mb-4">By Type</h3>
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
                   <span className="text-xs font-bold text-gray-500">{item.name}</span>
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

      </div>
    </div>
  );
};
