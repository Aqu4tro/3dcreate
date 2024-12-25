import { Box, Checkbox, Typography } from "@mui/material";
import { Room } from "@/app/page";
import { Dispatch, SetStateAction } from "react";

const BlockHeader = ({ name, id, disable, setDisable }: { name:string, id:number, disable:boolean, setDisable: () => void; }) => {
    return (
       <Box>
        <Box display={"flex"} position="relative" justifyContent={"center"}>
                <Box position="absolute" left="0%" top="20%">
                  <Typography fontSize={15}>{id + 1}</Typography>
                </Box>
                <Box justifyContent={"center"}>
                  <Typography fontSize={20}>{name}</Typography>
                </Box>
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
