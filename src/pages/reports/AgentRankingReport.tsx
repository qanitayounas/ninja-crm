import { useState, useEffect } from 'react';
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
    Phone,
    Zap
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';
import { apiService } from '../../services/apiService';

export const AgentRankingReport = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [syncError, setSyncError] = useState<string | null>(null);
    const [topAgents, setTopAgents] = useState<any[]>([]);
    const [revenueByAgent, setRevenueByAgent] = useState<any[]>([]);
    const [convByAgent, setConvByAgent] = useState<any[]>([]);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [teamSummary, setTeamSummary] = useState({ totalAgents: 0, totalRevenue: '$0', totalConv: 0, avgConvRate: '0%' });
    const [bestAgent, setBestAgent] = useState({ convRate: { name: '-', rate: '0%' }, mostActive: { name: '-', count: '0' }, topSat: { name: '-', score: '0' } });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        setSyncError(null);
        try {
            const results = await Promise.allSettled([
                apiService.getUsers(),
                apiService.getOpportunities()
            ]);

            const users = results[0].status === 'fulfilled' ? results[0].value : [];
            const opportunities = results[1].status === 'fulfilled' ? results[1].value : [];

            const wonOpps = opportunities.filter((o: any) => o.status === 'won');
            const totalRevenue = wonOpps.reduce((sum: number, o: any) => sum + (o.monetaryValue || 0), 0);

            // Build agent stats - distribute opportunities across users
            const agentStats = users.map((user: any, idx: number) => {
                // Attempt to match opportunities by assignedTo
                const userOpps = opportunities.filter((o: any) => o.assignedTo === user.id);
                const userWonOpps = userOpps.filter((o: any) => o.status === 'won');
                const revenue = userWonOpps.reduce((sum: number, o: any) => sum + (o.monetaryValue || 0), 0);
                const leads = userOpps.length;
                const conv = userWonOpps.length;
                const rate = leads > 0 ? ((conv / leads) * 100).toFixed(1) : '0.0';

                const nameParts = (user.name || '').split(' ');
                const initial = nameParts.map((p: string) => p[0] || '').join('').toUpperCase().substring(0, 2) || '??';

                const podiumColors = [
                    { color: 'bg-ninja-yellow text-ninja-dark', border: 'border-ninja-yellow' },
                    { color: 'bg-purple-100 text-purple-600', border: 'border-purple-200' },
                    { color: 'bg-orange-100 text-orange-600', border: 'border-orange-200' },
                ];

                return {
                    name: user.name || 'Unknown',
                    initial,
                    email: user.email || '',
                    revenue,
                    revenueDisplay: revenue >= 1000 ? `$${(revenue / 1000).toFixed(0)}K` : `$${revenue.toLocaleString()}`,
                    leads,
                    conv,
                    rate: `${rate}%`,
                    calls: 0,
                    emails: 0,
                    resp: '-',
                    sat: 0,
                    podiumColor: podiumColors[idx % podiumColors.length]
                };
            }).sort((a: any, b: any) => b.revenue - a.revenue);

            // Assign ranks
            agentStats.forEach((a: any, i: number) => { a.rank = i + 1; });

            // Top 3 for podium (reorder: 2nd, 1st, 3rd)
            const podium = agentStats.slice(0, 3);
            const orderedPodium = podium.length >= 3
                ? [podium[1], podium[0], podium[2]]
                : podium;

            setTopAgents(orderedPodium.map((a: any) => ({
                rank: a.rank,
                name: a.name,
                revenue: a.revenueDisplay,
                conversions: a.conv,
                initial: a.initial,
                color: a.rank === 1 ? 'bg-ninja-yellow text-ninja-dark' : a.rank === 2 ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600',
                border: a.rank === 1 ? 'border-ninja-yellow' : a.rank === 2 ? 'border-purple-200' : 'border-orange-200'
            })));

            // Charts
            setRevenueByAgent(agentStats.slice(0, 5).map((a: any) => ({
                name: a.name.split(' ')[0] || a.name,
                value: a.revenue
            })));

            setConvByAgent(agentStats.slice(0, 5).map((a: any) => ({
                name: a.name.split(' ')[0] || a.name,
                value: a.conv
            })));

            // Leaderboard
            setLeaderboard(agentStats.map((a: any) => ({
                rank: `#${a.rank}`,
                name: a.name,
                initial: a.initial,
                leads: a.leads,
                conv: a.conv,
                rate: a.rate,
                revenue: `$${a.revenue.toLocaleString()}`,
                calls: a.calls,
                emails: a.emails,
                resp: a.resp,
                sat: a.sat
            })));

            // Team summary
            const totalConv = agentStats.reduce((s: number, a: any) => s + a.conv, 0);
            const totalLeads = agentStats.reduce((s: number, a: any) => s + a.leads, 0);
            const avgRate = totalLeads > 0 ? ((totalConv / totalLeads) * 100).toFixed(1) : '0';
            setTeamSummary({
                totalAgents: users.length,
                totalRevenue: totalRevenue >= 1000 ? `$${(totalRevenue / 1000).toFixed(0)}K` : `$${totalRevenue.toLocaleString()}`,
                totalConv,
                avgConvRate: `${avgRate}%`
            });

            // Best agent highlights
            const byRate = [...agentStats].filter((a: any) => a.leads > 0).sort((a: any, b: any) => parseFloat(b.rate) - parseFloat(a.rate));
            const byActivity = [...agentStats].sort((a: any, b: any) => b.leads - a.leads);
            setBestAgent({
                convRate: { name: byRate[0]?.name || '-', rate: byRate[0]?.rate || '0%' },
                mostActive: { name: byActivity[0]?.name || '-', count: byActivity[0]?.leads?.toString() || '0' },
                topSat: { name: agentStats[0]?.name || '-', score: '0' }
            });
        } catch (error: any) {
            console.error('Error loading agent ranking:', error);
            if (error.status === 403 || error.status === 401) {
                setSyncError('Agent ranking data is currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
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
                {topAgents.length === 0 && (
                    <div className="col-span-3 text-center py-12 text-sm text-gray-400">No agent data available yet.</div>
                )}
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
                            {leaderboard.length === 0 && (
                                <tr>
                                    <td colSpan={10} className="px-6 py-12 text-center text-sm text-gray-400">
                                        No agent data available yet.
                                    </td>
                                </tr>
                            )}
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
                        <h4 className="text-lg font-black text-ninja-dark">{bestAgent.convRate.name}</h4>
                        <p className="text-xs text-gray-400 font-medium">{bestAgent.convRate.rate} conversion - Team benchmark</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 border-none shadow-sm">
                    <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <Phone size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Most Active</p>
                        <h4 className="text-lg font-black text-ninja-dark">{bestAgent.mostActive.name}</h4>
                        <p className="text-xs text-gray-400 font-medium">{bestAgent.mostActive.count} opportunities - Highest activity volume</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 border-none shadow-sm">
                    <div className="h-12 w-12 rounded-2xl bg-ninja-yellow flex items-center justify-center text-ninja-dark">
                        <Star size={24} className="fill-ninja-dark" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Top Performer</p>
                        <h4 className="text-lg font-black text-ninja-dark">{bestAgent.topSat.name}</h4>
                        <p className="text-xs text-gray-400 font-medium">Highest revenue - Service excellence</p>
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
                            <h4 className="text-3xl font-black text-ninja-dark font-black tracking-tight">{teamSummary.totalAgents}</h4>
                        </div>
                    </div>
                    <div className="p-8 flex items-center gap-4 border-b md:border-b-0 md:border-r border-gray-50 flex-1">
                        <DollarSign className="text-green-500" size={32} />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Revenue</p>
                            <h4 className="text-3xl font-black text-ninja-dark font-black tracking-tight">{teamSummary.totalRevenue}</h4>
                        </div>
                    </div>
                    <div className="p-8 flex items-center gap-4 border-b md:border-b-0 md:border-r border-gray-50 flex-1">
                        <Target className="text-blue-500" size={32} />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Conversions</p>
                            <h4 className="text-3xl font-black text-ninja-dark font-black tracking-tight">{teamSummary.totalConv}</h4>
                        </div>
                    </div>
                    <div className="p-8 flex items-center gap-4 flex-1">
                        <Award className="text-ninja-yellow" size={32} />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Average Conv.</p>
                            <h4 className="text-3xl font-black text-ninja-dark font-black tracking-tight">{teamSummary.avgConvRate}</h4>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
