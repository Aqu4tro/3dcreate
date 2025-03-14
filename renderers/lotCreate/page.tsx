import { Room } from "@/app/page";
import * as THREE from "three";
import Block from "../blockCreate/page";
import { ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import walls from "../../utils/walls/page";
import InclinedWall from "../inclinedWall/page";
import { useEffect, useState } from "react";
import AddWall from "../addWall/page";

export interface LotProps extends Room {
  selected: boolean | undefined;
  setSelected: () => void;
}

export default function Lot({
  id,
  width,
  length,
  name,
  height,
  size,
  tickLot,
  objects,
  setSelected,
  disable,
  top,
  floor,
  position,
  rotation,
  angle_Top,
  wallTexture,
  topTexture,
  floorTexture,
  components
}: LotProps) {
  const [_objects, _setObjects] = useState<Room[] | undefined>(objects);

  const _wallTexture = useTexture(
    typeof wallTexture === "string" || !wallTexture
      ? wallTexture || "/assets/images/walls.jpg"
      : wallTexture
  );
  const _topTexture = useTexture(
    typeof topTexture === "string" || !topTexture
      ? topTexture || "/assets/images/6648194.jpg"
      : topTexture
  );
  const _floorTexture = useTexture(
    typeof floorTexture === "string" || !floorTexture
      ? floorTexture || "/assets/images/damaged-parquet-texture.jpg"
      : floorTexture
  );
  const toggleSelectLot = (id: number, t: "D" | "S") => {

    _setObjects((prevLot) =>
      prevLot
        ? prevLot.map((item) =>
          t === "D"
            ? item.id === id
              ? { ...item, disable: !item.disable }
              : item
            : item.id === id
              ? { ...item, selected: !item.selected }
              : item
        )
        : prevLot
    );
  };
  useEffect(() => {
    components
  }, [components]);


  function switchSelect(
    event: ThreeEvent<MouseEvent> | MouseEvent | TouchEvent
  ) {
    event.stopPropagation();
    setSelected();
  }

  if (disable || !tickLot) {
    return null;
  }

  return (
    <mesh
      onClick={(event) => switchSelect(event)}
      position={[position.x, position.y, position.z]}
      rotation={new THREE.Euler(rotation.x, rotation.y, rotation.z)}
    >

      {floor && (
        <mesh
          position={[0, tickLot / 2, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          name="floor"
        >
          <boxGeometry args={[width, tickLot, length]} />
          <meshStandardMaterial map={_floorTexture} />
        </mesh>
      )}

      {height && top && (
        <mesh
          position={[
            0,
            height + (angle_Top.r || angle_Top.l ? width * Math.tan(angle_Top.r || angle_Top.l) : length * Math.tan(angle_Top.f || angle_Top.b)) / 2,
            0,
          ]}
          rotation={
            new THREE.Euler(
              angle_Top.f || angle_Top.b,
              0,
              angle_Top.l || -angle_Top.r
            )
          }
          name="top-surface"
        >
          <boxGeometry args={[(angle_Top.l || angle_Top.r ? width / Math.cos(angle_Top.r || angle_Top.l) : width) + 0.3, 0.1, ((angle_Top.f || angle_Top.b) ? length / Math.cos(angle_Top.f || angle_Top.b) : length) + 0.3]} />
          <meshStandardMaterial map={_topTexture} />
        </mesh>
      )}

      {height &&
        size &&
        tickLot &&
        walls({
          width,
          height,
          size,
          length,
          tickLot,
          topSize: 0.1,
          angle_Top,
        }).map((e, index) => (
          <mesh
            key={index}
            position={[e.x, e.y, e.z]}
            rotation={new THREE.Euler(0, 0, 0)}
            name={`wall-${index}`}
          >
            {((angle_Top.f && e.N !== "F" && e.N !== "B") || (angle_Top.r && e.N !== "R" && e.N !== "L") || (angle_Top.b && e.N !== "F" && e.N !== "B") || (angle_Top.l && e.N !== "R" && e.N !== "L")) && (
              <InclinedWall
                id={id}
                wall={e}
                width={width}
                height={height}
                length={name === "L" || "R" ? length - size : length}
                angle_Top={angle_Top}
                size={size}
                _wallTexture={_wallTexture}
                name={name}
                tickLot={tickLot}
                top={top}
                floor={floor}
                position={position}
                rotation={rotation}
                disable={disable}
                components={components}
              />
            )}

            <AddWall
              x={e.x}
              y={e.y}
              z={e.z}
              H={e.H}
              W={e.W}
              L={e.L}
              components={components}
              name={e.N}
              texture={_wallTexture}
            />
          </mesh>
        ))}

      {objects?.map((e) => (
        <Block
          key={e.id}
          width={e.width}
          id={e.id}
          size={e.size}
          height={e.height}
          tickLot={e.tickLot}
          name={e.name}
          length={e.length}
          byLot={true}
          disable={e.disable}
          top={e.top}
          floor={e.floor}
          position={e.position}
          rotation={e.rotation}
          angle_Top={e.angle_Top}
          wallTexture={e.wallTexture}
          topTexture={e.topTexture}
          floorTexture={e.floorTexture}
          components={[]}
          selected={false}
          setSelected={() => toggleSelectLot(e.id, "S")}
        />
      ))}
    </mesh>
  );
}
