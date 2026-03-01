export interface LeadCaptureData {
    id: string;
    fullName: string;
    role: string;
    document: string;
    state: string;
    city: string;
    email: string;
    phone: string;
    createdAt: string;
    status: 'pending' | 'approved' | 'rejected';
}

const STORAGE_KEY = 'casalinda_captured_leads';

const MOCK_INITIAL_LEADS: LeadCaptureData[] = [
    {
        id: '1',
        fullName: 'Ana Cláudia Mendes',
        role: 'Lojista',
        document: '12.345.678/0001-90',
        state: 'SP',
        city: 'São Paulo',
        email: 'ana.loja@email.com',
        phone: '11999999999',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'approved',
    },
    {
        id: '2',
        fullName: 'Roberto Fonseca',
        role: 'Representante',
        document: '98.765.432/0001-10',
        state: 'RJ',
        city: 'Rio de Janeiro',
        email: 'roberto.rep@email.com',
        phone: '21988888888',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        status: 'approved',
    },
    {
        id: '3',
        fullName: 'Camila Arquitetura',
        role: 'Arquiteto/Designer',
        document: '111.222.333-44',
        state: 'SP',
        city: 'Campinas',
        email: 'camila.arq@email.com',
        phone: '19977777777',
        createdAt: new Date().toISOString(),
        status: 'pending',
    },
    {
        id: '4',
        fullName: 'João Pedro Representações',
        role: 'Representante',
        document: '44.555.666/0001-77',
        state: 'PR',
        city: 'Curitiba',
        email: 'jp.reps@email.com',
        phone: '41966666666',
        createdAt: new Date().toISOString(),
        status: 'pending',
    },
    {
        id: '5',
        fullName: 'Decora Mais LTDA',
        role: 'Lojista',
        document: '77.888.999/0001-22',
        state: 'MG',
        city: 'Belo Horizonte',
        email: 'contato@decoramais.com',
        phone: '31955555555',
        createdAt: new Date().toISOString(),
        status: 'pending',
    }
];

export const leadStore = {
    getLeads: (): LeadCaptureData[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                // Initialize with some mocks if empty
                localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_INITIAL_LEADS));
                return MOCK_INITIAL_LEADS;
            }
            return JSON.parse(stored);
        } catch {
            return MOCK_INITIAL_LEADS;
        }
    },

    addLead: (lead: Omit<LeadCaptureData, 'id' | 'createdAt' | 'status'>) => {
        try {
            const leads = leadStore.getLeads();
            const newLead: LeadCaptureData = {
                ...lead,
                id: Math.random().toString(36).substr(2, 9),
                createdAt: new Date().toISOString(),
                status: 'pending',
            };

            const updated = [newLead, ...leads];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return newLead;
        } catch (e) {
            console.error('Failed to save lead', e);
            return null;
        }
    },

    clearLeads: () => {
        localStorage.removeItem(STORAGE_KEY);
    },

    updateLeadStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => {
        try {
            const leads = leadStore.getLeads();
            const updated = leads.map(lead =>
                lead.id === id ? { ...lead, status } : lead
            );
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return true;
        } catch {
            return false;
        }
    }
};
