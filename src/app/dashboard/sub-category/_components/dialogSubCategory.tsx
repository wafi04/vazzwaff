import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormSubCategory,
  FormValuesSubCategory,
} from "@/types/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { CreateCategory } from "@/schemas/category";
import {
  useDeleteCategory,
  useFilterCategory,
} from "../../category/api/server";
import { useCreateSubCategories, useDeleteSubCategory } from "../api/server";

interface DialogSubCategoryProps {
  children: ReactNode;
  initialData?: CreateCategory & { id: number };
  onSuccess?: () => void;
}

export default function DialogSubCategory({
  children,
  initialData,
  onSuccess,
}: DialogSubCategoryProps) {
  const [open, setOpen] = useState(false);
  const createSub = useCreateSubCategories();
  const isEditing = !!initialData;
  const { data, error, isLoading } = useFilterCategory({
    status: "active",
    limit: 100,
    page: 1,
  });

  const form = useForm<FormValuesSubCategory>({
    resolver: zodResolver(FormSubCategory),
    defaultValues: initialData || {
      active: false,
      code: "",
      name: "",
      categoryId: undefined,
    },
  });

  function onSubmit() {
    const values = form.getValues();
    createSub.mutate({
      name: values.name,
      code: values.code,
      categoryId: values.categoryId,
      active: values.active,
    });
  }

  const isSubmit = createSub.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Sub Category" : "Create Sub Category"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              placeholder="Enter code"
              {...form.register("code")}
            />
            {form.formState.errors.code && (
              <p className="text-sm text-red-500">
                {form.formState.errors.code.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Add Categories Select Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) =>
                form.setValue("categoryId", Number(value))
              }
              defaultValue={initialData?.id.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="max-h-40">
                {data &&
                  data?.data.categories?.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {form.formState.errors.categoryId && (
              <p className="text-sm text-red-500">
                {form.formState.errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value) =>
                form.setValue("active", value === "active")
              }
              defaultValue={form.getValues("active") ? "active" : "inactive"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={onSubmit} disabled={isSubmit}>
              {isEditing
                ? isSubmit
                  ? "Updating..."
                  : "Update"
                : isSubmit
                ? "Creating..."
                : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DialogSubDeleteCategory({
  children,
  id,
}: {
  children: ReactNode;
  id: number;
}) {
  const [open, setOpen] = useState(false);
  const deleteSub = useDeleteSubCategory(id);

  const handleDelete = () => {
    deleteSub.mutate();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete SubCategory </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this sub category? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
          <Button variant="outline" className="mt-2 sm:mt-0">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {deleteSub.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
