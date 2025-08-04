import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Smartphone, Headphones, Gamepad2, Tablet, Watch } from "lucide-react";

interface CategoryBannerProps {
  onCategorySelect: (category: string) => void;
}

export function CategoryBanner({ onCategorySelect }: CategoryBannerProps) {
  const categories = [
    {
      name: "Laptops",
      icon: Laptop,
      description: "Gaming & Professional",
      color: "bg-blue-500",
      count: "150+ items"
    },
    {
      name: "Smartphones",
      icon: Smartphone,
      description: "Latest Models",
      color: "bg-green-500",
      count: "200+ items"
    },
    {
      name: "Audio",
      icon: Headphones,
      description: "Headphones & Speakers",
      color: "bg-purple-500",
      count: "80+ items"
    },
    {
      name: "Gaming",
      icon: Gamepad2,
      description: "Gaming Gear",
      color: "bg-red-500",
      count: "120+ items"
    },
    {
      name: "Tablets",
      icon: Tablet,
      description: "iPad & Android",
      color: "bg-orange-500",
      count: "60+ items"
    },
    {
      name: "Wearables",
      icon: Watch,
      description: "Smart Watches",
      color: "bg-pink-500",
      count: "40+ items"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-12 bg-muted/30">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Shop by Category
        </h2>
        <p className="text-muted-foreground">
          Find exactly what you're looking for
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card 
              key={category.name}
              className="group cursor-pointer hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-background"
              onClick={() => onCategorySelect(category.name)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {category.description}
                </p>
                <p className="text-xs text-primary font-medium">
                  {category.count}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Button 
          variant="outline" 
          onClick={() => onCategorySelect("all")}
          className="hover:bg-primary hover:text-primary-foreground"
        >
          View All Categories
        </Button>
      </div>
    </section>
  );
}