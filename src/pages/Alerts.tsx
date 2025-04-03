
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCard } from "@/components/alerts/alert-card";
import { AlertTimeline } from "@/components/alerts/alert-timeline";
import { AlertStats } from "@/components/alerts/alert-stats";
import { 
  Bell, 
  Search, 
  Shield, 
  Filter, 
  AlertTriangle,
  Clock
} from "lucide-react";
import { MOCK_ALERTS } from "@/lib/constants";
import { useState } from "react";

const Alerts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter alerts based on search query
  const filteredAlerts = MOCK_ALERTS.filter(
    alert => 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get high priority alerts
  const highPriorityAlerts = MOCK_ALERTS.filter(alert => alert.priority === "high");
  
  // Get recent alerts (last 7 days)
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentAlerts = MOCK_ALERTS.filter(alert => {
    const alertDate = new Date(alert.timestamp);
    return alertDate >= oneWeekAgo;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-8">
        <div>
          <h1 className="font-bold text-3xl mb-2">Alerts Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and respond to real-time violation alerts
          </p>
        </div>

        {/* Alert Statistics Overview */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <AlertStats />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search alerts..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span>Mark All as Read</span>
            </Button>
          </div>
        </div>

        {/* Alerts Content */}
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="high-priority" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              High Priority
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="high-priority" className="mt-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {highPriorityAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {recentAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-6">
            <AlertTimeline alerts={MOCK_ALERTS} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Alerts;
