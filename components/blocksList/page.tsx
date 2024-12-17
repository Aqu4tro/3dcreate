import { Room } from "@/app/page";
import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import BlockItem from "../blockItem/page"; // Importa o novo componente

export default function BlocksList({
  blockList,
  
  updateLot
}: {
  updateLot:  (updatedBlock: Room) => void; // Adiciona a função de   
  blockList: Room[] ;
  
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [top, setTop] = useState<boolean>(true);
  const [floor, setFloor] = useState<boolean>(true);
  const [objects, setObjects] = useState<Room[]>(blockList);
  const updateBlock = (updatedBlock: Room) => { 
    setObjects((prevLot) =>
        prevLot.map((item) =>
            item.id === updatedBlock.id ? updatedBlock : item
        )
    );
};
  return (
    <Box padding={1}>
      {blockList.map((e) => (
        <BlockItem
          
          updateLot={updateBlock}
          block={e}
                 
          top={top}
          floor={floor}
          byLot={true}
        />
      ))}
    </Box>
  );
}
