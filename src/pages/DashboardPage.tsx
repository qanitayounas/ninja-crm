import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, GitBranch, Calendar as CalendarIcon, BarChart2 as BarChartIcon } from 'lucide-react';
import { Card, Badge, Avatar, cn } from '../components/ui';
import dashboardData from '../data/dashboard.json';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#D4FF00', '#BFA9FF', '#F97316', '#3B82F6'];

export const DashboardPage = () => {
  const { kpis, leadGrowth, leadSources, recentActivity } = dashboardData;
  const navigate = useNavigate();

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Dashboard</h1>
          <p className="text-gray-400 font-medium">Tracking your business performance</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="group hover:scale-[1.02] transition-all bg-white border-slate-100 hover:shadow-xl hover:shadow-ninja-yellow/5">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.title}</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-black text-ninja-dark">{kpi.value}</span>
                <div className={cn(
                  "flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full",
                  kpi.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {kpi.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {kpi.change}%
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
        <div onClick={() => navigate('/dashboard/contacts')} className="block group cursor-pointer">
          <Card className="p-5 flex flex-col items-start gap-3 h-full hover:shadow-lg transition-all border-slate-100 group-hover:border-ninja-yellow/50 bg-white">
            <div className="h-10 w-10 rounded-xl bg-ninja-yellow/10 text-ninja-dark flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-ninja-dark">View Clients</h3>
              <p className="text-xs text-slate-400 mt-0.5">See all leads and contacts</p>
            </div>
          </Card>
        </div>
        
        <div onClick={() => navigate('/dashboard/pipeline')} className="block group cursor-pointer">
          <Card className="p-5 flex flex-col items-start gap-3 h-full hover:shadow-lg transition-all border-slate-100 group-hover:border-ninja-purple/50 bg-white">
            <div className="h-10 w-10 rounded-xl bg-ninja-purple/10 text-ninja-purple flex items-center justify-center group-hover:scale-110 transition-transform">
              <GitBranch size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-ninja-dark">Create Deal</h3>
              <p className="text-xs text-slate-400 mt-0.5">Start a new opportunity</p>
            </div>
          </Card>
        </div>

        <div onClick={() => navigate('/dashboard/calendar')} className="block group cursor-pointer">
          <Card className="p-5 flex flex-col items-start gap-3 h-full hover:shadow-lg transition-all border-slate-100 group-hover:border-blue-500/50 bg-white">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarIcon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-ninja-dark">Schedule Meeting</h3>
              <p className="text-xs text-slate-400 mt-0.5">Book a new appointment</p>
            </div>
          </Card>
        </div>

        <div onClick={() => navigate('/dashboard/reports')} className="block group cursor-pointer">
          <Card className="p-5 flex flex-col items-start gap-3 h-full hover:shadow-lg transition-all border-slate-100 group-hover:border-orange-500/50 bg-white">
            <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChartIcon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-ninja-dark">View Report</h3>
              <p className="text-xs text-slate-400 mt-0.5">Check analytics & insights</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-6 md:p-8 bg-white border-none shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-bold text-ninja-dark">Lead Growth</h3>
              <p className="text-sm text-slate-400">Monthly conversion statistics</p>
            </div>
          </div>
          <div className="h-[280px] md:h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#D4FF00" 
                  strokeWidth={4} 
                  dot={{ fill: '#D4FF00', strokeWidth: 2, r: 4, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Lead Sources Pie */}
        <Card className="p-6 md:p-8 bg-ninja-dark text-white border-none flex flex-col">
          <h3 className="text-xl font-bold mb-1">Sources</h3>
          <p className="text-sm text-white/40 mb-6">Where your leads come from</p>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSources}
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {leadSources.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', color: '#000' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {leadSources.map((source, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{source.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-0 bg-white border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ninja-dark">Recent Activity</h3>
          <button className="text-xs font-black text-ninja-purple uppercase tracking-wider hover:opacity-70">View All</button>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <Avatar name={activity.contactName} size="sm" />
                      <span className="text-sm font-bold text-ninja-dark">{activity.contactName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">{activity.action}</td>
                  <td className="px-6 py-5">
                    <Badge status={activity.status}>{activity.status}</Badge>
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-400">{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
