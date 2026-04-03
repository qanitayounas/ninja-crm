import { useState, useEffect } from 'react';
import {
    CreditCard,
    CheckCircle2,
    Download,
    Plus,
    Settings,
    Shield,
    Clock,
    ExternalLink,
    ChevronRight,
    AlertCircle
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { currentPlan, paymentMethods } from '../data/billingData';
import { cn } from '../components/ui';
import { apiService } from '../services/apiService';

export const BillingPage = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [syncError, setSyncError] = useState<string | null>(null);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        setIsLoading(true);
        setSyncError(null);
        try {
            const data = await apiService.getTransactions();
            const mapped = (Array.isArray(data) ? data : []).map((order: any) => ({
                id: (order.id || '').substring(0, 8).toUpperCase(),
                date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A',
                amount: order.totalAmount ? `$${(order.totalAmount / 100).toFixed(2)}` : '$0.00',
                status: order.status === 'completed' ? 'Paid' : 'Pending',
                method: 'Credit Card' // Default placeholder as GHL API v2 list doesn't always provide method details
            }));
            setTransactions(mapped);
        } catch (error: any) {
            console.error('Error loading transactions:', error);
            if (error.status === 403 || error.status === 401) {
                setSyncError('Billing information is currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-10 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-ninja-dark tracking-tight">Billing & Subscription</h1>
                    <p className="text-gray-500 font-medium">Manage your plan, payments, and billing history</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="secondary" className="flex items-center gap-2 border-gray-200 text-sm py-2">
                        <Settings size={18} />
                        <span>Billing Settings</span>
                    </Button>
                </div>
            </div>

            {/* Alert Case: Branded Setup Notice */}
            {syncError && (
                <Card className="p-4 border-l-4 border-l-ninja-purple bg-ninja-purple/5 border-ninja-purple/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-ninja-purple/10 rounded-lg text-ninja-purple">
                            <CreditCard size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-ninja-dark">Module Synchronization</p>
                            <p className="text-xs text-slate-500 font-medium">{syncError}</p>
                        </div>
                    </div>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Subscription Overview */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <Card className="relative overflow-hidden group border-none shadow-premium bg-ninja-dark p-8 text-white">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 p-8 text-ninja-yellow opacity-10 group-hover:opacity-20 transition-opacity">
                            <Shield size={180} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <Badge status="Active" className="bg-ninja-yellow text-ninja-dark font-black px-3 py-1 uppercase text-[10px] tracking-widest border-none">
                                    {currentPlan.status}
                                </Badge>
                                <span className="text-gray-400 font-bold text-sm">Since Oct 2025</span>
                            </div>

                            <h2 className="text-4xl font-black mb-2 tracking-tight">{currentPlan.name}</h2>
                            <div className="flex items-end gap-1 mb-8">
                                <span className="text-3xl font-black text-ninja-yellow">{currentPlan.price}</span>
                                <span className="text-gray-400 font-bold mb-1">/{currentPlan.interval}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {currentPlan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-gray-300 font-medium">
                                        <CheckCircle2 size={16} className="text-ninja-yellow shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <Button className="bg-ninja-yellow text-ninja-dark hover:bg-ninja-yellow/90 border-none font-black px-8">
                                    Upgrade Plan
                                </Button>
                                <Button variant="ghost" className="text-white border-white/20 hover:bg-white/10 hover:text-white font-bold">
                                    Cancel Subscription
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Payment Methods */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-ninja-dark">Payment Methods</h3>
                            <Button variant="secondary" className="flex items-center gap-2 border-gray-200 text-ninja-dark font-bold py-2">
                                <Plus size={16} />
                                <span>Add New</span>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {paymentMethods.map((method, i) => (
                                <Card key={i} className={cn(
                                    "relative group cursor-pointer transition-all duration-300 hover:shadow-xl",
                                    method.isPrimary ? "border-ninja-yellow/30 bg-ninja-yellow/[0.02]" : "hover:border-ninja-yellow/20"
                                )}>
                                    <div className="flex items-start justify-between mb-8">
                                        <div className={cn("h-12 w-16 rounded-xl flex items-center justify-center text-white font-black italic", method.color)}>
                                            {method.type}
                                        </div>
                                        {method.isPrimary && (
                                            <Badge status="Active" className="bg-ninja-yellow/20 text-ninja-dark border-none font-bold text-[10px]">PRIMARY</Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-ninja-dark font-black tracking-widest text-lg">•••• •••• •••• {method.last4}</p>
                                            <p className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-tighter">Expires {method.expiry}</p>
                                        </div>
                                        <button className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-ninja-dark group-hover:bg-ninja-yellow transition-all">
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Section */}
                <div className="flex flex-col gap-8">
                    {/* Billing Info */}
                    <Card className="p-6">
                        <h3 className="font-bold text-ninja-dark mb-6 flex items-center gap-2">
                            <Clock size={18} className="text-ninja-yellow" />
                            <span>Billing Summary</span>
                        </h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Next payment</span>
                                <span className="text-ninja-dark font-bold">{currentPlan.nextBillingDate}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Payment amount</span>
                                <span className="text-ninja-dark font-bold">{currentPlan.price}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-4">
                                <span className="text-gray-400 font-medium">Billing cycle</span>
                                <span className="text-ninja-dark font-bold">Monthly</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-ninja-yellow/5 rounded-2xl border border-ninja-yellow/10">
                            <div className="flex items-start gap-3">
                                <AlertCircle size={18} className="text-ninja-yellow shrink-0 mt-1" />
                                <p className="text-xs text-ninja-dark font-medium leading-relaxed">
                                    You are currently using <span className="font-black text-ninja-yellow">4/Unlimited</span> subaccounts. Consider upgrading for white-label options.
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Links */}
                    <Card className="p-6">
                        <h3 className="font-bold text-ninja-dark mb-4">Support & Help</h3>
                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-sm font-bold text-gray-500 hover:text-ninja-dark transition-all">
                                <span>Billing Documentation</span>
                                <ExternalLink size={14} />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-sm font-bold text-gray-500 hover:text-ninja-dark transition-all">
                                <span>Contact Accounts</span>
                                <ExternalLink size={14} />
                            </button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Invoice History */}
            <div>
                <h3 className="text-xl font-bold text-ninja-dark mb-6 flex items-center gap-2">
                    <CreditCard size={20} className="text-ninja-yellow" />
                    <span>Billing History</span>
                </h3>

                <Card className="p-0 overflow-hidden border-none shadow-ninja">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Method</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.map((invoice, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-ninja-dark">{invoice.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-500">{invoice.date}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-black text-ninja-dark">{invoice.amount}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge status="Active" className={cn(
                                                "border-none font-bold text-[10px] px-2 py-0.5",
                                                invoice.status === 'Paid' ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                                            )}>
                                                {invoice.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-gray-400 group-hover:text-ninja-dark transition-colors">{invoice.method}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="inline-flex items-center gap-2 text-ninja-yellow hover:text-ninja-dark font-black text-xs transition-colors">
                                                <Download size={14} />
                                                <span>PDF</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};
