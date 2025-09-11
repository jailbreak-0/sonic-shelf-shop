import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Check, ExternalLink, Zap, Package, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Component {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  image_url: string | null;
  description: string | null;
  specifications: any;
  compatibility_data: any;
  stock_quantity: number;
  wattage: number;
  socket_type: string | null;
  availability_status: string;
  external_url: string | null;
}

interface ComponentSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  categorySlug: string;
  categoryName: string;
  selectedComponents: Record<string, any>;
  onSelectComponent: (categorySlug: string, component: Component) => void;
}

const ComponentSelectionModal: React.FC<ComponentSelectionModalProps> = ({
  isOpen,
  onClose,
  categorySlug,
  categoryName,
  selectedComponents,
  onSelectComponent,
}) => {
  const [components, setComponents] = useState<Component[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'wattage'>('price');

  useEffect(() => {
    if (isOpen && categorySlug) {
      fetchCategoryComponents();
    }
  }, [isOpen, categorySlug]);

  useEffect(() => {
    filterAndSortComponents();
  }, [components, searchQuery, sortBy, selectedComponents]);

  const fetchCategoryComponents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pc_components')
        .select('*, component_categories(name, slug)')
        .eq('is_active', true)
        .eq('component_categories.slug', categorySlug);

      if (error) throw error;
      setComponents(data || []);
    } catch (error) {
      console.error('Error fetching components:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortComponents = () => {
    let filtered = components.filter(component =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.model?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply compatibility filters
    filtered = applyCompatibilityFilter(filtered);

    // Sort components
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'wattage':
          return (b.wattage || 0) - (a.wattage || 0);
        default:
          return 0;
      }
    });

    setFilteredComponents(filtered);
  };

  const applyCompatibilityFilter = (componentList: Component[]) => {
    const selectedMotherboard = selectedComponents.motherboard;
    const selectedCPU = selectedComponents.cpu;

    // Filter CPUs based on motherboard socket compatibility
    if (categorySlug === 'cpu' && selectedMotherboard?.socket_type) {
      return componentList.filter(cpu => 
        cpu.socket_type === selectedMotherboard.socket_type ||
        cpu.compatibility_data?.socket === selectedMotherboard.socket_type
      );
    }

    // Filter RAM based on motherboard memory support
    if (categorySlug === 'ram' && selectedMotherboard?.compatibility_data?.memory_type) {
      return componentList.filter(ram => 
        ram.compatibility_data?.memory_type === selectedMotherboard.compatibility_data.memory_type
      );
    }

    return componentList;
  };

  const getCompatibilityStatus = (component: Component) => {
    const warnings = [];
    const selectedMotherboard = selectedComponents.motherboard;
    const selectedPSU = selectedComponents.psu;

    // Check socket compatibility for CPUs
    if (categorySlug === 'cpu' && selectedMotherboard?.socket_type) {
      if (component.socket_type !== selectedMotherboard.socket_type &&
          component.compatibility_data?.socket !== selectedMotherboard.socket_type) {
        warnings.push('Socket incompatible with motherboard');
      }
    }

    // Check power requirements
    if (selectedPSU && component.wattage > 0) {
      const totalWattage = calculateTotalWattage() + component.wattage;
      if (totalWattage > selectedPSU.wattage * 0.8) { // 80% PSU efficiency rule
        warnings.push('May exceed PSU capacity');
      }
    }

    return warnings;
  };

  const calculateTotalWattage = () => {
    return Object.values(selectedComponents).reduce((total: number, component: any) => {
      if (Array.isArray(component)) {
        return total + component.reduce((sum: number, comp: any) => sum + (comp.wattage || 0), 0);
      }
      return total + (component?.wattage || 0);
    }, 0);
  };

  const handleSelectComponent = (component: Component) => {
    onSelectComponent(categorySlug, component);
    onClose();
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select {categoryName}</DialogTitle>
          <DialogDescription>
            Choose a {categoryName.toLowerCase()} for your build. Prices are sourced from multiple retailers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${categoryName.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'name' | 'wattage')}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="price">Sort by Price</option>
              <option value="name">Sort by Name</option>
              <option value="wattage">Sort by Wattage</option>
            </select>
          </div>

          {/* Components List */}
          <ScrollArea className="h-[500px]">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading {categoryName.toLowerCase()}...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredComponents.map((component) => {
                  const warnings = getCompatibilityStatus(component);
                  return (
                    <Card key={component.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-start gap-4">
                              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                                {component.image_url ? (
                                  <img 
                                    src={component.image_url} 
                                    alt={component.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <Package className="h-8 w-8 text-muted-foreground" />
                                )}
                              </div>

                              <div className="flex-1">
                                <h3 className="font-semibold text-sm">{component.name}</h3>
                                <p className="text-sm text-muted-foreground">{component.brand} {component.model}</p>
                                
                                {component.description && (
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {component.description}
                                  </p>
                                )}

                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge 
                                    variant="secondary" 
                                    className={getAvailabilityColor(component.availability_status)}
                                  >
                                    {component.availability_status?.replace('_', ' ')}
                                  </Badge>
                                  
                                  {component.wattage > 0 && (
                                    <Badge variant="outline" className="text-xs">
                                      <Zap className="h-3 w-3 mr-1" />
                                      {component.wattage}W
                                    </Badge>
                                  )}

                                  {component.socket_type && (
                                    <Badge variant="outline" className="text-xs">
                                      {component.socket_type}
                                    </Badge>
                                  )}
                                </div>

                                {warnings.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {warnings.map((warning, index) => (
                                      <div key={index} className="flex items-center gap-1 text-xs text-orange-600">
                                        <AlertTriangle className="h-3 w-3" />
                                        {warning}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right ml-4">
                            <div className="text-lg font-bold text-primary">
                              ₵{component.price.toFixed(2)}
                            </div>
                            
                            <div className="flex items-center gap-2 mt-2">
                              {component.external_url && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(component.external_url!, '_blank')}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              )}
                              
                              <Button
                                size="sm"
                                onClick={() => handleSelectComponent(component)}
                                disabled={component.availability_status === 'out_of_stock'}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Select
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {filteredComponents.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No {categoryName.toLowerCase()} found matching your criteria.
                    </p>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentSelectionModal;