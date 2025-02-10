import { Room } from "@/app/page";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import {
  Add,
  CloudUploadOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BlockHeader from "../blockHeader/page";
import { BlockController, SmallBlockController } from "../blockController/page";
import Image from "next/image";
import ComponentBlock, { Component } from "../componentBlock/page";
import BlockSmall from "../blockSmall/page";


interface BlockItemProps {
  block: Room;
  byLot?: boolean;
  _byLot?: number;
  floor?: boolean;
  top?: boolean;
  disable: boolean;
  setDisable: () => void;
  setSelect: () => void;
  select: boolean | undefined;
  updateLot: (updatedBlock: Room) => void; // Adiciona a função de

  _setBlocks: Dispatch<SetStateAction<Room[]>>;
}

export default function BlockItem({
  block,
  byLot,
  _byLot,
  updateLot,
  disable,
  setDisable,
  setSelect,
  select,
  _setBlocks,
}: BlockItemProps) {
  const [width, setWidth] = useState<number>(block.width);
  const [height, setHeight] = useState<number>(block.height || 0);
  const [size, setSize] = useState<number>(block.size || 0);
  const [length, setLength] = useState<number>(block.length || 0);
  const [tickLot, setTickLot] = useState<number>(block.tickLot || 0);
  const [_floor, _setFloor] = useState<boolean>(block.floor);
  const [_top, _setTop] = useState<boolean>(block.top);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [countBlock, setCountBlock] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number; z: number }>(
    block.position
  );
  const [rotation, setRotation] = useState<{ x: number; y: number; z: number }>(
    block.rotation
  );
  const [angle_Top, setAngle_Top] = useState<{
    f: number;
    l: number;
    r: number;
    b: number;
  }>(block.angle_Top);
  const [blocks, setBlocks] = useState<Room[]>(block.objects || []); // Estado dos blocos
  const [wallTexture, setWallTexture] = useState<string>(block.wallTexture || "");
  const [topTexture, setTopTexture] = useState<string>(block.topTexture || "");
  const [floorTexture, setFloorTexture] = useState<string>(block.floorTexture || "");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [componentId, setComponentId] = useState(0);
  const [components, setComponents] = useState<Component[]>(block.components);
  const [panelVisible, setPanelVisible] = useState<boolean>(false);
  const [wall, setWall] = useState<"F" | "B" | "L" | "R">("F");

  function showComponentPanel() {
    setPanelVisible(!panelVisible);
  }

  function handleAddComponent(type: boolean, wall: "F" | "B" | "L" | "R") {

    setComponents((prev) => [
      ...prev,
      {
        id: componentId,
        name: type ? "Door" : "Window",
        type: type,
        wall: wall,
        position: [0, 0, 0],
        scale: [1, 1, 1],
        disabled: false,
      },
    ]);
    showComponentPanel();
    setComponentId(componentId + 1);
  }
  const handleDeleteComponent = (id: number) => {
    setComponents((prev) => prev.filter((component) => component.id !== id));
  };
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>, _set: Dispatch<SetStateAction<string>>) {
    if (event.target.files && event.target.files.length > 0) {
      _set(URL.createObjectURL(event.target.files[0]));
    }
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

  block.width = width;
  block.height = height;
  block.length = length;
  block.tickLot = tickLot;
  block.size = size;
  block.floor = _floor;
  block.top = _top;
  block.objects = blocks;
  block.components = components;
  block.rotation = rotation;
  block.angle_Top = angle_Top;
  block.floorTexture = floorTexture;
  block.topTexture = topTexture;
  block.wallTexture = wallTexture;
  block.position = position;

  //função de update da rendenização
  function updateBlock() {
    updateLot({
      ...block,
      width: width,
      height: height,
      size,
      length,
      tickLot,
      top: _top,
      floor: _floor,
    });
  }
  const toggleSelectLot = (id: number, t: "D" | "S") => {
    setBlocks((prevLot) => {
      return prevLot.map((item) =>
        t == "D"
          ? item.id === id
            ? { ...item, disable: !item.disable }
            : item
          : item.id === id
            ? { ...item, selected: !item.selected }
            : item
      );
    });
  };
  function deleteRoom(id: number, _set: Dispatch<SetStateAction<Room[]>>) {
    _set(prev => {
      const updatedRooms = prev.filter(c => c.id !== id);
      
      // Optional: You could log or handle cases where no rooms were deleted
      if (updatedRooms.length === prev.length) {
        console.warn(`No room found with id: ${id}`);
      }
      
      return updatedRooms;
    });
  }
  useEffect(() => {
    updateBlock(); // Chama a função sempre que _top ou _floor mudar

  }, [
    _top,
    _floor,
    width,
    height,
    size,
    length,
    tickLot,
    position,
    rotation,
    angle_Top,
    disable,
    select,
    wallTexture,
    topTexture,
    floorTexture,
    components,
    blocks
  ]);

  //criação de blocos
  function createBlock({
    id,
    length,
    width,
    size,
    height,
    name,
    tickLot,
    objects,
    top,
    floor,
    position,
    rotation,
    angle_Top,
    components,
  }: Room) {
    updateBlock();
    if (
      (objects && countBlock == 0 && setCountBlock) ||
      (countBlock && objects && setCountBlock)
    ) {
      objects.push({
        id,
        length,
        width,
        size,
        height,
        name,
        tickLot,
        top,
        floor,
        disable: disable,
        components,
        position,
        rotation,
        angle_Top,
        byLot: true,
      });
      setCountBlock(Number(countBlock + 1));
    }
  }
  return (
    <Box
      width={"100%"}
      padding={showModal ? 1 : 2}
      boxShadow={showModal ? "0 0 3px 0" : "0 0 0 0"}
      bgcolor={"rgba(255,255,255,0.04)"}
      borderRadius={3}
    >
      <BlockHeader
        name={block.name}
        id={block.id}
        disable={disable}
        setDisable={setDisable}
        select={block.selected}
        setSelect={setSelect}
        byLot={byLot}
        onDelete={() => deleteRoom(block.id, _setBlocks)}
      />
      {showModal ? (
        <>
          <Box display={"flex"} flexDirection={"column"}>
            <BlockController name="Width" value={width} setValue={setWidth} />
            <BlockController
              name="Length"
              value={length}
              setValue={setLength}
            />
            <BlockController name="Wall Size" value={size} setValue={setSize} />
            <BlockController
              name="Wall Height"
              value={height}
              setValue={setHeight}
            />
            <BlockController
              name="Lot Thick"
              value={tickLot}
              setValue={setTickLot}
            />
            <Box>
              <Typography>Position</Typography>
              <br />
              <BlockController
                name="X"
                value={position.x}
                setValue={(newX) =>
                  setPosition((prev) => ({ ...prev, x: newX as number }))
                }
              />
              <BlockController
                name="Y"
                value={position.y}
                setValue={(newY) =>
                  setPosition((prev) => ({ ...prev, y: newY as number }))
                }
              />
              <BlockController
                name="Z"
                value={position.z}
                setValue={(newZ) =>
                  setPosition((prev) => ({ ...prev, z: newZ as number }))
                }
              />
            </Box>
            <Box>
              <Typography>Rotation</Typography>
              <br />
              <BlockController
                name="X"
                value={rotation.x}
                setValue={(newX) =>
                  setRotation((prev) => ({ ...prev, x: newX as number }))
                }
              />
              <BlockController
                name="Y"
                value={rotation.y}
                setValue={(newY) =>
                  setRotation((prev) => ({ ...prev, y: newY as number }))
                }
              />
              <BlockController
                name="Z"
                value={rotation.z}
                setValue={(newZ) =>
                  setRotation((prev) => ({ ...prev, z: newZ as number }))
                }
              />
            </Box>
            <Box>
              <Typography>Angle Top</Typography>
              <Box display={"flex"} gap={".5vw"} padding={".1vw"}>
                <SmallBlockController
                  name="Front"
                  value={angle_Top.f}
                  setValue={(newF) =>
                    setAngle_Top((prev) => ({ ...prev, f: newF as number }))
                  }
                />
                <SmallBlockController
                  name="Left"
                  value={angle_Top.l}
                  setValue={(newL) =>
                    setAngle_Top((prev) => ({ ...prev, l: newL as number }))
                  }
                />
                <SmallBlockController
                  name="Right"
                  value={angle_Top.r}
                  setValue={(newR) =>
                    setAngle_Top((prev) => ({ ...prev, r: newR as number }))
                  }
                />
                <SmallBlockController
                  name="Back"
                  value={angle_Top.b}
                  setValue={(newB) =>
                    setAngle_Top((prev) => ({ ...prev, b: newB as number }))
                  }
                />
              </Box>
            </Box>
            <Box>
              <Button

                sx={{ alignItems: "center", width: "100%", display: "flex", flexDirection: "column" }}
                onClick={() => {
                  setShowAddModal(!showAddModal);
                  panelVisible ? showComponentPanel() : null;
                }}
              >
                <Typography sx={{ color: "white", fontSize: 15 }}>Components</Typography>
                {showAddModal ?
                  <KeyboardArrowUp fontSize="large" sx={{ color: "white" }} />
                  :
                  <KeyboardArrowDown fontSize="large" sx={{ color: "white" }} />

                }
              </Button>
              {
                showAddModal &&
                <Box>
                  <Button sx={{
                    width: "100%", color: "white"

                  }} onClick={showComponentPanel} >
                    <Add fontSize="medium" />
                  </Button>
                  {
                    panelVisible &&
                    <Box>
                      <List>
                        <ListItem>
                          <Typography>Door</Typography>
                          <Select sx={{ color: "white" }} onChange={(e) => setWall(e.target.value as "F" | "B" | "L" | "R")}>
                            <MenuItem value={"F"}>Front</MenuItem>
                            <MenuItem value={"B"}>Back</MenuItem>
                            <MenuItem value={"L"}>Left</MenuItem>
                            <MenuItem value={"R"}>Right</MenuItem>
                          </Select>
                          <Button onClick={() => handleAddComponent(true, wall)}>
                            <Add fontSize="medium" />
                          </Button>
                        </ListItem>
                        <ListItem >
                          <Typography>Window</Typography>
                          <Select sx={{ color: "white" }} onChange={(e) => setWall(e.target.value as "F" | "B" | "L" | "R")}>
                            <MenuItem value={"F"}>Front</MenuItem>
                            <MenuItem value={"B"}>Back</MenuItem>
                            <MenuItem value={"L"}>Left</MenuItem>
                            <MenuItem value={"R"}>Right</MenuItem>
                          </Select>
                          <Button onClick={() => handleAddComponent(false, wall)}>
                            <Add fontSize="medium" />
                          </Button>
                        </ListItem>
                      </List>
                    </Box>

                  }

                  <Box>
                    <List sx={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
                      {components.map((component) => (
                        <ComponentBlock key={component.id} updateComponent={updateBlock} component={component} width={width} lenght={length} onDelete={() => handleDeleteComponent(component.id)} />
                      )

                      )}
                    </List>
                  </Box>

                </Box>

              }

            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box display={"flex"} gap={"5vw"} padding={".1vw"}>
            <SmallBlockController
              value={width}
              setValue={setWidth}
              name="width"
            />
            <SmallBlockController
              value={length}
              setValue={setLength}
              name="length"
            />
          </Box>
        </>
      )}
      <Box display={"flex"} marginTop={2} flexDirection={"column"} justifyContent={"space-between"}>
        <Box display={"flex"} alignItems={"center"} height={"5vh"} justifyContent={"space-between"}>
          <Typography width={"35%"}>Show Top</Typography>


          {/* Clickable Image to trigger file input */}
          <label htmlFor="file-upload-top" style={{ cursor: "pointer" }}>
            {topTexture ? (
              <Image
                src={topTexture} // Create a URL for the uploaded file
                alt="Description of the images"
                width={30}
                height={30}
              />
            ) : (
              <IconButton
                size="medium"
                sx={{ color: "white" }}
                onClick={() => document.getElementById("file-upload-top")?.click()} // Trigger file input on button click
              >
                <CloudUploadOutlined fontSize="medium" />
              </IconButton>
            )}
          </label>

          {/* Hidden file input */}
          <VisuallyHiddenInput
            id="file-upload-top"
            type="file"
            accept="image/*"
            onChange={(event) => handleFileChange(event, setTopTexture)}
            multiple
          />
          <Checkbox
            checked={_top}
            onChange={(e) => {
              _setTop(e.target.checked);
            }}
            sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
          />
        </Box>
        <Box display={"flex"} alignItems={"center"} height={"5vh"} justifyContent={"space-between"}>
          <Typography width={"35%"}>Show Floor</Typography>


          {/* Clickable Image to trigger file input */}
          <label htmlFor="file-upload-floor" style={{ cursor: "pointer" }}>
            {floorTexture ? (
              <Image
                src={floorTexture} // Create a URL for the uploaded file
                alt="Description of the image"
                width={30}
                height={30}
              />
            ) : (
              <IconButton
                size="medium"
                sx={{ color: "white" }}
                onClick={() => document.getElementById("file-upload-floor")?.click()} // Trigger file input on button click
              >
                <CloudUploadOutlined fontSize="medium" />
              </IconButton>

            )}
          </label>

          {/* Hidden file input */}
          <VisuallyHiddenInput
            id="file-upload-floor"
            type="file"
            accept="image/*"
            onChange={(event) => handleFileChange(event, setFloorTexture)}
            multiple
          />
          <Checkbox
            checked={_floor}
            onChange={(e) => {
              _setFloor(e.target.checked);
            }}
            sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
          />
        </Box>
        <Box display={"flex"} alignItems={"center"} height={"5vh"} justifyContent={"space-between"}>
          <Typography width={"35%"}>Wall Texture</Typography>

          <label htmlFor="file-upload-wall" style={{ cursor: "pointer" }}>
            {wallTexture ? (
              <Image
                src={wallTexture} // Create a URL for the uploaded file
                alt="Description of the image"
                width={30}
                height={30}
              />
            ) : (
              <IconButton
                size="medium"
                sx={{ color: "white" }}
                onClick={() => document.getElementById("file-upload-wall")?.click()} // Trigger file input on button click
              >
                <CloudUploadOutlined fontSize="medium" />
              </IconButton>

            )}
          </label>

          {/* Hidden file input */}
          <VisuallyHiddenInput
            id="file-upload-wall"
            type="file"
            accept="image/*"
            onChange={(event) => handleFileChange(event, setWallTexture)}
            multiple
          />
        </Box>
      </Box>
      {!byLot && (
        <Box>
          {blocks.map((e) => (
            (
              e.selected ? (
                <BlockItem
              key={e.id}
              updateLot={updateBlock}
              block={e}
              byLot={true}
              floor={e.floor}
              top={e.top}
              disable={e.disable}
              setDisable={() => toggleSelectLot(e.id, "D")}
              select={e.selected}
              setSelect={() => toggleSelectLot(e.id, "S")}
              _setBlocks={setBlocks}
            />
            ) : (
              <BlockSmall
                key={e.id} // Adicione uma chave única para cada item
                name={e.name}
                setSelect={() => toggleSelectLot(e.id, "S")} // Passa a função com o ID do lot
                id={e.id}
                byLot={true}
                disable={e.disable}
                setDisable={() => toggleSelectLot(e.id, "D")}
              />
            )
            )
            
          ))}

          <Button
            sx={{ alignItems: "center", width: "100%", color: "white" }}
            onClick={() =>
              createBlock({
                id: 0,
                length: length,
                width: width,
                size: size,
                height: height,
                name: "novo",
                tickLot: tickLot,
                objects: block.objects,
                floor: _floor,
                top: _top,
                disable: block.disable,
                selected: block.selected,
                position: position,
                rotation: rotation,
                angle_Top: angle_Top,
                components: components
              })
            }
          >
            <Add fontSize="medium" />
          </Button>
        </Box>
      )}
      <Button
        sx={{ alignItems: "center", width: "100%" }}
        onClick={() => setShowModal(!showModal)}
      >
        {showModal ? (
          <KeyboardArrowUp fontSize="large" sx={{ color: "white" }} />
        ) : (
          <KeyboardArrowDown fontSize="large" sx={{ color: "white" }} />
        )}
      </Button>
    </Box>
  );
}
