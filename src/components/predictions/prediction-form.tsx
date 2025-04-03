
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { RiskPrediction } from "@/lib/constants";

const formSchema = z.object({
  region: z.string().min(1, "Region is required"),
  industry: z.string().min(1, "Industry is required"),
  riskScore: z.number().min(1).max(100),
  riskLevel: z.enum(["low", "medium", "high"]),
  trend: z.enum(["increasing", "stable", "decreasing"]),
  factors: z.array(z.string()).min(1, "At least one factor is required"),
  relatedCompanies: z.array(z.string()).min(1, "At least one company is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface PredictionFormProps {
  prediction?: RiskPrediction;
  onSubmit: (data: Partial<RiskPrediction>) => void;
}

export function PredictionForm({ prediction, onSubmit }: PredictionFormProps) {
  const [factorInput, setFactorInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  
  const isEditing = !!prediction;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: prediction?.region || "",
      industry: prediction?.industry || "",
      riskScore: prediction?.riskScore || 50,
      riskLevel: prediction?.riskLevel || "medium",
      trend: prediction?.trend || "stable",
      factors: prediction?.factors || [],
      relatedCompanies: prediction?.relatedCompanies || [],
    },
  });
  
  const { control, handleSubmit, watch, setValue } = form;
  const factors = watch("factors");
  const relatedCompanies = watch("relatedCompanies");

  const addFactor = () => {
    if (factorInput.trim() && !factors.includes(factorInput.trim())) {
      setValue("factors", [...factors, factorInput.trim()]);
      setFactorInput("");
    }
  };

  const removeFactor = (factor: string) => {
    setValue("factors", factors.filter(f => f !== factor));
  };

  const addCompany = () => {
    if (companyInput.trim() && !relatedCompanies.includes(companyInput.trim())) {
      setValue("relatedCompanies", [...relatedCompanies, companyInput.trim()]);
      setCompanyInput("");
    }
  };

  const removeCompany = (company: string) => {
    setValue("relatedCompanies", relatedCompanies.filter(c => c !== company));
  };

  const handleFormSubmit = (data: FormValues) => {
    onSubmit({
      ...data,
      id: prediction?.id || `r${Date.now()}`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Southeast Asia, West Africa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Textile Manufacturing, Mining" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="riskScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Risk Score (1-100)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min={1} 
                  max={100} 
                  placeholder="Enter risk score" 
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="riskLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="trend"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trend</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trend" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="increasing">Increasing</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="decreasing">Decreasing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="factors"
          render={() => (
            <FormItem>
              <FormLabel>Risk Factors</FormLabel>
              <div className="flex space-x-2">
                <Input
                  value={factorInput}
                  onChange={(e) => setFactorInput(e.target.value)}
                  placeholder="Add a risk factor"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addFactor();
                    }
                  }}
                />
                <Button type="button" onClick={addFactor} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {factors.map((factor) => (
                  <Badge key={factor} variant="secondary" className="flex items-center gap-1">
                    {factor}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeFactor(factor)}
                      className="h-4 w-4 p-0 ml-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              {factors.length === 0 && (
                <FormMessage>At least one risk factor is required</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="relatedCompanies"
          render={() => (
            <FormItem>
              <FormLabel>Related Companies</FormLabel>
              <div className="flex space-x-2">
                <Input
                  value={companyInput}
                  onChange={(e) => setCompanyInput(e.target.value)}
                  placeholder="Add a company"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCompany();
                    }
                  }}
                />
                <Button type="button" onClick={addCompany} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {relatedCompanies.map((company) => (
                  <Badge key={company} variant="secondary" className="flex items-center gap-1">
                    {company}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeCompany(company)}
                      className="h-4 w-4 p-0 ml-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              {relatedCompanies.length === 0 && (
                <FormMessage>At least one related company is required</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEditing ? "Update Risk Prediction" : "Create Risk Prediction"}
        </Button>
      </form>
    </Form>
  );
}
