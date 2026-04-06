import React from 'react';
import { Plus, Clock, X, Code } from 'lucide-react';
import { Button, Input, Select, cn } from '../../components/ui';
import toast from 'react-hot-toast';
// No GHL API exists for countdown timers - this is a local/static config feature

const timers = [
  { id: 1, name: 'Black Friday Countdown', type: 'Specific Date', status: 'Active', remaining: '3d 12h 45m', ends: 'Nov 27, 2026' },
  { id: 2, name: 'Flash Sale 24h', type: 'Fixed Duration', status: 'Active', remaining: '18h 32m', ends: 'Mar 22, 2026' },
  { id: 3, name: 'Webinar Registration', type: 'Specific Date', status: 'Active', remaining: '5d 8h', ends: 'Mar 26, 2026' },
  { id: 4, name: 'Early Bird Discount', type: 'Fixed Duration', status: 'Finished', remaining: null, ends: 'Mar 15, 2026' },
];

export const MarketingTimers = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    type: 'Specific Date',
    duration: '',
    endDate: '',
    usePages: true,
    useEmails: false,
    useFunnels: false,
  });

  const handleCreate = () => {
    if (!form.name) {
      toast.error('Timer name is required');
      return;
    }
    toast.success('Timer created successfully!');
    setIsModalOpen(false);
    setForm({ name: '', type: 'Specific Date', duration: '', endDate: '', usePages: true, useEmails: false, useFunnels: false });
  };

  return (
    <div className="flex flex-col gap-6 pb-10 animate-in fade-in duration-500 text-left">

      {/* Header */}
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D1F] tracking-tight">Timers</h1>
          <p className="text-[#6F767E] text-sm mt-1">Countdown for urgent campaigns</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-6 py-3 h-auto rounded-xl flex items-center gap-2 border-none shadow-sm transition-all text-sm"
        >
          <Plus size={16} strokeWidth={3} />
          Create Timer
        </Button>
      </div>

      {/* Timer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {timers.map((timer) => {
          const isActive = timer.status === 'Active';
          return (
            <div
              key={timer.id}
              className="bg-white border-2 border-ninja-yellow/60 rounded-2xl p-6 flex flex-col gap-5 hover:border-ninja-yellow transition-colors"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <h3 className="text-[16px] font-bold text-[#1A1D1F]">{timer.name}</h3>
                  <span className="inline-block text-[11px] font-medium text-[#6F767E] bg-gray-100 px-3 py-1 rounded-full">
                    {timer.type}
                  </span>
                </div>
                <span className={cn(
                  'text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap mt-0.5',
                  isActive ? 'bg-ninja-yellow/20 text-ninja-yellow' : 'bg-gray-100 text-gray-400'
                )}>
                  {timer.status}
                </span>
              </div>

              {/* Clock Display */}
              <div className="flex flex-col items-center justify-center py-4 gap-3">
                <Clock
                  size={52}
                  strokeWidth={1.5}
                  className={isActive ? 'text-ninja-yellow' : 'text-gray-300'}
                />
                {isActive ? (
                  <span className="text-3xl font-bold text-ninja-yellow tracking-tight">
                    {timer.remaining}
                  </span>
                ) : (
                  <span className="text-2xl font-bold text-gray-300 tracking-tight">
                    Finished
                  </span>
                )}
              </div>

              {/* Ends Row */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-[12px] font-bold text-ninja-yellow">Ends:</span>
                <span className="text-[13px] font-medium text-[#6F767E]">{timer.ends}</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => toast.success(`Editing "${timer.name}"`)}
                  className="py-2.5 rounded-xl border border-gray-200 bg-white text-[#1A1D1F] font-bold text-[13px] hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`<script src="ninja.ly/timer/${timer.id}"></script>`);
                    toast.success('Embed code copied!');
                  }}
                  className="py-2.5 rounded-xl bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold text-[13px] transition-colors flex items-center justify-center gap-2"
                >
                  <Code size={14} />
                  Embed Code
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Timer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#1A1D1F]">Create New Timer</h3>
                <p className="text-[13px] text-[#6F767E] mt-0.5">Configure a countdown</p>
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
              {/* Timer Name */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">
                  Timer Name <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="E.g.: Black Friday Countdown"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                />
              </div>

              {/* Type */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Type</label>
                <Select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                >
                  <option>Specific Date</option>
                  <option>Fixed Duration</option>
                  <option>Recurring</option>
                </Select>
              </div>

              {/* Duration + End Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#1A1D1F]">Duration</label>
                  <Input
                    placeholder="E.g.: 7 days"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#1A1D1F]">End Date</label>
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Use Checkboxes */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#1A1D1F]">Use on</label>
                <div className="flex items-center gap-6">
                  {[
                    { key: 'usePages', label: 'Pages' },
                    { key: 'useEmails', label: 'Emails' },
                    { key: 'useFunnels', label: 'Funnels' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form[key as keyof typeof form] as boolean}
                        onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 accent-ninja-yellow cursor-pointer"
                      />
                      <span className="text-[13px] font-medium text-[#6F767E]">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button
                onClick={handleCreate}
                className="w-full py-4 h-auto rounded-xl bg-ninja-yellow text-ninja-dark font-bold text-[13px] tracking-wide border-none shadow-sm mt-2"
              >
                Create Timer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
