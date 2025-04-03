
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Team, MOCK_INVESTIGATORS } from "@/lib/constants";

interface TeamAssignmentTableProps {
  team: Team;
}

export function TeamAssignmentTable({ team }: TeamAssignmentTableProps) {
  // Get all team members based on the team's member IDs
  const teamMembers = MOCK_INVESTIGATORS.filter(investigator => 
    team.memberIds.includes(investigator.id)
  );

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Team Members ({teamMembers.length})</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Active Cases</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.specialization}</TableCell>
              <TableCell>
                <Badge 
                  variant={member.status === "active" ? "default" : "secondary"}
                  className="whitespace-nowrap"
                >
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell>{member.location}</TableCell>
              <TableCell>{member.activeCases}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Reassign</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
