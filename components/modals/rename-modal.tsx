"use client";

import { useRenameModal } from "@/store/use-rename-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutations } from "@/hooks/use-api-mutations";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues?.title);
  const {pending, mutate} = useApiMutations(api.board.update);

useEffect(() => {
    setTitle(initialValues?.title);
}
, [initialValues.title]);

const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({id: initialValues.id, title})
    .then((res) => {
        toast.success("Board renamed successfully");
        onClose();
    })
    .catch((err) => {
        toast.error("Failed to rename board");
    });
}

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Rename Board</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Enter a new name for the board
            </DialogDescription>
            <form onSubmit={onSubmit} className="space-y-4">
                <Input
                disabled={pending}
                required
                maxLength={60}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Board Name"
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={pending}>
                        Rename
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  );
};
