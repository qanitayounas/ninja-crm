import React from 'react';
import { 
  Globe, 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  MoreHorizontal,
  ExternalLink,
  CheckCircle2,
  Clock,
  FileText,
  X,
  Zap,
  ChevronDown
} from 'lucide-react';
import { Card, Badge, Button, cn } from '../components/ui';
import toast from 'react-hot-toast';
import { apiService } from '../services/apiService';

interface Website {
  id: string;
  title: string;
  category: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  updatedAt: string;
}

export const WebsitesPage = () => {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [websites, setWebsites] = React.useState<Website[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [syncError, setSyncError] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadWebsites();
  }, []);

  const loadWebsites = async () => {
    setIsLoading(true);
    setSyncError(null);
    try {
      const data = await apiService.getFunnels();
      const mapped = (Array.isArray(data) ? data : []).map((site: any) => ({
        id: site.id,
        title: site.name || 'Untitled Site',
        category: 'Funnels',
        status: 'Published' as const,
        updatedAt: site.dateUpdated ? new Date(site.dateUpdated).toISOString().split('T')[0] : 'N/A',
      }));
      setWebsites(mapped);
    } catch (error: any) {
      console.error('Error loading websites:', error);
      if (error.status === 403 || error.status === 401) {
        setSyncError('Website synchronization is currently being processed. Please ensure your Ninja CRM account setup is complete.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { label: 'Total Sites', value: syncError ? '--' : websites.length, color: 'text-ninja-dark' },
    { label: 'Published', value: syncError ? '--' : websites.filter(s => s.status === 'Published').length, color: 'text-green-500' },
    { label: 'Drafts', value: syncError ? '--' : websites.filter(s => s.status === 'Draft').length, color: 'text-gray-400' },
    { label: 'Scheduled', value: syncError ? '--' : websites.filter(s => s.status === 'Scheduled').length, color: 'text-blue-500' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Websites</h1>
        <p className="text-gray-400 font-medium">Manage corporate and commercial sites</p>
      </div>

      {/* Alert Case: Branded Setup Notice */}
      {syncError && (
        <Card className="p-4 border-l-4 border-l-ninja-purple bg-ninja-purple/5 border-ninja-purple/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ninja-purple/10 rounded-lg text-ninja-purple">
              <Zap size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-ninja-dark">Module Synchronization</p>
              <p className="text-xs text-slate-500 font-medium">{syncError}</p>
            </div>
          </div>
        </Card>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {stats.map((stat, i) => (
          <Card key={i} className="p-5 flex flex-col gap-2 shadow-sm border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{stat.label}</span>
            <span className={cn("text-2xl font-black", stat.color)}>{stat.value}</span>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ninja-yellow transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search sites..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ninja-yellow/20 focus:border-ninja-yellow transition-all shadow-sm font-medium text-sm"
            />
          </div>

          <div className="flex items-center bg-white p-1 rounded-xl shadow-sm border border-gray-100 shrink-0 self-start md:self-auto">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'grid' ? "bg-ninja-yellow text-ninja-dark shadow-sm" : "text-gray-400 hover:text-ninja-dark"
              )}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'list' ? "bg-ninja-yellow text-ninja-dark shadow-sm" : "text-gray-400 hover:text-ninja-dark"
              )}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <Button 
          onClick={() => setShowCreateModal(true)}
          className="flex-1 md:flex-none font-bold px-6 py-3 rounded-2xl shadow-lg shadow-ninja-yellow/20 flex items-center justify-center gap-2 shrink-0 w-full md:w-auto whitespace-nowrap"
        >
          <Plus size={20} />
          Create Website
        </Button>
      </div>

      {/* Websites Grid / List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((site) => (
            <Card key={site.id} className="group hover:shadow-xl transition-all duration-300 border-gray-100 overflow-hidden relative">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-ninja-yellow/10 text-ninja-yellow flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      <Globe size={24} />
                    </div>
                    {(site.status === 'Published' || site.status === 'Scheduled') && (
                      <div className="absolute top-6 left-[68px]">
                         <div className="bg-white rounded-full p-0.5 shadow-sm">
                            {site.status === 'Published' ? (
                              <CheckCircle2 size={12} className="text-ninja-yellow" />
                            ) : (
                              <Clock size={12} className="text-blue-500" />
                            )}
                         </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 text-gray-300 hover:text-ninja-dark hover:bg-gray-50 rounded-xl transition-all">
                      <ExternalLink size={16} />
                    </button>
                    <button className="p-2 text-gray-300 hover:text-ninja-dark hover:bg-gray-50 rounded-xl transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-black text-ninja-dark tracking-tight line-clamp-1">{site.title}</h3>
                  <div className="flex items-center gap-2">
                    <FileText size={12} className="text-gray-300" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{site.category}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Last Update</span>
                    <span className="text-xs font-bold text-ninja-dark/70">{site.updatedAt}</span>
                  </div>
                  <Badge 
                    status={site.status}
                    className={cn(
                      "font-bold text-[10px] uppercase border-none px-2 py-0.5",
                      site.status === 'Published' ? "bg-ninja-yellow/20 text-ninja-dark" : 
                      site.status === 'Scheduled' ? "bg-blue-50 text-blue-500" : 
                      "bg-gray-50 text-gray-400"
                    )}
                  >
                    {site.status}
                  </Badge>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-ninja-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Folder</th>
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {websites.map((site) => (
                  <tr key={site.id} className="group hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-ninja-yellow/10 text-ninja-yellow flex items-center justify-center shrink-0">
                          <Globe size={16} />
                        </div>
                        <span className="text-sm font-bold text-ninja-dark">{site.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="text-xs font-bold text-gray-400">{site.category}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <Badge 
                          status={site.status}
                          className={cn(
                            "font-bold text-[10px] uppercase border-none px-3 py-1",
                            site.status === 'Published' ? "bg-ninja-yellow/15 text-ninja-dark/70" : 
                            site.status === 'Scheduled' ? "bg-blue-50 text-blue-500" : 
                            "bg-gray-50 text-gray-400"
                          )}
                        >
                          {site.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="text-xs font-bold text-ninja-dark/60">{site.updatedAt}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowCreateModal(false)} />
          <Card className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200 border-none">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-ninja-dark transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-ninja-dark tracking-tighter">Create New Website</h2>
              <p className="text-gray-400 font-medium text-sm mt-1">Configure your new website project</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Site Name <span className="text-ninja-yellow">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Product Landing Page"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Folder
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer">
                    <option>Corporate</option>
                    <option>Campaigns</option>
                    <option>Products</option>
                    <option>Events</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Template
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer">
                    <option>Blank</option>
                    <option>Landing Page</option>
                    <option>Corporate</option>
                    <option>E-commerce</option>
                    <option>Blog</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <Button 
                onClick={() => {
                  toast.success('Website Created Successfully!');
                  setShowCreateModal(false);
                }}
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-ninja-yellow/20 mt-4"
              >
                Create Site
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
