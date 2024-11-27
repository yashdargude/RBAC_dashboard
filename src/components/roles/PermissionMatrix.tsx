// src/components/roles/PermissionMatrix.tsx
import { FC } from "react";
import { Resource, Permission } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PermissionMatrixProps {
  resources: Resource[];
  selectedPermissions: Record<string, Permission[]>;
  onChange: (
    resource: string,
    permission: Permission,
    checked: boolean
  ) => void;
}

export const PermissionMatrix: FC<PermissionMatrixProps> = ({
  resources,
  selectedPermissions,
  onChange,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Resource</TableHead>
          <TableHead>Create</TableHead>
          <TableHead>Read</TableHead>
          <TableHead>Update</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resources.map((resource) => (
          <TableRow key={resource.id}>
            <TableCell className="font-medium">{resource.name}</TableCell>
            {["create", "read", "update", "delete"].map((permission) => (
              <TableCell key={permission}>
                {resource.availablePermissions.includes(
                  permission as Permission
                ) && (
                  <Checkbox
                    checked={selectedPermissions[resource.id]?.includes(
                      permission as Permission
                    )}
                    onCheckedChange={(checked) => {
                      onChange(
                        resource.id,
                        permission as Permission,
                        checked as boolean
                      );
                    }}
                  />
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
