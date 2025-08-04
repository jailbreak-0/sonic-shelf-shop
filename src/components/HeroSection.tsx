import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Latest Tech,{" "}
                <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
                  Unbeatable Prices
                </span>
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-lg">
                Discover cutting-edge technology from the world's leading brands. 
                From powerful laptops to innovative smartphones.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" className="group">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                View Deals
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3 text-primary-foreground/90">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Fast Delivery</p>
                  <p className="text-sm opacity-75">Same day in most areas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-primary-foreground/90">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">2-Year Warranty</p>
                  <p className="text-sm opacity-75">On all products</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-primary-foreground/90">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm opacity-75">Orders over $99</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <img
                src={heroBanner}
                alt="Latest Tech Products"
                className="w-full h-auto rounded-xl shadow-xl"
              />
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold animate-bounce-subtle">
                New Arrivals!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}