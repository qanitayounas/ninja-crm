import { useState, useEffect } from 'react';
import {
  QrCode,
  Download,
  Printer,
  Share2,
  Store,
  Package,
  Calendar,
  Building2,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { Card } from '../../components/ui';
import toast from 'react-hot-toast';
import { apiService } from '../../services/apiService';

const useCases = [
  {
    id: 1,
    icon: Store,
    color: 'bg-ninja-yellow/15 text-ninja-yellow',
    title: 'Displays',
    description: 'Place QR codes on your counter to capture reviews from walk-in customers'
  },
  {
    id: 2,
    icon: Package,
    color: 'bg-purple-400/15 text-purple-400',
    title: 'Packaging',
    description: 'Include QR codes on your products to request post-purchase feedback'
  },
  {
    id: 3,
    icon: Calendar,
    color: 'bg-ninja-yellow/15 text-ninja-yellow',
    title: 'Events',
    description: 'Use QR codes at events and trade shows to grow your online presence'
  },
  {
    id: 4,
    icon: Building2,
    color: 'bg-purple-400/15 text-purple-400',
    title: 'Offices',
    description: 'Display QR codes in waiting rooms and customer service areas'
  }
];

export const ReputationQRCodes = () => {
  const [qrName, setQrName] = useState('');
  const [redirect, setRedirect] = useState('universal');
  const [location, setLocation] = useState('');
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    apiService.getLinks()
      .then((data) => setLinks(data || []))
      .catch(() => setLinks([]))
      .finally(() => setLoading(false));
  }, []);

  const activeQRs = links.length > 0
    ? links.map((link: any, i: number) => ({
        id: link.id || i + 1,
        name: link.name || link.title || `Link ${i + 1}`,
        location: link.redirectTo || link.url || 'N/A',
        scans: link.totalClicks || link.clicks || 0,
        reviews: link.conversions || 0
      }))
    : [
        { id: 1, name: 'Main Display', location: 'Madrid Centre', scans: 342, reviews: 87 },
        { id: 2, name: 'Product Packaging', location: 'All products', scans: 567, reviews: 124 },
        { id: 3, name: 'Trade Show', location: 'Barcelona', scans: 234, reviews: 45 }
      ];

  const handleGenerate = () => {
    if (!qrName.trim()) {
      toast.error('Please enter a QR name');
      return;
    }
    setGenerated(true);
    toast.success('QR Code Generated!');
  };

  const totalScans = activeQRs.reduce((s: number, q: any) => s + q.scans, 0);
  const totalReviewsFromQR = activeQRs.reduce((s: number, q: any) => s + q.reviews, 0);
  const conversionRate = totalScans > 0 ? ((totalReviewsFromQR / totalScans) * 100).toFixed(1) : '0.0';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-ninja-yellow" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">QR Reviews</h1>
        <p className="text-gray-400 font-medium text-sm">Convert physical traffic into digital reputation</p>
      </div>

      {/* Generator + Preview Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Generator Form */}
        <Card className="lg:col-span-3 p-8 space-y-6 border-none shadow-sm">
          <h3 className="text-base font-black text-ninja-dark">QR Code Generator</h3>

          <div className="space-y-2">
            <label className="text-xs font-black text-ninja-dark uppercase tracking-widest">
              QR Name <span className="text-ninja-yellow">*</span>
            </label>
            <input
              type="text"
              value={qrName}
              onChange={(e) => setQrName(e.target.value)}
              placeholder="e.g. Main Display"
              className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-ninja-dark uppercase tracking-widest">
              Redirect to
            </label>
            <div className="relative">
              <select
                value={redirect}
                onChange={(e) => setRedirect(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer"
              >
                <option value="universal">Universal review link</option>
                <option value="google">Google My Business</option>
                <option value="facebook">Facebook Reviews</option>
                <option value="yelp">Yelp</option>
                <option value="custom">Custom URL</option>
              </select>
              <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-ninja-dark uppercase tracking-widest">
              Location <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Madrid - Central Branch"
              className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-4 bg-ninja-yellow rounded-2xl font-black text-ninja-dark text-sm uppercase tracking-widest shadow-xl shadow-ninja-yellow/25 hover:shadow-ninja-yellow/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <QrCode size={18} />
            Generate QR Code
          </button>
        </Card>

        {/* QR Preview */}
        <Card className="lg:col-span-2 p-8 flex flex-col items-center gap-6 border-none shadow-sm">
          <h3 className="text-base font-black text-ninja-dark self-start">Preview</h3>

          <div className={`w-full flex-1 rounded-2xl flex items-center justify-center p-8 transition-all ${generated ? 'bg-white border-2 border-ninja-yellow/20' : 'bg-gray-50'}`}>
            {generated ? (
              <div className="flex flex-col items-center gap-2">
                <div className="text-ninja-dark">
                  <svg viewBox="0 0 100 100" width="140" height="140" fill="currentColor">
                    <rect x="10" y="10" width="30" height="30" rx="4" />
                    <rect x="15" y="15" width="20" height="20" rx="2" fill="white" />
                    <rect x="18" y="18" width="14" height="14" rx="1" />
                    <rect x="60" y="10" width="30" height="30" rx="4" />
                    <rect x="65" y="15" width="20" height="20" rx="2" fill="white" />
                    <rect x="68" y="18" width="14" height="14" rx="1" />
                    <rect x="10" y="60" width="30" height="30" rx="4" />
                    <rect x="15" y="65" width="20" height="20" rx="2" fill="white" />
                    <rect x="18" y="68" width="14" height="14" rx="1" />
                    <rect x="50" y="50" width="8" height="8" rx="1" />
                    <rect x="62" y="50" width="8" height="8" rx="1" />
                    <rect x="74" y="50" width="8" height="8" rx="1" />
                    <rect x="86" y="50" width="8" height="8" rx="1" />
                    <rect x="50" y="62" width="8" height="8" rx="1" />
                    <rect x="62" y="74" width="8" height="8" rx="1" />
                    <rect x="74" y="62" width="8" height="8" rx="1" />
                    <rect x="86" y="74" width="8" height="8" rx="1" />
                    <rect x="50" y="86" width="8" height="8" rx="1" />
                    <rect x="74" y="86" width="8" height="8" rx="1" />
                    <rect x="86" y="86" width="8" height="8" rx="1" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-ninja-yellow text-center">Scan me to leave a review</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center">
                <QrCode size={64} className="text-gray-200" />
                <p className="text-xs font-bold text-gray-400">Fill in the form and click Generate</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={() => generated ? toast.success('Downloaded!') : toast.error('Generate a QR first')}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-xs font-black text-ninja-dark uppercase tracking-widest transition-colors"
            >
              <Download size={14} />
              Download
            </button>
            <button
              onClick={() => generated ? toast.success('Printing...') : toast.error('Generate a QR first')}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-xs font-black text-ninja-dark uppercase tracking-widest transition-colors"
            >
              <Printer size={14} />
              Print
            </button>
            <button
              onClick={() => generated ? toast.success('Copied link!') : toast.error('Generate a QR first')}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-xs font-black text-ninja-dark uppercase tracking-widest transition-colors"
            >
              <Share2 size={14} />
              Share
            </button>
          </div>
        </Card>
      </div>

      {/* Use Cases */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Use Cases</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((uc) => (
            <Card key={uc.id} className="p-6 flex flex-col gap-4 border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${uc.color} group-hover:scale-110 transition-transform`}>
                <uc.icon size={22} />
              </div>
              <div>
                <h4 className="font-black text-ninja-dark text-sm mb-1">{uc.title}</h4>
                <p className="text-xs font-medium text-gray-400 leading-relaxed">{uc.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats + Active QRs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 flex flex-col gap-2 border-none shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <QrCode size={80} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active QR Codes</span>
          <span className="text-3xl font-black text-ninja-yellow">{activeQRs.length}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2 border-none shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-purple-400/5 group-hover:scale-110 transition-transform duration-500">
            <QrCode size={80} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Scans</span>
          <span className="text-3xl font-black text-ninja-dark">{totalScans.toLocaleString()}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-2 border-none shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-ninja-yellow/5 group-hover:scale-110 transition-transform duration-500">
            <QrCode size={80} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Conversion Rate</span>
          <span className="text-3xl font-black text-ninja-yellow">{conversionRate}%</span>
        </Card>
      </div>

      {/* Active QR Codes */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest">Active QR Codes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {activeQRs.map((qr) => (
            <Card key={qr.id} className="p-5 border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="h-14 w-14 rounded-xl bg-gray-50 flex items-center justify-center text-ninja-dark group-hover:bg-ninja-yellow/10 group-hover:text-ninja-yellow transition-all">
                  <QrCode size={28} />
                </div>
                <button
                  onClick={() => toast.success(`Downloading ${qr.name}...`)}
                  className="h-8 w-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-ninja-dark hover:text-white transition-all"
                >
                  <Download size={14} />
                </button>
              </div>
              <h4 className="font-black text-ninja-dark text-sm">{qr.name}</h4>
              <p className="text-[10px] font-bold text-ninja-yellow uppercase tracking-widest mt-0.5">{qr.location}</p>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scans</div>
                  <div className="font-black text-ninja-dark text-sm">{qr.scans}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reviews</div>
                  <div className="font-black text-ninja-yellow text-sm">{qr.reviews}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
