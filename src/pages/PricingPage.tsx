import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Zap, Users, MessageSquare, Target, Activity, ZapIcon, BarChart3, Star, Mail, LineChart,
  Lock, CreditCard, RefreshCw, ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '../components/ui';

export const PricingPage = () => {
  return (
    <div className="min-h-screen bg-ninja-dark text-white font-sans selection:bg-ninja-yellow selection:text-ninja-dark">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-ninja-yellow">
          <div className="bg-ninja-yellow rounded-xl p-1">
            <span className="font-black text-ninja-dark text-xl px-2">N</span>
          </div>
          <span className="font-black tracking-tighter text-2xl text-white">Ninja</span>
        </div>
        <Link 
          to="/dashboard" 
          className="bg-white/5 hover:bg-white/10 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm border border-white/10"
        >
          Go to Dashboard
        </Link>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-ninja-yellow/5 text-ninja-yellow border border-ninja-yellow/20 px-4 py-1.5 rounded-full mb-8">
          <Zap size={14} className="fill-ninja-yellow" />
          <span className="text-xs font-bold uppercase tracking-widest">Premium CRM Platform</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
          Choose Your Perfect Plan
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl text-balance leading-relaxed">
          Unlock the power of modern CRM with Ninja. Select a plan and preview your dashboard.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Starter Plan */}
          <div className="bg-[#111113] rounded-[2rem] p-8 md:p-10 border border-white/5 flex flex-col relative transition-transform hover:-translate-y-2 duration-300">
            <h3 className="text-2xl font-black mb-2">Starter</h3>
            <p className="text-sm text-gray-400 font-medium mb-8">Essential CRM for small teams</p>
            
            <div className="flex items-end gap-1 mb-8">
              <span className="text-5xl font-black">$29</span>
              <span className="text-xs text-gray-400 font-bold mb-2">per user/month</span>
            </div>

            {/* Dashboard Preview Thumbnail */}
            <div className="bg-[#1A1A1D] rounded-2xl p-4 mb-8 border border-white/5">
              <p className="text-[10px] text-gray-400 font-bold mb-3">Dashboard Preview</p>
              <div className="flex gap-2 mb-3">
                <div className="bg-[#111113] rounded-xl p-3 flex-1">
                  <span className="text-gray-500"><Users size={12} /></span>
                  <p className="font-bold text-sm mt-1">24</p>
                  <p className="text-[9px] text-gray-500">Leads</p>
                </div>
                <div className="bg-[#111113] rounded-xl p-3 flex-1">
                  <span className="text-gray-500"><MessageSquare size={12} /></span>
                  <p className="font-bold text-sm mt-1">18</p>
                  <p className="text-[9px] text-gray-500">Messages</p>
                </div>
              </div>
              <div className="bg-[#111113] rounded-xl p-3 h-16 flex flex-col justify-end gap-1 items-start">
                <p className="text-[9px] text-gray-500 mb-1">Basic Pipeline</p>
                <div className="flex items-end gap-1 w-full h-8 px-1">
                  <div className="w-1/4 bg-ninja-yellow h-full rounded-t-sm opacity-100"></div>
                  <div className="w-1/4 bg-ninja-yellow h-2/3 rounded-t-sm opacity-80"></div>
                  <div className="w-1/4 bg-ninja-yellow h-1/2 rounded-t-sm opacity-60"></div>
                  <div className="w-1/4 bg-ninja-yellow h-1/4 rounded-t-sm opacity-40"></div>
                </div>
              </div>
            </div>

            <Link to="/dashboard" className="w-full bg-white text-ninja-dark hover:bg-gray-100 font-bold py-4 rounded-xl text-center mb-8 transition-colors">
              View Starter Dashboard &rarr;
            </Link>

            <ul className="space-y-4">
              {[
                'Lead management',
                'Message inbox',
                'Calendar',
                'Basic pipeline',
                'Basic dashboard'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                  <div className="bg-ninja-purple/20 p-1 rounded-full shrink-0">
                    <CheckCircle2 size={14} className="text-ninja-purple" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#111113] rounded-[2rem] p-8 md:p-10 border border-ninja-yellow/30 shadow-[0_0_50px_rgba(212,255,0,0.1)] flex flex-col relative transition-transform hover:-translate-y-2 duration-300 scale-100 md:scale-105 z-10">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-ninja-yellow text-ninja-dark font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
              Most Popular
            </div>
            
            <h3 className="text-2xl font-black mb-2">Pro</h3>
            <p className="text-sm text-gray-400 font-medium mb-8">Advanced tools for growing businesses</p>
            
            <div className="flex items-end gap-1 mb-8">
              <span className="text-5xl font-black">$79</span>
              <span className="text-xs text-gray-400 font-bold mb-2">per user/month</span>
            </div>

            {/* Dashboard Preview Thumbnail */}
            <div className="bg-[#1A1A1D] rounded-2xl p-4 mb-8 border border-white/5">
              <p className="text-[10px] text-gray-400 font-bold mb-3">Dashboard Preview</p>
              <div className="flex gap-2 mb-3">
                <div className="bg-[#111113] rounded-xl p-3 flex-1 flex flex-col">
                  <span className="text-ninja-yellow mb-1"><Target size={12} /></span>
                  <p className="font-bold text-sm">8</p>
                  <p className="text-[9px] text-gray-500">Campaigns</p>
                </div>
                <div className="bg-[#111113] rounded-xl p-3 flex-1 flex flex-col">
                  <span className="text-[#8B5CF6] mb-1"><ZapIcon size={12} /></span>
                  <p className="font-bold text-sm">12</p>
                  <p className="text-[9px] text-gray-500">Automations</p>
                </div>
              </div>
              <div className="bg-[#111113] rounded-xl p-3 h-20">
                <p className="text-[9px] text-gray-500 mb-2">Campaign Performance</p>
                {/* SVG mock line chart */}
                <svg viewBox="0 0 100 20" className="w-full h-8 stroke-[#8B5CF6] fill-none" preserveAspectRatio="none">
                  <path d="M0,15 Q25,5 50,12 T100,2" strokeWidth="2" />
                  <line x1="0" y1="18" x2="100" y2="18" stroke="#333" strokeWidth="1" />
                </svg>
              </div>
            </div>

            <Link to="/dashboard/campaigns" className="w-full bg-ninja-yellow text-ninja-dark hover:bg-[#c2e600] font-black py-4 rounded-xl text-center mb-8 transition-colors shadow-lg shadow-ninja-yellow/20">
              View Pro Dashboard &rarr;
            </Link>

            <ul className="space-y-4">
              {[
                'Everything in Starter',
                'Campaign manager',
                'Automations',
                'Email marketing',
                'Social media planner',
                'Reporting dashboard'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                  <div className="bg-ninja-yellow/20 p-1 rounded-full shrink-0">
                    <CheckCircle2 size={14} className="text-ninja-yellow" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-[#111113] rounded-[2rem] p-8 md:p-10 border border-white/5 flex flex-col relative transition-transform hover:-translate-y-2 duration-300">
            <h3 className="text-2xl font-black mb-2">Enterprise</h3>
            <p className="text-sm text-gray-400 font-medium mb-8">Complete platform for large organizations</p>
            
            <div className="flex items-end gap-1 mb-8">
              <span className="text-5xl font-black">$199</span>
              <span className="text-xs text-gray-400 font-bold mb-2">per user/month</span>
            </div>

            {/* Dashboard Preview Thumbnail */}
            <div className="bg-[#1A1A1D] rounded-2xl p-4 mb-8 border border-white/5">
              <p className="text-[10px] text-gray-400 font-bold mb-3">Dashboard Preview</p>
              <div className="flex gap-2 mb-3">
                <div className="bg-[#111113] rounded-xl p-3 flex-1 flex flex-col">
                  <span className="text-ninja-yellow mb-1"><BarChart3 size={12} /></span>
                  <p className="font-bold text-sm">524</p>
                  <p className="text-[9px] text-gray-500">Ad Conv.</p>
                </div>
                <div className="bg-[#111113] rounded-xl p-3 flex-1 flex flex-col">
                  <span className="text-white mb-1"><Star size={12} fill="currentColor" /></span>
                  <p className="font-bold text-sm">4.8</p>
                  <p className="text-[9px] text-gray-500">Reputation</p>
                </div>
              </div>
              <div className="bg-[#111113] rounded-xl p-3 h-20">
                <p className="text-[9px] text-gray-500 mb-2">Advanced Analytics</p>
                {/* SVG mock line chart */}
                <svg viewBox="0 0 100 20" className="w-full h-8 stroke-ninja-yellow fill-none" preserveAspectRatio="none">
                  <path d="M0,18 Q30,16 50,12 T100,5" strokeWidth="2" />
                  <line x1="0" y1="18" x2="100" y2="18" stroke="#333" strokeWidth="1" />
                </svg>
              </div>
            </div>

            <Link to="/dashboard/reports" className="w-full bg-white text-ninja-dark hover:bg-gray-100 font-bold py-4 rounded-xl text-center mb-8 transition-colors">
              View Enterprise Dashboard &rarr;
            </Link>

            <ul className="space-y-4">
              {[
                'Everything in Pro',
                'Ads manager',
                'Reputation management',
                'Advanced analytics',
                'Media library',
                'Marketing hub',
                'White label configuration'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                  <div className="bg-ninja-purple/20 p-1 rounded-full shrink-0">
                    <CheckCircle2 size={14} className="text-ninja-purple" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Features Breakdown */}
      <section className="px-6 pb-32 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Features by Plan</h2>
          <p className="text-gray-400 font-medium">Explore the unique capabilities of each tier</p>
        </div>

        <div className="space-y-16">
          
          {/* Starter Breakdown */}
          <div>
            <div className="flex items-center gap-4 mb-6 text-ninja-yellow">
              <Users size={24} />
              <div>
                <h3 className="text-2xl font-black text-white">Starter - Basic Management</h3>
                <p className="text-sm text-gray-400">Essential tools to get started</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111113] p-6 rounded-3xl border border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <Users size={16} className="text-ninja-yellow" />
                  <h4 className="font-bold text-sm">Lead Management</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-[#1A1A1D] p-4 rounded-2xl">
                    <div>
                      <p className="font-bold text-sm">New Leads</p>
                      <p className="text-[10px] text-gray-500">This week</p>
                    </div>
                    <span className="font-black text-xl">24</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#1A1A1D] p-4 rounded-2xl">
                    <div>
                      <p className="font-bold text-sm">Follow-up</p>
                      <p className="text-[10px] text-gray-500">Active</p>
                    </div>
                    <span className="font-black text-xl">18</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111113] p-6 rounded-3xl border border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare size={16} className="text-[#8B5CF6]" />
                  <h4 className="font-bold text-sm">Message Inbox</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'John Doe', preview: 'Price inquiry', time: '10:30', color: 'bg-ninja-yellow text-ninja-dark' },
                    { name: 'Sarah Miller', preview: 'Demo request', time: '09:45', color: 'bg-[#8B5CF6] text-white' },
                    { name: 'Alex Kim', preview: 'Follow-up', time: 'Yesterday', color: 'bg-blue-400 text-white' }
                  ].map((msg, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#1A1A1D] p-3 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0", msg.color)}>
                          {msg.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">{msg.name}</p>
                          <p className="text-[10px] text-gray-500">{msg.preview}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-600 font-bold">{msg.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pro Breakdown */}
          <div>
            <div className="flex items-center gap-4 mb-6 text-[#8B5CF6]">
              <ZapIcon size={24} />
              <div>
                <h3 className="text-2xl font-black text-white">Pro - Automations & Campaigns</h3>
                <p className="text-sm text-gray-400">Advanced marketing and automatic flows</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111113] p-6 rounded-3xl border border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <Mail size={16} className="text-ninja-yellow" />
                  <h4 className="font-bold text-sm">Campaign Manager</h4>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#1A1A1D] p-5 rounded-2xl flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-sm mb-1">Spring Email Campaign</h5>
                      <p className="text-[10px] text-gray-500">Open rate: 42.3%</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-ninja-yellow text-ninja-dark font-black text-[10px] uppercase px-2 py-0.5 rounded-full block mb-1">Active</span>
                      <span className="text-[10px] text-gray-500">1,248 sent</span>
                    </div>
                  </div>
                  <div className="bg-[#1A1A1D] p-5 rounded-2xl flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-sm mb-1">Social Media Promo</h5>
                      <p className="text-[10px] text-gray-500">Engagement: 8.7%</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-ninja-yellow text-ninja-dark font-black text-[10px] uppercase px-2 py-0.5 rounded-full block mb-1">Active</span>
                      <span className="text-[10px] text-gray-500">2.4K reach</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#111113] p-6 rounded-3xl border border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <ZapIcon size={16} className="text-[#8B5CF6]" />
                  <h4 className="font-bold text-sm">Automations</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Welcome New Leads', desc: '45 triggers today', color: 'bg-ninja-yellow' },
                    { title: 'Nurture Email Sequence', desc: '32 triggers today', color: 'bg-[#8B5CF6]' },
                    { title: 'Follow-up Reminders', desc: '28 triggers today', color: 'bg-blue-500' }
                  ].map((auto, i) => (
                    <div key={i} className="bg-[#1A1A1D] p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-4 h-4 rounded-sm opacity-20", auto.color)} />
                        <div>
                          <p className="font-bold text-sm text-white">{auto.title}</p>
                          <p className="text-[10px] text-gray-500">{auto.desc}</p>
                        </div>
                      </div>
                      <div className="bg-ninja-yellow px-2 py-0.5 rounded-full text-[10px] font-black text-ninja-dark uppercase">ON</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Breakdown */}
          <div>
            <div className="flex items-center gap-4 mb-6 text-green-400">
              <LineChart size={24} />
              <div>
                <h3 className="text-2xl font-black text-white">Enterprise - Complete Analytics</h3>
                <p className="text-sm text-gray-400">Business intelligence and advanced management</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111113] p-6 rounded-3xl border border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <Target size={16} className="text-ninja-yellow" />
                  <h4 className="font-bold text-sm">Ads Performance</h4>
                </div>
                <div className="bg-[#1A1A1D] p-5 rounded-2xl flex flex-col justify-between h-32">
                  <div className="flex justify-between items-start">
                    <h5 className="font-bold text-sm">Google Ads</h5>
                    <span className="bg-ninja-yellow text-ninja-dark font-black text-[10px] uppercase px-2 py-0.5 rounded-full">3.2x ROI</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-xs text-gray-500">Spend: $12.5K</p>
                    <p className="text-xs text-gray-500">Conv: 240</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111113] p-6 rounded-3xl border border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <Activity size={16} className="text-[#8B5CF6]" />
                  <h4 className="font-bold text-sm">Advanced Analytics</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1A1A1D] p-5 rounded-2xl h-32 flex flex-col justify-end">
                    <span className="text-ninja-yellow mb-2"><BarChart3 size={16} /></span>
                    <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase">Revenue</p>
                    <p className="text-2xl font-black">$75K</p>
                  </div>
                  <div className="bg-[#1A1A1D] p-5 rounded-2xl h-32 flex flex-col justify-end">
                    <span className="text-white mb-2"><Star size={16} fill="currentColor" /></span>
                    <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase">Reputation</p>
                    <p className="text-2xl font-black">4.8/5.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Payments & Billing Section */}
      <section className="px-6 pb-32 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Payments & Billing</h2>
          <p className="text-gray-400 font-medium">Secure, flexible, and transparent process</p>
        </div>

        <div className="bg-[#111113] rounded-[2rem] p-8 md:p-12 border border-white/5 shadow-2xl">
          {/* Payment Methods */}
          <div className="flex flex-col items-center mb-12">
            <span className="text-xs text-gray-500 font-bold mb-4">Accepted payment methods</span>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {['Apple Pay', 'Mastercard', 'AMEX', 'PayPal', 'Stripe', 'Visa'].map((method) => (
                <div key={method} className="bg-[#1A1A1D] px-4 py-2 rounded-xl text-xs font-bold text-gray-300 border border-white/5 flex items-center justify-center min-w-[3rem]">
                  {method}
                </div>
              ))}
            </div>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-[#1A1A1D] p-6 rounded-2xl flex flex-col items-center text-center border border-white/5">
              <div className="mb-4 text-ninja-yellow"><Lock size={24} /></div>
              <h4 className="font-bold text-white mb-2">Secure Payments</h4>
              <p className="text-[10px] text-gray-500 mb-4 h-8">Bank-level SSL encryption</p>
              <div className="flex gap-2 text-[8px] font-black uppercase text-ninja-yellow">
                <span className="bg-[#2A2A1A] px-2 py-1 rounded">256-bit</span>
                <span className="bg-[#2A2A1A] px-2 py-1 rounded">PCI DSS</span>
              </div>
            </div>
            
            <div className="bg-[#1A1A1D] p-6 rounded-2xl flex flex-col items-center text-center border border-white/5">
              <div className="mb-4 text-[#BFA9FF]"><CreditCard size={24} /></div>
              <h4 className="font-bold text-white mb-2">Payment Methods</h4>
              <p className="text-[10px] text-gray-500 mb-4 h-8">Multiple options available</p>
              <ul className="text-[9px] text-gray-400 text-left w-full space-y-1">
                <li className="flex gap-1.5"><div className="w-1 h-1 rounded-full bg-ninja-yellow mt-1.5" /> Credit/debit cards</li>
                <li className="flex gap-1.5"><div className="w-1 h-1 rounded-full bg-[#BFA9FF] mt-1.5" /> PayPal & transfer</li>
              </ul>
            </div>

            <div className="bg-[#1A1A1D] p-6 rounded-2xl flex flex-col items-center text-center border border-white/5">
              <div className="mb-4 text-green-400"><RefreshCw size={24} /></div>
              <h4 className="font-bold text-white mb-2">Flexible Billing</h4>
              <p className="text-[10px] text-gray-500 mb-4 h-8">Change plan anytime</p>
              <ul className="text-[9px] text-gray-400 text-left w-full space-y-1">
                <li className="flex gap-1.5"><div className="w-1 h-1 rounded-full bg-ninja-yellow mt-1.5" /> Cancel without penalty</li>
                <li className="flex gap-1.5"><div className="w-1 h-1 rounded-full bg-[#BFA9FF] mt-1.5" /> Instant upgrade/downgrade</li>
              </ul>
            </div>

            <div className="bg-[#1A1A1D] p-6 rounded-2xl flex flex-col items-center text-center border border-white/5">
              <div className="mb-4 text-[#BFA9FF]"><ShieldCheck size={24} /></div>
              <h4 className="font-bold text-white mb-2">30-Day Guarantee</h4>
              <p className="text-[10px] text-gray-500 mb-4 h-8">100% guaranteed refund</p>
              <span className="bg-ninja-yellow text-ninja-dark text-[9px] font-black uppercase px-3 py-1 rounded">No questions asked</span>
            </div>
          </div>

          {/* Billing Previews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Billing Information */}
            <div className="bg-[#1A1A1D] p-6 md:p-8 rounded-3xl border border-white/5">
              <h4 className="font-bold text-white mb-6">Billing Information</h4>
              
              <div className="bg-[#111113] rounded-2xl p-5 mb-4 border border-white/5">
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                  <span className="text-xs text-gray-400 font-medium">Billing cycle</span>
                  <span className="text-sm font-bold text-white">Monthly</span>
                </div>
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                  <span className="text-xs text-gray-400 font-medium">Next charge</span>
                  <span className="text-sm font-bold text-white">April 19, 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-medium">Currency</span>
                  <span className="text-sm font-bold text-white">USD ($)</span>
                </div>
              </div>

              <div className="bg-[#111113] rounded-2xl p-5 flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="bg-[#1A1A1D] p-2 rounded-lg text-ninja-yellow">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">**** **** **** 4242</p>
                    <p className="text-[10px] text-gray-500 font-medium">Expires 12/2028</p>
                  </div>
                </div>
                <span className="bg-ninja-yellow text-ninja-dark text-[10px] uppercase font-black px-3 py-1 rounded-full">Active</span>
              </div>
            </div>

            {/* Invoice Preview */}
            <div className="bg-[#1A1A1D] p-6 md:p-8 rounded-3xl border border-white/5">
              <h4 className="font-bold text-white mb-6">Invoice Preview</h4>
              
              <div className="bg-[#111113] rounded-2xl p-6 border border-white/5">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">INVOICE #INV-2026-0319</span>
                  <span className="bg-ninja-yellow text-ninja-dark text-[10px] uppercase font-black px-3 py-1 rounded-full">Paid</span>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm font-bold text-white mb-1">Pro Plan</p>
                    <p className="text-[10px] text-gray-500">3 users × $79</p>
                  </div>
                  <span className="text-sm font-bold text-white">$237.00</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Subtotal</span>
                    <span>$237.00</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Taxes (0%)</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 border-t border-white/5 pt-4">
                  <span className="font-bold text-white">Total</span>
                  <span className="text-xl font-black text-ninja-yellow">$237.00</span>
                </div>

                <button 
                  onClick={() => toast.success('Preparing PDF for download...')}
                  className="w-full bg-[#1A1A1D] text-white hover:bg-white/5 font-bold py-3.5 rounded-xl border border-white/5 transition-colors text-sm"
                >
                  Download PDF
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-8 text-[11px] text-gray-500 font-medium border-t border-white/5 pt-8 max-w-7xl mx-auto">
        &copy; 2026 Ninja CRM. All rights reserved.
      </footer>
    </div>
  );
};
