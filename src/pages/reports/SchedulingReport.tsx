import { useState, useEffect } from 'react';
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
import { apiService } from '../../services/apiService';

export const SchedulingReport = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [syncError, setSyncError] = useState<string | null>(null);
    const [schedulingKPIs, setSchedulingKPIs] = useState<any[]>([]);
    const [popularTimeSlots, setPopularTimeSlots] = useState<any[]>([]);
    const [bookingsTrend, setBookingsTrend] = useState<any[]>([]);
    const [healthScore, setHealthScore] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        setSyncError(null);
        try {
            const results = await Promise.allSettled([
                apiService.getAppointments(),
                apiService.getCalendarEvents()
            ]);

            const appointments = results[0].status === 'fulfilled' ? results[0].value : [];
            const events = results[1].status === 'fulfilled' ? results[1].value : [];

            const allEvents = [...appointments, ...events];
            const total = allEvents.length;
            const confirmed = allEvents.filter((e: any) => e.status === 'confirmed').length;
            const cancelled = allEvents.filter((e: any) => e.status === 'cancelled').length;
            const convRate = total > 0 ? ((confirmed / total) * 100).toFixed(1) : '0';
            const utilization = total > 0 ? Math.min(100, Math.round((confirmed / Math.max(total, 1)) * 100)) : 0;

            setSchedulingKPIs([
                { label: 'Booking Velocity', value: total > 0 ? `${(total / 7).toFixed(1)}/day` : '0/day', change: `${total} total`, isPositive: true, icon: Zap, color: 'text-ninja-yellow', bg: 'bg-ninja-yellow/10' },
                { label: 'Total Events', value: total.toString(), change: `${cancelled} cancelled`, isPositive: cancelled === 0, icon: Timer, color: 'text-purple-500', bg: 'bg-purple-50' },
                { label: 'Confirmation Rate', value: `${convRate}%`, change: `${confirmed} confirmed`, isPositive: true, icon: MousePointer2, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'Slot Utilization', value: `${utilization}%`, change: `${utilization}% utilized`, isPositive: utilization > 50, icon: Layout, color: 'text-blue-500', bg: 'bg-blue-50' },
            ]);

            // Popular time slots
            const hourCounts: Record<string, number> = {};
            allEvents.forEach((e: any) => {
                const start = e.startTime || e.start || e.appoinmentStart;
                if (start) {
                    try {
                        const d = new Date(start);
                        const hour = `${d.getHours().toString().padStart(2, '0')}:00`;
                        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
                    } catch { /* skip */ }
                }
            });

            const timeSlots = Object.entries(hourCounts)
                .map(([time, bookings]) => ({ time, bookings }))
                .sort((a, b) => a.time.localeCompare(b.time));
            setPopularTimeSlots(timeSlots.length > 0 ? timeSlots : [
                { time: '09:00', bookings: 0 },
                { time: '10:00', bookings: 0 },
                { time: '11:00', bookings: 0 },
                { time: '14:00', bookings: 0 },
                { time: '15:00', bookings: 0 },
                { time: '16:00', bookings: 0 },
            ]);

            // Bookings trend by day of week
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const dayCounts: Record<string, number> = {};
            days.forEach(d => { dayCounts[d] = 0; });

            allEvents.forEach((e: any) => {
                const start = e.startTime || e.start || e.appoinmentStart;
                if (start) {
                    try {
                        const d = new Date(start);
                        const dayName = days[((d.getDay() + 6) % 7)];
                        dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
                    } catch { /* skip */ }
                }
            });
            setBookingsTrend(days.map(day => ({ day, count: dayCounts[day] || 0 })));

            // Health score
            const score = total > 0 ? Math.min(100, Math.round((confirmed / total) * 100)) : 0;
            setHealthScore(score);
        } catch (error: any) {
            console.error('Error loading scheduling report:', error);
            if (error.status === 403 || error.status === 401) {
                setSyncError('Scheduling data is currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
            </div>
        );
    }

    const dashOffset = 351.858 - (351.858 * healthScore / 100);

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

            {/* Sync Error */}
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
                        <h3 className="text-3xl font-black text-white tracking-tight mb-4 leading-tight">
                            {healthScore >= 70 ? 'Your Schedule Health is Excellent' : healthScore >= 40 ? 'Your Schedule Health is Good' : 'Schedule Health Needs Attention'}
                        </h3>
                        <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8">
                            Based on your data, your booking confirmation rate is <span className="text-ninja-yellow font-bold">{healthScore}%</span>.
                            {healthScore >= 70
                                ? ' Consider opening more slots during peak demand hours to maximize throughput.'
                                : ' Focus on reducing cancellations and no-shows to improve your scheduling performance.'}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 shrink-0">
                                <CheckCircle2 size={18} className="text-ninja-yellow" />
                                <span className="text-sm font-bold text-white whitespace-nowrap">Auto-optimization active</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 shrink-0">
                                <AlertCircle size={18} className="text-slate-400" />
                                <span className="text-sm font-bold text-slate-400 whitespace-nowrap">{popularTimeSlots.length} slots tracked</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-sm">
                        <div className="relative h-32 w-32">
                            <svg className="h-full w-full rotate-[-90deg]">
                                <circle cx="64" cy="64" r="56" className="stroke-white/10 fill-none stroke-[8px]" />
                                <circle cx="64" cy="64" r="56" className="stroke-ninja-yellow fill-none stroke-[8px] transition-all duration-1000" strokeDasharray="351.858" strokeDashoffset={dashOffset.toString()} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-white">{healthScore}%</span>
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-tight">Health Score</span>
                            </div>
                        </div>
                        <Button className="w-full bg-ninja-yellow text-ninja-dark hover:bg-white transition-colors border-none shadow-xl shadow-ninja-yellow/10">Manage Slots</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
