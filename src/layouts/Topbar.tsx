import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Avatar, Button, Input } from '../components/ui';

interface TopbarProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
  onMenuClick?: () => void;
}

export const Topbar = ({ title, subtitle, actionText, onAction, onMenuClick }: TopbarProps) => {
  return (
    <header className="flex items-center justify-between h-24 pt-4 px-4 md:px-8 bg-transparent shrink-0">
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
        <div className="hidden lg:block w-48 xl:w-64">
          <Input icon={Search} placeholder="Search..." className="bg-white border-none shadow-sm" />
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

        <div className="flex items-center gap-2 md:gap-3 border-l pl-3 md:pl-6 ml-2">
          <div className="hidden sm:block text-right">
            <p className="text-xs md:text-sm font-semibold text-ninja-dark">Admin Ninja</p>
            <p className="text-[10px] text-gray-500">Super Admin</p>
          </div>
          <Avatar name="Admin Ninja" size="sm" className="md:size-md cursor-pointer hover:ring-2 hover:ring-ninja-yellow transition-all" />
        </div>
      </div>
    </header>
  );
};
