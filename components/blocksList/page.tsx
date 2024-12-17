import { Room } from "@/app/page";
import { Box } from "@mui/material";
import { useState } from "react";
import BlockItem from "../blockItem/page"; // Importa o novo componente

export default function BlocksList({ blockList }: { blockList: Room[] }) {
  const [objects, setObjects] = useState<Room[]>(blockList);
  const updateBlock = (updatedBlock: Room) => {
    setObjects((prevLot) =>
      prevLot.map((item) => (item.id === updatedBlock.id ? updatedBlock : item))
    );
  };
  return (
    <Box padding={1}>
      {blockList.map((e) => (
        <BlockItem updateLot={updateBlock} block={e} />
      ))}
    </Box>
  );
}
