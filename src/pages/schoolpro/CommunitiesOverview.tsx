import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  UserPlus, 
  Search, 
  ChevronRight 
} from 'lucide-react';
import { Card, cn } from '../../components/ui';
import { communityMetrics, myCommunities } from '../../data/communitiesData';

export const CommunitiesOverview = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* KPI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {communityMetrics.map((kpi, idx) => (
                    <Card key={idx} className="p-6 border-none shadow-sm hover:scale-[1.02] transition-all bg-white relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center",
                                kpi.icon === 'users' ? "bg-ninja-yellow text-ninja-dark shadow-ninja-yellow/20" : 
                                kpi.icon === 'message' ? "bg-purple-50 text-purple-600" : 
                                kpi.icon === 'chart' ? "bg-green-50 text-green-600" : 
                                "bg-blue-50 text-blue-600"
                            )}>
                                {kpi.icon === 'users' && <Users size={20} />}
                                {kpi.icon === 'message' && <MessageSquare size={20} />}
                                {kpi.icon === 'chart' && <TrendingUp size={20} />}
                                {kpi.icon === 'user-plus' && <UserPlus size={20} />}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                            <h4 className="text-2xl font-black text-ninja-dark mb-0.5">{kpi.value}</h4>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{kpi.subtext}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* My Communities Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <h2 className="text-2xl font-black text-ninja-dark tracking-tight uppercase">My Communities</h2>
                    <div className="relative w-full md:max-w-xs group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ninja-yellow transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search community..." 
                            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-ninja-yellow/10 focus:border-ninja-yellow transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myCommunities.map((community) => (
                        <Card key={community.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-[2.5rem] p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg", community.color)}>
                                    <Users size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-ninja-dark leading-tight group-hover:text-ninja-yellow transition-colors">{community.title}</h3>
                                    <span className={cn(
                                        "inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mt-1",
                                        community.type === 'Course' ? "bg-green-50 text-green-600" : "bg-purple-50 text-purple-600"
                                    )}>
                                        {community.type}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50 flex-1">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Members</p>
                                    <p className="text-lg font-black text-ninja-dark">{community.members}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Posts</p>
                                    <p className="text-lg font-black text-ninja-dark">{community.posts}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Engagement</p>
                                    <span className={cn(
                                        "text-xs font-black",
                                        community.engagement === 'High' ? "text-green-500" : "text-ninja-yellow"
                                    )}>
                                        {community.engagement}
                                    </span>
                                </div>
                                <button className="flex items-center gap-2 text-sm font-black text-ninja-dark group/btn">
                                    View Community
                                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
