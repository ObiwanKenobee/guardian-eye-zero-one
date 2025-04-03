
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Search, 
  UserPlus, 
  Users,
  Plus
} from "lucide-react";
import { InvestigatorCard } from "@/components/investigators/investigator-card";
import { TeamAssignmentTable } from "@/components/investigators/team-assignment-table";
import { MOCK_INVESTIGATORS, MOCK_TEAMS, Investigator, Team } from "@/lib/constants";
import { CrudModal } from "@/components/shared/crud-modal";
import { InvestigatorForm } from "@/components/investigators/investigator-form";
import { TeamForm } from "@/components/investigators/team-form";
import { useToast } from "@/hooks/use-toast";

const Investigators = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<"investigators" | "teams">("investigators");
  const [investigators, setInvestigators] = useState([...MOCK_INVESTIGATORS]);
  const [teams, setTeams] = useState([...MOCK_TEAMS]);
  
  // Modal states
  const [isAddInvestigatorModalOpen, setIsAddInvestigatorModalOpen] = useState(false);
  const [isEditInvestigatorModalOpen, setIsEditInvestigatorModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
  const [selectedInvestigator, setSelectedInvestigator] = useState<Investigator | undefined>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(undefined);
  
  // Filter investigators based on search query
  const filteredInvestigators = investigators.filter(
    investigator => 
      investigator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investigator.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investigator.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CRUD Operations for Investigators
  const handleAddInvestigator = (data: Partial<Investigator>) => {
    const newInvestigator = data as Investigator;
    setInvestigators([...investigators, newInvestigator]);
    toast({
      title: "Investigator Added",
      description: `${newInvestigator.name} has been added to the roster.`,
    });
  };

  const handleEditInvestigator = (data: Partial<Investigator>) => {
    const updatedInvestigator = { ...selectedInvestigator, ...data } as Investigator;
    setInvestigators(investigators.map(i => 
      i.id === updatedInvestigator.id ? updatedInvestigator : i
    ));
    toast({
      title: "Investigator Updated",
      description: `${updatedInvestigator.name}'s information has been updated.`,
    });
  };

  const handleDeleteInvestigator = (investigator: Investigator) => {
    setInvestigators(investigators.filter(i => i.id !== investigator.id));
    toast({
      title: "Investigator Removed",
      description: `${investigator.name} has been removed from the roster.`,
    });
  };

  // CRUD Operations for Teams
  const handleAddTeam = (data: Partial<Team>) => {
    const newTeam = data as Team;
    setTeams([...teams, newTeam]);
    toast({
      title: "Team Created",
      description: `Team "${newTeam.name}" has been created.`,
    });
  };

  const handleEditTeam = (data: Partial<Team>) => {
    const updatedTeam = { ...selectedTeam, ...data } as Team;
    setTeams(teams.map(t => 
      t.id === updatedTeam.id ? updatedTeam : t
    ));
    toast({
      title: "Team Updated",
      description: `Team "${updatedTeam.name}" has been updated.`,
    });
  };

  const handleDeleteTeam = (team: Team) => {
    setTeams(teams.filter(t => t.id !== team.id));
    toast({
      title: "Team Decommissioned",
      description: `Team "${team.name}" has been decommissioned.`,
    });
  };

  // Edit handlers
  const openEditInvestigator = (investigator: Investigator) => {
    setSelectedInvestigator(investigator);
    setIsEditInvestigatorModalOpen(true);
  };

  const openEditTeam = (team: Team) => {
    setSelectedTeam(team);
    setIsEditTeamModalOpen(true);
  };

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
            {activeView === "investigators" && (
              <Button 
                className="flex items-center gap-1"
                onClick={() => setIsAddInvestigatorModalOpen(true)}
              >
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Investigator</span>
              </Button>
            )}
            {activeView === "teams" && (
              <Button 
                className="flex items-center gap-1"
                onClick={() => setIsAddTeamModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create Team</span>
              </Button>
            )}
          </div>
        </div>

        {/* Investigators View */}
        {activeView === "investigators" && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredInvestigators.map((investigator) => (
              <InvestigatorCard 
                key={investigator.id} 
                investigator={investigator}
                onEdit={() => openEditInvestigator(investigator)}
                onDelete={() => handleDeleteInvestigator(investigator)}
              />
            ))}
            {filteredInvestigators.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-2">No investigators found matching your search</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Teams View */}
        {activeView === "teams" && (
          <div className="space-y-6">
            {teams
              .filter(team => 
                team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                team.region.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((team) => (
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
                      <div className="flex gap-2 items-start">
                        <Badge variant={team.status === "active" ? "default" : "secondary"}>
                          {team.status}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditTeam(team)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteTeam(team)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm font-medium">Lead Investigator</div>
                          <div className="text-muted-foreground">
                            {investigators.find(i => i.id === team.leadInvestigatorId)?.name || "Unassigned"}
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
                    
                    <TeamAssignmentTable team={team} investigators={investigators} />
                  </CardContent>
                </Card>
              ))}
            {teams.filter(team => 
              team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              team.region.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-2">No teams found matching your search</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Investigator Modal */}
      <CrudModal
        title="Add New Investigator"
        description="Add a new investigator to the system."
        isOpen={isAddInvestigatorModalOpen}
        onClose={() => setIsAddInvestigatorModalOpen(false)}
      >
        <InvestigatorForm onSubmit={(data) => {
          handleAddInvestigator(data);
          setIsAddInvestigatorModalOpen(false);
        }} />
      </CrudModal>

      {/* Edit Investigator Modal */}
      <CrudModal
        title="Edit Investigator"
        description="Update the investigator's information."
        isOpen={isEditInvestigatorModalOpen}
        onClose={() => setIsEditInvestigatorModalOpen(false)}
      >
        <InvestigatorForm 
          investigator={selectedInvestigator} 
          onSubmit={(data) => {
            handleEditInvestigator(data);
            setIsEditInvestigatorModalOpen(false);
          }} 
        />
      </CrudModal>

      {/* Add Team Modal */}
      <CrudModal
        title="Create New Team"
        description="Create a new investigation team."
        isOpen={isAddTeamModalOpen}
        onClose={() => setIsAddTeamModalOpen(false)}
        size="lg"
      >
        <TeamForm onSubmit={(data) => {
          handleAddTeam(data);
          setIsAddTeamModalOpen(false);
        }} />
      </CrudModal>

      {/* Edit Team Modal */}
      <CrudModal
        title="Edit Team"
        description="Update the team's information and members."
        isOpen={isEditTeamModalOpen}
        onClose={() => setIsEditTeamModalOpen(false)}
        size="lg"
      >
        <TeamForm 
          team={selectedTeam} 
          onSubmit={(data) => {
            handleEditTeam(data);
            setIsEditTeamModalOpen(false);
          }} 
        />
      </CrudModal>
    </div>
  );
};

export default Investigators;
