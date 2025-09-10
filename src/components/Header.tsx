import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchWithSuggestions } from "@/components/SearchWithSuggestions";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingCart, User, Menu, Laptop, Smartphone, Headphones, Gamepad2, Bell, Sun, Moon, HelpCircle, LogOut } from "lucide-react";
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
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Here you could implement search functionality
  };

  const handleProductSelect = (productId: string) => {
    console.log("Selected product:", productId);
    // Here you could navigate to the product page
  };

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
            <SearchWithSuggestions
              placeholder="Search for products..."
              onSearch={handleSearch}
              onProductSelect={handleProductSelect}
              className="w-full"
            />
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive">
                3
              </Badge>
            </Button>

            {/* Theme Toggle */}
            {mounted && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            {/* Help Center */}
            <Link to="/support">
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </Link>

            {/* User Profile/Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <CartDrawer>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </CartDrawer>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex py-4 space-x-8">
          <Link to="/categories">
            <Button variant="ghost" className="font-medium">
              All Products
            </Button>
          </Link>
          <Link to="/pc-builder">
            <Button variant="ghost" className="font-medium">
              PC Builder
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" className="font-medium">
              About
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost" className="font-medium">
              Contact
            </Button>
          </Link>
          {user && (
            <Link to="/admin">
              <Button variant="ghost" className="font-medium">
                {user && (user as any).role === 'admin' ? 'Admin Panel' : 'My Account'}
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <SearchWithSuggestions
            placeholder="Search products..."
            onSearch={handleSearch}
            onProductSelect={handleProductSelect}
            className="w-full"
          />
        </div>
      </div>
    </header>
  );
}