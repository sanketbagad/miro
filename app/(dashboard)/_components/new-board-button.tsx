"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutations } from "@/hooks/use-api-mutations";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NeWBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}
export const NeWBoardButton = ({ orgId, disabled }: NeWBoardButtonProps) => {
  const { pending, mutate } = useApiMutations(api.board.create);
  const onClick = () => {
    mutate({ orgId, title: "New Board" })
      .then((res) => {
        toast.success("Board created successfully");
      })
      .catch((err) => {
        toast.error("Failed to create board");
      });
  };

  return (
    <button
      disabled={disabled || pending}
      onClick={() => {}}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        pending || (disabled && "opacity-75 ")
      )}
    >
      <div className="flex flex-col items-center" onClick={onClick}>
        <Plus className="h-12 w-12 text-white stroke-1" />
        <p className="text-white text-sm font-light">New Board</p>
      </div>
    </button>
  );
};