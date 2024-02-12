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

export const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Rename Board</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Enter a new name for the board
            </DialogDescription>
        </DialogContent>
    </Dialog>
  );
};
