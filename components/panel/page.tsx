import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

import { Dispatch, SetStateAction } from "react";

export default function Panel({
  width,
  height,
  thickLot,
  thickWall,
  nameObject,
  length,
  setHeight,
  setNameObject,
  setLength,
  setWidth,
  setThickLot,
  setThick,
  thick,
  setSize,
  togglePanel,
  createLot,
}: {
  width: number;
  height: number;
  thickLot: number;
  thickWall: number;
  nameObject: string;
  length: number;
  setHeight: Dispatch<SetStateAction<number>>;
  setNameObject: Dispatch<SetStateAction<string>>;
  setLength: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
  setThickLot: Dispatch<SetStateAction<number>>;
  setThick: Dispatch<SetStateAction<boolean>>;
  setSize: Dispatch<SetStateAction<number>>;
  thick: boolean;
  togglePanel: () => void;
  createLot: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "21vh",
        left: "12vh",
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          padding: 2,
          backgroundColor: "white",
          justifyItems: "center",
          borderColor: "white",
          borderWidth: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" color="textPrimary">
          Terrain
        </Typography>
        <List>
          <ListItem>
            <TextField
              type="text"
              label="name"
              size="small"
              value={nameObject}
              onChange={(e) => setNameObject(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Width"
              type="number"
              size="small"
              value={width}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (value >= 0) {
                  setWidth(value);
                }
              }}
              sx={{ marginBottom: 1 }}
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Length"
              type="number"
              size="small"
              value={length}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) {
                  setLength(value);
                }
              }}
              sx={{ marginBottom: 1 }}
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Thick Lot"
              type="number"
              size="small"
              value={thickLot}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) {
                  setThickLot(value);
                }
              }}
              sx={{ marginBottom: 1 }}
            />
          </ListItem>
          <ListItem>
            <Typography color="textPrimary">Enable Walls </Typography>
            <Checkbox
              onChange={(e) => setThick(e.target.checked ? true : false)} 
            />
          </ListItem>
          {thick && (
            <List>
              <ListItem>
                <TextField
                  variant="outlined"
                  type="number"
                  label="Thick Wall"
                  size="small"
                  value={thickWall}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setSize(value);
                    }
                  }}
                />
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  type="number"
                  label="Height"
                  size="small"
                  value={height}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setHeight(value);
                    }
                  }}
                />
              </ListItem>
            </List>
          )}
        </List>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ color: "black", borderWidth: 2 }}
          onClick={() => {
            togglePanel();
            createLot();
          }}
          startIcon={<Add />}
        >
          Criar
        </Button>
      </Box>
    </div>
  );
}
