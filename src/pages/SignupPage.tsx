import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight, ChevronLeft, Building2, User, Phone, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  nome: string;
  whatsapp: string;
  email: string;
  cidade: string;
  estado: string;
  documento: string;
  core_status: 'sim' | 'nao' | 'em_regularizacao' | '';
  segmentos: string[];
  regioes_atuacao: string;
  quantidade_lojistas: string;
}

const initialFormData: FormData = {
  nome: '',
  whatsapp: '',
  email: '',
  cidade: '',
  estado: '',
  documento: '',
  core_status: '',
  segmentos: [],
  regioes_atuacao: '',
  quantidade_lojistas: ''
};

export const SignupPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const totalSteps = 6;

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSegmentToggle = (segment: string) => {
    setFormData(prev => {
      const current = prev.segmentos;
      if (current.includes(segment)) {
        return { ...prev, segmentos: current.filter(s => s !== segment) };
      }
      return { ...prev, segmentos: [...current, segment] };
    });
    setError(null);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: return formData.nome.length > 2 && formData.whatsapp.length > 10;
      case 2: return formData.email.includes('@') && formData.documento.length > 10;
      case 3: return formData.cidade.length > 2 && formData.estado.length >= 2;
      case 4: return formData.core_status !== '';
      case 5: return formData.segmentos.length > 0;
      case 6: return formData.regioes_atuacao.length > 2 && formData.quantidade_lojistas.length > 0;
      default: return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      setError('Por favor, preencha todos os campos corretamente para continuar.');
    }
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) {
      setError('Por favor, preencha os últimos detalhes.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('representantes_leads')
        .insert([{
          nome: formData.nome,
          whatsapp: formData.whatsapp,
          email: formData.email,
          cidade: formData.cidade,
          estado: formData.estado,
          documento: formData.documento,
          core_status: formData.core_status,
          segmentos: formData.segmentos,
          regioes_atuacao: formData.regioes_atuacao,
          quantidade_lojistas: formData.quantidade_lojistas
        }]);

      if (submitError) throw submitError;

      // Navigate to thank you page
      navigate('/obrigado');
    } catch (err) {
      console.error('Submission error:', err);
      setError('Ocorreu um erro ao enviar sua candidatura. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentStep < totalSteps) {
        nextStep();
      } else {
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark bg-noise text-white selection:bg-brand-gold selection:text-black font-sans relative overflow-hidden flex flex-col justify-center">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/[0.05] rounded-full blur-[150px] pointer-events-none animate-pulse-slow"></div>
      
      {/* Top Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
        <div 
          className="h-full bg-brand-gold transition-all duration-700 ease-out shadow-[0_0_20px_rgba(197,160,89,0.8)]"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Back Button */}
      {currentStep > 1 && (
        <button 
          onClick={prevStep}
          className="fixed top-10 left-10 z-50 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-brand-gold hover:bg-white/5 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Logo Home Link */}
      <div className="fixed top-10 right-10 z-50">
        <button onClick={() => navigate('/')} className="text-xl font-display text-white italic opacity-50 hover:opacity-100 transition-opacity">
          Casa Linda
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full px-6 relative z-10">
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          
          <div className="min-h-[400px] flex flex-col justify-center">
            {/* Step 1 */}
            <div className={`transition-all duration-700 absolute inset-x-6 top-1/2 -translate-y-1/2 ${currentStep === 1 ? 'opacity-100 z-10 translate-x-0' : currentStep > 1 ? 'opacity-0 -z-10 -translate-x-full' : 'opacity-0 -z-10 translate-x-full'}`}>
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-brand-gold text-sm uppercase tracking-widest font-bold">1 / 6</span>
                  <h2 className="text-4xl md:text-6xl font-display text-white">Qual o seu nome e contato?</h2>
                </div>
                <div className="space-y-8 max-w-2xl">
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-3xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold focus:ring-0 transition-colors"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    autoFocus
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp (com DDD)"
                    className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-3xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold focus:ring-0 transition-colors"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`transition-all duration-700 absolute inset-x-6 top-1/2 -translate-y-1/2 ${currentStep === 2 ? 'opacity-100 z-10 translate-x-0' : currentStep > 2 ? 'opacity-0 -z-10 -translate-x-full' : 'opacity-0 -z-10 translate-x-full'}`}>
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-brand-gold text-sm uppercase tracking-widest font-bold">2 / 6</span>
                  <h2 className="text-4xl md:text-6xl font-display text-white">Seus dados profissionais</h2>
                </div>
                <div className="space-y-8 max-w-2xl">
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-3xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold focus:ring-0 transition-colors"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="CPF ou CNPJ"
                    className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-3xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold focus:ring-0 transition-colors"
                    value={formData.documento}
                    onChange={(e) => handleInputChange('documento', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`transition-all duration-700 absolute inset-x-6 top-1/2 -translate-y-1/2 ${currentStep === 3 ? 'opacity-100 z-10 translate-x-0' : currentStep > 3 ? 'opacity-0 -z-10 -translate-x-full' : 'opacity-0 -z-10 translate-x-full'}`}>
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-brand-gold text-sm uppercase tracking-widest font-bold">3 / 6</span>
                  <h2 className="text-4xl md:text-6xl font-display text-white">De onde você é?</h2>
                </div>
                <div className="space-y-8 max-w-2xl">
                  <input
                    type="text"
                    placeholder="Cidade base"
                    className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-3xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold focus:ring-0 transition-colors"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                  />
                  <select
                    className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-3xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold focus:ring-0 transition-colors appearance-none"
                    value={formData.estado}
                    onChange={(e) => handleInputChange('estado', e.target.value)}
                  >
                    <option value="" className="bg-brand-dark">Selecione o Estado</option>
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                      <option key={uf} value={uf} className="bg-brand-dark text-lg">{uf}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`transition-all duration-700 absolute inset-x-6 top-1/2 -translate-y-1/2 ${currentStep === 4 ? 'opacity-100 z-10 translate-x-0' : currentStep > 4 ? 'opacity-0 -z-10 -translate-x-full' : 'opacity-0 -z-10 translate-x-full'}`}>
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-brand-gold text-sm uppercase tracking-widest font-bold">4 / 6</span>
                  <h2 className="text-4xl md:text-6xl font-display text-white">Registro CORE</h2>
                  <p className="text-xl text-zinc-400 font-light">Você possui registro no Conselho dos Representantes?</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-6 max-w-3xl">
                  {[
                    { val: 'sim', label: 'Sim, ativo' },
                    { val: 'nao', label: 'Não possuo' },
                    { val: 'em_regularizacao', label: 'Em regularização' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => handleInputChange('core_status', opt.val)}
                      className={`p-6 rounded-2xl border text-left transition-all ${formData.core_status === opt.val ? 'border-brand-gold bg-brand-gold/10 shadow-[0_0_30px_rgba(197,160,89,0.15)]' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
                    >
                      <div className="w-6 h-6 rounded-full border mb-4 flex items-center justify-center">
                        {formData.core_status === opt.val ? <div className="w-3 h-3 bg-brand-gold rounded-full" /> : null}
                      </div>
                      <span className="text-xl font-light">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className={`transition-all duration-700 absolute inset-x-6 top-1/2 -translate-y-1/2 ${currentStep === 5 ? 'opacity-100 z-10 translate-x-0' : currentStep > 5 ? 'opacity-0 -z-10 -translate-x-full' : 'opacity-0 -z-10 translate-x-full'}`}>
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-brand-gold text-sm uppercase tracking-widest font-bold">5 / 6</span>
                  <h2 className="text-4xl md:text-6xl font-display text-white">Segmentos de Atuação</h2>
                  <p className="text-xl text-zinc-400 font-light">Quais linhas você já representa? (Múltipla escolha)</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
                  {[
                    'Móveis', 'Decoração', 'Iluminação', 'Utilidades', 
                    'Cama/Mesa/Banho', 'Estofados', 'Presentes', 'Outros'
                  ].map(seg => (
                    <button
                      key={seg}
                      type="button"
                      onClick={() => handleSegmentToggle(seg)}
                      className={`px-6 py-4 rounded-xl border text-center transition-all ${formData.segmentos.includes(seg) ? 'border-brand-gold bg-brand-gold/10 text-brand-gold shadow-[0_0_20px_rgba(197,160,89,0.15)]' : 'border-white/10 bg-white/5 text-white hover:border-white/30'}`}
                    >
                      {seg}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className={`transition-all duration-700 absolute inset-x-6 top-1/2 -translate-y-1/2 ${currentStep === 6 ? 'opacity-100 z-10 translate-x-0' : currentStep > 6 ? 'opacity-0 -z-10 -translate-x-full' : 'opacity-0 -z-10 translate-x-full'}`}>
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-brand-gold text-sm uppercase tracking-widest font-bold">6 / 6</span>
                  <h2 className="text-4xl md:text-6xl font-display text-white">Sua Operação</h2>
                </div>
                <div className="space-y-10 max-w-2xl">
                  <div>
                    <label className="text-sm text-zinc-400 uppercase tracking-widest font-bold block mb-4">Área exata que você cobre geograficamente</label>
                    <input
                      type="text"
                      placeholder="Ex: Todo o sul de Minas e Triângulo"
                      className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-2xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold focus:ring-0 transition-colors"
                      value={formData.regioes_atuacao}
                      onChange={(e) => handleInputChange('regioes_atuacao', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 uppercase tracking-widest font-bold block mb-4">Tamanho da sua carteira (quantos clientes ativos atende)</label>
                    <input
                      type="text"
                      placeholder="Ex: 50 clientes ativos mensais"
                      className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-2xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold focus:ring-0 transition-colors"
                      value={formData.quantidade_lojistas}
                      onChange={(e) => handleInputChange('quantidade_lojistas', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {error && (
            <div className="mt-8 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm max-w-2xl">
              {error}
            </div>
          )}

          {/* Bottom Actions */}
          <div className="fixed bottom-0 left-0 w-full p-6 sm:p-10 flex justify-between items-center bg-gradient-to-t from-brand-dark to-transparent z-40">
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest hidden sm:block">
              Etapa {currentStep} de {totalSteps}
            </div>
            
            <button
              type="button"
              onClick={currentStep === totalSteps ? handleSubmit : nextStep}
              disabled={isSubmitting}
              className="ml-auto group relative overflow-hidden bg-brand-gold text-black px-10 py-5 text-xs uppercase tracking-[0.3em] font-bold transition-all hover:scale-105 rounded-full shadow-[0_10px_40px_rgba(197,160,89,0.2)] disabled:opacity-50 disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? 'ENVIANDO...' : currentStep === totalSteps ? 'FINALIZAR CANDIDATURA' : 'CONTINUAR'} 
                {!isSubmitting && <ChevronRight size={18} />}
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
