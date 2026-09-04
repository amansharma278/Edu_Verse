import { useState } from "react";
import { useSearchParams, Link } from "react-router";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { CourseCard } from "../components/course-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";

const searchResults = [
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
    title: "Advanced JavaScript & TypeScript",
    instructor: "Maximilian Schwarzmüller",
    price: 89.99,
    originalPrice: 134.99,
    rating: 4.9,
    reviewCount: 38421,
    students: 198765,
    duration: "48h 45m",
    lessons: 385,
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
    category: "Development",
  },
  {
    id: "3",
    title: "React & Next.js Complete Guide",
    instructor: "Academind Team",
    price: 79.99,
    rating: 4.7,
    reviewCount: 29384,
    students: 165432,
    duration: "42h 15m",
    lessons: 298,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    category: "Development",
  },
  {
    id: "4",
    title: "Full Stack Web Developer Course",
    instructor: "Rob Percival",
    price: 94.99,
    originalPrice: 149.99,
    rating: 4.6,
    reviewCount: 52341,
    students: 287654,
    duration: "58h 30m",
    lessons: 412,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    category: "Development",
    bestseller: true,
  },
  {
    id: "5",
    title: "Node.js & Express Backend Development",
    instructor: "Andrew Mead",
    price: 74.99,
    rating: 4.8,
    reviewCount: 31245,
    students: 145678,
    duration: "38h 20m",
    lessons: 256,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    category: "Development",
  },
  {
    id: "6",
    title: "Modern Frontend Development with React",
    instructor: "Brad Traversy",
    price: 69.99,
    rating: 4.7,
    reviewCount: 24567,
    students: 134521,
    duration: "35h 45m",
    lessons: 234,
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800",
    category: "Development",
  },
];

const categories = [
  "Development",
  "Design",
  "Business",
  "Marketing",
  "Data Science",
  "Photography",
];

const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

const durations = [
  "0-2 Hours",
  "2-5 Hours",
  "5-10 Hours",
  "10+ Hours",
];

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  const toggleDuration = (duration: string) => {
    setSelectedDurations((prev) =>
      prev.includes(duration)
        ? prev.filter((d) => d !== duration)
        : [...prev, duration]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedDurations([]);
    setPriceRange("all");
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedLevels.length +
    selectedDurations.length +
    (priceRange !== "all" ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* Search Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {searchResults.length} results for "{query}"
                </h1>
                <p className="text-muted-foreground">
                  Explore our comprehensive course catalog
                </p>
              </div>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">
                  Active filters:
                </span>
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
                {selectedLevels.map((level) => (
                  <Badge
                    key={level}
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => toggleLevel(level)}
                  >
                    {level}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
                {selectedDurations.map((duration) => (
                  <Badge
                    key={duration}
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => toggleDuration(duration)}
                  >
                    {duration}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
                {priceRange !== "all" && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => setPriceRange("all")}
                  >
                    {priceRange}
                    <X className="h-3 w-3" />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6 text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:block w-64 shrink-0"
              >
                <div className="sticky top-8 space-y-6">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Category</h3>
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label
                          htmlFor={`category-${category}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Level Filter */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Level</h3>
                    {levels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={`level-${level}`}
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={() => toggleLevel(level)}
                        />
                        <Label
                          htmlFor={`level-${level}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Duration Filter */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Duration</h3>
                    {durations.map((duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <Checkbox
                          id={`duration-${duration}`}
                          checked={selectedDurations.includes(duration)}
                          onCheckedChange={() => toggleDuration(duration)}
                        />
                        <Label
                          htmlFor={`duration-${duration}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {duration}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Filter */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Price</h3>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="under-50">Under $50</SelectItem>
                        <SelectItem value="50-100">$50 - $100</SelectItem>
                        <SelectItem value="over-100">Over $100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.aside>
            )}

            {/* Results Grid */}
            <div className="flex-1">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {searchResults.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CourseCard {...course} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">...</Button>
                <Button variant="outline">10</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
