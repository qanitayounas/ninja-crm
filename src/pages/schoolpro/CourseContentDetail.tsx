import { useState, useEffect } from 'react';
import {
  PlayCircle,
  CheckCircle2,
  Lock,
  Clock,
  BookOpen,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { Card, cn } from '../../components/ui';
import { apiService } from '../../services/apiService';

// Fallback content data
const fallbackCourseContent = [
  { id: 1, title: 'Introduction', lessons: 3, duration: '30 min', status: 'Completed' },
  { id: 2, title: 'Getting Started', lessons: 4, duration: '45 min', status: 'Active' },
  { id: 3, title: 'Advanced Topics', lessons: 5, duration: '1h', status: 'Locked' },
];
// Stats are computed dynamically from API data

export const CourseContentDetail = ({ onBack }: { onBack: () => void }) => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<any[]>([]);
    const [modules, setModules] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        apiService.getCourses()
            .then(async (coursesData) => {
                const allCourses = coursesData || [];
                setCourses(allCourses);
                if (allCourses.length > 0) {
                    const firstId = allCourses[0].id;
                    try {
                        const mods = await apiService.getCourseModules(firstId);
                        setModules(mods || []);
                    } catch {
                        setModules([]);
                    }
                }
            })
            .catch(() => { setCourses([]); setModules([]); })
            .finally(() => setLoading(false));
    }, []);

    const courseContentData = modules.length > 0
        ? modules.map((m: any, i: number) => ({
            id: m.id || i + 1,
            title: m.name || m.title || `Module ${i + 1}`,
            lessons: m.lessonCount || m.lessons || 0,
            duration: m.duration || 'N/A',
            status: m.status === 'completed' ? 'Completed' : m.status === 'active' ? 'Active' : i === 0 ? 'Completed' : i === modules.length - 1 ? 'Locked' : 'Active'
          }))
        : fallbackCourseContent;

    const completedModules = courseContentData.filter((m: any) => m.status === 'Completed').length;
    const totalLessons = courseContentData.reduce((s: number, m: any) => s + (m.lessons || 0), 0);
    const progressPct = courseContentData.length > 0 ? Math.round((completedModules / courseContentData.length) * 100) : 0;

    const learningStats = [
        { label: 'Modules', value: String(courseContentData.length) },
        { label: 'Total Lessons', value: String(totalLessons) },
        { label: 'Completed', value: String(completedModules) },
        { label: 'Progress', value: `${progressPct}%` },
    ];

    const courseName = courses.length > 0 ? (courses[0].name || courses[0].title || 'Course Content') : 'Course Content';

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-ninja-yellow" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in slide-in-from-right duration-700">
            {/* Main Content Column */}
            <div className="lg:col-span-3 space-y-8">
                {/* Header */}
                <div className="space-y-4">
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-ninja-dark transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Portal
                    </button>
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight uppercase">Course Content</h1>
                    <p className="text-gray-500 font-bold text-sm">{courseName} • {totalLessons} Lessons total</p>
                </div>

                {/* Modules List */}
                <div className="space-y-4">
                    {courseContentData.map((module) => (
                        <Card key={module.id} className={cn(
                            "p-6 border-none shadow-sm rounded-3xl flex items-center justify-between group transition-all",
                            module.status === 'Locked' ? "opacity-50 grayscale bg-gray-50/50" : "bg-white hover:shadow-lg hover:-translate-y-1"
                        )}>
                            <div className="flex items-center gap-6">
                                <div className={cn(
                                    "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-110",
                                    module.status === 'Completed' ? "bg-green-100 text-green-600" : 
                                    module.status === 'Active' ? "bg-ninja-yellow text-ninja-dark shadow-ninja-yellow/20" : 
                                    "bg-gray-100 text-gray-400"
                                )}>
                                    {module.status === 'Completed' && <CheckCircle2 size={24} />}
                                    {module.status === 'Active' && <PlayCircle size={24} className="fill-ninja-dark" />}
                                    {module.status === 'Locked' && <Lock size={24} />}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-lg font-black text-ninja-dark leading-tight group-hover:text-ninja-yellow transition-colors">{module.title}</h4>
                                    <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1"><BookOpen size={12} /> {module.lessons} lessons</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {module.duration}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {module.status === 'Active' && (
                                    <button className="px-6 py-2.5 bg-ninja-yellow text-ninja-dark rounded-xl text-xs font-black uppercase shadow-lg shadow-ninja-yellow/20 hover:scale-105 transition-all">
                                        Start
                                    </button>
                                )}
                                {module.status === 'Completed' && (
                                    <div className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                        Completed
                                    </div>
                                )}
                                {module.status === 'Locked' && <Lock size={20} className="text-gray-300" />}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
                {/* Course Statistics */}
                <Card className="p-8 border-none shadow-sm bg-white rounded-[2.5rem]">
                    <h3 className="text-lg font-black text-ninja-dark uppercase tracking-tight mb-8">Course Stats</h3>
                    <div className="space-y-8 font-black">
                        {learningStats.map((stat, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-lg text-ninja-dark">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-50">
                      <div className="flex justify-between items-end mb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Progress</span>
                          <span className="text-xl font-black text-ninja-yellow">{progressPct}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                          <div className="h-full bg-ninja-yellow shadow-[0_0_10px_rgba(212,255,0,0.5)] transition-all" style={{ width: `${progressPct}%` }} />
                      </div>
                    </div>
                </Card>

                {/* Mentor Note */}
                <Card className="p-8 border-none shadow-sm bg-ninja-dark text-white rounded-[2.5rem] relative overflow-hidden group">
                    <div className="relative z-10 space-y-4">
                        <div className="h-12 w-12 rounded-full border-2 border-ninja-yellow p-1">
                          <div className="h-full w-full rounded-full bg-gray-600 flex items-center justify-center font-black text-xs">
                            MN
                          </div>
                        </div>
                        <div>
                          <h4 className="font-black text-white group-hover:text-ninja-yellow transition-colors">Mentor Ninja</h4>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Course Instructor</p>
                        </div>
                        <p className="text-xs font-medium text-gray-300 leading-relaxed italic">
                          "You're doing great! Finishing this module will unlock your first certificate."
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
