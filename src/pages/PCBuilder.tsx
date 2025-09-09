import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BuildRequestModal } from '@/components/BuildRequestModal';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { 
  Cpu, 
  Monitor, 
  CircuitBoard, 
  MemoryStick, 
  HardDrive, 
  Zap, 
  Box, 
  Fan,
  Plus,
  Trash2,
  Save,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';

interface Component {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string | null;
  specifications: any;
  compatibility_data: any;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface BuildComponent {
  category: string;
  component: Component | null;
}

const categoryIcons: Record<string, any> = {
  cpu: Cpu,
  gpu: Monitor,
  motherboard: CircuitBoard,
  ram: MemoryStick,
  storage: HardDrive,
  psu: Zap,
  case: Box,
  cooling: Fan,
};

const PCBuilder = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [components, setComponents] = useState<Component[]>([]);
  const [build, setBuild] = useState<BuildComponent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [buildName, setBuildName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);
  const [showBuildRequest, setShowBuildRequest] = useState(false);
  
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const { state: cartState } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { state: { from: { pathname: '/pc-builder' } } });
      return;
    }
    
    if (user) {
      fetchData();
    }
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    try {
      const [categoriesResult, componentsResult] = await Promise.all([
        supabase.from('component_categories').select('*').order('name'),
        supabase.from('pc_components').select('*').eq('is_active', true)
      ]);

      if (categoriesResult.error) throw categoriesResult.error;
      if (componentsResult.error) throw componentsResult.error;

      setCategories(categoriesResult.data || []);
      setComponents(componentsResult.data || []);
      
      // Initialize build with empty slots
      const initialBuild = (categoriesResult.data || []).map((cat: Category) => ({
        category: cat.slug,
        component: null,
      }));
      setBuild(initialBuild);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load components. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkCompatibility = (newBuild: BuildComponent[]) => {
    const issues: string[] = [];
    
    const cpu = newBuild.find(b => b.category === 'cpu')?.component;
    const motherboard = newBuild.find(b => b.category === 'motherboard')?.component;
    const ram = newBuild.find(b => b.category === 'ram')?.component;
    const gpu = newBuild.find(b => b.category === 'gpu')?.component;
    const psu = newBuild.find(b => b.category === 'psu')?.component;

    // CPU and Motherboard socket compatibility
    if (cpu && motherboard) {
      const cpuSocket = cpu.compatibility_data?.socket;
      const mbSocket = motherboard.compatibility_data?.cpu_socket;
      if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
        issues.push(`CPU socket (${cpuSocket}) is not compatible with motherboard socket (${mbSocket})`);
      }
    }

    // RAM and Motherboard compatibility
    if (ram && motherboard) {
      const ramType = ram.compatibility_data?.memory_type;
      const mbMemoryTypes = motherboard.compatibility_data?.memory_type;
      if (ramType && mbMemoryTypes && ramType !== mbMemoryTypes) {
        issues.push(`RAM type (${ramType}) is not compatible with motherboard (${mbMemoryTypes})`);
      }
    }

    // GPU and PSU power compatibility
    if (gpu && psu) {
      const gpuPowerReq = parseInt(gpu.compatibility_data?.power_requirement?.replace('W', '') || '0');
      const psuWattage = psu.compatibility_data?.wattage || 0;
      if (gpuPowerReq > psuWattage * 0.8) { // 80% rule for PSU
        issues.push(`PSU wattage (${psuWattage}W) may be insufficient for GPU (requires ${gpuPowerReq}W)`);
      }
    }

    setCompatibilityIssues(issues);
  };

  const addComponent = (component: Component) => {
    const category = categories.find(c => c.id === component.category_id);
    if (!category) return;

    const newBuild = [...build];
    const buildIndex = newBuild.findIndex(b => b.category === category.slug);
    if (buildIndex >= 0) {
      newBuild[buildIndex].component = component;
      setBuild(newBuild);
      checkCompatibility(newBuild);
      setSelectedCategory(null);
      
      toast({
        title: "Component Added",
        description: `${component.name} has been added to your build.`,
      });
    }
  };

  const removeComponent = (category: string) => {
    const newBuild = [...build];
    const buildIndex = newBuild.findIndex(b => b.category === category);
    if (buildIndex >= 0) {
      newBuild[buildIndex].component = null;
      setBuild(newBuild);
      checkCompatibility(newBuild);
    }
  };

  const saveBuild = async () => {
    if (!buildName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a name for your build.",
      });
      return;
    }

    const componentsData = build.reduce((acc, item) => {
      if (item.component) {
        acc[item.category] = {
          id: item.component.id,
          name: item.component.name,
          price: item.component.price,
        };
      }
      return acc;
    }, {} as any);

    const totalPrice = build.reduce((total, item) => {
      return total + (item.component?.price || 0);
    }, 0);

    setSaving(true);
    try {
      const { error } = await supabase
        .from('pc_builds')
        .insert({
          user_id: user?.id,
          name: buildName,
          components: componentsData,
          total_price: totalPrice,
        });

      if (error) throw error;

      toast({
        title: "Build Saved",
        description: "Your PC build has been saved successfully!",
      });
      
      setBuildName('');
    } catch (error) {
      console.error('Error saving build:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save build. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const totalPrice = build.reduce((total, item) => {
    return total + (item.component?.price || 0);
  }, 0);

  const getCategoryComponents = (categorySlug: string) => {
    const category = categories.find(c => c.slug === categorySlug);
    if (!category) return [];
    return components.filter(c => c.category_id === category.id);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={0} onCategorySelect={() => {}} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading PC Builder...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} onCategorySelect={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">PC Builder</h1>
          <p className="text-muted-foreground">
            Build your perfect PC with compatibility checking and price calculation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Build Summary */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Build</CardTitle>
                <CardDescription>
                  Select components for each category to build your PC
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {build.map((item) => {
                  const category = categories.find(c => c.slug === item.category);
                  const IconComponent = category ? categoryIcons[category.slug] || Box : Box;
                  
                  return (
                    <div key={item.category} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{category?.name}</h4>
                          {item.component ? (
                            <div>
                              <p className="text-sm text-muted-foreground">{item.component.name}</p>
                              <p className="text-sm font-medium">${item.component.price}</p>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Not selected</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.component && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeComponent(item.category)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCategory(item.category)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Compatibility Check */}
            {compatibilityIssues.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="font-medium">Compatibility Issues:</p>
                    {compatibilityIssues.map((issue, index) => (
                      <p key={index} className="text-sm">• {issue}</p>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {compatibilityIssues.length === 0 && build.some(b => b.component) && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  All selected components are compatible!
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Component Selection & Summary */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Build Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Build name"
                      value={buildName}
                      onChange={(e) => setBuildName(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <Button 
                      className="w-full" 
                      onClick={saveBuild}
                      disabled={saving || !buildName.trim() || !build.some(b => b.component)}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Saving...' : 'Save Build'}
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => setShowBuildRequest(true)}
                      disabled={!build.some(b => b.component)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Request Build Service
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Component Selection */}
            {selectedCategory && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Select {categories.find(c => c.slug === selectedCategory)?.name}
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedCategory(null)}
                  >
                    Cancel
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {getCategoryComponents(selectedCategory).map((component) => (
                    <div 
                      key={component.id} 
                      className="p-3 border rounded-lg cursor-pointer hover:bg-accent"
                      onClick={() => addComponent(component)}
                    >
                      <h4 className="font-medium">{component.name}</h4>
                      <p className="text-sm text-muted-foreground">{component.brand}</p>
                      <p className="text-sm font-medium">${component.price}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <BuildRequestModal 
        isOpen={showBuildRequest}
        onClose={() => setShowBuildRequest(false)}
        components={build.filter(item => item.component).map(item => ({
          category: item.category,
          component: item.component!
        }))}
        totalPrice={totalPrice}
      />
      
      <Footer />
    </div>
  );
};

export default PCBuilder;