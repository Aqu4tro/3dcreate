"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Add,
  ArrowBack,
  ArrowLeft,
  ArrowRight,
  Close,
  Download,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  MoreVert,
  UploadFile,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Fab,
  Fade,
  Slide,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Lot from "@/renderers/lotCreate/page";
import Panel from "@/components/panel/page";
import BlockItem from "@/components/blockItem/page";
import BlockSmall from "@/components/blockSmall/page";
import { Component } from "@/components/componentBlock/page";
import { downloadRoomsAsJson } from "@/utils/download/page";
export type Room = {
  id: number;
  byLot?: true;
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
  const [buttonList, setButtonList] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

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
        components: [],
      },
    ]);
    setCountLot(countLot + 1);
  }

  function togglePanel() {
    setPanelVisible(!panelVisible);
    setThick(false);
  }
  function toggleButton() {
    setButtonList(!buttonList);
    setPanelVisible(false);
  }
  function handleUploadFile(
    event: React.ChangeEvent<HTMLInputElement>,
    _set: Dispatch<SetStateAction<Room[]>>
  ) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = () => {


        if (reader.result) {
          try {
            const parsedData = JSON.parse(reader.result as string);


            if (Array.isArray(parsedData)) {
              _set((preview) => [...(preview || []), ...parsedData]);
            } else {
              console.error('Os dados não são um array.');
            }
          } catch (error) {
            console.error('Erro ao parsear JSON:', error);
          }
        } else {
          console.error('Nenhum resultado encontrado ao ler o arquivo.');
        }
      };

      reader.onerror = () => {
        console.error('Erro ao ler o arquivo.');
      };

      reader.readAsText(file);
    }
  }


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <div style={{ width: "100vw" }}>
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

        <Box>
          <Fade in={buttonList}>
            <div>
              <label htmlFor="file-upload-top" style={{ cursor: "pointer" }}>
                <Fab
                  sx={{
                    borderRadius: "50%",
                    width: "46px",
                    height: "46px",
                    minWidth: "0",
                    borderWidth: 3,
                    position: "absolute",
                    bottom: "12vh",
                    left: "3vh",
                    zIndex: 2,
                    color: "black",
                  }}
                  onClick={() =>
                    document.getElementById("file-upload-top")?.click()
                  }
                  color="inherit"
                >
                  <UploadFile fontSize="large" />
                </Fab>
              </label>
              <VisuallyHiddenInput
                id="file-upload-top"
                type="file"
                accept="json/*"
                onChange={(event) => handleUploadFile(event, setLot)}

              />
            </div>
          </Fade>

          <Fade in={buttonList}>
            <Fab
              sx={{
                borderRadius: "50%",
                width: "46px",
                height: "46px",
                minWidth: "0",
                borderWidth: 3,
                position: "absolute",
                bottom: "21vh",
                left: "3vh",
                zIndex: 2,
                color: "black",
              }}
              color="inherit"
              onClick={togglePanel}
            >
              {panelVisible ? (
                <ArrowBack fontSize="large" />
              ) : (
                <Add fontSize="large" />
              )}
            </Fab>
          </Fade>
          <Fab
            sx={{
              borderRadius: "50%",
              width: "46px",
              height: "46px",
              minWidth: "0",
              position: "absolute",
              bottom: "3vh",
              left: "3vh",
              zIndex: 2,
              color: "black",
            }}
            variant="extended"
            onClick={toggleButton}
          >
            {buttonList ? (
              <Close fontSize="large" />
            ) : (
              <MoreVert fontSize="large" />
            )}
          </Fab>
        </Box>

        <Canvas>
          <PerspectiveCamera position={[0, 0, -20]} />

          {lot.map((item) => (
            <Lot
              key={item.id}
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
          <Sky
            distance={40000}
            sunPosition={[0, 5, 0]}
            inclination={0}
            azimuth={180}
            turbidity={10}
            mieCoefficient={0.005}
            mieDirectionalG={150}
            rayleigh={0.3}
          />
        </Canvas>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          right: 0,
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Fab
          onClick={handleToggle}
          sx={{
            backgroundColor: isOpen ? "black" : "transparent",
            height: isOpen ? "100%" : "10%",
            color: isOpen ? "white" : "black",
            "&:hover": {
              backgroundColor: isOpen ? "rgb(40,40,40)" : undefined,
            },
            borderColor: "black",
            borderRadius: isOpen ? 0 : 2,
          }}
        >
          {isOpen ? (
            <KeyboardArrowRight fontSize="large" />
          ) : (
            <KeyboardArrowLeft fontSize="large" />
          )}
        </Fab>
        {isOpen && (
          <div
            style={{
              width: "25vw",
              overflowY: "auto",
              height: "100%",

              backgroundColor: "black",
            }}
          >
            <Box padding={1} display={"flex"} flexDirection={"column"} gap={3}>
              <Button
                fullWidth
                size="large"
                endIcon={<Download />}
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
                onClick={() => downloadRoomsAsJson(lot)}
              >
                <Typography>Download file</Typography>
              </Button>
              {lot.map((e) =>
                e.selected ? (
                  <BlockItem
                    key={e.id}
                    updateLot={updateLot}
                    block={e}
                    disable={e.disable}
                    setDisable={() => toggleSelectLot(e.id, "D")}
                    setSelect={() => toggleSelectLot(e.id, "S")}
                    select={e.selected}
                    _setBlocks={setLot}
                  />
                ) : (
                  <BlockSmall
                    key={e.id}
                    name={e.name}
                    setSelect={() => toggleSelectLot(e.id, "S")}
                    id={e.id}
                    byLot={e.byLot}
                    disable={e.disable}
                    setDisable={() => toggleSelectLot(e.id, "D")}
                  />
                )
              )}
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}
