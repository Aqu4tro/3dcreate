import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Delete, KeyboardArrowUp } from "@mui/icons-material";
const BlockHeader = ({ name, id, disable, setDisable, setSelect, byLot, onDelete }: { name: string, id: number, disable: boolean, setDisable: () => void, select: boolean | undefined, setSelect: () => void, byLot: boolean | undefined, onDelete: () => void }) => {

  function handleSelected() {
    setSelect();
  }
  console.log(byLot);
  return (
    <Box>
      <Box display={"flex"} position="relative" justifyContent={"center"} borderRadius={4} borderColor="grey.300">

        <IconButton onClick={handleSelected} sx={{ position: "absolute", left: 0 }}>
          {!byLot ? (
            <VisibilityOffIcon sx={{ color: "white" }} />

          ) : (<KeyboardArrowUp sx={{ color: "white" }} />)}
        </IconButton>


        <Box justifyContent={"center"}>
          <Typography fontSize={20}>{id + 1}  {name}</Typography>
        </Box>

        <IconButton onClick={onDelete} sx={{ position: "absolute", right: 0 }}>
          <Delete color="error" />
        </IconButton>



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
