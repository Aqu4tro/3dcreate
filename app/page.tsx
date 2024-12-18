"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import Floor from "@/components/floor/page";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Add, ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Lot from "@/renderers/lotCreate/page";
import Panel from "@/components/panel/page";
import BlockItem from "@/components/blockItem/page";
export type Room = {
  id: number;
  byLot?: number;
  length: number;
  width: number;
  size?: number;
  height?: number;
  name: string;
  tickLot?: number;
  objects?: Room[];
  setObjects?: Dispatch<SetStateAction<Room[]>>;
  top?:boolean;
  floor?:boolean;
  disable?:boolean; 
};

export default function Home() {
  const [nameObject, setNameObject] = useState<string>("");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [thick, setThick] = useState<boolean>(false);
  const [panelVisible, setPanelVisible] = useState<boolean>(false);
  const [lot, setLot] = useState<Room[]>([]);
  //const [objects, setObjects] = useState<Room[]>([]);
  const [tickLot, setTickLot] = useState<number>(0);
  const [floor, setFloor] = useState<boolean>(false);
  const [top, setTop] = useState<boolean>(false);
  const [countLot, setCountLot] = useState<number>(0);
  
  const updateLot = (updatedBlock: Room) => {
    setLot((prevLot) =>
      prevLot.map((item) => (item.id === updatedBlock.id ? updatedBlock : item))
    );
  };
  //criar novo terreno
  function createLot({ id, length, width, size, height, name, tickLot }: Room) {
    setLot((preview) => [
      ...preview,
      {
        id,
        length,
        width,
        size,
        height,
        name,
        tickLot,
        objects: [],
        top: true,
        floor: true,

      },
    ]);
    setCountLot(countLot + 1);
  }

  //mostrar/ocultar painel de terreno
  function togglePanel() {
    console.log(lot);
    setPanelVisible(!panelVisible);
    //setThick(false);
  }

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <div style={{ width: "75vw" }}>
        {panelVisible && (
          <Panel
            createLot={() =>
              createLot({
                id: countLot,
                length: length,
                width: width,
                size: size,
                height: height,
                name: nameObject,
                tickLot: tickLot,
                floor: true,
                disable: false,
                top:true
              })
            }
            setHeight={setHeight}
            setLength={setLength}
            setNameObject={setNameObject}
            setSize={setSize}
            setThick={setThick}
            setThickLot={setTickLot}
            setWidth={setWidth}
            thick={thick}
            togglePanel={() => togglePanel()}
          />
        )}

        <Button
          sx={{
            borderRadius: "50%",
            width: "46px",
            height: "46px",
            minWidth: "0",
            borderWidth: 3,
            position: "absolute",
            bottom: "3vh",
            left: "3vh",
            zIndex: 2,
          }}
          color="inherit"
          variant="outlined"
          onClick={togglePanel}
        >
          {panelVisible ? (
            <ArrowBack fontSize="large" />
          ) : (
            <Add fontSize="large" />
          )}
        </Button>
        <Canvas>
          <PerspectiveCamera position={[0, 0, -20]} />
         
          {lot.map((item, index) => (
            <Lot
              key={index} // Add a unique key for each Lot
              id={item.id}
              length={item.length}
              width={item.width}
              size={item.size}
              name={item.name}
              height={item.height}
              objects={item.objects}
              tickLot={item.tickLot}
              disable={false}
              top={item.top}
              floor={item.floor}
            />
          ))}
  
          <OrbitControls rotateSpeed={0.2} />
          <ambientLight intensity={0.1} />
          <directionalLight position={[5, -50, 5]} color="blue" />
        </Canvas>
      </div>
      <div style={{ width: "25vw", overflowY: "auto" }}>
        <Box padding={1}>
          {lot.map((e) => (
            <BlockItem
              updateLot={updateLot}
              block={e}
              top={top}
              floor={floor}
            />
          ))}
        </Box>
      </div>
    </div>
  );
}
