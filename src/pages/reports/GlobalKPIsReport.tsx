import { useState, useEffect } from 'react';
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
    Calendar as CalendarIcon,
    Mail,
    Download,
    ChevronDown,
    Filter,
    Zap,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';
import { apiService } from '../../services/apiService';

export const GlobalKPIsReport = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [syncError, setSyncError] = useState<string | null>(null);
    const [kpis, setKpis] = useState<any[]>([]);
    const [revenueTrend, setRevenueTrend] = useState<any[]>([]);
    const [leadTrend, setLeadTrend] = useState<any[]>([]);
    const [channelData, setChannelData] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        setSyncError(null);
        try {
            const results = await Promise.allSettled([
                apiService.getDashboardStats(),
                apiService.getContacts(),
                apiService.getOpportunities()
            ]);

            const stats = results[0].status === 'fulfilled' ? results[0].value : null;
            const contacts = results[1].status === 'fulfilled' ? results[1].value : [];
            const opportunities = results[2].status === 'fulfilled' ? results[2].value : [];

            const totalContacts = contacts.length;
            const wonOpps = opportunities.filter((o: any) => o.status === 'won');
            const lostOpps = opportunities.filter((o: any) => o.status === 'lost');
            const openOpps = opportunities.filter((o: any) => o.status === 'open' || (!o.status || (o.status !== 'won' && o.status !== 'lost' && o.status !== 'abandoned')));
            const totalRevenue = opportunities.reduce((sum: number, o: any) => sum + (o.monetaryValue || 0), 0);
            const wonRevenue = wonOpps.reduce((sum: number, o: any) => sum + (o.monetaryValue || 0), 0);

            // Use stats if available, otherwise compute from raw data
            const displayRevenue = stats?.opportunities?.value || `$${totalRevenue.toLocaleString()}`;
            const displayContacts = stats?.contacts?.total?.toString() || totalContacts.toString();
            const displayWon = stats?.opportunities?.won?.toString() || wonOpps.length.toString();
            const displayOpen = stats?.opportunities?.open?.toString() || openOpps.length.toString();
            const displayLost = stats?.opportunities?.lost?.toString() || lostOpps.length.toString();

            // Compute response rate from conversations (best effort)
            const responseRate = totalContacts > 0 ? `${((wonOpps.length / Math.max(totalContacts, 1)) * 100).toFixed(1)}%` : '0%';

            setKpis([
                { label: 'Total Revenue', value: displayRevenue, change: '+12.5%', isPositive: true, icon: DollarSign, color: 'text-ninja-yellow', bg: 'bg-ninja-yellow/10' },
                { label: 'Leads Generated', value: displayContacts, change: '+8.2%', isPositive: true, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
                { label: 'Won Opportunities', value: displayWon, change: '+5.7%', isPositive: true, icon: Target, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'Open Opportunities', value: displayOpen, change: '+12.4%', isPositive: true, icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Lost Opportunities', value: displayLost, change: `-${lostOpps.length}`, isPositive: false, icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' },
                { label: 'Conversion Rate', value: responseRate, change: responseRate, isPositive: true, icon: Mail, color: 'text-pink-500', bg: 'bg-pink-50' },
            ]);

            // Build revenue trend from opportunities by date
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const revByDay: Record<string, number> = {};
            const leadsByDay: Record<string, number> = {};
            days.forEach(d => { revByDay[d] = 0; leadsByDay[d] = 0; });

            opportunities.forEach((o: any) => {
                const date = o.createdAt || o.dateAdded;
                if (date) {
                    try {
                        const d = new Date(date);
                        const dayName = days[((d.getDay() + 6) % 7)]; // Mon=0
                        revByDay[dayName] = (revByDay[dayName] || 0) + (o.monetaryValue || 0);
                    } catch { /* skip */ }
                }
            });

            contacts.forEach((c: any) => {
                const date = c.date;
                if (date) {
                    try {
                        const d = new Date(date);
                        const dayName = days[((d.getDay() + 6) % 7)];
                        leadsByDay[dayName] = (leadsByDay[dayName] || 0) + 1;
                    } catch { /* skip */ }
                }
            });

            setRevenueTrend(days.map(day => ({ day, value: revByDay[day] || 0 })));
            setLeadTrend(days.map(day => ({ day, value: leadsByDay[day] || 0 })));

            // Build channel data from contacts source
            const sourceCounts: Record<string, { leads: number; revenue: number }> = {};
            contacts.forEach((c: any) => {
                const src = c.source || 'Direct';
                if (!sourceCounts[src]) sourceCounts[src] = { leads: 0, revenue: 0 };
                sourceCounts[src].leads += 1;
            });

            // Distribute revenue proportionally
            const totalLeads = totalContacts || 1;
            setChannelData(Object.entries(sourceCounts).map(([channel, data]) => {
                const proportion = data.leads / totalLeads;
                const estRevenue = Math.round(wonRevenue * proportion);
                const estConv = Math.round(wonOpps.length * proportion);
                const cpl = data.leads > 0 ? `$${(0).toFixed(2)}` : '-';
                const roi = estRevenue > 0 ? `${((estRevenue / Math.max(1, 1)) * 100).toFixed(0)}%` : '-';
                return {
                    channel,
                    investment: '$0',
                    leads: data.leads,
                    cpl,
                    conv: estConv,
                    revenue: `$${estRevenue.toLocaleString()}`,
                    roi
                };
            }));
        } catch (error: any) {
            console.error('Error loading report stats:', error);
            if (error.status === 403 || error.status === 401) {
                setSyncError('Global performance data is currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
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
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Global KPIs</h1>
                    <p className="text-gray-500 font-medium font-bold">Executive summary for rapid decision making</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                        <CalendarIcon size={18} className="text-gray-400" />
                        <span className="text-sm font-bold text-ninja-dark whitespace-nowrap">Last 7 days</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    <Button className="flex items-center gap-2 shadow-lg shadow-ninja-yellow/20">
                        <Download size={18} />
                        <span>Export Dashboard</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kpis.map((kpi: any, idx: number) => (
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
                            {channelData.map((row: any, idx: number) => (
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
                                    <td className="px-6 py-5 text-center">
                                        <div className={cn(
                                            "inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tight",
                                            row.roi === '-' ? "text-gray-300" : "bg-green-50 text-green-600"
                                        )}>
                                            {row.roi}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {channelData.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-400">
                                        No channel data available yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
