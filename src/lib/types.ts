export type Permission = 'create' | 'read' | 'update' | 'delete';

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, Permission[]>;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  name: string;
  availablePermissions: Permission[];
}