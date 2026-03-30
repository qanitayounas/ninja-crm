import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts';
import {
    Phone,
    PhoneIncoming,
    PhoneMissed,
    Clock,
    Download,
    ChevronDown,
    Calendar as CalendarIcon,
    Filter
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';

const kpis = [
    { 
        label: 'Total Calls', 
        value: '2,571', 
        subtext: 'in the period', 
        trend: '+15%', 
        trendType: 'positive', 
        icon: Phone, 
        color: 'text-ninja-yellow', 
        bg: 'bg-ninja-yellow/10' 
    },
    { 
        label: 'Answered', 
        value: '1,847', 
        subtext: 'response rate', 
        trend: '71.8%', 
        trendType: 'positive', 
        icon: PhoneIncoming, 
        color: 'text-green-500', 
        bg: 'bg-green-50' 
    },
    { 
        label: 'Missed Calls', 
        value: '423', 
        subtext: 'lost opportunities', 
        trend: 'Critical', 
        trendType: 'danger', 
        icon: PhoneMissed, 
        color: 'text-red-500', 
        bg: 'bg-red-50' 
    },
    { 
        label: 'Average Duration', 
        value: '9:45', 
        subtext: 'minutes per call', 
        trend: '9:45', 
        trendType: 'neutral', 
        icon: Clock, 
        color: 'text-purple-500', 
        bg: 'bg-purple-50' 
    }
];

const statusData = [
    { name: 'Answered', value: 1847, color: '#22C55E' },
    { name: 'Missed', value: 423, color: '#EF4444' },
    { name: 'Voicemail', value: 234, color: '#F59E0B' },
    { name: 'Rejected', value: 67, color: '#6B7280' },
];

const sourceData = [
    { name: 'Google Ads', value: 460 },
    { name: 'Facebook Ads', value: 340 },
    { name: 'Organic', value: 580 },
    { name: 'Referrals', value: 230 },
    { name: 'Direct', value: 680 },
];

const trendData = [
    { day: 'Mon', incoming: 320, outgoing: 210 },
    { day: 'Tue', incoming: 450, outgoing: 340 },
    { day: 'Wed', incoming: 410, outgoing: 290 },
    { day: 'Thu', incoming: 520, outgoing: 380 },
    { day: 'Fri', incoming: 480, outgoing: 310 },
    { day: 'Sat', incoming: 150, outgoing: 90 },
    { day: 'Sun', incoming: 120, outgoing: 80 },
];

const detailedCalls = [
    {
        name: 'Maria González',
        phone: '+34 612 345 678',
        type: 'Incoming',
        duration: '12:34',
        status: 'Answered',
        agent: 'Carlos Ruiz',
        date: '2 hours ago',
    },
    {
        name: 'Juan Pérez',
        phone: '+34 823 456 789',
        type: 'Outgoing',
        duration: '08:45',
        status: 'Answered',
        agent: 'Ana Martínez',
        date: '3 hours ago',
    },
    {
        name: 'Laura Sánchez',
        phone: '+34 034 567 890',
        type: 'Incoming',
        duration: '00:00',
        status: 'Missed',
        agent: '-',
        date: '4 hours ago',
    },
    {
        name: 'Pedro López',
        phone: '+34 545 678 901',
        type: 'Incoming',
        duration: '15:23',
        status: 'Answered',
        agent: 'Carlos Ruiz',
        date: '5 hours ago',
    },
];

export const CallsReport = () => {
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
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Calls Report</h1>
                    <p className="text-gray-500 font-medium font-bold">Comprehensive analysis of incoming and outgoing calls</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                        <CalendarIcon size={18} className="text-gray-400" />
                        <span className="text-sm font-bold text-ninja-dark whitespace-nowrap">Last 7 days</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    <Button className="flex items-center gap-2 shadow-lg shadow-ninja-yellow/20">
                        <Download size={18} />
                        <span>Export Report</span>
                    </Button>
                </div>
            </div>

            {/* KPI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx) => (
                    <Card key={idx} className="relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 border-none shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", kpi.bg)}>
                                <kpi.icon className={kpi.color} size={24} />
                            </div>
                            <div className={cn(
                                "px-2 py-1 rounded-lg text-xs font-black",
                                kpi.trendType === 'positive' ? "bg-green-50 text-green-600" :
                                kpi.trendType === 'danger' ? "bg-red-50 text-red-600" : "bg-purple-50 text-purple-600"
                            )}>
                                {kpi.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                            <h4 className="text-3xl font-black text-ninja-dark mb-1">{kpi.value}</h4>
                            <p className="text-xs text-gray-400 font-medium">{kpi.subtext}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-2 border-none shadow-xl bg-ninja-dark flex flex-col p-8">
                    <h3 className="font-bold text-white text-lg mb-8">Calls by Status</h3>
                    <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
                        <div className="h-[240px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {statusData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={statusData[index].color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full mt-6 grid grid-cols-2 gap-4">
                            {statusData.map((entry, index) => (
                                <div key={index} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight group-hover:text-white transition-colors">
                                            {entry.name}
                                        </span>
                                    </div>
                                    <span className="text-xs font-black text-white">
                                        {entry.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                <Card className="lg:col-span-3 border-none shadow-sm">
                    <h3 className="font-bold text-ninja-dark text-lg mb-8">Main Lead Sources</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sourceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#F9FAFB' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#BFA9FF"
                                    radius={[6, 6, 0, 0]}
                                    barSize={45}
                                >
                                    {sourceData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 4 ? '#D4FF00' : '#BFA9FF'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Trend Section */}
            <Card className="border-none shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h3 className="font-bold text-ninja-dark text-lg">Call Trend (7 days)</h3>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-ninja-yellow shadow-[0_0_8px_rgba(212,255,0,0.5)]" />
                            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Incoming</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(191,169,255,0.5)]" />
                            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Outgoing</span>
                        </div>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#D4FF00" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#D4FF00" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorOutgoing" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#BFA9FF" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#BFA9FF" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="incoming"
                                stroke="#D4FF00"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorIncoming)"
                                dot={{ r: 4, fill: '#D4FF00', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="outgoing"
                                stroke="#BFA9FF"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorOutgoing)"
                                dot={{ r: 4, fill: '#BFA9FF', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Detailed Call Log Section */}
            <Card className="px-0 py-0 overflow-hidden border-none shadow-sm">
                <div className="p-6 flex items-center justify-between border-b border-gray-50">
                    <h3 className="font-bold text-ninja-dark text-lg">Detailed Call Log</h3>
                    <Button variant="ghost" className="text-gray-400 font-bold text-sm h-10">
                        <Filter size={16} className="mr-2" />
                        Filters
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Agent</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Recording</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {detailedCalls.map((call, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-ninja-dark group-hover:text-ninja-yellow transition-colors">{call.name}</span>
                                            <span className="text-[10px] font-medium text-gray-400 tracking-wider mt-0.5">{call.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "h-7 w-7 rounded-lg flex items-center justify-center",
                                                call.type === 'Incoming' ? "bg-green-50 text-green-600" : "bg-purple-50 text-purple-600"
                                            )}>
                                                <PhoneIncoming size={14} className={call.type === 'Outgoing' ? 'rotate-180' : ''} />
                                            </div>
                                            <span className="text-xs font-bold text-gray-500">{call.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-black text-ninja-dark">{call.duration}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={cn(
                                            "inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight",
                                            call.status === 'Answered' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                                        )}>
                                            {call.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-medium text-gray-500">{call.agent}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-medium text-gray-400">{call.date}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button className="flex items-center gap-2 text-ninja-yellow hover:text-ninja-dark transition-colors font-black text-xs">
                                            <Clock size={14} />
                                            <span>Listen</span>
                                        </button>
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
