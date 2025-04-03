
import { useState } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RiskPredictionCard } from "@/components/dashboard/risk-prediction-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_RISK_PREDICTIONS, RiskPrediction } from "@/lib/constants";
import { CrudModal } from "@/components/shared/crud-modal";
import { PredictionForm } from "@/components/predictions/prediction-form";
import { useToast } from "@/hooks/use-toast";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";

const Predictions = () => {
  const { toast } = useToast();
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [predictions, setPredictions] = useState([...MOCK_RISK_PREDICTIONS]);
  
  // Modal states
  const [isAddPredictionModalOpen, setIsAddPredictionModalOpen] = useState(false);
  const [isEditPredictionModalOpen, setIsEditPredictionModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<RiskPrediction | undefined>(undefined);

  // Filter predictions based on current filters
  const filteredPredictions = predictions.filter((prediction) => {
    // Apply risk level filter
    if (riskFilter !== "all" && prediction.riskLevel !== riskFilter) {
      return false;
    }
    
    // Apply industry filter
    if (
      industryFilter !== "all" &&
      !prediction.industry.toLowerCase().includes(industryFilter.toLowerCase())
    ) {
      return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        prediction.region.toLowerCase().includes(query) ||
        prediction.industry.toLowerCase().includes(query) ||
        prediction.relatedCompanies.some(company => 
          company.toLowerCase().includes(query)
        )
      );
    }
    
    return true;
  });

  // Get unique industries for filter dropdown
  const industries = [...new Set(predictions.map(p => p.industry))];

  // CRUD Operations
  const handleAddPrediction = (data: Partial<RiskPrediction>) => {
    const newPrediction = data as RiskPrediction;
    setPredictions([...predictions, newPrediction]);
    toast({
      title: "Risk Prediction Created",
      description: `New risk prediction for ${newPrediction.industry} in ${newPrediction.region} has been created.`,
    });
  };

  const handleEditPrediction = (data: Partial<RiskPrediction>) => {
    const updatedPrediction = { ...selectedPrediction, ...data } as RiskPrediction;
    setPredictions(predictions.map(p => 
      p.id === updatedPrediction.id ? updatedPrediction : p
    ));
    toast({
      title: "Risk Prediction Updated",
      description: `The risk prediction has been updated successfully.`,
    });
  };

  const handleDeletePrediction = () => {
    if (!selectedPrediction) return;
    
    setPredictions(predictions.filter(p => p.id !== selectedPrediction.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Risk Prediction Removed",
      description: `The risk prediction has been removed from the system.`,
    });
  };

  // Handler functions
  const openEditPrediction = (prediction: RiskPrediction) => {
    setSelectedPrediction(prediction);
    setIsEditPredictionModalOpen(true);
  };

  const openDeleteDialog = (prediction: RiskPrediction) => {
    setSelectedPrediction(prediction);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-bold text-3xl mb-2">AI Risk Predictions</h1>
            <p className="text-muted-foreground">
              Machine learning-driven analytics to identify potential violations before they happen
            </p>
          </div>
          <Button 
            onClick={() => setIsAddPredictionModalOpen(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>Create Prediction</span>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by region, industry, or company..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Predictions</TabsTrigger>
              <TabsTrigger value="increasing">Increasing Risk</TabsTrigger>
              <TabsTrigger value="stable">Stable Risk</TabsTrigger>
              <TabsTrigger value="decreasing">Decreasing Risk</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredPredictions.map((prediction) => (
                  <RiskPredictionCard 
                    key={prediction.id} 
                    prediction={prediction}
                    onEdit={() => openEditPrediction(prediction)}
                    onDelete={() => openDeleteDialog(prediction)} 
                  />
                ))}
                {filteredPredictions.length === 0 && (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                    <p className="text-muted-foreground mb-2">No predictions match your filters</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setRiskFilter("all");
                        setIndustryFilter("all");
                        setSearchQuery("");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="increasing" className="pt-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredPredictions
                  .filter((p) => p.trend === "increasing")
                  .map((prediction) => (
                    <RiskPredictionCard 
                      key={prediction.id} 
                      prediction={prediction} 
                      onEdit={() => openEditPrediction(prediction)}
                      onDelete={() => openDeleteDialog(prediction)}
                    />
                  ))}
                {filteredPredictions.filter((p) => p.trend === "increasing").length === 0 && (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                    <p className="text-muted-foreground">No increasing risk predictions found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="stable" className="pt-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredPredictions
                  .filter((p) => p.trend === "stable")
                  .map((prediction) => (
                    <RiskPredictionCard 
                      key={prediction.id} 
                      prediction={prediction}
                      onEdit={() => openEditPrediction(prediction)}
                      onDelete={() => openDeleteDialog(prediction)}
                    />
                  ))}
                {filteredPredictions.filter((p) => p.trend === "stable").length === 0 && (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                    <p className="text-muted-foreground">No stable risk predictions found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="decreasing" className="pt-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredPredictions
                  .filter((p) => p.trend === "decreasing")
                  .map((prediction) => (
                    <RiskPredictionCard 
                      key={prediction.id} 
                      prediction={prediction}
                      onEdit={() => openEditPrediction(prediction)}
                      onDelete={() => openDeleteDialog(prediction)}
                    />
                  ))}
                {filteredPredictions.filter((p) => p.trend === "decreasing").length === 0 && (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                    <p className="text-muted-foreground">No decreasing risk predictions found</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Prediction Modal */}
      <CrudModal
        title="Create Risk Prediction"
        description="Add a new AI-generated risk prediction to the system."
        isOpen={isAddPredictionModalOpen}
        onClose={() => setIsAddPredictionModalOpen(false)}
      >
        <PredictionForm onSubmit={(data) => {
          handleAddPrediction(data);
          setIsAddPredictionModalOpen(false);
        }} />
      </CrudModal>

      {/* Edit Prediction Modal */}
      <CrudModal
        title="Edit Risk Prediction"
        description="Update the risk prediction information."
        isOpen={isEditPredictionModalOpen}
        onClose={() => setIsEditPredictionModalOpen(false)}
      >
        <PredictionForm 
          prediction={selectedPrediction} 
          onSubmit={(data) => {
            handleEditPrediction(data);
            setIsEditPredictionModalOpen(false);
          }} 
        />
      </CrudModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeletePrediction}
        title="Delete Risk Prediction"
        description={`Are you sure you want to delete this risk prediction for ${selectedPrediction?.industry} in ${selectedPrediction?.region}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
  );
};

export default Predictions;
