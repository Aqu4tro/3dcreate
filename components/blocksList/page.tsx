import { Room } from "@/app/page";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Dispatch, SetStateAction, useState } from "react";
export default function BlocksList({
  top,
  floor,
  setFloor,
  setTop,
  blockList,
}: {
  top: boolean;
  floor: boolean;
  setFloor: Dispatch<SetStateAction<boolean>>;
  setTop: Dispatch<SetStateAction<boolean>>;
  blockList: Room[];
}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  function Blocks(blockList: Room[]) {
    return blockList.map((e) => (
      <Box
        width={"100%"}
        padding={2}
        boxShadow={showModal ? "0 0 3px 0" : " 0 0 0 0"}
        bgcolor={"rgba(255,255,255,0.04)"}
        borderRadius={3}
      >
        {showModal ? (
          <>
            <Typography fontSize={20} justifySelf={"center"}>
              {e.name}
            </Typography>
            <Box display={"flex"} flexDirection={"column"}>
              <Box>
                <Typography>width</Typography>
                <Stack spacing={-1}>
                  <Slider
                 onChange={(f) => e.setWidth?.(Number(f))}
                    value={e.width}
                    sx={{
                      color: "white",
                    }}
                  />
                  <TextField
                  
                    value={e.width}
                    sx={{
                      alignSelf: "end",
                      width: "5vw",
                      "& .MuiFilledInput-root": {
                        color: "white",
                      },
                    }}
                    size="small"
                    type="number"
                    variant="filled"
                  />
                </Stack>
              </Box>
              <Box>
                <Typography>length</Typography>
                <Stack spacing={-1}>
                  <Slider
                  onChange={(f) => e.setLength?.(Number(f))}
                    value={e.length}
                    sx={{
                      color: "white",
                    }}
                  />
                  <TextField
                    value={e.width}
                    sx={{
                      alignSelf: "end",
                      width: "5vw",
                      "& .MuiFilledInput-root": {
                        color: "white",
                      },
                    }}
                    size="small"
                    type="number"
                    variant="filled"
                  />
                </Stack>
              </Box>
              <Box>
                <Typography>Wall thick</Typography>
                <Stack spacing={-1}>
                  <Slider
                  onChange={(f) => e.setSize?.(Number(f))}
                    value={e.size}
                    sx={{
                      color: "white",
                    }}
                  />
                  <TextField
                    value={e.width}
                    sx={{
                      alignSelf: "end",
                      width: "5vw",
                      "& .MuiFilledInput-root": {
                        color: "white",
                      },
                    }}
                    size="small"
                    type="number"
                    variant="filled"
                  />
                </Stack>
              </Box>
              <Box>
                <Typography>Wall height</Typography>
                <Stack spacing={-1}>
                
                  <Slider
                  onChange={(f) => e.setHeight?.(Number(f))}
                    value={e.height}
                    sx={{
                      color: "white",
                    }}
                  />
                  <TextField
                    value={e.width}
                    sx={{
                      alignSelf: "end",
                      width: "5vw",
                      "& .MuiFilledInput-root": {
                        color: "white",
                      },
                    }}
                    size="small"
                    type="number"
                    variant="filled"
                  />
                </Stack>
              </Box>
              <Box>
                <Typography>Floor thick</Typography>
                <Stack spacing={-1}>
                  <Slider
                  onChange={(f) => e.setHeight?.(Number(f))}
                    value={e.tickLot}
                    sx={{
                      color: "white",
                    }}
                  />
                  <TextField
                    value={e.width}
                    sx={{
                      alignSelf: "end",
                      width: "5vw",
                      "& .MuiFilledInput-root": {
                        color: "white",
                      },
                    }}
                    size="small"
                    type="number"
                    variant="filled"
                  />
                </Stack>
              </Box>
            </Box>
            <Box></Box>
          </>
        ) : (
          <>
            <Typography fontSize={20} justifySelf={"center"}>
              {e.name}
            </Typography>
            <Box display={"flex"} gap={"5vw"} padding={".1vw"}>
              <TextField
                value={e.width}
                label="width"
                sx={{
                  alignSelf: "end",

                  "& .MuiFilledInput-root": {
                    color: "white",
                  },
                }}
                size="small"
                type="number"
                variant="filled"
              />
              <TextField
                value={e.height}
                label="height"
                sx={{
                  alignSelf: "end",

                  "& .MuiFilledInput-root": {
                    color: "white",
                  },
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
            <Typography>show top</Typography>
            <Checkbox
              value={top}
              onChange={(e) => setTop(e.target.checked ? true : false)}
              sx={{
                "&.MuiCheckbox-sizeMedium": {
                  color: "white",
                },
              }}
            />
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Typography>show floor</Typography>
            <Checkbox
              value={floor}
              onChange={(e) => setFloor(e.target.checked ? true : false)}
              sx={{
                "&.MuiCheckbox-sizeMedium": {
                  color: "white",
                },
              }}
            />
          </Box>
        </Box>
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
    ));
  }
  return <Box padding={1}>{Blocks(blockList)}</Box>;
}
