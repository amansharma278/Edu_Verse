import { useState } from "react";
import { Link } from "react-router";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Play,
  Star,
  Users,
  Clock,
  Globe,
  Award,
  Infinity,
  Smartphone,
  Download,
  Share2,
  Heart,
  ShoppingCart,
  Check,
  ChevronRight,
} from "lucide-react";

const curriculum = [
  {
    title: "Getting Started",
    lessons: 8,
    duration: "1h 20m",
    items: [
      { title: "Welcome to the Course", duration: "5:30", preview: true },
      { title: "Course Overview", duration: "8:15", preview: true },
      { title: "Setting Up Your Environment", duration: "12:45", preview: false },
      { title: "Your First Project", duration: "15:20", preview: false },
    ],
  },
  {
    title: "Core Concepts",
    lessons: 12,
    duration: "3h 45m",
    items: [
      { title: "Understanding the Fundamentals", duration: "18:30", preview: false },
      { title: "Advanced Techniques", duration: "22:15", preview: false },
      { title: "Best Practices", duration: "16:45", preview: false },
    ],
  },
  {
    title: "Practical Projects",
    lessons: 15,
    duration: "5h 30m",
    items: [
      { title: "Project 1: Building from Scratch", duration: "45:20", preview: false },
      { title: "Project 2: Real-World Application", duration: "52:15", preview: false },
    ],
  },
];

const reviews = [
  {
    name: "John Smith",
    rating: 5,
    date: "2 weeks ago",
    content:
      "This course exceeded my expectations! The instructor explains everything clearly and the projects are very practical. Highly recommended!",
  },
  {
    name: "Sarah Williams",
    rating: 5,
    date: "1 month ago",
    content:
      "Best course I've taken on this platform. The content is up-to-date and the instructor is very knowledgeable.",
  },
  {
    name: "Michael Brown",
    rating: 4,
    date: "2 months ago",
    content:
      "Great course overall. Would love to see more advanced topics covered in future updates.",
  },
];

export function CourseDetails() {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-[#f59e0b] text-white border-0">Bestseller</Badge>
                <Badge variant="secondary">Development</Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Complete Web Development Bootcamp 2026
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Master web development from scratch. Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and become a professional developer.
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-[#f59e0b] text-[#f59e0b]" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-white/70">(45,230 ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>234,567 students</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-white/90">
                <span>Created by Dr. Angela Yu</span>
                <span>•</span>
                <span>Last updated 2/2026</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>English</span>
                </div>
              </div>
            </div>

            {/* Sticky Card - Desktop Only */}
            <div className="hidden lg:block">
              <Card className="sticky top-24 border-0 shadow-xl">
                <div className="aspect-video relative rounded-t-lg overflow-hidden bg-black">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800"
                    alt="Course preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button size="lg" className="rounded-full h-16 w-16 bg-white hover:bg-white/90">
                      <Play className="h-6 w-6 text-[#4F46E5]" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold">$84.99</span>
                    <span className="text-lg text-muted-foreground line-through">
                      $129.99
                    </span>
                    <Badge className="bg-[#10b981] text-white border-0">35% off</Badge>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90" size="lg">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Buy Now
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground my-4">
                    30-Day Money-Back Guarantee
                  </p>

                  <div className="space-y-3 text-sm">
                    <h4 className="font-semibold">This course includes:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Play className="h-4 w-4 text-muted-foreground" />
                        <span>52.5 hours on-demand video</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span>Downloadable resources</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Infinity className="h-4 w-4 text-muted-foreground" />
                        <span>Full lifetime access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <span>Access on mobile and TV</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${
                          isWishlisted ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      Wishlist
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Pricing */}
      <div className="lg:hidden border-b bg-card sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">$84.99</span>
              <span className="text-sm text-muted-foreground line-through">$129.99</span>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="lg:max-w-[calc(100%-432px)]">
          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Build 16+ real-world projects from scratch",
                    "Master modern HTML5, CSS3, and JavaScript ES6+",
                    "Learn React, Node.js, Express, and MongoDB",
                    "Understand web development best practices",
                    "Deploy web applications to production",
                    "Work with APIs and databases",
                    "Build responsive and mobile-friendly websites",
                    "Get hired as a professional web developer",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                <div className="prose max-w-none text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    Welcome to the Complete Web Development Bootcamp! This comprehensive course will take you from a complete beginner to a professional web developer.
                  </p>
                  <p>
                    You'll learn everything you need to build modern, responsive websites and web applications. We'll start with the fundamentals of HTML, CSS, and JavaScript, then progress to advanced topics like React, Node.js, and database integration.
                  </p>
                  <p>
                    This course includes 16+ hands-on projects that you'll build from scratch, giving you real-world experience and a professional portfolio to show potential employers.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>No programming experience needed - I'll teach you everything you need to know</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>A computer with internet connection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Willingness to learn and practice</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="curriculum">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Course Content</h2>
                    <p className="text-muted-foreground mt-1">
                      35 sections • 342 lectures • 52h 30m total length
                    </p>
                  </div>
                  <Button variant="outline">Expand All</Button>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {curriculum.map((section, index) => (
                    <AccordionItem
                      key={index}
                      value={`section-${index}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between flex-1 mr-4">
                          <span className="font-semibold">{section.title}</span>
                          <span className="text-sm text-muted-foreground">
                            {section.lessons} lectures • {section.duration}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {section.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center justify-between py-2 hover:bg-muted/50 px-2 rounded"
                            >
                              <div className="flex items-center gap-3">
                                <Play className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{item.title}</span>
                                {item.preview && (
                                  <Badge variant="secondary" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {item.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="instructor">
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1631490238101-a1156ce9bb3d?w=200"
                    alt="Instructor"
                    className="h-32 w-32 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Dr. Angela Yu</h3>
                    <p className="text-muted-foreground mb-4">
                      Lead Instructor at the App Brewery
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                          <span className="font-semibold">4.8 Instructor Rating</span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">1.2M</span> Students
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">42</span> Courses
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">435K</span> Reviews
                      </div>
                    </div>
                  </div>
                </div>
                <div className="prose max-w-none text-muted-foreground">
                  <p>
                    I'm Angela, I'm a developer with a passion for teaching. I'm the lead instructor at the App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer.
                  </p>
                  <p>
                    I've been invited by companies such as Twitter, Facebook and Google to teach their employees. My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I've made hundred of websites, apps and games.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                  <div className="grid md:grid-cols-[200px_1fr] gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-6xl font-bold mb-2">4.8</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-[#f59e0b] text-[#f59e0b]"
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Course Rating
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-4">
                          <Progress value={rating === 5 ? 85 : rating === 4 ? 12 : 2} className="flex-1" />
                          <div className="flex items-center gap-1 w-24">
                            <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                            <span className="text-sm">{rating}</span>
                            <span className="text-sm text-muted-foreground ml-auto">
                              {rating === 5 ? "85%" : rating === 4 ? "12%" : "2%"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <Card key={index} className="p-6 border-0 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white font-semibold">
                          {review.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.name}</h4>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]"
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.content}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
