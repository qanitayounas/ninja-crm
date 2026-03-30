import { 
  Palette, Type, ImageIcon, Copy,
  Check, AlertCircle
} from 'lucide-react';
import { Card } from '../../components/ui';
import toast from 'react-hot-toast';

const colorPalette = [
  { name: 'Primary', hex: '#D4FF00', desc: 'CTA buttons, highlights' },
  { name: 'Secondary', hex: '#BFA9FF', desc: 'Accents, secondary elements' },
  { name: 'Dark', hex: '#0F0F0F', desc: 'Text, backgrounds' },
  { name: 'Gray', hex: '#6B7280', desc: 'Secondary text' }
];

const typography = [
  { name: 'Headings', font: 'Inter', weight: 'Bold', size: '32-48px' },
  { name: 'Body', font: 'Inter', weight: 'Regular', size: '14-16px' },
  { name: 'Labels', font: 'Inter', weight: 'Medium', size: '12-14px' }
];

export const MarketingBrandPanels = () => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied: ${text}`);
    };

    return (
        <div className="flex flex-col gap-10 pb-10 animate-in fade-in duration-500 text-left">
            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[28px] font-bold text-[#1A1D1F] tracking-tight leading-none">Brand Identity</h1>
                <p className="text-[#6F767E] font-medium text-sm leading-none mt-2">Visual identity and graphic resources</p>
            </div>

            {/* Color Palette Section */}
            <Card className="p-10 border-none shadow-sm rounded-[32px] bg-white space-y-8">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#F2FFB2]/40 flex items-center justify-center text-ninja-yellow">
                        <Palette size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[#1A1D1F] tracking-tight leading-none">Color Palette</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Official brand colors</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {colorPalette.map((color, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 flex flex-col bg-white shadow-sm group">
                            <div className="h-32 w-full" style={{ backgroundColor: color.hex }} />
                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <h4 className="font-bold text-[#1A1D1F] text-sm">{color.name}</h4>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{color.hex}</div>
                                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{color.desc}</p>
                                </div>
                                <button
                                    onClick={() => handleCopy(color.hex)}
                                    className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-ninja-yellow transition-colors uppercase tracking-widest"
                                >
                                    <Copy size={12} /> Copy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Typography Section */}
            <Card className="p-10 border-none shadow-sm rounded-[32px] bg-white space-y-8">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#BFA9FF]">
                        <Type size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[#1A1D1F] tracking-tight leading-none">Typography</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Font systems and text styles</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {typography.map((t, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl bg-[#FCFCFD] border border-gray-50 group hover:border-ninja-yellow/20 transition-all">
                            <div className="space-y-1 min-w-[200px]">
                                <h4 className="font-bold text-[#1A1D1F] text-lg leading-tight">{t.name}</h4>
                                <div className="text-[11px] font-medium text-gray-400 italic">Font: {t.font}</div>
                            </div>
                            <div className="flex items-center gap-12 flex-1">
                                <div className="space-y-1">
                                    <div className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Weight</div>
                                    <div className="text-xs font-bold text-gray-600">{t.weight}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Size</div>
                                    <div className="text-xs font-bold text-gray-600">{t.size}</div>
                                </div>
                            </div>
                            <button className="px-6 py-2 rounded-lg bg-white border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-ninja-yellow hover:border-ninja-yellow transition-all shadow-sm">
                                Copy CSS
                            </button>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Logos & Resources */}
            <Card className="p-10 border-none shadow-sm rounded-[32px] bg-white space-y-8">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#F2FFB2]/40 flex items-center justify-center text-ninja-yellow">
                        <ImageIcon size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[#1A1D1F] tracking-tight leading-none">Logos & Resources</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Brand graphic assets</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['Main Logo', 'Monochrome Logo', 'Icon'].map((item, i) => (
                        <div key={i} className="p-8 pb-10 rounded-3xl border border-gray-50 flex flex-col items-center gap-6 group hover:border-ninja-yellow/5 bg-[#FCFCFD]">
                            <div className="h-32 w-full bg-white rounded-2xl flex items-center justify-center border border-gray-50 shadow-inner group-hover:shadow-sm transition-all relative overflow-hidden">
                                <ImageIcon size={40} className="text-gray-100" />
                                <div className="absolute inset-0 bg-black/[0.01]" />
                            </div>
                            <div className="text-center space-y-1">
                                <h4 className="font-bold text-[#1A1D1F] text-sm">{item}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PNG, SVG</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Usage Guidelines */}
            <Card className="p-10 border-none shadow-sm rounded-[32px] bg-white space-y-8">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#BFA9FF]">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[#1A1D1F] tracking-tight leading-none">Usage Guidelines</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Directives and best practices</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-[#F4FBEB] space-y-4">
                        <h4 className="font-bold text-[#1A1D1F] flex items-center gap-2">
                             <Check size={18} className="text-green-500" /> Do
                        </h4>
                        <ul className="space-y-4">
                            {[
                                'Maintain minimum clear space around active components',
                                'Use brand colors and sanctioned primary identifiers',
                                'Always respect master logo proportions and safe zones'
                            ].map((li, i) => (
                                <li key={i} className="text-sm font-medium text-gray-500/80 leading-relaxed flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-300 shrink-0" />
                                    {li}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-[#FFF1F2] space-y-4">
                        <h4 className="font-bold text-[#1A1D1F] flex items-center gap-2">
                             <AlertCircle size={18} className="text-red-500" /> Don't
                        </h4>
                        <ul className="space-y-4">
                            {[
                                'Do not stretch, rotate, or distort the base brand lockups',
                                'Avoid modifying the approved color palette values',
                                'Never use primary background colors with low-contrast text'
                            ].map((li, i) => (
                                <li key={i} className="text-sm font-medium text-gray-500/80 leading-relaxed flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-300 shrink-0" />
                                    {li}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};
