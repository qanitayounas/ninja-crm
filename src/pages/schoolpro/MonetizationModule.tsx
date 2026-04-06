import { useState, useEffect } from 'react';
import {
  DollarSign,
  RefreshCw,
  TrendingUp,
  Package,
  Eye,
  Edit,
  Settings,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Card, cn } from '../../components/ui';
import { apiService } from '../../services/apiService';
import {
  revenueDistribution,
  subscriptionPlans,
  subscriptionSummary
} from '../../data/monetizationData';

type MonTab = 'overview' | 'pricing' | 'subscriptions';

const iconMap: Record<string, JSX.Element> = {
  dollar: <DollarSign size={20} />,
  refresh: <RefreshCw size={20} />,
  trending: <TrendingUp size={20} />,
  package: <Package size={20} />
};
const colorMap: Record<string, string> = {
  dollar: 'bg-ninja-yellow text-ninja-dark',
  refresh: 'bg-purple-100 text-purple-600',
  trending: 'bg-ninja-yellow/20 text-ninja-dark',
  package: 'bg-purple-100 text-purple-600'
};

const OverviewView = ({ revenueEvolutionData, salesByProductData }: { revenueEvolutionData: any[]; salesByProductData: any[] }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 p-6 border-none shadow-sm">
        <h3 className="font-black text-ninja-dark text-lg mb-8">Revenue Evolution</h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueEvolutionData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="revenue" stroke="#0F0F0F" strokeWidth={3} dot={{ r: 5, fill: '#0F0F0F', strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 border-none shadow-sm flex flex-col">
        <h3 className="font-black text-ninja-dark text-lg mb-6">Revenue Distribution</h3>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueDistribution} cx="50%" cy="50%" outerRadius={75} innerRadius={40} paddingAngle={6} dataKey="value" stroke="none">
                  {revenueDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full space-y-3 mt-4">
            {revenueDistribution.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-sm font-black text-ninja-dark">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>

    <Card className="p-6 border-none shadow-sm">
      <h3 className="font-black text-ninja-dark text-lg mb-8">Sales by Product Type</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesByProductData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }} />
            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="sales" fill="#0F0F0F" radius={[8, 8, 0, 0]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
);

const PricingView = ({ pricingModels }: { pricingModels: any[] }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-black text-ninja-dark uppercase tracking-tight">Active Pricing Models</h2>
      <input placeholder="Search..." className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ninja-yellow/20 shadow-sm" />
    </div>

    <Card className="border-none shadow-sm overflow-hidden rounded-3xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              {['Product', 'Type', 'Price', 'Sales', 'Revenue', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pricingModels.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 group transition-colors">
                <td className="px-6 py-4 text-sm font-black text-ninja-yellow cursor-pointer hover:underline">{row.product}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-500">{row.type}</td>
                <td className="px-6 py-4 text-sm font-black text-ninja-dark">{row.price}</td>
                <td className="px-6 py-4 text-sm font-black text-ninja-dark">{row.sales}</td>
                <td className="px-6 py-4 text-sm font-black text-green-600">{row.revenue}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase">{row.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-ninja-dark transition-colors"><Eye size={14} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-ninja-dark transition-colors"><Edit size={14} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-ninja-dark transition-colors"><Settings size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: 'Individual Course', subtitle: 'One-time payment for full course access', icon: <DollarSign size={28} />, color: 'bg-ninja-yellow text-ninja-dark' },
        { title: 'Subscription', subtitle: 'Recurring payments with continuous access', icon: <RefreshCw size={28} />, color: 'bg-purple-500 text-white' },
        { title: 'Bundle', subtitle: 'Course bundle at a special price', icon: <Package size={28} />, color: 'bg-ninja-yellow text-ninja-dark' }
      ].map((type, i) => (
        <Card key={i} className="p-8 border-none shadow-sm rounded-[2rem] flex flex-col items-center text-center gap-5 hover:shadow-xl transition-all group hover:-translate-y-1">
          <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg", type.color)}>
            {type.icon}
          </div>
          <div>
            <h3 className="text-xl font-black text-ninja-dark mb-1 group-hover:text-ninja-yellow transition-colors">{type.title}</h3>
            <p className="text-xs font-medium text-gray-400 leading-relaxed">{type.subtitle}</p>
          </div>
          <button className="w-full py-3 border-2 border-gray-100 text-ninja-dark rounded-xl text-xs font-black uppercase tracking-widest hover:bg-ninja-dark hover:text-white hover:border-ninja-dark transition-all">
            Configure
          </button>
        </Card>
      ))}
    </div>
  </div>
);

const SubscriptionsView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {subscriptionPlans.map((plan, i) => (
        <Card key={i} className={cn(
          "p-8 rounded-[2rem] border-2 hover:shadow-xl transition-all group hover:-translate-y-1 relative overflow-hidden",
          plan.isPopular ? "border-ninja-yellow shadow-lg shadow-ninja-yellow/10" : "border-transparent shadow-sm bg-white"
        )}>
          {plan.isPopular && (
            <div className="absolute top-6 right-6 px-3 py-1 bg-ninja-yellow text-ninja-dark text-[10px] font-black uppercase rounded-full tracking-widest">Most Popular</div>
          )}
          <h3 className="text-2xl font-black text-ninja-dark mb-2 group-hover:text-ninja-yellow transition-colors">{plan.name}</h3>
          <div className="flex items-end gap-1 mb-6">
            <span className="text-4xl font-black text-ninja-dark">{plan.price}</span>
            <span className="text-sm font-bold text-gray-400 mb-1">{plan.period}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 py-5 border-y border-gray-100 mb-6">
            <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Subscribers</p><p className="text-lg font-black text-ninja-dark">{plan.subscribers}</p></div>
            <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">MRR</p><p className="text-lg font-black text-green-600">{plan.mrr}</p></div>
            <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Churn</p><p className="text-lg font-black text-orange-500">{plan.churnRate}</p></div>
          </div>

          <ul className="space-y-3 mb-6">
            {plan.features.map((f, j) => (
              <li key={j} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                <span className="text-sm font-medium text-gray-600">{f}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            <button className={cn("flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", plan.isPopular ? "bg-ninja-yellow text-ninja-dark hover:scale-105" : "bg-gray-50 text-ninja-dark hover:bg-ninja-dark hover:text-white")}>
              <Edit size={14} className="inline mr-1.5" />Edit
            </button>
            <button className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-ninja-dark transition-colors"><Settings size={16} /></button>
          </div>
        </Card>
      ))}
    </div>

    <Card className="p-8 border-none shadow-sm rounded-[2rem]">
      <h3 className="text-lg font-black text-ninja-dark uppercase tracking-tight mb-8">Subscription Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {subscriptionSummary.map((s, i) => (
          <div key={i}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
            <p className={cn("text-2xl font-black", s.isWarning ? "text-orange-500" : "text-ninja-dark")}>{s.value}</p>
            <p className="text-[10px] font-bold text-gray-400 mt-0.5">{s.subtext}</p>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// Fallback chart data
const fallbackRevenueEvolution = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 18500 },
  { month: 'Mar', revenue: 15000 },
  { month: 'Apr', revenue: 25000 },
  { month: 'May', revenue: 22000 },
  { month: 'Jun', revenue: 30000 }
];
const fallbackSalesByProduct = [
  { month: 'Jan', sales: 11000 },
  { month: 'Feb', sales: 16500 },
  { month: 'Mar', sales: 15000 },
  { month: 'Apr', sales: 25000 },
  { month: 'May', sales: 21000 },
  { month: 'Jun', sales: 30000 }
];

export const MonetizationModule = () => {
  const [tab, setTab] = useState<MonTab>('overview');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      apiService.getOrders().catch(() => []),
      apiService.getProducts().catch(() => [])
    ]).then(([ordersData, productsData]) => {
      setOrders(ordersData || []);
      setProducts(productsData || []);
    }).finally(() => setLoading(false));
  }, []);

  const totalRevenue = orders.reduce((s: number, o: any) => s + (o.amount || o.total || 0), 0);
  const totalSales = orders.length;
  const aov = totalSales > 0 ? (totalRevenue / totalSales).toFixed(0) : '0';

  const monetizationMetrics = [
    { label: 'Total Revenue', value: totalRevenue > 0 ? `$${totalRevenue.toLocaleString()}` : '$0', subtext: 'from orders', badge: `${totalSales}`, icon: 'dollar' },
    { label: 'Products', value: String(products.length), subtext: 'available products', badge: String(products.length), icon: 'package' },
    { label: 'AOV', value: `$${aov}`, subtext: 'average order value', badge: `$${aov}`, icon: 'trending' },
    { label: 'Total Sales', value: String(totalSales), subtext: 'orders', badge: String(totalSales), icon: 'refresh' }
  ];

  const pricingModels = products.length > 0
    ? products.map((p: any) => ({
        product: p.name || p.title || 'Product',
        type: p.productType || p.type || 'Product',
        price: p.price ? `$${p.price}` : '$0',
        sales: p.salesCount || 0,
        revenue: p.price && p.salesCount ? `$${(p.price * p.salesCount).toLocaleString()}` : '$0',
        status: p.status || 'Active'
      }))
    : [
        { product: 'No products found', type: '-', price: '-', sales: 0, revenue: '-', status: '-' }
      ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-ninja-yellow" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {monetizationMetrics.map((m, i) => (
          <Card key={i} className="p-6 border-none shadow-sm bg-white hover:scale-[1.02] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", colorMap[m.icon])}>
                {iconMap[m.icon]}
              </div>
              <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">{m.badge}</span>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
            <h4 className="text-2xl font-black text-ninja-dark">{m.value}</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">{m.subtext}</p>
          </Card>
        ))}
      </div>

      <div className="w-full overflow-x-auto scrollbar-none -mx-1 px-1">
        <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-max min-w-full sm:w-fit sm:min-w-0">
          {(['overview', 'pricing', 'subscriptions'] as MonTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all capitalize whitespace-nowrap",
                tab === t ? "bg-ninja-dark text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {t === 'pricing' ? 'Pricing Models' : t}
            </button>
          ))}
        </div>
      </div>

      {tab === 'overview' && <OverviewView revenueEvolutionData={fallbackRevenueEvolution} salesByProductData={fallbackSalesByProduct} />}
      {tab === 'pricing' && <PricingView pricingModels={pricingModels} />}
      {tab === 'subscriptions' && <SubscriptionsView />}
    </div>
  );
};
