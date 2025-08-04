import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Zap, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} onCategorySelect={() => {}} />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">About TechShop</Badge>
          <h1 className="text-4xl font-bold mb-6">Innovating Technology for Everyone</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Since 2020, we've been dedicated to bringing cutting-edge technology to consumers worldwide, 
            offering premium products at competitive prices with exceptional customer service.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Customer First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every decision we make puts our customers at the center, ensuring satisfaction and trust.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Quality Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We curate only the highest quality products from trusted brands and manufacturers.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Staying ahead of technology trends to bring you the latest innovations first.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Committed to excellence in every aspect, from product selection to customer service.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2020 by a team of technology enthusiasts, TechShop began as a vision to democratize 
              access to premium technology products. What started as a small online store has grown into a 
              trusted destination for millions of customers worldwide.
            </p>
            <p className="text-muted-foreground mb-4">
              Our journey has been driven by a simple belief: everyone deserves access to the best technology 
              without compromising on quality or breaking the bank. We've built lasting partnerships with 
              leading manufacturers and continue to expand our catalog with the latest innovations.
            </p>
            <p className="text-muted-foreground">
              Today, we're proud to serve customers in over 50 countries, maintaining our commitment to 
              exceptional service, competitive pricing, and product excellence.
            </p>
          </div>
          <div className="bg-muted rounded-lg p-8">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Countries Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Products Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Leadership Team</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our experienced leadership team combines decades of technology and retail expertise to guide 
            TechShop's mission of making premium technology accessible to everyone.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
                <CardTitle>Sarah Chen</CardTitle>
                <CardDescription>CEO & Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Former tech executive with 15+ years experience in consumer electronics and e-commerce.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
                <CardTitle>Marcus Rodriguez</CardTitle>
                <CardDescription>CTO</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Technology visionary specializing in scalable platforms and emerging tech trends.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
                <CardTitle>Emily Watson</CardTitle>
                <CardDescription>Head of Customer Experience</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Customer service expert dedicated to creating exceptional shopping experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;