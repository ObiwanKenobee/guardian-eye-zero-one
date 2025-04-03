
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RiskPrediction } from "@/lib/constants";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

interface RiskPredictionCardProps {
  prediction: RiskPrediction;
}

export function RiskPredictionCard({ prediction }: RiskPredictionCardProps) {
  const getTrendIcon = () => {
    switch (prediction.trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      case "stable":
        return <Minus className="h-4 w-4 text-amber-500" />;
    }
  };

  const getRiskColor = () => {
    switch (prediction.riskLevel) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-base">
            {prediction.region} - {prediction.industry}
          </h3>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className="text-sm font-medium">{prediction.trend}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Risk Score</span>
            <span className={`text-sm font-bold ${getRiskColor()}`}>
              {prediction.riskScore}/100
            </span>
          </div>
          <Progress
            value={prediction.riskScore}
            className="h-2"
            indicatorClassName={
              prediction.riskLevel === "high"
                ? "bg-red-500"
                : prediction.riskLevel === "medium"
                ? "bg-amber-500"
                : "bg-green-500"
            }
          />
        </div>
        <div className="space-y-2">
          <div>
            <h4 className="text-xs font-medium mb-1">Key Risk Factors:</h4>
            <div className="flex flex-wrap gap-1">
              {prediction.factors.map((factor) => (
                <span
                  key={factor}
                  className="inline-flex items-center px-2 py-0.5 rounded-sm bg-secondary text-xs"
                >
                  {factor}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium mb-1">Related Companies:</h4>
            <div className="text-xs text-muted-foreground">
              {prediction.relatedCompanies.join(", ")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
