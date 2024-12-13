import { Room } from "@/app/page";
import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import BlockItem from "../blockItem/page"; // Importa o novo componente

export default function BlocksList({
  
  blockList,
  countBlock,
  setObjects,
}: {
  countBlock: number,
  
  blockList: Room[] ;
  setObjects:Dispatch<SetStateAction<Room[]>> | undefined;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [top, setTop] = useState<boolean>(true);
  const [floor, setFloor] = useState<boolean>(true);
  return (
    <Box padding={1}>
      {blockList.map((e) => (
        <BlockItem
        setObjects={setObjects}
        id={countBlock}
          disable={disable}
          setDisable={setDisable}
          block={e}
          showModal={showModal}
          setShowModal={setShowModal}
          top={top}
          floor={floor}
          byLot={true}
          
        />
      ))}
    </Box>
  );
}
