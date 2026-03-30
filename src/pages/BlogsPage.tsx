import React from 'react';
import { 
  BookOpen, 
  Users, 
  Plus, 
  Search, 
  X, 
  ChevronDown, 
  Layout
} from 'lucide-react';
import { Card, Badge, Button, cn } from '../components/ui';
import toast from 'react-hot-toast';

const blogs = [
  {
    id: 1,
    name: 'Ninja Corporate Blog',
    status: 'Published',
    description: 'Official company blog',
    posts: 45,
    weeklyVisitors: '12,450',
    updatedAt: '20/3/2026'
  },
  {
    id: 2,
    name: 'CRM Resources Blog',
    status: 'Published',
    description: 'Tips and tutorials',
    posts: 28,
    weeklyVisitors: '8,234',
    updatedAt: '19/3/2026'
  },
  {
    id: 3,
    name: 'News Blog',
    status: 'Draft',
    description: 'Industry updates',
    posts: 12,
    weeklyVisitors: '3,450',
    updatedAt: '21/3/2026'
  }
];

export const BlogsPage = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredBlogs = blogs.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Blogs</h1>
        <p className="text-gray-400 font-medium font-bold">Blog system for SEO positioning</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <BookOpen size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Posts</span>
          <span className="text-3xl font-black text-ninja-dark">85</span>
        </Card>
        
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-green-500/5 group-hover:scale-110 transition-transform duration-500">
            <Layout size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Blog Sites</span>
          <span className="text-3xl font-black text-ninja-yellow">2</span>
        </Card>

        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-110 transition-transform duration-500">
            <Users size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Weekly Visitors</span>
          <span className="text-3xl font-black text-purple-500/30 font-black">24,134</span>
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
            placeholder="Search blogs..."
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
          Create Blog Site
        </Button>
      </div>

      {/* Blogs Table */}
      <Card className="overflow-hidden border-none shadow-sm pb-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Blog</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Posts</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Visitors/Week</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow group-hover:scale-110 transition-transform">
                        <BookOpen size={20} />
                      </div>
                      <span className="font-black text-ninja-dark group-hover:text-ninja-yellow transition-colors">{blog.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      status={blog.status}
                      className={cn(
                        "font-black text-[10px] uppercase px-3 py-1 rounded-full",
                        blog.status === 'Published' ? "bg-ninja-yellow/20 text-ninja-dark border-none" : "bg-gray-100 text-gray-400 border-none whitespace-nowrap overflow-hidden translate-y-0 translate-x-0"
                      )}
                    >
                      {blog.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-500 italic">
                    {blog.description}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-black text-ninja-dark">{blog.posts}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-400">
                      <Users size={14} className="text-gray-300" />
                      {blog.weeklyVisitors}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-black text-gray-500 uppercase tracking-tight">{blog.updatedAt}</span>
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
              <BookOpen size={160} />
            </div>

            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-ninja-dark transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-black text-ninja-dark tracking-tighter">Create Blog Site</h2>
              <p className="text-gray-400 font-medium text-sm mt-1">Configure your corporate blog</p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Blog Name <span className="text-ninja-yellow">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Resources Blog"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Description
                </label>
                <textarea 
                  placeholder="Describe the purpose of the blog..."
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark min-h-[100px] resize-none font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Template
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer font-bold">
                    <option>Modern</option>
                    <option>Minimalist</option>
                    <option>Corporate</option>
                    <option>Magazine</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <Button 
                onClick={() => {
                  toast.success('Blog Site Created Successfully!');
                  setShowCreateModal(false);
                }}
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-ninja-yellow/20 mt-4 flex items-center justify-center gap-2"
              >
                Create Blog
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
