import { FC, useState } from "react";
import { Plus } from "lucide-react";
import { UserTable } from "@/components/users/UserTable";
import { UserForm } from "@/components/users/UserForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_USERS, MOCK_ROLES } from "@/services/mock-data";
import { User } from "@/lib/types";

const UsersPage: FC = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (userData: Partial<User>) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...userData } : user
        )
      );
      setEditingUser(null);
    } else {
      const newUser: User = {
        id: (users.length + 1).toString(),
        createdAt: new Date().toISOString(),
        ...(userData as Omit<User, "id" | "createdAt">),
      };
      setUsers([...users, newUser]);
      setIsAddingUser(false);
    }
  };

  const handleDelete = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <Button onClick={() => setIsAddingUser(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage user accounts and their role assignments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />

            <UserTable
              users={filteredUsers}
              roles={MOCK_ROLES}
              onEdit={setEditingUser}
              onDelete={handleDelete}
            />
          </div>
        </CardContent>
      </Card>

      {/* User Form Dialog */}
      <UserForm
        roles={MOCK_ROLES}
        initialValues={editingUser || undefined}
        open={isAddingUser || !!editingUser}
        onClose={() => {
          setIsAddingUser(false);
          setEditingUser(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UsersPage;
