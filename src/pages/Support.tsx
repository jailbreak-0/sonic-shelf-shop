import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Video, 
  Download, 
  Settings, 
  Shield, 
  Truck,
  CreditCard,
  RefreshCw,
  Users,
  Clock
} from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} onCategorySelect={() => {}} />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Support Center</Badge>
          <h1 className="text-4xl font-bold mb-6">How can we help you?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get instant help with our comprehensive support resources, or connect with our expert team.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for help topics, products, or issues..." 
              className="pl-12 h-12 text-lg"
            />
            <Button className="absolute right-2 top-2 h-8">Search</Button>
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Live Chat */}
          {/* <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Get instant help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Available 24/7</p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card> */}

          {/* Phone Support */}
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Phone Support</CardTitle>
              <CardDescription>Speak directly with our experts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">+233 (555) 123-4567</p>
              <Button variant="outline" className="w-full">Call Now</Button>
            </CardContent>
          </Card>

          {/* Email Support */}
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>Send us a detailed message</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Response in 24hrs</p>
              <Button variant="outline" className="w-full">Send Email</Button>
            </CardContent>
          </Card>
        </div>

        {/* Support Categories */}
        <Tabs defaultValue="popular" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Truck className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Track Your Order</CardTitle>
                  <CardDescription>Find real-time updates on your shipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Input placeholder="Enter tracking number" />
                    <Button className="w-full">Track Package</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <RefreshCw className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Returns & Exchanges</CardTitle>
                  <CardDescription>Start a return or exchange process</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Start Return</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Warranty Claims</CardTitle>
                  <CardDescription>Submit a warranty claim for your product</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">File Claim</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CreditCard className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Payment Issues</CardTitle>
                  <CardDescription>Get help with billing and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Get Help</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Download className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Downloads</CardTitle>
                  <CardDescription>Drivers, manuals, and software</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Browse Downloads</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Video className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Video Tutorials</CardTitle>
                  <CardDescription>Step-by-step setup guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Watch Videos</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                  <CardDescription>Manage your ComputeX account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Update Profile
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Keep your account safe and secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Security Features</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Two-factor authentication</li>
                      <li>• Login alerts and monitoring</li>
                      <li>• Secure payment processing</li>
                      <li>• Privacy protection</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                  <CardDescription>Check the status of your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Orders</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Delivery options and tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Shipping Guide</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Modifications</CardTitle>
                  <CardDescription>Change or cancel your order</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Modify Order</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Support</CardTitle>
                  <CardDescription>Get help with your TechShop products</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Popular Resources</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        User Manuals
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Driver Downloads
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Video className="h-4 w-4 mr-2" />
                        Setup Videos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Troubleshooting</CardTitle>
                  <CardDescription>Common issues and solutions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Quick Fixes</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Device won't turn on</li>
                      <li>• Connection problems</li>
                      <li>• Software installation</li>
                      <li>• Performance issues</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Support Status */}
        <div className="mt-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                Support Status: All Systems Operational
              </CardTitle>
              <CardDescription>
                Our support team is ready to help you. Average response time: 5 minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-500">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">&lt; 5min</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-500">24/7</div>
                  <div className="text-sm text-muted-foreground">Availability</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;