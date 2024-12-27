import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { Room } from "@/app/page";
import { Dispatch, SetStateAction, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const BlockHeader = ({ name, id, disable, setDisable, select, setSelect, byLot }: { name:string, id:number, disable:boolean, setDisable: () => void, select: boolean | undefined, setSelect: () => void , byLot: boolean | undefined}) => {
  
    function handleSelected() {
      setSelect();
    }
    return (
       <Box>
        <Box display={"flex"} position="relative" justifyContent={"center"}  borderRadius={4} borderColor="grey.300">
                <Box position="absolute" left="0%" top="20%">
                  <Typography fontSize={15}>{id + 1}</Typography>
                </Box>
                <Box justifyContent={"center"}>
                  <Typography fontSize={20}>{name}</Typography>
                </Box>
                {!byLot && (
                 <IconButton onClick={handleSelected} sx={{ position: "absolute", right: 0 }}> 
          <VisibilityOffIcon sx={{ color: "white" }} />
        </IconButton>)}
              </Box>
        
              <Box display={"flex"} marginTop={2} justifyContent={"space-between"}>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography>Disable</Typography>
                  <Checkbox
                    value={disable}
                    onChange={setDisable}
                    sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
                  />
                </Box>
       </Box>
       </Box>
    );
};

export default BlockHeader;
