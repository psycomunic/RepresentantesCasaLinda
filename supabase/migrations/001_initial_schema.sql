-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (Extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('representative', 'admin')) DEFAULT 'representative',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Clients (Managed by representatives)
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    representative_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    cnpj TEXT NOT NULL,
    company_name TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    wholesale_price DECIMAL(10, 2) NOT NULL,
    category TEXT,
    collection TEXT,
    size TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    representative_id UUID REFERENCES profiles(id) ON DELETE RESTRICT NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE RESTRICT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    payment_terms TEXT NOT NULL, -- e.g., 'Boleto 30/60/90', 'PIX'
    status TEXT CHECK (status IN ('draft', 'pending', 'approved', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE RESTRICT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Commissions
CREATE TABLE commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    representative_id UUID REFERENCES profiles(id) ON DELETE RESTRICT NOT NULL,
    order_id UUID REFERENCES orders(id) ON DELETE RESTRICT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'paid')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Basic Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- Profiles: Representatives can read their own profile. Admins can read all.
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- Clients: Representatives can manage their own clients.
CREATE POLICY "Representatives can view own clients" ON clients FOR SELECT USING (auth.uid() = representative_id);
CREATE POLICY "Representatives can insert own clients" ON clients FOR INSERT WITH CHECK (auth.uid() = representative_id);
CREATE POLICY "Representatives can update own clients" ON clients FOR UPDATE USING (auth.uid() = representative_id);

-- Products: Everyone authenticated can view products.
CREATE POLICY "Authenticated users can view products" ON products FOR SELECT USING (auth.role() = 'authenticated');

-- Orders: Representatives can manage their own orders.
CREATE POLICY "Representatives can view own orders" ON orders FOR SELECT USING (auth.uid() = representative_id);
CREATE POLICY "Representatives can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = representative_id);
CREATE POLICY "Representatives can update own orders" ON orders FOR UPDATE USING (auth.uid() = representative_id);

-- Order Items: Representatives can view/insert items for their own orders.
CREATE POLICY "Representatives can view own order items" ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.representative_id = auth.uid())
);
CREATE POLICY "Representatives can insert own order items" ON order_items FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.representative_id = auth.uid())
);

-- Commissions: Representatives can view their own commissions.
CREATE POLICY "Representatives can view own commissions" ON commissions FOR SELECT USING (auth.uid() = representative_id);
