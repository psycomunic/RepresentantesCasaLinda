-- Make product_id optional to allow manual orders
ALTER TABLE order_items ALTER COLUMN product_id DROP NOT NULL;

-- Add fields for manual items
ALTER TABLE order_items ADD COLUMN product_name TEXT;
ALTER TABLE order_items ADD COLUMN custom_details JSONB; -- Para salvar tamanho, moldura, acabamento de pedidos manuais

-- Update RLS policies for order_items if needed? 
-- Current policy:
-- CREATE POLICY "Representatives can view own order items" ON order_items FOR SELECT USING (
--     EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.representative_id = auth.uid())
-- );
-- CREATE POLICY "Representatives can insert own order items" ON order_items FOR INSERT WITH CHECK (
--     EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.representative_id = auth.uid())
-- );
-- No changes needed for RLS since it's based on order_id.
