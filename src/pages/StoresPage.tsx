import { 
  CheckCircle2, ShoppingCart, Globe, Box, Truck, CreditCard, Play
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, Badge, Button, cn } from '../components/ui';

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
  const completedCount = setupSteps.filter(s => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / setupSteps.length) * 100);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Stores</h1>
        <p className="text-gray-400 font-medium">Integrated e-commerce to sell your products</p>
      </div>

      {/* Setup Guide Panel */}
      <Card className="p-6 md:p-8 bg-white border-ninja-yellow/30 shadow-sm relative overflow-hidden">
        {/* Progress Background Decoration purely visual */}
        <div className="absolute top-0 right-0 p-8 text-ninja-yellow opacity-5 pointer-events-none">
          <ShoppingCart size={200} />
        </div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <h3 className="text-lg font-bold text-ninja-dark">Startup Guide</h3>
            <p className="text-xs text-gray-400 font-medium mt-1">Complete these steps to launch your store</p>
          </div>
          <button className="text-xs font-bold text-gray-400 hover:text-ninja-dark transition-colors">
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

      {/* KPIs and Actions Row */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start lg:items-center">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <Card className="p-5 flex flex-col gap-2 shadow-sm border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Stores</span>
            <span className="text-2xl font-black text-ninja-yellow">1</span>
          </Card>
          <Card className="p-5 flex flex-col gap-2 shadow-sm border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Products</span>
            <span className="text-2xl font-black text-ninja-dark">53</span>
          </Card>
          <Card className="p-5 flex flex-col gap-2 shadow-sm border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Orders</span>
            <span className="text-2xl font-black text-ninja-dark">246</span>
          </Card>
          <Card className="p-5 flex flex-col gap-2 shadow-sm border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</span>
            <span className="text-2xl font-black text-ninja-yellow">$13,300</span>
          </Card>
        </div>
        <Button 
          onClick={() => toast.success('Opening Store Creator...')}
          className="shrink-0 w-full lg:w-auto mt-2 lg:mt-0 font-bold px-6 py-3 shadow-lg shadow-ninja-yellow/20"
        >
          + Create New Store
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

    </div>
  );
};
