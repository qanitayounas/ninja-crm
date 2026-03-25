import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white rounded-3xl shadow-ninja p-6", className)}>
    {children}
  </div>
);

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' }) => {
  const variants = {
    primary: "bg-ninja-yellow text-ninja-dark hover:opacity-90",
    secondary: "bg-white text-ninja-dark border border-gray-200 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  
  return (
    <button 
      className={cn(
        "font-semibold py-2.5 px-6 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Badge = ({ children, status }: { children: React.ReactNode; status: string }) => {
  const colors: Record<string, string> = {
    Qualified: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Archived: "bg-gray-100 text-gray-600",
    Lead: "bg-purple-100 text-purple-700",
    Active: "bg-green-100 text-green-700",
    Paused: "bg-orange-100 text-orange-700",
    'Past Due': "bg-red-100 text-red-700",
  };
  
  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-medium", colors[status] || "bg-gray-100 text-gray-800")}>
      {children}
    </span>
  );
};

export const Avatar = ({ name, src, size = 'md', className }: { name: string; src?: string; size?: 'sm' | 'md' | 'lg'; className?: string }) => {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };
  
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  return (
    <div className={cn("relative inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold overflow-hidden", sizes[size], className)}>
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export const Input = ({ icon: Icon, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon?: any }) => (
  <div className="relative w-full">
    {Icon && (
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon size={18} />
      </div>
    )}
    <input
      className={cn(
        "w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 outline-none transition-all focus:border-ninja-yellow focus:ring-1 focus:ring-ninja-yellow",
        Icon && "pl-10",
        className
      )}
      {...props}
    />
  </div>
);

export const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={cn(
      "w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none transition-all focus:border-ninja-yellow focus:ring-1 focus:ring-ninja-yellow min-h-[100px] resize-y",
      className
    )}
    {...props}
  />
);

export const Select = ({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={cn(
      "w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 outline-none transition-all focus:border-ninja-yellow focus:ring-1 focus:ring-ninja-yellow appearance-none cursor-pointer",
      className
    )}
    {...props}
  >
    {children}
  </select>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-50">
          <h2 className="text-xl font-bold text-ninja-dark">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-ninja-dark hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
