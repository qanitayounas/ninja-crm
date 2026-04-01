import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  MessageSquare,
  Calendar,
  Zap,
  BarChart2,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,

  Flag,
  Megaphone,
  Globe,
  Star,

  Folder,
  TrendingUp,
  ArrowLeft,
  ShoppingCart,
  Video,
  FileText,
  BookOpen,
  ClipboardList,
  MessageCircle,
  Clock,
  LayoutDashboard,
  List,
  Link,
  Smartphone,
  Mail,
  Bot,
  Grid,
  BarChart3 as BarChartIcon,
  Target,
  Trophy,
  QrCode,
  Timer,
  Link2,
  Palette,
  Workflow,
  Sparkles,
  Bell,
  GraduationCap
} from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '../components/ui';
import { useRole } from '../context/RoleContext';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
}

const mainNavItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Contacts', path: '/dashboard/contacts' },
  { icon: ClipboardList, label: 'Tasks', path: '/dashboard/tasks' },

  { icon: Flag, label: 'Campaigns', path: '/dashboard/campaigns' },
  { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
  { icon: TrendingUp, label: 'Pipeline', path: '/dashboard/pipeline' },
  { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
  { icon: Target, label: 'Marketing Hub', path: '/dashboard/marketing-hub' },
  { icon: Megaphone, label: 'Marketing', path: '/dashboard/marketing' },
  { icon: Zap, label: 'Automations', path: '/dashboard/automations' },
  { icon: Globe, label: 'Sites', path: '/dashboard/sites/stores' },
  { icon: Folder, label: 'Media', path: '/dashboard/media' },
  { icon: BarChart2, label: 'Reports', path: '/dashboard/reports' },

  { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
  { icon: Star, label: 'Reputation', path: '/dashboard/reputation' },
  { icon: GraduationCap, label: 'SchoolPro', path: '/dashboard/schoolpro' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const sitesNavItems = [
  { icon: ArrowLeft, label: 'Go Back', path: '/dashboard' },
  { icon: Globe, label: 'Websites', path: '/dashboard/sites/web' },
  { icon: ShoppingCart, label: 'Stores', path: '/dashboard/sites/stores' },
  { icon: Video, label: 'Webinars', path: '/dashboard/sites/webinars' },
  { icon: BarChart2, label: 'Analytics', path: '/dashboard/sites/analytics' },
  { icon: FileText, label: 'Blogs', path: '/dashboard/sites/blogs' },
  { icon: BookOpen, label: 'WordPress', path: '/dashboard/sites/wordpress' },
  { icon: Users, label: 'Client Portal', path: '/dashboard/sites/portal' },
  { icon: MessageSquare, label: 'Forms', path: '/dashboard/sites/forms' },
  { icon: Target, label: 'Surveys', path: '/dashboard/sites/surveys' },
  { icon: ClipboardList, label: 'Quizzes', path: '/dashboard/sites/quizzes' },
  { icon: MessageCircle, label: 'Chat Widget', path: '/dashboard/sites/chatwidget' },
  { icon: QrCode, label: 'QR Codes', path: '/dashboard/sites/qr' },
  { icon: Settings, label: 'Settings', path: '/dashboard/sites/settings' },
];

const reportsNavItems = [
  { icon: ArrowLeft, label: 'Go Back', path: '/dashboard' },
  { icon: Target, label: 'Attribution', path: '/dashboard/reports/attribution' },
  { icon: Calendar, label: 'Appointments', path: '/dashboard/reports/appointments' },
  { icon: Globe, label: 'Global KPIs', path: '/dashboard/reports/kpis' },
  { icon: Zap, label: 'Facebook Ads', path: '/dashboard/reports/fb-ads' },
  { icon: Zap, label: 'Google Ads', path: '/dashboard/reports/google-ads' },
  { icon: Trophy, label: 'Agent Ranking', path: '/dashboard/reports/ranking' },
  { icon: Clock, label: 'Scheduling', path: '/dashboard/reports/scheduling' },
];

const reputationNavItems = [
  { icon: ArrowLeft, label: 'Go Back', path: '/dashboard' },
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/reputation/overview' },
  { icon: MessageSquare, label: 'Requests', path: '/dashboard/reputation/requests' },
  { icon: List, label: 'Management', path: '/dashboard/reputation/management' },
  { icon: Link, label: 'Review Link', path: '/dashboard/reputation/link' },
  { icon: Zap, label: 'Automation', path: '/dashboard/reputation/automation' },
  { icon: Smartphone, label: 'SMS', path: '/dashboard/reputation/sms' },
  { icon: Mail, label: 'Email', path: '/dashboard/reputation/email' },
  { icon: MessageCircle, label: 'WhatsApp', path: '/dashboard/reputation/whatsapp' },
  { icon: QrCode, label: 'QR Codes', path: '/dashboard/reputation/qrcodes' },
  { icon: Bot, label: 'Review AI', path: '/dashboard/reputation/ai' },
  { icon: Grid, label: 'Widgets', path: '/dashboard/reputation/widgets' },
  { icon: Globe, label: 'Google Business', path: '/dashboard/reputation/google' },
  { icon: BarChartIcon, label: 'Analytics', path: '/dashboard/reputation/analytics' },
  { icon: Settings, label: 'Settings', path: '/dashboard/reputation/settings' },
];

const marketingNavItems = [
  { icon: ArrowLeft, label: 'Go Back', path: '/dashboard/marketing-hub' },
  { icon: Megaphone, label: 'Ads Manager', path: '/dashboard/marketing/ads' },
  { icon: Mail, label: 'Email Marketing', path: '/dashboard/marketing/email' },
  { icon: FileText, label: 'Snippets', path: '/dashboard/marketing/snippets' },
  { icon: Timer, label: 'Timers', path: '/dashboard/marketing/timers' },
  { icon: Link2, label: 'Activation Links', path: '/dashboard/marketing/links' },
  { icon: Users, label: 'Affiliate Manager', path: '/dashboard/marketing/affiliate' },
  { icon: Calendar, label: 'Social Media', path: '/dashboard/marketing/social' },
  { icon: Palette, label: 'Brand Panels', path: '/dashboard/marketing/brand' },
  { icon: BarChartIcon, label: 'Statistics', path: '/dashboard/marketing/stats' },
  { icon: Zap, label: 'Automation', path: '/dashboard/marketing/automation' },
];

const automationNavItems = [
  { icon: ArrowLeft, label: 'Go Back', path: '/dashboard' },
  { icon: Zap, label: 'Overview', path: '/dashboard/automations/overview' },
  { icon: Workflow, label: 'Workflows', path: '/dashboard/automations/workflows' },
  { icon: FileText, label: 'Templates', path: '/dashboard/automations/templates' },
  { icon: Sparkles, label: 'MagnusFlow', path: '/dashboard/automations/magnusflow' },
  { icon: Bell, label: 'Alerts', path: '/dashboard/automations/alerts' },
  { icon: Settings, label: 'Settings', path: '/dashboard/automations/settings' },
];
const schoolProNavItems = [
  { icon: ArrowLeft, label: 'Go Back', path: '/dashboard' },
  { icon: GraduationCap, label: 'Dashboard', path: '/dashboard/schoolpro/overview' },
  { icon: BookOpen, label: 'Courses', path: '/dashboard/schoolpro/courses' },
  { icon: Users, label: 'Communities', path: '/dashboard/schoolpro/communities' },
  { icon: Trophy, label: 'Certificates', path: '/dashboard/schoolpro/certificates' },
  { icon: LayoutDashboard, label: 'Student Portal', path: '/dashboard/schoolpro/student-portal' },
  { icon: CreditCard, label: 'Monetization', path: '/dashboard/schoolpro/monetization' },
  { icon: Zap, label: 'Automation', path: '/dashboard/schoolpro/automation' },
];

export const Sidebar = ({ isExpanded, setIsExpanded, isMobileOpen, setIsMobileOpen }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const isSitesModule = location.pathname.startsWith('/dashboard/sites');
  const isReportsModule = location.pathname.startsWith('/dashboard/reports');
  const isReputationModule = location.pathname.startsWith('/dashboard/reputation');
  const isMarketingHub = location.pathname === '/dashboard/marketing-hub';
  const isMarketingModule = (location.pathname.startsWith('/dashboard/marketing/') || location.pathname === '/dashboard/marketing') && !isMarketingHub;
  const isAutomationModule = location.pathname.startsWith('/dashboard/automations');
  const isSchoolProModule = location.pathname.startsWith('/dashboard/schoolpro');

  let baseNavItems = mainNavItems;
  if (isSitesModule) baseNavItems = sitesNavItems;
  else if (isReportsModule) baseNavItems = reportsNavItems;
  else if (isReputationModule) baseNavItems = reputationNavItems;
  else if (isMarketingModule) baseNavItems = marketingNavItems;
  else if (isAutomationModule) baseNavItems = automationNavItems;
  else if (isSchoolProModule) baseNavItems = schoolProNavItems;

  const { role } = useRole();

  const activeNavItems = baseNavItems.filter(item => {
    if (role === 'Super Admin' || role === 'Agency Manager') return true;
    if (role === 'Sales Rep') {
      return ['Dashboard', 'Contacts', 'Tasks', 'Calls', 'Calendar', 'Pipeline', 'Messages', 'Reports', 'Settings', 'Go Back'].includes(item.label);
    }
    if (role === 'Client Viewer') {
      return ['Dashboard', 'Reports', 'Messages', 'Media', 'Go Back'].includes(item.label);
    }
    return true;
  });

  return (
    <>
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-ninja-dark flex flex-col transition-all duration-300 ease-in-out z-50",
        isExpanded ? "w-60" : "w-20",
        "transform lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Brand & Mobile Close */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 group cursor-pointer h-10 overflow-hidden">
               {/* Context aware title */}
               {isExpanded && isMarketingModule && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="text-[14px] font-black text-white uppercase tracking-tighter leading-none">Marketing System</div>
                  <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none mt-1 group-hover:text-ninja-yellow transition-colors italic">Complete Management</div>
                </div>
               )}
               {isExpanded && isReputationModule && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="text-[14px] font-black text-white uppercase tracking-tighter leading-none">Reputation</div>
                  <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none mt-1 group-hover:text-ninja-yellow transition-colors italic">Complete Management</div>
                </div>
               )}
               {isExpanded && isSitesModule && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="text-[14px] font-black text-white uppercase tracking-tighter leading-none">Site Builder</div>
                  <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none mt-1 group-hover:text-ninja-yellow transition-colors italic">Full Customization</div>
                </div>
               )}
                {isExpanded && isAutomationModule && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="text-[14px] font-black text-white uppercase tracking-tighter leading-none">Automation</div>
                  <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none mt-1 group-hover:text-ninja-yellow transition-colors italic">Workflow Control</div>
                </div>
               )}
               {isExpanded && isSchoolProModule && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="text-[14px] font-black text-white uppercase tracking-tighter leading-none">SchoolPro</div>
                  <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none mt-1 group-hover:text-ninja-yellow transition-colors italic">Educational Ecosystem</div>
                </div>
               )}
               {isExpanded && !isMarketingModule && !isReputationModule && !isSitesModule && !isAutomationModule && !isSchoolProModule && (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center text-ninja-yellow transition-transform hover:scale-110 flex-shrink-0">
                    <Zap size={32} fill="currentColor" stroke="none" />
                  </div>
                  <span className="font-black tracking-tighter text-xl text-white uppercase animate-in slide-in-from-left-4 duration-300 whitespace-nowrap">
                    NINJA CRM
                  </span>
                </div>
               )}
               {!isExpanded && (
                <div className="flex items-center justify-center text-ninja-yellow transition-transform hover:scale-110 flex-shrink-0 w-full h-full">
                  <Zap size={30} fill="currentColor" stroke="none" className="-ml-1" />
                </div>
               )}
            </div>
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-white/50 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Desktop Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden lg:flex absolute -right-3 top-20 bg-ninja-yellow text-ninja-dark h-6 w-6 rounded-full items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
        >
          {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 md:gap-1.5 px-3 py-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {activeNavItems.map((item) => {
            const isActive = location.pathname === item.path || (
              location.pathname.startsWith(item.path + '/') && 
              item.path !== '/dashboard'
            );
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  setIsMobileOpen(false);
                  if (item.path !== location.pathname) {
                    toast.success(`Opening ${item.label}`);
                  }
                }}
                className={cn(
                  "relative group flex items-center gap-3 p-2 rounded-xl transition-all",
                  isActive ? "bg-ninja-yellow text-ninja-dark font-black shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5 font-bold",
                  !isExpanded && "justify-center px-0"
                )}
                title={!isExpanded ? item.label : ''}
              >
                <item.icon size={20} className={cn("relative z-10 flex-shrink-0", isActive ? "text-ninja-dark" : "")} />

                {isExpanded && <span className="text-xs truncate">{item.label}</span>}
                
                {item.label === 'MagnusFlow' && (
                   <div className="absolute right-3 h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse shadow-orange-500/50" />
                )}
              </NavLink>
            );
          })}
        </nav>

        
        {/* Footer / Logout */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={cn(
              "w-full flex items-center gap-3 p-3 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group relative",
              !isExpanded && "justify-center px-0"
            )}
            title={!isExpanded ? "Logout" : ""}
          >
            <LogOut size={22} className="flex-shrink-0" />
            {isExpanded && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          />
          {/* Dialog Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center gap-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="h-16 w-16 rounded-2xl bg-red-50 flex items-center justify-center">
              <AlertTriangle size={32} className="text-red-500" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-black text-ninja-dark tracking-tight">Logout?</h2>
              <p className="text-gray-400 text-sm font-medium mt-1">You will be redirected to the login screen.</p>
            </div>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 px-4 rounded-2xl border-2 border-gray-100 text-gray-500 font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 px-4 rounded-2xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
              >
                Yes, logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
