import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {
    DollarSign,
    Users,
    Target,
    BarChart3,
    TrendingDown,
    Phone,
    Calendar,
    Mail,
    Download,
    ChevronDown,
    Filter,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';

const kpis = [
    { label: 'Total Revenue', value: '$94,650', change: '+24.8%', isPositive: true, icon: DollarSign, color: 'text-ninja-yellow', bg: 'bg-ninja-yellow/10' },
    { label: 'Leads Generated', value: '1,847', change: '+18.3%', isPositive: true, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Closing Rate', value: '34.2%', change: '+5.7%', isPositive: true, icon: Target, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Marketing ROI', value: '342%', change: '+12.4%', isPositive: true, icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Cost per Lead', value: '$12.45', change: '-8.2%', isPositive: false, icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Total Calls', value: '2,341', change: '+15.6%', isPositive: true, icon: Phone, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Booked Appts', value: '567', change: '+22.1%', isPositive: true, icon: Calendar, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Response Rate', value: '87.3%', change: '+3.8%', isPositive: true, icon: Mail, color: 'text-pink-500', bg: 'bg-pink-50' },
];

const revenueTrend = [
    { day: 'Mon', value: 12000 },
    { day: 'Tue', value: 15500 },
    { day: 'Wed', value: 11000 },
    { day: 'Thu', value: 16000 },
    { day: 'Fri', value: 22000 },
    { day: 'Sat', value: 8500 },
    { day: 'Sun', value: 6500 },
];

const leadTrend = [
    { day: 'Mon', value: 25 },
    { day: 'Tue', value: 32 },
    { day: 'Wed', value: 28 },
    { day: 'Thu', value: 38 },
    { day: 'Fri', value: 42 },
    { day: 'Sat', value: 20 },
    { day: 'Sun', value: 15 },
];

const channelData = [
    { channel: 'Google Ads', investment: '$8,500', leads: 342, cpl: '$24.85', conv: 87, revenue: '$42,300', roi: '398%' },
    { channel: 'Facebook Ads', investment: '$6,200', leads: 289, cpl: '$21.45', conv: 64, revenue: '$31,200', roi: '403%' },
    { channel: 'Organic', investment: '$0', leads: 456, cpl: '-', conv: 124, revenue: '$18,900', roi: '-' },
    { channel: 'Email Marketing', investment: '$1,200', leads: 234, cpl: '$5.13', conv: 45, revenue: '$8,700', roi: '625%' },
    { channel: 'Referral', investment: '$500', leads: 178, cpl: '$2.81', conv: 78, revenue: '$12,400', roi: '2380%' },
];

export const GlobalKPIsReport = () => {
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
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Global KPIs</h1>
                    <p className="text-gray-500 font-medium font-bold">Executive summary for rapid decision making</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                        <Calendar size={18} className="text-gray-400" />
                        <span className="text-sm font-bold text-ninja-dark whitespace-nowrap">Last 7 days</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    <Button className="flex items-center gap-2 shadow-lg shadow-ninja-yellow/20">
                        <Download size={18} />
                        <span>Export Dashboard</span>
                    </Button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx) => (
                    <Card key={idx} className="relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 border-none shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", kpi.bg)}>
                                <kpi.icon className={kpi.color} size={20} />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black",
                                kpi.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                            )}>
                                {kpi.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                {kpi.change}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                            <h4 className="text-2xl font-black text-ninja-dark mb-0.5">{kpi.value}</h4>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">vs. previous period</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm">
                    <h3 className="font-bold text-ninja-dark text-lg mb-8">Revenue Trend (7 days)</h3>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueTrend}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4FF00" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#D4FF00" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="value" stroke="#D4FF00" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="border-none shadow-sm">
                    <h3 className="font-bold text-ninja-dark text-lg mb-8">Lead Generation (7 days)</h3>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={leadTrend}>
                                <defs>
                                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#BFA9FF" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#BFA9FF" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="value" stroke="#BFA9FF" strokeWidth={4} fillOpacity={1} fill="url(#colorLeads)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Performance by Channel Table */}
            <Card className="px-0 py-0 overflow-hidden border-none shadow-sm">
                <div className="p-6 flex items-center justify-between border-b border-gray-50">
                    <h3 className="font-bold text-ninja-dark text-lg">Performance Summary by Channel</h3>
                    <Button variant="ghost" className="text-gray-400 font-bold text-sm h-10">
                        <Filter size={16} className="mr-2" />
                        Filters
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Channel</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Investment</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Leads</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">CPL</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Conversions</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Revenue</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">ROI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {channelData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-6 py-5">
                                        <span className="font-bold text-ninja-dark group-hover:text-ninja-yellow transition-colors">{row.channel}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="text-xs font-black text-ninja-dark">{row.investment}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="text-xs font-black text-ninja-dark">{row.leads}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="text-xs font-black text-slate-400">{row.cpl}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="text-xs font-bold text-blue-600">{row.conv}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="text-xs font-black text-green-600">{row.revenue}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center text-right">
                                        <div className={cn(
                                            "inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tight",
                                            row.roi === '-' ? "text-gray-300" : "bg-green-50 text-green-600"
                                        )}>
                                            {row.roi}
                                        </div>
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
