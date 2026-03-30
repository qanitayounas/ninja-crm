import { useNavigate, Link } from 'react-router-dom';
import { Zap, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/ui';
import { toast } from 'react-hot-toast';

export const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created successfully!");
    navigate('/dashboard');
  };

  const benefits = [
    'Unlimited leads & contacts',
    'AI-powered automation',
    'Custom sales pipelines',
    '24/7 Premium support',
  ];

  return (
    <div className="min-h-screen flex font-inter antialiased">
      {/* ─── Left Panel (Brand) ─── */}
      <div className="hidden lg:flex lg:w-1/2 bg-ninja-dark relative overflow-hidden flex-col justify-between p-14">
        <div className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full bg-ninja-yellow/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-ninja-purple/20 blur-[100px] pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="h-10 w-10 bg-ninja-yellow rounded-xl flex items-center justify-center shadow-lg shadow-ninja-yellow/30">
            <Zap size={22} fill="#000" className="text-ninja-dark" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">NINJA CRM</span>
        </div>

        <div className="relative z-10 flex flex-col gap-10">
          <div>
            <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
              Start your journey<br />
              <span className="text-ninja-yellow">with the best.</span>
            </h2>
            <p className="mt-4 text-white/50 font-medium text-lg leading-relaxed max-w-sm">
              Join thousands of businesses scaling faster with Ninja CRM's advanced platform.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white/70 font-medium">
                <CheckCircle2 size={18} className="text-ninja-yellow flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-t border-white/10 pt-8">
            <p className="text-white/50 text-sm font-medium">
              Ready to dominate your market? <br/>
              <span className="text-white font-black text-lg">Sign up in less than 2 minutes.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ─── Right Panel (Form) ─── */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-ninja-yellow/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="w-full max-w-[420px] relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="h-9 w-9 bg-ninja-dark rounded-xl flex items-center justify-center">
              <Zap size={20} fill="#D4FF00" />
            </div>
            <span className="text-lg font-black tracking-tighter text-ninja-dark">NINJA CRM</span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-black text-ninja-dark tracking-tight leading-tight">Create account</h1>
            <p className="text-gray-500 mt-2 font-medium">Fill in your details to get started</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/60 border border-white p-8 flex flex-col gap-5">
            <form onSubmit={handleSignup} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                <Input
                  icon={User}
                  placeholder="John Doe"
                  type="text"
                  required
                  className="h-13 bg-slate-50 border border-slate-100 rounded-2xl focus-within:border-ninja-yellow/60 focus-within:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Work Email</label>
                <Input
                  icon={Mail}
                  placeholder="john@company.com"
                  type="email"
                  required
                  className="h-13 bg-slate-50 border border-slate-100 rounded-2xl focus-within:border-ninja-yellow/60 focus-within:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Password</label>
                <Input
                  icon={Lock}
                  placeholder="••••••••"
                  type="password"
                  required
                  className="h-13 bg-slate-50 border border-slate-100 rounded-2xl focus-within:border-ninja-yellow/60 focus-within:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full h-14 bg-ninja-dark text-ninja-yellow font-black text-base rounded-2xl flex items-center justify-center gap-2 hover:bg-ninja-dark/90 active:scale-[0.98] transition-all shadow-xl shadow-ninja-dark/20 group"
              >
                Create My Account
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-gray-500 text-sm font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-ninja-dark font-black hover:underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
