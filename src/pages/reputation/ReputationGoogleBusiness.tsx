import { useState, useEffect } from 'react';
import {
  Eye,
  TrendingUp,
  MousePointer2,
  Star,
  ArrowUpRight,
  CalendarDays,
  PenLine,
  Image as ImageIcon,
  CheckCircle2,
  Circle,
  Loader2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { Card, Badge } from '../../components/ui';
import toast from 'react-hot-toast';
import { apiService } from '../../services/apiService';

const insightsData = [
  { month: 'Jan', views: 1350, searches: 720, actions: 420 },
  { month: 'Feb', views: 1450, searches: 820, actions: 450 },
  { month: 'Mar', views: 1700, searches: 980, actions: 530 },
  { month: 'Apr', views: 2050, searches: 1100, actions: 680 },
  { month: 'May', views: 2350, searches: 1420, actions: 770 },
  { month: 'Jun', views: 2789, searches: 1670, actions: 891 },
];

const actionsData = [
  { name: 'Calls', value: 215 },
  { name: 'Directions', value: 456 },
  { name: 'Website', value: 567 },
  { name: 'Messages', value: 143 },
];

const recentPosts = [
  { id: 1, type: 'Offer', title: '20% discount on annual plans', time: '2 days ago', views: '1,234' },
  { id: 2, type: 'News', title: 'New feature: AI Automation', time: '5 days ago', views: '2,456' },
  { id: 3, type: 'Event', title: 'Free Webinar: CRM for Beginners', time: '1 week ago', views: '3,567' },
];

const optimizations = [
  { id: 1, label: 'Complete business information', impact: 'High Impact', done: true },
  { id: 2, label: 'Add quality photos', impact: 'High Impact', done: true },
  { id: 3, label: 'Reply to all reviews', impact: 'High Impact', done: false },
  { id: 4, label: 'Publish content regularly', impact: 'Medium Impact', done: true },
  { id: 5, label: 'Update business hours', impact: 'Medium Impact', done: true },
  { id: 6, label: 'Add services and products', impact: 'Medium Impact', done: false },
  { id: 7, label: 'Verify contact information', impact: 'High Impact', done: true },
];

const tabs = ['Profile', 'Posts', 'Insights', 'Optimization'];

export const ReputationGoogleBusiness = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    apiService.getReviews()
      .then((data) => setReviews(data || []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / totalReviews).toFixed(1)
    : '0.0';

  const kpis = [
    { label: 'Views', value: '2,789', sub: 'last month', trend: '+24%', icon: Eye, color: 'text-ninja-yellow', bg: 'bg-ninja-yellow/10' },
    { label: 'Direct Searches', value: '1,892', sub: 'last month', trend: '+32%', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Total Actions', value: '891', sub: 'calls, web, etc.', trend: '+18%', icon: MousePointer2, color: 'text-ninja-yellow', bg: 'bg-ninja-yellow/10' },
    { label: 'Rating', value: String(avgRating), sub: `${totalReviews} reviews`, trend: String(avgRating), icon: Star, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];
  const [form, setForm] = useState({
    name: 'Ninja CRM - Marketing & Sales Platform',
    category: 'Software Company',
    address: '123 Main Street, Madrid, Spain',
    phone: '+34 912 345 678',
    description: 'All-in-one CRM platform for sales management, marketing and customer service. Automate processes and scale your business.',
    website: 'https://ninjacrm.com',
    hours: 'Mon-Fri: 9:00 - 18:00'
  });

  const doneCount = optimizations.filter(o => o.done).length;
  const optimizationPct = Math.round((doneCount / optimizations.length) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-ninja-yellow" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Google Business Profile</h1>
          <p className="text-gray-400 font-medium text-sm">Optimize your local visibility and reputation on Google</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 rounded-2xl border border-green-100">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-black text-green-600 uppercase tracking-widest">Connected</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className="p-5 border-none shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                <kpi.icon size={20} className={kpi.color} />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black">
                <ArrowUpRight size={10} />
                {kpi.trend}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <h4 className="text-3xl font-black text-ninja-dark mb-0.5">{kpi.value}</h4>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{kpi.sub}</p>
          </Card>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1.5 bg-gray-50 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab
                ? 'bg-white text-ninja-dark shadow-sm'
                : 'text-gray-400 hover:text-ninja-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'Profile' && (
        <Card className="p-8 border-none shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-ninja-dark">Business Information</h3>
            <button
              onClick={() => toast.success('Entering edit mode...')}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-100 rounded-xl text-xs font-black text-ninja-dark hover:border-ninja-yellow transition-colors"
            >
              <PenLine size={14} />
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Business Name', value: form.name, key: 'name' },
              { label: 'Category', value: form.category, key: 'category' },
              { label: 'Address', value: form.address, key: 'address' },
              { label: 'Phone', value: form.phone, key: 'phone' },
              { label: 'Website', value: form.website, key: 'website' },
              { label: 'Hours', value: form.hours, key: 'hours' },
            ].map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-[10px] font-black text-ninja-yellow uppercase tracking-widest">{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark"
                />
              </div>
            ))}

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-ninja-yellow uppercase tracking-widest">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => toast.success('Changes cancelled')}
              className="flex-1 py-3 rounded-2xl border border-gray-100 text-xs font-black text-gray-500 hover:bg-gray-50 transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={() => toast.success('Changes saved!')}
              className="flex-1 py-3 rounded-2xl bg-ninja-yellow text-ninja-dark text-xs font-black uppercase tracking-widest shadow-lg shadow-ninja-yellow/25 hover:shadow-ninja-yellow/40 transition-all"
            >
              Save Changes
            </button>
          </div>
        </Card>
      )}

      {/* Posts Tab */}
      {activeTab === 'Posts' && (
        <Card className="p-8 border-none shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-ninja-dark">Google Posts</h3>
            <button
              onClick={() => toast.success('Creating new post...')}
              className="flex items-center gap-2 px-4 py-2.5 bg-ninja-yellow text-ninja-dark rounded-xl text-xs font-black uppercase tracking-widest shadow-md shadow-ninja-yellow/20 hover:shadow-ninja-yellow/40 transition-all"
            >
              <CalendarDays size={14} />
              New Post
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: ImageIcon, color: 'text-ninja-yellow bg-ninja-yellow/10', label: 'News', sub: 'Share updates and announcements' },
              { icon: Star, color: 'text-purple-400 bg-purple-400/10', label: 'Offer', sub: 'Promote special discounts' },
              { icon: CalendarDays, color: 'text-ninja-yellow bg-ninja-yellow/10', label: 'Event', sub: 'Announce upcoming events' },
            ].map((type) => (
              <button
                key={type.label}
                onClick={() => toast.success(`Creating ${type.label} post...`)}
                className="p-5 bg-gray-50 rounded-2xl text-left hover:bg-ninja-yellow/5 hover:border-ninja-yellow/20 border border-transparent transition-all group"
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-3 ${type.color} group-hover:scale-110 transition-transform`}>
                  <type.icon size={20} />
                </div>
                <h4 className="font-black text-ninja-dark text-sm">{type.label}</h4>
                <p className="text-xs font-medium text-gray-400 mt-0.5">{type.sub}</p>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Recent Posts</h4>
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <Badge status="success" className={`font-black text-[10px] uppercase tracking-widest border-0 ${post.type === 'Offer' ? 'bg-ninja-dark text-white' : post.type === 'News' ? 'bg-ninja-yellow/20 text-ninja-dark' : 'bg-purple-100 text-purple-600'}`}>
                    {post.type}
                  </Badge>
                  <div>
                    <h5 className="font-black text-ninja-dark text-sm group-hover:text-ninja-yellow transition-colors">{post.title}</h5>
                    <p className="text-[10px] font-bold text-gray-400">{post.time} • {post.views} views</p>
                  </div>
                </div>
                <button onClick={() => toast.success('Opening editor...')} className="h-8 w-8 rounded-xl bg-white flex items-center justify-center text-gray-400 hover:text-ninja-dark transition-colors shadow-sm">
                  <PenLine size={14} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Insights Tab */}
      {activeTab === 'Insights' && (
        <div className="space-y-6">
          <Card className="p-8 border-none shadow-sm">
            <h3 className="text-base font-black text-ninja-dark mb-6">Profile Performance</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={insightsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="views" stroke="#D4FF00" strokeWidth={3} dot={{ r: 4, fill: '#D4FF00', strokeWidth: 2, stroke: '#fff' }} />
                  <Line type="monotone" dataKey="searches" stroke="#BFA9FF" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="actions" stroke="#111" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-8 border-none shadow-sm">
            <h3 className="text-base font-black text-ninja-dark mb-6">User Actions</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={actionsData} barSize={48}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="value" fill="#D4FF00" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Optimization Tab */}
      {activeTab === 'Optimization' && (
        <Card className="p-8 border-none shadow-sm space-y-4">
          <h3 className="text-base font-black text-ninja-dark">Optimization Checklist</h3>

          <div className="space-y-3">
            {optimizations.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  item.done ? 'bg-green-50/50 border-green-100' : 'bg-yellow-50/50 border-yellow-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  {item.done
                    ? <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                    : <Circle size={20} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
                  }
                  <div>
                    <h4 className="font-black text-ninja-dark text-sm">{item.label}</h4>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                      item.impact === 'High Impact' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                    }`}>
                      {item.impact}
                    </span>
                  </div>
                </div>
                {!item.done && (
                  <button
                    onClick={() => toast.success(`Completing: ${item.label}`)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black text-ninja-dark hover:border-ninja-yellow transition-colors"
                  >
                    Complete
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Optimization Level</p>
              <p className="text-3xl font-black text-ninja-dark">{optimizationPct}%</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-ninja-dark">{doneCount} of {optimizations.length} completed</p>
              <p className="text-xs font-bold text-ninja-yellow mt-0.5">Looking good! 👍</p>
            </div>
          </div>

          <div className="h-3 bg-gray-50 rounded-full overflow-hidden">
            <div
              className="h-full bg-ninja-yellow rounded-full transition-all duration-1000"
              style={{ width: `${optimizationPct}%` }}
            />
          </div>
        </Card>
      )}
    </div>
  );
};
