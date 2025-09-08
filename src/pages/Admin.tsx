import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  Package,
  Users,
  ShoppingCart
} from 'lucide-react';

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
  is_active: boolean;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

const Admin = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingComponent, setEditingComponent] = useState<Component | null>(null);
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
        return;
      }
      if (!isAdmin) {
        navigate('/');
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have permission to access the admin panel.",
        });
        return;
      }
      fetchData();
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  const fetchData = async () => {
    try {
      const [componentsResult, categoriesResult] = await Promise.all([
        supabase.from('pc_components').select('*').order('name'),
        supabase.from('component_categories').select('*').order('name')
      ]);

      if (componentsResult.error) throw componentsResult.error;
      if (categoriesResult.error) throw categoriesResult.error;

      setComponents(componentsResult.data || []);
      setCategories(categoriesResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveComponent = async (componentData: any) => {
    setSaving(true);
    try {
      if (editingComponent) {
        const { error } = await supabase
          .from('pc_components')
          .update(componentData)
          .eq('id', editingComponent.id);
        
        if (error) throw error;
        
        toast({
          title: "Component Updated",
          description: "Component has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('pc_components')
          .insert(componentData);
        
        if (error) throw error;
        
        toast({
          title: "Component Added",
          description: "New component has been added successfully.",
        });
      }
      
      setEditingComponent(null);
      setShowAddComponent(false);
      fetchData();
    } catch (error) {
      console.error('Error saving component:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save component. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteComponent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this component?')) return;
    
    try {
      const { error } = await supabase
        .from('pc_components')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Component Deleted",
        description: "Component has been deleted successfully.",
      });
      
      fetchData();
    } catch (error) {
      console.error('Error deleting component:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete component. Please try again.",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={0} onCategorySelect={() => {}} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading Admin Panel...</p>
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
          <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage inventory, prices, and system components.
          </p>
        </div>

        <Tabs defaultValue="components" className="space-y-6">
          <TabsList>
            <TabsTrigger value="components">
              <Package className="h-4 w-4 mr-2" />
              Components
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>PC Components</CardTitle>
                  <CardDescription>
                    Manage PC components, specifications, and compatibility data.
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => setShowAddComponent(true)}
                  disabled={showAddComponent || Boolean(editingComponent)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Component
                </Button>
              </CardHeader>
              
              <CardContent>
                {(showAddComponent || editingComponent) && (
                  <ComponentForm
                    component={editingComponent}
                    categories={categories}
                    onSave={handleSaveComponent}
                    onCancel={() => {
                      setEditingComponent(null);
                      setShowAddComponent(false);
                    }}
                    saving={saving}
                  />
                )}
                
                <div className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {components.map((component) => {
                        const category = categories.find(c => c.id === component.category_id);
                        return (
                          <TableRow key={component.id}>
                            <TableCell className="font-medium">{component.name}</TableCell>
                            <TableCell>{component.brand}</TableCell>
                            <TableCell>{category?.name}</TableCell>
                            <TableCell>${component.price}</TableCell>
                            <TableCell>{component.stock_quantity}</TableCell>
                            <TableCell>
                              <Badge variant={component.is_active ? "default" : "secondary"}>
                                {component.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingComponent(component)}
                          disabled={showAddComponent || Boolean(editingComponent)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteComponent(component.id)}
                          disabled={showAddComponent || Boolean(editingComponent)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>
                  Monitor stock levels and update quantities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Inventory management features will be implemented in a future update.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage user accounts and permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    User management features will be implemented in a future update.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

interface ComponentFormProps {
  component: Component | null;
  categories: Category[];
  onSave: (data: any) => void;
  onCancel: () => void;
  saving: boolean;
}

const ComponentForm: React.FC<ComponentFormProps> = ({
  component,
  categories,
  onSave,
  onCancel,
  saving
}) => {
  const [formData, setFormData] = useState({
    name: component?.name || '',
    brand: component?.brand || '',
    model: component?.model || '',
    price: component?.price || 0,
    description: component?.description || '',
    category_id: component?.category_id || '',
    stock_quantity: component?.stock_quantity || 0,
    is_active: component?.is_active ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {component ? 'Edit Component' : 'Add New Component'}
        </CardTitle>
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Component'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Admin;