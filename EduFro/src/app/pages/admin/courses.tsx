import { Card } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Eye, Ban } from "lucide-react";

const courses = [
  { id: "1", title: "Complete Web Development Bootcamp", instructor: "Dr. Angela Yu", students: "234.5K", revenue: "$52.4K", status: "Published" },
  { id: "2", title: "Python Programming Masterclass", instructor: "Jose Portilla", students: "187.6K", revenue: "$41.2K", status: "Published" },
  { id: "3", title: "Data Science Complete Course", instructor: "Michael Chen", students: "0", revenue: "$0", status: "Under Review" },
];

export function AdminCourses() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Course Management</h1>
        <p className="text-muted-foreground">Monitor and manage platform courses</p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell className="font-semibold">{course.revenue}</TableCell>
                <TableCell>
                  <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm"><Eye className="mr-2 h-4 w-4" />View</Button>
                    <Button variant="outline" size="sm" className="text-destructive"><Ban className="mr-2 h-4 w-4" />Remove</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
