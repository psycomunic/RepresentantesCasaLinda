import React, { useState } from 'react';
import { ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha email e senha.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      
      onLogin();
    } catch (err: any) {
      console.error('Login error:', err);
      // Extraindo a mensagem de erro real do Supabase
      setError(err.message || 'Erro desconhecido no login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-brand-gold selection:text-black">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-brand-gold transition-colors font-bold z-10"
      >
        <ArrowLeft size={16} /> Voltar
      </button>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display text-white tracking-tighter mb-2">Casa Linda</h1>
          <p className="text-[9px] uppercase tracking-[0.4em] text-brand-gold font-bold">Portal do Representante</p>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-12 rounded-[2.5rem]">
          <form onSubmit={handleLogin} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Seu E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-white placeholder:text-white/20"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all outline-none text-white placeholder:text-white/20 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-brand-gold transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-gold text-black rounded-2xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all shadow-[0_10px_40px_rgba(197,160,89,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : 'ENTRAR'}
            </button>
            <div className="text-center">
              <button type="button" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                Esqueci minha senha
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
