'use client';
import { Room } from "@/app/page";
import {
  Box,
  Button,
} from "@mui/material";
import {
  Add,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BlockHeader from "../blockHeader/page";
import { SmallBlockController } from "../blockController/page";
import  { Component } from "../componentBlock/page";
import { handleUpload } from "@/utils/upload/page";
import  { WallType } from "../componentSelect/page";
import BlockControllerPanel from "../blockControllerPanel/page";
import TexturePanel from "../texturePanel/page";
import BlockSmall from "../blockSmall/page";

interface BlockItemProps {
  block: Room;
  byLot?: boolean;
  _byLot?: number;
  floor?: boolean;
  top?: boolean;
  disable: boolean;
  setDisable: () => void;
  setSelect: () => void;
  select: boolean | undefined;
  updateLot: (updatedBlock: Room) => void;

  _setBlocks: Dispatch<SetStateAction<Room[]>>;
}

export default function BlockItem({
  block,
  byLot,
  updateLot,
  disable,
  setDisable,
  setSelect,
  select,
  _setBlocks,
}: BlockItemProps) {
  const [width, setWidth] = useState<number>(block.width);
  const [height, setHeight] = useState<number>(block.height || 0);
  const [size, setSize] = useState<number>(block.size || 0);
  const [length, setLength] = useState<number>(block.length || 0);
  const [tickLot, setTickLot] = useState<number>(block.tickLot || 0);
  const [_floor, _setFloor] = useState<boolean>(block.floor);
  const [_top, _setTop] = useState<boolean>(block.top);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [countBlock, setCountBlock] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number; z: number }>(
    block.position
  );
  const [rotation, setRotation] = useState<{ x: number; y: number; z: number }>(
    block.rotation
  );
  const [angle_Top, setAngle_Top] = useState<{
    f: number;
    l: number;
    r: number;
    b: number;
  }>(block.angle_Top);
  const [upperGap, setUpperGap] = useState<{ x: number; z: number; }>(block.upperGap);
  const [topHeight, setTopHeight] = useState<number>(block.topHeight);
  const [topPosition, setTopPosition] = useState<{ x: number; z: number; }>(block.topPosition);
  const [blocks, setBlocks] = useState<Room[]>(block.objects || []);
  const [wallTexture, setWallTexture] = useState<string>(
    block.wallTexture || ""
  );
  const [topTexture, setTopTexture] = useState<string>(block.topTexture || "");
  const [floorTexture, setFloorTexture] = useState<string>(
    block.floorTexture || ""
  );
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [componentId, setComponentId] = useState(0);
  const [components, setComponents] = useState<Component[]>(block.components);
  const [panelVisible, setPanelVisible] = useState<boolean>(false);

  const [name, setName] = useState<string>(block.name)

  function showComponentPanel() {
    setPanelVisible(!panelVisible);
  };

  function handleAddComponent(type: number, wall: WallType) {
    setComponents((prev) => [
          ...prev,
          {
            id: componentId,
            name: type === 0 ? "Door" : type === 1 ? "Window" : "Hole",
            type: type,
            wall: wall,
            position: [0, 0, 0],
            scale: [1, 1, 1],
            disabled: false,
          },
        ]);
    showComponentPanel();
    setComponentId(componentId + 1);
  };

  function handleDeleteComponent(id: number) {
    setComponents((prev) => prev.filter((component) => component.id !== id));
  };

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
    _set: Dispatch<SetStateAction<string>>,
    newName: string
  ): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(newName)
      _set(`/assets/uploads/${newName}`);

      handleUpload(file, newName);
    }
  };

  block.name = name;
  block.width = width;
  block.height = height;
  block.length = length;
  block.tickLot = tickLot;
  block.size = size;
  block.floor = _floor;
  block.top = _top;
  block.objects = blocks;
  block.components = components;
  block.rotation = rotation;
  block.angle_Top = angle_Top;
  block.upperGap = upperGap;
  block.topHeight = topHeight;
  block.topPosition = topPosition;
  block.floorTexture = floorTexture;
  block.topTexture = topTexture;
  block.wallTexture = wallTexture;
  block.position = position;


  function updateBlock() {
    updateLot({
      ...block,
      name,
      width: width,
      height: height,
      size,
      length,
      tickLot,
      top: _top,
      floor: _floor,
    });
  }
  function toggleSelectLot(id: number, t: "D" | "S") {
    setBlocks((prevLot) => {
      return prevLot.map((item) =>
        t == "D"
          ? item.id === id
            ? { ...item, disable: !item.disable }
            : item
          : item.id === id
            ? { ...item, selected: !item.selected }
            : item
      );
    });
  };
  function deleteRoom(id: number, _set: Dispatch<SetStateAction<Room[]>>) {
    _set((prev) => {
      const updatedRooms = prev.filter((c) => c.id !== id);


      if (updatedRooms.length === prev.length) {
        console.warn(`No room found with id: ${id}`);
      }

      return updatedRooms;
    });
  }
  useEffect(() => {
    updateBlock();
  }, [
    name,
    _top,
    _floor,
    width,
    height,
    size,
    length,
    tickLot,
    position,
    rotation,
    angle_Top,
    upperGap,
    topHeight,
    topPosition,
    disable,
    select,
    wallTexture,
    topTexture,
    floorTexture,
    components,
    blocks,
    //updateBlock,
  ]);


  function createBlock({
    id,
    length,
    width,
    size,
    height,
    name,
    tickLot,
    objects,
    top,
    floor,
    position,
    rotation,
    angle_Top,
    components,
    upperGap,
  }: Room) {
    updateBlock();
    if (
      (objects && countBlock == 0 && setCountBlock) ||
      (countBlock && objects && setCountBlock)
    ) {
      objects.push({
        id,
        length,
        width,
        size,
        height,
        name,
        tickLot,
        top,
        floor,
        disable: disable,
        components,
        position,
        rotation,
        angle_Top,
        upperGap,
        topHeight,
        topPosition,
        topTexture: "",
        floorTexture: "",
        wallTexture: "",
        byLot: true,
      });
      setCountBlock(Number(countBlock + 1));
    }
  }
  return (
    <Box
      width={"100%"}
      padding={showModal ? 1 : 2}
      boxShadow={showModal ? "0 0 3px 0" : "0 0 0 0"}
      bgcolor={"rgba(255,255,255,0.04)"}
      borderRadius={3}
    >
      <BlockHeader
        name={name}
        id={block.id}
        disable={disable}
        setDisable={setDisable}
        select={block.selected}
        setSelect={setSelect}
        byLot={byLot}
        onDelete={() => deleteRoom(block.id, _setBlocks)}
        renameBlock={setName}
      />
      {showModal ? (
        <>
          <BlockControllerPanel
            width={width}
            setWidth={setWidth}
            length={length}
            setLength={setLength}
            size={size}
            setSize={setSize}
            height={height}
            setHeight={setHeight}
            tickLot={tickLot}
            setTickLot={setTickLot}
            position={position}
            setPosition={setPosition}
            rotation={rotation}
            setRotation={setRotation}
            upperGap={upperGap}
            setUpperGap={setUpperGap}
            topHeight={topHeight}
            setTopHeight={setTopHeight}
            topPosition={topPosition}
            setTopPosition={setTopPosition}
            angle_Top={angle_Top}
            setAngle_Top={setAngle_Top}
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            panelVisible={panelVisible}
            showComponentPanel={showComponentPanel}
            handleAddComponent={handleAddComponent}
            components={components}
            updateBlock={updateBlock}
            handleDeleteComponent={handleDeleteComponent}
          />
        </>
      ) : (
        <>
          <Box display={"flex"} gap={"5vw"} padding={".1vw"}>
            <SmallBlockController
              value={width}
              setValue={setWidth}
              name="width"
              type={1}
            />
            <SmallBlockController
              value={length}
              setValue={setLength}
              name="length"
              type={1}
            />
          </Box>
        </>
      )}
      <TexturePanel
        name={name}
        topTexture={topTexture}
        floorTexture={floorTexture}
        wallTexture={wallTexture}
        _top={_top}
        _floor={_floor}
        _setTop={_setTop}
        _setFloor={_setFloor}
        setTopTexture={setTopTexture}
        setFloorTexture={setFloorTexture}
        setWallTexture={setWallTexture}
        handleFileChange={handleFileChange}
      />
      {!byLot && (
        <Box>
          {blocks.map((e) =>
            e.selected ? (
              <BlockItem
                key={e.id}
                updateLot={updateBlock}
                block={e}
                byLot={true}
                floor={e.floor}
                top={e.top}
                disable={e.disable}
                setDisable={() => toggleSelectLot(e.id, "D")}
                select={e.selected}
                setSelect={() => toggleSelectLot(e.id, "S")}
                _setBlocks={setBlocks}
              />
            ) : (
              <BlockSmall
                key={e.id}
                name={e.name}
                setSelect={() => toggleSelectLot(e.id, "S")}
                id={e.id}
                byLot={true}
                disable={e.disable}
                setDisable={() => toggleSelectLot(e.id, "D")}
              />
            )
          )}

          <Button
            sx={{ alignItems: "center", width: "100%", color: "white" }}
            onClick={() =>
              createBlock({
                id: 0,
                length: length,
                width: width,
                size: size,
                height: height,
                name: "novo",
                tickLot: tickLot,
                objects: block.objects,
                floor: _floor,
                top: _top,
                disable: block.disable,
                selected: block.selected,
                position: position,
                rotation: rotation,
                angle_Top: angle_Top,
                components: components,
                upperGap: upperGap,
                topHeight: topHeight,
                topPosition: topPosition,
              })
            }
          >
            <Add fontSize="medium" />
          </Button>
        </Box>
      )}
      <Button
        sx={{ alignItems: "center", width: "100%" }}
        onClick={() => setShowModal(!showModal)}
      >
        {showModal ? (
          <KeyboardArrowUp fontSize="large" sx={{ color: "white" }} />
        ) : (
          <KeyboardArrowDown fontSize="large" sx={{ color: "white" }} />
        )}
      </Button>
    </Box>
  );
}
