import { Skeleton } from "@/components/ui/skeleton";

export const Participants = () => {
  return (
    <div className="absolute top-2 h-12 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
        List of Participants
    </div>
  );
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute top-2 h-12 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[300px]">
      <Skeleton className="w--full h--full bg-muted-400 w-[100px]" />
    </div>
  );
};
