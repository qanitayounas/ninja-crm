import React from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  Plus, 
  Search, 
  X, 
  ChevronDown, 
  Clock,
  User,
  Zap,
  Trophy
} from 'lucide-react';
import { Card, Button } from '../components/ui';
import toast from 'react-hot-toast';

const quizzes = [
  {
    id: 1,
    name: 'Which Plan is for You?',
    completed: 345,
    lastUpdate: '20/3/2026',
    updatedBy: 'María López'
  },
  {
    id: 2,
    name: 'CRM Knowledge Test',
    completed: 234,
    lastUpdate: '19/3/2026',
    updatedBy: 'Carlos Ruiz'
  },
  {
    id: 3,
    name: 'Marketing Assessment',
    completed: 189,
    lastUpdate: '18/3/2026',
    updatedBy: 'Ana Martínez'
  }
];

export const QuizzesPage = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredQuizzes = quizzes.filter(q => 
    q.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Quizzes</h1>
        <p className="text-gray-400 font-medium font-bold text-sm">Interactive quizzes for engagement and scoring</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <HelpCircle size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Quizzes</span>
          <span className="text-3xl font-black text-ninja-dark font-black">3</span>
        </Card>
        
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-green-500/5 group-hover:scale-110 transition-transform duration-500">
            <CheckCircle2 size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Completions</span>
          <span className="text-3xl font-black text-ninja-yellow font-black">768</span>
        </Card>

        {/* Third KPI card for consistency with other pages */}
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-110 transition-transform duration-500">
            <Trophy size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Avg Completion Score</span>
          <span className="text-3xl font-black text-purple-500/30 font-black">84%</span>
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
            placeholder="Search quizzes..."
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
          Add Quiz
        </Button>
      </div>

      {/* Quizzes Table */}
      <Card className="overflow-hidden border-none shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Completed</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Last Update</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Updated By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredQuizzes.map((quiz) => (
                <tr key={quiz.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow group-hover:scale-110 transition-transform">
                        <HelpCircle size={18} />
                      </div>
                      <span className="font-black text-ninja-dark group-hover:text-ninja-yellow transition-colors">{quiz.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-black text-ninja-yellow">
                    {quiz.completed}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400">
                      <Clock size={14} className="text-gray-300" />
                      {quiz.lastUpdate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-xs font-bold text-ninja-dark">
                      <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <User size={12} />
                      </div>
                      {quiz.updatedBy}
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
              <Zap size={160} />
            </div>

            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-ninja-dark transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-black text-ninja-dark tracking-tighter">Create Quiz</h2>
              <p className="text-gray-400 font-medium text-sm mt-1">Configure your interactive quiz</p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Quiz Name <span className="text-ninja-yellow">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Which Plan is for You?"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Type
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer font-bold">
                    <option>Scoring</option>
                    <option>Personality</option>
                    <option>Assessment</option>
                    <option>Recommendation</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <Button 
                onClick={() => {
                  toast.success('Quiz Created Successfully!');
                  setShowCreateModal(false);
                }}
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-ninja-yellow/20 mt-4 flex items-center justify-center gap-2"
              >
                Create Quiz
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
