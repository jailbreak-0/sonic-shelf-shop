import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Zap, Monitor, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const PCBuilderCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container mx-auto px-4">
        <Card className="relative overflow-hidden border-none shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
          <CardContent className="relative z-10 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="h-8 w-8" />
                  <span className="text-lg font-semibold">PC Builder</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Build Your Dream PC
                </h2>
                <p className="text-white/90 text-lg mb-6">
                  Use our advanced PC builder to create the perfect setup. Check compatibility, 
                  compare prices from top retailers, and get professional assembly service.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    <span>Compatibility Check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    <span>Price Comparison</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    <span>Professional Assembly</span>
                  </div>
                </div>
                <Link to="/pc-builder">
                  <Button size="lg" variant="secondary" className="group">
                    Start Building
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center text-white">
                    <Cpu className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm font-medium">Intel & AMD CPUs</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center text-white">
                    <Monitor className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm font-medium">Latest GPUs</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center text-white">
                    <Zap className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm font-medium">Power Supplies</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center text-white">
                    <Cpu className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm font-medium">All Components</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};