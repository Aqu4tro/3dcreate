"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";
import {
  Add,
  ArrowBack,
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
  Typography,
} from "@mui/material";
import Lot from "@/renderers/lotCreate/page";
import Panel from "@/components/panel/page";
import BlockItem from "@/components/blockItem/page";
import BlockSmall from "@/components/blockSmall/page";
import { Component } from "@/components/componentBlock/page";
import downloadRoomsAsJson from "@/utils/download/page";
import { handleUploadAmbience } from "@/utils/upload/page";
import clearUploads from "@/utils/clearUploads/page";
export type Room = {
  id: number;
  byLot?: true;
  length: number;
  width: number;
  size: number;
  height: number;
  name: string;
  tickLot: number;
  objects?: Room[];
  top: boolean;
  floor: boolean;
  disable: boolean;
  selected?: boolean;
  setSelected?: Dispatch<SetStateAction<boolean>>;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  angle_Top: { f: number; l: number; r: number; b: number };
  upperGap: { x: number; z: number; };
  topHeight: number;
  topPosition: { x: number; z: number };
  wallTexture?: string;
  topTexture?: string;
  floorTexture?: string;
  components: Component[];
};

export default function Home() {
  const [nameObject, setNameObject] = useState<string>("");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [thickWall, setThickWall] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [thick, setThick] = useState<boolean>(false);
  const [panelVisible, setPanelVisible] = useState<boolean>(false);
  const [lot, setLot] = useState<Room[]>([]);
  const [thickLot, setThickLot] = useState<number>(0);
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
    position,
    rotation,
    angle_Top,
    upperGap,
    topHeight,
    topPosition,
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
        upperGap,
        topHeight,
        topPosition,
        position,
        rotation,
        angle_Top,
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



  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    async function executeAsync() {
      await clearUploads();
    };

    executeAsync();
  }, []);

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
                size: thickWall,
                height: height,
                name: nameObject,
                tickLot: thickLot,
                disable: false,
                floor: true,
                top: true,
                position: { x: 0, y: 0, z: 0 },
                angle_Top: { f: 0, l: 0, r: 0, b: 0 },
                upperGap: { x: 0.3, z: 0.3 },
                topHeight: 0.1,
                topPosition: { x: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                components: [],
              })
            }
            width={width}
            height={height}
            thickWall={thickWall}
            nameObject={nameObject}
            length={length}
            thickLot={thickLot}
            setHeight={setHeight}
            setLength={setLength}
            setNameObject={setNameObject}
            setSize={setThickWall}
            setThick={setThick}
            setThickLot={setThickLot}
            setWidth={setWidth}
            thick={thick}
            togglePanel={toggleButton}
          />
        )}

        <Box>
          <Fade in={buttonList}>
            <div>
              <input
                type="file"
                id="file-upload-room"
                ref={(input) => {
                  if (input) {
                    input.setAttribute("webkitdirectory", "true");
                  }
                }}
                onChange={async (event) => {
                  await handleUploadAmbience(event, setLot);
                  toggleButton();
                }}
                style={{ display: 'none' }}
              />
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
                onClick={() => document.getElementById("file-upload-room")?.click()}
                color="inherit"
              >
                <UploadFile fontSize="large" />
              </Fab>
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
              heightY={item.height + (item.length * Math.tan(item.angle_Top.f) / 2 || item.length * Math.tan(item.angle_Top.b) / 2 || item.width * Math.tan(item.angle_Top.r) / 2 || item.width * Math.tan(item.angle_Top.l) / 2) + item.tickLot}
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
              upperGap={item.upperGap}
              topHeight={item.topHeight}
              topPosition={item.topPosition}
            />
          ))}

          <OrbitControls rotateSpeed={0.2} />
          <ambientLight intensity={0.5} />
          
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
              overflow: "auto",
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