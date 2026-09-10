import { Card } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { MoreHorizontal, Ban, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AdminUser {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  accountType: string;
  courses?: string[];
  isActive?: boolean;
}

export function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("eduverse-token");
        const response = await fetch(`${apiUrl}/admin/users`, {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to load users");
        setUsers(data.users);
      } catch (loadError) {
        toast.error(loadError instanceof Error ? loadError.message : "Unable to load users");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [apiUrl]);

  const updateUserStatus = async (userId: string, isActive: boolean) => {
    setUpdatingUserId(userId);
    try {
      const token = localStorage.getItem("eduverse-token");
      const response = await fetch(`${apiUrl}/admin/users/${userId}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ isActive }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to update user status");
      setUsers((current) => current.map((user) => user._id === userId ? data.user : user));
      toast.success(data.message);
    } catch (statusError) {
      toast.error(statusError instanceof Error ? statusError.message : "Unable to update user status");
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage platform users</p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">Loading users...</TableCell></TableRow>}
            {!isLoading && users.length === 0 && <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">No users found.</TableCell></TableRow>}
            {!isLoading && users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{`${user.firstName} ${user.lastName || ""}`.trim()}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.accountType}</TableCell>
                <TableCell>{user.courses?.length || 0}</TableCell>
                <TableCell>
                  <Badge variant={user.isActive !== false ? "default" : "destructive"}>
                    {user.isActive !== false ? "Active" : "Suspended"}
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
                      <DropdownMenuItem
                        onClick={() => updateUserStatus(user._id, true)}
                        disabled={updatingUserId === user._id || user.isActive !== false}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />Activate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => updateUserStatus(user._id, false)}
                        disabled={updatingUserId === user._id || user.isActive === false}
                      >
                        <Ban className="mr-2 h-4 w-4" />Suspend
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
