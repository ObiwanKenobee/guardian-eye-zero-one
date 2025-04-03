
import { Shield, Bell, Flag, FileText } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ViolationCard } from "@/components/dashboard/violation-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RiskPredictionCard } from "@/components/dashboard/risk-prediction-card";
import { MOCK_VIOLATIONS, MOCK_RISK_PREDICTIONS } from "@/lib/constants";

const Dashboard = () => {
  // Filter recent and high-risk violations
  const recentViolations = MOCK_VIOLATIONS.slice(0, 4);
  const highRiskViolations = MOCK_VIOLATIONS.filter(v => v.riskLevel === 'high').slice(0, 3);
  
  // Get top risk predictions
  const topRiskPredictions = MOCK_RISK_PREDICTIONS.sort((a, b) => b.riskScore - a.riskScore).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-8">
        <div>
          <h1 className="font-bold text-3xl mb-2">Investigation Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of human rights violations and ethical supply chain risks
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Active Investigations"
            value={24}
            description="Currently being investigated"
            icon={<Shield className="h-4 w-4" />}
            change={{ value: "12% from last month", positive: true }}
          />
          <StatsCard
            title="High Risk Cases"
            value={8}
            description="Requiring immediate attention"
            icon={<Flag className="h-4 w-4" />}
            change={{ value: "3 new this week", positive: false }}
          />
          <StatsCard
            title="New Reports"
            value={37}
            description="In the last 7 days"
            icon={<FileText className="h-4 w-4" />}
            change={{ value: "8% from last week", positive: true }}
          />
          <StatsCard
            title="Pending Alerts"
            value={12}
            description="Waiting for assignment"
            icon={<Bell className="h-4 w-4" />}
            change={{ value: "5 cleared today", positive: true }}
          />
        </div>

        {/* Recent Violations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-xl">Recent Violations</h2>
            <a href="#" className="text-sm font-medium text-primary hover:underline">
              View all
            </a>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {recentViolations.map((violation) => (
              <ViolationCard key={violation.id} violation={violation} />
            ))}
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* High Risk Cases */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-xl">High Risk Cases</h2>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                View all
              </a>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {highRiskViolations.map((violation) => (
                <ViolationCard key={violation.id} violation={violation} />
              ))}
            </div>
          </div>

          {/* AI Risk Predictions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-xl">Risk Predictions</h2>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                View all
              </a>
            </div>
            <div className="space-y-4">
              {topRiskPredictions.map((prediction) => (
                <RiskPredictionCard key={prediction.id} prediction={prediction} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
