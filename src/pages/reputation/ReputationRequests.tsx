import { useState, useEffect } from 'react';
import {
    Send,
    CheckCircle,
    Clock,
    Calendar,
    Users,
    Mail,
    Smartphone,
    MessageSquare,
    Plus,
    Loader2
} from 'lucide-react';
import { Card, Button, cn } from '../../components/ui';
import { apiService } from '../../services/apiService';

export const ReputationRequests = () => {
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState<any[]>([]);
    const [campaigns, setCampaigns] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            apiService.getContacts().catch(() => []),
            apiService.getCampaigns().catch(() => [])
        ]).then(([contactsData, campaignsData]) => {
            setContacts(contactsData || []);
            setCampaigns(campaignsData || []);
        }).finally(() => setLoading(false));
    }, []);

    const totalContacts = contacts.length;
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter((c: any) => c.status === 'active' || c.status === 'published').length;

    const stats = [
        { label: 'Contacts Available', value: totalContacts.toLocaleString(), subtext: 'in CRM', icon: Send, color: 'text-ninja-dark', bg: 'bg-ninja-yellow' },
        { label: 'Campaigns', value: String(totalCampaigns), subtext: `${activeCampaigns} active`, icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'Pending', value: String(contacts.filter((c: any) => c.status === 'Lead').length), subtext: 'leads to request', icon: Clock, color: 'text-ninja-yellow', bg: 'bg-ninja-dark' },
        { label: 'Qualified', value: String(contacts.filter((c: any) => c.status === 'Qualified').length), subtext: 'ready to request', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
    ];

    const channelMetrics = [
        { label: 'Email', value: String(contacts.filter((c: any) => c.email).length), subtext: 'with email', icon: Mail, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'WhatsApp', value: String(contacts.filter((c: any) => c.phone).length), subtext: 'with phone', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50' },
        { label: 'SMS', value: String(contacts.filter((c: any) => c.phone).length), subtext: 'with phone', icon: Smartphone, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];
    const [activeTab, setActiveTab] = useState<'send' | 'followup'>('send');
    const [selectedContactMethod, setSelectedContactMethod] = useState<'crm' | 'email' | 'phone'>('crm');
    const [selectedChannel, setSelectedChannel] = useState<'email' | 'whatsapp' | 'sms'>('email');
    const [selectedTiming, setSelectedTiming] = useState<'immediate' | 'scheduled'>('immediate');

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-ninja-yellow" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-black text-gray-400 mb-1 uppercase tracking-widest">
                        <span>Reputation</span>
                        <span>/</span>
                        <span className="text-gray-600">Requests</span>
                    </div>
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Review Requests</h1>
                    <p className="text-gray-500 font-medium">Generate social proof by requesting reviews from your customers</p>
                </div>

                <Button className="flex items-center gap-2 shadow-lg shadow-ninja-yellow/20">
                    <Plus size={18} />
                    <span>New Request</span>
                </Button>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 border-none shadow-sm flex items-center gap-4">
                        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0", stat.bg)}>
                            <stat.icon className={stat.color} size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                            <h4 className="text-2xl font-black text-ninja-dark leading-tight">{stat.value}</h4>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{stat.subtext}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Tabs */}
            <div className="flex items-center p-1 bg-gray-100/80 rounded-2xl w-fit">
                <button 
                    onClick={() => setActiveTab('send')}
                    className={cn(
                        "px-8 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                        activeTab === 'send' ? "bg-white text-ninja-dark shadow-sm" : "text-gray-500 hover:text-gray-700"
                    )}
                >
                    Send Request
                </button>
                <button 
                    onClick={() => setActiveTab('followup')}
                    className={cn(
                        "px-8 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                        activeTab === 'followup' ? "bg-white text-ninja-dark shadow-sm" : "text-gray-500 hover:text-gray-700"
                    )}
                >
                    Follow-up
                </button>
            </div>

            {/* New Request Form (Only if activeTab is 'send') */}
            {activeTab === 'send' && (
                <Card className="border-none shadow-sm">
                    <h3 className="text-xl font-black text-ninja-dark mb-8">New Review Request</h3>

                    <div className="space-y-10">
                        {/* 1. Select Contacts */}
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Select Contacts</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <SelectionCard 
                                    icon={Users}
                                    title="From CRM"
                                    description="Select existing contacts"
                                    isActive={selectedContactMethod === 'crm'}
                                    onClick={() => setSelectedContactMethod('crm')}
                                    iconColor="text-ninja-yellow"
                                />
                                <SelectionCard 
                                    icon={Mail}
                                    title="Manual Email"
                                    description="Enter email manually"
                                    isActive={selectedContactMethod === 'email'}
                                    onClick={() => setSelectedContactMethod('email')}
                                    iconColor="text-purple-500"
                                />
                                <SelectionCard 
                                    icon={Smartphone}
                                    title="Manual Phone"
                                    description="Enter phone number"
                                    isActive={selectedContactMethod === 'phone'}
                                    onClick={() => setSelectedContactMethod('phone')}
                                    iconColor="text-ninja-yellow"
                                />
                            </div>
                        </div>

                        {/* 2. Sending Channel */}
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Sending Channel</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <SelectionCard 
                                    icon={Mail}
                                    title="Email"
                                    description="Ideal for formal processes"
                                    isActive={selectedChannel === 'email'}
                                    onClick={() => setSelectedChannel('email')}
                                    iconColor="text-ninja-dark"
                                    iconBg="bg-ninja-yellow"
                                />
                                <SelectionCard 
                                    icon={MessageSquare}
                                    title="WhatsApp"
                                    description="Higher response rate"
                                    isActive={selectedChannel === 'whatsapp'}
                                    onClick={() => setSelectedChannel('whatsapp')}
                                    iconColor="text-white"
                                    iconBg="bg-purple-300"
                                />
                                <SelectionCard 
                                    icon={Smartphone}
                                    title="SMS"
                                    description="Less friction"
                                    isActive={selectedChannel === 'sms'}
                                    onClick={() => setSelectedChannel('sms')}
                                    iconColor="text-ninja-dark"
                                    iconBg="bg-ninja-yellow"
                                />
                            </div>
                        </div>

                        {/* 3. Sending Time */}
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Sending Time</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectionCard 
                                    icon={Send}
                                    title="Send Immediately"
                                    description="Send right now"
                                    isActive={selectedTiming === 'immediate'}
                                    onClick={() => setSelectedTiming('immediate')}
                                    iconColor="text-ninja-dark"
                                />
                                <SelectionCard 
                                    icon={Calendar}
                                    title="Schedule Send"
                                    description="Select date and time"
                                    isActive={selectedTiming === 'scheduled'}
                                    onClick={() => setSelectedTiming('scheduled')}
                                    iconColor="text-ninja-dark"
                                />
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-6 flex items-center justify-center md:justify-end gap-3 sticky bottom-0 bg-white/80 backdrop-blur-md py-4 border-t border-gray-50">
                            <Button variant="ghost" className="text-gray-500 font-bold">Cancel</Button>
                            <Button className="flex items-center gap-2 px-12">
                                <Send size={18} />
                                <span>Send Request</span>
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Bottom Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {channelMetrics.map((metric, idx) => (
                    <Card key={idx} className={cn("border-none shadow-sm flex items-center gap-4 py-8", metric.bg.replace('50', '100/50'))}>
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0 bg-white shadow-sm")}>
                            <metric.icon className={metric.color} size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{metric.label}</p>
                            <h4 className="text-2xl font-black text-ninja-dark leading-tight">{metric.value}</h4>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{metric.subtext}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

interface SelectionCardProps {
    icon: any;
    title: string;
    description: string;
    isActive: boolean;
    onClick: () => void;
    iconColor?: string;
    iconBg?: string;
}

const SelectionCard = ({ icon: Icon, title, description, isActive, onClick, iconColor, iconBg }: SelectionCardProps) => (
    <div 
        onClick={onClick}
        className={cn(
            "p-6 rounded-3xl border-2 transition-all cursor-pointer group flex flex-col gap-4 min-h-[140px]",
            isActive 
                ? "border-ninja-yellow bg-ninja-yellow/5" 
                : "border-gray-50 bg-white hover:border-gray-200 hover:shadow-md"
        )}
    >
        <div className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center",
            iconBg || "bg-gray-50 group-hover:bg-gray-100"
        )}>
            <Icon className={cn(iconColor || "text-gray-400", "transition-colors")} size={20} />
        </div>
        <div>
            <h4 className="font-bold text-ninja-dark mb-0.5">{title}</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">{description}</p>
        </div>
    </div>
);
