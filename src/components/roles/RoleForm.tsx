// src/components/roles/RoleForm.tsx
import { FC } from "react";
import { Role, Resource, Permission } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { PermissionMatrix } from "./PermissionMatrix";

interface RoleFormProps {
  resources: Resource[];
  initialValues?: Partial<Role>;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Role>) => void;
}

export const RoleForm: FC<RoleFormProps> = ({
  resources,
  initialValues,
  open,
  onClose,
  onSubmit,
}) => {
  const form = useForm<Role>({
    defaultValues: initialValues || {
      name: "",
      description: "",
      permissions: {} as Record<string, Permission[]>,
    },
  });

  const handlePermissionChange = (
    resource: string,
    permission: Permission,
    checked: boolean
  ) => {
    const currentPermissions = form.getValues("permissions") || {};
    const resourcePermissions = currentPermissions[resource] || [];

    const updatedPermissions = checked
      ? [...resourcePermissions, permission]
      : resourcePermissions.filter((p) => p !== permission);

    form.setValue(`permissions.${resource}`, updatedPermissions);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Edit Role" : "Create New Role"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Admin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Role description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Permissions</FormLabel>
              <PermissionMatrix
                resources={resources}
                selectedPermissions={form.getValues("permissions")}
                onChange={handlePermissionChange}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {initialValues ? "Update" : "Create"} Role
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
