import { Room } from "@/app/page";
import { CheckBox } from "@mui/icons-material";
import { Box, Slider, Stack, TextField, Typography } from "@mui/material";

export default function BlocksList({ blockList }: { blockList: Room[] }, ) {
  function Blocks(blockList: Room[]) {
    return blockList.map((e) => (
      <Box width={"100%"} padding={.5} >
        <Typography fontSize={20}  justifySelf={"center"} >{e.name}</Typography>
        <Box display={"flex"} flexDirection={"column"}   >
        <Box >
              <Typography >width</Typography>
              <Stack spacing={-1}>
                <Slider value={e.width} />
                <TextField
                  value={e.width}
                  
                  sx={{alignSelf:"end", width: "5vw","& .MuiFilledInput-root":{
                      color:"white"            
                  } }}
                  size="small"
                  type="number"
                  variant="filled"
                />
              </Stack>
            </Box>
            <Box>
              <Typography >length</Typography>
              <Stack spacing={-1}>
                <Slider value={e.length} />
                <TextField
                
                  value={e.width}
                   sx={{alignSelf:"end", width: "5vw","& .MuiFilledInput-root":{
                      color:"white"            
                  } }}
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
                   sx={{alignSelf:"end", width: "5vw","& .MuiFilledInput-root":{
                      color:"white"            
                  } }}
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
                   sx={{alignSelf:"end", width: "5vw","& .MuiFilledInput-root":{
                      color:"white"            
                  } }}
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
                   sx={{alignSelf:"end", width: "5vw","& .MuiFilledInput-root":{
                      color:"white"            
                  } }}
                  size="small"
                  type="number"
                  variant="filled"
                />
              </Stack>
          </Box>
        </Box>
        <Box>
          
        <Box display={"flex"} marginTop={2} justifyContent={"space-between"} >
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
