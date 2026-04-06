import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Play,
  Clock,
  Pause,
  AlertCircle,
  Megaphone,
  Loader2
} from 'lucide-react';
import { Card, Button, Input, Select, Modal, cn } from '../../components/ui';
import toast from 'react-hot-toast';
import { apiService } from '../../services/apiService';

export const MarketingAdsManager = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [campaignCount, setCampaignCount] = useState('3');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchCampaigns = async () => {
        setLoading(true);
        try {
          const campaigns = await apiService.getCampaigns();
          if (Array.isArray(campaigns)) {
            const activeCount = campaigns.filter((c: any) => c.status === 'active' || c.status === 'Active').length || campaigns.length;
            setCampaignCount(String(activeCount));
          }
        } catch {
          // Keep fallback value
        }
        setLoading(false);
      };
      fetchCampaigns();
    }, []);

    return (
        <div className="flex flex-col gap-8 pb-10 animate-in fade-in duration-500 text-left">
            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-[28px] font-bold text-[#1A1D1F] tracking-tight leading-none">Ads Manager</h1>
                  {loading && <Loader2 size={20} className="animate-spin text-ninja-yellow" />}
                </div>
                <p className="text-[#6F767E] font-medium text-sm leading-none mt-2">Manage your advertising campaigns</p>
            </div>

            {/* KPI Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Active Campaigns', value: campaignCount, color: 'bg-[#F2FFB2]/40', iconColor: 'text-[#D4FF00]', icon: Megaphone },
                    { label: 'In Review', value: '1', color: 'bg-blue-50', iconColor: 'text-blue-400', icon: Clock },
                    { label: 'Paused', value: '1', color: 'bg-gray-100', iconColor: 'text-gray-400', icon: Pause },
                    { label: 'With Error', value: '1', color: 'bg-red-50', iconColor: 'text-red-400', icon: AlertCircle }
                ].map((stat, idx) => (
                    <Card key={idx} className="p-6 border-none shadow-sm rounded-2xl bg-white flex flex-col gap-4">
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", stat.color)}>
                            <stat.icon size={22} className={stat.iconColor} />
                        </div>
                        <div className="space-y-1">
                            <div className="text-[13px] font-medium text-[#6F767E] leading-none mb-2">{stat.label}</div>
                            <div className="text-3xl font-bold text-[#1A1D1F] tracking-tight">{stat.value}</div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Budget Summary Card */}
            <Card className="p-10 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                <div className="space-y-8">
                    <h3 className="text-lg font-bold text-[#1A1D1F] tracking-tight">Budget Summary</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="space-y-2">
                            <div className="text-[12px] font-medium text-[#6F767E] uppercase tracking-wider">Total Budget</div>
                            <div className="text-3xl font-bold text-[#1A1D1F] tracking-tight">$9,500</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-[12px] font-medium text-[#6F767E] uppercase tracking-wider">Spent</div>
                            <div className="text-3xl font-bold text-ninja-yellow tracking-tight">$3,385</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-[12px] font-medium text-[#6F767E] uppercase tracking-wider">Available</div>
                            <div className="text-3xl font-bold text-[#1A1D1F] tracking-tight">$6,115</div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-6">
                        <div className="h-2.5 w-full bg-[#F4F4F4] rounded-full overflow-hidden">
                             <div className="h-full bg-ninja-yellow rounded-full transition-all" style={{ width: '36%' }} />
                        </div>
                        <div className="text-[10px] font-medium text-gray-400 capitalize">
                            36% of budget used
                        </div>
                    </div>
                </div>
            </Card>

            {/* Table Area */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-1 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                            <Input 
                                placeholder="Search campaigns..." 
                                className="pl-12 py-6 bg-white border-gray-100 rounded-xl focus:ring-1 focus:ring-ninja-yellow/50"
                            />
                        </div>
                        <div className="min-w-[140px]">
                            <Select className="py-3 bg-white border-gray-100 rounded-xl text-sm font-medium">
                                <option>All</option>
                                <option>Facebook</option>
                                <option>Google Ads</option>
                                <option>LinkedIn</option>
                            </Select>
                        </div>
                    </div>

                    <Button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-8 py-4 h-auto rounded-xl shadow-sm flex items-center gap-2 border-none transition-all"
                    >
                        <Plus size={20} strokeWidth={3} />
                        <span>Create Campaign</span>
                    </Button>
                </div>

                <Card className="p-0 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-50 bg-[#FCFCFD] text-[11px] font-bold text-[#6F767E] uppercase tracking-widest">
                                    <th className="px-8 py-5 text-left">CAMPAIGN</th>
                                    <th className="px-8 py-5 text-left">PLATFORM</th>
                                    <th className="px-8 py-5 text-left">OBJECTIVE</th>
                                    <th className="px-8 py-5 text-left">BUDGET</th>
                                    <th className="px-8 py-5 text-left">SPENT</th>
                                    <th className="px-8 py-5 text-left">DATE</th>
                                    <th className="px-8 py-5 text-left">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-[14px]">
                                {[
                                    { name: 'Spring Seasonal Sale 2026', platform: 'Facebook', objective: 'Conversions', budget: '$1,500', spent: '$890', date: 'March 15, 2026', status: 'Active' },
                                    { name: 'Google Search - Plan Pro', platform: 'Google Ads', objective: 'Leads', budget: '$2,000', spent: '$1,245', date: 'March 10, 2026', status: 'Active' },
                                    { name: 'LinkedIn B2B Campaign', platform: 'LinkedIn', objective: 'Brand Awareness', budget: '$3,000', spent: '$0', date: 'March 20, 2026', status: 'In Review' },
                                    { name: 'Instagram Stories - Promo', platform: 'Instagram', objective: 'Traffic', budget: '$800', spent: '$650', date: 'March 05, 2026', status: 'Paused' },
                                ].map((c, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                                        <td className="px-8 py-6 font-bold text-[#1A1D1F]">{c.name}</td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-[12px] font-medium text-gray-500">{c.platform}</span>
                                        </td>
                                        <td className="px-8 py-6 text-gray-500 font-medium">{c.objective}</td>
                                        <td className="px-8 py-6 text-[#1A1D1F] font-bold">{c.budget}</td>
                                        <td className="px-8 py-6 text-ninja-yellow font-bold">{c.spent}</td>
                                        <td className="px-8 py-6 text-gray-500 font-medium">{c.date}</td>
                                        <td className="px-8 py-6">
                                            <div className={cn(
                                                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold",
                                                c.status === 'Active' ? "text-ninja-yellow bg-ninja-yellow/5" : 
                                                c.status === 'In Review' ? "text-blue-500 bg-blue-50/50" : "text-gray-400 bg-gray-100"
                                            )}>
                                                {c.status === 'Active' ? <Play size={14} fill="currentColor" /> : 
                                                 c.status === 'In Review' ? <Clock size={14} /> : <Pause size={14} />}
                                                {c.status}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Create Campaign Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Campaign"
            >
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Campaign Name *</label>
                        <Input 
                            placeholder="E.g.: Spring Sales 2026"
                            className="py-6 px-4 rounded-xl border-gray-100 focus:ring-1 focus:ring-ninja-yellow/20"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Platform</label>
                            <Select className="py-2 px-4 rounded-xl border-gray-100 focus:ring-1 focus:ring-ninja-yellow/20">
                                <option>Select platform...</option>
                                <option>Facebook</option>
                                <option>Google Ads</option>
                                <option>LinkedIn</option>
                                <option>Instagram</option>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Objective</label>
                            <Select className="py-2 px-4 rounded-xl border-gray-100 focus:ring-1 focus:ring-ninja-yellow/20">
                                <option>Select objective...</option>
                                <option>Conversions</option>
                                <option>Leads</option>
                                <option>Traffic</option>
                                <option>Awareness</option>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Daily Budget ($)</label>
                            <Input 
                                type="number"
                                placeholder="50.00"
                                className="py-6 px-4 rounded-xl border-gray-100 focus:ring-1 focus:ring-ninja-yellow/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Start Date</label>
                            <Input 
                                type="date"
                                className="py-6 px-4 rounded-xl border-gray-100 focus:ring-1 focus:ring-ninja-yellow/20"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6">
                        <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)} className="rounded-xl px-8 border-none hover:bg-gray-100">Cancel</Button>
                        <Button 
                            className="bg-ninja-yellow text-ninja-dark font-bold px-10 rounded-xl"
                            onClick={() => {
                                toast.success("Campaign created!");
                                setIsCreateModalOpen(false);
                            }}
                        >
                            Launch Campaign
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
