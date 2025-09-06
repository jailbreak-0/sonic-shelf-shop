import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, ShoppingCart, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { Product } from "@/components/ProductGrid";

const ItemDetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, state } = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching item:", error);
        toast({
          title: "Error",
          description: "Failed to load product details.",
          variant: "destructive",
        });
      } else {
        setItem(data);
      }
      setLoading(false);
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    if (item) {
      addItem(item);
      toast({
        title: "Added to Cart",
        description: `${item.name} has been added to your cart.`,
      });
    }
  };

  const isInCart = item ? state.items.some(cartItem => cartItem.id === item.id) : false;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={state.itemCount} onCategorySelect={() => {}} />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg" />
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-20 h-20 bg-muted rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-12 bg-muted rounded w-1/3" />
                <div className="h-20 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={state.itemCount} onCategorySelect={() => {}} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Mock images for demo (in real app, you'd have multiple product images)
  const images = [item.image_url, item.image_url, item.image_url, item.image_url].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={state.itemCount} onCategorySelect={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              {item.image_url ? (
                <img
                  src={images[selectedImage] || item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground">No image available</span>
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${item.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {item.category && (
                  <Badge variant="secondary">{item.category}</Badge>
                )}
                <Badge variant={item.quantity > 0 ? "default" : "destructive"}>
                  {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">{item.name}</h1>
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4
                        ? "text-yellow-400 fill-current"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  4.0 (24 reviews)
                </span>
              </div>
              
              <div className="text-3xl font-bold text-primary mb-6">
                ₵{item.price}
              </div>
            </div>

            {item.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Stock: {item.quantity} available</span>
                <span>•</span>
                <span>SKU: {item.id.slice(0, 8).toUpperCase()}</span>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={item.quantity === 0}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {isInCart ? "Added to Cart" : "Add to Cart"}
                </Button>
                
                <Button variant="outline" size="lg">
                  Buy Now
                </Button>
              </div>
              
              {item.quantity <= 5 && item.quantity > 0 && (
                <p className="text-sm text-warning font-medium">
                  Only {item.quantity} left in stock!
                </p>
              )}
            </div>

            <Separator />

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Why Choose Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm">1 Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <span className="text-sm">Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-primary" />
                    <span className="text-sm">30-Day Returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ItemDetailsPage;
