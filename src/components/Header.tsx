import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Button } from "./ui/button";

interface HeaderProps {
  breadcrumbs: { label: string; href?: string }[];
  userName: string;
  userRole: string;
  notificationCount?: number;
  onMobileMenuClick?: () => void;
  isMobile?: boolean;
}

export function Header({ 
  breadcrumbs, 
  userName, 
  userRole, 
  notificationCount = 3,
  onMobileMenuClick,
  isMobile = false 
}: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 lg:left-[260px] left-0 h-16 bg-white border-b border-gray-200 z-40 shadow-sm">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileMenuClick}
              className="lg:hidden p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage className="font-semibold text-gray-900 truncate max-w-[150px] md:max-w-none">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={crumb.href || "#"}
                        className="text-gray-500 hover:text-gray-700 truncate max-w-[100px]"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Mobile: Show only last breadcrumb */}
          <div className="sm:hidden truncate text-sm font-semibold text-gray-900">
            {breadcrumbs[breadcrumbs.length - 1].label}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Пошук..."
              className="pl-10 pr-4 py-2 w-48 lg:w-64 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A00]/20 focus:border-[#FF5A00]"
            />
          </div>

          {/* Mobile Search Button */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 bg-[#FF5A00] text-white text-xs">
                {notificationCount}
              </Badge>
            )}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 md:gap-3 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" alt={userName} />
                <AvatarFallback className="bg-[#FF5A00] text-white text-sm">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <div className="text-sm text-gray-900">{userName}</div>
                <div className="text-xs text-gray-500">{userRole}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Мій акаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Профіль</DropdownMenuItem>
              <DropdownMenuItem>Налаштування</DropdownMenuItem>
              <DropdownMenuItem>Допомога</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Вийти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
