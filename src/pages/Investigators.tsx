
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Search, 
  UserPlus, 
  Calendar, 
  ArrowUpDown,
  Users 
} from "lucide-react";
import { useState } from "react";
import { InvestigatorCard } from "@/components/investigators/investigator-card";
import { TeamAssignmentTable } from "@/components/investigators/team-assignment-table";
import { MOCK_INVESTIGATORS, MOCK_TEAMS } from "@/lib/constants";

const Investigators = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<"investigators" | "teams">("investigators");
  
  // Filter investigators based on search query
  const filteredInvestigators = MOCK_INVESTIGATORS.filter(
    investigator => 
      investigator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investigator.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investigator.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-8">
        <div>
          <h1 className="font-bold text-3xl mb-2">Investigator Management</h1>
          <p className="text-muted-foreground">
            Manage investigation teams and case assignments for human rights violations
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search investigators or teams..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeView === "investigators" ? "default" : "outline"}
              onClick={() => setActiveView("investigators")}
              className="flex items-center gap-1"
            >
              <Users className="h-4 w-4" />
              <span>Investigators</span>
            </Button>
            <Button
              variant={activeView === "teams" ? "default" : "outline"}
              onClick={() => setActiveView("teams")}
              className="flex items-center gap-1"
            >
              <Shield className="h-4 w-4" />
              <span>Teams</span>
            </Button>
            <Button className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Investigator</span>
            </Button>
          </div>
        </div>

        {/* Investigators View */}
        {activeView === "investigators" && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredInvestigators.map((investigator) => (
              <InvestigatorCard 
                key={investigator.id} 
                investigator={investigator} 
              />
            ))}
          </div>
        )}

        {/* Teams View */}
        {activeView === "teams" && (
          <div className="space-y-6">
            {MOCK_TEAMS.map((team) => (
              <Card key={team.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        {team.name}
                      </CardTitle>
                      <CardDescription>
                        {team.description}
                      </CardDescription>
                    </div>
                    <Badge variant={team.status === "active" ? "default" : "secondary"}>
                      {team.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-sm font-medium">Lead Investigator</div>
                        <div className="text-muted-foreground">
                          {MOCK_INVESTIGATORS.find(i => i.id === team.leadInvestigatorId)?.name || "Unassigned"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Active Cases</div>
                        <div className="text-muted-foreground">{team.activeCases}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Region</div>
                        <div className="text-muted-foreground">{team.region}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Assign Cases
                      </Button>
                      <Button size="sm">
                        Manage Team
                      </Button>
                    </div>
                  </div>
                  
                  <TeamAssignmentTable team={team} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Investigators;
