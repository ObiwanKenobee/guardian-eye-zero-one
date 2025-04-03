
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RiskPrediction } from "@/lib/constants";
import { Building, TrendingDown, TrendingUp, Minus, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RiskPredictionCardProps {
  prediction: RiskPrediction;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function RiskPredictionCard({ 
  prediction,
  onEdit,
  onDelete
}: RiskPredictionCardProps) {
  const { riskScore, riskLevel, region, industry, trend, factors, relatedCompanies } = prediction;
  
  const getTrendIcon = () => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-destructive" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      case "stable":
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };
  
  const getRiskLevelColor = () => {
    switch (riskLevel) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-green-500";
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={
                riskLevel === "high" ? "destructive" : 
                riskLevel === "medium" ? "default" : 
                "secondary"
              }>
                {riskLevel} risk
              </Badge>
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span className="text-xs font-medium">{trend}</span>
              </div>
            </div>
            <h3 className="font-bold text-lg">{industry}</h3>
            <p className="text-sm text-muted-foreground">{region}</p>
          </div>
          
          {(onEdit || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Prediction
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem 
                    onClick={onDelete}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Prediction
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium">Risk Score</span>
            <span className="text-sm font-bold">{riskScore}/100</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full ${getRiskLevelColor()}`} 
              style={{ width: `${riskScore}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Risk Factors:</h4>
          <ul className="text-sm space-y-1 mb-3">
            {factors.map((factor, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Related Companies:</h4>
          <div className="flex flex-wrap gap-1">
            {relatedCompanies.map((company, index) => (
              <Badge key={index} variant="outline" className="bg-secondary/50">
                {company}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Button size="sm" className="w-full">
          <Building className="mr-2 h-4 w-4" />
          View Detailed Analysis
        </Button>
      </CardFooter>
    </Card>
  );
}
