
import { useState } from "react";
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
  Clock,
  Plus
} from "lucide-react";
import { MOCK_ALERTS, Alert } from "@/lib/constants";
import { CrudModal } from "@/components/shared/crud-modal";
import { AlertForm } from "@/components/alerts/alert-form";
import { useToast } from "@/hooks/use-toast";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";

const Alerts = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [alerts, setAlerts] = useState([...MOCK_ALERTS]);
  const [isAddAlertModalOpen, setIsAddAlertModalOpen] = useState(false);
  const [isEditAlertModalOpen, setIsEditAlertModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | undefined>(undefined);
  const [isMarkAllReadDialogOpen, setIsMarkAllReadDialogOpen] = useState(false);
  
  // Filter alerts based on search query
  const filteredAlerts = alerts.filter(
    alert => 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get high priority alerts
  const highPriorityAlerts = alerts.filter(alert => alert.priority === "high");
  
  // Get recent alerts (last 7 days)
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentAlerts = alerts.filter(alert => {
    const alertDate = new Date(alert.timestamp);
    return alertDate >= oneWeekAgo;
  });

  // CRUD Operations
  const handleAddAlert = (data: Partial<Alert>) => {
    const newAlert = data as Alert;
    setAlerts([newAlert, ...alerts]);
    toast({
      title: "Alert Created",
      description: "The new alert has been added to the system.",
    });
  };

  const handleEditAlert = (data: Partial<Alert>) => {
    const updatedAlert = { ...selectedAlert, ...data } as Alert;
    setAlerts(alerts.map(a => 
      a.id === updatedAlert.id ? updatedAlert : a
    ));
    toast({
      title: "Alert Updated",
      description: "The alert has been updated successfully.",
    });
  };

  const handleDeleteAlert = (alert: Alert) => {
    setAlerts(alerts.filter(a => a.id !== alert.id));
    toast({
      title: "Alert Removed",
      description: "The alert has been removed from the system.",
    });
  };

  const handleMarkAsRead = (alert: Alert) => {
    const updatedAlert = { ...alert, read: true };
    setAlerts(alerts.map(a => 
      a.id === alert.id ? updatedAlert : a
    ));
    toast({
      title: "Alert Marked as Read",
      description: "The alert has been marked as read.",
    });
  };

  const handleMarkAsUnread = (alert: Alert) => {
    const updatedAlert = { ...alert, read: false };
    setAlerts(alerts.map(a => 
      a.id === alert.id ? updatedAlert : a
    ));
    toast({
      title: "Alert Marked as Unread",
      description: "The alert has been marked as unread.",
    });
  };

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
    setIsMarkAllReadDialogOpen(false);
    toast({
      title: "All Alerts Marked as Read",
      description: "All alerts have been marked as read.",
    });
  };

  // Handler functions to open modals
  const openEditAlert = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsEditAlertModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-bold text-3xl mb-2">Alerts Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and respond to real-time violation alerts
            </p>
          </div>
          <Button 
            onClick={() => setIsAddAlertModalOpen(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>Create Alert</span>
          </Button>
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
            <Button 
              className="flex items-center gap-1"
              onClick={() => setIsMarkAllReadDialogOpen(true)}
            >
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
                <AlertCard 
                  key={alert.id} 
                  alert={alert}
                  onMarkAsRead={() => handleMarkAsRead(alert)}
                  onMarkAsUnread={() => handleMarkAsUnread(alert)}
                  onEdit={() => openEditAlert(alert)}
                  onDelete={() => handleDeleteAlert(alert)}
                />
              ))}
              {filteredAlerts.length === 0 && (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground mb-2">No alerts found matching your search</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="high-priority" className="mt-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {highPriorityAlerts
                .filter(alert => 
                  alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  alert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  alert.location.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((alert) => (
                  <AlertCard 
                    key={alert.id} 
                    alert={alert}
                    onMarkAsRead={() => handleMarkAsRead(alert)}
                    onMarkAsUnread={() => handleMarkAsUnread(alert)}
                    onEdit={() => openEditAlert(alert)}
                    onDelete={() => handleDeleteAlert(alert)}
                  />
                ))}
              {highPriorityAlerts.filter(alert => 
                alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                alert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                alert.location.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground mb-2">No high priority alerts found matching your search</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {recentAlerts
                .filter(alert => 
                  alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  alert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  alert.location.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((alert) => (
                  <AlertCard 
                    key={alert.id} 
                    alert={alert}
                    onMarkAsRead={() => handleMarkAsRead(alert)}
                    onMarkAsUnread={() => handleMarkAsUnread(alert)}
                    onEdit={() => openEditAlert(alert)}
                    onDelete={() => handleDeleteAlert(alert)}
                  />
                ))}
              {recentAlerts.filter(alert => 
                alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                alert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                alert.location.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground mb-2">No recent alerts found matching your search</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-6">
            <AlertTimeline 
              alerts={alerts.filter(alert => 
                alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                alert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                alert.location.toLowerCase().includes(searchQuery.toLowerCase())
              )} 
              onMarkAsRead={handleMarkAsRead}
              onMarkAsUnread={handleMarkAsUnread}
              onEdit={openEditAlert}
              onDelete={handleDeleteAlert}
            />
            {alerts.filter(alert => 
              alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              alert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
              alert.location.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 && (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-2">No alerts found matching your search</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Alert Modal */}
      <CrudModal
        title="Create New Alert"
        description="Create a new alert in the system."
        isOpen={isAddAlertModalOpen}
        onClose={() => setIsAddAlertModalOpen(false)}
      >
        <AlertForm onSubmit={(data) => {
          handleAddAlert(data);
          setIsAddAlertModalOpen(false);
        }} />
      </CrudModal>

      {/* Edit Alert Modal */}
      <CrudModal
        title="Edit Alert"
        description="Update the alert information."
        isOpen={isEditAlertModalOpen}
        onClose={() => setIsEditAlertModalOpen(false)}
      >
        <AlertForm 
          alert={selectedAlert} 
          onSubmit={(data) => {
            handleEditAlert(data);
            setIsEditAlertModalOpen(false);
          }} 
        />
      </CrudModal>

      {/* Mark All as Read Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isMarkAllReadDialogOpen}
        onClose={() => setIsMarkAllReadDialogOpen(false)}
        onConfirm={handleMarkAllAsRead}
        title="Mark All Alerts as Read"
        description="Are you sure you want to mark all alerts as read? This will affect all alerts in the system."
        confirmLabel="Mark All as Read"
      />
    </div>
  );
};

export default Alerts;
