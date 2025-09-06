import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Cart() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return `₵${price.toFixed(2)}`;
  };

  const shipping = 0; // Free shipping
  const tax = state.total * 0.15; // 15% tax
  const finalTotal = state.total + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={state.itemCount} onCategorySelect={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {state.items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-sm text-muted-foreground">No image</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-muted-foreground text-sm mt-1">
                              {item.category}
                            </p>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            
                            <Badge variant="outline" className="px-3 py-1">
                              {item.cartQuantity}
                            </Badge>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                              disabled={item.cartQuantity >= item.quantity}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            
                            <span className="text-sm text-muted-foreground ml-2">
                              {item.quantity} available
                            </span>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.price)} each
                            </p>
                            <p className="font-semibold text-lg">
                              {formatPrice(item.price * item.cartQuantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardContent className="p-6">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Items
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-success font-medium">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax (15%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(finalTotal)}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-3">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}