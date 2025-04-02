import React, { Dispatch, SetStateAction } from "react";
import { Box, Typography, IconButton, Checkbox } from "@mui/material";
import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import Image from "next/image";

interface TexturePanelProps {
    name: string;
    topTexture: string | null;
    floorTexture: string | null;
    wallTexture: string | null;
    _top: boolean;
    _floor: boolean;
    _setTop: (checked: boolean) => void;
    _setFloor: (checked: boolean) => void;
    setTopTexture: Dispatch<SetStateAction<string>>;
    setFloorTexture: Dispatch<SetStateAction<string>>;
    setWallTexture: Dispatch<SetStateAction<string>>;
    handleFileChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        _set: Dispatch<SetStateAction<string>>,
        newName: string,
        setFiles: Dispatch<SetStateAction<{ name: string; url: string; data: ArrayBuffer }[]>>
    ) => void;
    setFiles: Dispatch<SetStateAction<{ name: string; url: string; data: ArrayBuffer }[]>>;
}

const VisuallyHiddenInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            border: 0,
        }}
        {...props}
    />
);

export default function TexturePanel({
    name,
    topTexture,
    floorTexture,
    wallTexture,
    _top,
    _floor,
    _setTop,
    _setFloor,
    setTopTexture,
    setFloorTexture,
    setWallTexture,
    handleFileChange,
    setFiles
}: TexturePanelProps) {
    return (
        <Box display={"flex"} marginTop={2} flexDirection={"column"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"} height={"5vh"} justifyContent={"space-between"}>
                <Typography width={"35%"} color="white">
                    Show Top
                </Typography>
                <label htmlFor={`file-upload-${name}-top`} style={{ cursor: "pointer" }}>
                    {topTexture ? (
                        <Image src={topTexture} alt="Description of the images" width={30} height={30} />
                    ) : (
                        <IconButton
                            size="medium"
                            sx={{ color: "white" }}
                            onClick={() => document.getElementById(`file-upload-${name}-top`)?.click()}
                        >
                            <CloudUploadOutlined fontSize="medium" />
                        </IconButton>
                    )}
                </label>
                <VisuallyHiddenInput
                    id={`file-upload-${name}-top`}
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                        await handleFileChange(event, setTopTexture, `${name}-topTexture.png`, setFiles);
                    }}
                    multiple
                />
                <Checkbox
                    checked={_top}
                    onChange={(e) => {
                        _setTop(e.target.checked);
                    }}
                    sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
                />
            </Box>

            <Box display={"flex"} alignItems={"center"} height={"5vh"} justifyContent={"space-between"}>
                <Typography width={"35%"} color="white">
                    Show Floor
                </Typography>
                <label htmlFor={`file-upload-${name}-floor`} style={{ cursor: "pointer" }}>
                    {floorTexture ? (
                        <Image src={floorTexture} alt="Description of the image" width={30} height={30} />
                    ) : (
                        <IconButton
                            size="medium"
                            sx={{ color: "white" }}
                            onClick={() => document.getElementById(`file-upload-${name}-floor`)?.click()}
                        >
                            <CloudUploadOutlined fontSize="medium" />
                        </IconButton>
                    )}
                </label>
                <VisuallyHiddenInput
                    id={`file-upload-${name}-floor`}
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                        await handleFileChange(event, setFloorTexture, `${name}-floorTexture.png`, setFiles);
                    }}
                    multiple
                />
                <Checkbox
                    checked={_floor}
                    onChange={(e) => {
                        _setFloor(e.target.checked);
                    }}
                    sx={{ "&.MuiCheckbox-sizeMedium": { color: "white" } }}
                />
            </Box>

            <Box display={"flex"} alignItems={"center"} height={"5vh"} justifyContent={"space-between"}>
                <Typography width={"35%"} color="white">
                    Wall Texture
                </Typography>
                <label htmlFor={`file-upload-${name}-wall`} style={{ cursor: "pointer" }}>
                    {wallTexture ? (
                        <Image src={wallTexture} alt="Description of the image" width={30} height={30} />
                    ) : (
                        <IconButton
                            size="medium"
                            sx={{ color: "white" }}
                            onClick={() => document.getElementById(`file-upload-${name}-wall`)?.click()}
                        >
                            <CloudUploadOutlined fontSize="medium" />
                        </IconButton>
                    )}
                </label>
                <VisuallyHiddenInput
                    id={`file-upload-${name}-wall`}
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                        await handleFileChange(event, setWallTexture, `${name}-wallTexture.png`, setFiles);
                    }}
                    multiple
                />
            </Box>
        </Box>
    );
};

