import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string | null;
  description: string | null;
  quantity: number;
  is_active: boolean;
}

interface ProductGridProps {
  selectedCategory: string;
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ selectedCategory, onAddToCart }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="w-full h-64 bg-muted animate-pulse" />
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                <div className="h-6 bg-muted animate-pulse rounded w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {selectedCategory === "all" ? "All Products" : selectedCategory}
        </h2>
        <p className="text-muted-foreground">
          Showing {filteredProducts.length} products
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden border-0 shadow-card hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-3 right-3 z-10 ${
                    favorites.includes(product.id) 
                      ? "text-red-500 hover:text-red-600" 
                      : "text-white hover:text-red-500"
                  } bg-black/20 hover:bg-black/40`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-current" : ""}`} />
                </Button>
                
                <Link to={`/item/${product.id}`}>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-64 bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                </Link>
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                  <Button variant="secondary" size="sm" asChild>
                    <Link to={`/item/${product.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Quick View
                    </Link>
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <Link to={`/item/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 // Default rating since it's not in the schema
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    4.0 (0 reviews)
                  </span>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl font-bold text-primary">
                    ₵{product.price}
                  </span>
                </div>

                {product.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="mt-2">
                  <span className="text-xs text-muted-foreground">
                    Stock: {product.quantity}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button 
                  variant="default" 
                  className="w-full group"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.quantity === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                  {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}