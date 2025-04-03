
import { useState } from "react";
import { Edit, Trash2, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CrudButtonGroupProps {
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  addLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
  compact?: boolean;
  hideAdd?: boolean;
  hideEdit?: boolean;
  hideDelete?: boolean;
}

export function CrudButtonGroup({
  onAdd,
  onEdit,
  onDelete,
  addLabel = "Add New",
  editLabel = "Edit",
  deleteLabel = "Delete",
  compact = false,
  hideAdd = false,
  hideEdit = false,
  hideDelete = false,
}: CrudButtonGroupProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // When in compact mode, show a dropdown menu instead of separate buttons
  if (compact) {
    return (
      <>
        {!hideAdd && onAdd && (
          <Button size="sm" onClick={onAdd} className="mr-2">
            <Plus className="h-4 w-4 mr-1" />
            {addLabel}
          </Button>
        )}
        
        {(onEdit || onDelete) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!hideEdit && onEdit && (
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  {editLabel}
                </DropdownMenuItem>
              )}
              {!hideDelete && onDelete && (
                <DropdownMenuItem 
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {deleteLabel}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        <ConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={onDelete!}
          title="Confirm Deletion"
          description="Are you sure you want to delete this item? This action cannot be undone."
          confirmLabel="Delete"
          variant="destructive"
        />
      </>
    );
  }

  // Default view with separate buttons
  return (
    <>
      {!hideAdd && onAdd && (
        <Button onClick={onAdd} className="mr-2">
          <Plus className="h-4 w-4 mr-2" />
          {addLabel}
        </Button>
      )}
      
      {!hideEdit && onEdit && (
        <Button variant="outline" onClick={onEdit} className="mr-2">
          <Edit className="h-4 w-4 mr-2" />
          {editLabel}
        </Button>
      )}
      
      {!hideDelete && onDelete && (
        <Button 
          variant="outline" 
          className="text-destructive hover:bg-destructive/10"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {deleteLabel}
        </Button>
      )}
      
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={onDelete!}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
      />
    </>
  );
}
