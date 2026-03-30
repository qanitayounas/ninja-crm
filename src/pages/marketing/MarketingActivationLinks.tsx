import React from 'react';
import { Plus, Copy, Eye, X } from 'lucide-react';
import { Button, Input, Select } from '../../components/ui';
import toast from 'react-hot-toast';

const links = [
  { id: 1, name: 'Ebook Download Lead Magnet', token: 'TRG-ABC123', slug: 'ebook-download', clicks: 234, created: 'Mar 10, 2026' },
  { id: 2, name: 'Webinar Registration Confirmed', token: 'TRG-XYZ789', slug: 'webinar-confirm', clicks: 156, created: 'Mar 15, 2026' },
  { id: 3, name: 'Product Demo Request', token: 'TRG-DEF456', slug: 'demo-request', clicks: 89, created: 'Mar 18, 2026' },
  { id: 4, name: 'Upgrade to Pro Plan', token: 'TRG-GHI012', slug: 'upgrade-pro', clicks: 67, created: 'Mar 20, 2026' },
];

export const MarketingActivationLinks = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', slug: '', action: 'Send Email' });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const handleCreate = () => {
    if (!form.name) {
      toast.error('Link name is required');
      return;
    }
    toast.success('Activation link created!');
    setIsModalOpen(false);
    setForm({ name: '', slug: '', action: 'Send Email' });
  };

  return (
    <div className="flex flex-col gap-6 pb-10 animate-in fade-in duration-500 text-left">

      {/* Header */}
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D1F] tracking-tight">Activation Links</h1>
          <p className="text-[#6F767E] text-sm mt-1">Behavior tracking and automation triggers</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-6 py-3 h-auto rounded-xl flex items-center gap-2 border-none shadow-sm transition-all text-sm"
        >
          <Plus size={16} strokeWidth={3} />
          Create Link
        </Button>
      </div>

      {/* Links Grid - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-white border-2 border-ninja-yellow/60 rounded-2xl p-6 flex flex-col gap-5 hover:border-ninja-yellow transition-colors"
          >
            {/* Card Header */}
            <div className="space-y-2">
              <h3 className="text-[16px] font-bold text-[#1A1D1F]">{link.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#6F767E] font-medium">Token:</span>
                <span className="text-[12px] font-bold text-[#1A1D1F] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                  {link.token}
                </span>
                <button
                  onClick={() => handleCopy(link.token)}
                  className="text-gray-400 hover:text-ninja-yellow transition-colors"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>

            {/* URL Row */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <span className="text-[13px] text-[#6F767E] font-medium">
                ninja.app/trigger/{link.slug}
              </span>
              <button
                onClick={() => handleCopy(`https://ninja.app/trigger/${link.slug}`)}
                className="text-gray-400 hover:text-ninja-yellow transition-colors ml-3 shrink-0"
              >
                <Copy size={16} />
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex items-end gap-10">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Eye size={14} className="text-[#6F767E]" />
                  <span className="text-[11px] font-bold text-[#6F767E] uppercase tracking-widest">Clicks</span>
                </div>
                <span className="text-2xl font-bold text-ninja-yellow">{link.clicks}</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#6F767E] uppercase tracking-widest mb-1">Created</div>
                <span className="text-[14px] font-medium text-[#1A1D1F]">{link.created}</span>
              </div>
            </div>

            {/* Configure Button */}
            <Button
              className="w-full py-3 h-auto bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold rounded-xl border-none text-[13px] tracking-wide"
              onClick={() => toast.success(`Opening automation config for "${link.name}"`)}
            >
              Configure Automation
            </Button>
          </div>
        ))}
      </div>

      {/* Create Link Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#1A1D1F]">Create Activation Link</h3>
                <p className="text-[13px] text-[#6F767E] mt-0.5">Generate a link that activates automations</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-9 w-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-[#1A1D1F] transition-colors mt-0.5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-6 space-y-5">
              {/* Link Name */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">
                  Link Name <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="E.g.: Ebook Download"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                />
              </div>

              {/* Custom URI */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Custom URI</label>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <span className="px-4 py-3 text-[13px] text-[#6F767E] font-medium whitespace-nowrap border-r border-gray-200 bg-gray-100">
                    ninja.app/trigger/
                  </span>
                  <input
                    placeholder="my-link"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="flex-1 px-4 py-3 bg-transparent outline-none text-sm text-[#1A1D1F] font-medium placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Action on Click */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Action on Click</label>
                <Select
                  value={form.action}
                  onChange={(e) => setForm({ ...form, action: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                >
                  <option>Send Email</option>
                  <option>Add Tag</option>
                  <option>Assign to Pipeline</option>
                  <option>Start Automation</option>
                </Select>
              </div>

              {/* Submit */}
              <Button
                onClick={handleCreate}
                className="w-full py-4 h-auto rounded-xl bg-ninja-yellow text-ninja-dark font-bold text-[13px] tracking-wide border-none shadow-sm mt-2"
              >
                Create Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
