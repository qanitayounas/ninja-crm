
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  Mail,
  Megaphone,
  Timer,
  Plus,
  Users
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import toast from 'react-hot-toast';

const scheduledPosts = [
  {
    id: 1,
    platform: 'Facebook',
    initial: 'F',
    color: 'bg-blue-500',
    text: 'Check out our new product launch! 🚀',
    time: 'Mar 15, 10:00 AM'
  },
  {
    id: 2,
    platform: 'Twitter',
    initial: 'T',
    color: 'bg-sky-400',
    text: 'Join us for our webinar on CRM automation...',
    time: 'Mar 15, 2:00 PM'
  },
  {
    id: 3,
    platform: 'LinkedIn',
    initial: 'L',
    color: 'bg-blue-700',
    text: 'How we helped our clients increase...',
    time: 'Mar 16, 9:00 AM'
  }
];

const emailCampaigns = [
  { id: 1, name: 'Product Launch Newsletter', recipients: '12,458', opens: '5,234', clicks: '1,247', rate: '23.8%' },
  { id: 2, name: 'Weekly Tips & Tricks', recipients: '8,932', opens: '3,892', clicks: '893', rate: '22.9%' },
  { id: 3, name: 'Special Offer Alert', recipients: '15,621', opens: '7,234', clicks: '2,158', rate: '29.8%' }
];

const adCampaigns = [
  { id: 1, name: 'Google Search Ads', platform: 'Google', budget: '$500/day', spend: '$3,240', conversions: 124 },
  { id: 2, name: 'Facebook Retargeting', platform: 'Facebook', budget: '$300/day', spend: '$1,890', conversions: 78 },
  { id: 3, name: 'LinkedIn B2B Ads', platform: 'LinkedIn', budget: '$400/day', spend: '$2,560', conversions: 34 }
];

export const MarketingHubPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Marketing Hub</h1>
        <p className="text-gray-400 font-medium text-sm">Central control for all your marketing activities</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          onClick={() => navigate('/dashboard/marketing/social')}
          className="p-6 flex flex-col gap-3 border-gray-100 shadow-sm relative overflow-hidden group cursor-pointer hover:border-ninja-yellow/50 transition-all"
        >
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <CalendarDays size={80} />
          </div>
          <div className="h-10 w-10 rounded-xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow">
            <CalendarDays size={20} />
          </div>
          <div>
            <div className="text-3xl font-black text-ninja-dark">124</div>
            <div className="text-xs font-bold text-gray-400 mt-0.5">Scheduled Posts</div>
          </div>
        </Card>

        <Card 
          onClick={() => navigate('/dashboard/marketing/email')}
          className="p-6 flex flex-col gap-3 border-gray-100 shadow-sm relative overflow-hidden group cursor-pointer hover:border-purple-400/50 transition-all"
        >
          <div className="absolute -right-4 -bottom-4 text-purple-400/5 group-hover:scale-110 transition-transform duration-500">
            <Mail size={80} />
          </div>
          <div className="h-10 w-10 rounded-xl bg-purple-400/10 flex items-center justify-center text-purple-400">
            <Mail size={20} />
          </div>
          <div>
            <div className="text-3xl font-black text-purple-400">37K</div>
            <div className="text-xs font-bold text-gray-400 mt-0.5">Email Subscribers</div>
          </div>
        </Card>

        <Card 
          onClick={() => navigate('/dashboard/marketing/ads')}
          className="p-6 flex flex-col gap-3 border-gray-100 shadow-sm relative overflow-hidden group cursor-pointer hover:border-ninja-yellow/50 transition-all"
        >
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <Megaphone size={80} />
          </div>
          <div className="h-10 w-10 rounded-xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow">
            <Megaphone size={20} />
          </div>
          <div>
            <div className="text-3xl font-black text-ninja-dark">8</div>
            <div className="text-xs font-bold text-gray-400 mt-0.5">Active Ad Campaigns</div>
          </div>
        </Card>

        <Card className="p-6 flex flex-col gap-3 border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-400/5 group-hover:scale-110 transition-transform duration-500">
            <Timer size={80} />
          </div>
          <div className="h-10 w-10 rounded-xl bg-purple-400/10 flex items-center justify-center text-purple-400">
            <Timer size={20} />
          </div>
          <div>
            <div className="text-3xl font-black text-purple-400">12</div>
            <div className="text-xs font-bold text-gray-400 mt-0.5">Countdown Campaigns</div>
          </div>
        </Card>
      </div>

      {/* Social Media Planner */}
      <Card className="overflow-hidden border-none shadow-sm">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Social Media Planner</h3>
          <Button
            onClick={() => toast.success('Opening post scheduler...')}
            className="font-black px-4 py-2.5 h-auto text-xs rounded-xl shadow-md shadow-ninja-yellow/20 flex items-center gap-2"
          >
            <Plus size={14} />
            Schedule Post
          </Button>
        </div>
        <div className="divide-y divide-gray-50">
          {scheduledPosts.map((post) => (
            <div key={post.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer group">
              <div className={`h-9 w-9 rounded-xl ${post.color} flex items-center justify-center text-white font-black text-sm flex-shrink-0 group-hover:scale-110 transition-transform`}>
                {post.initial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-ninja-dark text-sm truncate group-hover:text-ninja-yellow transition-colors">{post.text}</p>
                <p className="text-[10px] font-bold text-gray-400 mt-0.5">{post.platform} • {post.time}</p>
              </div>
              <Badge status="success" className="bg-ninja-yellow/15 text-ninja-dark border-ninja-yellow/20 font-black text-[10px] uppercase tracking-widest whitespace-nowrap">
                scheduled
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Email Campaigns + Ads Manager Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Campaigns */}
        <Card 
          onClick={() => navigate('/dashboard/marketing/email')}
          className="overflow-hidden border-none shadow-sm cursor-pointer hover:border-ninja-yellow/50 transition-all group"
        >
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Email Campaigns</h3>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                toast.success('Creating email campaign...');
              }}
              className="font-black px-4 py-2.5 h-auto text-xs rounded-xl shadow-md shadow-ninja-yellow/20 flex items-center gap-2"
            >
              <Plus size={14} />
              Create Campaign
            </Button>
          </div>
          <div className="divide-y divide-gray-50">
            {emailCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-5 hover:bg-gray-50/50 transition-colors cursor-pointer">
                <h4 className="font-black text-ninja-dark text-sm mb-3 hover:text-ninja-yellow transition-colors">{campaign.name}</h4>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recipients</div>
                    <div className="font-black text-ninja-dark text-sm mt-0.5">{campaign.recipients}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Opens</div>
                    <div className="font-black text-purple-400 text-sm mt-0.5">{campaign.opens}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clicks</div>
                    <div className="font-black text-ninja-yellow text-sm mt-0.5">{campaign.clicks}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rate</div>
                    <div className="font-black text-ninja-dark text-sm mt-0.5">{campaign.rate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Ads Manager */}
        <Card 
          onClick={() => navigate('/dashboard/marketing/ads')}
          className="overflow-hidden border-none shadow-sm cursor-pointer hover:border-ninja-yellow/50 transition-all group"
        >
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Ads Manager</h3>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                toast.success('Creating ad campaign...');
              }}
              className="font-black px-4 py-2.5 h-auto text-xs rounded-xl shadow-md shadow-ninja-yellow/20 flex items-center gap-2"
            >
              <Plus size={14} />
              Create Ad Campaign
            </Button>
          </div>
          <div className="divide-y divide-gray-50">
            {adCampaigns.map((ad) => (
              <div key={ad.id} className="p-5 hover:bg-gray-50/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-black text-ninja-dark text-sm">{ad.name}</h4>
                    <p className="text-[10px] font-bold text-ninja-yellow mt-0.5 uppercase tracking-widest">{ad.platform}</p>
                  </div>
                  <Badge status="success" className="bg-green-50 text-green-600 border-green-100 font-black text-[10px] uppercase tracking-widest">
                    Active
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Budget</div>
                    <div className="font-black text-ninja-dark text-sm mt-0.5">{ad.budget}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Spend</div>
                    <div className="font-black text-purple-400 text-sm mt-0.5">{ad.spend}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Conversions</div>
                    <div className="font-black text-ninja-yellow text-sm mt-0.5">{ad.conversions}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Countdown Campaigns */}
        <Card 
          onClick={() => navigate('/dashboard/marketing/timers')}
          className="overflow-hidden border-none shadow-sm cursor-pointer hover:border-ninja-yellow/50 transition-all group"
        >
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Countdown Campaigns</h3>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                toast.success('Creating countdown...');
              }}
              className="font-black px-4 py-2.5 h-auto text-xs rounded-xl shadow-md shadow-ninja-yellow/20 flex items-center gap-2"
            >
              <Plus size={14} />
              Create Countdown
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center p-12 gap-4">
            <div className="h-16 w-16 rounded-2xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow group-hover:scale-110 transition-transform">
              <Timer size={32} />
            </div>
            <p className="text-sm font-bold text-gray-400 text-center">Create urgency with countdown timers</p>
          </div>
        </Card>

        {/* Content Scheduler */}
        <Card 
          onClick={() => navigate('/dashboard/marketing/affiliate')}
          className="overflow-hidden border-none shadow-sm cursor-pointer hover:border-ninja-yellow/50 transition-all group"
        >
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Affiliate Manager</h3>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                toast.success('Opening referral system...');
              }}
              className="font-black px-4 py-2.5 h-auto text-xs rounded-xl shadow-md shadow-ninja-yellow/20 flex items-center gap-2"
            >
              <Users size={14} />
              Recruit Partners
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center p-12 gap-4">
            <div className="h-16 w-16 rounded-2xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow group-hover:scale-110 transition-transform">
              <Users size={32} />
            </div>
            <p className="text-sm font-bold text-gray-400 text-center">Manage your affiliate program & commissions</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
