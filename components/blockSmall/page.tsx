import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import React from "react";
import { Typography, Box } from "@mui/material";

interface BlockSmallProps {
  name: string;
  disable: boolean | undefined;
  setSelect: () => void;
}

function BlockSmall({ name, disable, setSelect }: BlockSmallProps) {


  function handleSelected() {
    setSelect();
  }
  return (
    <Box
     
      border={1}
      borderRadius={4}
      borderColor="grey.300"
      display="flex"
      padding={1}
        justifyContent="space-between"
    >
      <Typography variant="h6">{name}</Typography>
      <IconButton onClick={handleSelected} >
        
          <VisibilityIcon sx={{ color: "white" }} />
      
      </IconButton>
    </Box>
  );
}

export default BlockSmall;
