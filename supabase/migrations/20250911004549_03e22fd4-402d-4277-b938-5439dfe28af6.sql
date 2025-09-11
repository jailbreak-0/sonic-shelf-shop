-- Add new component categories for complete PC building
INSERT INTO component_categories (name, slug, description, icon) VALUES
('Keyboards', 'keyboard', 'Mechanical and membrane keyboards', 'keyboard'),
('Mice', 'mouse', 'Gaming and productivity mice', 'mouse'),
('Monitors', 'monitor', 'Gaming and professional monitors', 'monitor');

-- Update pc_components table to support PCPartPicker-like functionality
ALTER TABLE pc_components ADD COLUMN IF NOT EXISTS wattage integer DEFAULT 0;
ALTER TABLE pc_components ADD COLUMN IF NOT EXISTS socket_type text;
ALTER TABLE pc_components ADD COLUMN IF NOT EXISTS chipset text;
ALTER TABLE pc_components ADD COLUMN IF NOT EXISTS memory_slots integer;
ALTER TABLE pc_components ADD COLUMN IF NOT EXISTS max_memory integer;
ALTER TABLE pc_components ADD COLUMN IF NOT EXISTS form_factor text;
ALTER TABLE pc_components ADD COLUMN IF NOT EXISTS dimensions text;
ALTER TABLE pc_components ADD COLUMN IF NOT EXISTS availability_status text DEFAULT 'in_stock';
ALTER TABLE pc_components ADD COLUMN IF NOT EXISTS external_url text;
ALTER TABLE pc_components ADD COLUMN IF NOT EXISTS last_price_update timestamp with time zone DEFAULT now();

-- Update pc_builds to track total wattage
ALTER TABLE pc_builds ADD COLUMN IF NOT EXISTS total_wattage integer DEFAULT 0;
ALTER TABLE pc_builds ADD COLUMN IF NOT EXISTS compatibility_notes text[];

-- Insert sample data for keyboards, mice, and monitors
INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, image_url, wattage, availability_status) 
SELECT 
    'Corsair K95 RGB Platinum XT', 
    'Corsair', 
    'K95 RGB Platinum XT', 
    199.99, 
    (SELECT id FROM component_categories WHERE slug = 'keyboard'), 
    'Mechanical Gaming Keyboard with Cherry MX switches',
    '{"switch_type": "Cherry MX Blue", "backlight": "RGB", "connectivity": "Wired"}',
    '/placeholder.svg',
    5,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'Corsair K95 RGB Platinum XT');

INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, image_url, wattage, availability_status)
SELECT 
    'Logitech G Pro X Superlight', 
    'Logitech', 
    'G Pro X Superlight', 
    149.99, 
    (SELECT id FROM component_categories WHERE slug = 'mouse'), 
    'Ultra-lightweight wireless gaming mouse',
    '{"dpi": "25600", "weight": "63g", "connectivity": "Wireless"}',
    '/placeholder.svg',
    0,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'Logitech G Pro X Superlight');

INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, image_url, wattage, availability_status)
SELECT 
    'ASUS ROG Swift PG279QM', 
    'ASUS', 
    'PG279QM', 
    699.99, 
    (SELECT id FROM component_categories WHERE slug = 'monitor'), 
    '27" 1440p 240Hz Gaming Monitor',
    '{"resolution": "2560x1440", "refresh_rate": "240Hz", "panel_type": "IPS", "size": "27 inch"}',
    '/placeholder.svg',
    45,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'ASUS ROG Swift PG279QM');

-- Update existing components with sample wattage data
UPDATE pc_components SET wattage = 125, socket_type = 'AM4' WHERE name LIKE '%Ryzen%' AND wattage = 0;
UPDATE pc_components SET wattage = 320 WHERE category_id = (SELECT id FROM component_categories WHERE slug = 'gpu') AND wattage = 0;
UPDATE pc_components SET wattage = 0, socket_type = 'AM4', memory_slots = 4, max_memory = 128 WHERE category_id = (SELECT id FROM component_categories WHERE slug = 'motherboard') AND wattage = 0;
UPDATE pc_components SET wattage = 0 WHERE category_id = (SELECT id FROM component_categories WHERE slug = 'ram') AND wattage = 0;
UPDATE pc_components SET wattage = 5 WHERE category_id = (SELECT id FROM component_categories WHERE slug = 'storage') AND wattage = 0;
UPDATE pc_components SET wattage = 750 WHERE category_id = (SELECT id FROM component_categories WHERE slug = 'psu') AND wattage = 0;