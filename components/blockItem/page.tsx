import { Room } from "@/app/page";
import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BlockHeader from "../blockHeader/page";
import { BlockController, SmallBlockController } from "../blockController/page";
import { useTexture } from "@react-three/drei";
import Image from "next/image";

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
  const [wallTexture, setWallTexture] = useState<File | null>(null);
  const [topTexture, setTopTexture] = useState<File | null>(null);
  const [floorTexture, setFloorTexture] = useState<File | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, set: Dispatch<SetStateAction<File | null>>) => {
    if (event.target.files && event.target.files.length > 0) {
      set(event.target.files[0]);
    }
  };

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
        position,
        rotation,
        angle_Top,
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
              <Button variant="outlined" startIcon={<KeyboardArrowDown fontSize="small" sx={{ color: "white" }} />}>
                Anexos
              </Button>

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
            checked={_top}
            onChange={(e) => {
              _setTop(e.target.checked);
            }}
            sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
          />
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Typography>Show Floor</Typography>
          <Checkbox
            checked={_floor}
            onChange={(e) => {
              _setFloor(e.target.checked);
            }}
            sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
          />
          <TextField type="file" onChange={(e) => handleFileChange(e as React.ChangeEvent<HTMLInputElement>, setFloorTexture)}>
            {floorTexture && <Image src={URL.createObjectURL(floorTexture)} alt="Floor Texture" />}
          </TextField>
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
              select={e.selected}
              setSelect={() => toggleSelectLot(e.id, "S")}
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
                selected: block.selected,
                position: position,
                rotation: rotation,
                angle_Top: angle_Top,
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
