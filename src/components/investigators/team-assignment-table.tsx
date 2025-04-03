
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Team, Investigator } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

interface TeamAssignmentTableProps {
  team: Team;
  investigators?: Investigator[];
}

export function TeamAssignmentTable({ team, investigators = [] }: TeamAssignmentTableProps) {
  // Get team members
  const teamMembers = investigators.filter(inv => team.memberIds.includes(inv.id));
  
  // Check if an investigator is the team lead
  const isTeamLead = (investigatorId: string) => investigatorId === team.leadInvestigatorId;

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Investigator</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Active Cases</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                {member.name}
                {isTeamLead(member.id) && (
                  <Badge variant="outline" className="ml-2">
                    Lead
                  </Badge>
                )}
              </TableCell>
              <TableCell>{isTeamLead(member.id) ? "Team Lead" : "Investigator"}</TableCell>
              <TableCell>{member.specialization}</TableCell>
              <TableCell>
                <Badge 
                  variant={member.status === "active" ? "default" : 
                    member.status === "on-leave" ? "destructive" : "secondary"}
                >
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell>{member.activeCases}</TableCell>
            </TableRow>
          ))}
          
          {teamMembers.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No team members assigned
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
