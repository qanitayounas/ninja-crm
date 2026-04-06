import { useState, useEffect } from 'react';
import { 
  Users,
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  Download, 
  Instagram, 
  MessageCircle, 
  MessageSquare,
  Mail,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  Layout,
  Star,
  Settings,
  X,
  Menu
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, Badge, Avatar, Input, Button, Modal, Select, Textarea, cn } from '../components/ui';
import { apiService } from '../services/apiService';
import type { Contact } from '../types';
import type { SmartList } from '../data/smartLists';

const SourceIcon = ({ source }: { source: string }) => {
  switch (source) {
    case 'WhatsApp': return <MessageCircle size={16} className="text-green-500" />;
    case 'Instagram': return <Instagram size={16} className="text-pink-500" />;
    case 'Messenger': return <MessageSquare size={16} className="text-blue-500" />;
    default: return <Mail size={16} className="text-gray-500" />;
  }
};

export const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [smartLists, setSmartLists] = useState<SmartList[]>([]);
  const [selectedSmartListId, setSelectedSmartListId] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaveSmartListModalOpen, setIsSaveSmartListModalOpen] = useState(false);
  const [newSmartListName, setNewSmartListName] = useState('');
  const [newSmartListDesc, setNewSmartListDesc] = useState('');
  const [selectedTags, setSelectedTags] = useState<{name: string, color: string}[]>([]);
  const [newTagInput, setNewTagInput] = useState('');
  const [selectedColor, setSelectedColor] = useState('bg-ninja-yellow text-ninja-dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    setSyncError(null);
    try {
      const [lists, contactData] = await Promise.all([
        apiService.getSmartLists(),
        apiService.getContacts()
      ]);
      setSmartLists(lists);
      setContacts(contactData);
    } catch (error: any) {
      console.error('Error loading contacts:', error);
      if (error.status === 403 || error.status === 401) {
        setSyncError('Contact management is currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
      } else {
        toast.error('Failed to load contacts');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSmartList = async () => {
    if (!newSmartListName.trim()) return;
    
    const newList = await apiService.createSmartList(
      newSmartListName, 
      newSmartListDesc, 
      [{ field: 'search', operator: 'contains', value: search }]
    );
    
    setSmartLists([...smartLists, newList]);
    setSelectedSmartListId(newList.id);
    setIsSaveSmartListModalOpen(false);
    setNewSmartListName('');
    setNewSmartListDesc('');
    toast.success(`Smart List "${newSmartListName}" saved!`);
  };

  const availableColors = [
    { label: 'Yellow', value: 'bg-ninja-yellow text-ninja-dark border-[#c2e600]' },
    { label: 'Purple', value: 'bg-purple-100 text-purple-600 border-purple-200' },
    { label: 'Blue', value: 'bg-blue-100 text-blue-600 border-blue-200' },
    { label: 'Green', value: 'bg-green-100 text-green-600 border-green-200' },
    { label: 'Pink', value: 'bg-pink-100 text-pink-600 border-pink-200' },
  ];

  const handleAddTag = () => {
    if (newTagInput.trim()) {
      setSelectedTags([...selectedTags, { name: newTagInput.trim(), color: selectedColor }]);
      setNewTagInput('');
    }
  };

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                         c.email.toLowerCase().includes(search.toLowerCase());
    
    if (selectedSmartListId === 'all') return matchesSearch;
    
    const selectedList = smartLists.find(l => l.id === selectedSmartListId);
    if (!selectedList) return matchesSearch;
    
    // Simple filter logic for demo purposes
    // In a real app, this would be handled by the backend or a complex filter engine
    return matchesSearch; 
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)] relative overflow-hidden">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden absolute top-0 left-0 z-20 p-2 bg-ninja-yellow text-ninja-dark rounded-xl shadow-lg"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Smart Lists Sidebar */}
      <aside className={cn(
        "lg:w-64 flex flex-col gap-6 bg-white rounded-3xl p-6 shadow-sm border border-gray-50 transition-all duration-300 z-10",
        "absolute inset-y-0 left-0 w-full lg:relative lg:translate-x-0 lg:opacity-100",
        isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:translate-x-0 lg:opacity-100"
      )}>
        <div className="flex items-center justify-between">
          <h3 className="font-black text-ninja-dark uppercase tracking-widest text-xs">Smart Lists</h3>
          <Button variant="ghost" className="p-1 h-auto w-auto hover:bg-ninja-yellow/10 hover:text-ninja-yellow">
            <Plus size={16} />
          </Button>
        </div>

        <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar flex-1 -mx-2 px-2">
          <button 
            onClick={() => { setSelectedSmartListId('all'); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all group",
              selectedSmartListId === 'all' ? "bg-ninja-dark text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              selectedSmartListId === 'all' ? "text-ninja-yellow" : "bg-gray-100 text-gray-400 group-hover:bg-white"
            )}>
              <Layout size={16} />
            </div>
            <span className="text-sm font-bold truncate">All Contacts</span>
          </button>

          {smartLists.map(list => (
            <button 
              key={list.id}
              onClick={() => { setSelectedSmartListId(list.id); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all group mt-1",
                selectedSmartListId === list.id ? "bg-ninja-dark text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                selectedSmartListId === list.id ? "text-ninja-yellow" : "bg-gray-100 text-gray-400 group-hover:bg-white"
              )}>
                <Star size={16} fill={selectedSmartListId === list.id ? "currentColor" : "none"} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold truncate">{list.name}</span>
                <span className="text-[10px] font-bold opacity-50 truncate">{list.description}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-50">
          <Button variant="ghost" className="w-full flex items-center justify-start gap-2 text-gray-400 hover:text-ninja-dark px-2">
            <Settings size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Manage Lists</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-10 lg:pl-0">
          <div>
            <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">
              {selectedSmartListId === 'all' ? 'Contacts' : smartLists.find(l => l.id === selectedSmartListId)?.name}
            </h1>
            <p className="text-gray-400 font-medium font-bold text-sm">Manage your leads and clients</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button variant="secondary" className="flex items-center gap-2 px-6 py-3 rounded-2xl w-full sm:w-auto justify-center bg-ninja-dark text-white hover:bg-ninja-dark/90">
              <UploadCloud size={18} />
              <span>Import</span>
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-8 py-3 rounded-2xl shadow-lg shadow-ninja-yellow/20 w-full sm:w-auto justify-center">
              <Plus size={20} />
              <span>Add Contact</span>
            </Button>
          </div>
        </div>

        {/* Alert Case: Branded Setup Notice */}
        {syncError && (
          <Card className="p-4 border-l-4 border-l-ninja-purple bg-ninja-purple/5 border-ninja-purple/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-ninja-purple/10 rounded-lg text-ninja-purple">
                <Users size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-ninja-dark">Module Synchronization</p>
                <p className="text-xs text-slate-500 font-medium">{syncError}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Filters Bar */}
        <Card className="p-3 md:p-4 border-none shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl">
          <div className="flex flex-1 items-center gap-4 max-w-full md:max-w-xl">
            <Input 
              icon={Search} 
              placeholder="Search by name or email..." 
              className="bg-gray-50 border-none flex-1 rounded-xl" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <Button 
                variant="ghost" 
                onClick={() => setIsSaveSmartListModalOpen(true)}
                className="flex items-center gap-2 text-ninja-yellow font-bold text-xs uppercase tracking-widest"
              >
                <Star size={14} />
                <span>Save</span>
              </Button>
            )}
            <Button variant="ghost" className="flex items-center gap-2 text-gray-500 border border-gray-100 px-3 md:px-4 rounded-xl">
              <Filter size={18} />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 w-full md:w-auto">
            <Button variant="ghost" className="flex items-center justify-center gap-2 text-gray-500 border border-gray-100 w-full sm:w-auto rounded-xl">
              <Download size={18} />
              <span className="inline">Export</span>
            </Button>
          </div>
        </Card>

        {/* Contacts Table Container */}
        <Card className="p-0 border-none shadow-sm overflow-hidden flex-1 flex flex-col bg-white rounded-3xl">
          <div className="overflow-x-auto custom-scrollbar w-full flex-1">
            <table className="w-full text-left min-w-[800px]">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-6 py-4 border-b border-gray-100 w-10 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-ninja-yellow focus:ring-ninja-yellow" />
                  </th>
                  <th className="px-6 py-4 border-b border-gray-100">Name</th>
                  <th className="px-6 py-4 border-b border-gray-100">Company</th>
                  <th className="px-6 py-4 border-b border-gray-100">Contact</th>
                  <th className="hidden lg:table-cell px-6 py-4 border-b border-gray-100">Source</th>
                  <th className="hidden sm:table-cell px-6 py-4 border-b border-gray-100">Status</th>
                  <th className="hidden lg:table-cell px-6 py-4 border-b border-gray-100">Owner</th>
                  <th className="px-6 py-4 border-b border-gray-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="group hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-ninja-yellow focus:ring-ninja-yellow" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar name={contact.name} size="sm" className="shadow-sm border-2 border-white" />
                        <span className="font-bold text-ninja-dark">{contact.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600 whitespace-nowrap">
                      {contact.company || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-ninja-dark truncate max-w-[150px]">{contact.email}</p>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest">{contact.phone}</p>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4">
                      <div className="flex items-center gap-2">
                        <SourceIcon source={contact.source} />
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{contact.source}</span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4">
                      <Badge status={contact.status} className="text-[10px] font-black uppercase tracking-widest">{contact.status}</Badge>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">
                      {contact.owner || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-300 hover:text-ninja-dark transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination UI */}
          <div className="px-6 py-4 bg-gray-50/20 flex items-center justify-between border-t border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Showing 1 to {filteredContacts.length} contacts</p>
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="p-2 h-8 w-8 flex items-center justify-center opacity-50 cursor-not-allowed rounded-lg">
                <ChevronLeft size={16} />
              </Button>
              <div className="flex items-center gap-1">
                <button className="h-8 w-8 text-xs font-black bg-ninja-yellow text-ninja-dark rounded-lg shadow-sm">1</button>
                <button className="h-8 w-8 text-xs font-bold text-gray-400 hover:text-ninja-dark transition-colors">2</button>
              </div>
              <Button variant="secondary" className="p-2 h-8 w-8 flex items-center justify-center hover:bg-white hover:border-ninja-yellow rounded-lg">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Lead">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Name *</label>
              <Input placeholder="Full name" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Company *</label>
              <Input placeholder="Company name" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Email *</label>
              <Input placeholder="email@example.com" type="email" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Phone</label>
              <Input placeholder="+1 (555) 000-0000" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Status</label>
              <Select defaultValue="Cold" className="rounded-xl">
                <option value="Cold">Cold</option>
                <option value="Warm">Warm</option>
                <option value="Client">Client</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Responsible Person</label>
              <Select defaultValue="John Smith" className="rounded-xl">
                <option value="John Smith">John Smith</option>
                <option value="Emily Davis">Emily Davis</option>
                <option value="Sarah Lee">Sarah Lee</option>
              </Select>
            </div>
          </div>

          {/* Tags Section */}
          <div className="border border-gray-100 rounded-3xl p-5 bg-gray-50/50 space-y-3">
            <label className="text-sm font-bold text-ninja-dark block uppercase tracking-wider">Custom Tags</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex gap-2">
                <Input 
                  placeholder="e.g. VIP Client" 
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  className="bg-white flex-1 rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color.label}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${color.value.split(' ')[0]} ${selectedColor === color.value ? 'ring-2 ring-offset-1 ring-ninja-dark scale-110' : 'border-transparent'}`}
                    title={color.label}
                  />
                ))}
                <Button onClick={handleAddTag} className="ml-2 px-4 py-2 text-xs h-10 rounded-xl">Add</Button>
              </div>
            </div>
            
            {/* Tag Pills Display */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedTags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className={`text-[9px] px-2.5 py-1 rounded font-bold uppercase flex items-center gap-1.5 border border-white shadow-sm ${tag.color}`}
                  >
                    {tag.name}
                    <button 
                      onClick={() => setSelectedTags(selectedTags.filter((_, i) => i !== idx))}
                      className="hover:opacity-60 transition-opacity"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 justify-end mt-2 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={async () => {
              try {
                const nameInput = document.querySelector<HTMLInputElement>('input[placeholder="Full name"]');
                const emailInput = document.querySelector<HTMLInputElement>('input[placeholder="email@example.com"]');
                const phoneInput = document.querySelector<HTMLInputElement>('input[placeholder="+1 (555) 000-0000"]');
                const companyInput = document.querySelector<HTMLInputElement>('input[placeholder="Company name"]');

                if (!nameInput?.value || !emailInput?.value) {
                  toast.error('Name and email are required');
                  return;
                }

                const nameParts = nameInput.value.trim().split(' ');
                await apiService.createContact({
                  firstName: nameParts[0],
                  lastName: nameParts.slice(1).join(' ') || '',
                  email: emailInput.value,
                  phone: phoneInput?.value || '',
                  companyName: companyInput?.value || '',
                  tags: selectedTags.map(t => t.name)
                });

                toast.success('Contact added successfully!');
                setIsAddModalOpen(false);
                setSelectedTags([]);
                loadInitialData();
              } catch (error) {
                toast.error('Failed to create contact');
                console.error(error);
              }
            }} className="rounded-xl px-8">Add Client</Button>
          </div>
        </div>
      </Modal>

      {/* Save Smart List Modal */}
      <Modal isOpen={isSaveSmartListModalOpen} onClose={() => setIsSaveSmartListModalOpen(false)} title="Save Smart List">
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark uppercase tracking-wider">List Name *</label>
            <Input 
              placeholder="e.g.: High Value Leads" 
              value={newSmartListName}
              onChange={(e) => setNewSmartListName(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark uppercase tracking-wider">Description</label>
            <Textarea 
              placeholder="What is this list for?" 
              value={newSmartListDesc}
              onChange={(e) => setNewSmartListDesc(e.target.value)}
              className="rounded-xl min-h-[80px]"
            />
          </div>
          <div className="p-4 bg-ninja-yellow/5 border border-ninja-yellow/10 rounded-2xl">
            <p className="text-[10px] font-black text-ninja-dark uppercase tracking-widest italic flex items-center gap-2">
              <Star size={12} className="text-ninja-yellow" fill="currentColor" />
              Dynamic Filter Capture
            </p>
            <p className="text-[10px] text-gray-500 font-bold mt-1">
              Current search "{search}" will be saved as the primary selection criterion for this list.
            </p>
          </div>
          <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setIsSaveSmartListModalOpen(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={handleSaveSmartList} className="rounded-xl px-8">Save List</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

