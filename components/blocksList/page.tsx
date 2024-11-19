import { Room } from "@/app/page";
import { CheckBox } from "@mui/icons-material";
import { Box, Slider, Stack, TextField, Typography } from "@mui/material";

export default function BlocksList({ blockList }: { blockList: Room[] }) {
  function Blocks(blockList: Room[]) {
    return blockList.map((e) => (
      <Box>
        <Typography >{e.name}</Typography>
        <Box display={"flex"}>
          <Box>
            <Box>
              <Typography fontSize={1}>width</Typography>
              <Stack>
                <Slider value={e.width} />
                <TextField
                  value={e.width}
                  sx={{ width: "2vw", height: "2vh" }}
                  type="number"
                />
              </Stack>
            </Box>
            <Box>
              <Typography fontSize={1}>width</Typography>
              <Stack>
                <Slider value={e.width} />
                <TextField
                  value={e.width}
                  sx={{ width: "2vw", height: "2vh" }}
                  type="number"
                />
              </Stack>
            </Box>
          </Box>
          <Box>
            <Box display={"flex"}>
                <Typography>show top</Typography>
                <CheckBox />
            </Box>
            <Box display={"flex"}>
                <Typography>show floor</Typography>
                <CheckBox />
            </Box>
          </Box>
        </Box>
      </Box>
    ));
  }
  return <Box>
    {Blocks(blockList)}
  </Box>;
}
