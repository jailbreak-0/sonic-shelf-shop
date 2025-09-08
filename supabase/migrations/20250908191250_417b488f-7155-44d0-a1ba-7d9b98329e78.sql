-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create component categories table
CREATE TABLE public.component_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create PC components table
CREATE TABLE public.pc_components (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category_id UUID REFERENCES public.component_categories(id) ON DELETE CASCADE,
  brand TEXT,
  model TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  image_url TEXT,
  description TEXT,
  specifications JSONB DEFAULT '{}',
  compatibility_data JSONB DEFAULT '{}',
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on pc_components
ALTER TABLE public.pc_components ENABLE ROW LEVEL SECURITY;

-- PC components policies
CREATE POLICY "Anyone can view active components" ON public.pc_components
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage components" ON public.pc_components
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create PC builds table
CREATE TABLE public.pc_builds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  components JSONB DEFAULT '{}',
  total_price NUMERIC DEFAULT 0,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on pc_builds
ALTER TABLE public.pc_builds ENABLE ROW LEVEL SECURITY;

-- PC builds policies
CREATE POLICY "Users can view their own builds" ON public.pc_builds
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public builds" ON public.pc_builds
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can manage their own builds" ON public.pc_builds
  FOR ALL USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample component categories
INSERT INTO public.component_categories (name, slug, description, icon) VALUES
  ('CPU', 'cpu', 'Central Processing Units', 'cpu'),
  ('GPU', 'gpu', 'Graphics Processing Units', 'monitor'),
  ('Motherboard', 'motherboard', 'Motherboards', 'circuit-board'),
  ('RAM', 'ram', 'Memory Modules', 'memory-stick'),
  ('Storage', 'storage', 'SSDs and HDDs', 'hard-drive'),
  ('Power Supply', 'psu', 'Power Supply Units', 'zap'),
  ('Case', 'case', 'PC Cases', 'box'),
  ('Cooling', 'cooling', 'CPU and Case Cooling', 'fan');

-- Insert sample PC components
INSERT INTO public.pc_components (name, category_id, brand, model, price, description, specifications, compatibility_data, stock_quantity) VALUES
  (
    'Intel Core i7-13700K',
    (SELECT id FROM public.component_categories WHERE slug = 'cpu'),
    'Intel',
    'i7-13700K',
    399.99,
    'High-performance gaming and productivity CPU',
    '{"cores": 16, "threads": 24, "base_clock": "3.4 GHz", "boost_clock": "5.4 GHz", "socket": "LGA1700", "tdp": "125W"}',
    '{"socket": "LGA1700", "memory_support": ["DDR4", "DDR5"], "chipset_compatibility": ["Z790", "Z690", "B760", "B660"]}',
    25
  ),
  (
    'AMD Ryzen 7 7700X',
    (SELECT id FROM public.component_categories WHERE slug = 'cpu'),
    'AMD',
    'Ryzen 7 7700X',
    349.99,
    'High-performance AMD processor',
    '{"cores": 8, "threads": 16, "base_clock": "4.5 GHz", "boost_clock": "5.4 GHz", "socket": "AM5", "tdp": "105W"}',
    '{"socket": "AM5", "memory_support": ["DDR5"], "chipset_compatibility": ["X670E", "X670", "B650E", "B650"]}',
    30
  ),
  (
    'NVIDIA RTX 4070 Ti',
    (SELECT id FROM public.component_categories WHERE slug = 'gpu'),
    'NVIDIA',
    'RTX 4070 Ti',
    799.99,
    'High-end gaming graphics card',
    '{"memory": "12GB GDDR6X", "base_clock": "2310 MHz", "boost_clock": "2610 MHz", "memory_speed": "21 Gbps", "memory_bus": "192-bit"}',
    '{"power_requirement": "700W", "pcie_slot": "PCIe 4.0 x16", "length": "304mm", "height": "112mm"}',
    15
  ),
  (
    'ASUS ROG STRIX Z790-E',
    (SELECT id FROM public.component_categories WHERE slug = 'motherboard'),
    'ASUS',
    'ROG STRIX Z790-E',
    449.99,
    'Premium Intel Z790 motherboard',
    '{"form_factor": "ATX", "socket": "LGA1700", "chipset": "Z790", "memory_slots": 4, "max_memory": "128GB", "memory_support": ["DDR5"]}',
    '{"cpu_socket": "LGA1700", "memory_type": "DDR5", "gpu_slots": 2, "storage_slots": {"m2": 4, "sata": 6}}',
    20
  ),
  (
    'Corsair Vengeance DDR5-5600 32GB',
    (SELECT id FROM public.component_categories WHERE slug = 'ram'),
    'Corsair',
    'Vengeance DDR5-5600',
    199.99,
    'High-speed DDR5 memory kit',
    '{"capacity": "32GB", "speed": "DDR5-5600", "latency": "CL36", "voltage": "1.25V", "kit": "2 x 16GB"}',
    '{"memory_type": "DDR5", "speed": 5600, "capacity": 32}',
    40
  ),
  (
    'Samsung 980 PRO 1TB NVMe SSD',
    (SELECT id FROM public.component_categories WHERE slug = 'storage'),
    'Samsung',
    '980 PRO',
    129.99,
    'High-performance NVMe SSD',
    '{"capacity": "1TB", "interface": "PCIe 4.0 x4", "form_factor": "M.2 2280", "read_speed": "7000 MB/s", "write_speed": "5000 MB/s"}',
    '{"interface": "M.2", "form_factor": "2280", "capacity": 1000}',
    50
  ),
  (
    'Corsair RM850x 850W 80+ Gold',
    (SELECT id FROM public.component_categories WHERE slug = 'psu'),
    'Corsair',
    'RM850x',
    149.99,
    'Fully modular 80+ Gold power supply',
    '{"wattage": "850W", "efficiency": "80+ Gold", "modular": "Fully", "fan_size": "135mm", "warranty": "10 years"}',
    '{"wattage": 850, "efficiency": "80+ Gold", "connectors": {"cpu": 2, "pcie": 6, "sata": 12}}',
    35
  ),
  (
    'NZXT H7 Flow RGB',
    (SELECT id FROM public.component_categories WHERE slug = 'case'),
    'NZXT',
    'H7 Flow RGB',
    149.99,
    'Mid-tower case with excellent airflow',
    '{"form_factor": "Mid Tower", "motherboard_support": ["ATX", "mATX", "Mini-ITX"], "max_gpu_length": "381mm", "max_cpu_cooler_height": "185mm"}',
    '{"motherboard_support": ["ATX", "mATX", "Mini-ITX"], "max_gpu_length": 381, "fan_support": {"front": 3, "top": 3, "rear": 1}}',
    25
  );

-- Update triggers for timestamps
CREATE TRIGGER update_pc_components_updated_at
  BEFORE UPDATE ON public.pc_components
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pc_builds_updated_at
  BEFORE UPDATE ON public.pc_builds
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();