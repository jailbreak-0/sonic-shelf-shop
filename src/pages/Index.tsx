import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryBanner } from "@/components/CategoryBanner";
import { ProductGrid } from "@/components/ProductGrid";
import { PCBuilderCTA } from "@/components/PCBuilderCTA";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { useCart } from "@/contexts/CartContext";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addItem, state } = useCart();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartCount={state.itemCount} 
        onCategorySelect={handleCategorySelect}
      />
      
      <main>
        <HeroSection />
        
        <PCBuilderCTA />
        
        <CategoryBanner onCategorySelect={handleCategorySelect} />
        
        <ProductGrid 
          selectedCategory={selectedCategory}
          onAddToCart={addItem}
        />
      </main>
      
      <Footer />
      
      <Toaster />
    </div>
  );
};

export default Index;