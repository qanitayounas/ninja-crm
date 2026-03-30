import { 
  Eye, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Clock, 
  PieChart, 
  ChevronDown,
  Monitor,
  Smartphone,
  Tablet,
  Globe
} from 'lucide-react';
import { Card, cn } from '../components/ui';

const kpis = [
  { label: 'Page Views', value: '45,678', trend: '+12% vs previous period', icon: Eye, color: 'text-ninja-yellow', bg: 'bg-ninja-yellow/10' },
  { label: 'Unique Visitors', value: '28,945', trend: '+8% vs previous period', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Sales', value: '234', trend: '+23% vs previous period', icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Conversion Rate', value: '5.2%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Average Time', value: '3:45', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Exit before 30s', value: '28%', icon: PieChart, color: 'text-red-500', bg: 'bg-red-50' },
];

const countries = [
  { name: 'United States', value: '12,450', percent: 65 },
  { name: 'Mexico', value: '8,234', percent: 45 },
  { name: 'Spain', value: '4,567', percent: 25 },
  { name: 'Colombia', value: '3,734', percent: 20 },
];

const browsers = [
  { name: 'Chrome', percent: 68, color: 'bg-blue-500' },
  { name: 'Safari', percent: 18, color: 'bg-blue-400' },
  { name: 'Firefox', percent: 9, color: 'bg-orange-500' },
  { name: 'Edge', percent: 5, color: 'bg-blue-600' },
];

const devices = [
  { name: 'Desktop', value: '15,678', percent: 54, icon: Monitor },
  { name: 'Mobile', value: '10,234', percent: 35, icon: Smartphone },
  { name: 'Tablet', value: '3,033', percent: 11, icon: Tablet },
];

const channels = [
  { name: 'Organic Search', value: '12,450', percent: 75, color: 'bg-ninja-yellow' },
  { name: 'Direct', value: '8,234', percent: 55, color: 'bg-purple-400' },
  { name: 'Social Media', percent: 15, color: 'bg-blue-400' },
  { name: 'Referrals', percent: 5, color: 'bg-gray-400' },
];

export const AnalyticsPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Analytics</h1>
        <p className="text-gray-400 font-medium font-bold">Complete site performance dashboard</p>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative group">
          <select className="pl-4 pr-10 py-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-sm font-bold text-ninja-dark outline-none appearance-none cursor-pointer focus:border-ninja-yellow transition-colors">
            <option>Websites</option>
            <option>Stores</option>
            <option>Webinars</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative group">
          <select className="pl-4 pr-10 py-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-sm font-bold text-ninja-dark outline-none appearance-none cursor-pointer focus:border-ninja-yellow transition-colors">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
            <option>Custom</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="p-6 md:p-8 border-none shadow-sm flex flex-col gap-4 group hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-xl", kpi.bg)}>
                <kpi.icon className={kpi.color} size={20} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</span>
            </div>
            <div>
              <div className="text-3xl font-black text-ninja-dark leading-tight">{kpi.value}</div>
              {kpi.trend && (
                <div className="text-[10px] font-bold text-green-500 mt-1 uppercase tracking-tight">{kpi.trend}</div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Distribution Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits by Country */}
        <Card className="p-6 border-none shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <Globe size={18} className="text-ninja-yellow" />
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest leading-none">Visits by Country</h3>
          </div>
          <div className="space-y-6">
            {countries.map((country, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                  <span className="text-gray-400">{country.name}</span>
                  <span className="text-ninja-dark">{country.value}</span>
                </div>
                <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-ninja-yellow rounded-full transition-all duration-1000"
                    style={{ width: `${country.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Browsers */}
        <Card className="p-6 border-none shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <Monitor size={18} className="text-blue-500" />
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest leading-none">Main Browsers</h3>
          </div>
          <div className="space-y-6">
            {browsers.map((browser, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                  <span className="text-gray-400">{browser.name}</span>
                  <span className="text-ninja-dark">{browser.percent}%</span>
                </div>
                <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-1000", browser.color)}
                    style={{ width: `${browser.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Traffic by Device */}
        <Card className="p-6 border-none shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <Smartphone size={18} className="text-purple-500" />
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest leading-none">Traffic by Device</h3>
          </div>
          <div className="space-y-4">
            {devices.map((device, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl group hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    <device.icon size={20} className="text-gray-400 group-hover:text-ninja-dark" />
                  </div>
                  <span className="text-sm font-black text-ninja-dark">{device.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-ninja-dark">{device.value}</div>
                  <div className="text-[10px] font-bold text-gray-400">{device.percent}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Acquisition Channels */}
        <Card className="p-6 border-none shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp size={18} className="text-green-500" />
            <h3 className="text-sm font-black text-ninja-dark uppercase tracking-widest leading-none">Acquisition Channels</h3>
          </div>
          <div className="space-y-6">
            {channels.map((channel, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                  <span className="text-gray-400">{channel.name}</span>
                  {channel.value && <span className="text-ninja-dark">{channel.value}</span>}
                </div>
                <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-1000", channel.color || 'bg-gray-200')}
                    style={{ width: `${channel.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
