
import { Shield, Bell, Calendar, Users, Search, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="py-4">
        <Link to="/" className="flex items-center gap-2 px-4">
          <Shield className="h-6 w-6 text-accent" />
          <span className="text-lg font-bold tracking-tight">Guardian-IO</span>
        </Link>
        <div className="flex items-center justify-between px-4 mt-4">
          <span className="text-xs font-semibold">ZERO-ONE DASHBOARD</span>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 my-4">
          <div className="live-indicator text-xs font-medium">
            LIVE MONITORING
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/whistleblower" className="flex items-center">
                <Flag className="mr-2 h-4 w-4" />
                <span>Whistleblower</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/predictions" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Risk Predictions</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/alerts" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                <span>Alerts</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/investigators" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Investigators</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="pt-2 pb-6">
        <div className="px-4 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">v0.1.0</div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
