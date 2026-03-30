import { Settings, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from './ui';

interface ModulePlaceholderProps {
    title: string;
    icon?: LucideIcon;
}

export const ModulePlaceholder = ({ title, icon: Icon = Settings }: ModulePlaceholderProps) => {
    // Dynamic description based on the title
    const moduleName = title.replace('-', ' ').toLowerCase();
    const description = `Complete functionalities to manage all aspects of ${moduleName} within your reputation system.`;

    const features = [
        `Real-time ${moduleName} monitoring`,
        `Direct integration with your CRM`,
        `Advanced ${moduleName} analytics`,
        "Smart automated campaigns",
        "Performance optimization checklists",
        "Detailed historical reporting"
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-4xl mx-auto text-center py-12 px-6 animate-in zoom-in-95 duration-700">
            {/* Visual Icon Box */}
            <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-ninja-yellow/30 blur-3xl rounded-full scale-150 animate-pulse" />
                <div className="relative h-24 w-24 rounded-[32px] bg-gradient-to-br from-ninja-yellow to-[#BFA9FF]/30 flex items-center justify-center text-ninja-dark shadow-2xl shadow-ninja-yellow/40 transform group-hover:rotate-12 transition-transform duration-500">
                    <Icon size={44} strokeWidth={2.5} />
                </div>
            </div>
            
            {/* Header Content */}
            <h2 className="text-3xl md:text-4xl font-black text-ninja-dark tracking-tighter mb-4 uppercase">
                {title.replace('-', ' ')}
            </h2>
            <p className="text-gray-400 font-bold text-sm mb-12 max-w-lg leading-snug">
                This module is under development and will be available soon
            </p>

            {/* Content Card */}
            <Card className="w-full max-w-2xl p-4 md:p-1 shrink-0 border-none shadow-2xl shadow-ninja-dark/5 bg-white/50 backdrop-blur-sm rounded-[42px] overflow-hidden">
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-50">
                    <h3 className="text-base font-black text-ninja-dark mb-3 tracking-tight uppercase">What will this module include?</h3>
                    <p className="text-gray-400 font-medium mb-10 max-w-md mx-auto leading-relaxed text-[11px]">
                        {description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-left">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 group/item">
                                <div className="h-5 w-5 rounded-lg bg-ninja-yellow/10 flex items-center justify-center group-hover/item:bg-ninja-yellow transition-all duration-300">
                                    <CheckCircle2 size={10} className="text-ninja-yellow group-hover/item:text-ninja-dark transition-colors" />
                                </div>
                                <span className="text-[9px] font-black text-gray-400 group-hover/item:text-ninja-dark transition-colors uppercase tracking-tight">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Bottom Accent */}
            <div className="mt-12 flex items-center gap-2">
                <div className="h-1 w-8 rounded-full bg-ninja-yellow" />
                <div className="h-1 w-1 rounded-full bg-gray-200" />
                <div className="h-1 w-1 rounded-full bg-gray-200" />
            </div>
        </div>
    );
};
