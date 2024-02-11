"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { NeWBoardButton } from "./new-board-button";
import { useApiMutations } from "@/hooks/use-api-mutations";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favourites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId });

  const { pending, mutate } = useApiMutations(api.board.create);
  const onClick = () => {
    mutate({ orgId, title: "New Board" });
  };

  if (data === undefined) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-muted-foreground text-center">
          <h1 className="text-3xl font-semibold">Loading boards...</h1>
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-muted-foreground text-center">
          <h1 className="text-3xl font-semibold">No results found</h1>
          <p className="text-lg">Try searching for something else</p>
        </div>
      </div>
    );
  }

  if (!data?.length && query.favourites) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-muted-foreground text-center">
          <h1 className="text-3xl font-semibold">No favourite boards found</h1>
          <p className="text-lg">Mark boards as favourite to see them here</p>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <>
        <div className="flex justify-center items-center h-full">
          <div className="text-muted-foreground text-center">
            <h1 className="text-3xl font-semibold">No boards found</h1>
            <p className="text-lg">Create a new board to get started</p>
          </div>
        </div>
        <div className="flex justify-center items-center h-full mt-6">
          <Button size={"lg"} onClick={onClick}>Create Board</Button>
        </div>
      </>
    );
  }
  return (
    <div>
      <h2 className="text-3xl">
        {query.favourites ? "Favourite Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NeWBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUri}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={orgId}
            isFavourite={false}
          />
        ))}
      </div>
    </div>
  );
};
