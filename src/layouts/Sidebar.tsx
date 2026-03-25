import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  GitBranch, 
  MessageSquare, 
  Calendar, 
  Zap, 
  BarChart2, 
  CreditCard, 
  Image as ImageIcon, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../components/ui';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
}

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Contacts', path: '/dashboard/contacts' },
  { icon: GitBranch, label: 'Pipeline', path: '/dashboard/pipeline' },
  { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
  { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
  { icon: Zap, label: 'Automations', path: '/dashboard/automations' },
  { icon: BarChart2, label: 'Reports', path: '/dashboard/reports' },
  { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
  { icon: ImageIcon, label: 'Media', path: '/dashboard/media' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export const Sidebar = ({ isExpanded, setIsExpanded, isMobileOpen, setIsMobileOpen }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    navigate('/');
  };

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
          <div className="flex items-center gap-3 text-ninja-yellow">
            <Zap size={32} fill="currentColor" />
            {isExpanded && <span className="font-black tracking-tighter text-xl text-white">NINJA CRM</span>}
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
        <nav className="flex-1 flex flex-col gap-1 md:gap-2 px-4 py-4 overflow-visible">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "relative group flex items-center gap-3 p-2 md:p-3 rounded-xl transition-all",
                  isActive ? "bg-ninja-yellow text-ninja-dark font-bold shadow-sm" : "text-white/40 hover:text-white hover:bg-white/5",
                  !isExpanded && "justify-center px-0"
                )}
                title={!isExpanded ? item.label : ''}
              >
                <item.icon size={22} className={cn("relative z-10 flex-shrink-0", isActive ? "text-ninja-dark" : "")} />
                
                {isExpanded && <span className="text-sm truncate">{item.label}</span>}
                
                {/* Tooltip (only when collapsed) */}
                {!isExpanded && (
                  <span className="absolute left-16 bg-ninja-dark text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl z-50">
                    {item.label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={cn(
              "w-full flex items-center gap-3 p-3 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group relative",
              !isExpanded && "justify-center px-0"
            )}
          >
            <LogOut size={22} className="flex-shrink-0" />
            {isExpanded && <span className="text-sm font-bold">Logout</span>}
            {!isExpanded && (
              <span className="absolute left-16 bg-ninja-dark text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl z-50">
                Logout
              </span>
            )}
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
