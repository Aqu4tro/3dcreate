import { Slider, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@react-three/drei";
import { Dispatch, SetStateAction } from "react";

export function BlockController({ name, value, setValue, update }: {name:string, value:number, setValue:Dispatch<SetStateAction<number>>, update: () => void}) {
   return(
    <Box>
    <Typography>{name}</Typography>
    <Stack spacing={-1}>
      <Slider
        onChange={(event, newValue) => {
          setValue(Number(newValue));
          update();
        }}
        value={value}
        sx={{ color: "white" }}
        min={0}
        max={100}
      />
      <TextField
        value={value}
        onChange={(event) => {
          setValue(Number(event.target.value));
          update();
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
    </Stack>
  </Box>
   );
}
export function SmallBlockController({ name, value, setValue, update }: {name:string, value:number, setValue:Dispatch<SetStateAction<number>>, update: () => void}){
  return(
    <TextField
    value={value}
    label={name}
    onChange={(e) => {
      setValue(Number(e.target.value));
      update();
    }}
    sx={{
      alignSelf: "end",
      "& .MuiFilledInput-root": { color: "white" },
    }}
    size="small"
    type="number"
    variant="filled"
  />
  );
}