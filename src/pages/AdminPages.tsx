import React from 'react';
import { Plus, Building, User, Users, Target, Zap, Settings, Globe, Bell, Shield, Database } from 'lucide-react';
import { Card, Badge, Avatar, Button, Input, cn } from '../components/ui';
import subaccountsData from '../data/subaccounts.json';

export const SubaccountsPage = () => {
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Subaccounts</h1>
          <p className="text-gray-400 font-medium">Manage your clients and accounts</p>
        </div>
        <Button className="flex items-center gap-2 px-8 py-3 rounded-2xl shadow-lg shadow-ninja-yellow/20 w-full sm:w-auto justify-center">
          <Plus size={20} />
          <span>New Subaccount</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4 bg-ninja-dark text-white border-none">
          <div className="p-3 bg-white/10 rounded-2xl">
            <Building size={24} className="text-ninja-yellow" />
          </div>
          <div>
            <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Total Subaccounts</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-none shadow-sm">
          <div className="p-3 bg-green-50 rounded-2xl">
            <Target size={24} className="text-green-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Active Accounts</p>
            <p className="text-2xl font-bold text-ninja-dark">10</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-none shadow-sm">
          <div className="p-3 bg-ninja-purple/10 rounded-2xl">
            <Zap size={24} className="text-ninja-purple" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total MRR</p>
            <p className="text-2xl font-bold text-ninja-dark">$1,240</p>
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ninja-dark">Client Management</h3>
          <div className="flex gap-3 w-full sm:w-auto">
             <Input placeholder="Search subaccount..." className="w-full sm:w-64" />
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4 border-b border-gray-100">Subaccount</th>
                <th className="px-6 py-4 border-b border-gray-100">Plan</th>
                <th className="px-6 py-4 border-b border-gray-100">Contacts</th>
                <th className="px-6 py-4 border-b border-gray-100">MRR</th>
                <th className="px-6 py-4 border-b border-gray-100">Status</th>
                <th className="px-6 py-4 border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subaccountsData.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-ninja-dark flex items-center justify-center text-ninja-yellow font-bold text-sm shadow-sm">
                        {sub.name[0]}
                      </div>
                      <span className="font-bold text-ninja-dark">{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">{sub.plan}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
                      <Users size={14} />
                      {sub.contactsCount}
                    </div>
                  </td>
                  <td className="px-6 py-5 font-bold text-ninja-dark text-sm">
                    ${sub.mrr}
                  </td>
                  <td className="px-6 py-5">
                    <Badge status={sub.status}>{sub.status}</Badge>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="ghost" className="p-2 h-9 w-9 flex items-center justify-center text-gray-400 hover:text-ninja-dark">
                      <Settings size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = React.useState('profile');

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Subscription', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Database },
  ];

  return (
    <div className="flex flex-col gap-6 antialiased pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Settings</h1>
          <p className="text-gray-400 font-medium">Manage your profile and preferences</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Settings Navigation */}
      <div className="w-full lg:w-64 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm",
              activeTab === tab.id 
                ? "bg-ninja-yellow text-ninja-dark shadow-sm" 
                : "text-gray-400 hover:bg-white hover:text-ninja-dark"
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="flex-1 space-y-6">
        {activeTab === 'profile' && (
          <Card className="max-w-2xl">
            <h3 className="text-lg font-bold text-ninja-dark mb-6">Personal Information</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="relative group cursor-pointer">
                <Avatar name="Admin Ninja" className="h-24 w-24" />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-[10px] text-white font-bold uppercase">Change</p>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-ninja-dark">Admin Ninja</h4>
                <p className="text-xs text-gray-400 font-medium">superadmin@ninjacrm.com</p>
                <div className="pt-2">
                  <Badge status="Active">Super Admin</Badge>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                  <Input placeholder="Name" defaultValue="Admin Ninja" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email</label>
                  <Input placeholder="Email" defaultValue="admin@ninjacrm.com" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Phone</label>
                <Input placeholder="Phone" defaultValue="+52 55 0000 0000" />
              </div>
              <div className="pt-6 border-t border-gray-50 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </form>
          </Card>
        )}

        {activeTab === 'integrations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
             <Card className="flex flex-col items-center text-center p-8 border-2 border-dashed border-gray-100 hover:border-ninja-yellow transition-colors cursor-pointer group">
                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-ninja-yellow group-hover:text-ninja-dark transition-colors">
                  <Globe size={32} />
                </div>
                <h4 className="font-bold text-lg text-ninja-dark mb-2">GoHighLevel</h4>
                <p className="text-xs text-gray-400 font-medium mb-6">Connect your GHL account to sync contacts and automations.</p>
                <Button variant="secondary" className="w-full">Connect API</Button>
             </Card>

             <Card className="flex flex-col items-center text-center p-8 border-2 border-dashed border-gray-100 opacity-60">
                <div className="h-16 w-16 bg-gray-50 text-gray-400 rounded-3xl flex items-center justify-center mb-6">
                  <Database size={32} />
                </div>
                <h4 className="font-bold text-lg text-ninja-dark mb-2">Zapier</h4>
                <p className="text-xs text-gray-400 font-medium mb-6">Upcoming integration. Connect over 1000 applications.</p>
                <Button variant="ghost" disabled className="w-full">Coming Soon</Button>
             </Card>
          </div>
        )}

        {activeTab !== 'profile' && activeTab !== 'integrations' && (
          <Card className="flex flex-col items-center justify-center py-20 text-gray-300">
            <Settings size={48} className="mb-4 opacity-20" />
            <p className="font-bold text-sm">View of {activeTab} under development</p>
          </Card>
        )}
      </div>

      </div>
    </div>
  );
};

