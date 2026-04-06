import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, ShoppingCart, Globe, Box, Truck, CreditCard, Play, X, ChevronDown, Plus
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, Badge, Button, cn } from '../components/ui';
import { apiService } from '../services/apiService';

const setupSteps = [
  { 
    id: 1, 
    title: 'Create & Customize Store', 
    desc: 'Configure design and branding', 
    icon: ShoppingCart, 
    isCompleted: true, 
    color: 'text-ninja-yellow', 
    bg: 'bg-ninja-yellow/20',
    border: 'border-ninja-yellow'
  },
  { 
    id: 2, 
    title: 'Connect Domain', 
    desc: 'Link your custom domain', 
    icon: Globe, 
    isCompleted: true, 
    color: 'text-ninja-yellow', 
    bg: 'bg-ninja-yellow/20',
    border: 'border-ninja-yellow'
  },
  { 
    id: 3, 
    title: 'Add Products', 
    desc: 'Upload your product catalog', 
    icon: Box, 
    isCompleted: false, 
    color: 'text-gray-400', 
    bg: 'bg-gray-100',
    border: 'border-transparent'
  },
  { 
    id: 4, 
    title: 'Setup Payment Provider', 
    desc: 'Stripe, PayPal, etc.', 
    icon: CreditCard, 
    isCompleted: false, 
    color: 'text-gray-400', 
    bg: 'bg-gray-100',
    border: 'border-transparent'
  },
  { 
    id: 5, 
    title: 'Configure Shipping', 
    desc: 'Shipping zones and rates', 
    icon: Truck, 
    isCompleted: false, 
    color: 'text-gray-400', 
    bg: 'bg-gray-100',
    border: 'border-transparent'
  },
  { 
    id: 6, 
    title: 'Place Test Order', 
    desc: 'Verify the complete checkout process', 
    icon: CheckCircle2, 
    isCompleted: false, 
    color: 'text-gray-400', 
    bg: 'bg-gray-100',
    border: 'border-transparent'
  },
  { 
    id: 7, 
    title: 'Automate Events', 
    desc: 'Abandoned cart, follow-ups', 
    icon: Play, 
    isCompleted: false, 
    color: 'text-gray-400', 
    bg: 'bg-gray-100',
    border: 'border-transparent'
  },
];

export const StoresPage = () => {
  const [showGuide, setShowGuide] = React.useState(true);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [_isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoreData();
  }, []);

  const loadStoreData = async () => {
    setIsLoading(true);
    try {
      const [prodsData, ordersData, collsData] = await Promise.allSettled([
        apiService.getProducts(),
        apiService.getOrders(),
        apiService.getProductCollections()
      ]);
      if (prodsData.status === 'fulfilled') setProducts(prodsData.value || []);
      if (ordersData.status === 'fulfilled') setOrders(ordersData.value || []);
      if (collsData.status === 'fulfilled') setCollections(collsData.value || []);
    } catch (error) {
      console.error('Error loading store data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalRevenue = orders.reduce((acc, o) => acc + (o.amount || 0), 0);

  const completedCount = setupSteps.filter(s => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / setupSteps.length) * 100);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Stores</h1>
          {!showGuide && (
            <Button 
              variant="secondary" 
              onClick={() => setShowGuide(true)}
              className="text-[10px] font-black uppercase tracking-widest border-ninja-yellow/50 text-ninja-dark hover:bg-ninja-yellow/5"
            >
              Show Guide
            </Button>
          )}
        </div>
        <p className="text-gray-400 font-medium">Integrated e-commerce to sell your products</p>
      </div>

      {/* Setup Guide Panel */}
      {showGuide && (
        <Card className="p-6 md:p-8 bg-white border-ninja-yellow/30 shadow-sm relative overflow-hidden animate-in slide-in-from-top-4 duration-300">
          <div className="absolute top-0 right-0 p-8 text-ninja-yellow opacity-5 pointer-events-none">
            <ShoppingCart size={200} />
          </div>

          <div className="flex items-center justify-between mb-6 relative z-10">
            <div>
              <h3 className="text-lg font-bold text-ninja-dark">Startup Guide</h3>
              <p className="text-xs text-gray-400 font-medium mt-1">Complete these steps to launch your store</p>
            </div>
            <button 
              onClick={() => setShowGuide(false)}
              className="text-xs font-bold text-gray-400 hover:text-ninja-dark transition-colors"
            >
              Hide
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative z-10">
            {setupSteps.map((step) => (
              <div 
                key={step.id} 
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-sm",
                  step.bg,
                  step.border === 'border-transparent' ? 'border-gray-50 hover:border-gray-200' : step.border
                )}
              >
                <div className={cn("p-2.5 rounded-xl shrink-0 flex items-center justify-center", step.isCompleted ? "bg-ninja-yellow text-ninja-dark" : "bg-white text-gray-400 shadow-sm")}>
                  <step.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className={cn("font-bold text-sm truncate", step.isCompleted ? "text-ninja-dark" : "text-gray-600")}>
                      {step.title}
                    </h4>
                    {step.isCompleted && <CheckCircle2 size={14} className="text-ninja-yellow shrink-0" />}
                  </div>
                  <p className="text-[11px] font-medium text-gray-400 truncate mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-ninja-dark">Progress: {completedCount}/{setupSteps.length}</span>
              <span className="text-gray-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-ninja-yellow rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* KPIs and Actions Row */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start lg:items-center">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <Card className="p-5 flex flex-col gap-2 shadow-sm border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Collections</span>
            <span className="text-2xl font-black text-ninja-yellow">{collections.length}</span>
          </Card>
          <Card className="p-5 flex flex-col gap-2 shadow-sm border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total Products</span>
            <span className="text-2xl font-black text-ninja-dark">{products.length}</span>
          </Card>
          <Card className="p-5 flex flex-col gap-2 shadow-sm border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total Orders</span>
            <span className="text-2xl font-black text-ninja-dark">{orders.length}</span>
          </Card>
          <Card className="p-5 flex flex-col gap-2 shadow-sm border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Revenue</span>
            <span className="text-2xl font-black text-ninja-yellow">${(totalRevenue / 100).toLocaleString()}</span>
          </Card>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="shrink-0 w-full lg:w-auto mt-2 lg:mt-0 font-bold px-6 py-3 shadow-lg shadow-ninja-yellow/20 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus size={20} />
          Create New Store
        </Button>
      </div>

      {/* Stores List */}
      <div className="space-y-4">
        {/* Store Card 1 */}
        <Card className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-ninja-yellow/10 text-ninja-yellow rounded-2xl shrink-0 group-hover:scale-110 transition-transform">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-ninja-dark mb-1">Main Store</h3>
              <Badge status="Active" className="bg-ninja-yellow/20 text-ninja-dark border-none font-bold text-[10px] uppercase">
                Active
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto justify-between md:justify-end border-t border-gray-50 md:border-none pt-4 md:pt-0 mt-4 md:mt-0">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Products</span>
              <span className="text-lg font-black text-ninja-dark">45</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Orders</span>
              <span className="text-lg font-black text-ninja-dark">234</span>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</span>
              <span className="text-lg font-black text-ninja-yellow">$12,450</span>
            </div>
          </div>
        </Card>

        {/* Store Card 2 */}
        <Card className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border-gray-100 hover:shadow-md transition-shadow cursor-pointer group opacity-70">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-gray-50 text-gray-400 rounded-2xl shrink-0 group-hover:bg-gray-100 transition-colors">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-ninja-dark mb-1">Test Store</h3>
              <Badge status="Pending" className="bg-gray-100 text-gray-500 border-none font-bold text-[10px] uppercase">
                In Development
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto justify-between md:justify-end border-t border-gray-50 md:border-none pt-4 md:pt-0 mt-4 md:mt-0">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Products</span>
              <span className="text-lg font-black text-ninja-dark">8</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Orders</span>
              <span className="text-lg font-black text-ninja-dark">12</span>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</span>
              <span className="text-lg font-black text-ninja-yellow">$850</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowCreateModal(false)} />
          <Card className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200 border-none">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-ninja-dark transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-ninja-dark tracking-tighter">Create New Store</h2>
              <p className="text-gray-400 font-medium text-sm mt-1">Configure your online store</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Store Name <span className="text-ninja-yellow">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. My Online Store"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Currency
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer">
                    <option>USD - Dollar</option>
                    <option>EUR - Euro</option>
                    <option>MXN - Mexican Peso</option>
                    <option>COP - Colombian Peso</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-ninja-dark uppercase tracking-widest flex items-center gap-1.5">
                  Template
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-ninja-yellow focus:ring-4 focus:ring-ninja-yellow/10 transition-all outline-none font-bold text-sm text-ninja-dark appearance-none cursor-pointer">
                    <option>Modern</option>
                    <option>Minimalist</option>
                    <option>Elegant</option>
                    <option>Corporate</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <Button 
                onClick={() => {
                  toast.success('Store Created Successfully!');
                  setShowCreateModal(false);
                }}
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-ninja-yellow/20 mt-4"
              >
                Create Store
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
