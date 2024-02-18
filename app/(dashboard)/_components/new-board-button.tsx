"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutations } from "@/hooks/use-api-mutations";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NeWBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}
export const NeWBoardButton = ({ orgId, disabled }: NeWBoardButtonProps) => {
  const { pending, mutate } = useApiMutations(api.board.create);
  const router = useRouter();
  // generate random board names for the new board

  
  const onClick = () => {
    mutate({ orgId, title: new Array(10).fill(0).map(() => Math.random().toString(36)[2]).join("") })
      .then((res) => {
        toast.success("Board created successfully");
        router.push(`/board/${res}`);
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
        pending || (disabled && "opacity-75 hover:bg-blue-600 cursor-not-allowed")
      )}
    >
      <div className="flex flex-col items-center" onClick={onClick}>
        <Plus className="h-12 w-12 text-white stroke-1" />
        <p className="text-white text-sm font-light">New Board</p>
      </div>
    </button>
  );
};
