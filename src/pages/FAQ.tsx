import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Truck, CreditCard, RefreshCw, Shield, HelpCircle, MessageCircle, Mail, Phone, Clock, Users, Award, Zap } from "lucide-react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // All FAQ data
  const faqData = [
    {
      category: "general",
      title: "General Questions",
      description: "Common questions about ComputeX",
      questions: [
        {
          id: "general-1",
          question: "What is ComputeX?",
          answer: "ComputeX is a premier online retailer specializing in cutting-edge technology products including laptops, smartphones, audio equipment, and gaming gear. We offer high-quality products from trusted brands at competitive prices."
        },
        {
          id: "general-2", 
          question: "Do you ship internationally?",
          answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. You can check shipping options and costs during checkout."
        },
        {
          id: "general-3",
          question: "Are your products authentic?",
          answer: "Absolutely. All products sold on ComputeX are 100% authentic and sourced directly from authorized distributors and manufacturers. We guarantee the authenticity of every item."
        },
        {
          id: "general-4",
          question: "Do you offer price matching?",
          answer: "Yes, we offer price matching on identical products from authorized retailers. Contact our customer service team with proof of the lower price, and we'll match it."
        },
        {
          id: "general-5",
          question: "How can I contact customer support?",
          answer: "You can reach our customer support team via live chat, email (support@computex.com), or phone at 1-800-COMPUTEX. We're available 24/7 to assist you."
        }
      ]
    },
    {
      category: "orders",
      title: "Orders & Payment",
      description: "Questions about placing orders and payment methods",
      questions: [
        {
          id: "order-1",
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely using industry-standard encryption."
        },
        {
          id: "order-2",
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placing it, provided it hasn't been processed for shipping. Contact our customer service team immediately if you need to make changes."
        },
        {
          id: "order-3",
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can track your package using this number on our website or the carrier's website. You'll also receive SMS updates on delivery status."
        },
        {
          id: "order-4",
          question: "Do you offer financing options?",
          answer: "Yes, we partner with several financing companies to offer flexible payment plans. Options include 0% APR for qualified customers and extended payment terms up to 24 months."
        },
        {
          id: "order-5",
          question: "Can I place an order over the phone?",
          answer: "Absolutely! Our sales team is available to take orders over the phone at 1-800-COMPUTEX. Phone orders receive the same pricing and promotions as online orders."
        }
      ]
    },
    {
      category: "shipping",
      title: "Shipping & Delivery", 
      description: "Information about shipping options and delivery",
      questions: [
        {
          id: "ship-1",
          question: "How long does shipping take?",
          answer: "Domestic shipping typically takes 2-5 business days for standard delivery and 1-2 business days for express delivery. International shipping varies by destination but generally takes 5-15 business days."
        },
        {
          id: "ship-2",
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free standard shipping on orders over $50 within the continental US. Express shipping and international orders may have additional charges."
        },
        {
          id: "ship-3",
          question: "What if my package is damaged or lost?",
          answer: "All shipments are fully insured. If your package arrives damaged or is lost in transit, contact us immediately. We'll work with the carrier to resolve the issue and ensure you receive a replacement at no additional cost."
        },
        {
          id: "ship-4",
          question: "Do you offer same-day delivery?",
          answer: "Same-day delivery is available in select metropolitan areas for orders placed before 2 PM. Check availability and additional fees during checkout."
        },
        {
          id: "ship-5",
          question: "Can I schedule a delivery time?",
          answer: "Yes, for an additional fee, you can schedule delivery for specific time windows. This service is available in most areas and must be selected during checkout."
        }
      ]
    },
    {
      category: "returns",
      title: "Returns & Warranty",
      description: "Information about returns, exchanges, and warranties", 
      questions: [
        {
          id: "return-1",
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Products must be in original condition with all accessories and packaging. Custom or personalized items may not be returnable. Return shipping is free for defective items."
        },
        {
          id: "return-2", 
          question: "How do I start a return?",
          answer: "To start a return, log into your account and navigate to your order history. Select the item you wish to return and follow the prompts. You'll receive a prepaid return label and instructions via email."
        },
        {
          id: "return-3",
          question: "What warranty coverage do you provide?",
          answer: "All products come with manufacturer warranties. Additionally, we offer extended warranty options for most electronics. Warranty terms vary by product and manufacturer. Check individual product pages for specific warranty information."
        },
        {
          id: "return-4",
          question: "Can I exchange an item?",
          answer: "Yes, exchanges are available for items of equal or lesser value within 30 days. Size and color exchanges are free, while product upgrades may require additional payment."
        },
        {
          id: "return-5",
          question: "How long do refunds take?",
          answer: "Refunds are processed within 3-5 business days after we receive your returned item. Credit card refunds may take an additional 1-2 billing cycles to appear on your statement."
        }
      ]
    },
    {
      category: "technical",
      title: "Technical Support",
      description: "Help with product setup and troubleshooting",
      questions: [
        {
          id: "tech-1",
          question: "Do you provide technical support?",
          answer: "Yes, our technical support team can help with product setup, basic troubleshooting, and compatibility questions. For advanced technical issues, we'll connect you directly with the manufacturer's support team."
        },
        {
          id: "tech-2",
          question: "Can you help me choose the right product?",
          answer: "Absolutely! Our product specialists can help you find the perfect device based on your needs, budget, and preferences. Contact us via chat, phone, or email for personalized recommendations."
        },
        {
          id: "tech-3",
          question: "Do you offer installation services?",
          answer: "We partner with certified technicians in major metropolitan areas to offer installation and setup services for complex products. Contact us to check availability in your area and pricing."
        },
        {
          id: "tech-4",
          question: "What if I need help after purchase?",
          answer: "Our support doesn't end at purchase. We provide ongoing technical assistance, including product tutorials, troubleshooting guides, and direct support for any issues you encounter."
        },
        {
          id: "tech-5",
          question: "Do you offer training on new products?",
          answer: "Yes, we offer free online training sessions and tutorials for many products. We also have detailed setup guides and video tutorials available on our website."
        }
      ]
    },
    {
      category: "account",
      title: "Account & Privacy",
      description: "Questions about your account and data privacy",
      questions: [
        {
          id: "account-1",
          question: "How do I create an account?",
          answer: "Creating an account is easy! Click 'Sign Up' in the top right corner, provide your email and create a password. You can also sign up during checkout for faster future purchases."
        },
        {
          id: "account-2",
          question: "Is my personal information secure?",
          answer: "Yes, we use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties without your consent."
        },
        {
          id: "account-3",
          question: "Can I update my account information?",
          answer: "Yes, you can update your account information, shipping addresses, and payment methods anytime by logging into your account and visiting the 'Account Settings' page."
        },
        {
          id: "account-4",
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page and enter your email address. We'll send you a secure link to reset your password within minutes."
        },
        {
          id: "account-5",
          question: "Can I delete my account?",
          answer: "Yes, you can request account deletion by contacting customer support. We'll permanently remove your personal information while keeping order history for legal and accounting purposes."
        }
      ]
    }
  ];

  // Filter questions based on search query and selected category
  const filteredFAQData = faqData.map(section => ({
    ...section,
    questions: section.questions.filter(q => {
      const matchesSearch = !searchQuery || 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || section.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
  })).filter(section => section.questions.length > 0);

  const categories = [
    { id: "orders", name: "Orders", icon: ShoppingCart },
    { id: "shipping", name: "Shipping", icon: Truck },
    { id: "returns", name: "Returns", icon: RefreshCw },
    { id: "technical", name: "Support", icon: HelpCircle },
    { id: "account", name: "Account", icon: Users },
    { id: "general", name: "General", icon: MessageCircle }
  ];

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {searchQuery && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Showing results for "{searchQuery}"
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => setSearchQuery("")}
                  className="ml-2 p-0 h-auto"
                >
                  Clear search
                </Button>
              </p>
            </div>
          )}
        </div>

        {/* Quick Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            return (
              <Card 
                key={category.id}
                className={`text-center cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground shadow-lg transform scale-105' 
                    : 'hover:bg-accent hover:shadow-md'
                }`}
                onClick={() => setSelectedCategory(isSelected ? null : category.id)}
              >
                <CardContent className="p-4">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${isSelected ? 'text-primary-foreground' : 'text-primary'}`} />
                  <p className="text-sm font-medium">{category.name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Category Filter Info */}
        {selectedCategory && (
          <div className="mb-8 text-center">
            <Badge variant="secondary" className="mb-2">
              Filtered by: {categories.find(c => c.id === selectedCategory)?.name}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedCategory(null)}
              className="ml-2"
            >
              Show All Categories
            </Button>
          </div>
        )}

        {/* FAQ Sections */}
        {filteredFAQData.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No FAQs found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? `No results found for "${searchQuery}"` : "No FAQs match your current filters"}
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFAQData.map((section) => (
              <Card key={section.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.title}
                    <Badge variant="secondary">{section.questions.length}</Badge>
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Additional Help Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Phone className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Phone Support</CardTitle>
              <CardDescription>Speak with our experts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Call us at 1-800-COMPUTEX for immediate assistance
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MessageCircle className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Live Chat</CardTitle>
              <CardDescription>Get instant help</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with our support team for quick answers
              </p>
              <Button size="sm" className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Mail className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Email Support</CardTitle>
              <CardDescription>Detailed assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Send us an email at support@computex.com
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>24h response</span>
              </div>
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