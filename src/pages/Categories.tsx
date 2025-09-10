import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryUpdater } from "@/components/CategoryUpdater";
import { useCart } from "@/contexts/CartContext";
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
  const { state: cartState } = useCart();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const categories = [
    {
      id: "laptops",
      name: "Laptops",
      icon: Laptop,
      count: 156,
      description: "Gaming, business, and ultrabooks",
      featured: true,
      rating: 4.8,
      priceRange: [299, 3499],
      brands: ["Apple", "Dell", "HP", "Lenovo", "ASUS"],
      features: ["Free Shipping", "Fast Delivery", "In Stock", "Best Sellers"]
    },
    {
      id: "smartphones",
      name: "Smartphones",
      icon: Smartphone,
      count: 89,
      description: "Latest flagship and budget phones",
      featured: true,
      rating: 4.7,
      priceRange: [199, 1599],
      brands: ["Apple", "Samsung", "Google", "OnePlus"],
      features: ["Free Shipping", "New Arrivals", "In Stock", "On Sale"]
    },
    {
      id: "audio",
      name: "Audio & Headphones",
      icon: Headphones,
      count: 234,
      description: "Headphones, speakers, and earbuds",
      featured: true,
      rating: 4.6,
      priceRange: [29, 999],
      brands: ["Sony", "Apple", "Samsung", "Sennheiser"],
      features: ["Free Shipping", "Best Sellers", "In Stock"]
    },
    {
      id: "gaming",
      name: "Gaming",
      icon: Gamepad2,
      count: 178,
      description: "Consoles, accessories, and peripherals",
      featured: true,
      rating: 4.9,
      priceRange: [19, 699],
      brands: ["Microsoft", "Sony", "Nintendo", "Razer"],
      features: ["Free Shipping", "Fast Delivery", "New Arrivals", "Best Sellers"]
    },
    {
      id: "monitors",
      name: "Monitors",
      icon: Monitor,
      count: 67,
      description: "4K, gaming, and professional displays",
      featured: false,
      rating: 4.5,
      priceRange: [149, 2499],
      brands: ["Dell", "ASUS", "LG", "Samsung"],
      features: ["Free Shipping", "In Stock"]
    },
    {
      id: "cameras",
      name: "Cameras",
      icon: Camera,
      count: 43,
      description: "DSLR, mirrorless, and action cameras",
      featured: false,
      rating: 4.4,
      priceRange: [299, 4999],
      brands: ["Canon", "Nikon", "Sony", "Fujifilm"],
      features: ["Free Shipping", "In Stock", "On Sale"]
    },
    {
      id: "tablets",
      name: "Tablets",
      icon: Tablet,
      count: 52,
      description: "iPads, Android, and 2-in-1 devices",
      featured: false,
      rating: 4.6,
      priceRange: [129, 1899],
      brands: ["Apple", "Samsung", "Microsoft", "Amazon"],
      features: ["Free Shipping", "Best Sellers", "In Stock"]
    },
    {
      id: "wearables",
      name: "Wearables",
      icon: Watch,
      count: 38,
      description: "Smartwatches and fitness trackers",
      featured: false,
      rating: 4.3,
      priceRange: [49, 799],
      brands: ["Apple", "Samsung", "Garmin", "Fitbit"],
      features: ["Free Shipping", "New Arrivals", "In Stock"]
    }
  ];

  const brands = [
    "Apple", "Samsung", "Dell", "HP", "Lenovo", "ASUS", "Sony", "Microsoft", "Google", "OnePlus", 
    "Canon", "Nikon", "Fujifilm", "LG", "Razer", "Nintendo", "Sennheiser", "Garmin", "Fitbit", "Amazon"
  ];

  const features = [
    "Free Shipping", "Fast Delivery", "In Stock", "On Sale", "New Arrivals", "Best Sellers"
  ];

  // Filter and sort categories
  const filteredAndSortedCategories = useMemo(() => {
    let filtered = categories.filter(category => {
      // Search filter
      const matchesSearch = !searchQuery || 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Price range filter
      const matchesPrice = category.priceRange[0] <= priceRange[1] && category.priceRange[1] >= priceRange[0];

      // Brand filter
      const matchesBrand = selectedBrands.length === 0 || 
        selectedBrands.some(brand => category.brands.includes(brand));

      // Feature filter
      const matchesFeatures = selectedFeatures.length === 0 || 
        selectedFeatures.some(feature => category.features.includes(feature));

      return matchesSearch && matchesPrice && matchesBrand && matchesFeatures;
    });

    // Sort categories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "count":
          return b.count - a.count;
        case "popular":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [categories, searchQuery, priceRange, selectedBrands, selectedFeatures, sortBy]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, feature]);
    } else {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 5000]);
    setSelectedBrands([]);
    setSelectedFeatures([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartState.itemCount} onCategorySelect={() => {}} />
      
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
                    <Input 
                      placeholder="Search categories..." 
                      className="pl-10" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
                        <Checkbox 
                          id={brand} 
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                        />
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
                        <Checkbox 
                          id={feature} 
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                        />
                        <label htmlFor={feature} className="text-sm cursor-pointer">
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={clearAllFilters}>
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
                  Showing {filteredAndSortedCategories.length} of {categories.length} categories
                </span>
                {(searchQuery || selectedBrands.length > 0 || selectedFeatures.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000) && (
                  <Button variant="outline" size="sm" onClick={clearAllFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
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

            {/* All Categories */}
            <div>
              {filteredAndSortedCategories.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No categories found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <CategoryUpdater />
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