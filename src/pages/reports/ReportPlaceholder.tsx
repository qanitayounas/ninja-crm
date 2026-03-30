import { AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui';

interface ReportPlaceholderProps {
    title: string;
}

export const ReportPlaceholder = ({ title }: ReportPlaceholderProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-4xl mx-auto text-center py-10 animate-in zoom-in-95 duration-500">
            <div className="h-24 w-24 rounded-[32px] bg-ninja-yellow flex items-center justify-center text-ninja-dark shadow-xl shadow-ninja-yellow/20 mb-8">
                <AlertCircle size={48} />
            </div>
            
            <h2 className="text-4xl font-black text-ninja-dark tracking-tighter mb-4 capitalize">
                {title.replace('-', ' ')}
            </h2>
            <p className="text-gray-500 font-bold text-lg mb-12">
                This module is under development and will be available soon
            </p>

            <Card className="w-full max-w-3xl p-12 border-none shadow-2xl shadow-ninja-dark/5 bg-white rounded-[40px]">
                <h3 className="text-2xl font-black text-ninja-dark mb-4">What will this module include?</h3>
                <p className="text-gray-400 font-medium mb-10 max-w-xl mx-auto leading-relaxed">
                    Detailed analysis and actionable metrics for <span className="text-ninja-dark font-black capitalize">{title.replace('-', ' ')}</span> with advanced visualizations and data export.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-left">
                    {[
                        "Real-time metrics",
                        "Interactive visualizations",
                        "Advanced filters",
                        "Data export",
                        "Period comparison",
                        "Smart alerts"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                            <div className="h-6 w-6 rounded-full bg-ninja-yellow/10 flex items-center justify-center group-hover:bg-ninja-yellow transition-colors duration-300">
                                <div className="h-2 w-2 rounded-full bg-ninja-yellow group-hover:bg-ninja-dark transition-colors" />
                            </div>
                            <span className="text-sm font-bold text-gray-500 group-hover:text-ninja-dark transition-colors">{feature}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
