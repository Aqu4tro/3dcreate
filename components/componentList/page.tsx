import {
  Box,
  List,
  ListItem,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
export interface Component {
    id: number;
  name: string;
  wall: string;
  position: [x: number, y: number, z: number];
  scale: [x: number, y: number, z: number];
  disabled: boolean;
}

export default function ComponentList({
  components,
}: {
  components: Component[];
}) {
  return (
    <List sx={{ display: "flex", flexDirection:"column", gap: "1.5vh"}}>
      {components.map((component) => (
        <ListItem sx={{ display: "flex", flexDirection: "column" , width: "100%", gap:"1vh",
        padding:1,
        boxShadow:"0 0 3px 0" ,
        
        borderRadius:3}}>
            <Box sx={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "space-between", width: "90%" }}>
                <Typography>Id: {component.id}</Typography>
                <Typography>{component.name}</Typography>
                <Typography>Wall: {component.wall}</Typography>
            </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems:"self-start", width: "90%" }}>
            <Typography >Positon:</Typography>
            <List sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <TextField
                label="X"
                value={component.position[0]}
                disabled={component.wall === "L" || component.wall === "R"}
                sx={{
                  alignSelf: "end",
                  width: "5vw",
                  "& .MuiFilledInput-root": { color: "white" },
                }}
                size="small"
                type="number"
                variant="filled"
              />
              <TextField
                label="Y"
                value={component.position[1]}
                sx={{
                  alignSelf: "end",
                  width: "5vw",
                  "& .MuiFilledInput-root": { color: "white" },
                }}
                size="small"
                type="number"
                variant="filled"
              />
              <TextField
                label="Z"
                value={component.position[2]}
                disabled={component.wall === "F" || component.wall === "B"}
                sx={{
                  alignSelf: "end",
                  width: "5vw",
                  "& .MuiFilledInput-root": { color: "white" },
                }}
                size="small"
                type="number"
                variant="filled"
              />
            </List>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems:"self-start", width: "90%" }}>
            <Typography>Scale:</Typography>
            <List sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <TextField
                label="X"
                value={component.scale[0]}
                disabled={component.wall === "L" || component.wall === "R"}
                sx={{
                  alignSelf: "end",
                  width: "5vw",
                  "& .MuiFilledInput-root": { color: "white" },
                }}
                size="small"
                type="number"
                variant="filled"
              />
              <TextField
                label="Y"
                value={component.scale[1]}
                sx={{
                  alignSelf: "end",
                  width: "5vw",
                  "& .MuiFilledInput-root": { color: "white" },
                }}
                size="small"
                type="number"
                variant="filled"
              />
              <TextField
                label="Z"
                value={component.scale[2]}
                disabled={component.wall === "F" || component.wall === "B"}
                sx={{
                  alignSelf: "end",
                  width: "5vw",
                  "& .MuiFilledInput-root": { color: "white" },
                }}
                size="small"
                type="number"
                variant="filled"
              />
            </List>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
