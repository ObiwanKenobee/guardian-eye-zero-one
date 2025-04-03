
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon,
  change 
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && (
          <div className="h-6 w-6 text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
      {change && (
        <CardFooter className="p-2 pt-0">
          <span className={`text-xs font-medium ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
            {change.positive ? '↑' : '↓'} {change.value}
          </span>
        </CardFooter>
      )}
    </Card>
  );
}
