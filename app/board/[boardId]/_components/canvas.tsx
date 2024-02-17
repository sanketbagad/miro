"use client";

import { useCallback, useState } from "react";
import { Toolbar } from "../toolbar";
import { Info } from "./info";
import { Participants } from "./participants";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from "@/liveblocks.config";
import { CursorsPresence } from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault();
    setCamera((prev) => ({
      x: prev.x - event.deltaX,
      y: prev.y - event.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }) =>
      (event: React.PointerEvent) => {
        event.preventDefault();

        const current = pointerEventToCanvasPoint(event, camera);

        setMyPresence({ cursor: current });
      },
    []
  );

  const onPointerLeave = useMutation(
    ({ setMyPresence }) =>
      () => {
        setMyPresence({ cursor: null });
      },
    []
  );

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
      onWheel={onWheel}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="h-[100vh] w-[100vh]">
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
