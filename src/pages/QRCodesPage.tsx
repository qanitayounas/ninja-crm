import React from 'react';
import { 
  QrCode, 
  Scan, 
  MousePointer2, 
  Layout, 
  Plus, 
  X, 
  ChevronDown, 
  Download,
  Link as LinkIcon,
  MessageSquare,
  Phone,
  Mail,
  Smartphone,
  CreditCard,
  MessageCircle,
  Trello,
  FileText,
  ClipboardList,
  Palette,
  Upload
} from 'lucide-react';
import { Card, Badge, Button } from '../components/ui';
import toast from 'react-hot-toast';

const qrTypes = [
  { id: 'url', name: 'URL', icon: LinkIcon },
  { id: 'review', name: 'Review Link', icon: MessageSquare },
  { id: 'call', name: 'Call', icon: Phone },
  { id: 'sms', name: 'SMS', icon: Smartphone },
  { id: 'email', name: 'Email', icon: Mail },
  { id: 'pay', name: 'Payment', icon: CreditCard },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle },
  { id: 'funnel', name: 'Funnel', icon: Trello },
  { id: 'form', name: 'Form', icon: FileText },
  { id: 'survey', name: 'Survey', icon: ClipboardList }
];

const activeQRs = [
  {
    id: 1,
    name: 'Main Website QR',
    type: 'URL',
    scans: 1245,
    unique: 890,
    created: '15/3/2026'
  },
  {
    id: 2,
    name: 'Sales WhatsApp QR',
    type: 'WhatsApp',
    scans: 678,
    unique: 534,
    created: '18/3/2026'
  },
  {
    id: 3,
    name: 'Contact Form QR',
    type: 'Form',
    scans: 456,
    unique: 345,
    created: '19/3/2026'
  },
  {
    id: 4,
    name: 'Google Review QR',
    type: 'Review Link',
    scans: 234,
    unique: 198,
    created: '20/3/2026'
  }
];

export const QRCodesPage = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [selectedColor] = React.useState('#D4FF00');

  const filteredQRs = activeQRs;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">QR Codes</h1>
        <p className="text-gray-400 font-medium font-bold text-sm">Custom dynamic QR codes with tracking</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <Card className="p-6 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <QrCode size={80} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total QRs</span>
          <span className="text-3xl font-black text-ninja-dark font-black">4</span>
        </Card>
        
        <Card className="p-6 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <Scan size={80} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Scans</span>
          <span className="text-3xl font-black text-ninja-yellow font-black">2613</span>
        </Card>

        <Card className="p-6 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-110 transition-transform duration-500">
            <MousePointer2 size={80} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Unique Scans</span>
          <span className="text-3xl font-black text-purple-500/30 font-black">1967</span>
        </Card>

        <Card className="p-6 flex flex-col gap-2 shadow-sm border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-blue-500/5 group-hover:scale-110 transition-transform duration-500">
            <Layout size={80} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Available Types</span>
          <span className="text-3xl font-black text-ninja-dark font-black">10</span>
        </Card>
      </div>

      {/* Available Types Showcase */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Available QR Types</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {qrTypes.map((type) => (
            <Card key={type.id} className="p-4 flex flex-col items-center justify-center gap-3 border-gray-50 hover:border-ninja-yellow/30 hover:bg-ninja-yellow/5 transition-all cursor-pointer group shadow-none">
              <div className="h-10 w-10 rounded-xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow group-hover:scale-110 transition-transform">
                <type.icon size={18} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">{type.name}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest whitespace-nowrap">Active QR Codes</h3>
          <button className="text-[10px] font-black text-ninja-yellow uppercase tracking-widest hover:underline flex items-center gap-1">
            <Upload size={12} />
            Bulk CSV Upload
          </button>
        </div>

        <Button 
          onClick={() => setShowCreateModal(true)}
          className="w-full md:w-auto font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-ninja-yellow/20 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus size={20} />
          Create QR Code
        </Button>
      </div>

      {/* QR Codes Table */}
      <Card className="overflow-hidden border-none shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Scans</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Unique</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Created</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredQRs.map((qr) => (
                <tr key={qr.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                  <td className="px-6 py-4">
                    <span className="font-black text-ninja-dark group-hover:text-ninja-yellow transition-colors">{qr.name}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-bold text-ninja-dark">
                    <Badge status="success" className="bg-ninja-yellow/20 text-ninja-dark border-ninja-yellow/20 font-black">
                      {qr.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center font-black text-ninja-dark text-sm">
                    <div className="flex items-center justify-center gap-1.5">
                      <Scan size={14} className="text-gray-400" />
                      {qr.scans}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-black text-purple-500/40 text-sm">
                    {qr.unique}
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-bold text-gray-400">
                    {qr.created}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1.5 text-[10px] font-black text-ninja-dark uppercase tracking-widest hover:text-ninja-yellow transition-colors">
                      <Download size={14} />
                      Download
                    </button>
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
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-ninja-dark transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-black text-ninja-dark tracking-tighter">Create QR Code</h2>
              <p className="text-gray-400 font-medium text-sm mt-1">Configure your dynamic QR</p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  QR Name <span className="text-ninja-yellow">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Website QR"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark font-bold font-bold font-bold font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  QR Type
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer font-bold font-bold font-bold font-bold">
                    {qrTypes.map(type => (
                      <option key={type.id}>{type.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Destination (URL, Phone, etc.)
                </label>
                <input 
                  type="text" 
                  placeholder="https://example.com"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark font-bold font-bold font-bold font-bold"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  QR Color
                </label>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-100">
                    <div 
                      className="h-10 flex-1 rounded-xl shadow-lg border border-ninja-dark/10" 
                      style={{ backgroundColor: selectedColor }}
                    />
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group cursor-pointer hover:border-ninja-yellow transition-colors">
                      <Palette size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => {
                  toast.success('QR Code Created Successfully!');
                  setShowCreateModal(false);
                }}
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-ninja-yellow/20 mt-4 flex items-center justify-center gap-2 font-bold font-bold font-bold font-bold"
              >
                Create QR
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
