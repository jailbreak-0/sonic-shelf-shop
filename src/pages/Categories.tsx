import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star,
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Monitor,
  Camera,
  Tablet,
  Watch
} from "lucide-react";

const Categories = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const categories = [
    {
      id: "laptops",
      name: "Laptops",
      icon: Laptop,
      count: 156,
      description: "Gaming, business, and ultrabooks",
      featured: true
    },
    {
      id: "smartphones",
      name: "Smartphones",
      icon: Smartphone,
      count: 89,
      description: "Latest flagship and budget phones",
      featured: true
    },
    {
      id: "audio",
      name: "Audio & Headphones",
      icon: Headphones,
      count: 234,
      description: "Headphones, speakers, and earbuds",
      featured: true
    },
    {
      id: "gaming",
      name: "Gaming",
      icon: Gamepad2,
      count: 178,
      description: "Consoles, accessories, and peripherals",
      featured: true
    },
    {
      id: "monitors",
      name: "Monitors",
      icon: Monitor,
      count: 67,
      description: "4K, gaming, and professional displays",
      featured: false
    },
    {
      id: "cameras",
      name: "Cameras",
      icon: Camera,
      count: 43,
      description: "DSLR, mirrorless, and action cameras",
      featured: false
    },
    {
      id: "tablets",
      name: "Tablets",
      icon: Tablet,
      count: 52,
      description: "iPads, Android, and 2-in-1 devices",
      featured: false
    },
    {
      id: "wearables",
      name: "Wearables",
      icon: Watch,
      count: 38,
      description: "Smartwatches and fitness trackers",
      featured: false
    }
  ];

  const brands = [
    "Apple", "Samsung", "Dell", "HP", "Lenovo", "ASUS", "Sony", "Microsoft", "Google", "OnePlus"
  ];

  const features = [
    "Free Shipping", "Fast Delivery", "In Stock", "On Sale", "New Arrivals", "Best Sellers"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} onCategorySelect={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">Browse Categories</Badge>
          <h1 className="text-4xl font-bold mb-4">Product Categories</h1>
          <p className="text-xl text-muted-foreground">
            Explore our complete range of technology products across all categories
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search categories..." className="pl-10" />
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Price Range</label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Brands */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Brands</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Features</label>
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox id={feature} />
                        <label htmlFor={feature} className="text-sm cursor-pointer">
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Showing {categories.length} categories
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <Select defaultValue="name">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="name-desc">Name Z-A</SelectItem>
                    <SelectItem value="count">Product Count</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Categories */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {categories.filter(cat => cat.featured).map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card key={category.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{category.name}</CardTitle>
                              <CardDescription>{category.description}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="secondary">{category.count}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">4.8 avg rating</span>
                          </div>
                          <Button size="sm">Browse</Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* All Categories */}
            <div>
              <h2 className="text-2xl font-bold mb-6">All Categories</h2>
              
              {viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Card key={category.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                        <CardHeader className="text-center">
                          <div className="p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit mx-auto">
                            <IconComponent className="h-8 w-8 text-primary" />
                          </div>
                          <CardTitle>{category.name}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline">{category.count} products</Badge>
                            {category.featured && <Badge>Featured</Badge>}
                          </div>
                          <Button className="w-full">View Products</Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Card key={category.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <IconComponent className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">{category.name}</h3>
                                <p className="text-muted-foreground">{category.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">{category.count} products</Badge>
                                  {category.featured && <Badge>Featured</Badge>}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right hidden sm:block">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm text-muted-foreground">4.8</span>
                                </div>
                              </div>
                              <Button>Browse</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;