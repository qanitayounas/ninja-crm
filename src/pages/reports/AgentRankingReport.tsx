import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import {
    Trophy,
    Award,
    Star,
    Download,
    ChevronDown,
    Users,
    DollarSign,
    Target,
    Phone
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';

const topAgents = [
    { rank: 2, name: 'Ana Martinez', revenue: '$142K', conversions: 108, initial: 'AM', color: 'bg-purple-100 text-purple-600', border: 'border-purple-200' },
    { rank: 1, name: 'Carlos Ruiz', revenue: '$157K', conversions: 124, initial: 'CR', color: 'bg-ninja-yellow text-ninja-dark', border: 'border-ninja-yellow' },
    { rank: 3, name: 'David Lopez', revenue: '$119K', conversions: 89, initial: 'DL', color: 'bg-orange-100 text-orange-600', border: 'border-orange-200' },
];

const revenueByAgent = [
    { name: 'Carlos', value: 157000 },
    { name: 'Ana', value: 142000 },
    { name: 'David', value: 119000 },
    { name: 'Laura', value: 98000 },
    { name: 'Miguel', value: 84000 },
];

const convByAgent = [
    { name: 'Carlos', value: 124 },
    { name: 'Ana', value: 108 },
    { name: 'David', value: 89 },
    { name: 'Laura', value: 78 },
    { name: 'Miguel', value: 64 },
];

const leaderboard = [
    { rank: '#1', name: 'Carlos Ruiz', initial: 'CR', leads: 342, conv: 124, rate: '36.3%', revenue: '$157,700', calls: 567, emails: 892, resp: '2.3h', sat: 4.9 },
    { rank: '#2', name: 'Ana Martinez', initial: 'AM', leads: 318, conv: 108, rate: '34.0%', revenue: '$142,300', calls: 512, emails: 734, resp: '2.8h', sat: 4.8 },
    { rank: '#3', name: 'David Lopez', initial: 'DL', leads: 289, conv: 89, rate: '30.8%', revenue: '$118,900', calls: 445, emails: 678, resp: '3.1h', sat: 4.7 },
    { rank: '#4', name: 'Laura Sanchez', initial: 'LS', leads: 267, conv: 78, rate: '29.2%', revenue: '$98,400', calls: 398, emails: 589, resp: '3.5h', sat: 4.6 },
    { rank: '#5', name: 'Miguel Torres', initial: 'MT', leads: 234, conv: 64, rate: '27.4%', revenue: '$84,200', calls: 356, emails: 512, resp: '4.2h', sat: 4.5 },
];

export const AgentRankingReport = () => {
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
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Agent Ranking</h1>
                    <p className="text-gray-500 font-medium font-bold">Individual and team performance evaluation</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="text-sm font-bold text-ninja-dark whitespace-nowrap">This Month</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    <Button className="flex items-center gap-2 shadow-lg shadow-ninja-yellow/20">
                        <Download size={18} />
                        <span>Export Ranking</span>
                    </Button>
                </div>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                {topAgents.map((agent) => (
                    <Card 
                        key={agent.rank} 
                        className={cn(
                            "flex flex-col items-center justify-center p-8 text-center transition-all duration-500 hover:scale-[1.05]",
                            agent.rank === 1 ? "bg-white border-2 border-ninja-yellow shadow-xl shadow-ninja-yellow/5 h-[340px]" : "bg-gray-50/50 border-none h-[280px]"
                        )}
                    >
                        <div className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center text-xl font-black mb-4 shadow-sm",
                            agent.color
                        )}>
                            {agent.initial}
                        </div>
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center mb-4 font-black shadow-sm",
                            agent.rank === 1 ? "bg-ninja-yellow text-ninja-dark -mt-8" : "bg-gray-400 text-white -mt-8"
                        )}>
                            {agent.rank}
                        </div>
                        <h4 className="text-lg font-black text-ninja-dark mb-1">{agent.name}</h4>
                        <div className="text-3xl font-black text-ninja-dark mb-1">{agent.revenue}</div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">{agent.conversions} conversions</p>
                        {agent.rank === 1 && (
                            <div className="mt-4 flex items-center gap-1.5 py-1 px-3 bg-ninja-yellow/20 rounded-full">
                                <Trophy size={14} className="text-ninja-dark" />
                                <span className="text-[10px] font-black text-ninja-dark uppercase tracking-tight">Top Performer</span>
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm">
                    <h3 className="font-bold text-ninja-dark text-lg mb-8">Revenue per Agent</h3>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueByAgent}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                                    {revenueByAgent.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#D4FF00' : '#E2E8F0'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="border-none shadow-sm">
                    <h3 className="font-bold text-ninja-dark text-lg mb-8">Conversions per Agent</h3>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={convByAgent}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                                    {convByAgent.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#BFA9FF' : '#E2E8F0'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Leaderboard Table */}
            <Card className="px-0 py-0 overflow-hidden border-none shadow-sm">
                <div className="p-6 flex items-center justify-between border-b border-gray-50">
                    <h3 className="font-bold text-ninja-dark text-lg">Full Leaderboard</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Ranking</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Agent</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Leads</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Conversions</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Conv. Rate</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Revenue</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Calls</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Emails</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Resp. Time</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Satisfaction</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {leaderboard.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            {idx < 3 ? <Award size={16} className={idx === 0 ? "text-ninja-yellow" : idx === 1 ? "text-gray-400" : "text-orange-400"} /> : <div className="w-4" />}
                                            <span className="text-xs font-black text-ninja-dark">{row.rank}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">
                                                {row.initial}
                                            </div>
                                            <span className="text-sm font-bold text-ninja-dark">{row.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-xs font-medium text-gray-500">{row.leads}</td>
                                    <td className="px-6 py-5 text-center text-xs font-black text-blue-600">{row.conv}</td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="inline-flex px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-black">
                                            {row.rate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-xs font-black text-green-600">{row.revenue}</td>
                                    <td className="px-6 py-5 text-center text-xs font-medium text-gray-500">{row.calls}</td>
                                    <td className="px-6 py-5 text-center text-xs font-medium text-gray-500">{row.emails}</td>
                                    <td className="px-6 py-5 text-center text-xs font-medium text-gray-500">{row.resp}</td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Star size={12} className="fill-ninja-yellow text-ninja-yellow" />
                                            <span className="text-xs font-black text-ninja-dark">{row.sat}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Micro KPI and Team Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="flex items-center gap-4 border-none shadow-sm">
                    <div className="h-12 w-12 rounded-2xl bg-ninja-yellow/20 flex items-center justify-center text-ninja-dark">
                        <Target size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Best Conv. Rate</p>
                        <h4 className="text-lg font-black text-ninja-dark">Carlos Ruiz</h4>
                        <p className="text-xs text-gray-400 font-medium">36.3% conversion - Team benchmark</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 border-none shadow-sm">
                    <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <Phone size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Most Active</p>
                        <h4 className="text-lg font-black text-ninja-dark">Carlos Ruiz</h4>
                        <p className="text-xs text-gray-400 font-medium">567 calls - Highest activity volume</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 border-none shadow-sm">
                    <div className="h-12 w-12 rounded-2xl bg-ninja-yellow flex items-center justify-center text-ninja-dark">
                        <Star size={24} className="fill-ninja-dark" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Highest Satisfaction</p>
                        <h4 className="text-lg font-black text-ninja-dark">4.9/5.0</h4>
                        <p className="text-xs text-gray-400 font-medium">Carlos Ruiz - Service excellence</p>
                    </div>
                </Card>
            </div>

            {/* Team Summary Bar */}
            <Card className="p-0 border-none shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row items-stretch">
                    <div className="p-8 flex items-center gap-4 border-b md:border-b-0 md:border-r border-gray-50 flex-1">
                        <Users className="text-slate-300" size={32} />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Agents</p>
                            <h4 className="text-3xl font-black text-ninja-dark font-black tracking-tight">5</h4>
                        </div>
                    </div>
                    <div className="p-8 flex items-center gap-4 border-b md:border-b-0 md:border-r border-gray-50 flex-1">
                        <DollarSign className="text-green-500" size={32} />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Revenue</p>
                            <h4 className="text-3xl font-black text-ninja-dark font-black tracking-tight">$601K</h4>
                        </div>
                    </div>
                    <div className="p-8 flex items-center gap-4 border-b md:border-b-0 md:border-r border-gray-50 flex-1">
                        <Target className="text-blue-500" size={32} />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Conversions</p>
                            <h4 className="text-3xl font-black text-ninja-dark font-black tracking-tight">463</h4>
                        </div>
                    </div>
                    <div className="p-8 flex items-center gap-4 flex-1">
                        <Award className="text-ninja-yellow" size={32} />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Average Conv.</p>
                            <h4 className="text-3xl font-black text-ninja-dark font-black tracking-tight">31.5%</h4>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
