import { Room } from "@/app/page";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";
import BlockHeader from "../blockHeader/page";
import { BlockController, SmallBlockController } from "../blockController/page";

interface BlockItemProps {
  block: Room;
  byLot?: boolean;
  _byLot?: number;
  floor?:boolean;
  top?:boolean;
  updateLot: (updatedBlock: Room) => void; // Adiciona a função de
}

export default function BlockItem({
  block,
  byLot,
  _byLot,
  updateLot,
  top,
  floor,
}: BlockItemProps) {
  const [width, setWidth] = useState<number>(block.width);
  const [height, setHeight] = useState<number>(block.height || 0);
  const [size, setSize] = useState<number>(block.size || 0);
  const [length, setLength] = useState<number>(block.length || 0);
  const [tickLot, setTickLot] = useState<number>(block.tickLot || 0);
  const [_floor, _setFloor] = useState<boolean>(block.floor || false);
  const [_top, _setTop] = useState<boolean>(block.top || false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [countBlock, setCountBlock] = useState<number>(0);
  block.width = width;
  block.height = height;
  block.length = length;
  block.tickLot = tickLot;
  block.size = size;
  block.floor = _floor;
  block.top = _top;
  //função de update da rendenização
  const updateBlock = () => {
    updateLot({
      ...block,
      width,
      height,
      size,
      length,
      tickLot,
      top: block.top,
      floor: block.floor
    });
    console.log("pu");  
  };
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
    floor
  }: Room) {
    // updateBlock();
    if (
      (objects && countBlock == 0 && setCountBlock) ||
      (countBlock && objects && setCountBlock)
    ) {
      objects.push({ id, length, width, size, height, name, tickLot, top, floor });
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
      />
      {showModal ? (
        <>
          <Box display={"flex"} flexDirection={"column"}>
            <BlockController
              name="Width"
              value={width}
              setValue={setWidth}
              update={() => updateBlock()}
            />
            <BlockController
              name="Length"
              value={length}
              setValue={setLength}
              update={updateBlock}
            />
            <BlockController
              name="Wall Size"
              value={size}
              setValue={setSize}
              update={updateBlock}
            />
            <BlockController
              name="Wall Height"
              value={height}
              setValue={setHeight}
              update={updateBlock}
            />
            <BlockController
              name="Lot Thick"
              value={tickLot}
              setValue={setTickLot}
              update={updateBlock}
            />
          </Box>
        </>
      ) : (
        <>
          <Box display={"flex"} gap={"5vw"} padding={".1vw"}>
            <SmallBlockController
              value={width}
              setValue={setWidth}
              update={updateBlock}
              name="width"
            />
            <SmallBlockController
              value={length}
              setValue={setLength}
              update={updateBlock}
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
              updateBlock();
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
              updateBlock();
            }}
            sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
          />
        </Box>
      </Box>
      {byLot ? (
        <></>
      ) : (
        <Box>
          {block.objects && countBlock ? (
            block.objects.map((e) => (
              <BlockItem
                updateLot={updateBlock}
                block={e}
                byLot={true}
                floor={_floor}
                top={_top}
              />
            ))
          ) : (
            <></>
          )}

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
                top: _top
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
