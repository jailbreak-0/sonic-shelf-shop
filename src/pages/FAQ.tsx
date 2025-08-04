import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Truck, CreditCard, RefreshCw, Shield } from "lucide-react";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} onCategorySelect={() => {}} />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">FAQ</Badge>
          <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions about our products, shipping, returns, and more.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search FAQs..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <Card className="text-center cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Orders</p>
            </CardContent>
          </Card>
          
          <Card className="text-center cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Shipping</p>
            </CardContent>
          </Card>
          
          <Card className="text-center cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Payment</p>
            </CardContent>
          </Card>
          
          <Card className="text-center cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <RefreshCw className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Returns</p>
            </CardContent>
          </Card>
          
          <Card className="text-center cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Warranty</p>
            </CardContent>
          </Card>
          
          <Card className="text-center cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <Search className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Support</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {/* General */}
          <Card>
            <CardHeader>
              <CardTitle>General Questions</CardTitle>
              <CardDescription>Common questions about TechShop</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is TechShop?</AccordionTrigger>
                  <AccordionContent>
                    TechShop is a premier online retailer specializing in cutting-edge technology products including laptops, smartphones, audio equipment, and gaming gear. We offer high-quality products from trusted brands at competitive prices.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. You can check shipping options and costs during checkout.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Are your products authentic?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. All products sold on TechShop are 100% authentic and sourced directly from authorized distributors and manufacturers. We guarantee the authenticity of every item.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Orders & Payment */}
          <Card>
            <CardHeader>
              <CardTitle>Orders & Payment</CardTitle>
              <CardDescription>Questions about placing orders and payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="order-1">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely using industry-standard encryption.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="order-2">
                  <AccordionTrigger>Can I modify or cancel my order?</AccordionTrigger>
                  <AccordionContent>
                    You can modify or cancel your order within 1 hour of placing it, provided it hasn't been processed for shipping. Contact our customer service team immediately if you need to make changes.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="order-3">
                  <AccordionTrigger>How can I track my order?</AccordionTrigger>
                  <AccordionContent>
                    Once your order ships, you'll receive a tracking number via email. You can track your package using this number on our website or the carrier's website. You'll also receive SMS updates on delivery status.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Delivery</CardTitle>
              <CardDescription>Information about shipping options and delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ship-1">
                  <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                  <AccordionContent>
                    Domestic shipping typically takes 2-5 business days for standard delivery and 1-2 business days for express delivery. International shipping varies by destination but generally takes 5-15 business days.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="ship-2">
                  <AccordionTrigger>Do you offer free shipping?</AccordionTrigger>
                  <AccordionContent>
                    Yes! We offer free standard shipping on orders over $50 within the continental US. Express shipping and international orders may have additional charges.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="ship-3">
                  <AccordionTrigger>What if my package is damaged or lost?</AccordionTrigger>
                  <AccordionContent>
                    All shipments are fully insured. If your package arrives damaged or is lost in transit, contact us immediately. We'll work with the carrier to resolve the issue and ensure you receive a replacement at no additional cost.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Returns & Warranty */}
          <Card>
            <CardHeader>
              <CardTitle>Returns & Warranty</CardTitle>
              <CardDescription>Information about returns, exchanges, and warranties</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="return-1">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 30-day return policy for most items. Products must be in original condition with all accessories and packaging. Custom or personalized items may not be returnable. Return shipping is free for defective items.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="return-2">
                  <AccordionTrigger>How do I start a return?</AccordionTrigger>
                  <AccordionContent>
                    To start a return, log into your account and navigate to your order history. Select the item you wish to return and follow the prompts. You'll receive a prepaid return label and instructions via email.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="return-3">
                  <AccordionTrigger>What warranty coverage do you provide?</AccordionTrigger>
                  <AccordionContent>
                    All products come with manufacturer warranties. Additionally, we offer extended warranty options for most electronics. Warranty terms vary by product and manufacturer. Check individual product pages for specific warranty information.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Technical Support */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Support</CardTitle>
              <CardDescription>Help with product setup and troubleshooting</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tech-1">
                  <AccordionTrigger>Do you provide technical support?</AccordionTrigger>
                  <AccordionContent>
                    Yes, our technical support team can help with product setup, basic troubleshooting, and compatibility questions. For advanced technical issues, we'll connect you directly with the manufacturer's support team.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="tech-2">
                  <AccordionTrigger>Can you help me choose the right product?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely! Our product specialists can help you find the perfect device based on your needs, budget, and preferences. Contact us via chat, phone, or email for personalized recommendations.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="tech-3">
                  <AccordionTrigger>Do you offer installation services?</AccordionTrigger>
                  <AccordionContent>
                    We partner with certified technicians in major metropolitan areas to offer installation and setup services for complex products. Contact us to check availability in your area and pricing.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Still have questions?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Our customer service team is here to help.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
                  Contact Support
                </a>
                <a href="/support" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4">
                  Support Center
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;