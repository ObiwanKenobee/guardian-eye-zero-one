
import { Alert } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { 
  AlertTriangle, 
  Bell, 
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2 
} from "lucide-react";
import { useState } from "react";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AlertTimelineProps {
  alerts: Alert[];
  onMarkAsRead?: (alert: Alert) => void;
  onMarkAsUnread?: (alert: Alert) => void;
  onEdit?: (alert: Alert) => void;
  onDelete?: (alert: Alert) => void;
}

export function AlertTimeline({ 
  alerts,
  onMarkAsRead,
  onMarkAsUnread,
  onEdit,
  onDelete
}: AlertTimelineProps) {
  // Sort alerts by timestamp (newest first)
  const sortedAlerts = [...alerts].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Group alerts by date
  const alertsByDate = sortedAlerts.reduce((groups, alert) => {
    const date = format(new Date(alert.timestamp), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(alert);
    return groups;
  }, {} as Record<string, Alert[]>);

  return (
    <div className="space-y-8">
      {Object.entries(alertsByDate).map(([date, dateAlerts]) => (
        <div key={date} className="space-y-4">
          <h3 className="font-medium">
            {format(new Date(date), 'EEEE, MMMM d, yyyy')}
          </h3>
          <div className="border-l-2 border-border pl-6 space-y-6">
            {dateAlerts.map((alert) => (
              <div key={alert.id} className="relative">
                <div className={`absolute -left-9 w-3 h-3 rounded-full ${
                  alert.read ? 'bg-secondary' : 'bg-primary'
                }`} />
                <TimelineAlert 
                  alert={alert} 
                  onMarkAsRead={onMarkAsRead ? () => onMarkAsRead(alert) : undefined}
                  onMarkAsUnread={onMarkAsUnread ? () => onMarkAsUnread(alert) : undefined}
                  onEdit={onEdit ? () => onEdit(alert) : undefined}
                  onDelete={onDelete ? () => onDelete(alert) : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface TimelineAlertProps {
  alert: Alert;
  onMarkAsRead?: () => void;
  onMarkAsUnread?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

function TimelineAlert({ 
  alert,
  onMarkAsRead,
  onMarkAsUnread,
  onEdit,
  onDelete
}: TimelineAlertProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const timeFormatted = format(new Date(alert.timestamp), 'h:mm a');
  
  const handleReadToggle = () => {
    if (alert.read) {
      onMarkAsUnread?.();
    } else {
      onMarkAsRead?.();
    }
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    onDelete?.();
  };

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <Badge 
            variant={getPriorityVariant(alert.priority)}
            className="mb-1.5"
          >
            {alert.priority} priority
          </Badge>
          <h4 className="font-medium text-base">{alert.title}</h4>
        </div>
        <div className="flex items-start">
          <span className="text-sm text-muted-foreground">{timeFormatted}</span>
          {(onEdit || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Alert
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem 
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Alert
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      <p className="text-sm mb-3">{alert.description}</p>
      
      <div className="text-sm text-muted-foreground mb-3">
        <span className="font-medium">Source:</span> {alert.company} • {alert.location}
      </div>
      
      {alert.tags && alert.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {alert.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-secondary/50 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      <div className="flex gap-2 mt-2">
        {onMarkAsRead && onMarkAsUnread && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={handleReadToggle}
          >
            <Bell className="h-3.5 w-3.5 mr-1" />
            {alert.read ? "Mark as Unread" : "Mark as Read"}
          </Button>
        )}
        <Button size="sm" className="h-8" variant="default">
          <AlertTriangle className="h-3.5 w-3.5 mr-1" />
          Investigate
        </Button>
        <Button size="sm" className="h-8 ml-auto" variant="ghost">
          Details
          <ChevronRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Alert"
        description="Are you sure you want to delete this alert? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
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
