"use client";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Action } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutations } from "@/hooks/use-api-mutations";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  imageUrl: string;
  authorId: string;
  createdAt: number;
  isFavourite?: boolean;
  orgId: string;
}

export const BoardCard = ({
  id,
  title,
  authorName,
  imageUrl,
  authorId,
  createdAt,
  isFavourite,
  orgId,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const { mutate: onFav, pending: onFavPending } = useApiMutations(
    api.board.favourite
  );
  const { mutate: onUnfav, pending: onUnfavPending } = useApiMutations(
    api.board.unfavourite
  );

  const authorLabel = authorId === userId ? "You" : authorName;

  const createdAtLabel = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const toggleFavourite = () => {
    if (isFavourite) {
      onUnfav({ id })
        .then(() => {
          toast.success("Removed from favourites");
        })
        .catch((err) => {
          toast.error("Failed to remove from favourites");
        });
    } else {
      onFav({ id, orgId })
        .then(() => {
          toast.success("Added to favourites");
        })
        .catch((err) => {
          toast.error("Failed to add to favourites");
        });
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Action id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opactity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Action>
        </div>
        <Footer
          isFavourite={isFavourite!}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavourite}
          disabled={onFavPending || onUnfavPending}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
