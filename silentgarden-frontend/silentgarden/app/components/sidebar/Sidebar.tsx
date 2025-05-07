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
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";

import Image from "next/image";

import { PathSidebarPropsUnique } from "../../types/pathSidebar";
import { User } from "../../types/user";

import "./Sidebar.css";

export function AppSidebar({
  paths,
  user,
}: {
  paths: PathSidebarPropsUnique[];
  user: User | null;
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleMyQuotes = () => {
    if (user) {
      router.push(`/quotes/${user.id}`);
    } else {
      router.push("/login");
    }
  };

  const handleSavedQuotes = () => {
    if (user) {
      router.push(`/saved-quotes/${user.id}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <Sidebar className="sidebar">
      <SidebarHeader className="sidebar-header">
        <div className="logo">
          <Image
            src="/assets/flower_logo.png"
            alt="Logo"
            width={75}
            height={75}
          />
          <div className="logo-text">Silent Garden</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="sidebar-menu">
              {paths.map((path: PathSidebarPropsUnique) => (
                <SidebarMenuItem key={path.path} className="sidebar-menu-item">
                  <SidebarMenuButton asChild>
                    <a href={path.path} className="p-5">
                      <span className="sidebar-menu-item-text">
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
          <DropdownMenuTrigger className="dropdown-menu">
            <span>{user?.username || "Guest"}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem style={{cursor: "pointer"}}>
              <a href="/my-quotes" onClick={handleMyQuotes}>
                <span>My Quotes</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem style={{cursor: "pointer"}}>
            <a href="/saved-quotes" onClick={handleSavedQuotes}>
                <span>Saved Quotes</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem style={{cursor: "pointer"}}>
              <a href="/logout" onClick={handleLogout}>
                <span>Logout</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
