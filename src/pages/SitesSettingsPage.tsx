import React from 'react';
import { 
  Folder, 
  Search, 
  Plus, 
  Bell, 
  RefreshCw, 
  Archive, 
  LayoutGrid, 
  List, 
  Clock,
  History,
  CheckCircle2,
  Globe,
  Settings2,
  Filter
} from 'lucide-react';
import { Card, Button } from '../components/ui';
import toast from 'react-hot-toast';

const folders = [
  { id: 1, name: 'Corporate', count: 12, color: 'text-ninja-yellow' },
  { id: 2, name: 'Campaigns', count: 8, color: 'text-blue-500' },
  { id: 3, name: 'Products', count: 15, color: 'text-green-500' },
  { id: 4, name: 'Events', count: 6, color: 'text-purple-500' }
];

const resentUpdates = [
  { id: 1, name: 'Ninja Main Site', type: 'Website', time: '2026-03-20 14:32', icon: Globe },
  { id: 2, name: 'Contact Form', type: 'Form', time: '2026-03-20 12:15', icon: CheckCircle2 },
  { id: 3, name: 'Corporate Blog', type: 'Blog', time: '2026-03-19 18:45', icon: History },
  { id: 4, name: 'Sales WhatsApp QR', type: 'QR Code', time: '2026-03-19 10:20', icon: Clock }
];

export const SitesSettingsPage = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [defaultView, setDefaultView] = React.useState('Grid');
  const [preferences, setPreferences] = React.useState({
    showArchived: true,
    notifications: true,
    autoSync: true
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Preference Updated');
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Settings</h1>
        <p className="text-gray-400 font-medium font-bold text-sm">Operational management of the web ecosystem</p>
      </div>

      {/* Folder Management Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Folder className="text-ninja-yellow" size={18} />
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Folder Management</h3>
          </div>
          <Button variant="ghost" className="bg-ninja-yellow text-ninja-dark font-black px-4 py-2 h-auto text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-ninja-yellow/20 flex items-center gap-2">
            <Plus size={14} />
            New Folder
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <Card key={folder.id} className="p-5 flex flex-col gap-4 border-gray-50 hover:border-ninja-yellow/30 hover:bg-ninja-yellow/5 transition-all cursor-pointer group shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center ${folder.color} group-hover:scale-110 transition-transform`}>
                  <Folder size={18} />
                </div>
                <div>
                  <h4 className="font-black text-ninja-dark text-sm">{folder.name}</h4>
                  <span className="text-[10px] font-bold text-gray-400">{folder.count} items</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Global Search Section */}
      <Card className="p-6 md:p-8 space-y-6 border-none shadow-sm overflow-hidden relative">
         <div className="absolute top-0 right-0 p-8 text-ninja-yellow opacity-5 pointer-events-none -mr-10 -mt-10">
           <Search size={160} />
         </div>
         
         <div className="flex items-center gap-2">
            <Filter className="text-purple-500" size={18} />
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Global Search</h3>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ninja-yellow transition-colors">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search all digital assets..."
                className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/5 transition-all outline-none font-bold text-sm shadow-inner"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {['All', 'Websites', 'Stores', 'Forms', 'Blogs', 'QR'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeFilter === filter 
                      ? 'bg-ninja-dark text-white shadow-xl' 
                      : 'bg-white text-gray-400 border border-gray-100 hover:border-ninja-yellow/50 hover:text-ninja-dark'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
      </Card>

      {/* Preferences Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-8 space-y-6 border-none shadow-sm">
          <div className="flex items-center gap-2">
            <LayoutGrid className="text-green-500" size={18} />
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Default View</h3>
          </div>

          <div className="space-y-3">
            {[
              { id: 'Grid', icon: LayoutGrid, label: 'Grid View' },
              { id: 'List', icon: List, label: 'List View' },
              { id: 'Recent', icon: Clock, label: 'Recent View' }
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setDefaultView(view.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  defaultView === view.id 
                    ? 'border-ninja-yellow bg-ninja-yellow/5' 
                    : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <view.icon size={18} className={defaultView === view.id ? 'text-ninja-yellow' : 'text-gray-400'} />
                  <span className={`font-black text-sm ${defaultView === view.id ? 'text-ninja-dark' : 'text-gray-500'}`}>{view.label}</span>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  defaultView === view.id ? 'border-ninja-yellow' : 'border-gray-200'
                }`}>
                  {defaultView === view.id && <div className="h-2.5 w-2.5 rounded-full bg-ninja-yellow" />}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-8 space-y-6 border-none shadow-sm">
          <div className="flex items-center gap-2">
            <Settings2 className="text-purple-500" size={18} />
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">General Preferences</h3>
          </div>

          <div className="space-y-4">
            {[
              { id: 'showArchived', icon: Archive, label: 'Show archived items' },
              { id: 'notifications', icon: Bell, label: 'Update notifications' },
              { id: 'autoSync', icon: RefreshCw, label: 'Auto synchronization' }
            ].map((pref) => (
              <div key={pref.id} className="flex items-center justify-between p-1">
                <div className="flex items-center gap-3">
                  <pref.icon size={18} className="text-gray-400" />
                  <span className="font-bold text-sm text-gray-500">{pref.label}</span>
                </div>
                <button
                  onClick={() => togglePreference(pref.id as keyof typeof preferences)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    preferences[pref.id as keyof typeof preferences] ? 'bg-ninja-yellow' : 'bg-gray-200'
                  }`}
                >
                  <div className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                    preferences[pref.id as keyof typeof preferences] ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Updates Section */}
      <Card className="overflow-hidden border-none shadow-sm">
        <div className="p-6 border-b border-gray-50 flex items-center gap-2">
          <History className="text-ninja-yellow" size={18} />
          <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Recent Updates</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {resentUpdates.map((update) => (
            <div key={update.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-ninja-yellow/10 group-hover:text-ninja-yellow transition-all">
                  <update.icon size={18} />
                </div>
                <div>
                  <h4 className="font-black text-ninja-dark text-sm">{update.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{update.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-gray-300 tracking-tighter">{update.time}</span>
                <div className="h-2 w-2 rounded-full bg-ninja-yellow" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
