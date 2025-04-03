
import { useState, ReactNode } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CrudModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function CrudModal({
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  submitLabel = "Save",
  children,
  size = "md",
}: CrudModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!onSubmit) return onClose();
    
    setIsSubmitting(true);
    try {
      await onSubmit();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Map size to appropriate class
  const sizeClass = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[size];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${sizeClass} p-0 overflow-hidden`}>
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {description && (
            <DialogDescription className="text-sm text-muted-foreground pt-2">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="px-6 py-4">{children}</div>
        
        {onSubmit && (
          <DialogFooter className="bg-muted/20 px-6 py-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
