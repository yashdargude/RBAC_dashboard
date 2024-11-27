import { FC } from "react";
import {
  User,
  Settings as SettingsIcon,
  LogOut,
  Bell,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "../theme/ThemeProvider";
const Header: FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="border-b bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <img
            src="https://vrvsecurityservices.com/wp-content/uploads/2023/12/logo-.png"
            alt="VRV Security Logo"
            className="h-9 w-auto"
          />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            VRV Security
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-9 w-9 rounded-full"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-gray-600" />
            ) : (
              <Sun className="h-5 w-5 text-gray-300" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
              3
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Avatar className="h-9 w-9 border-2 border-gray-200 dark:border-gray-600">
                  <AvatarImage
                    src="/placeholder-avatar.jpg"
                    alt="Admin"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary-700 text-black">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2" align="end">
              <div className="flex items-center gap-3 p-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    admin@vrvsecurity.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                <SettingsIcon className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md text-red-600 dark:text-red-400">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
