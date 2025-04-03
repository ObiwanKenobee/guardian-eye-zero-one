
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
import { Team, MOCK_INVESTIGATORS } from "@/lib/constants";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  region: z.string().min(1, "Region is required"),
  leadInvestigatorId: z.string().min(1, "Lead investigator is required"),
  memberIds: z.array(z.string()).min(1, "At least one team member is required"),
  specializations: z.array(z.string()).min(1, "At least one specialization is required"),
  status: z.enum(["active", "forming", "standby"]),
});

type FormValues = z.infer<typeof formSchema>;

interface TeamFormProps {
  team?: Team;
  onSubmit: (data: Partial<Team>) => void;
}

export function TeamForm({ team, onSubmit }: TeamFormProps) {
  const [specializationInput, setSpecializationInput] = useState("");
  
  const isEditing = !!team;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: team?.name || "",
      description: team?.description || "",
      region: team?.region || "",
      leadInvestigatorId: team?.leadInvestigatorId || "",
      memberIds: team?.memberIds || [],
      specializations: team?.specializations || [],
      status: team?.status || "forming",
    },
  });
  
  const { control, handleSubmit, watch, setValue, formState } = form;
  const specializations = watch("specializations");
  const memberIds = watch("memberIds");
  const leadInvestigatorId = watch("leadInvestigatorId");

  const addSpecialization = () => {
    if (specializationInput.trim() && !specializations.includes(specializationInput.trim())) {
      setValue("specializations", [...specializations, specializationInput.trim()]);
      setSpecializationInput("");
    }
  };

  const removeSpecialization = (specialization: string) => {
    setValue("specializations", specializations.filter((s) => s !== specialization));
  };

  // Ensure lead investigator is also in the team members list
  const handleLeadChange = (investigatorId: string) => {
    setValue("leadInvestigatorId", investigatorId);
    if (!memberIds.includes(investigatorId)) {
      setValue("memberIds", [...memberIds, investigatorId]);
    }
  };

  // Toggle team member selection
  const toggleMember = (investigatorId: string) => {
    if (memberIds.includes(investigatorId)) {
      // If removing the lead investigator, clear the lead
      if (investigatorId === leadInvestigatorId) {
        setValue("leadInvestigatorId", "");
      }
      setValue("memberIds", memberIds.filter(id => id !== investigatorId));
    } else {
      setValue("memberIds", [...memberIds, investigatorId]);
    }
  };

  const handleFormSubmit = (data: FormValues) => {
    onSubmit({
      ...data,
      id: team?.id || `t${Date.now()}`,
      activeCases: team?.activeCases || 0,
    });
  };

  // Filter out investigators that are not on leave for lead selection
  const activeInvestigators = MOCK_INVESTIGATORS.filter(
    inv => inv.status !== "on-leave"
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Team description and purpose" {...field} className="min-h-[80px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Global, Asia & Pacific" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="forming">Forming</SelectItem>
                  <SelectItem value="standby">Standby</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="leadInvestigatorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead Investigator</FormLabel>
              <Select
                onValueChange={handleLeadChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lead investigator" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {activeInvestigators.map((investigator) => (
                    <SelectItem key={investigator.id} value={investigator.id}>
                      {investigator.name} - {investigator.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="memberIds"
          render={() => (
            <FormItem>
              <FormLabel>Team Members</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 border rounded-md p-2">
                {MOCK_INVESTIGATORS.map((investigator) => (
                  <div
                    key={investigator.id}
                    className={`flex items-center p-2 border rounded ${
                      memberIds.includes(investigator.id) ? "bg-secondary" : ""
                    } ${investigator.status === "on-leave" ? "opacity-50" : ""}`}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{investigator.name}</div>
                      <div className="text-xs text-muted-foreground">{investigator.specialization}</div>
                    </div>
                    <Button
                      type="button"
                      variant={memberIds.includes(investigator.id) ? "default" : "outline"}
                      onClick={() => toggleMember(investigator.id)}
                      size="sm"
                      disabled={investigator.status === "on-leave"}
                    >
                      {memberIds.includes(investigator.id) ? "Selected" : "Select"}
                    </Button>
                  </div>
                ))}
              </div>
              {memberIds.length === 0 && (
                <FormMessage>At least one team member is required</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="specializations"
          render={() => (
            <FormItem>
              <FormLabel>Specializations</FormLabel>
              <div className="flex space-x-2">
                <Input
                  value={specializationInput}
                  onChange={(e) => setSpecializationInput(e.target.value)}
                  placeholder="Add a specialization"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSpecialization();
                    }
                  }}
                />
                <Button type="button" onClick={addSpecialization} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {specializations.map((specialization) => (
                  <Badge key={specialization} variant="secondary" className="flex items-center gap-1">
                    {specialization}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeSpecialization(specialization)}
                      className="h-4 w-4 p-0 ml-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              {specializations.length === 0 && (
                <FormMessage>At least one specialization is required</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEditing ? "Update Team" : "Create Team"}
        </Button>
      </form>
    </Form>
  );
}
