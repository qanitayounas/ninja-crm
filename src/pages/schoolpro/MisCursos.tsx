import { 
  Search, 
  Filter, 
  BookOpen, 
  Users, 
  Star, 
  DollarSign, 
  PlayCircle,
  MoreVertical
} from 'lucide-react';
import { Card, cn } from '../../components/ui';
import { myCoursesData } from '../../data/schoolProData';

export const MisCursos = () => {
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
        {myCoursesData.map((course) => (
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
