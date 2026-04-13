import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '../components/ui';
import { apiService } from '../services/apiService';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [locationId, setLocationId] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);

  // Show OAuth error if redirected back
  const oauthError = searchParams.get('error');
  if (oauthError) {
    toast.error('GoHighLevel connection failed. Please try again.');
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiService.login(email, password, remember);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGHLConnect = async () => {
    if (!locationId.trim()) {
      setShowLocationInput(true);
      return;
    }
    setIsConnecting(true);
    try {
      // Try reconnect first (for returning users)
      const reconnectResult = await apiService.reconnect(locationId.trim());
      if (reconnectResult) {
        apiService.handleOAuthCallback(reconnectResult.token, reconnectResult.name);
        toast.success(`Welcome back!`);
        navigate('/dashboard');
        return;
      }
      // First time - redirect to GHL install
      const authUrl = await apiService.getOAuthUrl(locationId.trim());
      window.location.href = authUrl;
    } catch (error: any) {
      toast.error('Failed to connect. Please try again.');
      setIsConnecting(false);
    }
  };
// ... rest of the component remains the same, but update the Inputs ...

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-13 bg-slate-50 border border-slate-100 rounded-2xl focus-within:border-ninja-yellow/60 focus-within:bg-white transition-all"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
                  <Link 
                    to="/forgot-password" 
                    className="text-[10px] font-black text-ninja-yellow uppercase tracking-wider hover:opacity-70 transition-opacity"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  icon={Lock}
                  placeholder="••••••••"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-13 bg-slate-50 border border-slate-100 rounded-2xl focus-within:border-ninja-yellow/60 focus-within:bg-white transition-all"
                />
              </div>

              {/* Remember */}
              <div className="flex items-center gap-3 pl-1">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-ninja-dark cursor-pointer" 
                />
                <label htmlFor="remember" className="text-sm text-gray-500 font-medium cursor-pointer">Keep me logged in</label>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full h-14 bg-ninja-dark text-ninja-yellow font-black text-base rounded-2xl flex items-center justify-center gap-2 hover:bg-ninja-dark/90 active:scale-[0.98] transition-all shadow-xl shadow-ninja-dark/20 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
                {!isSubmitting && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">o</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* GHL OAuth Connect */}
            {showLocationInput && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email or Sub-Account ID</label>
                <input
                  placeholder="Enter your email or Sub-Account ID"
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  className="w-full py-2.5 px-4 outline-none bg-slate-50 border border-slate-100 rounded-2xl focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm"
                />
              </div>
            )}
            <button
              type="button"
              onClick={handleGHLConnect}
              disabled={isConnecting}
              className="w-full h-12 rounded-2xl border-2 border-green-200 text-green-700 font-bold text-sm hover:border-green-300 hover:bg-green-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              {isConnecting ? 'Connecting...' : showLocationInput ? 'Connect Now' : 'Connect with GoHighLevel'}
            </button>
          </div>

          <p className="mt-8 text-center text-gray-500 text-sm font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="text-ninja-dark font-black hover:underline underline-offset-4">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
