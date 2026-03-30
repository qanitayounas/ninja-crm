import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie
} from 'recharts';
import {
    Calendar,
    CheckCircle2,
    XCircle,
    Download,
    ChevronDown,
    Users,
    TrendingUp
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';

const appointmentKPIs = [
    { label: 'Total Appointments', value: '482', change: '+12.5%', isPositive: true, icon: Calendar, color: 'text-ninja-yellow', bg: 'bg-ninja-yellow/10' },
    { label: 'Confirmed', value: '315', change: '+8.2%', isPositive: true, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'No Shows', value: '42', change: '-15.4%', isPositive: true, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Scheduled Rate', value: '65.4%', change: '+4.1%', isPositive: true, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
];

const appointmentsByDay = [
    { day: 'Mon', count: 45 },
    { day: 'Tue', count: 52 },
    { day: 'Wed', count: 48 },
    { day: 'Thu', count: 61 },
    { day: 'Fri', count: 55 },
    { day: 'Sat', count: 25 },
    { day: 'Sun', count: 12 },
];

const statusDistribution = [
    { name: 'Confirmed', value: 315, color: '#D4FF00' },
    { name: 'Pending', value: 85, color: '#BFA9FF' },
    { name: 'Cancelled', value: 40, color: '#FEE2E2' },
    { name: 'No Show', value: 42, color: '#EF4444' },
];

const topSetters = [
    { name: 'Carlos Ruiz', appts: 124, conv: '42%', revenue: '$45,200', initial: 'CR' },
    { name: 'Ana Martínez', appts: 108, conv: '38%', revenue: '$38,900', initial: 'AM' },
    { name: 'David López', appts: 89, conv: '35%', revenue: '$31,500', initial: 'DL' },
    { name: 'Laura Sánchez', appts: 78, conv: '32%', revenue: '$27,400', initial: 'LS' },
];

export const AppointmentsReport = () => {
    return (
        <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-black text-gray-400 mb-1 uppercase tracking-widest">
                        <span>Reports</span>
                        <span>/</span>
                        <span className="text-gray-600">Reporting Hub</span>
                    </div>
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Appointments Report</h1>
                    <p className="text-gray-500 font-medium font-bold">Deep dive into booking performance and attendance rates</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                        <Calendar size={18} className="text-gray-400" />
                        <span className="text-sm font-bold text-ninja-dark whitespace-nowrap">This Week</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    <Button className="flex items-center gap-2 shadow-lg shadow-ninja-yellow/20">
                        <Download size={18} />
                        <span>Export Data</span>
                    </Button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {appointmentKPIs.map((kpi, idx) => (
                    <Card key={idx} className="border-none shadow-sm group hover:scale-[1.02] transition-all">
                        <div className="flex items-center gap-4">
                            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", kpi.bg)}>
                                <kpi.icon className={kpi.color} size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <h4 className="text-2xl font-black text-ninja-dark">{kpi.value}</h4>
                                    <span className={cn("text-[10px] font-black", kpi.isPositive ? "text-green-500" : "text-red-500")}>
                                        {kpi.change}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none shadow-sm">
                    <h3 className="font-bold text-ninja-dark text-lg mb-8">Appointments by Day</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={appointmentsByDay}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} />
                                <Tooltip cursor={{ fill: '#F9FAFB' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                                    {appointmentsByDay.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.count > 50 ? '#D4FF00' : '#E5E7EB'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="border-none shadow-sm flex flex-col items-center justify-center text-center">
                    <h3 className="font-bold text-ninja-dark text-lg mb-4 w-full text-left">Status Distribution</h3>
                    <div className="h-[240px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusDistribution}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                        {statusDistribution.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Top Appointment Setters */}
            <Card className="px-0 py-0 overflow-hidden border-none shadow-sm">
                <div className="p-6 flex items-center justify-between border-b border-gray-50">
                    <h3 className="font-bold text-ninja-dark text-lg">Top Appointment Setters</h3>
                    <Button variant="ghost" className="text-gray-400 font-bold text-sm h-10">
                        <Users size={16} className="mr-2" />
                        View All
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Agent</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Appointments</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Conv. Rate</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Projected Revenue</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {topSetters.map((setter, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">
                                                {setter.initial}
                                            </div>
                                            <span className="text-sm font-bold text-ninja-dark">{setter.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-xs font-black text-ninja-dark">{setter.appts}</td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-black">
                                            {setter.conv}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center text-xs font-black text-green-600">{setter.revenue}</td>
                                    <td className="px-6 py-5 text-center">
                                        <Button variant="ghost" className="h-8 text-ninja-dark font-bold px-4">Details</Button>
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
