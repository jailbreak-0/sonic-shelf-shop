import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  MapPin, 
  Truck, 
  Wrench, 
  Clock, 
  CheckCircle, 
  Calculator,
  Package
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BuildComponent {
  category: string;
  component: any;
}

interface BuildRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: BuildComponent[];
  totalPrice: number;
}

export const BuildRequestModal = ({ isOpen, onClose, components, totalPrice }: BuildRequestModalProps) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    specialInstructions: ''
  });

  // Service charges - these would be configurable from admin
  const SERVICE_CHARGES = {
    shipping: 29.99,
    technician: 149.99,
    warranty: 49.99
  };

  const serviceTotal = Object.values(SERVICE_CHARGES).reduce((sum, charge) => sum + charge, 0);
  const grandTotal = totalPrice + serviceTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would submit the build request to your backend
    console.log('Build Request:', {
      components,
      customerInfo,
      pricing: {
        componentsTotal: totalPrice,
        serviceCharges: SERVICE_CHARGES,
        grandTotal
      }
    });

    toast({
      title: "Build Request Submitted!",
      description: "We'll contact you within 24 hours to confirm your order.",
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            PC Build Request
          </DialogTitle>
          <DialogDescription>
            Review your build and provide delivery details for professional assembly
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Build Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Build Summary</h3>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Selected Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {components.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.category}</p>
                      <p className="text-sm text-muted-foreground">{item.component.name}</p>
                      <Badge variant="outline" className="text-xs">{item.component.brand}</Badge>
                    </div>
                    <p className="font-semibold">${item.component.price}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between items-center font-semibold">
                  <span>Components Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Service Charges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Service Charges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Shipping & Handling</span>
                  </div>
                  <span>${SERVICE_CHARGES.shipping}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary" />
                    <span>Professional Assembly</span>
                  </div>
                  <span>${SERVICE_CHARGES.technician}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Extended Warranty</span>
                  </div>
                  <span>${SERVICE_CHARGES.warranty}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Grand Total</span>
                  <span className="text-primary">${grandTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Service Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Service Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Component Sourcing</span>
                  <span>2-3 business days</span>
                </div>
                <div className="flex justify-between">
                  <span>Professional Assembly</span>
                  <span>1-2 business days</span>
                </div>
                <div className="flex justify-between">
                  <span>Testing & Quality Check</span>
                  <span>1 business day</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Delivery Time</span>
                  <span>4-6 business days</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Delivery Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={customerInfo.zipCode}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions</Label>
                <Textarea
                  id="instructions"
                  value={customerInfo.specialInstructions}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, specialInstructions: e.target.value }))}
                  placeholder="Any special requirements, preferred delivery time, etc."
                  rows={3}
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Delivery & Assembly Service</p>
                    <p className="text-muted-foreground">
                      Our certified technicians will deliver your PC, perform professional assembly, 
                      install your operating system, and ensure everything is working perfectly.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} className="bg-primary">
            Submit Build Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};