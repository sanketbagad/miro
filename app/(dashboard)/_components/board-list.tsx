"use client";

import { Button } from "@/components/ui/button";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favourites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = [];

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
          <Button size={"lg"}>Create Board</Button>
        </div>
      </>
    );
  }
  return <div>{JSON.stringify(query)}</div>;
};
