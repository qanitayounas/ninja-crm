import { Bell, Search, Menu } from 'lucide-react';
import { Avatar, Button, Input } from '../components/ui';

interface TopbarProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
  onMenuClick?: () => void;
}

const getUserInfo = () => {
  try {
    const stored = localStorage.getItem('ninja_crm_user') || sessionStorage.getItem('ninja_crm_user');
    if (stored) return JSON.parse(stored);
  } catch {}
  return { name: 'Admin Ninja', role: 'Super Admin' };
};

export const Topbar = ({ title, subtitle, actionText, onAction, onMenuClick }: TopbarProps) => {
  const userInfo = getUserInfo();
  return (
    <header className="flex items-center justify-between h-20 pt-4 px-4 md:px-8 bg-transparent shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-ninja-dark hover:bg-white rounded-xl transition-all"
        >
          <Menu size={24} />
        </button>
        {title && (
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl font-bold text-ninja-dark truncate">{title}</h1>
            {subtitle && <p className="hidden md:block text-xs md:text-sm text-gray-500 mt-1 truncate">{subtitle}</p>}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden lg:block w-72 xl:w-96">
          <Input 
            icon={Search} 
            placeholder="Search..." 
            className="bg-gray-50/50 border-none shadow-none rounded-2xl h-12 focus:bg-white transition-all" 
          />
        </div>
        
        <button className="lg:hidden p-2 text-gray-400 hover:text-ninja-dark transition-colors">
          <Search size={22} />
        </button>

        <button className="relative p-2 text-gray-400 hover:text-ninja-dark transition-colors">
          <Bell size={22} className="md:w-6 md:h-6" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {actionText && (
          <div className="hidden sm:block">
            <Button onClick={onAction} className="whitespace-nowrap px-4 py-2 text-sm">
              {actionText}
            </Button>
          </div>
        )}

        <div className="flex items-center gap-3 ml-2">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-black text-ninja-dark leading-tight">{userInfo.name || 'User'}</p>
            <p className="text-[11px] text-gray-400 font-bold leading-tight">{userInfo.role || 'Connected'}</p>
          </div>
          <Avatar name={userInfo.name || 'User'} size="md" className="cursor-pointer hover:scale-105 transition-all rounded-full" />
        </div>
      </div>
    </header>
  );
};
