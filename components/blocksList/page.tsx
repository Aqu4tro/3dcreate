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
  const toggleSelectLot = (id: number, t: "D" | "S") => {
    setObjects((prevLot) =>
      prevLot.map((item) =>
        t === "D"
          ? item.id === id
            ? { ...item, disable: !item.disable }
            : item
          : item.id === id
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };
  return (
    <Box padding={1}>
      {blockList.map((e) => (
        e.selected && (
        <BlockItem disable={e.disable} select={e.selected} setSelect={ () => toggleSelectLot(e.id,"S")} setDisable={() => toggleSelectLot(e.id, "D")} updateLot={updateBlock} block={e} _setBlocks={setObjects} />
      )))}
    </Box>
  );
}
