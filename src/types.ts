export enum UserRole {
  ADMIN = 'admin',
  REPRESENTATIVE = 'representative',
  RETAILER = 'retailer' // keeping for backward compatibility if needed, though replaced mostly by clients
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  representative_id?: string;
  cnpj?: string;
  company_name?: string;
}

export interface Client {
  id: string;
  representative_id: string;
  cnpj: string;
  company_name: string;
  address?: string;
  delivery_address: string;
  created_at: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  image_url: string;
  wholesale_price: number;
  category: string;
  collection?: string;
  size?: string;
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id?: string | null;
  product_name?: string;
  quantity: number;
  unit_price: number;
  image_url?: string;
  custom_details?: Record<string, string>;
  product?: Product;
}

export interface Order {
  id: string;
  order_number?: number;
  representative_id: string;
  client_id?: string | null;
  client_name?: string;
  total_amount: number;
  discount_amount?: number;
  payment_terms?: string;
  status: 'draft' | 'pending' | 'approved' | 'in_production' | 'shipped' | 'delivered' | 'cancelled';
  magazord_order_id?: string | null;
  tracking_url?: string | null;
  notes?: string;
  created_at: string;
  client?: Client;
  representative?: Partial<Profile>;
  items?: OrderItem[];
}

export interface Commission {
  id: string;
  representative_id: string;
  order_id: string;
  amount: number;
  status: 'pending' | 'paid';
  created_at: string;
  order?: Order;
}
