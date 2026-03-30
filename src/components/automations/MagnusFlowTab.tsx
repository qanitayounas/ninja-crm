import { useState } from 'react';
import { 
    FolderPlus,
    Plus,
    Activity,
    CheckCircle2,
    XCircle,
    TrendingUp,
    Search,
    Filter,
    Grid as GridIcon,
    List as ListIcon,
    Maximize2,
    Eye,
    Edit2,
    Copy,
    Instagram,
    Facebook,
    Mail,
    ShoppingCart,
    UserCheck,
    Heart,
    MessageCircle
} from 'lucide-react';
import { Card, Button, cn } from '../ui';
import { magnusFlowData } from '../../data/magnusFlowData';

export const MagnusFlowTab = () => {
    const [activeFilter, setActiveFilter] = useState('todos');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const getIconForFilter = (iconName: string | null) => {
        switch (iconName) {
            case 'instagram': return <Instagram size={14} />;
            case 'facebook': return <Facebook size={14} />;
            case 'whatsapp': return <MessageCircle size={14} />;
            case 'mail': return <Mail size={14} />;
            case 'shopping-cart': return <ShoppingCart size={14} />;
            case 'user': return <UserCheck size={14} />;
            case 'heart': return <Heart size={14} />;
            default: return null;
        }
    };

    const renderKPIIcon = (type: string) => {
        switch (type) {
            case 'activity': return <Activity size={24} className="text-ninja-dark" />;
            case 'check': return <CheckCircle2 size={24} className="text-white" />;
            case 'x': return <XCircle size={24} className="text-white" />;
            case 'trending': return <TrendingUp size={24} className="text-white" />;
            default: return null;
        }
    };

    const getKPIColor = (type: string) => {
        switch (type) {
            case 'activity': return 'bg-[#D4FF00]';
            case 'check': return 'bg-[#25D366]';
            case 'x': return 'bg-red-500';
            case 'trending': return 'bg-[#BFA9FF]';
            default: return 'bg-gray-200';
        }
    };

    // Filter workflows based on active filter
    const filteredWorkflows = activeFilter === 'todos' 
        ? magnusFlowData.workflows 
        : magnusFlowData.workflows.filter(wf => 
            wf.platform === activeFilter || (wf.tags && wf.tags.includes(activeFilter))
        );

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">MagnusFlow</h1>
                    <p className="text-gray-400 font-medium">Organización avanzada y control de workflows</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="flex items-center gap-2 font-bold px-4 py-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-ninja-dark">
                        <FolderPlus size={16} />
                        Crear Carpeta
                    </Button>
                    <Button className="flex items-center gap-2 font-black px-4 py-2 bg-[#D4FF00] hover:bg-[#c2e600] text-ninja-dark rounded-xl shadow-lg shadow-ninja-yellow/20 border-transparent">
                        <Plus size={16} />
                        Crear Workflow
                    </Button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {magnusFlowData.kpis.map((kpi, idx) => (
                    <Card key={idx} className="p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div className="flex items-start justify-between mb-4">
                            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shadow-inner", getKPIColor(kpi.iconType))}>
                                {renderKPIIcon(kpi.iconType)}
                            </div>
                            {kpi.status && (
                                <div className={cn(
                                    "px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest",
                                    kpi.status.includes('Revisar') ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                                )}>
                                    {kpi.status}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500">{kpi.title}</p>
                            <h3 className="text-3xl font-black text-ninja-dark">{kpi.value}</h3>
                            <p className="text-[10px] font-medium text-gray-400">{kpi.subtitle}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Filter Bar */}
            <Card className="p-4 border border-gray-100 shadow-sm bg-white">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text"
                                placeholder="Buscar workflow..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-ninja-dark focus:ring-1 focus:ring-ninja-dark transition-all text-sm font-medium"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-500 hover:text-ninja-dark hover:bg-gray-50 rounded-lg h-10">
                                <Filter size={16} />
                                <span className="text-sm font-bold">Filtros</span>
                            </Button>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 h-10">
                                <button 
                                    onClick={() => setViewMode('grid')}
                                    className={cn("p-1.5 rounded-md transition-all", viewMode === 'grid' ? "bg-white shadow-sm text-ninja-dark" : "text-gray-400 hover:text-gray-600")}
                                >
                                    <GridIcon size={16} />
                                </button>
                                <button 
                                    onClick={() => setViewMode('list')}
                                    className={cn("p-1.5 rounded-md transition-all", viewMode === 'list' ? "bg-white shadow-sm text-ninja-dark" : "text-gray-400 hover:text-gray-600")}
                                >
                                    <ListIcon size={16} />
                                </button>
                            </div>
                            <Button variant="ghost" className="px-3 border border-gray-200 text-gray-400 hover:text-ninja-dark hover:bg-gray-50 rounded-lg h-10">
                                <Maximize2 size={16} />
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                        {magnusFlowData.filters.map((filter) => {
                            const isActive = activeFilter === filter.id;
                            
                            // Check if it's the specific layout required by user screenshots 
                            // e.g., Todos is black when active.
                            let activeClasses = "bg-ninja-dark text-white border-transparent shadow-md";
                            if (filter.id !== 'todos' && filter.color) {
                                const isLightColor = filter.id === 'ventas' || filter.id === 'whatsapp' || filter.id === 'seguimiento';
                                activeClasses = `${filter.color} ${isLightColor ? 'text-ninja-dark' : 'text-white'} border-transparent shadow-md`;
                            }

                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                                        isActive 
                                            ? `${activeClasses} border-transparent shadow-md` 
                                            : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100"
                                    )}
                                >
                                    {filter.icon && getIconForFilter(filter.icon)}
                                    {filter.label} ({filter.count})
                                </button>
                            );
                        })}
                    </div>
                    {/* Visual Scrollbar Indicator representing the dark bar in screenshot */}
                    <div className="h-6 w-full bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-between px-2 cursor-pointer shadow-inner">
                        <div className="w-1.5 h-3 border-l-2 border-white/50" />
                        <div className="w-1.5 h-3 border-r-2 border-white/50" />
                    </div>
                </div>
            </Card>

            {/* Content Area */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredWorkflows.map(wf => (
                        <Card key={wf.id} className="p-6 border border-gray-100 shadow-sm flex flex-col hover:shadow-lg transition-all cursor-pointer group bg-white">
                            <div className="flex items-start gap-3 mb-6">
                                <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0", wf.platformColor)}>
                                    {getIconForFilter(wf.platform)}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-bold text-ninja-dark line-clamp-1">{wf.title}</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className={cn("text-[10px] font-black uppercase tracking-widest", wf.statusTextColor)}>
                                            {wf.status}
                                        </span>
                                        <div className={cn("w-1.5 h-1.5 rounded-full", wf.statusColor)} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-y-4 mb-6">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold mb-1">Triggers</p>
                                    <p className="text-lg font-black text-ninja-dark leading-none">{wf.triggers}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold mb-1">Conversión</p>
                                    <p className={cn("text-lg font-black leading-none", wf.conversionColor.includes('D4FF00') ? 'text-[#aacc00]' : wf.conversionColor)}>{wf.conversion}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold mb-1">Leads</p>
                                    <p className="text-lg font-black text-ninja-dark leading-none">{wf.leads}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold mb-1">ROI Estimado</p>
                                    <p className="text-lg font-black text-green-500 leading-none">{wf.roi}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                <span className="text-[10px] font-bold text-gray-400">{wf.timeText}</span>
                                <div className="flex items-center gap-1">
                                    <button className="p-1.5 text-gray-400 hover:text-ninja-dark hover:bg-gray-50 rounded-md transition-colors border border-gray-100"><Eye size={14} /></button>
                                    <button className="p-1.5 text-gray-400 hover:text-ninja-dark hover:bg-gray-50 rounded-md transition-colors border border-gray-100"><Edit2 size={14} /></button>
                                    <button className="p-1.5 text-gray-400 hover:text-ninja-dark hover:bg-gray-50 rounded-md transition-colors border border-gray-100"><Copy size={14} /></button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-0 border border-gray-100 shadow-sm overflow-hidden bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500">Workflow</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500">Triggers</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500">Conversión</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500">Leads</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500">Última Actividad</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500">Salud</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredWorkflows.map(wf => (
                                    <tr key={wf.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", wf.platformColor)}>
                                                    {getIconForFilter(wf.platform)}
                                                </div>
                                                <span className="text-sm font-bold text-ninja-dark line-clamp-1">{wf.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className={cn("text-[10px] font-black uppercase tracking-widest", wf.statusTextColor)}>
                                                    {wf.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-black text-ninja-dark text-sm">{wf.triggers}</td>
                                        <td className="px-6 py-4 font-black text-sm" style={{ color: wf.conversionColor.includes('D4FF00') ? '#aacc00' : '' }}>{wf.conversion}</td>
                                        <td className="px-6 py-4 font-black text-blue-500 text-sm">{wf.leads}</td>
                                        <td className="px-6 py-4 text-xs font-bold text-gray-500">{wf.timeText}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <div className={cn("w-1.5 h-1.5 rounded-full", wf.statusColor)} />
                                                Optimal
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="p-1.5 text-gray-400 hover:text-ninja-dark hover:bg-white rounded-md transition-colors border border-gray-100"><Eye size={14} /></button>
                                                <button className="p-1.5 text-gray-400 hover:text-ninja-dark hover:bg-white rounded-md transition-colors border border-gray-100"><Edit2 size={14} /></button>
                                                <button className="p-1.5 text-gray-400 hover:text-ninja-dark hover:bg-white rounded-md transition-colors border border-gray-100"><Maximize2 size={14} /></button>
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
    );
};
