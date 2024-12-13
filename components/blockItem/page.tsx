import { Room } from "@/app/page";
import {
  Box,
  Button,
  Checkbox,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";
import BlocksList from "../blocksList/page";


interface BlockItemProps {
  id: number;
  block: Room;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  top: boolean;
  byLot?: boolean;
  floor: boolean;
  disable: boolean;
  setDisable: Dispatch<SetStateAction<boolean>>;
  _byLot?: number;
  countBlock?: number;
  setCountBlock?: Dispatch<SetStateAction<number>>;
  setObjects?: Dispatch<SetStateAction<Room[]>>;
  objects?:Room[] | undefined;
}

export default function BlockItem({
    id,
  block,
  byLot,
  showModal,
  setShowModal,
  top,
  floor,
  disable,
  setDisable,
  _byLot,
  countBlock,
  setCountBlock,
  setObjects,
  objects,
}: BlockItemProps) {
  const [width, setWidth] = useState<number>(block.width);
  const [height, setHeight] = useState<number>(block.height || 0);
  const [size, setSize] = useState<number>(block.size || 0);
  const [length, setLength] = useState<number>(block.length || 0);
  const [tickLot, setTickLot] = useState<number>(0);
  const [_floor, _setFloor] = useState<boolean>(floor);
  const [_top, _setTop] = useState<boolean>(top);
  const [_objects, _setObjects] = useState<Room[]>([]);
  const [_countBlock, _setCountBlock] = useState<number>(0);
  function createBlock({ length, width, size, height, name, tickLot }: Room) {
     
    
    _setObjects((prevObjects) => [...prevObjects, {id: _countBlock, length, width, size, height, name, tickLot }]);
    _setCountBlock(Number(_countBlock + 1));
    console.log(_objects);
  }

  return (
    <Box
      width={"100%"}
      padding={showModal ? 1 : 2}
      boxShadow={showModal ? "0 0 3px 0" : "0 0 0 0"}
      bgcolor={"rgba(255,255,255,0.04)"}
      borderRadius={3}
    >
    <Box display={"flex"} position="relative"  justifyContent={"center"}>
  <Box
    position="absolute"
    left="0%"
    top="20%"
   
  >
    <Typography fontSize={15}>{id}</Typography>
  </Box>
  <Box justifyContent={"center"}>
  <Typography fontSize={20}>
    {block.name}
  </Typography>
</Box>
</Box>
          
      <Box display={"flex"} marginTop={2} justifyContent={"space-between"}>
        
        <Box display={"flex"} alignItems={"center"}>
          <Typography>Disable</Typography>
          <Checkbox
            value={disable}
            onChange={(e) => setDisable(e.target.checked)}
            sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
          />
        </Box>
      </Box>
      {showModal ? (
        <>
          <Box display={"flex"} flexDirection={"column"}>
            <Box>
              <Typography>Width</Typography>
              <Stack spacing={-1}>
                <Slider
                  onChange={(event, newValue) => setWidth(Number(newValue))}
                  value={width}
                  sx={{ color: "white" }}
                  min={0}
                  max={100}
                />
                <TextField
                  value={width}
                  onChange={(event) => setWidth(Number(event.target.value))}
                  sx={{
                    alignSelf: "end",
                    width: "5vw",
                    "& .MuiFilledInput-root": { color: "white" },
                  }}
                  size="small"
                  type="number"
                  variant="filled"
                />
              </Stack>
            </Box>

            <Box>
              <Typography>Length</Typography>
              <Stack spacing={-1}>
                <Slider
                  onChange={(event, newValue) => setLength(Number(newValue))}
                  value={length}
                  sx={{ color: "white" }}
                />
                <TextField
                  value={length}
                  onChange={(event) => setLength(Number(event.target.value))}
                  sx={{
                    alignSelf: "end",
                    width: "5vw",
                    "& .MuiFilledInput-root": { color: "white" },
                  }}
                  size="small"
                  type="number"
                  variant="filled"
                />
              </Stack>
            </Box>
            <Box>
              <Typography>Wall Size</Typography>
              <Stack spacing={-1}>
                <Slider
                  onChange={(event, newValue) => setSize(Number(newValue))}
                  value={size}
                  sx={{ color: "white" }}
                  min={0}
                  max={100}
                />
                <TextField
                  value={size}
                  onChange={(event) => setSize(Number(event.target.value))}
                  sx={{
                    alignSelf: "end",
                    width: "5vw",
                    "& .MuiFilledInput-root": { color: "white" },
                  }}
                  size="small"
                  type="number"
                  variant="filled"
                />
              </Stack>
            </Box>
            <Box>
              <Typography>Wall Height</Typography>
              <Stack spacing={-1}>
                <Slider
                  onChange={(event, newValue) => setHeight(Number(newValue))}
                  value={height}
                  sx={{ color: "white" }}
                  min={0}
                  max={100}
                />
                <TextField
                  value={height}
                  onChange={(event) => setHeight(Number(event.target.value))}
                  sx={{
                    alignSelf: "end",
                    width: "5vw",
                    "& .MuiFilledInput-root": { color: "white" },
                  }}
                  size="small"
                  type="number"
                  variant="filled"
                />
              </Stack>
            </Box>
            <Box>
              <Typography>Lot Thick</Typography>
              <Stack spacing={-1}>
                <Slider
                  onChange={(event, newValue) => setTickLot(Number(newValue))}
                  value={tickLot}
                  sx={{ color: "white" }}
                  min={0}
                  max={100}
                />
                <TextField
                  value={tickLot}
                  onChange={(event) => setTickLot(Number(event.target.value))}
                  sx={{
                    alignSelf: "end",
                    width: "5vw",
                    "& .MuiFilledInput-root": { color: "white" },
                  }}
                  size="small"
                  type="number"
                  variant="filled"
                />
              </Stack>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box display={"flex"} gap={"5vw"} padding={".1vw"}>
            <TextField
              value={width}
              label="Width"
              sx={{
                alignSelf: "end",
                "& .MuiFilledInput-root": { color: "white" },
              }}
              size="small"
              type="number"
              variant="filled"
            />
            <TextField
              value={length}
              label="Length"
              sx={{
                alignSelf: "end",
                "& .MuiFilledInput-root": { color: "white" },
              }}
              size="small"
              type="number"
              variant="filled"
            />
          </Box>
        </>
      )}
      <Box display={"flex"} marginTop={2} justifyContent={"space-between"}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography>Show Top</Typography>
          <Checkbox
            value={top}
            onChange={(e) => _setTop(e.target.checked)}
            sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
          />
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Typography>Show Floor</Typography>
          <Checkbox
            value={floor}
            onChange={(e) => _setFloor(e.target.checked)}
            sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
          />
        </Box>
      </Box>
      {byLot ? (
        <></>
      ) : (
        
        <Box>
          {
          _objects && _countBlock ? (
           
        <BlocksList blockList={_objects} setObjects={_setObjects} countBlock={_countBlock} />
      
          ) : (
            <></>
          )
        }
         
            <Button sx={{ alignItems: "center", width: "100%", color: "white" }} onClick={() => createBlock({id:_countBlock,length:length, width:width, size:size, height:height, name:"novo", tickLot:tickLot})}>
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
