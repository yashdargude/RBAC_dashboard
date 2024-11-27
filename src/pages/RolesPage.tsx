import { FC, useState } from "react";
import { Plus } from "lucide-react";
import { RoleTable } from "@/components/roles/RoleTable";
import { RoleForm } from "@/components/roles/RoleForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_ROLES, MOCK_RESOURCES } from "@/services/mock-data";
import { Role } from "@/lib/types";

const RolesPage: FC = () => {
  const [roles, setRoles] = useState(MOCK_ROLES);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (roleData: Partial<Role>) => {
    if (editingRole) {
      setRoles(
        roles.map((role) =>
          role.id === editingRole.id ? { ...role, ...roleData } : role
        )
      );
      setEditingRole(null);
    } else {
      const newRole: Role = {
        id: (roles.length + 1).toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...(roleData as Omit<Role, "id" | "createdAt" | "updatedAt">),
      };
      setRoles([...roles, newRole]);
      setIsAddingRole(false);
    }
  };

  const handleDelete = (roleId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this role? This action cannot be undone."
      )
    ) {
      setRoles(roles.filter((role) => role.id !== roleId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Roles & Permissions
        </h2>
        <Button onClick={() => setIsAddingRole(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Role
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
          <CardDescription>
            Create and manage roles with specific permissions for different
            resources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />

            <RoleTable
              roles={filteredRoles}
              onEdit={setEditingRole}
              onDelete={handleDelete}
            />
          </div>
        </CardContent>
      </Card>

      <RoleForm
        resources={MOCK_RESOURCES}
        initialValues={editingRole || undefined}
        open={isAddingRole || !!editingRole}
        onClose={() => {
          setIsAddingRole(false);
          setEditingRole(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default RolesPage;
