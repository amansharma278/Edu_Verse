import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../contexts/auth-context";

interface BackendCourse {
  _id: string;
  courseName: string;
  price?: number;
  studentEnrolled?: string;
  ratingReview?: Array<{ rating?: number }>;
}

interface CourseRow {
  id: string;
  title: string;
  students: number;
  revenue: string;
  status: "Published" | "Draft";
  rating: number;
}

export function InstructorCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const deleteCourse = async (courseId: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    setDeletingCourseId(courseId);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";
      const token = localStorage.getItem("eduverse-token");
      const response = await fetch(`${apiUrl}/course/${courseId}`, {
        method: "DELETE",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to delete course");

      setCourses((current) => current.filter((course) => course.id !== courseId));
      toast.success("Course deleted successfully");
    } catch (deleteError) {
      toast.error(deleteError instanceof Error ? deleteError.message : "Unable to delete course");
    } finally {
      setDeletingCourseId(null);
    }
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";
        const token = localStorage.getItem("eduverse-token");
        const response = await fetch(`${apiUrl}/course/instructor`, {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to load courses");

        setCourses((data.courses as BackendCourse[]).map((course) => {
          const ratings = (course.ratingReview || [])
            .map((review) => review.rating || 0)
            .filter((rating) => rating > 0);
          const averageRating = ratings.length
            ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length
            : 0;

          return {
            id: course._id,
            title: course.courseName,
            students: course.studentEnrolled ? 1 : 0,
            revenue: `$${(course.price || 0).toLocaleString()}`,
            status: "Published",
            rating: averageRating,
          };
        }));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load courses");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) loadCourses();
    else setIsLoading(false);
  }, [user?.id]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>

      {error && <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">{error}</p>}
          <p className="text-muted-foreground">Manage your course content and performance</p>
        </div>
        <Link to="/instructor/add-course">
          <Button className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Course
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">Loading courses...</TableCell>
              </TableRow>
            )}
            {!isLoading && !error && courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">No courses created yet.</TableCell>
              </TableRow>
            )}
            {!isLoading && courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.students.toLocaleString()}</TableCell>
                <TableCell className="font-semibold">{course.revenue}</TableCell>
                <TableCell>{course.rating > 0 ? course.rating.toFixed(1) : "-"}</TableCell>
                <TableCell>
                  <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/courses/${course.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/instructor/edit-course/${course.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => deleteCourse(course.id)}
                        disabled={deletingCourseId === course.id}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deletingCourseId === course.id ? "Deleting..." : "Delete"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
