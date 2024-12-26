import { Room } from "@/app/page";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import BlockHeader from "../blockHeader/page";
import { BlockController, SmallBlockController } from "../blockController/page";

interface BlockItemProps {
  block: Room;
  byLot?: boolean;
  _byLot?: number;
  floor?: boolean;
  top?: boolean;
  disable: boolean;
  setDisable: () => void;
  updateLot: (updatedBlock: Room) => void; // Adiciona a função de
}

export default function BlockItem({
  block,
  byLot,
  _byLot,
  updateLot,
  disable,
  setDisable,
}: BlockItemProps) {
  const [width, setWidth] = useState<number>(block.width);
  const [height, setHeight] = useState<number>(block.height || 0);
  const [size, setSize] = useState<number>(block.size || 0);
  const [length, setLength] = useState<number>(block.length || 0);
  const [tickLot, setTickLot] = useState<number>(block.tickLot || 0);
  const [_floor, _setFloor] = useState<boolean>(true);
  const [_top, _setTop] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [countBlock, setCountBlock] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number; z: number }>(
    block.position
  );
  const [rotation, setRotation] = useState<{ x: number; y: number; z: number }>(
    block.rotation
  );
  const [angle_Top, setAngle_Top] = useState<{
    x: number;
    y: number;
    z: number;
  }>(block.angle_Top);

  const [blocks, setBlocks] = useState<Room[]>(block.objects || []); // Estado dos blocos
  block.width = width;
  block.height = height;
  block.length = length;
  block.tickLot = tickLot;
  block.size = size;
  block.floor = _floor;
  block.top = _top;
  block.objects = blocks;
  block.position = position;
  block.rotation = rotation;
  block.angle_Top = angle_Top;

  //função de update da rendenização
  const updateBlock = () => {
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
  };
  const toggleSelectLot = (id: number, t: "D" | "S") => {
    setBlocks((prevLot) =>
      prevLot.map((item) =>
        t == "D"
          ? item.id === id
            ? { ...item, disable: !item.disable }
            : item
          : item.id === id
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };
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
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        angle_Top: { x: 0, y: 0, z: 0 },
      });
      setCountBlock(Number(countBlock + 1));
    }
  }
  const updateXPosition = (newX: number) => {
    setPosition((prevPosition) => ({
      ...prevPosition, // Spread operator to keep y and z unchanged
      x: newX, // Update only x
    }));
  };
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
              <BlockController
                name="X"
                value={position.x}
                setValue={(newX) =>
                  setPosition((prev) => ({ ...prev, x: newX as number }))
                }
              />
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
      <Box display={"flex"} marginTop={2} justifyContent={"space-between"}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography>Show Top</Typography>
          <Checkbox
            value={_top}
            onChange={(e) => {
              _setTop(e.target.checked);
            }}
            sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
          />
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Typography>Show Floor</Typography>
          <Checkbox
            value={_floor}
            onChange={(e) => {
              _setFloor(e.target.checked);
            }}
            sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
          />
        </Box>
      </Box>
      {!byLot && (
        <Box>
          {blocks.map((e) => (
            <BlockItem
              key={e.id}
              updateLot={updateBlock}
              block={e}
              byLot={true}
              floor={e.floor}
              top={e.top}
              disable={e.disable}
              setDisable={() => toggleSelectLot(e.id, "D")}
            />
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
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                angle_Top: { x: 0, y: 0, z: 0 },
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
