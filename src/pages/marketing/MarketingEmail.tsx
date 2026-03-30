import React from 'react';
import { Plus, X, Send, Eye, MousePointer, MousePointerClick } from 'lucide-react';
import { Card, Button, Input, Select, cn } from '../../components/ui';
import toast from 'react-hot-toast';

// --- Data ---
const kpis = [
  { label: 'Emails Sent', value: '6,312', color: 'bg-[#D4FF00]/30', iconColor: 'text-[#8aaa00]', icon: Send },
  { label: 'Open Rate', value: '47.0%', color: 'bg-purple-100', iconColor: 'text-purple-400', icon: Eye },
  { label: 'CTR (Click-Through)', value: '9.3%', color: 'bg-[#D4FF00]/30', iconColor: 'text-[#8aaa00]', icon: MousePointer },
  { label: 'Total Clicks', value: '590', color: 'bg-purple-100', iconColor: 'text-purple-400', icon: MousePointerClick },
];

const campaigns = [
  { id: 1, name: 'Weekly Newsletter #45', status: 'Finalized', sent: '5,420', opens: '2,341', clicks: '456', date: 'Mar 15, 2026' },
  { id: 2, name: 'Black Friday Promotion', status: 'Scheduled', sent: '0', opens: '0', clicks: '0', date: 'Nov 25, 2026' },
  { id: 3, name: 'Welcome New Clients', status: 'Active', sent: '892', opens: '623', clicks: '134', date: 'Mar 10, 2026' },
  { id: 4, name: 'Abandoned Cart Reminder', status: 'Draft', sent: '0', opens: '0', clicks: '0', date: 'Mar 20, 2026' },
];

const statCampaigns = [
  { name: 'Weekly Newsletter #45', sent: '5,420', opens: '2,341', clicks: '456', date: 'Mar 15, 2026' },
  { name: 'Welcome New Clients', sent: '892', opens: '623', clicks: '134', date: 'Mar 10, 2026' },
];

const templates = [
  { name: 'Modern Welcome', category: 'Onboarding', emoji: '👋' },
  { name: 'Product Promotion', category: 'Sales', emoji: '🎁' },
  { name: 'Minimalist Newsletter', category: 'Newsletter', emoji: '✉️' },
  { name: 'Webinar Event', category: 'Events', emoji: '📅' },
];

const statusStyles: Record<string, string> = {
  Finalized: 'bg-ninja-yellow/20 text-ninja-yellow',
  Scheduled: 'bg-purple-100 text-purple-400',
  Active: 'bg-green-100 text-green-500',
  Draft: 'bg-gray-100 text-gray-400',
};

const tabs = ['Statistics', 'Campaigns', 'Templates'];

export const MarketingEmail = () => {
  const [activeTab, setActiveTab] = React.useState('Statistics');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', subject: '', template: '' });
  const [templateForm, setTemplateForm] = React.useState({ name: '', category: 'Onboarding' });

  const handleCreate = () => {
    if (!form.name || !form.subject) {
      toast.error('Campaign name and subject are required');
      return;
    }
    toast.success('Campaign created!');
    setIsModalOpen(false);
    setForm({ name: '', subject: '', template: '' });
  };

  const handleCreateTemplate = () => {
    if (!templateForm.name) {
      toast.error('Template name is required');
      return;
    }
    toast.success('Template created!');
    setIsTemplateModalOpen(false);
    setTemplateForm({ name: '', category: 'Onboarding' });
  };

  return (
    <div className="flex flex-col gap-6 pb-10 animate-in fade-in duration-500 text-left">

      {/* Header */}
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D1F] tracking-tight">Email Marketing</h1>
          <p className="text-[#6F767E] text-sm mt-1">Campaigns, statistics and templates</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center border-b border-gray-200 gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'pb-3 text-[14px] font-semibold transition-all border-b-2 -mb-px',
              activeTab === tab
                ? 'text-ninja-yellow border-ninja-yellow'
                : 'text-[#6F767E] border-transparent hover:text-[#1A1D1F]'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── TAB: Statistics ─── */}
      {activeTab === 'Statistics' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, i) => (
              <Card key={i} className="p-6 border border-gray-100 shadow-sm rounded-2xl bg-white flex flex-col gap-3">
                <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', kpi.color)}>
                  <kpi.icon size={20} className={kpi.iconColor} />
                </div>
                <div>
                  <p className="text-[12px] text-[#6F767E] font-medium mb-1">{kpi.label}</p>
                  <p className="text-3xl font-bold text-[#1A1D1F] tracking-tight">{kpi.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Campaign Performance */}
          <Card className="p-0 border border-gray-100 shadow-sm rounded-2xl bg-white overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <h2 className="text-[16px] font-bold text-[#1A1D1F]">Campaign Performance</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {statCampaigns.map((c, i) => (
                <div key={i} className="px-8 py-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-bold text-[#1A1D1F]">{c.name}</h3>
                    <span className="text-[13px] text-[#6F767E]">{c.date}</span>
                  </div>
                  <div className="flex items-center gap-16">
                    <div>
                      <p className="text-[11px] font-bold text-[#6F767E] uppercase tracking-widest mb-1">Sent</p>
                      <p className="text-xl font-bold text-[#1A1D1F]">{c.sent}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#6F767E] uppercase tracking-widest mb-1">Opens</p>
                      <p className="text-xl font-bold text-ninja-yellow">{c.opens}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#6F767E] uppercase tracking-widest mb-1">Clicks</p>
                      <p className="text-xl font-bold text-purple-400">{c.clicks}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ─── TAB: Campaigns ─── */}
      {activeTab === 'Campaigns' && (
        <div className="animate-in fade-in duration-300">
          <Card className="p-0 border border-gray-100 shadow-sm rounded-2xl bg-white overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-[#1A1D1F]">All Campaigns</h2>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-5 py-2.5 h-auto rounded-xl flex items-center gap-2 border-none text-sm"
              >
                <Plus size={15} strokeWidth={3} />
                Create Campaign
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-[#6F767E] uppercase tracking-widest">
                    <th className="px-8 py-4">Campaign</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-center">Sent</th>
                    <th className="px-8 py-4 text-center">Opens</th>
                    <th className="px-8 py-4 text-center">Clicks</th>
                    <th className="px-8 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {campaigns.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                      <td className="px-8 py-5 font-bold text-[#1A1D1F] text-[14px]">{c.name}</td>
                      <td className="px-8 py-5">
                        <span className={cn('px-3 py-1.5 rounded-full text-[11px] font-bold', statusStyles[c.status])}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center font-bold text-[#1A1D1F] text-[14px]">{c.sent}</td>
                      <td className="px-8 py-5 text-center font-bold text-ninja-yellow text-[14px]">{c.opens}</td>
                      <td className="px-8 py-5 text-center font-bold text-purple-400 text-[14px]">{c.clicks}</td>
                      <td className="px-8 py-5 text-right text-[13px] text-[#6F767E]">{c.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ─── TAB: Templates ─── */}
      {activeTab === 'Templates' && (
        <div className="animate-in fade-in duration-300 flex flex-col gap-6">
          <div className="flex justify-end">
            <Button
              onClick={() => setIsTemplateModalOpen(true)}
              className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-5 py-2.5 h-auto rounded-xl flex items-center gap-2 border-none text-sm"
            >
              <Plus size={15} strokeWidth={3} />
              Create Template
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {templates.map((t, i) => (
              <Card key={i} className="p-6 border border-gray-200 shadow-sm rounded-2xl bg-white flex flex-col items-center gap-4 text-center hover:shadow-md transition-all">
                <div className="h-28 w-full flex items-center justify-center bg-gray-50 rounded-xl text-5xl">
                  {t.emoji}
                </div>
                <div className="w-full text-left">
                  <h3 className="text-[15px] font-bold text-[#1A1D1F]">{t.name}</h3>
                  <p className="text-[12px] text-[#6F767E] mt-0.5">{t.category}</p>
                </div>
                <button
                  onClick={() => toast.success(`Using template: ${t.name}`)}
                  className="w-full py-2.5 border border-gray-200 rounded-xl text-[13px] font-bold text-[#1A1D1F] hover:bg-gray-50 transition-colors"
                >
                  Use Template
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ─── Create Campaign Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#1A1D1F]">Create New Email Campaign</h3>
                <p className="text-[13px] text-[#6F767E] mt-0.5">Configure your email marketing campaign</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-9 w-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors mt-0.5"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-8 py-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Campaign Name <span className="text-red-400">*</span></label>
                <Input
                  placeholder="E.g.: Newsletter Weekly"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Email Subject <span className="text-red-400">*</span></label>
                <Input
                  placeholder="(News this week)"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Template</label>
                <Select
                  value={form.template}
                  onChange={(e) => setForm({ ...form, template: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                >
                  <option value="">Select template...</option>
                  <option>Modern Welcome</option>
                  <option>Product Promotion</option>
                  <option>Minimalist Newsletter</option>
                  <option>Webinar Event</option>
                </Select>
              </div>
              <Button
                onClick={handleCreate}
                className="w-full py-4 h-auto rounded-xl bg-ninja-yellow text-ninja-dark font-bold text-[13px] tracking-wide border-none shadow-sm mt-2"
              >
                Create Campaign
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Template Modal ─── */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsTemplateModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#1A1D1F]">Create New Template</h3>
                <p className="text-[13px] text-[#6F767E] mt-0.5">Design a reusable template</p>
              </div>
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="h-9 w-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors mt-0.5"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-8 py-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Template Name <span className="text-red-400">*</span></label>
                <Input
                  placeholder="E.g.: Christmas Promotion"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Category</label>
                <Select
                  value={templateForm.category}
                  onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                >
                  <option>Onboarding</option>
                  <option>Sales</option>
                  <option>Newsletter</option>
                  <option>Events</option>
                </Select>
              </div>
              <Button
                onClick={handleCreateTemplate}
                className="w-full py-4 h-auto rounded-xl bg-ninja-yellow text-ninja-dark font-bold text-[13px] tracking-wide border-none shadow-sm mt-2"
              >
                Create Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
