import { useState, useEffect } from 'react';
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
    Calendar as CalendarIcon,
    CheckCircle2,
    XCircle,
    Download,
    ChevronDown,
    Users,
    Zap,
    Clock
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';
import { apiService } from '../../services/apiService';

export const AppointmentsReport = () => {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [syncError, setSyncError] = useState<string | null>(null);

    useEffect(() => {
        loadReportData();
    }, []);

    const loadReportData = async () => {
        setIsLoading(true);
        setSyncError(null);
        try {
            const appointments = await apiService.getAppointments();
            
            const total = appointments.length;
            const confirmed = appointments.filter((a: any) => a.status === 'confirmed').length;
            const cancelled = appointments.filter((a: any) => a.status === 'cancelled').length;
            const noShow = appointments.filter((a: any) => a.status === 'noshow' || a.status === 'no-show').length;
            const pending = total - confirmed - cancelled - noShow;

            setStats({
                total,
                confirmed,
                cancelled,
                noShow,
                pending,
                statusDistribution: [
                    { name: 'Confirmed', value: confirmed, color: '#D4FF00' },
                    { name: 'Pending', value: pending, color: '#BFA9FF' },
                    { name: 'Cancelled', value: cancelled, color: '#FEE2E2' },
                    { name: 'No Show', value: noShow, color: '#EF4444' },
                ],
                kpis: [
                    { label: 'Total Appointments', value: total.toString(), icon: CalendarIcon, color: 'text-ninja-yellow', bg: 'bg-ninja-yellow/10' },
                    { label: 'Confirmed', value: confirmed.toString(), icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Cancelled', value: cancelled.toString(), icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'Pending', value: pending.toString(), icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
                ]
            });
        } catch (error: any) {
            console.error('Error loading appointment report:', error);
            if (error.status === 403 || error.status === 401) {
                setSyncError('Appointment reporting is currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
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

    if (!stats) return null;

    const { kpis, statusDistribution } = stats;

    // Optional: Calculate count by day
    const appointmentsByDay = [
        { day: 'Mon', count: 0 },
        { day: 'Tue', count: 0 },
        { day: 'Wed', count: 0 },
        { day: 'Thu', count: 0 },
        { day: 'Fri', count: 0 },
        { day: 'Sat', count: 0 },
        { day: 'Sun', count: 0 },
    ];

    const topSetters: any[] = [];

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
                        <CalendarIcon size={18} className="text-gray-400" />
                        <span className="text-sm font-bold text-ninja-dark whitespace-nowrap">This Week</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    <Button className="flex items-center gap-2 shadow-lg shadow-ninja-yellow/20">
                        <Download size={18} />
                        <span>Export Data</span>
                    </Button>
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

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi: any, idx: number) => (
                    <Card key={idx} className="border-none shadow-sm group hover:scale-[1.02] transition-all">
                        <div className="flex items-center gap-4">
                            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", kpi.bg)}>
                                <kpi.icon className={kpi.color} size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <h4 className="text-2xl font-black text-ninja-dark">{kpi.value}</h4>
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
                                    {appointmentsByDay.map((entry: any, index: number) => (
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
                                    {statusDistribution.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                        {statusDistribution.map((item: any) => (
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
                            {topSetters.map((setter: any, idx: number) => (
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
