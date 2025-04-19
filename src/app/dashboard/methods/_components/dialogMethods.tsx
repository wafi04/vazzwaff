import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormMethods } from "./form-methods";
import { CreateMethod } from "@/schemas/methods";
import { useDeleteMethods } from "../api/server";
import { Button } from "@/components/ui/button";

interface DialogMethodsProps {
  open: boolean;
  onClose: (open: boolean) => void; // Changed from onClose to onClose for consistency
  title: string;
  description: string;
  onSubmit: (data: CreateMethod) => void;
  initialData?: Partial<CreateMethod>; // Added initialData for edit functionality
  isLoading?: boolean; // Added isLoading prop
}

export default function DialogMethods({
  open,
  onClose,
  title,
  description,
  onSubmit,
  initialData,
  isLoading = false,
}: DialogMethodsProps) {
  const handleClose = () => onClose(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            {description}
          </DialogDescription>
        </DialogHeader>
        <FormMethods
          onSubmit={onSubmit}
          initialData={initialData}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}

interface DeleteMethodsProps {
  methodId: number;
  open: boolean;
  setOpen: (open: boolean) => void; // Changed from onClose to setOpen for consistency
}

export function DialogDeleteMethods({
  methodId,
  open,
  setOpen,
}: DeleteMethodsProps) {
  const deleteMethod = useDeleteMethods(methodId);

  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      deleteMethod.mutate();
      handleClose(); // Close dialog after successful deletion
    } catch (error) {
      console.error("Failed to delete method:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Apakah anda yakin ingin menghapus metode pembayaran ini?
          </DialogTitle>
          <DialogDescription>
            Metode pembayaran ini akan dihapus secara permanen dan tidak dapat
            dikembalikan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-end gap-5">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMethod.isPending}
          >
            {deleteMethod.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
