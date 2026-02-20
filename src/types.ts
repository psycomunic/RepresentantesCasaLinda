
export enum UserRole {
  ADMIN = 'ADMIN',
  REPRESENTATIVE = 'REPRESENTATIVE',
  RETAILER = 'RETAILER'
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  representative_id?: string; // Linked to a rep if role is RETAILER
  cnpj?: string;
  company_name?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  wholesale_price: number;
  image_url: string;
  category: string;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  unit_price: number;
  discount_applied: number;
}

export interface Order {
  id: string;
  retailer_id: string;
  representative_id: string;
  total_amount: number;
  status: 'PENDING' | 'VALIDATING' | 'APPROVED' | 'SHIPPED';
  created_at: string;
  items: OrderItem[];
}
