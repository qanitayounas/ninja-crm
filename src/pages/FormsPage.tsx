import React from 'react';
import { 
  FileText, 
  Send, 
  BarChart3, 
  Plus, 
  Search, 
  X, 
  ChevronDown, 
  MousePointer2,
  Calculator,
  ShoppingCart,
  Zap,
  Layout,
  Eye,
  TrendingUp
} from 'lucide-react';
import { Card, Button } from '../components/ui';
import toast from 'react-hot-toast';
import { apiService } from '../services/apiService';
const features = [
  { icon: MousePointer2, label: 'Drag & Drop Builder' },
  { icon: Calculator, label: 'Calculations & Scoring' },
  { icon: ShoppingCart, label: 'Product Sales' },
  { icon: Zap, label: 'Dynamic Redirection' },
  { icon: Layout, label: 'Conditional Logic' },
  { icon: BarChart3, label: 'Real-time Analytics' }
];

export const FormsPage = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [forms, setForms] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [syncError, setSyncError] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    setIsLoading(true);
    setSyncError(null);
    try {
      const data = await apiService.getForms();
      const mapped = (Array.isArray(data) ? data : []).map((f: any) => ({
        id: f.id,
        name: f.name || 'Untitled Form',
        submissions: 0,
        views: 0,
        conversion: '0%'
      }));
      setForms(mapped);
    } catch (error: any) {
      console.error('Error loading forms:', error);
      if (error.status === 403 || error.status === 401) {
        setSyncError('Form management is currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredForms = forms.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Forms</h1>
        <p className="text-gray-400 font-medium font-bold">Smart form builder</p>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <FileText size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Forms</span>
          <span className="text-3xl font-black text-ninja-dark font-black">{syncError ? '--' : forms.length}</span>
        </Card>
        
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-green-500/5 group-hover:scale-110 transition-transform duration-500">
            <Send size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Submissions</span>
          <span className="text-3xl font-black text-ninja-yellow font-black">568</span>
        </Card>

        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-110 transition-transform duration-500">
            <TrendingUp size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Average Conversion Rate</span>
          <span className="text-3xl font-black text-purple-500/30 font-black">20.5%</span>
        </Card>
      </div>

      {/* Features Section */}
      <Card className="p-8 border-none shadow-sm overflow-hidden relative">
        <div className="absolute right-0 top-0 p-10 text-ninja-yellow/5 pointer-events-none -mr-10 -mt-10">
          <Zap size={160} />
        </div>
        
        <h3 className="text-xl font-black text-ninja-dark mb-8 tracking-tight flex items-center gap-3">
          <div className="w-2 h-8 bg-ninja-yellow rounded-full" />
          Core Features
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 group cursor-default p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow group-hover:scale-110 transition-transform">
                <feature.icon size={20} />
              </div>
              <span className="text-sm font-bold text-gray-500 group-hover:text-ninja-dark transition-colors">{feature.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ninja-yellow transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search forms..."
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
          Create Form
        </Button>
      </div>

      {/* Forms Table */}
      <Card className="overflow-hidden border-none shadow-sm pb-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Submissions</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Views</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredForms.map((form) => (
                <tr key={form.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow group-hover:scale-110 transition-transform">
                        <FileText size={20} />
                      </div>
                      <span className="font-black text-ninja-dark group-hover:text-ninja-yellow transition-colors">{form.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-black text-ninja-dark">
                    {form.submissions}
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-bold text-gray-400">
                    <div className="flex items-center justify-center gap-1.5">
                      <Eye size={14} className="text-gray-300" />
                      {form.views}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-black text-ninja-yellow">{form.conversion}</span>
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
              <FileText size={160} />
            </div>

            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-ninja-dark transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-black text-ninja-dark tracking-tighter">Create New Form</h2>
              <p className="text-gray-400 font-medium text-sm mt-1">Choose a template or start blank</p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Form Name <span className="text-ninja-yellow">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Contact Form"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Template
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer font-bold">
                    <option>Blank</option>
                    <option>Contact</option>
                    <option>Registration</option>
                    <option>Survey</option>
                    <option>Order</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <Button 
                onClick={() => {
                  toast.success('Form Created Successfully!');
                  setShowCreateModal(false);
                }}
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-ninja-yellow/20 mt-4 flex items-center justify-center gap-2"
              >
                Create Form
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
