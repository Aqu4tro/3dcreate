import { Box, Checkbox, IconButton, TextField, Typography } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Delete, Done, Edit, KeyboardArrowUp } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";
function BlockHeader ({ name, id, disable, setDisable, setSelect, byLot, onDelete, renameBlock }: { name: string, id: number, disable: boolean, setDisable: () => void, select: boolean | undefined, setSelect: () => void, byLot: boolean | undefined, onDelete: () => void, renameBlock: Dispatch<SetStateAction<string>>}) {
  const [renameState, setRenameState] = useState<boolean>(false);
  function handleSelected() {
    setSelect();
  }
  
  return (
    <Box>
      <Box display={"flex"} position="relative" justifyContent={"center"} borderRadius={4} borderColor="grey.300">

        <IconButton onClick={handleSelected} sx={{ position: "absolute", left: 0 }}>
          {!byLot ? (
            <VisibilityOffIcon sx={{ color: "white" }} />

          ) : (<KeyboardArrowUp sx={{ color: "white" }} />)}
        </IconButton>

{!renameState ? (
  <Box justifyContent={"center"} display={"flex"} width={"50%"} sx={{justifyContent:"space-evenly"}}>
          <Typography fontSize={20} color="white">{id + 1}  {name}</Typography>
          <IconButton  onClick={() => setRenameState(true) } sx={{ position: "absolute", right: "10%" }}>
            <Edit sx={{color: "white"}} />
          </IconButton>
        </Box>)
        :
        (
        <Box justifyContent={"center"} display={"flex"} width={"50%"} sx={{justifyContent:"space-evenly"}}>
          <TextField value={name} onChange={(e) => renameBlock(e.target.value)} sx={{
            alignSelf: "end",
            width: "15vw",
            "& .MuiOutlinedInput-root": { color: "white" },
          }}
          size="medium"
          type="text"
          variant="outlined"/>
          <IconButton  onClick={() => setRenameState(false)}>
            <Done sx={{color: "white"}} />
          </IconButton>
        </Box>
        )
}
        

        <IconButton onClick={onDelete} sx={{ position: "absolute", right: 0 }}>
          <Delete color="error" />
        </IconButton>



      </Box>

      <Box display={"flex"} marginTop={2} justifyContent={"space-between"}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography color="white">Disable</Typography>
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
