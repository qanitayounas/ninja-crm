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
    Cell
} from 'recharts';
import {
    Star,
    MessageSquare,
    ThumbsUp,
    Clock,
    Download,
    ChevronDown,
    Filter,
    ArrowUpRight
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';

const kpis = [
    { label: 'Average Rating', value: '4.8', subtext: 'of 1,243 reviews', trend: '+0.3', icon: Star, color: 'text-ninja-yellow', bg: 'bg-ninja-yellow/10' },
    { label: 'Total Reviews', value: '1,243', subtext: 'this month +124', trend: '+124', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Positive Sentiment', value: '90.2%', subtext: '1,121 positives', trend: '+5%', icon: ThumbsUp, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Response Rate', value: '96%', subtext: 'in 24 hours', trend: '96%', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
];

const evolutionData = [
    { month: 'Jan', current: 35, previous: 30 },
    { month: 'Feb', current: 60, previous: 50 },
    { month: 'Mar', current: 80, previous: 70 },
    { month: 'Apr', current: 95, previous: 85 },
    { month: 'May', current: 110, previous: 100 },
    { month: 'Jun', current: 130, previous: 115 },
];

const platformData = [
    { name: 'Google', value: 58, color: '#D4FF00' },
    { name: 'Facebook', value: 28, color: '#BFA9FF' },
    { name: 'Yelp', value: 14, color: '#111' },
];

const starData = [
    { stars: '5', count: 850, color: '#D4FF00' },
    { stars: '4', count: 280, color: '#BFA9FF' },
    { stars: '3', count: 65, color: '#F3F4F6' },
    { stars: '2', count: 32, color: '#F3F4F6' },
    { stars: '1', count: 16, color: '#F3F4F6' },
];

export const ReputationOverview = () => {
    return (
        <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-black text-gray-400 mb-1 uppercase tracking-widest">
                        <span>Reputation</span>
                        <span>/</span>
                        <span className="text-gray-600">Overview</span>
                    </div>
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Reputation Overview</h1>
                    <p className="text-gray-500 font-medium font-bold">Complete control of how the market perceives your brand</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                        <Clock size={18} className="text-gray-400" />
                        <span className="text-sm font-bold text-ninja-dark whitespace-nowrap">Last 6 Months</span>
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
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black">
                                <ArrowUpRight size={10} />
                                {kpi.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                            <h4 className="text-3xl font-black text-ninja-dark mb-0.5">{kpi.value}</h4>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{kpi.subtext}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Evolution Chart */}
                <Card className="lg:col-span-2 border-none shadow-sm pb-8">
                    <h3 className="font-bold text-ninja-dark text-lg mb-8">Review Evolution</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={evolutionData}>
                                <defs>
                                    <linearGradient id="colorCur" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4FF00" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#D4FF00" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#BFA9FF" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#BFA9FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="current" stroke="#D4FF00" strokeWidth={4} fillOpacity={1} fill="url(#colorCur)" dot={{ r: 4, fill: '#D4FF00', strokeWidth: 2, stroke: '#fff' }} />
                                <Area type="monotone" dataKey="previous" stroke="#BFA9FF" strokeWidth={2} fillOpacity={1} fill="url(#colorPrev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Distribution Chart */}
                <Card className="border-none shadow-sm flex flex-col items-center">
                    <h3 className="font-bold text-ninja-dark text-lg mb-8 self-start">Distribution by Platform</h3>
                    <div className="flex-1 flex flex-col items-center justify-center w-full">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={platformData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={85}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {platformData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full space-y-3 mt-8">
                            {platformData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-ninja-dark transition-colors">{item.name}</span>
                                    </div>
                                    <span className="text-xs font-black text-ninja-dark">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Star Distribution */}
            <Card className="border-none shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-ninja-dark text-lg">Star Distribution</h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                        <span>Filters</span>
                        <Filter size={14} />
                    </div>
                </div>
                <div className="space-y-6">
                    {starData.map((star, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-12 text-xs font-black text-ninja-dark flex items-center gap-1 shrink-0">
                                {star.stars} <Star size={12} className="fill-ninja-yellow text-ninja-yellow" />
                            </div>
                            <div className="flex-1 h-3 bg-gray-50 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                        width: `${(star.count / 850) * 100}%`,
                                        backgroundColor: star.color
                                    }}
                                />
                            </div>
                            <div className="w-16 text-right text-xs font-black text-gray-400">
                                {star.count}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
