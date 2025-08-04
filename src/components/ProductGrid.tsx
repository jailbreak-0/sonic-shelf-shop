import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client"; // adjust if path differs

// Product images
import laptopGaming from "@/assets/laptop-gaming.jpg";
import smartphonePremium from "@/assets/smartphone-premium.jpg";
import headsetGaming from "@/assets/headset-gaming.jpg";
import laptopProfessional from "@/assets/laptop-professional.jpg";
import { Link } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Gaming Laptop Pro X1",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 247,
    image: laptopGaming,
    category: "Laptops",
    badge: "Best Seller",
    features: ["RTX 4070", "16GB RAM", "1TB SSD", "144Hz Display"]
  },
  {
    id: 2,
    name: "Premium Smartphone Ultra",
    price: 8999,
    rating: 4.9,
    reviews: 892,
    image: smartphonePremium,
    category: "Smartphones",
    badge: "New",
    features: ["108MP Camera", "5G Ready", "256GB Storage", "Fast Charging"]
  },
  {
    id: 3,
    name: "Gaming Headset Elite",
    price: 1999,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 156,
    image: headsetGaming,
    category: "Audio",
    badge: "Sale",
    features: ["7.1 Surround", "RGB Lighting", "Noise Cancel", "Wireless"]
  },
  {
    id: 4,
    name: "Professional Laptop Air",
    price: 9999,
    rating: 4.6,
    reviews: 324,
    image: laptopProfessional,
    category: "Laptops",
    features: ["M2 Chip", "8GB RAM", "512GB SSD", "All-Day Battery"]
  },
  {
    id: 5,
    name: "Gaming Laptop Pro X1",
    price: 12999,
    originalPrice: 15999,
    rating: 4.8,
    reviews: 247,
    image: laptopGaming,
    category: "Gaming",
    badge: "Hot Deal",
    features: ["RTX 4070", "16GB RAM", "1TB SSD", "144Hz Display"]
  },
  {
    id: 6,
    name: "Premium Smartphone Ultra",
    price: 8999,
    rating: 4.9,
    reviews: 892,
    image: smartphonePremium,
    category: "Smartphones",
    features: ["108MP Camera", "5G Ready", "256GB Storage", "Fast Charging"]
  }
];

interface ProductGridProps {
  selectedCategory: string;
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ selectedCategory, onAddToCart }: ProductGridProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  const toggleFavorite = (productId: number) => {
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

    useEffect(() => {
      const fetchItems = async () => {
        const { data, error } = await supabase
          .from("items")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching items:", error);
        } else {
          setItems(data);
        }
        setLoading(false);
      };

      fetchItems();
    }, []);

    if (loading) return <p>Loading products...</p>;

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className="group overflow-hidden border-0 shadow-card hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative overflow-hidden">
              {product.badge && (
                <Badge 
                  className="absolute top-3 left-3 z-10"
                  variant={product.badge === "Sale" ? "destructive" : "default"}
                >
                  {product.badge}
                </Badge>
              )}
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
              
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                <Button variant="secondary" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Quick View
                </Button>
              </div>
            </div>

            <CardContent className="p-4">
              {items.map((item) =>(
              <Link key={item.id} to={`/item/${item.id}`}>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl font-bold text-primary">
                  ₵{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₵{product.originalPrice}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    • {feature}
                  </div>
                ))}
              </div>
              </Link>)}
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button 
                variant="cart" 
                className="w-full group"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}