
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Investigator } from "@/lib/constants";
import { UserRound, MapPin, Calendar, Briefcase, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";

interface InvestigatorCardProps {
  investigator: Investigator;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function InvestigatorCard({ investigator, onEdit, onDelete }: InvestigatorCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "on-leave":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "training":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    onDelete?.();
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <Badge className={getStatusBadge(investigator.status)}>
                {investigator.status}
              </Badge>
              {investigator.activeCases > 0 && (
                <Badge variant="outline" className="ml-2">
                  {investigator.activeCases} active {investigator.activeCases === 1 ? "case" : "cases"}
                </Badge>
              )}
            </div>
            <h3 className="font-bold text-lg">{investigator.name}</h3>
            <p className="text-sm text-muted-foreground">{investigator.specialization}</p>
          </div>

          {(onEdit || onDelete) && (
            <div className="flex gap-2">
              {onEdit && (
                <Button variant="ghost" size="icon" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{investigator.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Joined {investigator.joinDate}</span>
          </div>
          {investigator.teamName && (
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{investigator.teamName}</span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="text-sm font-medium mb-1">Skills</div>
          <div className="flex flex-wrap gap-1">
            {investigator.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm">
          <UserRound className="mr-2 h-4 w-4" />
          View Profile
        </Button>
        <Button size="sm">
          Assign Case
        </Button>
      </CardFooter>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Remove Investigator"
        description={`Are you sure you want to remove ${investigator.name} from the system? This action cannot be undone.`}
        confirmLabel="Remove"
        variant="destructive"
      />
    </Card>
  );
}
