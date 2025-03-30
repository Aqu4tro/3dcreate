import React, { useState } from "react";
import { ListItem, Typography, Select, MenuItem, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

export type WallType = "F" | "B" | "L" | "R";


export default function ComponentSelect({ handleAddComponent, type } : {
    handleAddComponent: (type: number, wall: WallType) => void;
    type: number;
}){
    const [wall, setWall] = useState<WallType>("F");

    return (
        <ListItem>
            <Typography color="white">{type === 0 ? "Door" : type === 1 ? "Window" : "Hole"}</Typography>
            <Select
                sx={{ color: "white" }}
                value={wall}
                onChange={(e) => setWall(e.target.value as WallType)}
            >
                <MenuItem value={"F"}>Front</MenuItem>
                <MenuItem value={"B"}>Back</MenuItem>
                <MenuItem value={"L"}>Left</MenuItem>
                <MenuItem value={"R"}>Right</MenuItem>
            </Select>
            <Button onClick={() => handleAddComponent(type, wall)}>
                <Add fontSize="medium" />
            </Button>
        </ListItem>
    );
};

