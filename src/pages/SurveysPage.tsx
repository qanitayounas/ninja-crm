import React from 'react';
import { 
  ClipboardList, 
  MessageSquare, 
  Plus, 
  Search, 
  X, 
  ChevronDown, 
  Users,
  TrendingUp,
  Clipboard
} from 'lucide-react';
import { Card, Button } from '../components/ui';
import toast from 'react-hot-toast';

const surveys = [
  {
    id: 1,
    name: 'Customer Satisfaction',
    responses: 456,
    completionRate: '78%',
    status: 'Active'
  },
  {
    id: 2,
    name: 'NPS Score',
    responses: 234,
    completionRate: '92%',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Product Feedback',
    responses: 189,
    completionRate: '65%',
    status: 'Active'
  }
];

export const SurveysPage = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredSurveys = surveys.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Surveys</h1>
        <p className="text-gray-400 font-medium font-bold text-sm">Collect feedback and measure satisfaction</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <ClipboardList size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Surveys</span>
          <span className="text-3xl font-black text-ninja-dark font-black">3</span>
        </Card>
        
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-green-500/5 group-hover:scale-110 transition-transform duration-500">
            <MessageSquare size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Responses</span>
          <span className="text-3xl font-black text-ninja-yellow font-black">879</span>
        </Card>

        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-110 transition-transform duration-500">
            <TrendingUp size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Average Completion Rate</span>
          <span className="text-3xl font-black text-purple-500/30 font-black">78%</span>
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
            placeholder="Search surveys..."
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
          Create Survey
        </Button>
      </div>

      {/* Survey List */}
      <div className="space-y-4">
        {filteredSurveys.map((survey) => (
          <Card key={survey.id} className="p-6 md:p-8 border-none shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="h-12 w-12 rounded-xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow group-hover:scale-110 transition-transform">
                  <Clipboard size={22} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-ninja-dark tracking-tight group-hover:text-ninja-yellow transition-colors leading-none">{survey.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Users size={14} className="text-gray-300" />
                    {survey.responses} responses
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Completion Rate</span>
                <span className="text-2xl font-black text-ninja-yellow">{survey.completionRate}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowCreateModal(false)} />
          <Card className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200 border-none overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-8 text-ninja-yellow opacity-5 pointer-events-none -mr-10 -mt-10">
              <ClipboardList size={160} />
            </div>

            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-ninja-dark transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-black text-ninja-dark tracking-tighter">Create New Survey</h2>
              <p className="text-gray-400 font-medium text-sm mt-1">Configure your survey</p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Survey Name <span className="text-ninja-yellow">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Customer Satisfaction"
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
                    <option>NPS</option>
                    <option>CSAT</option>
                    <option>Product Feedback</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <Button 
                onClick={() => {
                  toast.success('Survey Created Successfully!');
                  setShowCreateModal(false);
                }}
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-ninja-yellow/20 mt-4 flex items-center justify-center gap-2"
              >
                Create Survey
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
