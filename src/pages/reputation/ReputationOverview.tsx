import { useState, useEffect } from 'react';
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
    ArrowUpRight,
    Zap
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';
import { apiService } from '../../services/apiService';

export const ReputationOverview = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [syncError, setSyncError] = useState<string | null>(null);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        setIsLoading(true);
        setSyncError(null);
        try {
            const data = await apiService.getReviews();
            setReviews(data);
        } catch (error: any) {
            console.error('Error loading reviews:', error);
            if (error.status === 403 || error.status === 401) {
                setSyncError('Reputation data is currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 
        ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / totalReviews).toFixed(1)
        : '0.0';
    
    const positiveReviews = reviews.filter(r => (r.rating || 0) >= 4).length;
    const positivePercent = totalReviews > 0 
        ? ((positiveReviews / totalReviews) * 100).toFixed(1)
        : '0';

    const kpis = [
        { label: 'Average Rating', value: syncError ? '--' : avgRating, subtext: `of ${totalReviews} reviews`, trend: '+0.1', icon: Star, color: 'text-ninja-yellow', bg: 'bg-ninja-yellow/10' },
        { label: 'Total Reviews', value: syncError ? '--' : totalReviews.toString(), subtext: 'Total life-time', trend: '+0', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'Positive Sentiment', value: syncError ? '--' : `${positivePercent}%`, subtext: `${positiveReviews} positives`, trend: '+2%', icon: ThumbsUp, color: 'text-green-500', bg: 'bg-green-50' },
        { label: 'Response Rate', value: syncError ? '--' : '88%', subtext: 'In progress', trend: '88%', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
    ];

    const starData = [5, 4, 3, 2, 1].map(stars => ({
        stars: stars.toString(),
        count: reviews.filter(r => r.rating === stars).length,
        color: stars >= 4 ? '#D4FF00' : (stars === 3 ? '#BFA9FF' : '#F3F4F6')
    }));

    const evolutionData = [
        { month: 'Jan', current: 45, previous: 38 },
        { month: 'Feb', current: 52, previous: 42 },
        { month: 'Mar', current: 48, previous: 45 },
        { month: 'Apr', current: 61, previous: 48 },
        { month: 'May', current: 55, previous: 52 },
        { month: 'Jun', current: 67, previous: 58 },
    ];

    const platformData = [
        { name: 'Direct Reviews', value: 45, color: '#D4FF00' },
        { name: 'Survey Feedback', value: 30, color: '#BFA9FF' },
        { name: 'Social Mentions', value: 15, color: '#3B82F6' },
        { name: 'Other', value: 10, color: '#F3F4F6' },
    ];

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

            {/* KPI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx: number) => (
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
                                        {platformData.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full space-y-3 mt-8">
                            {platformData.map((item: any, i: number) => (
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
