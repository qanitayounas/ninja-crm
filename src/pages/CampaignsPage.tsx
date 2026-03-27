import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card, Badge, Button, Modal, Input, Select } from '../components/ui';
import { Plus, Play, Pause, Edit2, Trash2, Mail, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const kpis = [
  { title: "Reach", value: "27,011" },
  { title: "Total Clicks", value: "6,745" },
  { title: "Leads Generated", value: "989" },
  { title: "Conversion Rate", value: "3.7%" },
];

const chartData = [
  { name: 'Week 1', reach: 45, clicks: 12 },
  { name: 'Week 2', reach: 68, clicks: 18 },
  { name: 'Week 3', reach: 52, clicks: 15 },
  { name: 'Week 4', reach: 92, clicks: 25 },
];

const campaigns = [
  { id: 1, name: "Spring Product Launch", type: "Email Marketing", status: "Active", reach: "12,458", clicks: "3,247", leads: 487, conversion: "15.0%", budget: "$3,240 / $5,000" },
  { id: 2, name: "Nurture Email Series", type: "Email Marketing", status: "Active", reach: "8,932", clicks: "2,156", leads: 324, conversion: "15.0%", budget: "$1,890 / $2,500" },
  { id: 3, name: "Retargeting Campaign", type: "Social Media", status: "Paused", reach: "5,621", clicks: "1,342", leads: 178, conversion: "13.3%", budget: "$2,100 / $3,000" },
];

export const CampaignsPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Campaigns</h1>
          <p className="text-gray-400 font-medium">Create and manage your marketing campaigns</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-8 py-3 rounded-2xl shadow-lg shadow-ninja-yellow/20">
          <Plus size={20} />
          <span>Create Campaign</span>
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="p-5 bg-white border-slate-100 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.title}</span>
            <span className="text-2xl font-black text-ninja-dark">{kpi.value}</span>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="p-6 md:p-8 bg-white border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-ninja-dark mb-6">Campaign Performance</h3>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="reach" fill="#D4FF00" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar dataKey="clicks" fill="#BFA9FF" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Table */}
      <Card className="p-0 bg-white border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-50">
          <h3 className="text-lg font-bold text-ninja-dark">All Campaigns</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Campaign</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Reach</th>
                <th className="px-6 py-4">Clicks</th>
                <th className="px-6 py-4">Leads</th>
                <th className="px-6 py-4">Conversion</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <h4 className="font-bold text-ninja-dark text-sm">{camp.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1 text-gray-400 text-xs font-medium">
                        {camp.type === 'Email Marketing' ? <Mail size={12} /> : <Share2 size={12} />}
                        {camp.type}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={camp.status === 'Active' ? 'Qualified' : 'Pending'} className={camp.status === 'Active' ? 'bg-ninja-yellow text-ninja-dark border-none' : 'bg-gray-100 text-gray-500 border-none'}>
                      {camp.status === 'Active' ? 'Active' : 'Paused'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{camp.reach}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{camp.clicks}</td>
                  <td className="px-6 py-4 text-sm text-ninja-yellow font-black">{camp.leads}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{camp.conversion}</td>
                  <td className="px-6 py-4 text-xs font-bold text-ninja-purple">
                    {camp.budget}
                    {/* Tiny progress bar */}
                    <div className="w-full bg-ninja-purple/10 h-1.5 mt-1.5 rounded-full overflow-hidden flex">
                      <div className="h-full bg-ninja-purple" style={{ width: `${(parseInt(camp.budget.split(' / ')[0].replace(/\D/g, '')) / parseInt(camp.budget.split(' / ')[1].replace(/\D/g, ''))) * 100}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-400">
                      <button className="p-1.5 hover:text-ninja-yellow transition-colors">{camp.status === 'Active' ? <Pause size={16} /> : <Play size={16} />}</button>
                      <button className="p-1.5 hover:text-blue-500 transition-colors"><Edit2 size={16} /></button>
                      <button className="p-1.5 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Campaign">
        <p className="text-gray-400 text-sm font-medium mb-6 -mt-2">Complete the details to create a new marketing campaign</p>
        
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark">Campaign Name *</label>
            <Input placeholder="e.g. Product Launch Q1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Campaign Type</label>
              <Select defaultValue="Email Marketing">
                <option value="Email Marketing">Email Marketing</option>
                <option value="Social Media">Social Media</option>
                <option value="SMS">SMS Campaign</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Budget *</label>
              <Input placeholder="$5,000" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark">Start Date</label>
            <div className="relative">
              <Input type="date" className="w-full bg-gray-50/50 pr-10" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark">Description</label>
            <textarea 
              placeholder="Describe the objectives and details of this campaign..." 
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium text-ninja-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ninja-yellow min-h-[100px] resize-none"
            />
          </div>

          <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success('Campaign created successfully!');
              setIsAddModalOpen(false);
            }}>Create Campaign</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
