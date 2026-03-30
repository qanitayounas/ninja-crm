import React from 'react';
import { Plus, ChevronRight, Zap, TrendingUp, Workflow, FileText, Sparkles, Bell, Settings, Filter, Search, LayoutGrid, List as ListIcon, Maximize2, FolderPlus, Instagram, MessageCircle, Facebook, Mail, ShoppingCart, Users, Heart, AlertTriangle, Eye, Edit2, Copy, CheckCircle2, Activity, XCircle } from 'lucide-react';
import { Card, Button, Input, Modal, Select, Badge, cn } from '../../components/ui';
import toast from 'react-hot-toast';

const initialAutomations = [
  { id: 1, name: 'New Leads Welcome', trigger: 'Form completed', actions: ['Send email', 'Add tag', 'Assign'], active: true, status: 'Active' },
  { id: 2, name: 'Abandoned Cart Follow-up', trigger: 'Cart abandoned', actions: ['Send SMS', 'Add tag'], active: true, status: 'Active' },
  { id: 3, name: 'Webinar Post-Event', trigger: 'Webinar ended', actions: ['Send email'], active: false, status: 'Paused' }
];

const magnusWorkflows = [
  { id: 1, name: 'DM Welcome Sequence', platform: 'Instagram', icon: Instagram, iconColor: 'text-pink-500', iconBg: 'bg-pink-50', status: 'Activo', statusColor: 'text-green-500 bg-green-50/50', dotColor: 'bg-green-500', triggers: '1,245', conversion: '34.5%', leads: '429', roi: '2340%', time: 'Hace 2 min' },
  { id: 2, name: 'Respuesta Automática 24/7', platform: 'WhatsApp', icon: MessageCircle, iconColor: 'text-green-500', iconBg: 'bg-green-50', status: 'Activo', statusColor: 'text-green-500 bg-green-50/50', dotColor: 'bg-green-500', triggers: '2,876', conversion: '42.1%', leads: '1210', roi: '4560%', time: 'Hace 5 min' },
  { id: 3, name: 'Lead Ads Nurturing', platform: 'Facebook', icon: Facebook, iconColor: 'text-blue-500', iconBg: 'bg-blue-50', status: 'Activo', statusColor: 'text-green-500 bg-green-50/50', dotColor: 'bg-green-500', triggers: '892', conversion: '28.3%', leads: '252', roi: '1890%', time: 'Hace 1 hora' },
  { id: 4, name: 'Abandoned Cart Recovery', platform: 'Email', icon: Mail, iconColor: 'text-red-500', iconBg: 'bg-red-50', status: 'Activo', statusColor: 'text-green-500 bg-green-50/50', dotColor: 'bg-yellow-400', triggers: '567', conversion: '18.7%', leads: '106', roi: '3210%', time: 'Hace 30 min' },
  { id: 5, name: 'Cierre Asistido por IA', platform: 'WhatsApp', icon: MessageCircle, iconColor: 'text-green-500', iconBg: 'bg-green-50', status: 'Activo', statusColor: 'text-green-500 bg-green-50/50', dotColor: 'bg-green-500', triggers: '423', conversion: '51.3%', leads: '217', roi: '5670%', time: 'Hace 10 min' },
  { id: 6, name: 'Follow-up Sin Respuesta', platform: 'Email', icon: Mail, iconColor: 'text-red-500', iconBg: 'bg-red-50', status: 'Pausado', statusColor: 'text-gray-500 bg-gray-100', dotColor: 'bg-yellow-400', triggers: '234', conversion: '12.4%', leads: '29', roi: '450%', time: 'Hace 2 días' },
  { id: 7, name: 'Reactivación Clientes Inactivos', platform: 'WhatsApp', icon: MessageCircle, iconColor: 'text-green-500', iconBg: 'bg-green-50', status: 'Activo', statusColor: 'text-green-500 bg-green-50/50', dotColor: 'bg-green-500', triggers: '145', conversion: '22.8%', leads: '33', roi: '1120%', time: 'Hace 3 horas' },
  { id: 8, name: 'ChatGPT Sales Assistant', platform: 'WhatsApp', icon: MessageCircle, iconColor: 'text-green-500', iconBg: 'bg-green-50', status: 'Error', statusColor: 'text-red-500 bg-red-50/50', dotColor: 'bg-red-500', triggers: '89', conversion: '0%', leads: '0', roi: '0%', time: 'Hace 6 horas' },
];

export const MarketingAutomation = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const [conditions, setConditions] = React.useState([1]);
    const [actions, setActions] = React.useState([1]);

    const addCondition = () => setConditions([...conditions, conditions.length + 1]);
    const addAction = () => setActions([...actions, actions.length + 1]);
    const [activeTab, setActiveTab] = React.useState('MagnusFlow');
    const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
    const [activeFilter, setActiveFilter] = React.useState('Todas (8)');

    const navItems = [
        { title: 'Overview', icon: Zap, active: true },
        { title: 'Workflows', icon: Workflow, active: false },
        { title: 'Templates', icon: FileText, active: false },
        { title: 'MagnusFlow', icon: Sparkles, active: false, hasDot: true },
        { title: 'Alerts', icon: Bell, active: false },
        { title: 'Settings', icon: Settings, active: false },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 pb-10 animate-in fade-in duration-500 text-left items-start">
            
            {/* Inner Left Sidebar */}
            <div className="w-full lg:w-[220px] shrink-0 flex flex-col gap-6 lg:sticky lg:top-8">
                <div className="flex flex-col gap-1 px-2">
                    <h1 className="text-[28px] font-bold text-[#1A1D1F] tracking-tight leading-none">Automation</h1>
                    <p className="text-[#6F767E] font-medium text-[15px] leading-none mt-2">Workflow Control</p>
                </div>
                
                <div className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <button
                            key={item.title}
                            onClick={() => setActiveTab(item.title)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-[15px] relative text-left",
                                activeTab === item.title 
                                    ? "bg-ninja-yellow text-ninja-dark shadow-sm" 
                                    : "text-[#6F767E] hover:text-[#1A1D1F] hover:bg-gray-50/50"
                            )}
                        >
                            <item.icon size={20} className={cn("stroke-[2.5px] shrink-0", activeTab === item.title ? "text-ninja-dark" : "text-[#6F767E]")} />
                            {item.title}
                            {item.hasDot && (
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 h-[6px] w-[6px] rounded-full bg-orange-500" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col gap-8 w-full min-w-0">
                {activeTab === 'Overview' && (
                  <>
                    <div className="flex justify-end">
                        <Button 
                            className="bg-ninja-yellow hover:bg-ninja-yellow/90 text-ninja-dark font-bold px-8 py-4 h-auto rounded-xl shadow-sm flex items-center gap-2 border-none transition-all shrink-0"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            <Plus size={20} strokeWidth={3} />
                            <span>Create Automation</span>
                        </Button>
                    </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-8 border-none shadow-sm rounded-3xl bg-white flex items-center gap-6 group">
                   <div className="h-16 w-16 rounded-2xl bg-[#F2FFB2]/40 flex items-center justify-center text-ninja-yellow transition-transform group-hover:scale-110">
                        <Zap size={32} />
                   </div>
                   <div className="space-y-1">
                        <div className="text-[13px] font-medium text-gray-400 uppercase tracking-widest leading-none">Active Automations</div>
                        <div className="text-4xl font-bold text-[#1A1D1F]">3</div>
                   </div>
                </Card>

                <Card className="p-8 border-none shadow-sm rounded-3xl bg-white flex items-center gap-6 group">
                   <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-400 transition-transform group-hover:scale-110">
                        <TrendingUp size={32} />
                   </div>
                   <div className="space-y-1 text-left">
                        <div className="text-[13px] font-medium text-gray-400 uppercase tracking-widest leading-none">Success Rate</div>
                        <div className="text-4xl font-bold text-[#1A1D1F]">98.5%</div>
                   </div>
                </Card>
            </div>

            {/* Automation List */}
            <div className="space-y-6">
                {initialAutomations.map((a) => (
                    <Card key={a.id} className="p-8 border-none shadow-sm rounded-[32px] bg-white group hover:shadow-md transition-all">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                            <div className="space-y-4 flex-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-2xl font-bold text-[#1A1D1F] tracking-tight">{a.name}</h3>
                                    <Badge status={a.status} className={cn(
                                        "px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none",
                                        a.status === 'Active' ? "bg-ninja-yellow/5 text-ninja-yellow" : "bg-gray-100 text-gray-400"
                                    )}>
                                        {a.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <TrendingUp size={16} className="text-ninja-yellow" />
                                    <span className="font-medium uppercase tracking-widest text-[10px]">Trigger:</span>
                                    <span className="font-bold text-[#1A1D1F]/70">{a.trigger}</span>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                    {a.actions.map((action, i) => (
                                        <React.Fragment key={i}>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="h-5 w-5 rounded-full bg-ninja-yellow text-ninja-dark text-[9px] font-black flex items-center justify-center">
                                                    {i + 1}
                                                </div>
                                                <span className="text-xs font-bold text-[#1A1D1F]/70">{action}</span>
                                            </div>
                                            {i < a.actions.length - 1 && <ChevronRight size={14} className="text-gray-200" />}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <Button variant="secondary" className="px-6 py-3 rounded-xl font-bold text-xs">Edit</Button>
                                <Button variant="secondary" className="px-6 py-3 rounded-xl font-bold text-xs">Duplicate</Button>
                                <Button variant={a.active ? 'ghost' : 'primary'} className="px-6 py-3 rounded-xl font-bold text-xs">
                                    {a.active ? 'Pause' : 'Activate'}
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            </>
                )}

                {activeTab === 'MagnusFlow' && (
                  <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[28px] font-bold text-[#1A1D1F] tracking-tight leading-none">MagnusFlow</h1>
                            <p className="text-[#6F767E] font-medium text-[14px]">Organización avanzada y control de workflows</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="secondary" className="px-5 py-2.5 rounded-xl font-bold bg-white border border-gray-200 shadow-sm gap-2">
                                <FolderPlus size={16} /> Crear Carpeta
                            </Button>
                            <Button className="px-5 py-2.5 rounded-xl font-bold bg-[#D4FF00] hover:bg-[#D4FF00]/80 text-[#1A1D1F] border-none shadow-sm gap-2">
                                <Plus size={16} strokeWidth={3} /> Crear Workflow
                            </Button>
                        </div>
                    </div>

                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-[24px] bg-white">
                            <div className="h-10 w-10 rounded-xl bg-[#D4FF00] flex items-center justify-center text-[#1A1D1F] mb-4">
                                <Activity size={20} />
                            </div>
                            <p className="text-[13px] text-[#6F767E] font-medium mb-1">Total Workflows</p>
                            <p className="text-[28px] font-bold text-[#1A1D1F] leading-tight">8</p>
                            <p className="text-[11px] font-medium text-gray-400 mt-2">organizados en 8 carpetas</p>
                        </Card>
                        <Card className="p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-[24px] bg-white relative">
                            <div className="absolute top-6 right-6 px-2 py-1 bg-green-50 text-green-500 text-[10px] font-bold rounded-md">Óptimo</div>
                            <div className="h-10 w-10 rounded-xl bg-green-500 flex items-center justify-center text-white mb-4">
                                <CheckCircle2 size={20} />
                            </div>
                            <p className="text-[13px] text-[#6F767E] font-medium mb-1">Workflows Activos</p>
                            <p className="text-[28px] font-bold text-[#1A1D1F] leading-tight">6</p>
                            <p className="text-[11px] font-medium text-gray-400 mt-2">funcionando correctamente</p>
                        </Card>
                        <Card className="p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-[24px] bg-white relative">
                            <div className="absolute top-6 right-6 px-2 py-1 bg-red-50 text-red-500 text-[10px] font-bold rounded-md flex items-center gap-1">
                                <AlertTriangle size={10} /> Revisar
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-red-500 flex items-center justify-center text-white mb-4">
                                <XCircle size={20} />
                            </div>
                            <p className="text-[13px] text-[#6F767E] font-medium mb-1">Workflows en Error</p>
                            <p className="text-[28px] font-bold text-[#1A1D1F] leading-tight">1</p>
                            <p className="text-[11px] font-medium text-gray-400 mt-2">requieren atención</p>
                        </Card>
                        <Card className="p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-[24px] bg-white">
                            <div className="h-10 w-10 rounded-xl bg-purple-200 flex items-center justify-center text-purple-600 mb-4">
                                <TrendingUp size={20} />
                            </div>
                            <p className="text-[13px] text-[#6F767E] font-medium mb-1">Leads Procesados</p>
                            <p className="text-[28px] font-bold text-[#1A1D1F] leading-tight">2,276</p>
                            <p className="text-[11px] font-medium text-gray-400 mt-2">en periodo actual</p>
                        </Card>
                    </div>

                    {/* Filters bar */}
                    <Card className="p-4 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-[24px] bg-white flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input 
                                    placeholder="Buscar workflow..." 
                                    className="pl-10 h-11 bg-white border-gray-200 rounded-xl focus:ring-1 focus:ring-ninja-yellow/50 w-[300px]"
                                />
                            </div>
                            <Button variant="secondary" className="h-11 px-5 rounded-xl font-bold bg-white border border-gray-200 shadow-sm gap-2 text-[#1A1D1F]">
                                <Filter size={16} /> Filtros
                            </Button>
                            <div className="flex bg-gray-50 border border-gray-200 rounded-xl p-1 shrink-0 h-11 items-center">
                                <button onClick={() => setViewMode('grid')} className={cn("p-1.5 rounded-lg transition-colors", viewMode === 'grid' ? "bg-white shadow pointer-events-none" : "text-gray-400 hover:text-gray-600")}><LayoutGrid size={16} /></button>
                                <button onClick={() => setViewMode('list')} className={cn("p-1.5 rounded-lg transition-colors", viewMode === 'list' ? "bg-white shadow pointer-events-none" : "text-gray-400 hover:text-gray-600")}><ListIcon size={16} /></button>
                                <div className="w-[1px] h-4 bg-gray-200 mx-2" />
                                <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"><Maximize2 size={16} /></button>
                            </div>
                        </div>

                        {/* Scrollable Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {[
                                { name: 'Todos (8)', color: 'bg-[#1A1D1F] text-white border-[#1A1D1F]', activeBg: 'bg-[#1A1D1F] text-white', icon: null },
                                { name: 'Instagram (8)', color: 'bg-pink-500 text-white border-pink-500', activeBg: 'bg-pink-500 text-white', icon: Instagram },
                                { name: 'WhatsApp (12)', color: 'bg-green-500 text-white border-green-500', activeBg: 'bg-green-500 text-white', icon: MessageCircle },
                                { name: 'Facebook (6)', color: 'bg-blue-500 text-white border-blue-500', activeBg: 'bg-blue-500 text-white', icon: Facebook },
                                { name: 'Email (15)', color: 'bg-red-50 text-[#1A1D1F] border-gray-200', activeBg: 'bg-red-50 text-[#1A1D1F] border-red-100', icon: Mail },
                                { name: 'Ventas (10)', color: 'bg-gray-50 text-[#1A1D1F] border-gray-200', activeBg: 'bg-gray-100 text-[#1A1D1F]', icon: ShoppingCart },
                                { name: 'Seguimiento (7)', color: 'bg-gray-50 text-[#1A1D1F] border-gray-200', activeBg: 'bg-gray-100 text-[#1A1D1F]', icon: Users },
                                { name: 'Retención (5)', color: 'bg-orange-500 text-white border-orange-500', activeBg: 'bg-orange-500 text-white', icon: Heart },
                            ].map((tag, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => setActiveFilter(tag.name)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold border whitespace-nowrap transition-colors",
                                        activeFilter === tag.name ? tag.activeBg : "bg-gray-100/50 text-gray-500 border-transparent hover:bg-gray-100"
                                    )}
                                >
                                    {tag.icon && <tag.icon size={14} />}
                                    {tag.name}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* View Modes */}
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {magnusWorkflows.map((workflow) => (
                                <Card key={workflow.id} className="p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-[24px] bg-white group hover:shadow-md transition-all">
                                    <div className="flex items-start gap-3 mb-6">
                                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", workflow.iconBg)}>
                                            <workflow.icon size={20} className={workflow.iconColor} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-[15px] font-bold text-[#1A1D1F] truncate pr-2" title={workflow.name}>{workflow.name}</h3>
                                            <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md mt-1", workflow.statusColor)}>
                                                <span className="text-[10px] font-bold capitalize">{workflow.status}</span>
                                                <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", workflow.dotColor)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-6">
                                        <div>
                                            <p className="text-[11px] font-medium text-gray-400 mb-1">Triggers</p>
                                            <p className="text-[16px] font-bold text-[#1A1D1F]">{workflow.triggers}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium text-gray-400 mb-1">Conversión</p>
                                            <p className="text-[16px] font-bold text-[#D4FF00] drop-shadow-sm">{workflow.conversion}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium text-gray-400 mb-1">Leads</p>
                                            <p className="text-[16px] font-bold text-[#1A1D1F]">{workflow.leads}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium text-gray-400 mb-1">ROI Estimado</p>
                                            <p className="text-[16px] font-bold text-green-500">{workflow.roi}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                        <p className="text-[11px] font-medium text-gray-400">{workflow.time}</p>
                                        <div className="flex items-center gap-1.5">
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:text-ninja-dark hover:bg-gray-50 transition-colors"><Eye size={14} /></button>
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:text-ninja-dark hover:bg-gray-50 transition-colors"><Edit2 size={14} /></button>
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:text-ninja-dark hover:bg-gray-50 transition-colors"><Copy size={14} /></button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="p-0 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-[24px] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-white">
                                            <th className="px-6 py-4 text-left text-[11px] text-[#1A1D1F] font-bold">Workflow</th>
                                            <th className="px-6 py-4 text-left text-[11px] text-[#1A1D1F] font-bold">Estado</th>
                                            <th className="px-6 py-4 text-left text-[11px] text-[#1A1D1F] font-bold">Triggers</th>
                                            <th className="px-6 py-4 text-left text-[11px] text-[#1A1D1F] font-bold">Conversión</th>
                                            <th className="px-6 py-4 text-left text-[11px] text-[#1A1D1F] font-bold">Leads</th>
                                            <th className="px-6 py-4 text-left text-[11px] text-[#1A1D1F] font-bold">Última Actividad</th>
                                            <th className="px-6 py-4 text-left text-[11px] text-[#1A1D1F] font-bold">Salud</th>
                                            <th className="px-6 py-4 text-right text-[11px] text-[#1A1D1F] font-bold">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {magnusWorkflows.map((workflow) => (
                                            <tr key={workflow.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-6 py-4 w-[300px]">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", workflow.iconBg)}>
                                                            <workflow.icon size={16} className={workflow.iconColor} />
                                                        </div>
                                                        <span className="text-[13px] font-bold text-[#1A1D1F]">{workflow.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn("text-[11px] px-2 py-0.5 rounded-md font-bold capitalize", workflow.statusColor)}>{workflow.status}</span>
                                                </td>
                                                <td className="px-6 py-4 text-[13px] font-bold text-[#1A1D1F]">{workflow.triggers}</td>
                                                <td className="px-6 py-4 text-[13px] font-bold text-[#D4FF00] drop-shadow-sm">{workflow.conversion}</td>
                                                <td className="px-6 py-4 text-[13px] font-bold text-[#2A2BFF]">{workflow.leads}</td>
                                                <td className="px-6 py-4 text-[13px] text-gray-500 font-medium">{workflow.time}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={cn("h-2 w-2 rounded-full", workflow.dotColor)} />
                                                        <span className="text-[12px] font-medium text-gray-500">{workflow.status === 'Activo' ? 'Optimal' : workflow.status === 'Error' ? 'Review' : 'Paused'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-1.5 border border-gray-100 rounded-lg text-gray-400 hover:text-ninja-dark hover:bg-gray-50"><Eye size={14} /></button>
                                                        <button className="p-1.5 border border-gray-100 rounded-lg text-gray-400 hover:text-ninja-dark hover:bg-gray-50"><Edit2 size={14} /></button>
                                                        <button className="p-1.5 border border-gray-100 rounded-lg text-gray-400 hover:text-ninja-dark hover:bg-gray-50"><Plus size={14} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}
                  </div>
                )}

                {activeTab !== 'Overview' && activeTab !== 'MagnusFlow' && (
                    <div className="flex flex-col items-center justify-center p-10 h-[400px] bg-white border border-gray-200 rounded-[32px] animate-in fade-in duration-300">
                        <div className="h-16 w-16 mb-4 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                            <Settings size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-[#1A1D1F] mb-2">{activeTab}</h2>
                        <p className="text-[#6F767E] font-medium text-[15px]">This module is coming soon.</p>
                    </div>
                )}
            </div>

            {/* Create Automation Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Automation"
                className="max-w-md"
            >
                <div className="space-y-4 py-1 text-left">
                    <p className="text-[11px] font-medium text-gray-400 mt-[-20px] mb-2 uppercase tracking-widest">Configure workflow nodes</p>

                    <div className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Automation Name *</label>
                            <Input 
                                placeholder="E.g.: Welcome New Leads"
                                className="py-2.5 px-4 rounded-xl border-gray-100 font-bold text-sm"
                            />
                        </div>

                        {/* Trigger Selection */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Trigger Event</label>
                            <Select className="font-bold text-sm">
                                <option>Select trigger...</option>
                                <option>Form completed</option>
                                <option>Email opened</option>
                                <option>Link clicked</option>
                                <option>Tag added/removed</option>
                                <option>Purchase completed</option>
                                <option>Page visited</option>
                            </Select>
                        </div>

                        {/* Conditions Section */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Conditions (optional)</label>
                            <div className="space-y-2">
                                {conditions.map((_, i) => (
                                    <div key={i} className="flex items-center gap-2 animate-in slide-in-from-top-1">
                                        <div className="flex-[1.2]">
                                            <Select className="text-[13px] font-bold">
                                                <option>Field</option>
                                                <option>Email</option>
                                                <option>Phone</option>
                                                <option>Country</option>
                                            </Select>
                                        </div>
                                        <div className="flex-1">
                                            <Select className="text-[13px] font-bold">
                                                <option>contains</option>
                                                <option>is equal to</option>
                                                <option>is not equal to</option>
                                            </Select>
                                        </div>
                                        <div className="flex-[1.5]">
                                            <Input 
                                                placeholder="Value"
                                                className="py-2.5 px-3 rounded-xl border-gray-100 text-[13px] font-medium"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={addCondition}
                                className="flex items-center gap-1.5 text-[10px] font-bold text-ninja-yellow uppercase tracking-widest hover:opacity-80 transition-opacity"
                            >
                                <Plus size={14} strokeWidth={3} /> Add condition
                            </button>
                        </div>

                        {/* Actions Section */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Actions</label>
                            <div className="space-y-2">
                                {actions.map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 animate-in slide-in-from-top-1">
                                        <div className="h-6 w-6 rounded-full bg-ninja-yellow text-ninja-dark text-[9px] font-black flex items-center justify-center shrink-0">
                                            {i + 1}
                                        </div>
                                        <Select className="font-bold text-[13px]">
                                            <option>Select action...</option>
                                            <option>Send email</option>
                                            <option>Send SMS</option>
                                            <option>Send WhatsApp</option>
                                            <option>Add tag</option>
                                            <option>Remove tag</option>
                                            <option>Assign to pipeline</option>
                                        </Select>
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={addAction}
                                className="flex items-center gap-1.5 text-[10px] font-bold text-ninja-yellow uppercase tracking-widest hover:opacity-80 transition-opacity"
                            >
                                <Plus size={14} strokeWidth={3} /> Add action
                            </button>
                        </div>

                        {/* Submit Button */}
                        <Button 
                            className="w-full py-3.5 h-auto rounded-xl bg-ninja-yellow text-ninja-dark font-black text-[11px] uppercase tracking-widest shadow-lg shadow-ninja-yellow/10 mt-2"
                            onClick={() => {
                                toast.success("Automation created!");
                                setIsCreateModalOpen(false);
                            }}
                        >
                            Create Automation
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
