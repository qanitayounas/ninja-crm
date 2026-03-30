import { useState } from 'react';
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
    Cell
} from 'recharts';
import {
    Download,
    Calendar as CalendarIcon,
    ChevronDown,
    TrendingUp,
    Users,
    DollarSign,
    Filter,
    MousePointer2
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';
import {
    reportMetrics,
    channelDistribution,
    revenueBySource,
    sourcePerformance
} from '../../data/reportsData';

export const AttributionReport = () => {
    const [attributionModel, setAttributionModel] = useState<'first' | 'last'>('first');

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
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Attribution Report</h1>
                    <p className="text-gray-500 font-medium font-bold">Track where your revenue and real leads come from</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                        <CalendarIcon size={18} className="text-gray-400" />
                        <span className="text-sm font-bold text-ninja-dark whitespace-nowrap">Last 30 days</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    <Button className="flex items-center gap-2 shadow-lg shadow-ninja-yellow/20">
                        <Download size={18} />
                        <span>Export Data</span>
                    </Button>
                </div>
            </div>

            {/* Attribution Model Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    onClick={() => setAttributionModel('first')}
                    className={cn(
                        "p-6 rounded-3xl border-2 transition-all cursor-pointer group",
                        attributionModel === 'first'
                            ? "bg-white border-ninja-yellow shadow-xl shadow-ninja-yellow/10"
                            : "bg-gray-50/50 border-transparent hover:border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className={cn(
                            "h-12 w-12 rounded-2xl flex items-center justify-center transition-colors",
                            attributionModel === 'first' ? "bg-ninja-yellow text-ninja-dark" : "bg-white text-gray-400 group-hover:text-gray-600 shadow-sm"
                        )}>
                            <MousePointer2 size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-ninja-dark">First Attribution</h3>
                            <p className="text-sm text-gray-400 font-medium">Assigns value to the first source that generated the initial contact</p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => setAttributionModel('last')}
                    className={cn(
                        "p-6 rounded-3xl border-2 transition-all cursor-pointer group",
                        attributionModel === 'last'
                            ? "bg-white border-purple-400 shadow-xl shadow-purple-400/10"
                            : "bg-gray-50/50 border-transparent hover:border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className={cn(
                            "h-12 w-12 rounded-2xl flex items-center justify-center transition-colors",
                            attributionModel === 'last' ? "bg-purple-100 text-purple-600" : "bg-white text-gray-400 group-hover:text-gray-600 shadow-sm"
                        )}>
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-ninja-dark">Last Attribution</h3>
                            <p className="text-sm text-gray-400 font-medium">Assigns value to the last source before conversion</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reportMetrics.map((metric, idx) => (
                    <Card key={idx} className="relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 border-none shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn(
                                "h-12 w-12 rounded-2xl flex items-center justify-center",
                                idx === 0 ? "bg-ninja-yellow/20 text-ninja-dark" :
                                    idx === 1 ? "bg-purple-100 text-purple-600" :
                                        "bg-ninja-yellow text-ninja-dark"
                            )}>
                                {metric.icon === 'dollar' && <DollarSign size={24} />}
                                {metric.icon === 'users' && <Users size={24} />}
                                {metric.icon === 'chart' && <TrendingUp size={24} />}
                            </div>
                            {metric.trendType !== 'neutral' && (
                                <div className={cn(
                                    "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
                                    metric.trendType === 'positive' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                                )}>
                                    {metric.trend}
                                </div>
                            )}
                            {metric.trendType === 'neutral' && idx === 2 && (
                                <div className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">
                                    {metric.trend}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 mb-1">{metric.label}</p>
                            <h4 className="text-3xl font-black text-ninja-dark mb-1">{metric.value}</h4>
                            <p className="text-xs text-gray-400 font-medium">{metric.subtext}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-xl bg-ninja-dark p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-white text-lg">Distribution by Channel</h3>
                        <span className="text-xs font-black text-ninja-yellow px-2 py-1 bg-white/5 rounded-lg border border-white/10 uppercase tracking-widest">34% Active</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 min-h-[300px]">
                        <div className="h-[260px] w-[260px] shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={channelDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {channelDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-col gap-2 w-full max-w-[200px]">
                            {channelDistribution.map((entry, index) => (
                                <div key={index} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">
                                            {entry.name}
                                        </span>
                                    </div>
                                    <span className="text-xs font-black text-white">
                                        {entry.value}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-ninja-dark text-lg">Revenue by Source</h3>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                            <span>Filters</span>
                            <Filter size={14} />
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueBySource}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis
                                    dataKey="source"
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
                                    dataKey="revenue"
                                    fill="#DCFF02"
                                    radius={[6, 6, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Performance by Source Table */}
            <Card className="px-0 py-0 m overflow-hidden border-none shadow-sm">
                <div className="p-6 flex items-center justify-between border-b border-gray-50">
                    <h3 className="font-bold text-ninja-dark text-lg">Source Performance</h3>
                    <Button variant="ghost" className="text-gray-400 font-bold text-sm h-10">
                        <Filter size={16} className="mr-2" />
                        Filters
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Source</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Leads</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Conversions</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Conv. Rate</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Revenue</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Average Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {sourcePerformance.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-ninja-dark group-hover:text-ninja-yellow transition-colors">{item.source}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm font-medium text-gray-500">{item.leads}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm font-bold text-blue-600">{item.conversions}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm font-bold text-green-500">{item.convRate}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm font-bold text-green-600">{item.revenue}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm font-medium text-gray-400">{item.avgValue}</span>
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
