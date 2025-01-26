import {
  Box,
  List,
  ListItem,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
export interface Component {
    id: number;
  name: string;
  wall: string;
  type: boolean;
  position: [x: number, y: number, z: number];
  scale: [x: number, y: number, z: number];
  disabled: boolean;
}

export default function ComponentBlock({
  component,updateComponent
}: {
  component: Component;
  updateComponent: (component: Component) => void;
}) {
  const [position, setPosition] = useState(component.position);
  const [scale, setScale] = useState(component.scale);
  component.position = position;
  component.scale = scale;
  //função de update da rendenização
  function _updateBlock() {
    updateComponent({
      ...component,
      position: position,
      scale: scale,

    });
  }

  return (
    
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
                onChange={(e) => {
                   setPosition([Number(e.target.value), position[1], position[2]]);
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
              <TextField
                label="Z"
                value={component.position[2]}
                disabled={component.wall === "F" || component.wall === "B"}
                onChange={(e) => {
                  setPosition([position[0], position[1], Number(e.target.value)]);
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
          <Box sx={{ display: "flex", flexDirection: "column", alignItems:"self-start", width: "90%" }}>
            <Typography>Scale:</Typography>
            <List sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <TextField
                label="X"
                value={component.scale[0]}
                disabled={component.wall === "L" || component.wall === "R"}
                onChange={(e) => {
                  setScale([Number(e.target.value), scale[1], scale[2]]);
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
              <TextField
                label="Z"
                value={component.scale[2]}
                disabled={component.wall === "F" || component.wall === "B"}
                onChange={(e) => {
                  setScale([scale[0], scale[1], Number(e.target.value)]);
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
        </ListItem>
    
  );
}
