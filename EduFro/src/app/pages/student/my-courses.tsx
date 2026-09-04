import { Link } from "react-router";
import { CourseCard } from "../../components/course-card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

const courses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2026",
    instructor: "Dr. Angela Yu",
    price: 84.99,
    rating: 4.8,
    reviewCount: 45230,
    students: 234567,
    duration: "52h 30m",
    lessons: 342,
    thumbnail: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800",
    category: "Development",
    progress: 45,
    showProgress: true,
  },
  {
    id: "2",
    title: "Advanced Data Science & Machine Learning",
    instructor: "Jose Portilla",
    price: 94.99,
    rating: 4.9,
    reviewCount: 32145,
    students: 187654,
    duration: "65h 15m",
    lessons: 428,
    thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=800",
    category: "Data Science",
    progress: 23,
    showProgress: true,
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass 2026",
    instructor: "Daniel Walter Scott",
    price: 79.99,
    rating: 4.7,
    reviewCount: 28543,
    students: 156234,
    duration: "45h 20m",
    lessons: 298,
    thumbnail: "https://images.unsplash.com/photo-1510832758362-af875829efcf?w=800",
    category: "Design",
    progress: 67,
    showProgress: true,
  },
  {
    id: "4",
    title: "Digital Marketing Complete Course",
    instructor: "Phil Ebiner",
    price: 69.99,
    rating: 4.6,
    reviewCount: 19876,
    students: 98765,
    duration: "38h 45m",
    lessons: 256,
    thumbnail: "https://images.unsplash.com/photo-1702047063975-0841a0621b5a?w=800",
    category: "Marketing",
    progress: 100,
    showProgress: true,
  },
];

export function StudentCourses() {
  const inProgress = courses.filter(c => c.progress > 0 && c.progress < 100);
  const completed = courses.filter(c => c.progress === 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-muted-foreground">
          Track and manage your enrolled courses
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Courses ({courses.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course.id}>
                <CourseCard {...course} />
                <Link to={`/student/course/${course.id}/learn`}>
                  <Button className="w-full mt-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
                    Continue Learning
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((course) => (
              <div key={course.id}>
                <CourseCard {...course} />
                <Link to={`/student/course/${course.id}/learn`}>
                  <Button className="w-full mt-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
                    Continue Learning
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completed.map((course) => (
              <div key={course.id}>
                <CourseCard {...course} />
                <Button variant="outline" className="w-full mt-4">
                  Download Certificate
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
