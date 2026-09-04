import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye, PlusCircle } from "lucide-react";

const courses = [
  { id: "1", title: "Complete Web Development Bootcamp 2026", students: 45230, revenue: "$12,450", status: "Published", rating: 4.8 },
  { id: "2", title: "Python Programming Masterclass", students: 32145, revenue: "$9,230", status: "Published", rating: 4.9 },
  { id: "3", title: "Data Science & Machine Learning", students: 28543, revenue: "$8,120", status: "Published", rating: 4.7 },
  { id: "4", title: "React Advanced Patterns", students: 0, revenue: "$0", status: "Draft", rating: 0 },
];

export function InstructorCourses() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>
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
            {courses.map((course) => (
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
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
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
