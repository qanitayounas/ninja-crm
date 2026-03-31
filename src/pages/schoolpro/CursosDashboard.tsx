import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { 
  DollarSign, 
  Users, 
  BarChart3, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { Card, cn } from '../../components/ui';
import { courseMetrics, incomeGrowthData, studentFunnelData, dailyActivityData } from '../../data/schoolProData';

export const CursosDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courseMetrics.map((kpi, idx) => (
          <Card key={idx} className="p-6 border-none shadow-sm hover:scale-[1.02] transition-all bg-white relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center",
                kpi.icon === 'dollar' ? "bg-ninja-yellow text-ninja-dark" : 
                kpi.icon === 'users' ? "bg-purple-100 text-purple-600" : 
                kpi.icon === 'chart' ? "bg-ninja-yellow/20 text-ninja-dark" : 
                "bg-blue-100 text-blue-600"
              )}>
                {kpi.icon === 'dollar' && <DollarSign size={20} />}
                {kpi.icon === 'users' && <Users size={20} />}
                {kpi.icon === 'chart' && <BarChart3 size={20} />}
                {kpi.icon === 'check' && <CheckCircle2 size={20} />}
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black">
                <ArrowUpRight size={10} />
                {kpi.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
              <h4 className="text-2xl font-black text-ninja-dark mb-0.5">{kpi.value}</h4>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{kpi.subtext}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Growth Chart */}
        <Card className="lg:col-span-2 p-6 border-none shadow-sm">
          <h3 className="font-bold text-ninja-dark text-lg mb-8">Revenue Growth</h3>
          <div className="h-[220px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incomeGrowthData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4FF00" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#D4FF00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="income" stroke="#D4FF00" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" dot={{ r: 4, fill: '#D4FF00', strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Student Funnel Chart */}
        <Card className="p-6 border-none shadow-sm flex flex-col items-center">
          <h3 className="font-bold text-ninja-dark text-lg mb-8 self-start">Student Funnel</h3>
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <div className="h-[180px] sm:h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={studentFunnelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {studentFunnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3 mt-8">
              {studentFunnelData.map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-ninja-dark transition-colors">{item.name}: {item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Course Activity Bar Chart */}
      <Card className="p-6 border-none shadow-sm">
        <h3 className="font-bold text-ninja-dark text-lg mb-8">Daily Course Activity</h3>
        <div className="h-[200px] sm:h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyActivityData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="activity" fill="#BFA9FF" radius={[8, 8, 0, 0]} barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
