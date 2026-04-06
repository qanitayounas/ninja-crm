import { useState, useEffect } from 'react';
import { Users, TrendingUp, ShoppingBag, DollarSign, Send, X, Loader2 } from 'lucide-react';
import { Card, Button, Input, cn } from '../../components/ui';
import toast from 'react-hot-toast';
import { apiService } from '../../services/apiService';

const fallbackAffiliates = [
  { id: 1, name: 'Maria Gonzalez', email: 'maria@example.com', leads: 45, sales: 12, commission: '$1,890', status: 'Active' },
  { id: 2, name: 'Carlos Ruiz', email: 'carlos@example.com', leads: 78, sales: 23, commission: '$3,450', status: 'Active' },
  { id: 3, name: 'Ana Martinez', email: 'ana@example.com', leads: 34, sales: 8, commission: '$1,200', status: 'Active' },
  { id: 4, name: 'Jorge Lopez', email: 'jorge@example.com', leads: 12, sales: 2, commission: '$300', status: 'Pending' },
];

const fallbackKpis = [
  { label: 'Active Affiliates', value: '3', color: 'bg-purple-100', iconColor: 'text-purple-400', icon: Users },
  { label: 'Leads Generated', value: '169', color: 'bg-[#D4FF00]/30', iconColor: 'text-[#8aaa00]', icon: TrendingUp },
  { label: 'Total Sales', value: '45', color: 'bg-[#D4FF00]/30', iconColor: 'text-[#8aaa00]', icon: ShoppingBag },
  { label: 'Total Commissions', value: '$6,840', color: 'bg-purple-100', iconColor: 'text-purple-400', icon: DollarSign },
];

export const MarketingAffiliate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', commission: '15' });
  const [affiliates, setAffiliates] = useState(fallbackAffiliates);
  const [kpis, setKpis] = useState(fallbackKpis);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const contacts = await apiService.getContacts();
        if (Array.isArray(contacts) && contacts.length > 0) {
          setAffiliates(contacts.slice(0, 20).map((c: any, i: number) => ({
            id: c.id || i + 1,
            name: `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.name || 'Unknown',
            email: c.email || '',
            leads: 0,
            sales: 0,
            commission: '$0',
            status: 'Active',
          })));
          setKpis([
            { label: 'Active Affiliates', value: String(Math.min(contacts.length, 20)), color: 'bg-purple-100', iconColor: 'text-purple-400', icon: Users },
            { label: 'Leads Generated', value: '169', color: 'bg-[#D4FF00]/30', iconColor: 'text-[#8aaa00]', icon: TrendingUp },
            { label: 'Total Sales', value: '45', color: 'bg-[#D4FF00]/30', iconColor: 'text-[#8aaa00]', icon: ShoppingBag },
            { label: 'Total Commissions', value: '$6,840', color: 'bg-purple-100', iconColor: 'text-purple-400', icon: DollarSign },
          ]);
        }
      } catch {
        // Keep fallback data
      }
      setLoading(false);
    };
    fetchContacts();
  }, []);

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success(`Invitation sent to ${form.email}`);
    setIsModalOpen(false);
    setForm({ name: '', email: '', commission: '15' });
  };

  return (
    <div className="flex flex-col gap-6 pb-10 animate-in fade-in duration-500 text-left">

      {/* Header */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1D1F] tracking-tight">Affiliate Manager</h1>
            <p className="text-[#6F767E] text-sm mt-1">Affiliate system and commissions</p>
          </div>
          {loading && <Loader2 size={20} className="animate-spin text-ninja-yellow" />}
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-6 py-3 h-auto rounded-xl flex items-center gap-2 border-none shadow-sm transition-all text-sm"
        >
          <Send size={16} strokeWidth={2.5} />
          Invite Affiliate
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="p-6 border border-gray-100 shadow-sm rounded-2xl bg-white flex flex-col gap-3">
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

      {/* Affiliates Table Card */}
      <Card className="p-0 border border-gray-100 shadow-sm rounded-2xl bg-white overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#1A1D1F]">Affiliates</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-[#6F767E] uppercase tracking-widest">
                <th className="px-8 py-4">Affiliate</th>
                <th className="px-8 py-4">Email</th>
                <th className="px-8 py-4 text-center">Leads</th>
                <th className="px-8 py-4 text-center">Sales</th>
                <th className="px-8 py-4 text-center">Commission</th>
                <th className="px-8 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {affiliates.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <td className="px-8 py-5 font-bold text-[#1A1D1F] text-[15px]">{a.name}</td>
                  <td className="px-8 py-5 text-[#6F767E] text-[14px]">{a.email}</td>
                  <td className="px-8 py-5 text-center font-bold text-[#1A1D1F] text-[14px]">{a.leads}</td>
                  <td className="px-8 py-5 text-center font-bold text-ninja-yellow text-[14px]">{a.sales}</td>
                  <td className="px-8 py-5 text-center font-bold text-ninja-yellow text-[14px]">{a.commission}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={cn(
                      'px-4 py-1.5 rounded-full text-[11px] font-bold',
                      a.status === 'Active'
                        ? 'bg-ninja-yellow/15 text-ninja-yellow'
                        : 'bg-gray-100 text-gray-400'
                    )}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#6F767E] font-medium mb-0.5">Pending Payments</p>
            <p className="text-2xl font-bold text-[#1A1D1F]">$6,840</p>
          </div>
          <Button
            className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-8 py-3 h-auto rounded-xl border-none shadow-sm text-sm"
            onClick={() => toast.success('Processing payments...')}
          >
            Process Payments
          </Button>
        </div>
      </Card>

      {/* Invite Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#1A1D1F]">Invite New Affiliate</h3>
                <p className="text-[13px] text-[#6F767E] mt-0.5">Send an invitation to the affiliate program</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-9 w-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-[#1A1D1F] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-6 space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">
                  Name <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="Affiliate name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium focus:border-ninja-yellow"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">
                  Email <span className="text-red-400">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium focus:border-ninja-yellow"
                />
              </div>

              {/* Commission Rate */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Commission Rate (%)</label>
                <Input
                  type="number"
                  placeholder="15"
                  value={form.commission}
                  onChange={(e) => setForm({ ...form, commission: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium focus:border-ninja-yellow"
                />
              </div>

              {/* Submit */}
              <Button
                onClick={handleSubmit}
                className="w-full py-4 h-auto rounded-xl bg-ninja-yellow text-ninja-dark font-bold text-[13px] tracking-wide border-none shadow-sm mt-2"
              >
                Send Invitation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
