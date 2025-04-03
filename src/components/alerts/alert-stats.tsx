
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Clock 
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { MOCK_ALERTS } from "@/lib/constants";
import { useState, useEffect } from "react";

interface AlertStatsProps {
  alerts?: typeof MOCK_ALERTS;
}

export function AlertStats({ alerts = MOCK_ALERTS }: AlertStatsProps) {
  // States to track previous values for change calculation
  const [prevNewAlerts, setPrevNewAlerts] = useState(0);
  
  // Calculate alert statistics
  const totalAlerts = alerts.length;
  const unreadAlerts = alerts.filter(a => !a.read).length;
  const highPriorityAlerts = alerts.filter(a => a.priority === "high").length;
  
  // Get alerts from last 24 hours
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const newAlerts = alerts.filter(alert => {
    const alertDate = new Date(alert.timestamp);
    return alertDate >= oneDayAgo;
  }).length;

  // Calculate change percentage for new alerts
  useEffect(() => {
    // Store the previous value to calculate change later
    setPrevNewAlerts(newAlerts);
    
    // This would typically be refreshed periodically or when data changes
    const refreshInterval = setInterval(() => {
      setPrevNewAlerts(newAlerts);
    }, 3600000); // Update every hour
    
    return () => clearInterval(refreshInterval);
  }, [newAlerts]);

  // Calculate percentage change
  const newAlertsChange = prevNewAlerts > 0 
    ? Math.round(((newAlerts - prevNewAlerts) / prevNewAlerts) * 100) 
    : 0;
  
  // Format the change text
  const newAlertsChangeText = `${Math.abs(newAlertsChange)}% ${newAlertsChange >= 0 ? 'increase' : 'decrease'}`;

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
        change={{ value: `${alerts.filter(a => a.priority === 'high' && !a.read).length} unread`, positive: false }}
      />
      <StatsCard
        title="New Alerts"
        value={newAlerts}
        description="In the last 24 hours"
        icon={<Clock className="h-4 w-4" />}
        change={{ value: newAlertsChangeText, positive: newAlertsChange <= 0 }}
      />
      <StatsCard
        title="Risk Triggers"
        value={alerts.filter(a => a.tags?.some(tag => tag.includes('risk') || tag.includes('prediction'))).length}
        description="AI-detected potential issues"
        icon={<ShieldAlert className="h-4 w-4" />}
        change={{ value: "5 new", positive: false }}
      />
    </>
  );
}
