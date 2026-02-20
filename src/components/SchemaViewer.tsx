
import React from 'react';

const SchemaViewer: React.FC = () => {
  const sqlSchema = `
-- Tabela de Perfis com Roles
CREATE TYPE user_role AS ENUM ('ADMIN', 'REPRESENTATIVE', 'RETAILER');

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'RETAILER',
  representative_id UUID REFERENCES profiles(id),
  cnpj TEXT UNIQUE,
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Pedidos de Atacado
CREATE TABLE pedidos_atacado (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  retailer_id UUID REFERENCES profiles(id) NOT NULL,
  representative_id UUID REFERENCES profiles(id) NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
  `;

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-32 animate-in fade-in duration-1000">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-display text-white italic tracking-tighter">Backend <span className="text-brand-gold">Blueprint</span></h2>
        <p className="text-brand-gold/40 mt-4 uppercase tracking-[0.3em] text-[10px] font-bold">Infraestrutura Crítica Supabase</p>
      </div>

      <section className="space-y-10">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-gold text-black flex items-center justify-center text-sm font-black shadow-[0_0_30px_rgba(197,160,89,0.3)]">01</div>
          <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-white/60">Esquema Relacional <span className="text-brand-gold/60 italic">PostgreSQL</span></h3>
        </div>
        <div className="bg-black border border-white/5 rounded-[3rem] p-12 overflow-x-auto shadow-2xl relative group hover:border-brand-gold/20 transition-all">
          <div className="absolute top-6 right-6 px-3 py-1 bg-brand-gold/10 rounded-full text-[8px] uppercase tracking-widest text-brand-gold font-bold">Read Only</div>
          <pre className="text-emerald-400/80 text-[11px] font-mono leading-relaxed">
            <code>{sqlSchema.trim()}</code>
          </pre>
        </div>
      </section>

      <div className="p-10 bg-white/[0.02] border border-brand-gold/10 rounded-[3rem] flex gap-8 items-start hover:bg-brand-gold/[0.02] transition-colors">
        <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="text-brand-gold font-bold text-[10px] uppercase tracking-widest mb-3">Diretriz de Segurança</h4>
          <p className="text-white/40 text-xs leading-relaxed font-light uppercase tracking-wider">
            O Row Level Security (RLS) está ativo em todas as tabelas de faturamento. Representantes acessam apenas suas sub-contas (Lojistas) e Lojistas possuem isolamento total de dados via <span className="text-brand-gold/40 font-bold">POLICIES</span> customizadas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchemaViewer;
