import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Laptop, 
  Smartphone, 
  Headphones, 
  Gamepad2, 
  Monitor, 
  Camera, 
  Tablet, 
  Watch,
  Cpu,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function CategoryUpdater() {
  const mainCategories = [
    {
      id: "laptops",
      name: "Laptops",
      icon: Laptop,
      count: 156,
      description: "Gaming, business, and ultrabooks",
      featured: true,
    },
    {
      id: "smartphones", 
      name: "Smartphones",
      icon: Smartphone,
      count: 89,
      description: "Latest flagship and budget phones",
      featured: true,
    },
    {
      id: "audio",
      name: "Audio & Headphones", 
      icon: Headphones,
      count: 234,
      description: "Headphones, speakers, and earbuds",
      featured: true,
    },
    {
      id: "gaming",
      name: "Gaming",
      icon: Gamepad2,
      count: 178,
      description: "Consoles, accessories, and peripherals", 
      featured: true,
    },
    {
      id: "monitors",
      name: "Monitors",
      icon: Monitor,
      count: 67,
      description: "4K, gaming, and professional displays",
      featured: false,
    },
    {
      id: "cameras",
      name: "Cameras", 
      icon: Camera,
      count: 43,
      description: "DSLR, mirrorless, and action cameras",
      featured: false,
    },
    {
      id: "tablets",
      name: "Tablets",
      icon: Tablet, 
      count: 52,
      description: "iPads, Android, and 2-in-1 devices",
      featured: false,
    },
    {
      id: "wearables",
      name: "Wearables",
      icon: Watch,
      count: 38, 
      description: "Smartwatches and fitness trackers",
      featured: false,
    },
    {
      id: "pc-components",
      name: "Computer Components",
      icon: Cpu,
      count: 245,
      description: "Build your own PC with individual components",
      featured: true,
      subcategories: [
        { id: "cpu", name: "Processors", icon: Cpu, count: 28 },
        { id: "gpu", name: "Graphics Cards", icon: Monitor, count: 35 },
        { id: "motherboard", name: "Motherboards", icon: CircuitBoard, count: 42 },
        { id: "ram", name: "Memory", icon: MemoryStick, count: 38 },
        { id: "storage", name: "Storage", icon: HardDrive, count: 45 },
        { id: "psu", name: "Power Supplies", icon: Zap, count: 32 },
        { id: "case", name: "Cases", icon: Box, count: 25 },
        { id: "cooling", name: "Cooling", icon: Fan, count: 20 },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Featured Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCategories.filter(cat => cat.featured).map((category) => {
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
                    <Badge>Featured</Badge>
                  </div>
                  {category.id === 'pc-components' ? (
                    <Link to="/pc-builder">
                      <Button className="w-full">Build PC</Button>
                    </Link>
                  ) : (
                    <Button className="w-full">View Products</Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* PC Components Subcategories */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Computer Components</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mainCategories.find(c => c.id === 'pc-components')?.subcategories?.map((subcat) => {
            const IconComponent = subcat.icon;
            return (
              <Card key={subcat.id} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-4 text-center">
                  <IconComponent className="h-6 w-6 text-primary mx-auto mb-2" />
                  <h4 className="font-medium text-sm">{subcat.name}</h4>
                  <p className="text-xs text-muted-foreground">{subcat.count} items</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-4">
          <Link to="/enhanced-categories">
            <Button variant="outline">View All Components</Button>
          </Link>
        </div>
      </div>

      {/* All Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-6">All Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-xs text-muted-foreground">{category.count} products</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Browse
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}