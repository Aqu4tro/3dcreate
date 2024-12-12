import { Room } from "@/app/page";
import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import BlockItem from "../blockItem/page"; // Importa o novo componente

export default function BlocksList({
  top,
  floor,
  blockList,
  countBlock,
  setObjects,
}: {
  countBlock: number,
  top: boolean;
  floor: boolean;
  blockList: Room[];
  setObjects:Dispatch<SetStateAction<Room[]>>;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
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
