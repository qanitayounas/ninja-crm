import React from 'react';
import { 
  MessageSquare, 
  MessageCircle, 
  Plus, 
  Search, 
  X, 
  ChevronDown, 
  Clock,
  Bot,
  Palette,
  Send
} from 'lucide-react';
import { Card, Badge, Button } from '../components/ui';
import toast from 'react-hot-toast';

const widgets = [
  {
    id: 1,
    name: 'Main Chat',
    type: 'Proactive',
    conversations: 456,
    updated: '20/3/2026'
  },
  {
    id: 2,
    name: 'Technical Support',
    type: 'Reactive',
    conversations: 234,
    updated: '19/3/2026'
  },
  {
    id: 3,
    name: 'Sales',
    type: 'Proactive',
    conversations: 189,
    updated: '21/3/2026'
  }
];

export const ChatWidgetPage = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedColor] = React.useState('#D4FF00');

  const filteredWidgets = widgets.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Chat Widget</h1>
        <p className="text-gray-400 font-medium font-bold text-sm">Convert visitors into leads from your site</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <MessageSquare size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Active Widgets</span>
          <span className="text-3xl font-black text-ninja-dark font-black">3</span>
        </Card>
        
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-green-500/5 group-hover:scale-110 transition-transform duration-500">
            <Send size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Conversations</span>
          <span className="text-3xl font-black text-ninja-yellow font-black">879</span>
        </Card>

        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-110 transition-transform duration-500">
            <Bot size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Avg Response Time</span>
          <span className="text-3xl font-black text-purple-500/30 font-black">1.2m</span>
        </Card>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ninja-yellow transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search widgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/5 transition-all outline-none font-bold text-sm shadow-sm font-bold"
          />
        </div>

        <Button 
          onClick={() => setShowCreateModal(true)}
          className="w-full md:w-auto font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-ninja-yellow/20 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus size={20} />
          Create Chat Widget
        </Button>
      </div>

      {/* Widgets Table */}
      <Card className="overflow-hidden border-none shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Conversations</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredWidgets.map((widget) => (
                <tr key={widget.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow group-hover:scale-110 transition-transform">
                        <MessageCircle size={18} />
                      </div>
                      <span className="font-black text-ninja-dark group-hover:text-ninja-yellow transition-colors">{widget.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-bold text-ninja-dark">
                    <Badge status="success" className="bg-ninja-yellow/20 text-ninja-dark border-ninja-yellow/20 font-black">
                      {widget.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center font-black text-ninja-dark">
                    {widget.conversations}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-xs font-bold text-gray-400">
                      <Clock size={14} className="text-gray-300" />
                      {widget.updated}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowCreateModal(false)} />
          <Card className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200 border-none overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-8 text-ninja-yellow opacity-5 pointer-events-none -mr-10 -mt-10">
              <MessageSquare size={160} />
            </div>

            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-ninja-dark transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-black text-ninja-dark tracking-tighter">Create Widget</h2>
              <p className="text-gray-400 font-medium text-sm mt-1">Configure your live chat</p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Widget Name <span className="text-ninja-yellow">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Main Chat"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Type
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer font-bold">
                    <option>Proactive</option>
                    <option>Reactive</option>
                    <option>Automated Bot</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Primary Color
                </label>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-100">
                    <div 
                      className="h-10 flex-1 rounded-xl shadow-lg shadow-ninja-yellow/20" 
                      style={{ backgroundColor: selectedColor }}
                    />
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group cursor-pointer hover:border-ninja-yellow transition-colors">
                      <Palette size={20} />
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full relative" style={{ background: 'linear-gradient(to right, #D4FF00, #00FFD4, #00D4FF, #D400FF, #FFD400)' }}>
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-white border-2 border-ninja-dark rounded-full shadow-md cursor-pointer"
                      style={{ left: '10%' }}
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => {
                  toast.success('Widget Created Successfully!');
                  setShowCreateModal(false);
                }}
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-ninja-yellow/20 mt-4 flex items-center justify-center gap-2"
              >
                Create Widget
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
