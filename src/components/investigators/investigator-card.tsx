
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Shield, 
  UserCheck 
} from "lucide-react";
import { Investigator } from "@/lib/constants";

interface InvestigatorCardProps {
  investigator: Investigator;
}

export function InvestigatorCard({ investigator }: InvestigatorCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-0">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getAvatarColorClass(investigator.status)}`}>
              {investigator.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{investigator.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="mr-1 h-3 w-3" />
                {investigator.specialization}
              </div>
            </div>
          </div>
          <Badge variant={investigator.status === "active" ? "default" : "secondary"}>
            {investigator.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-4 flex-grow">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{investigator.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{investigator.teamName || "Unassigned"}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Joined {investigator.joinDate}</span>
          </div>
          <div className="flex items-center text-sm">
            <UserCheck className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{investigator.activeCases} active cases</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Skills & Expertise</h4>
          <div className="flex flex-wrap gap-1">
            {investigator.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-secondary/50">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex gap-2">
        <Button variant="outline" className="flex-1">View Profile</Button>
        <Button className="flex-1">Assign Case</Button>
      </CardFooter>
    </Card>
  );
}

function getAvatarColorClass(status: string): string {
  switch (status) {
    case "active":
      return "bg-green-600";
    case "on-leave":
      return "bg-amber-600";
    case "training":
      return "bg-blue-600";
    default:
      return "bg-slate-600";
  }
}
