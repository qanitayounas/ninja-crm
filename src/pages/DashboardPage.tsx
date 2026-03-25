  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, Badge, Avatar, cn } from '../components/ui';
import dashboardData from '../data/dashboard.json';

const COLORS = ['#D4FF00', '#BFA9FF', '#F97316', '#3B82F6'];

export const DashboardPage = () => {
  const { kpis, leadGrowth, leadSources, recentActivity } = dashboardData;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Dashboard</h1>
          <p className="text-gray-400 font-medium">General overview of your account</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="p-5 md:p-6 hover:shadow-lg transition-all border-none shadow-sm group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{kpi.title}</span>
              <div className={cn(
                "p-1.5 rounded-lg",
                kpi.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              )}>
                {kpi.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-ninja-dark">{kpi.value}</span>
              <span className={cn(
                "text-sm font-semibold",
                kpi.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {kpi.isPositive ? '+' : ''}{kpi.change}%
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-5 md:p-6 border-none shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-ninja-dark">Lead Growth</h3>
            <select className="bg-gray-50 border-none text-xs font-bold rounded-lg px-2 py-1 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#D4FF00" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#D4FF00', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 md:p-6 border-none shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-ninja-dark mb-6">Lead Sources</h3>
          <div className="flex-1 flex flex-col justify-between">
            <div className="h-[200px] md:h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {leadSources.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-6">
              {leadSources.map((source, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs text-ninja-dark font-bold truncate">{source.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-0 border-none shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-50">
          <h3 className="text-lg font-bold text-ninja-dark">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar w-full">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-50">
                <th className="px-5 py-4 font-bold">Prospect</th>
                <th className="px-5 py-4 font-bold">Action</th>
                <th className="px-5 py-4 font-bold text-center">Time</th>
                <th className="px-5 py-4 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={activity.contactName} size="sm" className="flex-shrink-0" />
                      <span className="font-bold text-ninja-dark whitespace-nowrap">{activity.contactName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs md:text-sm text-gray-600 font-medium">
                    <span className="line-clamp-1">{activity.action}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="text-xs text-gray-400 font-bold whitespace-nowrap">{activity.time}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Badge status={activity.status}>{activity.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

