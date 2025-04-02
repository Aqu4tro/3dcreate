import { Checkbox, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
import { Typography, Box } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

interface BlockSmallProps {
  id: number;
  byLot: boolean | undefined;
  name: string;
  setSelect: () => void;
  disable: boolean;
  setDisable: () => void;
}

function BlockSmall({
  id,
  name,
  setSelect,
  byLot,
  disable,
  setDisable,
}: BlockSmallProps) {
  function handleSelected() {
    setSelect();
  }
  return (
    <Box
      border={1}
      borderRadius={4}
      borderColor="grey.300"
      display={"flex"}
      position="relative"
      justifyContent={"center"}
      height={"6vh"}
      alignItems={"center"}
    >
      <IconButton
        onClick={handleSelected}
        sx={{ position: "absolute", left: 0, alignSelf: "center" }}
      >
        {byLot ? (
          <KeyboardArrowDown sx={{ color: "white" }} />
        ) : (
          <VisibilityIcon sx={{ color: "white" }} />
        )}
      </IconButton>
      <Typography variant="h6" color="white">
        {id + 1} {name}
      </Typography>

      <Box
        display={"flex"}
        alignItems={"center"}
        alignSelf={"center"}
        sx={{ position: "absolute", right: 0 }}
      >
        <Typography color="white">Disable</Typography>
        <Checkbox
          value={disable}
          onChange={setDisable}
          sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
        />
      </Box>
    </Box>
  );
}

export default BlockSmall;
