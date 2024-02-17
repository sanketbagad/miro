"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelf, useOthers } from "@/liveblocks.config";
import { UserAvatar } from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 2;

export const Participants = () => {
  const users = useOthers();
  const self = useSelf();

  const hasMore = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute top-2 h-12 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColour={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.charAt(0) || "T"}
            />
          );
        })}
        {self && (
          <UserAvatar
            borderColour={connectionIdToColor(self.connectionId)}
            src={self.info?.picture}
            name={`${self.info?.name} You`}
            fallback={self.info?.name?.charAt(0) || "T"}
          />
        )}
        {hasMore && (
          <UserAvatar
            name={`+${users.length - MAX_SHOWN_USERS} more`}
            fallback="+"
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute top-2 h-12 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[300px]">
      <Skeleton className="w--full h--full bg-muted-400 w-[100px]" />
    </div>
  );
};
