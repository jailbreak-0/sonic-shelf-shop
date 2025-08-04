import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryBanner } from "@/components/CategoryBanner";
import { ProductGrid, Product } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartCount={cartItems.length} 
        onCategorySelect={handleCategorySelect}
      />
      
      <main>
        <HeroSection />
        
        <CategoryBanner onCategorySelect={handleCategorySelect} />
        
        <ProductGrid 
          selectedCategory={selectedCategory}
          onAddToCart={handleAddToCart}
        />
      </main>
      
      <Footer />
      
      <Toaster />
    </div>
  );
};

export default Index;