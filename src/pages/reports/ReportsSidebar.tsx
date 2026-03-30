import { 
    Target, 
    Phone, 
    Calendar, 
    Globe, 
    Zap, 
    Trophy, 
    Clock, 
    BarChart2, 
    Shield, 
    Filter, 
    Layout, 
    Settings as SettingsIcon,
    ChevronRight,
    Star
} from 'lucide-react';
import { cn } from '../../components/ui';

const mainReports = [
    { icon: Target, label: 'Attribution', id: 'attribution' },
    { icon: Phone, label: 'Calls', id: 'calls', hasStatus: true },
    { icon: Calendar, label: 'Appointments', id: 'appointments', hasStatus: true },
    { icon: Globe, label: 'Global KPIs', id: 'kpis' },
    { icon: Zap, label: 'Facebook Ads', id: 'fb-ads' },
    { icon: Zap, label: 'Google Ads', id: 'google-ads' },
    { icon: Trophy, label: 'Agent Ranking', id: 'ranking' },
    { icon: Clock, label: 'Scheduling', id: 'scheduling' },
];

const reportTools = [
    { icon: Star, label: 'Reputation', id: 'reputation' },
    { icon: BarChart2, label: 'Overview', id: 'overview' },
    { icon: Shield, label: 'Local Audit', id: 'audit' },
    { icon: Filter, label: 'Funnel Analysis', id: 'funnel' },
    { icon: Layout, label: 'Custom', id: 'custom' },
    { icon: SettingsIcon, label: 'Settings', id: 'settings' },
];

interface ReportsSidebarProps {
    activeReport: string;
    onReportChange: (id: string) => void;
}

export const ReportsSidebar = ({ activeReport, onReportChange }: ReportsSidebarProps) => {
    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col pt-10 animate-in slide-in-from-left duration-500 flex-shrink-0">
            <div className="px-8 mb-10">
                <h2 className="text-3xl font-black text-ninja-dark tracking-tighter leading-none">Reports</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Reporting Hub</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
                <div className="mb-8">
                    <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Main Reports</p>
                    <div className="space-y-1.5">
                        {mainReports.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onReportChange(item.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-3 rounded-2xl transition-all group",
                                    activeReport === item.id 
                                        ? "bg-ninja-yellow text-ninja-dark font-black shadow-lg shadow-ninja-yellow/10" 
                                        : "text-slate-500 hover:bg-slate-50 hover:text-ninja-dark font-bold"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} className={cn("transition-colors", activeReport === item.id ? "text-ninja-dark" : "text-slate-300 group-hover:text-ninja-dark")} />
                                    <span className="text-[13px]">{item.label}</span>
                                </div>
                                {item.hasStatus && (
                                    <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)] animate-pulse" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Tools</p>
                    <div className="space-y-1.5">
                        {reportTools.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onReportChange(item.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-3 rounded-2xl transition-all group",
                                    activeReport === item.id 
                                        ? "bg-ninja-yellow text-ninja-dark font-black shadow-lg shadow-ninja-yellow/10" 
                                        : "text-slate-500 hover:bg-slate-50 hover:text-ninja-dark font-bold"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} className={cn("transition-colors", activeReport === item.id ? "text-ninja-dark" : "text-slate-300 group-hover:text-ninja-dark")} />
                                    <span className="text-[13px]">{item.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar Footer Link */}
            <div className="p-6 border-t border-slate-50 mt-auto">
                <button 
                    onClick={() => onReportChange('attribution')}
                    className="flex items-center justify-between w-full p-4 bg-slate-50/50 border border-slate-100 rounded-2xl group hover:bg-ninja-dark hover:border-ninja-dark hover:text-white transition-all cursor-pointer overflow-hidden relative shadow-sm hover:shadow-xl hover:shadow-ninja-dark/10"
                >
                    <div className="text-left relative z-10">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/50 mb-0.5 transition-colors">High Priority</p>
                        <p className="text-xs font-black transition-colors">Attribution</p>
                    </div>
                    <div className="h-7 w-7 rounded-lg bg-white group-hover:bg-white/10 border border-slate-100 group-hover:border-transparent flex items-center justify-center transition-all relative z-10">
                        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                </button>
            </div>
        </aside>
    );
};
