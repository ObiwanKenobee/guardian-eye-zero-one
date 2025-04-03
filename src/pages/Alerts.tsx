
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const Alerts = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-8">
        <div>
          <h1 className="font-bold text-3xl mb-2">Alerts</h1>
          <p className="text-muted-foreground">
            Monitor and respond to real-time violation alerts
          </p>
        </div>

        <Card className="border-2 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alerts Dashboard
            </CardTitle>
            <CardDescription>
              This page will display real-time alerts for new violations, case updates, and risk spikes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Coming soon in the next version of Guardian-IO
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;
