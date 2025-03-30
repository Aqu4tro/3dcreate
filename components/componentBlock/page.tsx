import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
export interface Component {
  id: number;
  name: string;
  wall: string;
  type: number;
  position: [x: number, y: number, z: number];
  scale: [x: number, y: number, z: number];
  disabled: boolean;

}

export default function ComponentBlock({
  component, updateComponent, onDelete
}: {
  component: Component;
  updateComponent: (component: Component) => void;
  onDelete: (id: number) => void;

}) {

  const [position, setPosition] = useState<[number, number, number]>(() => (component.position[0] === 0 && component.position[1] === 0 && component.position[2] === 0) ? [ 0, 0, component.wall === "F" ? (0.05) : component.wall === "B" ? .1 : 0] : component.position);
  const [scale, setScale] = useState<[number, number, number]>(component.scale[0] !== 1 && component.scale[1] !== 1 && component.scale[2] !== 1 ? component.scale : [component.type ? .6 : .8, component.type ? .1 : .1, .1]);
  component.position = position;
  component.scale = scale;
  
  function _updateBlock() {
    updateComponent({
      ...component,
      position: position,
      scale: scale,
      
    });
  }
  return (

    <ListItem sx={{
      display: "flex",
      flexDirection: "row",
      padding: 1,
      boxShadow: "0 0 3px 0",
      height: "30vh",
      borderRadius: 3
    }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: "1vh" }}>
        <Box sx={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "space-between", width: "90%" }}>
          <Typography color="white">Id: {component.id}</Typography>
          <Typography color="white">{component.name}</Typography>
          <Typography color="white">Wall: {component.wall}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "self-start", width: "90%" }}>
          <Typography color="white">Positon:</Typography>
          <List sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <TextField
              label="X"
              value={component.position[component.wall === "F" || component.wall === "B" ? 0 : component.wall === "L" || component.wall === "R" ? 2 : 0]}

              onChange={(e) => {
                setPosition([component.wall === "F" || component.wall === "B" ? Number(e.target.value) : position[0], position[1], component.wall === "L" || component.wall === "R" ? Number(e.target.value) : position[2]]);
                _updateBlock();
              }}
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
              onChange={(e) => {
                setPosition([position[0], Number(e.target.value), position[2]]);
                _updateBlock();
              }}
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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "self-start", width: "90%" }}>
          <Typography color="white">Scale:</Typography>
          <List sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <TextField
              label="X"
              value={component.type ? component.scale[2] : component.scale[0]}
              
              onChange={(e) => {
                setScale([!component.type ? Number(e.target.value) : scale[0], scale[1], !component.type ? scale[2] : Number(e.target.value)]);
                _updateBlock();
              }}
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
              onChange={(e) => {
                setScale([scale[0], Number(e.target.value), scale[2]]);
                _updateBlock();
              }}
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
      </Box>
      <Button
        onClick={() => {
          onDelete(component.id);
        }}
        sx={{ height: "100%", borderWidth: 3 }}
        variant="outlined"
        color="error"
      >
        <Delete color="error" fontSize="large" />
      </Button>
    </ListItem>

  );
}
