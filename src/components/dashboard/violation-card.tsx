
import { Clock, MapPin, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Violation, STATUS_BADGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ViolationCardProps {
  violation: Violation;
}

export function ViolationCard({ violation }: ViolationCardProps) {
  const statusClass = STATUS_BADGES[violation.status];
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-block w-2 h-2 rounded-full",
                  violation.riskLevel === "high"
                    ? "bg-red-500"
                    : violation.riskLevel === "medium"
                    ? "bg-amber-500"
                    : "bg-green-500"
                )}
              />
              <span className="text-sm font-medium text-muted-foreground">
                {violation.id}
              </span>
            </div>
            <h3 className="font-semibold text-base">{violation.title}</h3>
          </div>
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              statusClass
            )}
          >
            {violation.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {violation.description}
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{violation.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              {new Date(violation.reportedDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{violation.reportCount} reports</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            <span>{violation.evidenceCount} evidence</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-xs font-medium mb-1">{violation.company}</div>
          <div className="flex flex-wrap gap-2">
            {violation.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-sm bg-secondary text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
