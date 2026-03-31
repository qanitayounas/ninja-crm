import React from 'react';
import {
  Plus, X, Calendar, FileText, MessageCircle, BarChart2,
  TrendingUp, Settings, Search, CheckCircle2, Layers, RefreshCw,
  Heart, CornerDownLeft, Facebook, Instagram, Linkedin, Twitter, Youtube, Music, Eye, Users, Flame, Video, AlertCircle, MousePointerClick, Globe, Zap, Bell, ImageIcon
} from 'lucide-react';
import { Button, Select, cn } from '../../components/ui';
import toast from 'react-hot-toast';

// --- Platform config (bigger, cleaner icons) ---
const platforms: Record<string, { color: string; bg: string; label: string }> = {
  Facebook:  { color: 'text-blue-600',  bg: 'bg-blue-100',  label: 'f' },
  Instagram: { color: 'text-pink-500',  bg: 'bg-pink-100',  label: '◎' },
  LinkedIn:  { color: 'text-blue-700',  bg: 'bg-blue-100',  label: 'in' },
  Twitter:   { color: 'text-sky-400',   bg: 'bg-sky-100',   label: '𝕏' },
  TikTok:    { color: 'text-gray-800',  bg: 'bg-gray-100',  label: '♪' },
  YouTube:   { color: 'text-red-500',   bg: 'bg-red-100',   label: '▶' },
};

const platformIcons: Record<string, React.ElementType> = {
  Facebook, Instagram, LinkedIn: Linkedin, Twitter, TikTok: Music, YouTube: Youtube
};

const postStatusStyles: Record<string, string> = {
  Published:  'bg-ninja-yellow/20 text-ninja-yellow',
  Draft:      'bg-gray-100 text-gray-400',
  Scheduled:  'bg-blue-100 text-blue-500',
};

const contentStatusStyles: Record<string, string> = {
  Active:     'bg-ninja-yellow/20 text-ninja-yellow',
  'In Review':'bg-purple-100 text-purple-400',
  Draft:      'bg-gray-100 text-gray-400',
  Approved:   'bg-green-100 text-green-500',
};

const formatIcons: Record<string, string> = {
  'CSV Recurring': '📄',
  'Reviews':       '⭐',
  'RSS':           '📡',
  'Template':      '📋',
  'Library':       '📚',
};

// --- Data ---
const posts = [
  { id: 1, platform: 'Facebook',  content: 'Case study: How Acme Corp increased sales 200%',  date: 'Mar 20, 2026', time: '09:00', status: 'Published' },
  { id: 2, platform: 'Instagram', content: 'Behind the scenes of our team',                   date: 'Mar 21, 2026', time: '12:00', status: 'Draft' },
  { id: 3, platform: 'LinkedIn',  content: 'Launch of the new Enterprise Plan 🚀',             date: 'Mar 22, 2026', time: '10:00', status: 'Scheduled' },
  { id: 4, platform: 'Instagram', content: 'Tips to improve your CRM this week',              date: 'Mar 23, 2026', time: '14:30', status: 'Scheduled' },
  { id: 5, platform: 'Twitter',   content: 'Free webinar: Marketing automation',              date: 'Mar 25, 2026', time: '16:00', status: 'Scheduled' },
];

const contentRows = [
  { id: 1, name: 'Weekly Tips Series',    status: 'Active',     format: 'CSV Recurring', posts: 24, network: 'Instagram', updated: 'Mar 20, 2026' },
  { id: 2, name: 'Client Testimonials',   status: 'In Review',  format: 'Reviews',       posts: 12, network: 'LinkedIn',  updated: 'Mar 19, 2026' },
  { id: 3, name: 'Auto Blog',             status: 'Active',     format: 'RSS',           posts: 45, network: 'Facebook',  updated: 'Mar 21, 2026' },
  { id: 4, name: 'Monthly Promotions',    status: 'Draft',      format: 'Template',      posts: 8,  network: 'Twitter',   updated: 'Mar 18, 2026' },
  { id: 5, name: 'Success Stories',       status: 'Approved',   format: 'Library',       posts: 16, network: 'LinkedIn',  updated: 'Mar 22, 2026' },
];

const contentFilters = ['All', 'CSV Recurring', 'Reviews', 'RSS', 'Template', 'Library'];

const commentTags: Record<string, string> = {
  Question: 'bg-[#D4FF00]/40 text-[#8aaa00]',
  Positive: 'bg-blue-50 text-blue-500',
  Reaction: 'bg-purple-50 text-purple-500',
  Interest: 'bg-green-50 text-green-500',
};

const commentsList = [
  { id: 1, author: '@maria_tech', platform: 'Instagram', time: '5 min ago', content: 'Great content! Do you have a demo available?', post: 'Enterprise Plan Launch', likes: 3, tag: 'Question' },
  { id: 2, author: 'Carlos Ruiz', platform: 'Facebook', time: '12 min ago', content: 'Very useful, thanks for sharing', post: 'Weekly CRM Tips', likes: 8, tag: 'Positive' },
  { id: 3, author: 'Ana Martinez', platform: 'LinkedIn', time: '25 min ago', content: 'I would like to know more about pricing', post: 'Case Study Acme Corp', likes: 5, tag: 'Question' },
  { id: 4, author: '@techguru', platform: 'Twitter', time: '1 hour ago', content: '🔥🔥🔥', post: 'Automation Webinar', likes: 12, tag: 'Reaction' },
  { id: 5, author: '@startup_life', platform: 'Instagram', time: '2 hours ago', content: 'When is the next webinar?', post: 'Behind the Scenes', likes: 2, tag: 'Question' },
  { id: 6, author: 'Jorge Lopez', platform: 'LinkedIn', time: '3 hours ago', content: 'Great article, very well explained', post: 'Marketing Automation', likes: 15, tag: 'Positive' },
  { id: 7, author: '@digitalmarketer', platform: 'TikTok', time: '4 hours ago', content: 'I need this for my business', post: 'CRM Demo Video', likes: 24, tag: 'Interest' },
  { id: 8, author: 'StartupHub', platform: 'YouTube', time: '5 hours ago', content: 'Very complete tutorial, subscribed!', post: 'Complete Tutorial', likes: 34, tag: 'Positive' },
];

const statsKPIs = [
  { label: 'Total Posts', value: '199', trend: '+12% vs last month', iconBg: 'bg-[#F4FFB2]', iconColor: 'text-[#8aaa00]', Icon: FileText },
  { label: 'Interactions', value: '17,514', trend: '+28% vs last month', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-500', Icon: MousePointerClick },
  { label: 'Impressions', value: '143,350', trend: '+34% vs last month', iconBg: 'bg-[#EAFFB2]', iconColor: 'text-[#8aaa00]', Icon: Eye },
  { label: 'Reach', value: '93,850', trend: '+21% vs last month', iconBg: 'bg-purple-50', iconColor: 'text-purple-500', Icon: Globe },
];

const platformPerformance = [
  { name: 'Instagram', color: 'bg-pink-500', textColor: 'text-pink-500', posts: 45, interactions: '3,245', impressions: '28,450', reach: '18,230', clicks: 892, progress: 60 },
  { name: 'Facebook', color: 'bg-blue-600', textColor: 'text-blue-600', posts: 38, interactions: '2,134', impressions: '19,800', reach: '12,450', clicks: 654, progress: 40 },
  { name: 'LinkedIn', color: 'bg-blue-700', textColor: 'text-blue-700', posts: 32, interactions: '4,567', impressions: '34,200', reach: '22,100', clicks: 1234, progress: 80 },
  { name: 'Twitter', color: 'bg-sky-400', textColor: 'text-sky-400', posts: 56, interactions: '1,890', impressions: '15,600', reach: '9,870', clicks: 445, progress: 35 },
  { name: 'TikTok', color: 'bg-gray-900', textColor: 'text-gray-900', posts: 28, interactions: '5,678', impressions: '45,300', reach: '31,200', clicks: 1567, progress: 100 },
];

const topPostsList = [
  { id: 1, title: 'Enterprise Plan Launch', platform: 'LinkedIn', likes: '1234', views: '8945' },
  { id: 2, title: 'Complete CRM Tutorial', platform: 'YouTube', likes: '2345', views: '15678' },
  { id: 3, title: 'Behind the Scenes', platform: 'Instagram', likes: '890', views: '5432' },
];

const demographics = [
  { age: '18-24 years', percentage: 23, color: 'bg-[#D4FF00]' },
  { age: '25-34 years', percentage: 45, color: 'bg-[#C0A3E5]' },
  { age: '35-44 years', percentage: 22, color: 'bg-blue-400' },
  { age: '45+ years', percentage: 10, color: 'bg-gray-300' },
];

const googleTrends = [
  { term: 'CRM automation', volume: '50K', growth: '+45%', region: 'Global' },
  { term: 'marketing tools', volume: '35K', growth: '+32%', region: 'USA' },
  { term: 'sales pipeline', volume: '28K', growth: '+21%', region: 'Europe' },
];

const tikTokTrends = [
  { hashtag: '#businesstips', views: '2.5M', priority: 'High', prColor: 'bg-purple-100 text-purple-600' },
  { hashtag: '#entrepreneur', views: '1.8M', priority: 'Very High', prColor: 'bg-[#F2FFB2]/50 text-[#8aaa00]' },
  { hashtag: '#productivity', views: '1.2M', priority: 'Medium', prColor: 'bg-gray-100 text-gray-500' },
];

const youtubeTrends = [
  { title: 'CRM Tutorial for Beginners', views: '450K', category: 'Education' },
  { title: 'Best Marketing Automation 2026', views: '320K', category: 'Business' },
  { title: 'Sales Tips that Actually Work', views: '280K', category: 'Business' },
];

const viralTopics = [
  { title: 'AI for Small Business', platform: 'Multiple', momentum: 'Rising Fast', mColor: 'text-green-500', oppTag: 'High Opportunity', oppColor: 'bg-[#F2FFB2]/50 text-[#8aaa00]', borderClass: 'border-ninja-yellow' },
  { title: 'Remote Team Management', platform: 'LinkedIn', momentum: 'Steady', mColor: 'text-[#6F767E]', oppTag: 'Medium Opportunity', oppColor: 'bg-purple-100 text-purple-600', borderClass: 'border-gray-200' },
  { title: 'Marketing ROI Optimization', platform: 'Twitter', momentum: 'Growing', mColor: 'text-green-500', oppTag: 'High Opportunity', oppColor: 'bg-[#F2FFB2]/50 text-[#8aaa00]', borderClass: 'border-ninja-yellow' },
];

const connectedAccounts = [
  { account: '@ninja_crm', platform: 'Instagram', type: 'Business', status: 'Active', validity: '21/3/2027' },
  { account: 'Ninja CRM', platform: 'Facebook', type: 'Page', status: 'Active', validity: '21/3/2027' },
  { account: 'Ninja CRM Official', platform: 'LinkedIn', type: 'Company', status: 'Active', validity: '21/3/2027' },
  { account: '@ninjacrm', platform: 'Twitter', type: 'Business', status: 'Expired', validity: '15/2/2026' },
  { account: 'Ninja CRM', platform: 'TikTok', type: 'Business', status: 'Active', validity: '21/3/2027' },
];

const communities = [
  { name: 'Ninja CRM Users', sub: 'Facebook  2,450 members', priority: 'High', color: 'text-[#8aaa00]' },
  { name: 'CRM Best Practices', sub: 'LinkedIn  1,890 members', priority: 'Medium', color: 'text-orange-400' },
];

const notifications = ['New comments', 'Mentions', 'Direct messages', 'Weekly analytics'];

const categories = ['Tips & Advice', 'Success Stories', 'Promotions', 'Educational', 'Entertainment'];

const tabs = [
  { key: 'Planner',          icon: Calendar },
  { key: 'Content',          icon: FileText },
  { key: 'Comments',         icon: MessageCircle },
  { key: 'Statistics',       icon: BarChart2 },
  { key: 'Social Listening', icon: TrendingUp },
  { key: 'Settings',         icon: Settings },
];

// Reusable bigger platform icon
const PlatformIcon = ({ platform }: { platform: string }) => {
  const p = platforms[platform] || { color: 'text-gray-500', bg: 'bg-gray-100', label: '?' };
  return (
    <div className={cn(
      'h-10 w-10 rounded-full flex items-center justify-center font-black shrink-0',
      // Bigger text for single-letter platforms
      platform === 'LinkedIn' ? 'text-[13px]' : 'text-[18px]',
      p.bg, p.color
    )}>
      {p.label}
    </div>
  );
};

export const MarketingSocial = () => {
  const [activeTab, setActiveTab] = React.useState('Planner');
  const [contentFilter, setContentFilter] = React.useState('All');
  const [contentSearch, setContentSearch] = React.useState('');
  const [isPostModalOpen, setIsPostModalOpen] = React.useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = React.useState(false);
  const [postForm, setPostForm] = React.useState({ content: '', platform: 'Instagram', date: '', time: '' });
  const [contentForm, setContentForm] = React.useState({ name: '', format: 'CSV Recurring', network: 'Instagram', file: '' });

  const scheduled = posts.filter(p => p.status === 'Scheduled').length;
  const published  = posts.filter(p => p.status === 'Published').length;
  const drafts     = posts.filter(p => p.status === 'Draft').length;

  const filteredContent = contentRows.filter(r => {
    const matchesFilter = contentFilter === 'All' || r.format === contentFilter;
    const matchesSearch = r.name.toLowerCase().includes(contentSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreatePost = () => {
    if (!postForm.content) { toast.error('Content is required'); return; }
    toast.success('Post scheduled!');
    setIsPostModalOpen(false);
    setPostForm({ content: '', platform: 'Instagram', date: '', time: '' });
  };

  const handleCreateContent = () => {
    if (!contentForm.name) { toast.error('Series name is required'); return; }
    toast.success('Content series created!');
    setIsContentModalOpen(false);
    setContentForm({ name: '', format: 'CSV Recurring', network: 'Instagram', file: '' });
  };

  return (
    <div className="flex flex-col gap-6 pb-10 animate-in fade-in duration-500 text-left">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1D1F] tracking-tight">Social Media Planner</h1>
        <p className="text-[#6F767E] text-sm mt-1">Complete social content management</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center border-b border-gray-200 gap-6 overflow-x-auto pb-px">
        {tabs.map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              'pb-3 flex items-center gap-1.5 text-[13px] font-semibold whitespace-nowrap transition-all border-b-2 -mb-px shrink-0',
              activeTab === key
                ? 'text-ninja-yellow border-ninja-yellow'
                : 'text-[#6F767E] border-transparent hover:text-[#1A1D1F]'
            )}
          >
            <Icon size={15} />
            {key}
          </button>
        ))}
      </div>

      {/* ─── TAB: Planner ─── */}
      {activeTab === 'Planner' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          {/* Stats row + Create button */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-4 flex-1 flex-wrap">
              <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 min-w-[140px]">
                <p className="text-[12px] text-[#6F767E] font-medium mb-1">Scheduled Posts</p>
                <p className="text-3xl font-bold text-[#1A1D1F]">{scheduled}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 min-w-[140px]">
                <p className="text-[12px] text-[#6F767E] font-medium mb-1">Published</p>
                <p className="text-3xl font-bold text-ninja-yellow">{published}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 min-w-[140px]">
                <p className="text-[12px] text-[#6F767E] font-medium mb-1">Drafts</p>
                <p className="text-3xl font-bold text-[#1A1D1F]">{drafts}</p>
              </div>
            </div>
            <Button
              onClick={() => setIsPostModalOpen(true)}
              className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-6 py-3 h-auto rounded-xl flex items-center gap-2 border-none shadow-sm text-sm shrink-0"
            >
              <Plus size={16} strokeWidth={3} />
              Create Post
            </Button>
          </div>

          {/* Content Calendar */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
              <Calendar size={18} className="text-[#1A1D1F]" />
              <h2 className="text-[16px] font-bold text-[#1A1D1F]">Content Calendar</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {posts.map((post) => (
                <div key={post.id} className="px-6 py-5 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <PlatformIcon platform={post.platform} />
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-[#1A1D1F] mb-0.5">{post.platform}</p>
                      <p className="text-[14px] text-[#1A1D1F] mb-2 truncate">{post.content}</p>
                      <div className="flex items-center gap-1.5 text-[12px] text-[#6F767E]">
                        <Calendar size={12} />
                        <span>{post.date}</span>
                        <span className="ml-1">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className={cn('text-[11px] font-bold px-3 py-1.5 rounded-full shrink-0 mt-0.5 whitespace-nowrap', postStatusStyles[post.status])}>
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB: Content ─── */}
      {activeTab === 'Content' && (
        <div className="flex flex-col gap-5 animate-in fade-in duration-300">
          {/* Search + New Post button */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                placeholder="Search content..."
                value={contentSearch}
                onChange={(e) => setContentSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 outline-none focus:border-ninja-yellow transition-all"
              />
            </div>
            <Button
              onClick={() => setIsContentModalOpen(true)}
              className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-5 py-2.5 h-auto rounded-xl flex items-center gap-2 border-none text-sm shrink-0"
            >
              <Plus size={15} strokeWidth={3} />
              New Post
            </Button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {contentFilters.map((f) => (
              <button
                key={f}
                onClick={() => setContentFilter(f)}
                className={cn(
                  'px-4 py-2 rounded-xl text-[13px] font-semibold border transition-all',
                  contentFilter === f
                    ? 'bg-ninja-yellow text-ninja-dark border-ninja-yellow'
                    : 'bg-white text-[#6F767E] border-gray-200 hover:border-gray-300'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Content Table */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-[#6F767E] uppercase tracking-widest">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Format</th>
                    <th className="px-6 py-4 text-center">No. Posts</th>
                    <th className="px-6 py-4">Social Network</th>
                    <th className="px-6 py-4 text-right">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredContent.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                      <td className="px-6 py-4 font-bold text-[#1A1D1F] text-[14px]">{row.name}</td>
                      <td className="px-6 py-4">
                        <span className={cn('px-3 py-1.5 rounded-full text-[11px] font-bold', contentStatusStyles[row.status])}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-[13px] text-[#6F767E] font-medium">
                          <span>{formatIcons[row.format]}</span>
                          {row.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-[#1A1D1F]">{row.posts}</td>
                      <td className="px-6 py-4 text-[13px] text-[#6F767E] font-medium">{row.network}</td>
                      <td className="px-6 py-4 text-right text-[13px] text-[#6F767E]">{row.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 size={20} className="text-ninja-yellow" />
                <span className="text-[15px] font-bold text-[#1A1D1F]">Approvals</span>
              </div>
              <p className="text-[12px] text-[#6F767E]">Pending publications</p>
              <p className="text-3xl font-bold text-[#1A1D1F]">3</p>
              <button className="text-[13px] font-bold text-ninja-yellow hover:underline text-left mt-1">View queue →</button>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <Layers size={20} className="text-purple-400" />
                <span className="text-[15px] font-bold text-[#1A1D1F]">Library</span>
              </div>
              <p className="text-[12px] text-[#6F767E]">Saved templates</p>
              <p className="text-3xl font-bold text-[#1A1D1F]">24</p>
              <button className="text-[13px] font-bold text-blue-400 hover:underline text-left mt-1">Explore →</button>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <RefreshCw size={20} className="text-blue-400" />
                <span className="text-[15px] font-bold text-[#1A1D1F]">Categories</span>
              </div>
              <p className="text-[12px] text-[#6F767E]">Active classifications</p>
              <p className="text-3xl font-bold text-[#1A1D1F]">8</p>
              <button className="text-[13px] font-bold text-blue-400 hover:underline text-left mt-1">Manage →</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB: Comments ─── */}
      {activeTab === 'Comments' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          
          {/* Filters Row */}
          <div className="flex items-center gap-4">
            <div className="relative max-w-sm flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                placeholder="Search by keyword..."
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 outline-none focus:border-ninja-yellow transition-all"
              />
            </div>
            <Select className="py-2.5 rounded-xl border-gray-200 bg-white text-sm min-w-[140px]">
              <option>All Platforms</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>LinkedIn</option>
              <option>Twitter</option>
              <option>TikTok</option>
              <option>Pinterest</option>
              <option>YouTube</option>
              <option>Threads</option>
              <option>Bluesky</option>
            </Select>
            <Select className="py-2.5 rounded-xl border-gray-200 bg-white text-sm min-w-[140px]">
              <option>All Types</option>
              <option>Question</option>
              <option>Positive</option>
              <option>Reaction</option>
              <option>Interest</option>
            </Select>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
              <p className="text-[12px] text-[#6F767E] font-medium mb-1">Total Comments</p>
              <p className="text-3xl font-bold text-[#1A1D1F]">8</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
              <p className="text-[12px] text-[#6F767E] font-medium mb-1">Questions</p>
              <p className="text-3xl font-bold text-[#c2e800]">3</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
              <p className="text-[12px] text-[#6F767E] font-medium mb-1">Positive</p>
              <p className="text-3xl font-bold text-blue-500">3</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
              <p className="text-[12px] text-[#6F767E] font-medium mb-1">Pending</p>
              <p className="text-3xl font-bold text-[#1A1D1F]">5</p>
            </div>
          </div>

          {/* Comments List */}
          <div className="bg-white border border-gray-200 rounded-2xl flex flex-col">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-[#1A1D1F]">Comments Inbox</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {commentsList.map((comment) => {
                const PIcon = platformIcons[comment.platform] || MessageCircle;
                const pColor = platforms[comment.platform]?.color || 'text-gray-500';
                return (
                  <div key={comment.id} className="px-8 py-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={cn("h-8 w-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0", pColor)}>
                           <PIcon size={14} />
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-[#1A1D1F]">{comment.author}</p>
                          <p className="text-[12px] text-[#6F767E]">{comment.platform} • {comment.time}</p>
                        </div>
                      </div>
                      <span className={cn('text-[11px] font-bold px-3 py-1 rounded-md text-center min-w-[70px]', commentTags[comment.tag])}>
                        {comment.tag}
                      </span>
                    </div>
                    
                    <p className="text-[14px] text-[#1A1D1F] mb-4 pl-11">
                      {comment.content}
                    </p>

                    <div className="flex items-center justify-between pl-11">
                      <div className="flex items-center gap-4 text-[12px] text-[#6F767E]">
                        <span>Post: {comment.post}</span>
                        <span className="flex items-center gap-1.5"><Heart size={13} className="text-gray-400" /> {comment.likes}</span>
                      </div>
                      <Button onClick={() => toast.success('Replying...')} className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-4 py-2 h-auto rounded-xl flex items-center gap-2 border-none text-[12px] shadow-sm">
                        <CornerDownLeft size={14} strokeWidth={3} />
                        Reply
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB: Statistics ─── */}
      {activeTab === 'Statistics' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          
          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsKPIs.map((kpi, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className={cn("h-10 w-10 rounded-xl mb-4 flex items-center justify-center", kpi.iconBg)}>
                    {kpi.Icon && <kpi.Icon size={20} className={kpi.iconColor} />}
                  </div>
                  <p className="text-[13px] text-[#6F767E] font-medium mb-1">{kpi.label}</p>
                  <p className="text-[28px] font-bold text-[#1A1D1F] leading-tight">{kpi.value}</p>
                </div>
                <p className="text-[12px] font-bold text-green-500 mt-4 flex items-center gap-1">
                  <TrendingUp size={14} /> {kpi.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Performance by Network */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 pb-8">
            <h2 className="text-[16px] font-bold text-[#1A1D1F] mb-6">Performance by Social Network</h2>
            <div className="flex flex-col gap-5">
              {platformPerformance.map((plat) => (
                <div key={plat.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[13px] font-medium flex-wrap gap-y-2">
                    <div className="flex items-center gap-2 w-[140px] shrink-0">
                      <div className={cn("h-2.5 w-2.5 rounded-full shrink-0", plat.color)} />
                      <span className="text-[#1A1D1F] font-bold">{plat.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between flex-1 gap-4 min-w-[500px]">
                      <span className="text-[#6F767E]">Posts: <span className="font-bold text-[#1A1D1F]">{plat.posts}</span></span>
                      <span className="text-[#6F767E]">Interactions: <span className={cn("font-bold", plat.textColor)}>{plat.interactions}</span></span>
                      <span className="text-[#6F767E]">Impressions: <span className="font-bold text-[#1A1D1F]">{plat.impressions}</span></span>
                      <span className="text-[#6F767E]">Reach: <span className="font-bold text-[#1A1D1F]">{plat.reach}</span></span>
                      <span className="text-[#6F767E]">Clicks: <span className="font-bold text-[#1A1D1F]">{plat.clicks}</span></span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-0.5">
                    <div className={cn("h-full rounded-full", plat.color)} style={{ width: `${plat.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Top Posts */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={18} className="text-[#8aaa00]" />
                <h2 className="text-[16px] font-bold text-[#1A1D1F]">Top Posts</h2>
              </div>
              <div className="flex flex-col gap-3">
                {topPostsList.map((post) => (
                  <div key={post.id} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-[#D4FF00]/40 flex items-center justify-center text-[12px] font-bold text-[#8aaa00] shrink-0">
                        {post.id}
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#1A1D1F]">{post.title}</p>
                        <p className="text-[12px] text-[#6F767E]">{post.platform}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[13px] text-[#6F767E] font-medium">
                      <span className="flex items-center gap-1.5"><Heart size={14} className="text-gray-400" /> {post.likes}</span>
                      <span className="flex items-center gap-1.5"><Eye size={14} className="text-gray-400" /> {post.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Demographics */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users size={18} className="text-purple-400" />
                <h2 className="text-[16px] font-bold text-[#1A1D1F]">Audience Demographics</h2>
              </div>
              <div className="flex flex-col gap-5 mt-2">
                {demographics.map((demo) => (
                  <div key={demo.age} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[13px] font-bold">
                      <span className="text-[#6F767E]">{demo.age}</span>
                      <span className="text-[#1A1D1F]">{demo.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", demo.color)} style={{ width: `${demo.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB: Social Listening ─── */}
      {activeTab === 'Social Listening' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          
          {/* Header Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <Flame size={20} className="text-[#c2e800]" />
              <h2 className="text-[18px] font-bold text-[#1A1D1F]">Real-Time Social Listening</h2>
            </div>
            <p className="text-[13px] text-[#6F767E] ml-7">Global monitoring of trends and digital conversation</p>
          </div>

          {/* Google Trends block */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-10 w-10 rounded-xl bg-[#F4FFB2] flex items-center justify-center shrink-0">
                <Search size={20} className="text-[#8aaa00]" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#1A1D1F]">Google Trends</h3>
                <p className="text-[13px] text-[#6F767E]">Global popular searches</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {googleTrends.map((trend, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-wrap items-center justify-between shadow-sm gap-4">
                  <div>
                    <p className="text-[14px] font-bold text-[#1A1D1F] mb-1">{trend.term}</p>
                    <div className="flex items-center gap-4 text-[12px] text-[#6F767E]">
                      <span>Volume: <span className="text-[#1A1D1F]">{trend.volume}</span></span>
                      <span className="font-bold text-green-500">{trend.growth}</span>
                      <span>Region: <span className="text-[#1A1D1F]">{trend.region}</span></span>
                    </div>
                  </div>
                  <Button className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-6 py-2.5 h-auto rounded-xl text-[12px] border-none shadow-sm">
                    Use
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TikTok Trends Block */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Music size={20} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1A1D1F]">TikTok Trending</h3>
                  <p className="text-[13px] text-[#6F767E]">Viral hashtags and sounds</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {tikTokTrends.map((trend, idx) => (
                  <div key={idx} className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
                    <p className="text-[14px] font-bold text-[#1A1D1F] mb-1"><span className="text-[#c2e800] mr-0.5">#</span>{trend.hashtag.replace('#','')}</p>
                    <p className="text-[12px] text-[#6F767E] mb-3">{trend.views} views</p>
                    <span className={cn("text-[11px] font-bold px-3 py-1 rounded-full", trend.prColor)}>
                      {trend.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube Trends Block */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <Youtube size={20} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1A1D1F]">YouTube Trends</h3>
                  <p className="text-[13px] text-[#6F767E]">Trending videos by category</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {youtubeTrends.map((trend, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-wrap items-center justify-between shadow-sm gap-4">
                    <div className="flex items-center gap-3">
                      <Video size={16} className="text-gray-400 shrink-0" />
                      <div>
                        <p className="text-[14px] font-bold text-[#1A1D1F] mb-1">{trend.title}</p>
                        <div className="flex items-center gap-2 text-[12px] text-[#6F767E]">
                          <span>{trend.views} views</span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium">{trend.category}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-purple-100 hover:bg-purple-200 text-purple-600 font-bold px-4 py-2 h-auto rounded-xl text-[12px] border-none shadow-none shrink-0">
                      Adapt
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Viral Topics Block */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                <Zap size={20} className="text-purple-500" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#1A1D1F]">Viral Topics</h3>
                <p className="text-[13px] text-[#6F767E]">Detected content opportunities</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {viralTopics.map((topic, idx) => (
                <div key={idx} className={cn("bg-white border-2 rounded-xl p-5 shadow-sm", topic.borderClass)}>
                  <div className="flex flex-wrap gap-4 items-start justify-between mb-4">
                    <div>
                      <h4 className="text-[15px] font-bold text-[#1A1D1F] mb-1">{topic.title}</h4>
                      <p className="text-[12px] text-[#6F767E]">
                        Platform: <span className="text-[#1A1D1F] font-medium mr-4">{topic.platform}</span>
                        Momentum: <span className={cn("font-bold", topic.mColor)}>{topic.momentum}</span>
                      </p>
                    </div>
                    <span className={cn("text-[11px] font-bold px-3 py-1 rounded-full", topic.oppColor)}>
                      {topic.oppTag}
                    </span>
                  </div>
                  <Button className="w-full bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold py-3.5 h-auto rounded-xl text-[13px] border-none shadow-sm">
                    Generate Content
                  </Button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ─── TAB: Settings ─── */}
      {activeTab === 'Settings' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          
          {/* Top 3 KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-[12px] text-[#6F767E] font-medium mb-1">Connected Accounts</p>
              <p className="text-3xl font-bold text-[#1A1D1F]">5</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-[12px] text-[#6F767E] font-medium mb-1">Active</p>
              <p className="text-3xl font-bold text-[#c2e800]">4</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-[12px] text-[#6F767E] font-medium mb-1">Expired</p>
              <p className="text-3xl font-bold text-red-500">1</p>
            </div>
          </div>

          {/* Connected Social Accounts Table */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-[#1A1D1F]">Connected Social Accounts</h2>
              <Button className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-4 py-2 h-auto rounded-xl flex items-center gap-2 border-none text-[13px] shadow-sm">
                <Plus size={16} strokeWidth={3} />
                Connect Social Network
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold text-[#6F767E] uppercase tracking-widest">
                    <th className="px-6 py-4">Account</th>
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Validity</th>
                    <th className="px-6 py-4 w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {connectedAccounts.map((acc, idx) => {
                    const PIcon = platformIcons[acc.platform] || MessageCircle;
                    const pColor = platforms[acc.platform]?.color || 'text-gray-500';
                    const isActive = acc.status === 'Active';
                    return (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#1A1D1F] text-[13px]">{acc.account}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-[13px] text-[#6F767E] font-medium">
                            <PIcon size={16} className={pColor} />
                            {acc.platform}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[13px] text-[#6F767E] font-medium">{acc.type}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold',
                            isActive ? 'bg-[#F4FFB2] text-[#8aaa00]' : 'bg-red-50 text-red-500'
                          )}>
                            {isActive ? <CheckCircle2 size={12} strokeWidth={3} /> : <AlertCircle size={12} strokeWidth={3} />}
                            {acc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[13px] text-[#6F767E]">{acc.validity}</td>
                        <td className="px-6 py-4">
                          {isActive ? (
                            <button className="px-4 py-1.5 border border-gray-200 rounded-full text-[12px] font-bold text-[#1A1D1F] hover:bg-gray-50 transition-colors">
                              Configure
                            </button>
                          ) : (
                            <button className="px-4 py-1.5 bg-[#D4FF00] hover:bg-[#D4FF00]/90 rounded-full text-[12px] font-bold text-ninja-dark transition-colors border shadow-sm border-transparent">
                              Reconnect
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Communities */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <Users size={20} className="text-purple-500" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1A1D1F]">Communities</h3>
                  <p className="text-[13px] text-[#6F767E]">Managed groups and communities</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {communities.map((comm, idx) => (
                  <div key={idx} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 flex flex-wrap gap-2 items-center justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1A1D1F] mb-0.5">{comm.name}</h4>
                      <div className="flex items-center gap-3 text-[12px] text-[#6F767E]">
                        <span>{comm.sub}</span>
                        <span className={cn("font-bold text-[11px]", comm.color)}>{comm.priority}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-[#F4FFB2] flex items-center justify-center shrink-0">
                  <Bell size={20} className="text-[#8aaa00]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1A1D1F]">Notifications</h3>
                  <p className="text-[13px] text-[#6F767E]">Alerts and configuration</p>
                </div>
              </div>
              <div className="flex flex-col">
                {notifications.map((notif, idx) => (
                  <div key={idx} className="flex items-center justify-between flex-wrap gap-2 py-4 border-b border-gray-50 last:border-0">
                    <span className="text-[14px] font-bold text-[#1A1D1F]">{notif}</span>
                    <div className="w-10 h-5 bg-[#D4FF00] rounded-full flex items-center p-0.5 justify-end shadow-inner cursor-pointer shrink-0">
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Categories */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <Layers size={20} className="text-purple-500" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1A1D1F]">Social Categories</h3>
                  <p className="text-[13px] text-[#6F767E]">Content organization</p>
                </div>
              </div>
              <div className="flex flex-col">
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between flex-wrap gap-2 py-4 border-b border-gray-50 last:border-0">
                    <span className="text-[14px] font-bold text-[#1A1D1F]">{cat}</span>
                    <button className="text-[12px] font-bold text-purple-400 hover:text-purple-600 transition-colors">Edit</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Watermark */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-[#F4FFB2] flex items-center justify-center shrink-0">
                  <ImageIcon size={20} className="text-[#8aaa00]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1A1D1F]">Watermark</h3>
                  <p className="text-[13px] text-[#6F767E]">Logo in publications</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="text-[14px] font-bold text-[#1A1D1F]">Enable watermark</span>
                <div className="w-10 h-5 bg-[#D4FF00] rounded-full flex items-center p-0.5 justify-end shadow-inner cursor-pointer shrink-0">
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
              <Select className="w-full mb-4 py-3 rounded-xl border-gray-200 text-[13px]">
                <option>Bottom right corner</option>
                <option>Bottom left corner</option>
                <option>Top right corner</option>
                <option>Top left corner</option>
              </Select>
              <Button className="w-full bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold py-3.5 h-auto rounded-xl text-[13px] border-none shadow-sm">
                Upload Logo
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* ─── Other Tabs: placeholder ─── */}
      {activeTab !== 'Planner' && activeTab !== 'Content' && activeTab !== 'Comments' && activeTab !== 'Statistics' && activeTab !== 'Social Listening' && activeTab !== 'Settings' && (
        <div className="flex items-center justify-center h-48 bg-white border border-gray-200 rounded-2xl animate-in fade-in duration-300">
          <p className="text-[#6F767E] font-medium text-sm">{activeTab} — Coming soon</p>
        </div>
      )}

      {/* ─── Create Post Modal ─── */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsPostModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#1A1D1F]">Create New Post</h3>
                <p className="text-[13px] text-[#6F767E] mt-0.5">Schedule content on social networks</p>
              </div>
              <button onClick={() => setIsPostModalOpen(false)} className="h-9 w-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="px-8 py-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Content <span className="text-red-400">*</span></label>
                <textarea
                  placeholder="Write your post..."
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 outline-none focus:border-ninja-yellow focus:ring-1 focus:ring-ninja-yellow/20 transition-all resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Platform</label>
                <Select value={postForm.platform} onChange={(e) => setPostForm({ ...postForm, platform: e.target.value })} className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm">
                  <option>Instagram</option><option>Facebook</option><option>Twitter</option><option>LinkedIn</option><option>TikTok</option>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#1A1D1F]">Date</label>
                  <input type="date" value={postForm.date} onChange={(e) => setPostForm({ ...postForm, date: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-ninja-yellow transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#1A1D1F]">Time</label>
                  <input type="time" value={postForm.time} onChange={(e) => setPostForm({ ...postForm, time: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-ninja-yellow transition-all" />
                </div>
              </div>
              <Button onClick={handleCreatePost} className="w-full py-4 h-auto rounded-xl bg-ninja-yellow text-ninja-dark font-bold text-[13px] border-none">
                Schedule Post
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Content Modal ─── */}
      {isContentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsContentModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#1A1D1F]">Create Content</h3>
                <p className="text-[13px] text-[#6F767E] mt-0.5">Configure the format and social network</p>
              </div>
              <button onClick={() => setIsContentModalOpen(false)} className="h-9 w-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="px-8 py-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Series Name <span className="text-red-400">*</span></label>
                <input
                  placeholder="E.g.: Weekly Tips"
                  value={contentForm.name}
                  onChange={(e) => setContentForm({ ...contentForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-ninja-yellow focus:ring-1 focus:ring-ninja-yellow/20 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Format</label>
                <Select value={contentForm.format} onChange={(e) => setContentForm({ ...contentForm, format: e.target.value })} className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm">
                  <option>CSV Recurring</option><option>Reviews</option><option>RSS</option><option>Template</option><option>Library</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Social Network</label>
                <Select value={contentForm.network} onChange={(e) => setContentForm({ ...contentForm, network: e.target.value })} className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm">
                  <option>Instagram</option><option>Facebook</option><option>LinkedIn</option><option>Twitter</option><option>TikTok</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Archive (optional)</label>
                <input
                  type="file"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#6F767E] file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-ninja-yellow file:text-ninja-dark cursor-pointer"
                />
              </div>
              <Button onClick={handleCreateContent} className="w-full py-4 h-auto rounded-xl bg-ninja-yellow text-ninja-dark font-bold text-[13px] border-none">
                Create Content
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
