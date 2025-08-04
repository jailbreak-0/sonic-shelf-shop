import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Menu, Laptop, Smartphone, Headphones, Gamepad2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface HeaderProps {
  cartCount: number;
  onCategorySelect: (category: string) => void;
}

export function Header({ cartCount, onCategorySelect }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Laptops", icon: Laptop },
    { name: "Smartphones", icon: Smartphone },
    { name: "Audio", icon: Headphones },
    { name: "Gaming", icon: Gamepad2 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="/">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-tech-gradient bg-clip-text text-transparent">
              ComputeX
            </h1>
            </a>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex py-4 space-x-8">
          <Link hrefLang="en" to="/categories">
            <Button 
              variant="ghost" 
              onClick={() => onCategorySelect("all")}
              className="font-medium"
            >
              All Products
            </Button>
          </Link>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.name}
                variant="ghost"
                onClick={() => onCategorySelect(category.name)}
                className="flex items-center space-x-2 font-medium"
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
          
          {/* Mobile Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm">
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => onCategorySelect("all")}>
                All Products
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.name}
                  onClick={() => onCategorySelect(category.name)}
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}