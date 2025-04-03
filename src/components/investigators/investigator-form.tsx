
import { useState, useEffect } from "react";
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
import { Investigator, MOCK_TEAMS } from "@/lib/constants";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  specialization: z.string().min(1, "Specialization is required"),
  location: z.string().min(1, "Location is required"),
  joinDate: z.string().optional(),
  status: z.enum(["active", "on-leave", "training"]),
  teamId: z.string().optional(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface InvestigatorFormProps {
  investigator?: Investigator;
  onSubmit: (data: Partial<Investigator>) => void;
}

export function InvestigatorForm({ investigator, onSubmit }: InvestigatorFormProps) {
  const [skillInput, setSkillInput] = useState("");
  
  const isEditing = !!investigator;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: investigator?.name || "",
      specialization: investigator?.specialization || "",
      location: investigator?.location || "",
      joinDate: investigator?.joinDate || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      status: investigator?.status || "active",
      teamId: investigator?.teamId || "",
      skills: investigator?.skills || [],
    },
  });
  
  const { control, handleSubmit, watch, setValue, formState } = form;
  const skills = watch("skills");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setValue("skills", [...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setValue("skills", skills.filter((s) => s !== skill));
  };

  const handleFormSubmit = (data: FormValues) => {
    onSubmit({
      ...data,
      id: investigator?.id || `i${Date.now()}`,
      activeCases: investigator?.activeCases || 0,
      teamName: MOCK_TEAMS.find(team => team.id === data.teamId)?.name || "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter investigator's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Labor Rights Specialist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="City, Country" {...field} />
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
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="teamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MOCK_TEAMS.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
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
          name="skills"
          render={() => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <div className="flex space-x-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeSkill(skill)}
                      className="h-4 w-4 p-0 ml-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              {skills.length === 0 && (
                <FormMessage>At least one skill is required</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEditing ? "Update Investigator" : "Add Investigator"}
        </Button>
      </form>
    </Form>
  );
}
