import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Users,
  Shield,
  FileText,
  Menu,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme/ThemeToggle";
interface SidebarProps {
  className?: string;
}

const SidebarNav: FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const location = useLocation();

  const routes = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
      variant: "default",
    },
    {
      title: "Users",
      icon: Users,
      href: "/users",
      variant: "default",
    },
    {
      title: "Roles",
      icon: Shield,
      href: "/roles",
      variant: "default",
    },
    {
      title: "Reports",
      icon: FileText,
      href: "/reports",
      variant: "default",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
      variant: "ghost",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-2">
      {routes.map((route) => {
        const isActive = location.pathname === route.href;
        const Icon = route.icon;

        return (
          <Link key={route.href} to={route.href}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                isActive && "bg-muted",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? route.title : undefined}
            >
              <Icon className="h-8 w-8" />
              {!collapsed && route.title}
            </Button>
          </Link>
        );
      })}

      <Separator className="my-4" />

      <Button
        variant="ghost"
        className={cn(
          "justify-start gap-2 text-red-600 hover:text-red-600 hover:bg-red-100",
          collapsed && "justify-center px-2"
        )}
        title={collapsed ? "Logout" : undefined}
      >
        <LogOut className="h-4 w-4" />
        {!collapsed && "Logout"}
      </Button>
    </div>
  );
};

const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Sheet/Drawer remains the same... */}

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col bg-background h-[calc(100vh-4rem)] border-r transition-all duration-300 relative",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        {/* Header section with toggle button */}

        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <span className="font-semibold text-lg"></span>}
          <div className="flex items-center gap-2">
            {!collapsed && <ThemeToggle />}
            <Button
              variant="ghost"
              size="sm"
              className={cn("h-8 w-8", collapsed && "mx-auto")}
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? (
                <PanelLeft className="h-6 w-6" />
              ) : (
                <PanelLeftClose className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        <div className="p-4 flex-1">
          <SidebarNav collapsed={collapsed} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
