import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ModulePlaceholder } from '../../components/ModulePlaceholder';
import { CursosDashboard } from './CursosDashboard';
import { MisCursos } from './MisCursos';
import { CommunitiesOverview } from './CommunitiesOverview';
import { CommunitiesFeed } from './CommunitiesFeed';
import { StudentPortalOverview } from './StudentPortalOverview';
import { CourseContentDetail } from './CourseContentDetail';
import { AutomationModule } from './AutomationModule';
import { MonetizationModule } from './MonetizationModule';
import { cn } from '../../components/ui';

export const SchoolProCourses = () => {
    const [view, setView] = useState<'dashboard' | 'courses'>('dashboard');

    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">
                        <span>SchoolPro</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-600">Courses Management</span>
                    </div>
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Courses Management</h1>
                    <p className="text-gray-500 font-bold text-sm">Central dashboard for courses and performance</p>
                </div>

                <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 mb-1">
                    <button 
                        onClick={() => setView('dashboard')}
                        className={cn(
                            "px-6 py-2 rounded-xl text-xs font-black uppercase transition-all",
                            view === 'dashboard' ? "bg-ninja-dark text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
                        )}
                    >
                        Dashboard
                    </button>
                    <button 
                        onClick={() => setView('courses')}
                        className={cn(
                            "px-6 py-2 rounded-xl text-xs font-black uppercase transition-all",
                            view === 'courses' ? "bg-ninja-dark text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
                        )}
                    >
                        My Courses
                    </button>
                    <div className="w-[1px] h-6 bg-gray-100 mx-2" />
                    <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-ninja-yellow text-ninja-dark text-xs font-black uppercase shadow-lg shadow-ninja-yellow/20 hover:scale-105 active:scale-95 transition-all">
                        <Plus size={16} />
                        Create Course
                    </button>
                </div>
            </div>

            {/* Content View */}
            <div className="w-full">
                {view === 'dashboard' ? <CursosDashboard /> : <MisCursos />}
            </div>
        </div>
    );
};

export const SchoolProCommunities = () => {
    const [view, setView] = useState<'overview' | 'feed'>('overview');

    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">
                        <span>SchoolPro</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-600">Communities</span>
                    </div>
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight uppercase">Communities</h1>
                    <p className="text-gray-500 font-bold text-sm">Spaces for interaction and engagement</p>
                </div>

                <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 mb-1">
                    <button 
                        onClick={() => setView('overview')}
                        className={cn(
                            "px-6 py-2 rounded-xl text-xs font-black uppercase transition-all",
                            view === 'overview' ? "bg-ninja-dark text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
                        )}
                    >
                        Overview
                    </button>
                    <button 
                        onClick={() => setView('feed')}
                        className={cn(
                            "px-6 py-2 rounded-xl text-xs font-black uppercase transition-all",
                            view === 'feed' ? "bg-ninja-dark text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
                        )}
                    >
                        Feed
                    </button>
                    <div className="w-[1px] h-6 bg-gray-100 mx-2" />
                    <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-ninja-yellow text-ninja-dark text-xs font-black uppercase shadow-lg shadow-ninja-yellow/20 hover:scale-105 active:scale-95 transition-all text-center">
                        <Plus size={16} />
                        Create Community
                    </button>
                </div>
            </div>

            {/* Content View */}
            <div className="w-full">
                {view === 'overview' ? <CommunitiesOverview /> : <CommunitiesFeed />}
            </div>
        </div>
    );
};

export const SchoolProStudentPortal = () => {
    const [view, setView] = useState<'overview' | 'content'>('overview');

    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            {/* Header Section (Not needed because StudentPortalOverview has its own header) */}

            {/* Content View */}
            <div className="w-full">
                {view === 'overview' ? (
                  <div className="space-y-4">
                    <StudentPortalOverview />
                    <button 
                      onClick={() => setView('content')}
                      className="w-full mt-4 py-4 bg-gray-50 text-gray-500 rounded-3xl text-sm font-black uppercase tracking-widest hover:bg-ninja-yellow hover:text-ninja-dark transition-all duration-300 shadow-sm"
                    >
                      Enter a Course to View Content
                    </button>
                  </div>
                ) : (
                  <CourseContentDetail onBack={() => setView('overview')} />
                )}
            </div>
        </div>
    );
};

export const SchoolProCertificates = () => <ModulePlaceholder title="Certificates & Gamification" />;

export const SchoolProMonetization = () => {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            <div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">
                    <span>SchoolPro</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-600">Monetization</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-ninja-dark tracking-tight uppercase">Monetization</h1>
                        <p className="text-gray-500 font-bold text-sm">Revenue management and payment models</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-ninja-yellow text-ninja-dark text-xs font-black uppercase shadow-lg shadow-ninja-yellow/20 hover:scale-105 active:scale-95 transition-all self-start">
                        <Plus size={16} />
                        New Payment Model
                    </button>
                </div>
            </div>
            <MonetizationModule />
        </div>
    );
};

export const SchoolProAutomation = () => {
    const [activeTab, setActiveTab] = useState<'automations' | 'templates' | 'triggers'>('automations');
    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">
                        <span>SchoolPro</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-600">Automation</span>
                    </div>
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight uppercase">Educational Automation</h1>
                    <p className="text-gray-500 font-bold text-sm">Manage the student lifecycle</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-ninja-yellow text-ninja-dark text-xs font-black uppercase shadow-lg shadow-ninja-yellow/20 hover:scale-105 active:scale-95 transition-all self-start">
                    <Plus size={16} />
                    New Automation
                </button>
            </div>
            <AutomationModule activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

