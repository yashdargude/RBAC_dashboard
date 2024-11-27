import { FC } from "react";
import { Users, Shield, ActivitySquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_USERS, MOCK_ROLES } from "@/services/mock-data";
import { useNavigate } from "react-router-dom";

const DashboardPage: FC = () => {
  const navigate = useNavigate();
  const stats = [
    {
      title: "Total Users",
      value: MOCK_USERS.length,
      description: "Active users in the system",
      icon: Users,
      color: "text-blue-600",
      onClick: () => navigate("/users"),
    },
    {
      title: "Total Roles",
      value: MOCK_ROLES.length,
      description: "Configured access roles",
      icon: Shield,
      color: "text-green-600",
      onClick: () => navigate("/roles"),
    },
    {
      title: "Active Sessions",
      value: MOCK_USERS.filter((u) => u.status === "active").length,
      description: "Currently active users",
      icon: ActivitySquare,
      color: "text-purple-600",
      onClick: () => navigate("/sessions"),
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={ "cursor-pointer hover:bg-gray-50"  }
              onClick={stat.onClick}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest user and role changes</CardDescription>
          </CardHeader>
          <CardContent>{/* Add activity list here */}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Current system status and metrics</CardDescription>
          </CardHeader>
          <CardContent>{/* Add system metrics here */}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
