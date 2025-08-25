import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import logo from "@/assets/image/react.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { CiLogout } from "react-icons/ci";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
export function AppSidebar() {
  const { logout } = useKindeAuth();
  const { userdata } = useSelector((state: RootState) => state.global);
  return (
    <Sidebar>
      <SidebarHeader>
        <img src={logo} alt="" className="size-10 cursor-pointer" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={
                  userdata?.profile_picture ||
                  "https://ui.shadcn.com/avatars/04.png"
                }
                alt="profile"
                className="h-8 w-8 rounded-full"
              />
              <p className="text-[14px] font-bold text-primary truncate max-w-[160px]">
                {userdata?.last_name} <br />
                <span className="text-xs font-normal text-gray-400">
                  {userdata?.email}
                </span>
              </p>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" className="w-[250px] p-2 mb-3 bg-primary/40 ">
            <DropdownMenuItem
              className="text-destructive flex items-center gap-3 outline-none cursor-pointer"
              onClick={() => logout()}
            >
              <CiLogout className="text-red-500" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
