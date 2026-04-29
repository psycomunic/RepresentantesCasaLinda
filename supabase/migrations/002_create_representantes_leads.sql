-- Create table for representatives leads
CREATE TABLE IF NOT EXISTS public.representantes_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    email TEXT NOT NULL,
    cidade TEXT NOT NULL,
    estado TEXT NOT NULL,
    documento TEXT NOT NULL,
    core_status TEXT CHECK (core_status IN ('sim', 'nao', 'em_regularizacao')),
    segmentos TEXT[] DEFAULT '{}',
    regioes_atuacao TEXT,
    quantidade_lojistas TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Configure RLS
ALTER TABLE public.representantes_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the lead capture form)
CREATE POLICY "Allow anonymous inserts for leads" 
ON public.representantes_leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow authenticated users (admins) to read and update
CREATE POLICY "Allow authenticated read leads" 
ON public.representantes_leads 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated update leads" 
ON public.representantes_leads 
FOR UPDATE 
TO authenticated 
USING (true);
