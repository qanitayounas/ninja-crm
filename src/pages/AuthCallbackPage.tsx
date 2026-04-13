import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Zap, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiService } from '../services/apiService';

export const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'error'>('loading');

  useEffect(() => {
    const token = searchParams.get('token');
    const name = searchParams.get('name');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');
      toast.error('OAuth connection failed. Please try again.');
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    if (token && name) {
      apiService.handleOAuthCallback(token, decodeURIComponent(name));
      toast.success(`Connected as ${decodeURIComponent(name)}!`);
      navigate('/dashboard');
    } else {
      setStatus('error');
      toast.error('Invalid callback. Missing token.');
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-10 w-10 bg-ninja-dark rounded-xl flex items-center justify-center">
            <Zap size={22} fill="#D4FF00" />
          </div>
          <span className="text-xl font-black tracking-tighter text-ninja-dark">NINJA CRM</span>
        </div>

        {status === 'loading' ? (
          <>
            <Loader2 size={40} className="animate-spin text-ninja-dark mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Connecting your account...</p>
          </>
        ) : (
          <>
            <p className="text-red-500 font-medium">Connection failed. Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
};
