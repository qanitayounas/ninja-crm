import { 
  Zap, 
  Shield, 
  Database, 
  Cloud, 
  CheckCircle2, 
  ChevronRight,
  Code
} from 'lucide-react';
import { Card, Button, cn } from '../components/ui';
import toast from 'react-hot-toast';

const features = [
  {
    title: 'Instant Migrations',
    description: 'Migrate your WordPress site in minutes',
    icon: Zap,
    color: 'text-ninja-yellow',
    bg: 'bg-ninja-yellow/10'
  },
  {
    title: 'Free SSL & Global CDN',
    description: 'Security and speed included',
    icon: Shield,
    color: 'text-green-500',
    bg: 'bg-green-50'
  },
  {
    title: 'Automatic Backups',
    description: 'Automatic daily backups',
    icon: Database,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    title: 'Centralized Management',
    description: 'Domains, plugins, and updates',
    icon: Cloud,
    color: 'text-purple-500',
    bg: 'bg-purple-50'
  }
];

const benefits = [
  'Reinforced security with integrated firewall',
  'Fast onboarding in under 5 minutes',
  'Accelerated launch with global CDN',
  'Automatic WordPress and plugin updates'
];

export const WordPressPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">WordPress</h1>
        <p className="text-gray-400 font-medium font-bold uppercase tracking-widest text-[10px]">Integration and management of WordPress sites</p>
      </div>

      {/* Hero Section */}
      <Card className="relative overflow-hidden bg-ninja-dark p-10 md:p-16 border-none shadow-2xl rounded-[40px] group transition-all duration-500 hover:scale-[1.01]">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 p-10 text-ninja-yellow opacity-[0.03] pointer-events-none -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700">
          <Code size={400} />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
          <div className="w-20 h-20 bg-ninja-yellow rounded-3xl flex items-center justify-center shadow-xl shadow-ninja-yellow/20 animate-bounce-slow">
            <Code size={40} className="text-ninja-dark" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Power Up your <span className="text-ninja-yellow">WordPress</span> Sites
            </h2>
            <p className="text-gray-400 font-medium text-lg">
              Optimized hosting, reinforced security, and centralized management for your WordPress sites.
            </p>
          </div>

          <Button 
            onClick={() => toast.success('WordPress Activation Started!')}
            className="px-10 py-5 rounded-2xl font-black text-base uppercase tracking-widest bg-ninja-yellow hover:bg-white text-ninja-dark border-none shadow-2xl shadow-ninja-yellow/30 flex items-center gap-3 transition-all hover:-translate-y-1 active:translate-y-0"
          >
            Activate WordPress
            <ChevronRight size={20} />
          </Button>
        </div>
      </Card>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <Card key={idx} className="p-8 border-none shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", feature.bg)}>
              <feature.icon className={feature.color} size={28} />
            </div>
            <h3 className="text-lg font-black text-ninja-dark mb-2 tracking-tight">{feature.title}</h3>
            <p className="text-gray-400 font-medium text-sm leading-relaxed">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <Card className="p-10 border-none shadow-sm overflow-hidden relative">
        <div className="absolute right-0 top-0 p-10 text-green-500/5 pointer-events-none -mr-10 -mt-10">
          <CheckCircle2 size={160} />
        </div>
        
        <h3 className="text-xl font-black text-ninja-dark mb-10 tracking-tight flex items-center gap-3">
          <div className="w-2 h-8 bg-ninja-yellow rounded-full" />
          Key Benefits
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-4 group cursor-default">
              <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:scale-125 transition-transform">
                <CheckCircle2 size={14} className="text-green-500" />
              </div>
              <span className="text-sm font-bold text-gray-500 group-hover:text-ninja-dark transition-colors">{benefit}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
