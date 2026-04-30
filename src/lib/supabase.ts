import { createClient } from '@supabase/supabase-js';

// Hardcoding temporário para garantir que o Vite não se perca com o .env.local
const supabaseUrl = 'https://wvnqbvydepkeyygkjwul.supabase.co';
const supabaseKey = 'sb_publishable_zkJoacVwptB7_L1O1nVFiw_xCR3pa5c';

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);
