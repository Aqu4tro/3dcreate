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
        bottom: "10vh",
        left: "3vh",
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
          Terreno
        </Typography>
        <List>
          <ListItem>
            <TextField
              type="text"
              label="name"
              size="small"
              onChange={(e) => setNameObject(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Width"
              type="number"
              size="small"
              onChange={(e) => setWidth(Number(e.target.value))}
              sx={{ marginBottom: 1 }} // Adiciona margem inferior
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Length"
              type="number"
              size="small"
              onChange={(e) => setLength(Number(e.target.value))}
              sx={{ marginBottom: 1 }} // Adiciona margem inferior
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Thick"
              type="number"
              size="small"
              onChange={(e) => setThickLot(Number(e.target.value))}
              sx={{ marginBottom: 1 }} // Adiciona margem inferior
            />
          </ListItem>
          <ListItem>
            <Typography color="textPrimary">Enable Walls </Typography>
            <Checkbox
              onChange={(e) => setThick(e.target.checked ? true : false)} // Exemplo de uso
            />
          </ListItem>

          <List sx={{ display: thick ? "block" : "none" }}>
            <ListItem>
              <TextField
                variant="outlined"
                type="number"
                label="Size"
                size="small"
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </ListItem>
            <ListItem>
              <TextField
                variant="outlined"
                type="number"
                label="Height"
                size="small"
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </ListItem>
          </List>
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
