
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const Investigators = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-8">
        <div>
          <h1 className="font-bold text-3xl mb-2">Investigators</h1>
          <p className="text-muted-foreground">
            Manage investigation teams and case assignments
          </p>
        </div>

        <Card className="border-2 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Investigator Management
            </CardTitle>
            <CardDescription>
              This page will allow management of investigation teams, case assignments, and collaboration.
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

export default Investigators;
