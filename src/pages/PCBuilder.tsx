import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BuildRequestModal } from '@/components/BuildRequestModal';
import { YourBuilds } from '@/components/YourBuilds';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive, Zap, Box, Fan, Plus, Minus, Trash2, Settings, DollarSign, Save } from 'lucide-react';

const PCBuilder = () => {
  const { user } = useAuth();
  const { state: cartState } = useCart();
  const { toast } = useToast();
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState({});
  const [buildName, setBuildName] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBuildRequest, setShowBuildRequest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedBuilds, setSavedBuilds] = useState([]);
  const [activeTab, setActiveTab] = useState('builder');

  const categoryIcons = {
    cpu: Cpu,
    gpu: Monitor,
    motherboard: CircuitBoard,
    ram: MemoryStick,
    storage: HardDrive,
    psu: Zap,
    case: Box,
    cooling: Fan,
  };

  useEffect(() => {
    fetchData();
    if (user) {
      fetchUserBuilds();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [categoriesResult, componentsResult] = await Promise.all([
        supabase.from('component_categories').select('*').order('name'),
        supabase.from('pc_components').select('*, component_categories(name, slug)').eq('is_active', true)
      ]);
      
      if (categoriesResult.error) throw categoriesResult.error;
      if (componentsResult.error) throw componentsResult.error;
      
      setCategories(categoriesResult.data || []);
      setComponents(componentsResult.data || []);
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
        is_public: false
      };
      
      const { error } = await supabase
        .from('pc_builds')
        .insert([buildData]);
      
      if (error) throw error;
      
      // Refresh builds list
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
    
    // Recalculate total price
    const total = Object.values(build.components || {}).reduce((sum: number, component: any) => {
      return sum + (typeof component?.price === 'number' ? component.price : 0);
    }, 0);
    setTotalPrice(total);
  };

  const deleteBuild = async (buildId: string) => {
    if (!confirm('Are you sure you want to delete this build?')) return;
    
    try {
      const { error } = await supabase
        .from('pc_builds')
        .delete()
        .eq('id', buildId);
      
      if (error) throw error;
      
      // Refresh builds list
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

  const selectComponent = (category: string, component: any) => {
    const newComponents = { ...selectedComponents, [category]: component };
    setSelectedComponents(newComponents);
    
    // Recalculate total
    const total = Object.values(newComponents).reduce((sum: number, comp: any) => {
      return sum + (typeof comp?.price === 'number' ? comp.price : 0);
    }, 0);
    setTotalPrice(total);
  };

  const removeComponent = (category: string) => {
    const newComponents = { ...selectedComponents };
    delete newComponents[category];
    setSelectedComponents(newComponents);
    
    // Recalculate total
    const total = Object.values(newComponents).reduce((sum: number, comp: any) => {
      return sum + (typeof comp?.price === 'number' ? comp.price : 0);
    }, 0);
    setTotalPrice(total);
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
            Build your dream PC with our component compatibility checker and price calculator.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="builder">PC Builder</TabsTrigger>
            <TabsTrigger value="builds">Your Builds</TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Build Configuration
                </CardTitle>
                <CardDescription>
                  Configure your PC build by selecting components for each category.
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
                {categories.map((category) => {
                  const IconComponent = categoryIcons[category.slug] || Box;
                  const selectedComponent = selectedComponents[category.slug];
                  const categoryComponents = components.filter(c => 
                    c.component_categories?.slug === category.slug
                  );

                  return (
                    <Card key={category.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5" />
                          {category.name}
                        </CardTitle>
                        <CardDescription>
                          {selectedComponent ? selectedComponent.name : `Select a ${category.name.toLowerCase()}`}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {selectedComponent ? (
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{selectedComponent.name}</h4>
                              <p className="text-sm text-muted-foreground">{selectedComponent.brand}</p>
                              <p className="text-lg font-bold text-primary">₵{selectedComponent.price}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeComponent(category.slug)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <p className="text-muted-foreground">No component selected</p>
                            <div className="grid gap-2 max-h-48 overflow-y-auto">
                              {categoryComponents.map((component) => (
                                <div
                                  key={component.id}
                                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                                  onClick={() => selectComponent(category.slug, component)}
                                >
                                  <div>
                                    <h5 className="font-medium">{component.name}</h5>
                                    <p className="text-sm text-muted-foreground">{component.brand}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold">₵{component.price}</p>
                                    <Button size="sm" variant="outline">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
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
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>₵{totalPrice.toFixed(2)}</span>
                      </div>
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
      
      <BuildRequestModal 
        isOpen={showBuildRequest}
        onClose={() => setShowBuildRequest(false)}
        components={Object.entries(selectedComponents).map(([category, component]) => ({
          category,
          component
        }))}
        totalPrice={totalPrice}
      />
      
      <Footer />
    </div>
  );
};

export default PCBuilder;