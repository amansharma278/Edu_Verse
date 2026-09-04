import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Textarea } from "../../components/ui/textarea";
import { Checkbox } from "../../components/ui/checkbox";
import { ChevronLeft, Play, CheckCircle, MessageSquare, FileText } from "lucide-react";

const curriculum = [
  {
    title: "Getting Started",
    lessons: [
      { id: "1", title: "Welcome to the Course", duration: "5:30", completed: true },
      { id: "2", title: "Course Overview", duration: "8:15", completed: true },
      { id: "3", title: "Setting Up Your Environment", duration: "12:45", completed: false },
      { id: "4", title: "Your First Project", duration: "15:20", completed: false },
    ],
  },
  {
    title: "Core Concepts",
    lessons: [
      { id: "5", title: "Understanding the Fundamentals", duration: "18:30", completed: false },
      { id: "6", title: "Advanced Techniques", duration: "22:15", completed: false },
      { id: "7", title: "Best Practices", duration: "16:45", completed: false },
    ],
  },
];

export function CourseLearning() {
  const [currentLesson, setCurrentLesson] = useState("1");

  return (
    <div className="min-h-screen bg-background -m-6 p-0">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/student/my-courses">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-semibold">Complete Web Development Bootcamp 2026</h1>
              <p className="text-sm text-muted-foreground">Lesson 2 of 342</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-48">
              <Progress value={45} />
              <p className="text-xs text-muted-foreground mt-1">45% Complete</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] h-[calc(100vh-80px)]">
        {/* Video Player & Tabs */}
        <div className="flex flex-col">
          {/* Video Player */}
          <div className="aspect-video bg-black flex items-center justify-center">
            <Button size="lg" className="rounded-full h-20 w-20 bg-white hover:bg-white/90">
              <Play className="h-8 w-8 text-[#4F46E5]" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex-1 overflow-y-auto p-6">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Course Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In this lesson, you'll learn the fundamentals of web development. We'll cover HTML structure, CSS styling, and JavaScript basics. By the end of this lesson, you'll be able to create a simple webpage from scratch.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What you'll learn</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <span>HTML document structure and semantic elements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <span>CSS styling and layout techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <span>JavaScript basics and DOM manipulation</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4">My Notes</h2>
                  <Textarea
                    placeholder="Write your notes here..."
                    className="min-h-[200px]"
                  />
                  <Button className="mt-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]">
                    Save Notes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="discussion" className="mt-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Discussion</h2>
                  <Card className="p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1">John Doe</p>
                        <p className="text-sm text-muted-foreground">
                          Great lesson! The explanation of CSS Grid was very clear.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                      </div>
                    </div>
                  </Card>
                  <div>
                    <Textarea placeholder="Ask a question or share your thoughts..." />
                    <Button className="mt-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]">
                      Post Comment
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Curriculum Sidebar */}
        <div className="border-l bg-card overflow-y-auto">
          <div className="p-6">
            <h2 className="font-semibold mb-4">Course Content</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {curriculum.map((section, sectionIndex) => (
                <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <span className="font-semibold">{section.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1">
                      {section.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLesson(lesson.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                            currentLesson === lesson.id
                              ? "bg-gradient-to-r from-[#4F46E5]/10 to-[#7C3AED]/10 text-[#4F46E5]"
                              : "hover:bg-muted"
                          }`}
                        >
                          <Checkbox checked={lesson.completed} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                          </div>
                          <Play className="h-4 w-4 flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
