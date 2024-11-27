interface StatusBadgeProps {
  status: "active" | "inactive";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === "active"
          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      }`}
    >
      {status}
    </span>
  );
}
