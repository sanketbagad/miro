"use client";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";

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

  return (
    <Link href={`/board/${id}`}>
      <div
      className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden"
      >
        <div className="relative flex-1 bg-amber-50">
            <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-fit"
            />
            <Overlay />
        </div>
      </div>
    </Link>
  );
};
