import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { CourseCard } from "../components/course-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

const courses = [
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
  {
    id: "5",
    title: "Business Strategy & Leadership",
    instructor: "Chris Haroun",
    price: 74.99,
    originalPrice: 109.99,
    rating: 4.7,
    reviewCount: 15432,
    students: 87543,
    duration: "42h 10m",
    lessons: 267,
    thumbnail: "https://images.unsplash.com/photo-1762341118920-0b65e8d88aa2?w=800",
    category: "Business",
  },
  {
    id: "6",
    title: "Complete JavaScript Course 2026",
    instructor: "Jonas Schmedtmann",
    price: 84.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 52341,
    students: 298765,
    duration: "48h 35m",
    lessons: 312,
    thumbnail: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800",
    category: "Development",
    bestseller: true,
  },
];

const categories = ["All", "Development", "Data Science", "Design", "Marketing", "Business"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const ratings = [
  { label: "4.5 & up", value: 4.5 },
  { label: "4.0 & up", value: 4.0 },
  { label: "3.5 & up", value: 3.5 },
];

function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 200]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Rating</h3>
        <div className="space-y-3">
          {ratings.map((rating) => (
            <div key={rating.value} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating.value}`} />
              <label
                htmlFor={`rating-${rating.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {rating.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Level</h3>
        <div className="space-y-3">
          {levels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox id={level} />
              <label
                htmlFor={level}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={200}
          step={10}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Button variant="outline" className="w-full">
        <X className="mr-2 h-4 w-4" />
        Clear Filters
      </Button>
    </div>
  );
}

export function CourseListing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Explore Courses</h1>
          <p className="text-xl text-muted-foreground">
            Discover your next learning adventure from our collection of courses
          </p>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-10"
            />
          </div>
          <Select defaultValue="popular">
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="mt-8">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Courses Grid */}
          <div>
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {courses.length} courses
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="default" size="sm" className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
