import { Slider, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@react-three/drei";
import { Dispatch, SetStateAction } from "react";

export function BlockController({
  name,
  value,
  setValue,
  disable,
  type
}: {
  name: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  disable?: boolean;
  type: boolean; // 0 is for position, 1 is for scale
}) {
  return (
    <Box>
      <Typography color="white">{name}</Typography>
      <Stack spacing={-1}>
        <Slider
          onChange={(event, newValue) => {
            setValue(Number(newValue));
          }}
          value={value}
          sx={{ color: "white" }}
          min={type ? 0 : -100}
          max={type ? 200 : 100}
        />
        <TextField
          value={value}
          onChange={(e) => {
            const inputValue = Number(e.target.value);
            if (type) {
              if (inputValue >= 0 && inputValue <= 1) {
                setValue(inputValue);
              }
            } else {
              setValue(inputValue);
            }
          }}
          sx={{
            alignSelf: "end",
            width: "5vw",
            "& .MuiFilledInput-root": { color: "white" },
          }}
          size="small"
          type="number"
          variant="filled"
          disabled={disable}
        />
      </Stack>
    </Box>
  );
}
export function SmallBlockController({
  name,
  value,
  setValue,
  disable,
  type, 
}: {
  name: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  disable?: boolean;
  type: number; // 0 is for position, 1 is for scale, 2 is for angle
}) {
  return (
    <TextField
    value={value}
    label={name}
    onChange={(e) => {
      const inputValue = Number(e.target.value);
      if (type === 0) {
        setValue(inputValue);
      } else if (type === 1 && inputValue >= 0) {
        setValue(inputValue);
      } else if (type === 2 && inputValue >= 0 && inputValue <= 1) {
        setValue(inputValue);
      }
    }}
    sx={{
      alignSelf: "end",
      "& .MuiFilledInput-root": { color: "white" },
    }}
    type="number"
    {
      ...(type === 0 ? { min: -100, max: 100 } : { min: 0, max: 1 })
    }
    
    size="small"
    variant="filled"
    disabled={disable}
  />
  
  );
}
