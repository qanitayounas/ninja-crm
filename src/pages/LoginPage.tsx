import { useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/ui';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const features = [
    'Real-time sales pipeline',
    'Workflow automation',
    'Integrated multi-channel messaging',
    'Advanced AI reports',
  ];

  return (
    <div className="min-h-screen flex font-inter antialiased">
      {/* ─── Left Panel (Brand) ─── */}
      <div className="hidden lg:flex lg:w-1/2 bg-ninja-dark relative overflow-hidden flex-col justify-between p-14">
        {/* Decorative glows */}
        <div className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full bg-ninja-yellow/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-ninja-purple/20 blur-[100px] pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="h-10 w-10 bg-ninja-yellow rounded-xl flex items-center justify-center shadow-lg shadow-ninja-yellow/30">
            <Zap size={22} fill="#000" className="text-ninja-dark" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">NINJA CRM</span>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 flex flex-col gap-10">
          <div>
            <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
              Convert leads<br />
              <span className="text-ninja-yellow">into clients.</span>
            </h2>
            <p className="mt-4 text-white/50 font-medium text-lg leading-relaxed max-w-sm">
              The all-in-one platform to manage your business with ninja speed.
            </p>
          </div>

          {/* Feature list */}
          <ul className="flex flex-col gap-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-white/70 font-medium">
                <CheckCircle2 size={18} className="text-ninja-yellow flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* Social proof */}
          <div className="flex items-center gap-4 border-t border-white/10 pt-8">
            <div className="flex -space-x-2">
              {['#D4FF00','#BFA9FF','#60a5fa','#fb923c'].map((c, i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-ninja-dark flex-shrink-0" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="text-white/50 text-sm font-medium">
              <span className="text-white font-black">+2,400</span> companies already trust us
            </p>
          </div>
        </div>
      </div>

      {/* ─── Right Panel (Form) ─── */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 p-6 relative overflow-hidden">
        {/* subtle bg circles */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-ninja-yellow/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="w-full max-w-[420px] relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="h-9 w-9 bg-ninja-dark rounded-xl flex items-center justify-center">
              <Zap size={20} fill="#D4FF00" />
            </div>
            <span className="text-lg font-black tracking-tighter text-ninja-dark">NINJA CRM</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-ninja-dark tracking-tight leading-tight">Welcome back</h1>
            <p className="text-gray-500 mt-2 font-medium">Enter your credentials to access</p>
          </div>

          {/* Form card */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/60 border border-white p-8 flex flex-col gap-5">
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Corporate Email</label>
                <Input
                  icon={Mail}
                  placeholder="admin@ninjacrm.com"
                  type="email"
                  required
                  className="h-13 bg-slate-50 border border-slate-100 rounded-2xl focus-within:border-ninja-yellow/60 focus-within:bg-white transition-all"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
                  <button type="button" className="text-[10px] font-black text-ninja-yellow uppercase tracking-wider hover:opacity-70 transition-opacity">
                    Forgot your password?
                  </button>
                </div>
                <Input
                  icon={Lock}
                  placeholder="••••••••"
                  type="password"
                  required
                  className="h-13 bg-slate-50 border border-slate-100 rounded-2xl focus-within:border-ninja-yellow/60 focus-within:bg-white transition-all"
                />
              </div>

              {/* Remember */}
              <div className="flex items-center gap-3 pl-1">
                <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 accent-ninja-dark" />
                <label htmlFor="remember" className="text-sm text-gray-500 font-medium cursor-pointer">Keep me logged in</label>
              </div>

              {/* CTA */}
              <button
                type="submit"
                className="mt-1 w-full h-14 bg-ninja-dark text-ninja-yellow font-black text-base rounded-2xl flex items-center justify-center gap-2 hover:bg-ninja-dark/90 active:scale-[0.98] transition-all shadow-xl shadow-ninja-dark/20 group"
              >
                Sign In
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">o</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* SSO button */}
            <button
              type="button"
              className="w-full h-12 rounded-2xl border-2 border-gray-100 text-gray-500 font-bold text-sm hover:border-gray-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-center text-gray-500 text-sm font-medium">
            Don't have an account?{' '}
            <span className="text-ninja-dark font-black cursor-pointer hover:underline underline-offset-4">
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
