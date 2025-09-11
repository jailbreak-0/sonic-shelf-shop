-- Add more comprehensive sample data for keyboards, mice, monitors, and other components
-- First, let's add more keyboards
INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, image_url, wattage, availability_status) 
SELECT 
    'Logitech MX Keys', 
    'Logitech', 
    'MX Keys', 
    99.99, 
    (SELECT id FROM component_categories WHERE slug = 'keyboard'), 
    'Wireless productivity keyboard with backlight',
    '{"switch_type": "Scissor", "backlight": "Yes", "connectivity": "Wireless", "battery_life": "10 days"}',
    '/placeholder.svg',
    2,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'Logitech MX Keys');

INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, image_url, wattage, availability_status) 
SELECT 
    'Razer BlackWidow V3', 
    'Razer', 
    'BlackWidow V3', 
    139.99, 
    (SELECT id FROM component_categories WHERE slug = 'keyboard'), 
    'Mechanical gaming keyboard with green switches',
    '{"switch_type": "Razer Green", "backlight": "RGB", "connectivity": "Wired", "features": ["Programmable keys", "Media controls"]}',
    '/placeholder.svg',
    8,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'Razer BlackWidow V3');

-- Add more mice
INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, image_url, wattage, availability_status)
SELECT 
    'Razer DeathAdder V3', 
    'Razer', 
    'DeathAdder V3', 
    89.99, 
    (SELECT id FROM component_categories WHERE slug = 'mouse'), 
    'Ergonomic gaming mouse with Focus Pro sensor',
    '{"dpi": "30000", "weight": "59g", "connectivity": "Wired", "buttons": 8}',
    '/placeholder.svg',
    1,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'Razer DeathAdder V3');

INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, image_url, wattage, availability_status)
SELECT 
    'Logitech MX Master 3S', 
    'Logitech', 
    'MX Master 3S', 
    99.99, 
    (SELECT id FROM component_categories WHERE slug = 'mouse'), 
    'Advanced wireless mouse for productivity',
    '{"dpi": "8000", "weight": "141g", "connectivity": "Wireless", "battery_life": "70 days"}',
    '/placeholder.svg',
    0,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'Logitech MX Master 3S');

-- Add monitors
INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, image_url, wattage, availability_status)
SELECT 
    'LG 27GN950-B UltraGear', 
    'LG', 
    '27GN950-B', 
    799.99, 
    (SELECT id FROM component_categories WHERE slug = 'monitor'), 
    '27" 4K 144Hz Gaming Monitor',
    '{"resolution": "3840x2160", "refresh_rate": "144Hz", "panel_type": "Nano IPS", "size": "27 inch", "hdr": "HDR600"}',
    '/placeholder.svg',
    65,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'LG 27GN950-B UltraGear');

INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, image_url, wattage, availability_status)
SELECT 
    'Dell S2722DZ', 
    'Dell', 
    'S2722DZ', 
    329.99, 
    (SELECT id FROM component_categories WHERE slug = 'monitor'), 
    '27" QHD USB-C Hub Monitor',
    '{"resolution": "2560x1440", "refresh_rate": "75Hz", "panel_type": "IPS", "size": "27 inch", "connectivity": ["USB-C", "HDMI"]}',
    '/placeholder.svg',
    40,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'Dell S2722DZ');

-- Add more CPUs with proper socket types
INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, socket_type, wattage, availability_status)
SELECT 
    'Intel Core i9-13900K', 
    'Intel', 
    'i9-13900K', 
    589.99, 
    (SELECT id FROM component_categories WHERE slug = 'cpu'), 
    'High-end Intel processor for gaming and productivity',
    '{"tdp": "125W", "cores": 24, "threads": 32, "base_clock": "3.0 GHz", "boost_clock": "5.8 GHz"}',
    'LGA1700',
    125,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'Intel Core i9-13900K');

INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, socket_type, wattage, availability_status)
SELECT 
    'AMD Ryzen 9 7900X', 
    'AMD', 
    'Ryzen 9 7900X', 
    549.99, 
    (SELECT id FROM component_categories WHERE slug = 'cpu'), 
    'High-performance AMD processor',
    '{"tdp": "170W", "cores": 12, "threads": 24, "base_clock": "4.7 GHz", "boost_clock": "5.6 GHz"}',
    'AM5',
    170,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'AMD Ryzen 9 7900X');

-- Add more motherboards with proper socket types
INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, socket_type, memory_slots, max_memory, wattage, availability_status)
SELECT 
    'MSI MAG B650 TOMAHAWK WIFI', 
    'MSI', 
    'MAG B650 TOMAHAWK WIFI', 
    249.99, 
    (SELECT id FROM component_categories WHERE slug = 'motherboard'), 
    'AMD B650 ATX motherboard with WiFi',
    '{"chipset": "B650", "form_factor": "ATX", "memory_support": ["DDR5"], "wifi": true, "bluetooth": true}',
    'AM5',
    4,
    128,
    0,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'MSI MAG B650 TOMAHAWK WIFI');

INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, socket_type, memory_slots, max_memory, wattage, availability_status)
SELECT 
    'ASUS PRIME Z690-A', 
    'ASUS', 
    'PRIME Z690-A', 
    219.99, 
    (SELECT id FROM component_categories WHERE slug = 'motherboard'), 
    'Intel Z690 ATX motherboard',
    '{"chipset": "Z690", "form_factor": "ATX", "memory_support": ["DDR4", "DDR5"], "pcie_slots": 3}',
    'LGA1700',
    4,
    128,
    0,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'ASUS PRIME Z690-A');

-- Add cooling solutions
INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, wattage, availability_status)
SELECT 
    'Corsair iCUE H150i ELITE CAPELLIX', 
    'Corsair', 
    'iCUE H150i ELITE CAPELLIX', 
    189.99, 
    (SELECT id FROM component_categories WHERE slug = 'cooling'), 
    '360mm AIO liquid cooler with RGB',
    '{"type": "AIO Liquid", "radiator_size": "360mm", "rgb": "Yes", "fan_count": 3}',
    15,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'Corsair iCUE H150i ELITE CAPELLIX');

INSERT INTO pc_components (name, brand, model, price, category_id, description, specifications, wattage, availability_status)
SELECT 
    'Noctua NH-D15', 
    'Noctua', 
    'NH-D15', 
    109.99, 
    (SELECT id FROM component_categories WHERE slug = 'cooling'), 
    'Premium dual-tower CPU cooler',
    '{"type": "Air Cooler", "height": "165mm", "fans": 2, "socket_support": ["AM4", "AM5", "LGA1700"]}',
    5,
    'in_stock'
WHERE NOT EXISTS (SELECT 1 FROM pc_components WHERE name = 'Noctua NH-D15');

-- Update compatibility data for existing components
UPDATE pc_components 
SET compatibility_data = jsonb_set(
    COALESCE(compatibility_data, '{}'),
    '{memory_type}',
    '"DDR5"'
)
WHERE category_id = (SELECT id FROM component_categories WHERE slug = 'motherboard')
AND socket_type = 'AM5';

UPDATE pc_components 
SET compatibility_data = jsonb_set(
    COALESCE(compatibility_data, '{}'),
    '{memory_type}',
    '"DDR5"'
)
WHERE category_id = (SELECT id FROM component_categories WHERE slug = 'motherboard')
AND socket_type = 'LGA1700';

-- Update RAM compatibility
UPDATE pc_components 
SET compatibility_data = jsonb_set(
    COALESCE(compatibility_data, '{}'),
    '{memory_type}',
    '"DDR5"'
)
WHERE category_id = (SELECT id FROM component_categories WHERE slug = 'ram')
AND name LIKE '%DDR5%';