import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '../components/ui';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const DashboardLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  
  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Custom headers based on route - now handled in individual pages
  const getHeaderInfo = () => {
    return { title: '', subtitle: '', actionText: '' };
  };

  const { title, subtitle, actionText } = getHeaderInfo();

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-hidden bg-ninja-bg flex">
      {/* Sidebar - Desktop & Mobile */}
      <Sidebar 
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />
      
      {/* Main Content */}
      <div className={cn(
        "flex-1 min-w-0 flex flex-col h-screen max-w-[100vw] lg:max-w-none transition-all duration-300 ease-in-out",
        isSidebarExpanded ? "lg:ml-60" : "lg:ml-20"
      )}>
        <Topbar 
          title={title} 
          subtitle={subtitle} 
          actionText={actionText} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        
        <div className="flex-1 min-w-0 overflow-auto p-4 md:p-8 pt-2 md:pt-4 custom-scrollbar">
          <div className="w-full max-w-full">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
