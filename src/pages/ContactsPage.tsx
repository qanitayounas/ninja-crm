import { useState } from 'react';
import { 
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
  ChevronRight
} from 'lucide-react';
import { Card, Badge, Avatar, Input, Button, Modal, Select } from '../components/ui';
import contactsData from '../data/contacts.json';
import type { Contact } from '../types';

const SourceIcon = ({ source }: { source: string }) => {
  switch (source) {
    case 'WhatsApp': return <MessageCircle size={16} className="text-green-500" />;
    case 'Instagram': return <Instagram size={16} className="text-pink-500" />;
    case 'Messenger': return <MessageSquare size={16} className="text-blue-500" />;
    default: return <Mail size={16} className="text-gray-500" />;
  }
};

export const ContactsPage = () => {
  const [contacts] = useState<Contact[]>(contactsData as Contact[]);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Contacts</h1>
          <p className="text-gray-400 font-medium">Manage your leads and clients</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-8 py-3 rounded-2xl shadow-lg shadow-ninja-yellow/20 w-full sm:w-auto justify-center">
          <Plus size={20} />
          <span>Add Contact</span>
        </Button>
      </div>

      {/* Filters Bar */}
      <Card className="p-3 md:p-4 border-none shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4 max-w-full md:max-w-xl">
          <Input 
            icon={Search} 
            placeholder="Search by name or email..." 
            className="bg-gray-50 border-none flex-1" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="ghost" className="flex items-center gap-2 text-gray-500 border border-gray-100 px-3 md:px-4">
            <Filter size={18} />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 w-full md:w-auto">
          <Button variant="ghost" className="flex items-center justify-center gap-2 text-gray-500 border border-gray-100 w-full sm:w-auto">
            <Download size={18} />
            <span className="inline">Export</span>
          </Button>
        </div>
      </Card>

      {/* Contacts Table */}
      <Card className="p-0 border-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar w-full">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4 font-bold border-b border-gray-100 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-ninja-yellow focus:ring-ninja-yellow" />
                </th>
                <th className="px-6 py-4 font-bold border-b border-gray-100">Prospect</th>
                <th className="px-6 py-4 font-bold border-b border-gray-100">Email / Phone</th>
                <th className="hidden lg:table-cell px-6 py-4 font-bold border-b border-gray-100">Source</th>
                <th className="hidden sm:table-cell px-6 py-4 font-bold border-b border-gray-100">Status</th>
                <th className="hidden xl:table-cell px-6 py-4 font-bold border-b border-gray-100">Date</th>
                <th className="px-6 py-4 font-bold border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-ninja-yellow focus:ring-ninja-yellow" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={contact.name} size="sm" />
                      <div>
                        <p className="font-bold text-ninja-dark">{contact.name}</p>
                        <div className="flex gap-1 mt-1">
                          {contact.tags.map((tag, i) => (
                            <span key={i} className="text-[9px] bg-ninja-purple/10 text-ninja-purple px-1.5 py-0.5 rounded font-bold uppercase">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-ninja-dark truncate max-w-[120px] md:max-w-none">{contact.email}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{contact.phone}</p>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4">
                    <div className="flex items-center gap-2">
                      <SourceIcon source={contact.source} />
                      <span className="text-xs text-gray-600 font-bold">{contact.source}</span>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4">
                    <Badge status={contact.status}>{contact.status}</Badge>
                  </td>
                  <td className="hidden xl:table-cell px-6 py-4 text-xs text-gray-500 font-medium">
                    {contact.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-ninja-dark transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination UI */}
        <div className="px-6 py-4 bg-gray-50/30 flex items-center justify-between border-t border-gray-100">
          <p className="text-xs text-gray-500 font-medium">Showing 1 to 5 of 20 contacts</p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="p-2 h-8 w-8 flex items-center justify-center opacity-50 cursor-not-allowed">
              <ChevronLeft size={16} />
            </Button>
            <div className="flex items-center gap-1">
              <button className="h-8 w-8 text-xs font-bold bg-ninja-yellow text-ninja-dark rounded-lg">1</button>
              <button className="h-8 w-8 text-xs font-bold text-gray-400 hover:text-ninja-dark transition-colors">2</button>
              <button className="h-8 w-8 text-xs font-bold text-gray-400 hover:text-ninja-dark transition-colors">3</button>
            </div>
            <Button variant="secondary" className="p-2 h-8 w-8 flex items-center justify-center hover:bg-white hover:border-ninja-yellow">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Lead">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Name *</label>
              <Input placeholder="Full name" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Company *</label>
              <Input placeholder="Company name" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Email *</label>
              <Input placeholder="email@example.com" type="email" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Phone</label>
              <Input placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Status</label>
              <Select defaultValue="Cold">
                <option value="Cold">Cold</option>
                <option value="Warm">Warm</option>
                <option value="Client">Client</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Owner</label>
              <Select defaultValue="John Smith">
                <option value="John Smith">John Smith</option>
                <option value="Emily Davis">Emily Davis</option>
                <option value="Sarah Lee">Sarah Lee</option>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button>Add Client</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
