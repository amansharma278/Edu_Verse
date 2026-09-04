import { Card } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { MoreHorizontal, CheckCircle, Ban, Eye } from "lucide-react";

const instructors = [
  { id: "1", name: "Dr. Angela Yu", email: "angela@example.com", courses: 42, students: "234.5K", status: "Approved", rating: 4.8 },
  { id: "2", name: "Jose Portilla", email: "jose@example.com", courses: 28, students: "187.6K", status: "Approved", rating: 4.9 },
  { id: "3", name: "Daniel Scott", email: "daniel@example.com", courses: 18, students: "156.2K", status: "Pending", rating: 4.7 },
];

export function AdminInstructors() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Instructor Management</h1>
        <p className="text-muted-foreground">Manage instructors and approve applications</p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell className="font-medium">{instructor.name}</TableCell>
                <TableCell>{instructor.email}</TableCell>
                <TableCell>{instructor.courses}</TableCell>
                <TableCell>{instructor.students}</TableCell>
                <TableCell>{instructor.rating.toFixed(1)}</TableCell>
                <TableCell>
                  <Badge variant={instructor.status === "Approved" ? "default" : "secondary"}>
                    {instructor.status}
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
                      <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                      <DropdownMenuItem><CheckCircle className="mr-2 h-4 w-4" />Approve</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive"><Ban className="mr-2 h-4 w-4" />Suspend</DropdownMenuItem>
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
