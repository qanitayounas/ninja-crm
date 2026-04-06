import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Users,
  Star,
  DollarSign,
  PlayCircle,
  MoreVertical,
  Loader2
} from 'lucide-react';
import { Card, cn } from '../../components/ui';
import { apiService } from '../../services/apiService';

const gradientColors = [
  'from-green-400 to-blue-500',
  'from-yellow-400 to-green-500',
  'from-blue-400 to-purple-500',
  'from-pink-400 to-red-500',
  'from-indigo-400 to-cyan-500',
];

export const MisCursos = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    apiService.getCourses()
      .then((data) => {
        const mapped = (data || []).map((c: any, i: number) => ({
          id: c.id || i + 1,
          title: c.name || c.title || `Course ${i + 1}`,
          lessons: c.lessonCount || c.lessons || 0,
          duration: c.duration || 'N/A',
          students: c.studentCount || c.students || 0,
          reviews: c.reviewCount || c.reviews || 0,
          revenue: c.revenue || '$0',
          status: c.status === 'published' || c.status === 'Published' ? 'Published' : 'Draft',
          color: gradientColors[i % gradientColors.length]
        }));
        setCourses(mapped);
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-ninja-yellow" />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <BookOpen size={48} className="mb-4 text-gray-300" />
        <p className="font-bold text-sm">No courses found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ninja-yellow transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-ninja-yellow/20 focus:border-ninja-yellow transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-ninja-dark hover:bg-gray-50 transition-all shadow-sm group">
          <Filter size={18} className="text-gray-400 group-hover:text-ninja-dark transition-colors" />
          Filters
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

const CourseCard = ({ course }: { course: any }) => (
  <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-[2rem]">
    {/* Thumbnail Placeholder */}
    <div className={cn(
      "h-48 w-full bg-gradient-to-br flex items-center justify-center relative",
      course.color
    )}>
      <BookOpen size={48} className="text-white/40" />
      <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-colors">
        <MoreVertical size={16} />
      </div>
    </div>

    {/* Content */}
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-black text-ninja-dark leading-tight group-hover:text-ninja-yellow transition-colors">{course.title}</h3>
      </div>
      
      <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
        <span>{course.lessons} lessons</span>
        <span>•</span>
        <span>{course.duration}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2">
        <Stat icon={Users} value={course.students.toString()} />
        <Stat icon={Star} value={course.reviews.toString()} />
        <Stat icon={DollarSign} value={course.revenue} isCurrency />
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-gray-50">
        <span className={cn(
          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
          course.status === 'Published' ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
        )}>
          {course.status}
        </span>
        <button className="flex items-center gap-1.5 text-sm font-black text-ninja-dark hover:gap-3 transition-all">
          <PlayCircle size={18} className="text-ninja-yellow" />
          View course
        </button>
      </div>
    </div>
  </Card>
);

const Stat = ({ icon: Icon, value, isCurrency }: { icon: any, value: string, isCurrency?: boolean }) => (
  <div className="flex items-center gap-1.5">
    <Icon size={14} className="text-gray-300" />
    <span className={cn("text-xs font-bold", isCurrency ? "text-green-600" : "text-gray-500")}>
      {value}
    </span>
  </div>
);
