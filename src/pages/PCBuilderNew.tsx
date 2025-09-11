import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BuildRequestModal } from '@/components/BuildRequestModal';
import { YourBuilds } from '@/components/YourBuilds';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ComponentSelectionModal from '@/components/ComponentSelectionModal';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
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
  Settings, 
  DollarSign, 
  Save,
  AlertTriangle,
  CheckCircle,
  Keyboard,
  Mouse,
  Edit
} from 'lucide-react';

const PCBuilderNew = () => {
  const { user } = useAuth();
  const { state: cartState } = useCart();
  const { toast } = useToast();
  
  const [categories, setCategories] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState<Record<string, any>>({});
  const [buildName, setBuildName] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWattage, setTotalWattage] = useState(0);
  const [showBuildRequest, setShowBuildRequest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedBuilds, setSavedBuilds] = useState([]);
  const [activeTab, setActiveTab] = useState('builder');
  const [selectedCategory, setSelectedCategory] = useState<{slug: string; name: string} | null>(null);
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);

  const categoryConfig = {
    cpu: { icon: Cpu, limit: 1, required: true },
    gpu: { icon: Monitor, limit: 2, required: false },
    motherboard: { icon: CircuitBoard, limit: 1, required: true },
    ram: { icon: MemoryStick, limit: 4, required: true },
    storage: { icon: HardDrive, limit: 6, required: true },
    psu: { icon: Zap, limit: 1, required: true },
    case: { icon: Box, limit: 1, required: true },
    cooling: { icon: Fan, limit: 1, required: true },
    keyboard: { icon: Keyboard, limit: 1, required: false },
    mouse: { icon: Mouse, limit: 1, required: false },
    monitor: { icon: Monitor, limit: 3, required: false },
  };

  useEffect(() => {
    fetchData();
    if (user) {
      fetchUserBuilds();
    }
  }, [user]);

  useEffect(() => {
    calculateTotals();
    checkCompatibility();
  }, [selectedComponents]);

  const fetchData = async () => {
    try {
      const { data: categoriesResult, error } = await supabase
        .from('component_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(categoriesResult || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBuilds = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('pc_builds')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSavedBuilds(data || []);
    } catch (error) {
      console.error('Error fetching user builds:', error);
    }
  };

  const calculateTotals = () => {
    let totalPrice = 0;
    let totalWattage = 0;

    Object.values(selectedComponents).forEach((component: any) => {
      if (Array.isArray(component)) {
        component.forEach((comp: any) => {
          totalPrice += comp.price || 0;
          totalWattage += comp.wattage || 0;
        });
      } else if (component) {
        totalPrice += component.price || 0;
        totalWattage += component.wattage || 0;
      }
    });

    setTotalPrice(totalPrice);
    setTotalWattage(totalWattage);
  };

  const checkCompatibility = () => {
    const issues: string[] = [];
    const motherboard = selectedComponents.motherboard;
    const cpu = selectedComponents.cpu;
    const ram = selectedComponents.ram;
    const gpu = selectedComponents.gpu;
    const psu = selectedComponents.psu;

    // CPU-Motherboard Socket Compatibility
    if (cpu && motherboard && cpu.socket_type !== motherboard.socket_type) {
      issues.push(`CPU socket (${cpu.socket_type}) is incompatible with motherboard socket (${motherboard.socket_type})`);
    }

    // RAM-Motherboard Compatibility
    if (ram && motherboard && ram.compatibility_data?.memory_type !== motherboard.compatibility_data?.memory_type) {
      issues.push(`RAM type is incompatible with motherboard memory support`);
    }

    // Power Supply Wattage Check
    if (psu && totalWattage > (psu.wattage * 0.8)) {
      issues.push(`Total wattage (${totalWattage}W) exceeds PSU capacity (${psu.wattage}W)`);
    }

    // GPU Case Clearance
    if (gpu && selectedComponents.case) {
      const caseData = selectedComponents.case.compatibility_data;
      const gpuLength = gpu.compatibility_data?.length;
      if (gpuLength && caseData?.max_gpu_length && parseInt(gpuLength) > caseData.max_gpu_length) {
        issues.push(`GPU length exceeds case clearance`);
      }
    }

    setCompatibilityIssues(issues);
  };

  const saveBuild = async () => {
    if (!user || !buildName) {
      toast({
        title: "Error",
        description: "Please enter a build name and ensure you're logged in.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const buildData = {
        name: buildName,
        user_id: user.id,
        components: selectedComponents,
        total_price: totalPrice,
        total_wattage: totalWattage,
        compatibility_notes: compatibilityIssues,
        is_public: false
      };
      
      const { error } = await supabase
        .from('pc_builds')
        .insert([buildData]);
      
      if (error) throw error;
      
      fetchUserBuilds();
      
      toast({
        title: "Success",
        description: "Build saved successfully!",
      });
    } catch (error) {
      console.error('Error saving build:', error);
      toast({
        title: "Error",
        description: "Failed to save build. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loadBuild = (build: any) => {
    setBuildName(build.name);
    setSelectedComponents(build.components || {});
    setActiveTab('builder');
  };

  const deleteBuild = async (buildId: string) => {
    if (!confirm('Are you sure you want to delete this build?')) return;
    
    try {
      const { error } = await supabase
        .from('pc_builds')
        .delete()
        .eq('id', buildId);
      
      if (error) throw error;
      
      fetchUserBuilds();
      
      toast({
        title: "Success",
        description: "Build deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting build:', error);
      toast({
        title: "Error",
        description: "Failed to delete build. Please try again.",
        variant: "destructive",
      });
    }
  };

  const selectComponent = (categorySlug: string, component: any) => {
    const config = categoryConfig[categorySlug];
    if (!config) return;

    setSelectedComponents(prev => {
      const newComponents = { ...prev };
      
      if (config.limit === 1) {
        // Single component categories
        newComponents[categorySlug] = component;
      } else {
        // Multiple component categories
        const existing = newComponents[categorySlug] || [];
        if (Array.isArray(existing) && existing.length < config.limit) {
          newComponents[categorySlug] = [...existing, component];
        } else if (!Array.isArray(existing)) {
          newComponents[categorySlug] = [component];
        }
      }
      
      return newComponents;
    });
  };

  const removeComponent = (categorySlug: string, componentId?: string) => {
    setSelectedComponents(prev => {
      const newComponents = { ...prev };
      
      if (componentId && Array.isArray(newComponents[categorySlug])) {
        // Remove specific component from array
        newComponents[categorySlug] = newComponents[categorySlug].filter(
          (comp: any) => comp.id !== componentId
        );
        if (newComponents[categorySlug].length === 0) {
          delete newComponents[categorySlug];
        }
      } else {
        // Remove entire category
        delete newComponents[categorySlug];
      }
      
      return newComponents;
    });
  };

  const getComponentCount = (categorySlug: string) => {
    const components = selectedComponents[categorySlug];
    if (Array.isArray(components)) return components.length;
    return components ? 1 : 0;
  };

  const renderComponentCard = (category: any) => {
    const config = categoryConfig[category.slug];
    if (!config) return null;

    const IconComponent = config.icon;
    const components = selectedComponents[category.slug];
    const componentCount = getComponentCount(category.slug);
    const canAddMore = componentCount < config.limit;

    return (
      <Card key={category.id} className="relative">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconComponent className="h-5 w-5" />
              {category.name}
              {config.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {componentCount}/{config.limit}
              </Badge>
              {canAddMore && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory({ slug: category.slug, name: category.name })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {componentCount === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
              <IconComponent className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No {category.name.toLowerCase()} selected</p>
              <Button
                variant="ghost"
                className="mt-2"
                onClick={() => setSelectedCategory({ slug: category.slug, name: category.name })}
              >
                Choose {category.name}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {Array.isArray(components) ? (
                components.map((component: any, index: number) => (
                  <div key={`${component.id}-${index}`} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{component.name}</h4>
                      <p className="text-xs text-muted-foreground">{component.brand}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-primary">₵{component.price}</span>
                        {component.wattage > 0 && (
                          <Badge variant="outline" className="text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            {component.wattage}W
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeComponent(category.slug, component.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{components.name}</h4>
                    <p className="text-xs text-muted-foreground">{components.brand}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-primary">₵{components.price}</span>
                      {components.wattage > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          {components.wattage}W
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategory({ slug: category.slug, name: category.name })}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeComponent(category.slug)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={cartState.itemCount} onCategorySelect={() => {}} />
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
      <Header cartCount={cartState.itemCount} onCategorySelect={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">PC Builder</h1>
          <p className="text-muted-foreground">
            Build your dream PC with real-time pricing from trusted retailers and compatibility checking.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="builder">PC Builder</TabsTrigger>
            <TabsTrigger value="builds">Your Builds</TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="space-y-8">
            {/* Build Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Build Configuration
                </CardTitle>
                <CardDescription>
                  Configure your PC build by selecting components. Prices are sourced from Amazon, Newegg, and other retailers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Label htmlFor="build-name">Build Name</Label>
                  <Input
                    id="build-name"
                    placeholder="Enter a name for your build..."
                    value={buildName}
                    onChange={(e) => setBuildName(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Component Categories */}
              <div className="lg:col-span-2 space-y-6">
                {categories
                  .filter(category => categoryConfig[category.slug])
                  .map(renderComponentCard)}
              </div>

              {/* Build Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Build Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Components:</span>
                        <span>{Object.keys(selectedComponents).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Wattage:</span>
                        <span className="flex items-center gap-1">
                          <Zap className="h-4 w-4" />
                          {totalWattage}W
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>₵{totalPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Wattage Progress */}
                    {selectedComponents.psu && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>PSU Usage</span>
                          <span>{Math.round((totalWattage / selectedComponents.psu.wattage) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(totalWattage / selectedComponents.psu.wattage) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}

                    {/* Compatibility Status */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Compatibility</h4>
                      {compatibilityIssues.length === 0 ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">No issues detected</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {compatibilityIssues.map((issue, index) => (
                            <div key={index} className="flex items-start gap-2 text-orange-600">
                              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span className="text-xs">{issue}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Button 
                        onClick={saveBuild}
                        disabled={!user || !buildName || Object.keys(selectedComponents).length === 0}
                        className="w-full"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Build
                      </Button>
                      <Button 
                        onClick={() => setShowBuildRequest(true)}
                        disabled={Object.keys(selectedComponents).length === 0}
                        variant="outline"
                        className="w-full"
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Request Build Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="builds">
            <YourBuilds 
              builds={savedBuilds}
              onLoadBuild={loadBuild}
              onDeleteBuild={deleteBuild}
            />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Component Selection Modal */}
      <ComponentSelectionModal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        categorySlug={selectedCategory?.slug || ''}
        categoryName={selectedCategory?.name || ''}
        selectedComponents={selectedComponents}
        onSelectComponent={selectComponent}
      />
      
      <BuildRequestModal 
        isOpen={showBuildRequest}
        onClose={() => setShowBuildRequest(false)}
        components={Object.entries(selectedComponents).flatMap(([category, component]) => {
          if (Array.isArray(component)) {
            return component.map(comp => ({ category, component: comp }));
          }
          return [{ category, component }];
        })}
        totalPrice={totalPrice}
      />
      
      <Footer />
    </div>
  );
};

export default PCBuilderNew;