import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import {
  Search,
  MessageCircle,
  BookOpen,
  Video,
  CreditCard,
  Shield,
  Users,
  Award,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

const faqs = {
  general: [
    {
      question: "How do I get started with eduVerse?",
      answer:
        "Getting started is easy! Simply sign up for a free account, browse our course catalog, and enroll in courses that interest you. You can start learning immediately after enrollment.",
    },
    {
      question: "What types of courses are available?",
      answer:
        "We offer courses across various categories including Development, Business, Design, Marketing, Data Science, Photography, and more. Courses range from beginner to advanced levels.",
    },
    {
      question: "Can I access courses on mobile devices?",
      answer:
        "Yes! eduVerse is fully responsive and works seamlessly on desktop, tablet, and mobile devices. You can learn anytime, anywhere.",
    },
    {
      question: "How do I track my learning progress?",
      answer:
        "Your dashboard displays your progress for each enrolled course, including completion percentage, time spent, and achievements earned.",
    },
  ],
  payment: [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods depending on your region.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with a course, you can request a full refund within 30 days of purchase.",
    },
    {
      question: "Do you offer discounts or promotions?",
      answer:
        "We regularly run promotions and offer seasonal discounts. Subscribe to our newsletter or check the homepage for current deals.",
    },
    {
      question: "Is there a subscription option?",
      answer:
        "Currently, we offer individual course purchases. We're working on introducing subscription plans that will give you access to multiple courses.",
    },
  ],
  courses: [
    {
      question: "How long do I have access to a course?",
      answer:
        "Once you purchase a course, you have lifetime access to all course materials, including future updates and new content added by the instructor.",
    },
    {
      question: "Do courses include certificates?",
      answer:
        "Yes! Upon completing a course, you'll receive a certificate of completion that you can share on LinkedIn or add to your resume.",
    },
    {
      question: "Can I download course videos?",
      answer:
        "Some courses offer downloadable resources and materials. Video downloading availability depends on the instructor's settings for each course.",
    },
    {
      question: "How do I communicate with instructors?",
      answer:
        "Each course has a Q&A section where you can ask questions and interact with the instructor and other students. Some instructors also offer direct messaging.",
    },
  ],
  technical: [
    {
      question: "What are the system requirements?",
      answer:
        "eduVerse works on any modern web browser (Chrome, Firefox, Safari, Edge). We recommend a stable internet connection for video streaming.",
    },
    {
      question: "I'm having trouble playing videos. What should I do?",
      answer:
        "Try clearing your browser cache, disabling ad blockers, or switching to a different browser. If issues persist, contact our support team.",
    },
    {
      question: "Can I change video quality?",
      answer:
        "Yes, our video player supports multiple quality options (480p, 720p, 1080p, auto). You can adjust this in the video player settings or your account preferences.",
    },
    {
      question: "Is there offline access?",
      answer:
        "We're currently developing an offline mode. For now, you need an internet connection to access course content.",
    },
  ],
};

const popularTopics = [
  { icon: BookOpen, title: "Getting Started", count: "12 articles" },
  { icon: Video, title: "Course Access", count: "8 articles" },
  { icon: CreditCard, title: "Payments & Billing", count: "10 articles" },
  { icon: Shield, title: "Account & Security", count: "6 articles" },
  { icon: Users, title: "For Instructors", count: "15 articles" },
  { icon: Award, title: "Certificates", count: "5 articles" },
];

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              How can we help you?
            </h1>
            <p className="text-lg text-white/90">
              Search our knowledge base or browse popular topics below
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base bg-white text-foreground"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Popular Topics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {popularTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <Card
                    key={topic.title}
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{topic.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {topic.count}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>

              {Object.entries(faqs).map(([category, questions]) => (
                <TabsContent key={category} value={category}>
                  <Card className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {questions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Contact Section */}
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
              <p className="text-muted-foreground">
                Our support team is here to assist you
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Chat with our support team
                </p>
                <Button className="w-full">Start Chat</Button>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-sm text-muted-foreground">
                  support@eduverse.com
                </p>
                <Button variant="outline" className="w-full">
                  Send Email
                </Button>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Phone Support</h3>
                <p className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </p>
                <Button variant="outline" className="w-full">
                  Call Us
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
