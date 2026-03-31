import { 
  BookOpen, 
  Users, 
  Trophy, 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  BarChart3, 
  ArrowUpRight,
  Sparkles,
  CreditCard,
  GraduationCap
} from 'lucide-react';
import { cn } from '../../components/ui';

export const SchoolProOverview = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section - Keep semi-dark for premium look */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ninja-dark p-8 md:p-12 border border-white/5 shadow-2xl shadow-ninja-dark/20">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <GraduationCap size={200} className="text-ninja-yellow rotate-12" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ninja-yellow/10 border border-ninja-yellow/20 text-ninja-yellow text-xs font-black uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            Educational Ecosystem
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Welcome to <span className="text-ninja-yellow">SchoolPro</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed">
            Create, manage and monetize courses and educational communities directly from your CRM. 
            Everything in one place to scale your knowledge.
          </p>
        </div>
      </div>

      {/* Main Grid: Features & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feature Cards Loop */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard 
            icon={BookOpen}
            title="Quick Creation"
            description="Build complete courses in minutes with our intuitive lesson and module builder."
            color="bg-blue-500"
          />
          <FeatureCard 
            icon={CreditCard}
            title="Direct Monetization"
            description="Sell courses, subscriptions and bundles with integrated payments and billing management."
            color="bg-purple-500"
          />
          <FeatureCard 
            icon={Trophy}
            title="Gamification"
            description="Automatic certificates and badges to increase engagement and retention of your students."
            color="bg-ninja-yellow"
          />
          <FeatureCard 
            icon={Zap}
            title="Automation"
            description="Automate welcome messages, study reminders and personalized follow-ups per module."
            color="bg-orange-500"
          />
        </div>

        {/* Quick Summary Sidebar Card */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-6 lg:p-8 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-ninja-dark uppercase tracking-tight">Quick Summary</h3>
            <BarChart3 className="text-gray-300" size={20} />
          </div>

          <div className="space-y-5">
            <StatRow label="Students" value="718" color="text-ninja-yellow" />
            <StatRow label="Active Courses" value="8" color="text-ninja-dark" />
            <StatRow label="Revenue (month)" value="$24,500" color="text-green-600" />
            
            <div className="pt-4 mt-4 border-t border-gray-100">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Completed</span>
                <span className="text-sm font-black text-ninja-dark">58.4%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-ninja-yellow rounded-full w-[58.4%] shadow-[0_0_12px_rgba(212,255,0,0.3)]" />
              </div>
            </div>
          </div>

          <button className="mt-4 w-full py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-ninja-dark font-bold text-sm transition-all border border-gray-200 group flex items-center justify-center gap-2">
            View detailed reports
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Creation Actions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-ninja-dark tracking-tight uppercase">What do you want to create?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionCard 
            icon={BookOpen}
            title="Create Course"
            description="Design and publish complete courses with lessons, quizzes and certificates."
            buttonText="Start Course"
            isPrimary
          />
          <ActionCard 
            icon={Users}
            title="Create Community"
            description="Build interaction spaces for your students and members."
            buttonText="Create Community"
            color="bg-indigo-500"
          />
        </div>
      </div>

      {/* Checklist / Features List */}
      <div className="mt-12 p-8 md:p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-ninja-dark mb-8 text-center uppercase tracking-tight">Everything you need to teach and monetize</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Complete course and lesson management",
            "Customizable certificates",
            "Branded student portal",
            "Membership-based access control",
            "Badge and gamification system",
            "Drip content (progressive release)",
            "Quizzes and assessments",
            "Communities and forums",
            "Student analytics dashboard"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="h-6 w-6 rounded-full bg-ninja-yellow/20 flex items-center justify-center text-ninja-yellow flex-shrink-0">
                <CheckCircle2 size={14} />
              </div>
              <span className="text-sm font-bold text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) => (
  <div className="group bg-white hover:bg-gray-50 border border-gray-100 p-6 rounded-[2.5rem] transition-all cursor-pointer shadow-sm hover:shadow-md">
    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-current/10", color + " bg-opacity-10 text-" + color.split('-')[1] + "-500")}>
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-black text-ninja-dark mb-2 tracking-tight">{title}</h3>
    <p className="text-sm text-gray-400 font-medium leading-relaxed">{description}</p>
  </div>
);

const ActionCard = ({ icon: Icon, title, description, buttonText, isPrimary, color }: { icon: any, title: string, description: string, buttonText: string, isPrimary?: boolean, color?: string }) => (
  <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center text-center gap-6 group shadow-sm hover:shadow-md transition-all">
    <div className={cn(
      "h-20 w-20 rounded-[1.5rem] flex items-center justify-center mb-2 shadow-xl",
      isPrimary ? "bg-ninja-yellow text-ninja-dark shadow-ninja-yellow/20" : cn(color, "bg-indigo-500 text-white shadow-indigo-500/20")
    )}>
      <Icon size={40} strokeWidth={2.5} />
    </div>
    <div>
      <h3 className="text-2xl font-black text-ninja-dark mb-2 tracking-tight">{title}</h3>
      <p className="text-gray-400 font-medium max-w-xs">{description}</p>
    </div>
    <button className={cn(
      "w-full py-4 px-8 rounded-2xl font-black text-sm transition-all transform active:scale-95 flex items-center justify-center gap-2",
      isPrimary 
        ? "bg-ninja-yellow text-ninja-dark hover:shadow-[0_8px_25px_-5px_rgba(212,255,0,0.5)]" 
        : "bg-ninja-dark text-white hover:bg-black"
    )}>
      {buttonText}
      <ArrowUpRight size={18} />
    </button>
  </div>
);

const StatRow = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex justify-between items-center group">
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    <span className={cn("text-xl font-black tracking-tight", color)}>{value}</span>
  </div>
);
