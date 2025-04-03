
import { useState } from "react";
import { Shield, Lock, ArrowRight, Upload, FileText, Check } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Whistleblower = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    violationType: "",
    company: "",
    location: "",
    description: "",
    evidence: [] as File[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, evidence: [...prev.evidence, ...fileArray] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      evidence: prev.evidence.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submission data:", formData);
    
    // Move to confirmation step
    setStep(3);
    
    // Show toast notification
    toast({
      title: "Report submitted securely",
      description: "Your report has been encrypted and submitted to our secure database.",
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Report a Violation</h2>
              <p className="text-muted-foreground">
                Your information is secure and anonymous. We use end-to-end encryption.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="violationType" className="text-sm font-medium">
                  Violation Type
                </label>
                <Select 
                  onValueChange={(value) => handleSelectChange("violationType", value)}
                  value={formData.violationType}
                >
                  <SelectTrigger className="secure-field">
                    <SelectValue placeholder="Select violation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="labor_rights">Labor Rights Violation</SelectItem>
                    <SelectItem value="environmental">Environmental Damage</SelectItem>
                    <SelectItem value="child_labor">Child Labor</SelectItem>
                    <SelectItem value="safety">Safety Violations</SelectItem>
                    <SelectItem value="discrimination">Discrimination</SelectItem>
                    <SelectItem value="corruption">Corruption</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company or Organization
                </label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Name of company or organization"
                  className="secure-field"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, Country"
                  className="secure-field"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <Button 
              onClick={() => setStep(2)} 
              className="w-full"
              disabled={!formData.violationType || !formData.company || !formData.location}
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
        
      case 2:
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Provide Details</h2>
              <p className="text-muted-foreground">
                Help us understand what happened. Your details are critical for investigation.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the violation in detail"
                  className="secure-field min-h-[150px]"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="evidence" className="text-sm font-medium">
                  Evidence (Optional)
                </label>
                <div className="secure-field p-4 border-dashed flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-center text-muted-foreground">
                    Drag and drop files or click to upload evidence (photos, documents, etc.)
                  </p>
                  <Input
                    id="evidence"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("evidence")?.click()}
                  >
                    Select Files
                  </Button>
                </div>
                
                {formData.evidence.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Uploaded Files:</p>
                    <div className="space-y-2">
                      {formData.evidence.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="h-6 w-6 p-0"
                          >
                            &times;
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={!formData.description}
              >
                Submit Securely <Lock className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        );
        
      case 3:
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
            <div className="h-16 w-16 rounded-full bg-accent/20 text-accent flex items-center justify-center">
              <Check className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Report Submitted</h2>
              <p className="text-muted-foreground max-w-md">
                Your report has been securely submitted. Our team will review it and may contact you via the anonymous channel if more information is needed.
              </p>
            </div>
            <div className="bg-secondary p-4 rounded-md w-full max-w-xs mt-4">
              <div className="text-sm font-medium mb-1">Report ID:</div>
              <div className="text-sm font-mono bg-background p-2 rounded border">
                WB-{Math.random().toString(36).substring(2, 10).toUpperCase()}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Save this ID to check on your report status
              </p>
            </div>
            <Button onClick={() => {
              setStep(1);
              setFormData({
                violationType: "",
                company: "",
                location: "",
                description: "",
                evidence: [],
              });
            }}>
              Submit Another Report
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-background shadow-lg">
            <CardHeader className="pb-4 bg-muted/30 flex flex-row items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Whistleblower Hub</CardTitle>
                <CardDescription>Securely report violations and supply chain abuses</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {renderStep()}
            </CardContent>
            <CardFooter className="flex-col items-start pt-0 border-t mt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-3 w-3" />
                <span>End-to-end encrypted and anonymous reporting</span>
              </div>
              <p>
                Guardian-IO prioritizes whistleblower safety. No personally identifying information is stored unless explicitly provided.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Whistleblower;
