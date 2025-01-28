"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Dispatch, SetStateAction, useState } from "react";
import * as THREE from "three";
import { Add, ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Lot from "@/renderers/lotCreate/page";
import Panel from "@/components/panel/page";
import BlockItem from "@/components/blockItem/page";
import BlockSmall from "@/components/blockSmall/page";
import { Component } from "@/components/componentBlock/page";
export type Room = {
  id: number;
  byLot?: number;
  length: number;
  width: number;
  size: number;
  height: number;
  name: string;
  tickLot: number;
  topSize?: number | 0.1;
  objects?: Room[];
  top: boolean;
  floor: boolean;
  disable: boolean;
  selected?: boolean;
  setSelected?: Dispatch<SetStateAction<boolean>>;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  angle_Top: { f: number; l: number; r: number; b: number };
  wallTexture?: string;
  topTexture?: string;
  floorTexture?: string;
  components: Component[];
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
  const [tickLot, setTickLot] = useState<number>(0);
  const [countLot, setCountLot] = useState<number>(0);

  const updateLot = (updatedBlock: Room) => {
    setLot((prevLot) =>
      prevLot.map((item) => (item.id === updatedBlock.id ? updatedBlock : item))
    );
  };
  const toggleSelectLot = (id: number, t: "D" | "S") => {
    setLot((prevLot) =>
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

  //criar novo terreno
  function createLot({
    id,
    length,
    width,
    size,
    height,
    name,
    tickLot,
    top,
    floor,
  }: Room) {
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
        top,
        floor,
        disable: false,
        selected: false,
        wallTexture: undefined,
        topTexture: undefined,
        floorTexture: undefined,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        angle_Top: { f: 0, l: 0, r: 0, b: 0 },
        components:[],
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
                disable: false,
                floor: true,
                top: true,
                position: { x: 0, y: 0, z: 0 },
                angle_Top: { f: 0, l: 0, r: 0, b: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                components: [],
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

          {lot.map((item) => (
            <Lot
              id={item.id}
              length={item.length}
              width={item.width}
              size={item.size}
              name={item.name}
              height={item.height}
              objects={item.objects}
              tickLot={item.tickLot}
              disable={item.disable}
              top={item.top}
              selected={item.selected}
              setSelected={() => toggleSelectLot(item.id, "S")}
              floor={item.floor}
              position={item.position}
              rotation={item.rotation}
              angle_Top={item.angle_Top}
              wallTexture={item.wallTexture}
              floorTexture={item.floorTexture}
              topTexture={item.topTexture} 
              components={item.components}
            />
          ))}

          <OrbitControls rotateSpeed={0.2} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, -50, 5]} color="white" />
        </Canvas>
      </div>
      <div style={{ width: "25vw", overflowY: "auto" }}>
        <Box padding={1}>
          {lot.map((e) =>
            e.selected ? (
              <BlockItem
                updateLot={updateLot}
                block={e}
                disable={e.disable}
                setDisable={() => toggleSelectLot(e.id, "D")}
                setSelect={() => toggleSelectLot(e.id, "S")}
                select={e.selected}
              />
            ) : (
              <BlockSmall
                key={e.id} // Adicione uma chave única para cada item
                name={e.name}
                disable={e.disable}
                setSelect={() => toggleSelectLot(e.id, "S")} // Passa a função com o ID do lot
              />
            )
          )}
        </Box>
      </div>
    </div>
  );
}
