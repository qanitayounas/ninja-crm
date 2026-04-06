import { useState, useEffect } from 'react';
import {
  Plus, Building, User, Users, Target, Zap, Settings, Globe, Bell, Shield, Database,
  CheckCircle2, Download, CreditCard, Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRole } from '../context/RoleContext';
import type { Role } from '../context/RoleContext';
import { Card, Badge, Avatar, Button, Input, cn } from '../components/ui';
import subaccountsData from '../data/subaccounts.json';
import { currentPlan, paymentMethods, invoiceHistory } from '../data/billingData';
import { apiService } from '../services/apiService';

export const SubaccountsPage = () => {
  const [loading, setLoading] = useState(true);
  const [, setSaasInfo] = useState<any>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const results = await Promise.allSettled([
        apiService.getSaasLocation(),
        apiService.getBusinesses(),
        apiService.getLocation(),
      ]);
      setSaasInfo(results[0].status === 'fulfilled' ? results[0].value : null);
      setBusinesses(results[1].status === 'fulfilled' ? results[1].value : []);
      setLocation(results[2].status === 'fulfilled' ? results[2].value : null);
      setLoading(false);
    };
    loadData();
  }, []);

  // Merge API businesses with static subaccounts for display
  const displaySubaccounts = businesses.length > 0
    ? businesses.map((b: any, idx: number) => ({
        id: b.id || idx,
        name: b.name || 'Unknown',
        plan: b.plan || 'Standard',
        contactsCount: b.contactsCount || 0,
        mrr: b.mrr || 0,
        status: b.status || 'Active',
      }))
    : subaccountsData;

  const totalSubaccounts = displaySubaccounts.length;
  const activeAccounts = displaySubaccounts.filter((s: any) => (s.status || '').toLowerCase() === 'active').length;
  const totalMrr = displaySubaccounts.reduce((sum: number, s: any) => sum + (Number(s.mrr) || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Subaccounts</h1>
          <p className="text-gray-400 font-medium">Manage your clients and accounts{location?.name ? ` - ${location.name}` : ''}</p>
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
            <p className="text-2xl font-bold">{totalSubaccounts}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-none shadow-sm">
          <div className="p-3 bg-green-50 rounded-2xl">
            <Target size={24} className="text-green-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Active Accounts</p>
            <p className="text-2xl font-bold text-ninja-dark">{activeAccounts}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-none shadow-sm">
          <div className="p-3 bg-ninja-purple/10 rounded-2xl">
            <Zap size={24} className="text-ninja-purple" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total MRR</p>
            <p className="text-2xl font-bold text-ninja-dark">${totalMrr.toLocaleString()}</p>
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
              {displaySubaccounts.map((sub: any) => (
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
  const [activeTab, setActiveTab] = useState('profile');
  const { role: currentRole, setRole } = useRole();
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [locationData, setLocationData] = useState<any>(null);
  const [customFields, setCustomFields] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    const loadSettings = async () => {
      setSettingsLoading(true);
      const results = await Promise.allSettled([
        apiService.getLocation(),
        apiService.getCustomFields(),
        apiService.getTags(),
      ]);
      setLocationData(results[0].status === 'fulfilled' ? results[0].value : null);
      setCustomFields(results[1].status === 'fulfilled' ? results[1].value : []);
      setTags(results[2].status === 'fulfilled' ? results[2].value : []);
      setSettingsLoading(false);
    };
    loadSettings();
  }, []);

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'permissions', label: 'Roles & Permissions', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Subscription', icon: CreditCard },
    { id: 'agency', label: 'Agency Profile', icon: Building },
    { id: 'integrations', label: 'Integrations', icon: Database },
  ];

  if (settingsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 antialiased pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Settings</h1>
          <p className="text-gray-400 font-medium">Manage your profile and preferences{locationData?.name ? ` - ${locationData.name}` : ''}</p>
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

          {activeTab === 'agency' && (
            <Card className="max-w-3xl">
              <h3 className="text-lg font-bold text-ninja-dark mb-2">Agency White Label</h3>
              <p className="text-gray-400 text-sm font-medium mb-8">Customize the platform appearance for your clients.</p>

              <form className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-ninja-dark mb-3 block">Agency Logo</label>
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                      <Plus size={24} />
                    </div>
                    <div>
                      <Button variant="secondary" type="button" className="mb-2">Upload Logo</Button>
                      <p className="text-xs text-gray-400">Recommended size: 400x100px. Transparent PNG.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-ninja-dark block">Custom Domain</label>
                  <div className="flex gap-3">
                    <Input placeholder="app.youragency.com" className="max-w-md bg-gray-50" />
                    <Button variant="secondary" type="button">Verify</Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Point your CNAME record to `cname.ninjacrm.com`.</p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-ninja-dark block">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-ninja-yellow border border-gray-200 shadow-sm" />
                      <Input defaultValue="#D4FF00" className="w-24 uppercase font-mono text-xs" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-ninja-dark block">Sidebar Theme</label>
                    <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium text-ninja-dark outline-none focus:ring-2 focus:ring-ninja-yellow">
                      <option>Dark Mode</option>
                      <option>Light Mode</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex justify-end">
                  <Button type="button">Save Brand Settings</Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'permissions' && (
            <Card className="max-w-4xl border-none shadow-sm space-y-6">
              <div className="flex items-start sm:items-center justify-between mb-2 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-ninja-dark mb-1">Roles & Permissions</h3>
                  <p className="text-gray-400 text-sm font-medium">Manage access levels and plan-based feature visibility.</p>
                </div>
                <Button onClick={() => toast.success('Opening Create Role modal...')} className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 h-16 w-16 sm:h-auto sm:w-auto shrink-0 rounded-2xl text-[10px] sm:text-xs font-bold leading-tight bg-ninja-dark text-white shadow-lg hover:bg-gray-800 transition-all">
                  <Plus size={16} className="sm:w-4 sm:h-4" /> 
                  <span className="text-center">New<br className="sm:hidden" /> Role</span>
                </Button>
              </div>

              {/* Roles Table */}
              <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full min-w-[600px] text-left">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role Name</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visibility / Plan</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Users</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { name: 'Super Admin', plan: 'All Access', users: 2, color: 'bg-ninja-yellow text-ninja-dark' },
                      { name: 'Agency Manager', plan: 'Premium', users: 5, color: 'bg-[#BFA9FF] text-[#4C1D95]' },
                      { name: 'Sales Rep', plan: 'Pro', users: 12, color: 'bg-blue-100 text-blue-600' },
                      { name: 'Client Viewer', plan: 'Basic', users: 45, color: 'bg-gray-100 text-gray-600' }
                    ].map((role, i) => (
                      <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-6 py-4 w-1/4">
                          <span className="font-bold text-ninja-dark text-sm inline-block max-w-[60px] sm:max-w-none">{role.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn("text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md inline-block leading-tight max-w-[80px] sm:max-w-none text-center sm:text-left", role.color)}>
                            {role.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-gray-500 bg-white border border-gray-100 px-2.5 py-1 rounded-lg">
                            {role.users} users
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => {
                                setRole(role.name as Role);
                                toast.success(`Switched role to ${role.name}. Sidebar updated!`);
                              }} 
                              className={cn(
                                "text-xs font-bold px-3 py-1.5 rounded-lg transition-colors",
                                currentRole === role.name 
                                  ? "bg-ninja-dark text-ninja-yellow cursor-default" 
                                  : "text-gray-500 hover:text-ninja-dark bg-gray-100 hover:bg-gray-200"
                              )}
                            >
                              {currentRole === role.name ? 'Active Role' : 'Switch Role'}
                            </button>
                            <button onClick={() => toast.success(`Managing permissions for ${role.name}`)} className="text-xs font-bold text-ninja-yellow hover:underline bg-ninja-yellow/10 px-3 py-1.5 rounded-lg transition-colors">Edit Access</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  </table>
                </div>
              </div>

              {/* Plan Feature Toggles */}
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                <h4 className="font-bold text-ninja-dark mb-4 text-sm">Feature Toggles by Plan</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-sm text-ninja-dark">Basic Plan</span>
                      <div className="h-2 w-2 rounded-full bg-gray-400" />
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-xs font-bold text-gray-500 group-hover:text-ninja-dark transition-colors">Contacts Module</span>
                        <input type="checkbox" defaultChecked className="checked:bg-ninja-yellow checked:border-ninja-yellow focus:ring-ninja-yellow rounded text-ninja-dark" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-xs font-bold text-gray-500 group-hover:text-ninja-dark transition-colors">Automations</span>
                        <input type="checkbox" className="checked:bg-ninja-yellow checked:border-ninja-yellow flex-shrink-0 cursor-pointer text-ninja-yellow rounded" />
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-sm text-ninja-dark">Pro Plan</span>
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-xs font-bold text-gray-500 group-hover:text-ninja-dark transition-colors">Automations</span>
                        <input type="checkbox" defaultChecked className="checked:bg-ninja-yellow checked:border-ninja-yellow rounded text-ninja-dark" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-xs font-bold text-gray-500 group-hover:text-ninja-dark transition-colors">Campaigns</span>
                        <input type="checkbox" defaultChecked className="checked:bg-ninja-yellow checked:border-ninja-yellow rounded text-ninja-dark" />
                      </label>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_0_15px_rgba(212,255,0,0.1)] border-ninja-yellow/30">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-sm text-ninja-dark">Premium Plan</span>
                      <div className="h-2 w-2 rounded-full bg-ninja-yellow shadow-[0_0_10px_rgba(212,255,0,0.5)]" />
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-xs font-bold text-gray-500 group-hover:text-ninja-dark transition-colors">Advanced Analytics</span>
                        <input type="checkbox" defaultChecked className="checked:bg-ninja-yellow checked:border-ninja-yellow rounded text-ninja-dark" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-xs font-bold text-gray-500 group-hover:text-ninja-dark transition-colors">White Label Settings</span>
                        <input type="checkbox" defaultChecked className="checked:bg-ninja-yellow checked:border-ninja-yellow rounded text-ninja-dark" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => toast.success('Permissions updated successfully!')}>Save Permissions</Button>
              </div>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <Card className="flex flex-col items-center text-center p-8 border-2 border-dashed border-gray-100 hover:border-ninja-yellow transition-colors cursor-pointer group">
                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-ninja-yellow group-hover:text-ninja-dark transition-colors">
                  <Globe size={32} />
                </div>
                <h4 className="font-bold text-lg text-ninja-dark mb-2">GoHighLevel</h4>
                <p className="text-xs text-gray-400 font-medium mb-2">Connect your GHL account to sync contacts and automations.</p>
                {locationData && (
                  <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2">Connected: {locationData.name || locationData.companyName || 'Active'}</p>
                )}
                {customFields.length > 0 && (
                  <p className="text-[10px] font-bold text-gray-400 mb-1">{customFields.length} custom fields synced</p>
                )}
                {tags.length > 0 && (
                  <p className="text-[10px] font-bold text-gray-400 mb-4">{tags.length} tags synced</p>
                )}
                {!locationData && !customFields.length && !tags.length && <div className="mb-6" />}
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

          {activeTab === 'billing' && (
            <div className="flex flex-col gap-8 w-full max-w-5xl">
              <Card className="relative overflow-hidden group border-none shadow-premium bg-ninja-dark p-8 text-white">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-8 text-ninja-yellow opacity-10 group-hover:opacity-20 transition-opacity">
                  <Shield size={180} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <Badge status="Active" className="bg-ninja-yellow text-ninja-dark font-black px-3 py-1 uppercase text-[10px] tracking-widest border-none">
                      {currentPlan.status}
                    </Badge>
                    <span className="text-gray-400 font-bold text-sm">Since Oct 2025</span>
                  </div>

                  <h2 className="text-4xl font-black mb-2 tracking-tight">{currentPlan.name}</h2>
                  <div className="flex items-end gap-1 mb-8">
                    <span className="text-3xl font-black text-ninja-yellow">{currentPlan.price}</span>
                    <span className="text-gray-400 font-bold mb-1">/{currentPlan.interval}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {currentPlan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300 font-medium">
                        <CheckCircle2 size={16} className="text-ninja-yellow shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Button className="bg-ninja-yellow text-ninja-dark hover:bg-ninja-yellow/90 border-none font-black px-8">
                      Upgrade Plan
                    </Button>
                    <Button variant="ghost" className="text-white border-white/20 hover:bg-white/10 hover:text-white font-bold">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentMethods.map((method, i) => (
                  <Card key={i} className={cn(
                    "relative group cursor-pointer transition-all duration-300 hover:shadow-xl",
                    method.isPrimary ? "border-ninja-yellow/30 bg-ninja-yellow/[0.02]" : "hover:border-ninja-yellow/20"
                  )}>
                    <div className="flex items-start justify-between mb-8">
                      <div className={cn("h-12 w-16 rounded-xl flex items-center justify-center text-white font-black italic", method.color)}>
                        {method.type}
                      </div>
                      {method.isPrimary && (
                        <Badge status="Active" className="bg-ninja-yellow/20 text-ninja-dark border-none font-bold text-[10px]">PRIMARY</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-ninja-dark font-black tracking-widest text-lg">•••• •••• •••• {method.last4}</p>
                        <p className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-tighter">Expires {method.expiry}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-0 overflow-hidden border-none shadow-ninja">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-ninja-dark">Billing History</h3>
                  <Button variant="secondary" className="text-xs py-1.5 font-bold">Download All</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        <th className="px-6 py-4">Invoice</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {invoiceHistory.map((invoice, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-ninja-dark">{invoice.id}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-500">{invoice.date}</td>
                          <td className="px-6 py-4 font-black text-ninja-dark">{invoice.amount}</td>
                          <td className="px-6 py-4">
                            <Badge status="Active" className="bg-green-50 text-green-600 border-none font-bold text-[10px] px-2 py-0.5">
                              {invoice.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-ninja-yellow hover:text-ninja-dark transition-colors">
                              <Download size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {activeTab !== 'profile' && activeTab !== 'integrations' && activeTab !== 'billing' && activeTab !== 'agency' && activeTab !== 'permissions' && (
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

