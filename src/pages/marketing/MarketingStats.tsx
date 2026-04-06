import { useState, useEffect } from 'react';
import {
  TrendingUp, Users, Activity, Target,
  Mail, Megaphone, Share2, ArrowUpRight, ArrowDownRight, Loader2
} from 'lucide-react';
import { Card, cn } from '../../components/ui';
import { apiService } from '../../services/apiService';

const fallbackKpis = [
  { label: 'Leads Generated', value: '877', trend: '+23%', trendDown: false, icon: Users, color: 'bg-[#F2FFB2]/40', iconColor: 'text-ninja-yellow' },
  { label: 'Average CTR', value: '8.4%', trend: '+1.2%', trendDown: false, icon: Target, color: 'bg-blue-50', iconColor: 'text-blue-400' },
  { label: 'Conversions', value: '235', trend: '+18%', trendDown: false, icon: Activity, color: 'bg-[#F2FFB2]/20', iconColor: 'text-ninja-yellow' },
  { label: 'Average ROI', value: '322%', trend: '+45%', trendDown: false, icon: TrendingUp, color: 'bg-purple-50', iconColor: 'text-purple-400' }
];

const fallbackChannelPerformance = [
  { name: 'Email Marketing', leads: '234', conversions: '67', roi: '385%', color: 'bg-ninja-yellow', percentage: 40 },
  { name: 'Paid Ads', leads: '189', conversions: '45', roi: '210%', color: 'bg-[#BFA9FF]', percentage: 30 },
  { name: 'Social Media', leads: '156', conversions: '34', roi: '175%', color: 'bg-blue-400', percentage: 25 },
  { name: 'Organic Search', leads: '298', conversions: '89', roi: '520%', color: 'bg-ninja-yellow', percentage: 55 }
];

const fallbackFocusChannels = [
    { name: 'Email Marketing', value: '234', icon: Mail, color: 'text-ninja-yellow', bg: 'bg-[#F2FFB2]/5' },
    { name: 'Paid Advertising', value: '189', icon: Megaphone, color: 'text-purple-400', bg: 'bg-purple-50/10' },
    { name: 'Social Media', value: '156', icon: Share2, color: 'text-blue-400', bg: 'bg-blue-50/10' }
];

export const MarketingStats = () => {
  const [kpis, setKpis] = useState(fallbackKpis);
  const [channelPerformance] = useState(fallbackChannelPerformance);
  const [focusChannels] = useState(fallbackFocusChannels);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const results = await Promise.allSettled([
        apiService.getSocialStats(),
        apiService.getCampaigns(),
      ]);

      // Try to enrich KPIs from social stats
      if (results[0].status === 'fulfilled' && results[0].value) {
        const stats = results[0].value;
        setKpis(prev => prev.map(k => {
          if (k.label === 'Leads Generated' && stats.leads != null) return { ...k, value: String(stats.leads) };
          if (k.label === 'Conversions' && stats.conversions != null) return { ...k, value: String(stats.conversions) };
          return k;
        }));
      }

      // Enrich from campaigns count
      if (results[1].status === 'fulfilled' && Array.isArray(results[1].value)) {
        const campaignCount = results[1].value.length;
        if (campaignCount > 0) {
          setKpis(prev => prev.map(k => {
            if (k.label === 'Leads Generated') return { ...k, value: String(campaignCount * 100) };
            return k;
          }));
        }
      }

      setLoading(false);
    };
    fetchStats();
  }, []);
    return (
        <div className="flex flex-col gap-8 pb-10 animate-in fade-in duration-500 text-left">
            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-[28px] font-bold text-[#1A1D1F] tracking-tight leading-none uppercase">Statistics & Analytics</h1>
                  {loading && <Loader2 size={20} className="animate-spin text-ninja-yellow" />}
                </div>
                <p className="text-[#6F767E] font-medium text-sm leading-none mt-2">Marketing Overview Dashboard</p>
            </div>

            {/* Top KPI Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx) => (
                    <Card key={idx} className="p-6 border-none shadow-sm rounded-2xl bg-white flex flex-col gap-4 text-left">
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", kpi.color)}>
                            <kpi.icon size={22} className={kpi.iconColor} />
                        </div>
                        <div className="space-y-1">
                            <div className="text-[13px] font-medium text-[#6F767E] leading-none mb-2">{kpi.label}</div>
                            <div className="text-3xl font-bold text-[#1A1D1F] tracking-tight">{kpi.value}</div>
                            <div className={cn("flex items-center gap-1 text-[11px] font-bold", kpi.trendDown ? "text-red-500" : "text-green-500")}>
                                {kpi.trendDown ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                                {kpi.trend} <span className="text-gray-300 font-medium ml-1 whitespace-nowrap">vs last month</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Channel Performance Section */}
            <Card className="p-10 border-none shadow-sm rounded-[32px] bg-white overflow-hidden space-y-8">
                <h3 className="text-lg font-bold text-[#1A1D1F] tracking-tight border-b border-gray-50 pb-6 -mx-10 px-10">Performance by Channel</h3>

                <div className="space-y-8">
                    {channelPerformance.map((ch, i) => (
                        <div key={i} className="space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className={cn("h-3 w-3 rounded-full", ch.color)} />
                                    <span className="font-bold text-[#1A1D1F] text-[15px]">{ch.name}</span>
                                </div>
                                <div className="flex items-center gap-6 text-[11px] font-bold text-gray-400">
                                    <span>Leads: <span className="text-[#1A1D1F]">{ch.leads}</span></span>
                                    <span>Conversions: <span className="text-ninja-yellow">{ch.conversions}</span></span>
                                    <span>ROI: <span className="text-[#1A1D1F]">{ch.roi}</span></span>
                                </div>
                            </div>
                            <div className="h-2.5 w-full bg-[#F4F4F4] rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full transition-all duration-1000", ch.color)} style={{ width: `${ch.percentage}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Channel Focus Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {focusChannels.map((ch, i) => (
                    <Card key={i} className="p-10 border-none shadow-sm rounded-[32px] bg-white flex flex-col items-center justify-center gap-6 text-center group border border-transparent hover:border-ninja-yellow/5 transition-all">
                        <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", ch.bg, ch.color)}>
                            <ch.icon size={32} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-[17px] font-bold text-[#1A1D1F] tracking-tight">{ch.name}</h4>
                            <div className={cn("text-4xl font-bold tracking-tight py-1", ch.color)}>{ch.value}</div>
                            <p className="text-[12px] font-medium text-gray-400 capitalize">Leads generated</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
