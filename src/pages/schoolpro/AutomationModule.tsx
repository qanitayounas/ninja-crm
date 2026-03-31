import { 
  Zap, 
  TrendingUp, 
  Mail, 
  Award, 
  Edit, 
  Pause, 
  Trash2,
  Bell,
  Users,
  BarChart3,
  Calendar,
  Plus
} from 'lucide-react';
import { Card, cn } from '../../components/ui';
import { 
  automationMetrics, 
  configuredAutomations, 
  topAutomations, 
  overallPerformance,
  automationTemplates,
  triggerList,
  triggerCategories
} from '../../data/automationSchoolData';

type AutomationTab = 'automations' | 'templates' | 'triggers';

const KpiCard = ({ metric }: { metric: typeof automationMetrics[0] }) => {
  const iconMap: Record<string, JSX.Element> = {
    zap: <Zap size={20} />,
    trending: <TrendingUp size={20} />,
    mail: <Mail size={20} />,
    award: <Award size={20} />
  };
  const colorMap: Record<string, string> = {
    zap: 'bg-ninja-yellow text-ninja-dark',
    trending: 'bg-purple-100 text-purple-600',
    mail: 'bg-blue-100 text-blue-600',
    award: 'bg-purple-100 text-purple-600'
  };
  return (
    <Card className="p-6 border-none shadow-sm bg-white hover:scale-[1.02] transition-all">
      <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center mb-4", colorMap[metric.icon])}>
        {iconMap[metric.icon]}
      </div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{metric.label}</p>
      <h4 className="text-2xl font-black text-ninja-dark">{metric.value}</h4>
    </Card>
  );
};

const AutomationsView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-4">
      <h2 className="text-lg font-black text-ninja-dark uppercase tracking-tight">Configured Automations</h2>
      {configuredAutomations.map((auto) => (
        <Card key={auto.id} className="p-6 border-none shadow-sm bg-white rounded-3xl space-y-4 hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-black text-ninja-dark group-hover:text-ninja-yellow transition-colors">{auto.title}</h3>
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                auto.status === 'Active' ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
              )}>{auto.status}</span>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-ninja-dark transition-colors"><Edit size={16} /></button>
              <button className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-yellow-500 transition-colors"><Pause size={16} /></button>
              <button className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
            <Zap size={14} className="text-ninja-yellow" />
            Trigger: {auto.trigger}
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Actions:</p>
            <div className="flex flex-wrap gap-2">
              {auto.actions.map((action, i) => (
                <span key={i} className="px-3 py-1 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold">{action}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Executed</p>
              <p className="text-lg font-black text-ninja-dark">{auto.executed}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Success Rate</p>
              <p className="text-lg font-black text-green-500">{auto.successRate}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>

    <div className="space-y-6">
      <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
        <h3 className="text-lg font-black text-ninja-dark uppercase tracking-tight mb-6">Top Automations</h3>
        <div className="space-y-5">
          {topAutomations.map((item) => (
            <div key={item.rank} className="flex items-center gap-4 group hover:translate-x-1 transition-transform cursor-pointer">
              <div className="h-8 w-8 rounded-xl bg-ninja-yellow/10 flex items-center justify-center font-black text-ninja-dark text-sm">#{item.rank}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-ninja-dark truncate group-hover:text-ninja-yellow transition-colors">{item.title}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.executions} executions</p>
              </div>
              <span className="text-sm font-black text-green-500 shrink-0">{item.successRate}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
        <h3 className="text-lg font-black text-ninja-dark uppercase tracking-tight mb-6">General Performance</h3>
        <div className="space-y-5">
          {overallPerformance.map((perf, i) => (
            <div key={i} className={cn("p-4 rounded-2xl", perf.color)}>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{perf.label}</p>
              <p className="text-2xl font-black">{perf.value}</p>
              <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-0.5">{perf.unit}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const TemplatesView = () => {
  const iconMap: Record<string, JSX.Element> = {
    mail: <Mail size={28} />,
    bell: <Bell size={28} />,
    calendar: <Calendar size={28} />,
    award: <Award size={28} />,
    users: <Users size={28} />,
    'bar-chart': <BarChart3 size={28} />
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-ninja-dark uppercase tracking-tight">Automation Templates</h2>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-500 rounded-xl text-xs font-black uppercase hover:bg-gray-100 transition-all">
          <Plus size={14} /> Create Template
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automationTemplates.map((tpl) => (
          <Card key={tpl.id} className="p-8 border-none shadow-sm bg-white rounded-[2rem] group hover:shadow-xl hover:-translate-y-1 transition-all space-y-5">
            <div className="flex items-start justify-between">
              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform", tpl.color)}>
                {iconMap[tpl.icon]}
              </div>
              <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-wider">{tpl.type}</span>
            </div>
            <div>
              <h3 className="text-lg font-black text-ninja-dark mb-1 group-hover:text-ninja-yellow transition-colors">{tpl.title}</h3>
              <p className="text-xs font-medium text-gray-400 leading-relaxed">{tpl.description}</p>
            </div>
            <button className="w-full py-3 border-2 border-gray-100 text-ninja-dark rounded-xl text-xs font-black uppercase tracking-widest hover:bg-ninja-yellow hover:border-ninja-yellow transition-all">
              Use Template
            </button>
          </Card>
        ))}
      </div>

      <Card className="p-10 border-none shadow-sm bg-ninja-dark text-white rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 group">
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-ninja-yellow flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap size={32} className="text-ninja-dark" />
          </div>
          <div>
            <h3 className="text-2xl font-black group-hover:text-ninja-yellow transition-colors">Create Your Own Template</h3>
            <p className="text-sm font-medium text-gray-400">Design custom templates to automate any process in your educational ecosystem.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 bg-ninja-yellow text-ninja-dark rounded-2xl text-sm font-black uppercase shadow-lg shadow-ninja-yellow/20 hover:scale-105 transition-all shrink-0">
          <Plus size={18} /> Start Creating
        </button>
      </Card>
    </div>
  );
};

const TriggersView = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-lg font-black text-ninja-dark uppercase tracking-tight mb-2">Available Triggers</h2>
      <p className="text-sm font-medium text-gray-400">Events that can activate automations in your educational platform.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {triggerList.map((trigger, i) => (
        <Card key={i} className="p-5 border-none shadow-sm bg-white rounded-2xl flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer">
          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", trigger.color)}>
            <Zap size={18} />
          </div>
          <p className="text-sm font-black text-ninja-dark group-hover:text-ninja-yellow transition-colors">{trigger.title}</p>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {triggerCategories.map((cat, i) => (
        <Card key={i} className="p-8 border-none shadow-sm bg-white rounded-[2rem] group hover:shadow-xl hover:-translate-y-1 transition-all">
          <div className={cn(
            "h-14 w-14 rounded-2xl flex items-center justify-center mb-6",
            i === 0 ? "bg-ninja-yellow text-ninja-dark" : i === 1 ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
          )}>
            {i === 0 ? <Users size={28} /> : i === 1 ? <Award size={28} /> : <BarChart3 size={28} />}
          </div>
          <h3 className="text-xl font-black text-ninja-dark mb-2 group-hover:text-ninja-yellow transition-colors">{cat.title}</h3>
          <p className="text-xs font-medium text-gray-400 leading-relaxed mb-6">{cat.description}</p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available</span>
            <span className="text-2xl font-black text-ninja-dark">{cat.available}</span>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export const AutomationModule = ({ activeTab, setActiveTab }: { activeTab: AutomationTab; setActiveTab: (t: AutomationTab) => void }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {automationMetrics.map((m, i) => <KpiCard key={i} metric={m} />)}
    </div>

    {/* Tab Navigation - scrollable on mobile */}
    <div className="w-full overflow-x-auto scrollbar-none -mx-1 px-1">
      <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-max min-w-full sm:w-fit sm:min-w-0">
        {(['automations', 'templates', 'triggers'] as AutomationTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all capitalize whitespace-nowrap",
              activeTab === tab ? "bg-ninja-dark text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>

    {activeTab === 'automations' && <AutomationsView />}
    {activeTab === 'templates' && <TemplatesView />}
    {activeTab === 'triggers' && <TriggersView />}
  </div>
);
