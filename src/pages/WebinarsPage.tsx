import React from 'react';
import { 
  Video, 
  Users, 
  Calendar, 
  Plus, 
  Search, 
  X, 
  ChevronDown, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Card, Badge, Button, cn } from '../components/ui';
import toast from 'react-hot-toast';

const webinars = [
  {
    id: 1,
    title: 'Marketing Automation 101',
    registrations: 245,
    date: '25/3/2026',
    status: 'Published',
    type: 'Automated'
  },
  {
    id: 2,
    title: 'CRM for Startups',
    registrations: 189,
    date: '28/3/2025',
    status: 'Published',
    type: 'Live'
  },
  {
    id: 3,
    title: 'Sales Strategies 2026',
    registrations: 67,
    date: '5/4/2026',
    status: 'Draft',
    type: 'Recorded'
  }
];

export const WebinarsPage = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredWebinars = webinars.filter(w => 
    w.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Webinars</h1>
        <p className="text-gray-400 font-medium">Webinar funnels for registration and conversion</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <Video size={100} />
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total Webinars</span>
          <span className="text-3xl font-black text-ninja-dark">3</span>
        </Card>
        
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-green-500/5 group-hover:scale-110 transition-transform duration-500">
            <CheckCircle2 size={100} />
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Published</span>
          <span className="text-3xl font-black text-ninja-yellow">2</span>
        </Card>

        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-110 transition-transform duration-500">
            <Users size={100} />
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total Registrations</span>
          <span className="text-3xl font-black text-ninja-dark opacity-10">501</span>
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
            placeholder="Search webinars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/5 transition-all outline-none font-bold text-sm shadow-sm"
          />
        </div>

        <Button 
          onClick={() => setShowCreateModal(true)}
          className="w-full md:w-auto font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-ninja-yellow/20 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus size={20} />
          Create New Webinar
        </Button>
      </div>

      {/* Webinars List */}
      <div className="space-y-4">
        {filteredWebinars.map((webinar) => (
          <Card 
            key={webinar.id} 
            className="p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border-gray-100 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-5 flex-1 w-full">
              <div className={cn(
                "p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300",
                webinar.status === 'Published' ? "bg-ninja-yellow/10 text-ninja-yellow" : "bg-gray-50 text-gray-400"
              )}>
                <Video size={24} />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-black text-ninja-dark mb-1 truncate">{webinar.title}</h3>
                <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-gray-300" />
                    {webinar.registrations} registrations
                  </span>
                  <span className="flex items-center gap-1.5 border-l pl-4 border-gray-100">
                    <Calendar size={14} className="text-gray-300" />
                    {webinar.date}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Badge 
                status={webinar.status}
                className={cn(
                  "font-black text-[10px] uppercase px-4 py-1.5 rounded-full",
                  webinar.status === 'Published' ? "bg-ninja-yellow/20 text-ninja-dark border-none" : "bg-gray-100 text-gray-400 border-none"
                )}
              >
                {webinar.status === 'Published' ? 'Published' : 'Draft'}
              </Badge>
            </div>
          </Card>
        ))}

        {filteredWebinars.length === 0 && (
          <div className="py-20 text-center">
            <div className="bg-gray-50 h-20 w-20 rounded-3xl flex items-center justify-center mx-auto mb-4 text-gray-300">
              <Search size={40} />
            </div>
            <h3 className="text-lg font-bold text-ninja-dark">No webinars found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search query</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowCreateModal(false)} />
          <Card className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200 border-none overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-8 text-ninja-yellow opacity-5 pointer-events-none -mr-10 -mt-10">
              <Video size={160} />
            </div>

            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-ninja-dark transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-black text-ninja-dark tracking-tighter">Create New Webinar</h2>
              <p className="text-gray-400 font-medium text-sm mt-1">Configure your webinar funnel</p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Webinar Name <span className="text-ninja-yellow">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Marketing Masterclass"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Date and Time
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ninja-yellow transition-colors">
                    <Clock size={16} />
                  </div>
                  <input 
                    type="datetime-local" 
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Type
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer">
                    <option>Live</option>
                    <option>Automated</option>
                    <option>Recorded</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <Button 
                onClick={() => {
                  toast.success('Webinar Created Successfully!');
                  setShowCreateModal(false);
                }}
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-ninja-yellow/20 mt-4 flex items-center justify-center gap-2"
              >
                Create Webinar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
