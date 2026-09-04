import { Link } from "react-router";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { CourseCard } from "../components/course-card";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Play,
  Users,
  BookOpen,
  Award,
  Star,
  Clock,
  Shield,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Quote,
} from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { value: "10M+", label: "Active Students" },
  { value: "50K+", label: "Expert Instructors" },
  { value: "100K+", label: "Online Courses" },
  { value: "190+", label: "Countries" },
];

const featuredCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2026",
    instructor: "Dr. Angela Yu",
    price: 84.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 45230,
    students: 234567,
    duration: "52h 30m",
    lessons: 342,
    thumbnail: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800",
    category: "Development",
    bestseller: true,
  },
  {
    id: "2",
    title: "Advanced Data Science & Machine Learning",
    instructor: "Jose Portilla",
    price: 94.99,
    originalPrice: 149.99,
    rating: 4.9,
    reviewCount: 32145,
    students: 187654,
    duration: "65h 15m",
    lessons: 428,
    thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=800",
    category: "Data Science",
    bestseller: true,
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass 2026",
    instructor: "Daniel Walter Scott",
    price: 79.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviewCount: 28543,
    students: 156234,
    duration: "45h 20m",
    lessons: 298,
    thumbnail: "https://images.unsplash.com/photo-1510832758362-af875829efcf?w=800",
    category: "Design",
  },
  {
    id: "4",
    title: "Digital Marketing Complete Course",
    instructor: "Phil Ebiner",
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 19876,
    students: 98765,
    duration: "38h 45m",
    lessons: 256,
    thumbnail: "https://images.unsplash.com/photo-1702047063975-0841a0621b5a?w=800",
    category: "Marketing",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Learn at Your Own Pace",
    description: "Access courses 24/7 and learn on your schedule with lifetime access.",
  },
  {
    icon: Award,
    title: "Industry-Recognized Certificates",
    description: "Earn certificates that showcase your new skills to employers.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world experience.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    image: "https://images.unsplash.com/photo-1646369505413-216676fef89c?w=400",
    content:
      "eduVerse transformed my career. The courses are incredibly well-structured and the instructors are world-class. I landed my dream job within 3 months!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    image: "https://images.unsplash.com/photo-1762341118920-0b65e8d88aa2?w=400",
    content:
      "The quality of content on eduVerse is unmatched. The hands-on projects helped me build a portfolio that impressed employers.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1631490238101-a1156ce9bb3d?w=400",
    content:
      "Best investment I've made in my education. The platform is intuitive and the community support is amazing.",
    rating: 5,
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4F46E5]/5 via-[#7C3AED]/5 to-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#4F46E5]/10 px-4 py-2 mb-6">
                <TrendingUp className="h-4 w-4 text-[#4F46E5]" />
                <span className="text-sm font-medium text-[#4F46E5]">
                  #1 Online Learning Platform
                </span>
              </div>
              <h1 className="text-5xl font-bold leading-tight tracking-tight lg:text-6xl mb-6">
                Learn Without
                <br />
                <span className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                  Limits
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your future with world-class courses from expert
                instructors. Start learning today and unlock your potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90 text-lg px-8"
                  >
                    Explore Courses
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg px-8"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1629360021730-3d258452c425?w=800"
                  alt="Student learning online"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-card rounded-2xl shadow-xl p-4 border"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">500K+</p>
                    <p className="text-sm text-muted-foreground">
                      Active Learners
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-xl text-muted-foreground">
              Explore our most popular courses and start learning today
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/courses">
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
              >
                View All Courses
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose eduVerse?</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to succeed in your learning journey
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center border-0 shadow-sm hover:shadow-lg transition-shadow h-full">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 to-[#7C3AED]/10 mb-6">
                    <benefit.icon className="h-8 w-8 text-[#4F46E5]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Loved by Students Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our learners have to say about their experience
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-0 shadow-sm hover:shadow-lg transition-shadow h-full">
                  <Quote className="h-8 w-8 text-[#4F46E5] mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor CTA */}
      <section className="py-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Become an Instructor Today
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join our community of expert instructors and share your knowledge
                with millions of students worldwide. Earn money doing what you
                love.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0" />
                  <span className="text-lg">Reach millions of students globally</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0" />
                  <span className="text-lg">Earn money with every enrollment</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0" />
                  <span className="text-lg">Get expert support and resources</span>
                </li>
              </ul>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#4F46E5] hover:bg-white/90 text-lg px-8"
              >
                Start Teaching
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1631490238101-a1156ce9bb3d?w=800"
                alt="Instructor teaching"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
