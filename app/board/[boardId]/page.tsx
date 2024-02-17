import { Canvas } from "./_components/canvas";
import { Room } from "@/components/rooms";
interface BoardIdPageProps {
  params: {
    boardId: string
  }
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <Room roomId={params.boardId}>
      <Canvas boardId ={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;