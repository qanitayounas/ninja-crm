import { useState, useEffect } from 'react';
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
import { 
  ArrowUpRight, 
  Users, 
  GitBranch, 
  Calendar as CalendarIcon, 
  BarChart2 as BarChartIcon,
  Zap,
  TrendingUp
} from 'lucide-react';
import { Card, Badge, Avatar, cn } from '../components/ui';
import dashboardData from '../data/dashboard.json';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import toast from 'react-hot-toast';

const COLORS = ['#D4FF00', '#BFA9FF', '#F97316', '#3B82F6'];

const KPI = ({ label, value, trend, isPositive, onClick }: any) => (
  <Card 
    onClick={onClick}
    className="group hover:scale-[1.02] transition-all bg-white border-none shadow-sm cursor-pointer p-8"
  >
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
        <h4 className="text-4xl font-black text-ninja-dark">{value}</h4>
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full",
        isPositive ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"
      )}>
        {isPositive ? <ArrowUpRight size={12} /> : <TrendingUp size={12} className="rotate-90" />}
        {trend}
      </div>
    </div>
  </Card>
);

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    setSyncError(null);
    try {
      await apiService.getDashboardStats();
    } catch (error: any) {
      console.error('Error loading dashboard stats:', error);
      if (error.status === 403 || error.status === 401) {
        setSyncError('Account data is currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
      } else {
        toast.error('Failed to load dashboard statistics');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Merge real stats with mock data for charts/activity
  const { leadGrowth, leadSources, recentActivity } = dashboardData;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Dashboard</h1>
          <p className="text-gray-400 font-medium font-bold text-sm">Tracking your business performance</p>
        </div>
      </div>

      {/* Alert Case: Branded Setup Notice */}
      {syncError && (
        <Card className="p-4 border-l-4 border-l-ninja-purple bg-ninja-purple/5 border-ninja-purple/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ninja-purple/10 rounded-lg text-ninja-purple">
              <Zap size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-ninja-dark">Module Synchronization</p>
              <p className="text-xs text-slate-500 font-medium">{syncError}</p>
            </div>
          </div>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KPI 
          label="Total Contacts" 
          value={syncError ? '--' : '5'} 
          trend="12.5%" 
          isPositive={true}
          onClick={() => navigate('/dashboard/contacts')}
        />
        <KPI 
          label="Total Deals" 
          value={syncError ? '--' : '4'} 
          trend="8.2%" 
          isPositive={true}
          onClick={() => navigate('/dashboard/pipelines')}
        />
        <KPI 
          label="Pipelines" 
          value={syncError ? '--' : '1'} 
          trend="0%" 
          isPositive={true}
          onClick={() => navigate('/dashboard/pipelines')}
        />
        <KPI 
          label="Conversion Rate" 
          value={syncError ? '--' : '4.8%'} 
          trend="2.4%" 
          isPositive={false}
          onClick={() => navigate('/dashboard/reports')}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
        <div onClick={() => navigate('/dashboard/contacts')} className="block group cursor-pointer h-full">
          <Card className="p-6 flex items-center gap-4 h-full hover:shadow-lg transition-all border-none bg-white rounded-3xl">
            <div className="h-12 w-12 rounded-2xl bg-ninja-yellow/10 text-ninja-dark flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Users size={22} className="text-gray-400 group-hover:text-ninja-dark transition-colors" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-ninja-dark">View Clients</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5 whitespace-nowrap">See all leads and contacts</p>
            </div>
          </Card>
        </div>
        
        <div onClick={() => navigate('/dashboard/pipeline')} className="block group cursor-pointer h-full">
          <Card className="p-6 flex items-center gap-4 h-full hover:shadow-lg transition-all border-none bg-white rounded-3xl">
            <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <GitBranch size={22} className="text-purple-300 group-hover:text-purple-600 transition-colors" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-ninja-dark">Create Deal</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5 whitespace-nowrap">Start a new opportunity</p>
            </div>
          </Card>
        </div>

        <div onClick={() => navigate('/dashboard/calendar')} className="block group cursor-pointer h-full">
          <Card className="p-6 flex items-center gap-4 h-full hover:shadow-lg transition-all border-none bg-white rounded-3xl">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <CalendarIcon size={22} className="text-blue-300 group-hover:text-blue-500 transition-colors" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-ninja-dark">Schedule Meeting</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5 whitespace-nowrap">Book a new appointment</p>
            </div>
          </Card>
        </div>

        <div onClick={() => navigate('/dashboard/reports')} className="block group cursor-pointer h-full">
          <Card className="p-6 flex items-center gap-4 h-full hover:shadow-lg transition-all border-none bg-white rounded-3xl">
            <div className="h-12 w-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <BarChartIcon size={22} className="text-orange-300 group-hover:text-orange-500 transition-colors" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-ninja-dark">View Report</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5 whitespace-nowrap">Check analytics & insights</p>
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
                  dot={false}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Lead Sources Pie */}
        <Card className="p-8 bg-ninja-dark text-white border-none flex flex-col rounded-3xl">
          <h3 className="text-xl font-black mb-1">Sources</h3>
          <p className="text-sm text-white/40 mb-10 font-bold">Where your leads come from</p>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'WHATSAPP', value: 400 },
                    { name: 'MESSENGER', value: 300 },
                    { name: 'INSTAGRAM', value: 300 },
                    { name: 'SMS', value: 200 },
                  ]}
                  innerRadius={70}
                  outerRadius={90}
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
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-8">
            {[
              { name: 'WHATSAPP', color: COLORS[0] },
              { name: 'MESSENGER', color: COLORS[2] },
              { name: 'INSTAGRAM', color: COLORS[1] },
              { name: 'SMS', color: COLORS[3] },
            ].map((source, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: source.color }} />
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none">{source.name}</span>
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
              {recentActivity.map((activity: any) => (
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
