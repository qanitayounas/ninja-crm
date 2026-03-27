import { useState } from 'react';
import {
  Zap, FileText, Sparkles, Bell, Settings,
  ArrowUpRight, PlayCircle, CheckCircle2, XCircle, ChevronRight, Workflow
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Card, Button, cn } from '../components/ui';
import { automationsData } from '../data/automationsData';

const COLORS = ['#D4FF00', '#BFA9FF', '#3B82F6', '#F97316'];

const NavItem = ({ icon: Icon, label, active = false, dot = false, onClick }: { icon: any, label: string, active?: boolean, dot?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center justify-between p-4 rounded-xl transition-all font-bold",
      active ? "bg-ninja-yellow text-ninja-dark shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-ninja-dark"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} />
      <span>{label}</span>
    </div>
    {dot && <div className="w-2 h-2 rounded-full bg-orange-400" />}
  </button>
);

export const AutomationsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
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
            <NavItem icon={Zap} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <NavItem icon={Workflow} label="Workflows" active={activeTab === 'workflows'} onClick={() => setActiveTab('workflows')} />
            <NavItem icon={FileText} label="Templates" active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} />
            <NavItem icon={Sparkles} label="MagnusFlow" dot active={activeTab === 'magnusflow'} onClick={() => setActiveTab('magnusflow')} />
            <NavItem icon={Bell} label="Alerts" active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} />
            <NavItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
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
              <Button 
                onClick={() => toast.success('Opening MagnusFlow Premium details...')}
                className="mt-2 text-xs py-2.5 bg-white text-ninja-dark hover:bg-gray-50 border border-transparent hover:border-ninja-yellow w-full flex items-center justify-center gap-2"
              >
                <span>Explore</span>
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content Dashboard */}
        <div className="flex-1 flex flex-col gap-6 min-w-0 bg-gray-50/30 rounded-3xl p-2 md:p-6 lg:bg-transparent lg:p-0">
          
          {activeTab === 'overview' && (
            <>
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
            </>
          )}

          {activeTab === 'workflows' && (
            <div className="flex flex-col items-center justify-center py-20 px-4 animate-in fade-in duration-500">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-ninja-yellow/50 to-ninja-purple/30 flex items-center justify-center mb-8 shadow-sm">
                <Workflow size={36} className="text-ninja-dark drop-shadow-sm" />
              </div>
              
              <h2 className="text-3xl font-black text-ninja-dark mb-3 text-center">Workflows</h2>
              <p className="text-gray-500 font-medium text-center mb-10 max-w-md">
                This module is under development and will be available soon
              </p>

              <Card className="w-full max-w-3xl p-8 border border-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-3xl bg-white relative z-10 mb-8">
                <h3 className="text-lg font-bold text-ninja-dark text-center mb-8">Planned Features</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-ninja-yellow shrink-0" />
                    <span className="text-sm font-medium text-gray-600">Visual workflow builder</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-ninja-yellow shrink-0" />
                    <span className="text-sm font-medium text-gray-600">Custom triggers and actions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-ninja-yellow shrink-0" />
                    <span className="text-sm font-medium text-gray-600">Advanced logical conditions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-ninja-yellow shrink-0" />
                    <span className="text-sm font-medium text-gray-600">Real-time testing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-ninja-yellow shrink-0" />
                    <span className="text-sm font-medium text-gray-600">Workflow versioning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-ninja-yellow shrink-0" />
                    <span className="text-sm font-medium text-gray-600">Performance analysis</span>
                  </div>
                </div>
              </Card>

              <Button 
                onClick={() => toast.success('Early access request sent successfully!')}
                className="bg-[#D4FF00] hover:bg-[#c2e600] text-ninja-dark font-black px-8 py-3.5 rounded-2xl shadow-lg shadow-ninja-yellow/20 flex items-center gap-2"
              >
                <span>+ Request Early Access</span>
              </Button>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'workflows' && (
            <div className="flex flex-col items-center justify-center py-32 text-gray-300">
              <Settings size={48} className="mb-4 opacity-20" />
              <p className="font-bold text-sm">View of {activeTab} under development</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
