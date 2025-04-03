
import { Search, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2 lg:hidden">
          <Shield className="h-6 w-6 text-accent" />
          <span className="text-lg font-bold">Guardian-IO</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <form className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search violations..."
              className="w-64 rounded-lg bg-background pl-8 md:w-80 lg:w-96"
            />
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="status-badge status-badge-high">
                        High Risk
                      </span>
                      <span className="text-xs text-muted-foreground">
                        5 min ago
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      New report: Unsafe Working Conditions
                    </p>
                    <p className="text-xs text-muted-foreground">
                      TextileCorp International - Jakarta, Indonesia
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="status-badge status-badge-medium">
                        Medium Risk
                      </span>
                      <span className="text-xs text-muted-foreground">
                        1 hour ago
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      Case update: Deforestation investigation
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ResourceX Mining Corp - Madre de Dios, Peru
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="status-badge status-badge-high">
                        High Risk
                      </span>
                      <span className="text-xs text-muted-foreground">
                        3 hours ago
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      Risk prediction alert: Textile industry in Southeast Asia
                    </p>
                    <p className="text-xs text-muted-foreground">
                      AI detected increasing risk patterns
                    </p>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-center">
                <span className="text-sm font-medium mx-auto">
                  View all notifications
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
