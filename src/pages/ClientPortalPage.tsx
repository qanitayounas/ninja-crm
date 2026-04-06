import React, { useState, useEffect } from 'react';
import {
  Lock,
  Users,
  Plus,
  X,
  ChevronDown,
  Layers,
  FileText,
  Settings,
  ExternalLink
} from 'lucide-react';
import { Card, Badge, Button } from '../components/ui';
import toast from 'react-hot-toast';
import { apiService } from '../services/apiService';

export const ClientPortalPage = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [contactCount, setContactCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const results = await Promise.allSettled([
        apiService.getCourses(),
        apiService.getContacts(),
      ]);
      const coursesData = results[0].status === 'fulfilled' ? results[0].value : [];
      const contacts = results[1].status === 'fulfilled' ? results[1].value : [];
      setCourses(coursesData);
      setContactCount(contacts.length);
      setLoading(false);
    };
    loadData();
  }, []);

  // Build portals from courses
  const portals = courses.length > 0
    ? courses.map((course: any, idx: number) => ({
        id: course.id || idx + 1,
        name: course.title || course.name || `Portal ${idx + 1}`,
        status: 'Active',
        clients: contactCount,
        resources: course.modules?.length || course.lessonsCount || 0,
      }))
    : [];

  const totalClients = contactCount;
  const totalResources = portals.reduce((sum, p) => sum + p.resources, 0);

  if (loading) {
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
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Client Portal</h1>
        <p className="text-gray-400 font-medium font-bold">Private area for client access</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <Layers size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Active Portals</span>
          <span className="text-3xl font-black text-ninja-yellow">{portals.length}</span>
        </Card>

        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-110 transition-transform duration-500">
            <Users size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Clients</span>
          <span className="text-3xl font-black text-ninja-dark">{totalClients}</span>
        </Card>

        <Card className="p-6 md:p-8 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-110 transition-transform duration-500">
            <FileText size={100} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Shared Resources</span>
          <span className="text-3xl font-black text-purple-500/30 font-black">{totalResources}</span>
        </Card>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-end">
        <Button
          onClick={() => setShowCreateModal(true)}
          className="font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-ninja-yellow/20 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Create Portal
        </Button>
      </div>

      {/* Portal List */}
      <div className="space-y-6">
        {portals.length === 0 && (
          <Card className="p-12 text-center border-none shadow-sm">
            <Layers size={48} className="mx-auto mb-4 text-gray-200" />
            <h3 className="text-lg font-bold text-ninja-dark">No portals found</h3>
            <p className="text-gray-400 text-sm">Create your first client portal to get started</p>
          </Card>
        )}
        {portals.map((portal) => (
          <Card key={portal.id} className="p-0 overflow-hidden border-none shadow-sm group hover:shadow-xl transition-all duration-300">
            <div className="p-8 space-y-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                    <Lock size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-ninja-dark tracking-tight">{portal.name}</h3>
                    <Badge
                      status={portal.status}
                      className="bg-ninja-yellow/20 text-ninja-dark border-none font-black text-[10px] uppercase px-3 py-1 rounded-full"
                    >
                      {portal.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2.5 text-gray-400 hover:text-ninja-dark transition-colors bg-gray-50 rounded-xl">
                    <Settings size={18} />
                  </button>
                  <button className="p-2.5 text-gray-400 hover:text-ninja-dark transition-colors bg-gray-50 rounded-xl">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-gray-50/50 rounded-2xl border border-transparent group-hover:border-gray-100 transition-all flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Users size={14} />
                    Clients
                  </div>
                  <div className="text-2xl font-black text-ninja-dark">{portal.clients}</div>
                </div>
                <div className="p-6 bg-gray-50/50 rounded-2xl border border-transparent group-hover:border-gray-100 transition-all flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <FileText size={14} />
                    Resources
                  </div>
                  <div className="text-2xl font-black text-ninja-dark">{portal.resources}</div>
                </div>
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
              <Lock size={160} />
            </div>

            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-ninja-dark transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-black text-ninja-dark tracking-tighter">Create Client Portal</h2>
              <p className="text-gray-400 font-medium text-sm mt-1">Configure private access</p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Portal Name <span className="text-ninja-yellow">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. VIP Portal"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Access Type
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer">
                    <option>Public with Login</option>
                    <option>Invite Only</option>
                    <option>Enterprise SSO</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <Button
                onClick={() => {
                  toast.success('Client Portal Created Successfully!');
                  setShowCreateModal(false);
                }}
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-ninja-yellow/20 mt-4 flex items-center justify-center gap-2"
              >
                Create Portal
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
