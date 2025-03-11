import { Slider, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@react-three/drei";
import { Dispatch, SetStateAction } from "react";

export function BlockController({
  name,
  value,
  setValue,
  disable
}: {
  name: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  disable?: boolean;
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
          min={0}
          max={100}
        />
        <TextField
          value={value}
          onChange={(event) => {
            setValue(Number(event.target.value));
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
  maxValue
}: {
  name: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  disable?: boolean;
  maxValue?: number;
}) {
  return (
    <TextField
      value={value}
      label={name}
      onChange={(e) => {
        setValue(Number(e.target.value));
      }}
      sx={{
        alignSelf: "end",
        "& .MuiFilledInput-root": { color: "white" },
      }}
      size="small"
      type="number"
      variant="filled"
      disabled={disable}

    />
  );
}
