"use client";

import { memo } from "react";
import { useOthersConnectionIds } from "@/liveblocks.config";
import { Cursor } from "./cursor";

const Cursors = () => {
    const ids = useOthersConnectionIds();
    return (
        <g>
            {ids.map((id) => (
                <Cursor key={id} connectionId={id} />
            ))}
        </g>
    );
}

export const CursorsPresence = memo(() => {
  return (
    <>
      <p>Cursors</p>
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";