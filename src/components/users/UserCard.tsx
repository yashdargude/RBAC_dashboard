// src/components/users/UserCard.tsx
import { FC } from "react";
import { User, Role } from "@/lib/types";
import { StatusBadge } from "../common/StatusBadge";

interface UserCardProps {
  user: User;
  role?: Role;
}

export const UserCard: FC<UserCardProps> = ({ user, role }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-lg font-medium text-gray-900 dark:text-white truncate">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {user.email}
          </p>
        </div>
        <StatusBadge status={user.status} />
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Role: <span className="font-medium">{role?.name}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last Login:{" "}
          {user.lastLogin
            ? new Date(user.lastLogin).toLocaleDateString()
            : "Never"}
        </p>
      </div>
    </div>
  );
};
