import { useState, useEffect } from 'react';
import {
  PlayCircle,
  BookOpen,
  Star,
  Trophy,
  BookMarked,
  Clock,
  CheckCircle2,
  Flame,
  Calendar,
  Loader2
} from 'lucide-react';
import { Card, cn } from '../../components/ui';
import { apiService } from '../../services/apiService';

const courseColors = [
  'from-green-400 to-blue-500',
  'from-yellow-400 to-green-500',
  'from-blue-400 to-purple-500',
  'from-pink-400 to-red-500',
];

// Fallback static data
const fallbackAchievements = [
  { id: 1, title: 'First Step', type: 'Badge', icon: 'star', isCompleted: true },
  { id: 2, title: 'Studious', type: 'Badge', icon: 'book', isCompleted: true },
  { id: 3, title: 'Quiz Master', type: 'Badge', icon: 'trophy', isCompleted: false },
];
const fallbackUpcoming = [
  { title: 'Next Lesson', time: 'Soon' },
  { title: 'Live Session', time: 'Upcoming' },
];

export const StudentPortalOverview = () => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<any[]>([]);
    const [contacts, setContacts] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            apiService.getCourses().catch(() => []),
            apiService.getContacts().catch(() => [])
        ]).then(([coursesData, contactsData]) => {
            setCourses(coursesData || []);
            setContacts(contactsData || []);
        }).finally(() => setLoading(false));
    }, []);

    const totalStudents = contacts.length;
    const totalLessons = courses.reduce((s: number, c: any) => s + (c.lessonCount || c.lessons || 0), 0);

    const myLearningCourses = courses.map((c: any, i: number) => ({
        id: c.id || i + 1,
        title: c.name || c.title || `Course ${i + 1}`,
        lastActivity: c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : 'N/A',
        progress: c.completionRate || (c.status === 'completed' ? 100 : 50),
        lessonsCompleted: c.completedLessons || Math.floor((c.lessonCount || 0) * 0.5),
        totalLessons: c.lessonCount || c.lessons || 0,
        nextLesson: c.status === 'completed' ? 'None' : 'Next lesson',
        status: c.status === 'completed' ? 'Completed' : undefined,
        color: courseColors[i % courseColors.length]
    }));

    const firstCourse = myLearningCourses[0];
    const studentProgressBanner = firstCourse
        ? { title: firstCourse.title, nextLesson: firstCourse.nextLesson || 'Next lesson', progress: firstCourse.progress, status: 'In progress', color: 'bg-ninja-yellow' }
        : { title: 'No courses yet', nextLesson: 'N/A', progress: 0, status: 'Not started', color: 'bg-gray-400' };

    const learningStats = [
        { label: 'Students', value: String(totalStudents) },
        { label: 'Total Lessons', value: String(totalLessons) },
        { label: 'Courses', value: String(courses.length) },
        { label: 'Completion', value: courses.length > 0 ? `${Math.round(myLearningCourses.reduce((s: number, c: any) => s + c.progress, 0) / myLearningCourses.length)}%` : '0%' },
    ];

    const myAchievements = fallbackAchievements;
    const upcomingActivities = fallbackUpcoming;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-ninja-yellow" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in duration-700">
            {/* Main Content Column */}
            <div className="lg:col-span-3 space-y-8">
                {/* Header with Streak */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-ninja-dark tracking-tight uppercase">My Learning Portal</h1>
                        <p className="text-gray-500 font-bold text-sm">Continue your educational progress</p>
                    </div>
                    <div className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm group hover:scale-105 transition-transform cursor-default">
                        <span className="text-sm font-black text-gray-500 uppercase tracking-widest">Study Streak</span>
                        <div className="flex items-center gap-1.5 bg-ninja-yellow/10 px-3 py-1 rounded-xl">
                            <span className="text-lg font-black text-ninja-dark">7 days</span>
                            <Flame size={20} className="text-orange-500 fill-orange-500 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Featured Course Banner */}
                <Card className="p-10 border-none shadow-sm bg-ninja-dark text-white rounded-[3rem] relative overflow-hidden group">
                    <div className="relative z-10 space-y-6">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-ninja-yellow text-ninja-dark text-[10px] font-black uppercase tracking-[0.2em]">
                            {studentProgressBanner.status}
                        </div>
                        <div>
                            <h2 className="text-4xl font-black mb-2 group-hover:text-ninja-yellow transition-colors">{studentProgressBanner.title}</h2>
                            <p className="text-gray-400 font-bold text-sm">Next Lesson: <span className="text-white">{studentProgressBanner.nextLesson}</span></p>
                        </div>
                        <div className="space-y-3 max-w-md">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Course Progress</span>
                                <span className="text-xl font-black text-ninja-yellow">{studentProgressBanner.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-ninja-yellow shadow-[0_0_15px_rgba(212,255,0,0.5)] transition-all duration-1000 ease-out" style={{ width: `${studentProgressBanner.progress}%` }} />
                            </div>
                        </div>
                        <div className="pt-4 flex items-center gap-6">
                            <button className="flex items-center gap-2 px-8 py-4 bg-ninja-yellow text-ninja-dark rounded-2xl font-black text-sm uppercase shadow-lg shadow-ninja-yellow/20 hover:scale-105 active:scale-95 transition-all">
                                <PlayCircle size={20} className="fill-ninja-dark" />
                                Continue Learning
                            </button>
                            <div className="h-16 w-16 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:rotate-12 transition-transform">
                                <BookOpen size={28} className="text-ninja-yellow" />
                            </div>
                        </div>
                    </div>
                    {/* Abstract background shape */}
                    <div className="absolute top-0 right-0 h-[300px] w-[300px] bg-gradient-to-br from-ninja-yellow/20 to-transparent blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                </Card>

                {/* My Courses Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-ninja-dark tracking-tight uppercase">My Courses</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {myLearningCourses.map((course) => (
                            <Card key={course.id} className="p-8 border-none shadow-sm bg-white rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 hover:shadow-xl transition-all group">
                                <div className={cn("h-24 w-24 rounded-[2rem] flex items-center justify-center shrink-0 bg-gradient-to-br text-white shadow-lg group-hover:rotate-6 transition-transform", course.color)}>
                                    <BookOpen size={36} />
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                        <h4 className="text-xl font-black text-ninja-dark leading-tight group-hover:text-ninja-yellow transition-colors">{course.title}</h4>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{course.lastActivity}</p>
                                    </div>
                                    <p className="text-xs font-bold text-gray-500">
                                        {course.lessonsCompleted} / {course.totalLessons} lessons 
                                        {course.nextLesson !== 'None' && <span className="ml-2 px-2 py-0.5 bg-gray-50 rounded-lg">• Next: {course.nextLesson}</span>}
                                    </p>
                                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-ninja-dark transition-all duration-1000 ease-out" style={{ width: `${course.progress}%` }} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 shrink-0">
                                    <span className="text-lg font-black text-ninja-dark">{course.progress}%</span>
                                    <div className="flex gap-2">
                                        <button className="px-6 py-2.5 bg-ninja-yellow text-ninja-dark rounded-xl text-xs font-black uppercase hover:scale-105 transition-all">
                                            {course.status === 'Completed' ? 'Review' : 'Continue'}
                                        </button>
                                        <button className="px-4 py-2.5 bg-gray-50 text-gray-500 rounded-xl text-xs font-black uppercase hover:bg-gray-100 transition-all">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
                {/* Achievements */}
                <Card className="p-8 border-none shadow-sm bg-white rounded-[2.5rem]">
                    <h3 className="text-lg font-black text-ninja-dark uppercase tracking-tight mb-8">My Achievements</h3>
                    <div className="space-y-6">
                        {myAchievements.map((achievement) => (
                            <div key={achievement.id} className="group cursor-pointer hover:translate-x-2 transition-transform">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className={cn(
                                        "h-12 w-12 rounded-2xl flex items-center justify-center transition-all",
                                        achievement.isCompleted ? "bg-ninja-yellow text-ninja-dark shadow-lg shadow-ninja-yellow/20" : "bg-gray-50 text-gray-300 border border-gray-100"
                                    )}>
                                        {achievement.icon === 'star' && <Star size={24} className={achievement.isCompleted ? "fill-ninja-dark" : ""} />}
                                        {achievement.icon === 'book' && <BookMarked size={24} />}
                                        {achievement.icon === 'trophy' && <Trophy size={24} />}
                                        {!achievement.icon && <CheckCircle2 size={24} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={cn("text-sm font-black truncate leading-tight", achievement.isCompleted ? "text-ninja-dark" : "text-gray-400 group-hover:text-ninja-dark")}>
                                            {achievement.title}
                                        </h4>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{achievement.type}</p>
                                    </div>
                                </div>
                                {!achievement.isCompleted && (achievement as any).progress && (
                                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-ninja-yellow transition-all" style={{ width: `${(achievement as any).progress}%` }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 text-[10px] font-black text-gray-400 border border-gray-100 rounded-xl uppercase tracking-widest hover:bg-gray-50 hover:text-ninja-dark transition-all">
                        View all achievements
                    </button>
                </Card>

                {/* Study Statistics */}
                <Card className="p-8 border-none shadow-sm bg-white rounded-[2.5rem]">
                    <h3 className="text-lg font-black text-ninja-dark uppercase tracking-tight mb-8">Stats</h3>
                    <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                        {learningStats.map((stat, i) => (
                            <div key={i}>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-xl font-black text-ninja-dark">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Upcoming */}
                <Card className="p-8 border-none shadow-sm bg-white rounded-[2.5rem]">
                    <h3 className="text-lg font-black text-ninja-dark uppercase tracking-tight mb-8">Upcoming</h3>
                    <div className="space-y-6">
                        {upcomingActivities.map((activity, i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-pointer hover:translate-x-2 transition-transform">
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center",
                                    i === 0 ? "bg-red-50 text-red-500" : "bg-purple-50 text-purple-600"
                                )}>
                                    {i === 0 ? <Clock size={20} /> : <Calendar size={20} />}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-ninja-dark group-hover:text-ninja-yellow">{activity.title}</h4>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};
