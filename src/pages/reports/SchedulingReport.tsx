import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import {
    Zap,
    Calendar,
    MousePointer2,
    Download,
    ChevronDown,
    Timer,
    CheckCircle2,
    Layout,
    AlertCircle
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';

const schedulingKPIs = [
    { label: 'Booking Velocity', value: '1.2h', change: '-15%', isPositive: true, icon: Zap, color: 'text-ninja-yellow', bg: 'bg-ninja-yellow/10' },
    { label: 'Avg. Lead Time', value: '3.5 Days', change: '+0.5d', isPositive: false, icon: Timer, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Conversion Rate', value: '18.4%', change: '+2.1%', isPositive: true, icon: MousePointer2, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Slot Utilization', value: '72%', change: '+5%', isPositive: true, icon: Layout, color: 'text-blue-500', bg: 'bg-blue-50' },
];

const popularTimeSlots = [
    { time: '09:00', bookings: 124 },
    { time: '10:00', bookings: 156 },
    { time: '11:00', bookings: 142 },
    { time: '12:00', bookings: 98 },
    { time: '14:00', bookings: 110 },
    { time: '15:00', bookings: 134 },
    { time: '16:00', bookings: 168 },
    { time: '17:00', bookings: 145 },
];

const bookingsTrend = [
    { day: 'Mon', count: 320 },
    { day: 'Tue', count: 350 },
    { day: 'Wed', count: 300 },
    { day: 'Thu', count: 420 },
    { day: 'Fri', count: 450 },
    { day: 'Sat', count: 180 },
    { day: 'Sun', count: 120 },
];

export const SchedulingReport = () => {
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
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Scheduling Report</h1>
                    <p className="text-gray-500 font-medium font-bold">Optimization and throughput analysis for your booking funnel</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                        <Calendar size={18} className="text-gray-400" />
                        <span className="text-sm font-bold text-ninja-dark whitespace-nowrap">This Month</span>
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
                {schedulingKPIs.map((kpi, idx) => (
                    <Card key={idx} className="border-none shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <kpi.icon size={48} className={kpi.color} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                            <h4 className="text-2xl font-black text-ninja-dark mb-1">{kpi.value}</h4>
                            <div className={cn(
                                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black",
                                kpi.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                            )}>
                                {kpi.change}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* High Impact Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm">
                    <h3 className="font-bold text-ninja-dark text-lg mb-8">Popular Booking Times</h3>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={popularTimeSlots}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 600 }} />
                                <Tooltip cursor={{ fill: '#F9FAFB' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="bookings" radius={[4, 4, 0, 0]} barSize={30} fill="#BFA9FF" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="border-none shadow-sm">
                    <h3 className="font-bold text-ninja-dark text-lg mb-8">Booking Trends (Vertical Volume)</h3>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={bookingsTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 600 }} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                <Line type="monotone" dataKey="count" stroke="#D4FF00" strokeWidth={4} dot={{ r: 6, fill: '#D4FF00', strokeWidth: 0 }} activeDot={{ r: 8, strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Advanced Schedule Health Card */}
            <Card className="bg-ninja-dark p-10 border-none shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-ninja-yellow/10 rounded-full -mr-32 -mt-32 blur-3xl transition-all duration-700 group-hover:scale-150 rotate-45" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-ninja-yellow/20 rounded-full mb-6">
                            <Zap size={14} className="text-ninja-yellow" />
                            <span className="text-[10px] font-black text-ninja-yellow uppercase tracking-widest">Premium Optimization</span>
                        </div>
                        <h3 className="text-3xl font-black text-white tracking-tight mb-4 leading-tight">Your Schedule Health is Excellent</h3>
                        <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8">
                            Based on your last 30 days of data, your booking velocity has increased by <span className="text-ninja-yellow font-bold">15%</span>. 
                            Consider opening more slots on Thursday afternoons to capture peak demand.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 shrink-0">
                                <CheckCircle2 size={18} className="text-ninja-yellow" />
                                <span className="text-sm font-bold text-white whitespace-nowrap">Auto-optimization active</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 shrink-0">
                                <AlertCircle size={18} className="text-slate-400" />
                                <span className="text-sm font-bold text-slate-400 whitespace-nowrap">3 slots suggested</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-sm">
                        <div className="relative h-32 w-32">
                            <svg className="h-full w-full rotate-[-90deg]">
                                <circle cx="64" cy="64" r="56" className="stroke-white/10 fill-none stroke-[8px]" />
                                <circle cx="64" cy="64" r="56" className="stroke-ninja-yellow fill-none stroke-[8px] transition-all duration-1000" strokeDasharray="351.858" strokeDashoffset="88" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-white">75%</span>
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-tight">Daily Goal</span>
                            </div>
                        </div>
                        <Button className="w-full bg-ninja-yellow text-ninja-dark hover:bg-white transition-colors border-none shadow-xl shadow-ninja-yellow/10">Manage Slots</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
