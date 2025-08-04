import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-tech-gradient bg-clip-text text-transparent">
              TechHub
            </h3>
            <p className="text-muted-foreground">
              Your trusted partner for the latest technology. Quality products, competitive prices, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {["About Us", "Contact", "FAQ", "Support", "Returns", "Warranty"].map((link) => (
                <div key={link}>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    {link}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <div className="space-y-2">
              {["Laptops", "Smartphones", "Gaming", "Audio", "Accessories", "Components"].map((category) => (
                <div key={category}>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    {category}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-muted-foreground">
              Subscribe to get special offers and latest tech news.
            </p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" />
              <Button variant="default" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Call Us</p>
              <p className="text-muted-foreground">1-800-TECH-HUB</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Email Us</p>
              <p className="text-muted-foreground">support@techhub.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Visit Us</p>
              <p className="text-muted-foreground">123 Tech Street, Silicon Valley</p>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground">
            © 2024 TechHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Button>
            <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
              Terms of Service
            </Button>
            <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}