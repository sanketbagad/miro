"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { LayoutDashboard, Menu, Star } from "lucide-react";
import Link from "next/link";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Action } from "@/components/actions";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

interface InfoProps {
  boardId: string;
}

export const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5" />;
};

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) {
    return <InfoSkeleton />;
  }

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to Boards" side="bottom" sideOffset={10}>
        <Button className="px-2" asChild variant="board">
          <Link href="/">
            <Image src="/logo.svg" alt="Convex" width={40} height={40} />
            <span
              className={cn(
                "text-xl ml-2 text-black font-semibold",
                font.className
              )}
            >
              Convex
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit Board" side="bottom" sideOffset={10}>
        <Button
          variant="board"
          className="text-base font-normal px-2"
          onClick={() => onOpen(data?._id, data?.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Action
      id={data._id}
      title={data.title}
      side="bottom"
      sideOffset={10}
      >
        <div>
          <Hint label="Main Menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Action>
    </div>
  );
};

export const InfoSkeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]">
      <Skeleton className="w--full h--full bg-muted-400" />
    </div>
  );
};
