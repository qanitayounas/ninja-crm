import React from 'react';
import { Plus, Copy, Search, Folder, X } from 'lucide-react';
import { Button, Input, Select, cn } from '../../components/ui';
import toast from 'react-hot-toast';
// No GHL API exists for snippets - this is a local/static config feature

const snippets = [
  {
    id: 1,
    name: 'Initial Greeting',
    folder: 'General',
    type: 'Text',
    preview: 'Hello! Thanks for contacting us. How can we help you today?',
  },
  {
    id: 2,
    name: 'Commercial Proposal',
    folder: 'Sales',
    type: 'Email',
    preview: "I'm attaching our personalized commercial proposal according to your needs...",
  },
  {
    id: 3,
    name: 'Meeting Closure',
    folder: 'General',
    type: 'Text',
    preview: 'It was a pleasure talking with you. I will send you a summary of what we agreed upon...',
  },
  {
    id: 4,
    name: 'FAQ - Pricing',
    folder: 'Support',
    type: 'Text',
    preview: 'Our plans start from $29/mo. You can see all the details in...',
  },
  {
    id: 5,
    name: 'Post-Demo Follow-up',
    folder: 'Sales',
    type: 'Email',
    preview: 'I hope you enjoyed the demo. Do you have any additional questions?',
  },
];

const typeColors: Record<string, string> = {
  Text: 'bg-blue-50 text-blue-500',
  Email: 'bg-green-50 text-green-500',
  SMS: 'bg-orange-50 text-orange-500',
};

export const MarketingSnippets = () => {
  const [search, setSearch] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', content: '', folder: 'General', type: 'Text' });

  const filtered = snippets.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.preview.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!form.name || !form.content) {
      toast.error('Name and content are required');
      return;
    }
    toast.success('Snippet created!');
    setIsModalOpen(false);
    setForm({ name: '', content: '', folder: 'General', type: 'Text' });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Snippet copied!');
  };

  return (
    <div className="flex flex-col gap-6 pb-10 animate-in fade-in duration-500 text-left">

      {/* Header */}
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D1F] tracking-tight">Snippets</h1>
          <p className="text-[#6F767E] text-sm mt-1">Quick response library</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-6 py-3 h-auto rounded-xl flex items-center gap-2 border-none shadow-sm transition-all text-sm"
        >
          <Plus size={16} strokeWidth={3} />
          Create Snippet
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          placeholder="Search snippets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#1A1D1F] placeholder:text-gray-400 outline-none focus:border-ninja-yellow focus:ring-1 focus:ring-ninja-yellow/20 transition-all"
        />
      </div>

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 hover:border-gray-300 hover:shadow-sm transition-all group"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[15px] font-bold text-[#1A1D1F]">{snippet.name}</h3>
              <button
                onClick={() => handleCopy(snippet.preview)}
                className="text-gray-300 hover:text-ninja-yellow transition-colors shrink-0 mt-0.5"
              >
                <Copy size={16} />
              </button>
            </div>

            {/* Tags Row */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#6F767E] border border-gray-200 bg-white px-2.5 py-1 rounded-lg">
                <Folder size={12} />
                {snippet.folder}
              </span>
              <span className={cn('text-[11px] font-bold px-2.5 py-1 rounded-lg', typeColors[snippet.type])}>
                {snippet.type}
              </span>
            </div>

            {/* Preview Text */}
            <p className="text-[14px] text-blue-500 leading-relaxed line-clamp-2">
              {snippet.preview}
            </p>
          </div>
        ))}
      </div>

      {/* Create Snippet Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex items-start justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#1A1D1F]">Create New Snippet</h3>
                <p className="text-[13px] text-[#6F767E] mt-0.5">Create a reusable text</p>
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
              {/* Snippet Name */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">
                  Snippet Name <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="E.g.: Initial Greeting"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                />
              </div>

              {/* Content */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1A1D1F]">
                  Content <span className="text-red-400">*</span>
                </label>
                <textarea
                  placeholder="Write your reusable message..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#1A1D1F] placeholder:text-gray-400 outline-none focus:border-ninja-yellow focus:ring-1 focus:ring-ninja-yellow/20 transition-all resize-none"
                />
              </div>

              {/* Folder + Type side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#1A1D1F]">Folder</label>
                  <Select
                    value={form.folder}
                    onChange={(e) => setForm({ ...form, folder: e.target.value })}
                    className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                  >
                    <option>General</option>
                    <option>Sales</option>
                    <option>Support</option>
                    <option>Marketing</option>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#1A1D1F]">Type</label>
                  <Select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="py-3 rounded-xl border-gray-200 bg-gray-50 text-sm font-medium"
                  >
                    <option>Text</option>
                    <option>Email</option>
                    <option>SMS</option>
                  </Select>
                </div>
              </div>

              {/* Submit */}
              <Button
                onClick={handleCreate}
                className="w-full py-4 h-auto rounded-xl bg-ninja-yellow text-ninja-dark font-bold text-[13px] tracking-wide border-none shadow-sm mt-2"
              >
                Create Snippet
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
