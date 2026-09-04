import { CourseCard } from "../../components/course-card";
import { Button } from "../../components/ui/button";

const wishlistCourses = [
  {
    id: "5",
    title: "Python for Data Science",
    instructor: "Jose Portilla",
    price: 89.99,
    originalPrice: 139.99,
    rating: 4.8,
    reviewCount: 32145,
    students: 187654,
    duration: "60h",
    lessons: 380,
    thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=800",
    category: "Data Science",
  },
  {
    id: "6",
    title: "Advanced React & Redux",
    instructor: "Stephen Grider",
    price: 84.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviewCount: 28543,
    students: 156234,
    duration: "48h",
    lessons: 310,
    thumbnail: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800",
    category: "Development",
  },
];

export function Wishlist() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlistCourses.length} courses saved for later
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wishlistCourses.map((course) => (
          <div key={course.id}>
            <CourseCard {...course} />
            <div className="flex gap-2 mt-4">
              <Button className="flex-1 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
                Add to Cart
              </Button>
              <Button variant="outline">Remove</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
