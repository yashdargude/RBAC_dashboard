import { User, Role, Resource } from '@/lib/types'

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'users',
    name: 'Users',
    availablePermissions: ['create', 'read', 'update', 'delete'],
  },
  {
    id: 'roles',
    name: 'Roles',
    availablePermissions: ['create', 'read', 'update', 'delete'],
  },
  {
    id: 'reports',
    name: 'Reports',
    availablePermissions: ['read'],
  },
]

export const MOCK_ROLES: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: {
      users: ['create', 'read', 'update', 'delete'],
      roles: ['create', 'read', 'update', 'delete'],
      reports: ['read'],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'User Manager',
    description: 'Can manage users only',
    permissions: {
      users: ['read', 'update'],
      reports: ['read'],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    roleId: '1',
    status: 'active',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    roleId: '2',
    status: 'active',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
]