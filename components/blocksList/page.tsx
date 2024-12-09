import { Room } from "@/app/page";

import {
  Box,
  Checkbox,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Center } from "@react-three/drei";
import { Dispatch, SetStateAction, useState } from "react";
export default function BlocksList({
  top,
  floor,
  setFloor,
  setTop,
  blockList,
}: {
  top: boolean,
  floor:boolean,
  setFloor: Dispatch<SetStateAction<boolean>>;
  setTop: Dispatch<SetStateAction<boolean>>;
  blockList: Room[];
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  function Blocks(blockList: Room[]) {
    return blockList.map((e) => (
      <Box width={"100%"} padding={0.5} >
        <Typography fontSize={20} justifySelf={"center"}>
          {e.name}
        </Typography>
        <Box display={"flex"} flexDirection={"column"}>
          <Box>
            <Typography>width</Typography>
            <Stack spacing={-1}>
              <Slider value={e.width} />
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
              <Slider value={e.length} />
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
              <Slider value={e.size} />
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
              <Slider value={e.height} />
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
              <Slider value={e.tickLot} />
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
        <Box>
          <Box display={"flex"} marginTop={2} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <Typography>show top</Typography>
              <Checkbox
                onChange={(e) => setTop(e.target.checked ? true : false)}
              />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Typography>show floor</Typography>
              <Checkbox
                onChange={(e) => setFloor(e.target.checked ? true : false)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    ));
  }
  return <Box>{Blocks(blockList)}</Box>;
}
