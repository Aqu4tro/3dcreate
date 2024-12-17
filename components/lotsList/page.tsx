import { Room } from "@/app/page";
import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import BlockItem from "../blockItem/page"; // Importa o novo componente

export default function LotList({
  top,
  floor,
  blockList,
  countLot,
}: {
  countLot: number;
  top: boolean;
  floor: boolean;
  blockList: Room[];
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [objects, setObjects] = useState<Room[]>([]);

  return (
    <Box padding={1}>
      
    </Box>
  );
}
