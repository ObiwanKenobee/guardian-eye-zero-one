
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Bell, 
  Building, 
  Calendar, 
  MapPin, 
  Tags,
  Clock
} from "lucide-react";
import { Alert } from "@/lib/constants";
import { formatDistanceToNow } from "date-fns";

interface AlertCardProps {
  alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
  const alertDate = new Date(alert.timestamp);
  const timeAgo = formatDistanceToNow(alertDate, { addSuffix: true });

  return (
    <Card className={alert.read ? "" : "border-l-4 border-l-primary"}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <Badge 
              variant={getPriorityVariant(alert.priority)}
              className="mb-1"
            >
              {alert.priority} priority
            </Badge>
            <h3 className="font-semibold text-lg">{alert.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {timeAgo}
            </div>
          </div>
          {!alert.read && (
            <span className="h-2 w-2 rounded-full bg-primary" title="Unread alert"></span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm mb-4">{alert.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{alert.company}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{alert.location}</span>
          </div>
          {alert.tags && alert.tags.length > 0 && (
            <div className="flex items-start text-sm">
              <Tags className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-1">
                {alert.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-secondary/50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex gap-2">
        <Button variant={alert.read ? "outline" : "default"} className="flex-1">
          <Bell className="mr-2 h-4 w-4" />
          {alert.read ? "Mark as Unread" : "Mark as Read"}
        </Button>
        <Button 
          variant="default" 
          className="flex-1"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Investigate
        </Button>
      </CardFooter>
    </Card>
  );
}

function getPriorityVariant(priority: string): "default" | "destructive" | "outline" | "secondary" {
  switch (priority) {
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "secondary";
    default:
      return "outline";
  }
}
