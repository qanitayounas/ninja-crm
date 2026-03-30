import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, ArrowLeft } from 'lucide-react';
import { Input } from '../components/ui';
import { toast } from 'react-hot-toast';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success("Recovery link sent via email");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex font-inter antialiased bg-slate-50 relative overflow-hidden items-center justify-center p-6">
      {/* subtle bg circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-ninja-yellow/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10 animate-in fade-in zoom-in-95 duration-500">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="h-10 w-10 bg-ninja-dark rounded-xl flex items-center justify-center shadow-lg">
            <Zap size={22} fill="#D4FF00" className="text-ninja-yellow" />
          </div>
          <span className="text-xl font-black tracking-tighter text-ninja-dark">NINJA CRM</span>
        </div>

        {/* Form card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/60 border border-white p-8 flex flex-col gap-6">
          {!isSubmitted ? (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-black text-ninja-dark tracking-tight leading-tight">Reset password</h1>
                <p className="text-gray-500 mt-2 font-medium text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                  <Input
                    icon={Mail}
                    placeholder="name@company.com"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-13 bg-slate-50 border border-slate-100 rounded-2xl focus-within:border-ninja-yellow/60 focus-within:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-ninja-dark text-ninja-yellow font-black text-base rounded-2xl flex items-center justify-center gap-2 hover:bg-ninja-dark/90 active:scale-[0.98] transition-all shadow-xl shadow-ninja-dark/20 group"
                >
                  Send Recovery Link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="mx-auto h-16 w-16 bg-green-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                <Mail className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-black text-ninja-dark">Check your email</h2>
                <p className="text-gray-500 mt-2 text-sm font-medium">
                  We've sent a password reset link to <br/>
                  <span className="text-ninja-dark font-bold">{email}</span>
                </p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 text-sm font-bold text-gray-400 hover:text-ninja-dark transition-colors"
              >
                Didn't receive the email? Click to resend
              </button>
            </div>
          )}

          <div className="pt-2 border-t border-gray-100">
            <Link 
              to="/login"
              className="flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-ninja-dark transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
