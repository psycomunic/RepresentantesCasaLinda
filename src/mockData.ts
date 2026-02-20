// Existing Mock User Profile Data
// (Since we don't have Supabase hooked up yet, we'll keep using mock data)

import { Profile, Client, Product, Order } from './types';

export const MOCK_USER: Profile = {
    id: 'rep-123',
    full_name: 'Angelo Garcia',
    email: 'angelo@casalinda.com.br',
    role: 'representative' as any,
};

export const MOCK_CLIENTS: Client[] = [
    {
        id: '1',
        company_name: 'Loja Decor Prime',
        cnpj: '12.345.678/0001-90',
        address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
        representative_id: 'rep-123',
        delivery_address: 'Av. Paulista, 1000',
        created_at: '2024-01-10T00:00:00Z'
    },
    {
        id: '2',
        company_name: 'Maison Zara',
        cnpj: '98.765.432/0001-10',
        address: 'Rua Oscar Freire, 500 - Cerqueira César, São Paulo - SP',
        representative_id: 'rep-123',
        delivery_address: 'Rua Oscar Freire, 500',
        created_at: '2024-02-15T00:00:00Z'
    },
    {
        id: '3',
        company_name: 'Boutique Casa & Cia',
        cnpj: '45.123.987/0001-55',
        address: 'Av. Ibirapuera, 3103 - Moema, São Paulo - SP',
        representative_id: 'rep-123',
        delivery_address: 'Av. Ibirapuera, 3103',
        created_at: '2024-03-20T00:00:00Z'
    },
];

export const MOCK_PRODUCTS: Product[] = [
    { id: '1', name: 'Quadro Abstrato Minimalista Gold', sku: 'CL-QA-001', wholesale_price: 280.00, category: 'Artes Modernas', image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400' },
    { id: '2', name: 'Vaso de Cerâmica Off-White', sku: 'CL-VC-042', wholesale_price: 145.00, category: 'Cerâmicas', image_url: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=400' },
    { id: '3', name: 'Espelho Adnet Couro Preto', sku: 'CL-ES-102', wholesale_price: 420.00, category: 'Espelhos', image_url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=400' },
    { id: '4', name: 'Escultura Silhueta em Metal', sku: 'CL-SC-088', wholesale_price: 310.00, category: 'Esculturas', image_url: 'https://images.unsplash.com/photo-1544411047-c491e34a2465?auto=format&fit=crop&q=80&w=400' },
    { id: '5', name: 'Conjunto Telas Botânicas', sku: 'CL-CT-023', wholesale_price: 190.00, category: 'Artes Modernas', image_url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=400' },
];

export const MOCK_ORDERS: Order[] = [
    { id: 'ord-001', representative_id: 'rep-123', client_id: '1', total_amount: 1400.00, discount_amount: 140.00, payment_terms: 'Boleto 30', status: 'approved', created_at: '2024-04-01T10:00:00Z', client: MOCK_CLIENTS[0] },
    { id: 'ord-002', representative_id: 'rep-123', client_id: '2', total_amount: 3200.00, discount_amount: 480.00, payment_terms: 'PIX à vista', status: 'pending', created_at: '2024-04-10T14:30:00Z', client: MOCK_CLIENTS[1] },
];
