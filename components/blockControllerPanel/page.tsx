import React from "react";
import { Box, Typography, Button, List } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown, Add } from "@mui/icons-material";
import { BlockController } from "../blockController/page";
import AngleController, { AngleTop } from "../angleController/page";
import ComponentSelect, { WallType } from "../componentSelect/page";
import ComponentBlock, { Component } from "../componentBlock/page";


interface BlockControllerPanelProps {
    width: number;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    length: number;
    setLength: React.Dispatch<React.SetStateAction<number>>;
    size: number;
    setSize: React.Dispatch<React.SetStateAction<number>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    tickLot: number;
    setTickLot: React.Dispatch<React.SetStateAction<number>>;
    position: { x: number; y: number; z: number };
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number; z: number }>>;
    rotation: { x: number; y: number; z: number };
    setRotation: React.Dispatch<React.SetStateAction<{ x: number; y: number; z: number }>>;
    upperGap: { x: number; z: number };
    setUpperGap: React.Dispatch<React.SetStateAction<{ x: number; z: number }>>;
    topHeight: number;
    setTopHeight: React.Dispatch<React.SetStateAction<number>>;
    topPosition: { x: number; z: number };
    setTopPosition: React.Dispatch<React.SetStateAction<{ x: number; z: number }>>;
    angle_Top: AngleTop;
    setAngle_Top: React.Dispatch<React.SetStateAction<AngleTop>>;
    showAddModal: boolean;
    setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    panelVisible: boolean;
    showComponentPanel: () => void;
    handleAddComponent: (type: number, wall: WallType ) => void;
    components: Array<Component>;
    updateBlock: (component: Component) => void;
    handleDeleteComponent: (id: number) => void;
}

export default function BlockControllerPanel ({
    width,
    setWidth,
    length,
    setLength,
    size,
    setSize,
    height,
    setHeight,
    tickLot,
    setTickLot,
    position,
    setPosition,
    rotation,
    setRotation,
    upperGap,
    setUpperGap,
    topHeight,
    setTopHeight,
    topPosition,
    setTopPosition,
    angle_Top,
    setAngle_Top,
    showAddModal,
    setShowAddModal,
    panelVisible,
    showComponentPanel,
    handleAddComponent,
    components,
    updateBlock,
    handleDeleteComponent,
}: BlockControllerPanelProps) {
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <BlockController name="Width" value={width} setValue={setWidth} type={true} />
            <BlockController name="Length" value={length} setValue={setLength} type={true} />
            <BlockController name="Wall Size" value={size} setValue={setSize} type={true} />
            <BlockController name="Wall Height" value={height} setValue={setHeight} type={true} />
            <BlockController name="Lot Thick" value={tickLot} setValue={setTickLot} type={true} />

            <Box>
                <Typography color="white">Position</Typography>
                <br />
                <BlockController
                    name="X"
                    value={position.x}
                    setValue={(newX) => setPosition((prev) => ({ ...prev, x: newX as number }))}
                    type={false}
                />
                <BlockController
                    name="Y"
                    value={position.y}
                    setValue={(newY) => setPosition((prev) => ({ ...prev, y: newY as number }))}
                    type={false}
                />
                <BlockController
                    name="Z"
                    value={position.z}
                    setValue={(newZ) => setPosition((prev) => ({ ...prev, z: newZ as number }))}
                    type={false}
                />
            </Box>

            <Box>
                <Typography color="white">Rotation</Typography>
                <br />
                <BlockController
                    name="X"
                    value={rotation.x}
                    setValue={(newX) => setRotation((prev) => ({ ...prev, x: newX as number }))}
                    type={false}
                />
                <BlockController
                    name="Y"
                    value={rotation.y}
                    setValue={(newY) => setRotation((prev) => ({ ...prev, y: newY as number }))}
                    type={false}
                />
                <BlockController
                    name="Z"
                    value={rotation.z}
                    setValue={(newZ) => setRotation((prev) => ({ ...prev, z: newZ as number }))}
                    type={false}
                />
            </Box>

            <Box>
                <Typography color="white">Top Control</Typography>
                <br />
                <BlockController
                    name="Upper Gap X"
                    value={upperGap.x}
                    setValue={(newX) => setUpperGap((preview) => ({ ...preview, x: newX as number }))}
                    type={true}
                />
                <BlockController
                    name="Upper Gap Z"
                    value={upperGap.z}
                    setValue={(newZ) => setUpperGap((preview) => ({ ...preview, z: newZ as number }))}
                    type={true}
                />
                <BlockController name="Top Height" value={topHeight} setValue={setTopHeight} type={true} />
                <BlockController
                    name="X Top"
                    value={topPosition.x}
                    setValue={(newX) => setTopPosition((preview) => ({ ...preview, x: newX as number }))}
                    type={false}
                />
                <BlockController
                    name="Z Top"
                    value={topPosition.z}
                    setValue={(newZ) => setTopPosition((preview) => ({ ...preview, z: newZ as number }))}
                    type={false}
                />
            </Box>

            <Box>
                <Typography color="white">Angle Top</Typography>
                <AngleController angle_Top={angle_Top} setAngle_Top={setAngle_Top} />
            </Box>

            <Box>
                <Button
                    sx={{
                        alignItems: "center",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    onClick={() => {
                        setShowAddModal(!showAddModal);
                        panelVisible ? showComponentPanel() : null;
                    }}
                >
                    <Typography sx={{ color: "white", fontSize: 15 }}>Components</Typography>
                    {showAddModal ? (
                        <KeyboardArrowUp fontSize="large" sx={{ color: "white" }} />
                    ) : (
                        <KeyboardArrowDown fontSize="large" sx={{ color: "white" }} />
                    )}
                </Button>
                {showAddModal && (
                    <Box>
                        <Button
                            sx={{
                                width: "100%",
                                color: "white",
                            }}
                            onClick={showComponentPanel}
                        >
                            <Add fontSize="medium" />
                        </Button>
                        {panelVisible && (
                            <Box>
                                <List>
                                    <ComponentSelect handleAddComponent={handleAddComponent} type={0} />
                                    <ComponentSelect handleAddComponent={handleAddComponent} type={1} />
                                    <ComponentSelect handleAddComponent={handleAddComponent} type={2} />
                                </List>
                            </Box>
                        )}

                        <Box>
                            <List
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.5vh",
                                }}
                            >
                                {components.map((component) => (
                                    <ComponentBlock
                                        key={component.id}
                                        updateComponent={updateBlock}
                                        component={component}
                                        onDelete={() => handleDeleteComponent(component.id)}
                                    />
                                ))}
                            </List>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
