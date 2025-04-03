
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Clock 
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { MOCK_ALERTS } from "@/lib/constants";

export function AlertStats() {
  // Calculate alert statistics
  const totalAlerts = MOCK_ALERTS.length;
  const unreadAlerts = MOCK_ALERTS.filter(a => !a.read).length;
  const highPriorityAlerts = MOCK_ALERTS.filter(a => a.priority === "high").length;
  
  // Get alerts from last 24 hours
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const newAlerts = MOCK_ALERTS.filter(alert => {
    const alertDate = new Date(alert.timestamp);
    return alertDate >= oneDayAgo;
  }).length;

  return (
    <>
      <StatsCard
        title="Total Alerts"
        value={totalAlerts}
        description="Active in the system"
        icon={<Bell className="h-4 w-4" />}
        change={{ value: `${unreadAlerts} unread`, positive: false }}
      />
      <StatsCard
        title="High Priority"
        value={highPriorityAlerts}
        description="Requiring immediate action"
        icon={<AlertTriangle className="h-4 w-4" />}
        change={{ value: "3 assigned", positive: true }}
      />
      <StatsCard
        title="New Alerts"
        value={newAlerts}
        description="In the last 24 hours"
        icon={<Clock className="h-4 w-4" />}
        change={{ value: "12% increase", positive: false }}
      />
      <StatsCard
        title="Risk Triggers"
        value={18}
        description="AI-detected potential issues"
        icon={<ShieldAlert className="h-4 w-4" />}
        change={{ value: "5 new", positive: false }}
      />
    </>
  );
}
