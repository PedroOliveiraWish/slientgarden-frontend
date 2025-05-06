import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

import Image from "next/image";

import { PathSidebarPropsUnique } from "../types/pathSidebar";
import { User } from "../types/user";

export function AppSidebar({ paths, user }: { paths: PathSidebarPropsUnique[], user: User }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="logo">
          <Image
            src="/assets/flower_logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
          <div className="title text-xl font-bold text-green-600">
            Silent Garden
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="flex flex-col items-center">
          <SidebarGroupContent>
            <SidebarMenu>
              {paths.map((path: PathSidebarPropsUnique) => (
                <SidebarMenuItem key={path.path}>
                  <SidebarMenuButton asChild>
                    <a href={path.path}>
                      <span className="text-lg font-semibold text-gray-800">
                        {path.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <span>{user.username}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <a href={`/quotes/${user.id}`}>
                        <span>My Quotes</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <a href={`/saved-quotes/${user.id}`}>
                        <span>Saved Quotes</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <a href="/login">
                        <span>Logout</span>
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
