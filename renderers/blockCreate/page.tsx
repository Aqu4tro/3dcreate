import { Room } from "@/app/page";
import * as THREE from "three";
import walls from "../../utils/walls/page";
import { useEffect, useState } from "react";
import { useTexture } from "@react-three/drei";
import InclinedWall from "../inclinedWall/page";

export default function Block({
  id,
  width,
  length,
  name,
  height,
  size,
  tickLot,
  disable,
  top,
  position,
  rotation,
  angle_Top,
  floor,
  wallTexture,
  topTexture,
  floorTexture,
  byLot,
}: Room) {
  const _wallTexture = useTexture(
    typeof wallTexture === "string" || !wallTexture
      ? wallTexture || "/assets/images/default-wall.jpg"
      : URL.createObjectURL(wallTexture)
  );
  const _topTexture = useTexture(
    typeof topTexture === "string" || !topTexture
      ? topTexture || "/assets/images/default-wall.jpg"
      : URL.createObjectURL(topTexture)
  );
  const _floorTexture = useTexture(
    typeof floorTexture === "string" || !floorTexture
      ? floorTexture || "/assets/images/default-wall.jpg"
      : URL.createObjectURL(floorTexture)
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(disable);

  useEffect(() => {
    setIsDisabled(disable);
    angle_Top = { f: 0, l: 0, r: 0, b: 0 };
  }, [disable]);

  return !disable && tickLot ? (
    <>
      <mesh
        position={[position.x, position.y, position.z]}
        rotation={new THREE.Euler(rotation.x, rotation.y, rotation.z)}
      >
        {/* Render floor */}
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

        {/* Render top surface if height is defined */}
        {height && top && (
          <mesh
            position={[
              0,
              height -
                0.05 +
                (angle_Top.b || angle_Top.f || angle_Top.r || angle_Top.l
                  ? (angle_Top.b || angle_Top.f || angle_Top.r || angle_Top.l) +
                    0.155 * 2
                  : 0),
              0,
            ]}
            rotation={
              new THREE.Euler(
                angle_Top.f || -angle_Top.b,
                0,
                angle_Top.l || -angle_Top.r
              )
            }
            name="top-surface"
          >
            <boxGeometry args={[width + 0.3, 0.1, length + 0.3]} />
            <meshStandardMaterial map={_topTexture} />
          </mesh>
        )}

        {/* Render walls if dimensions are defined */}
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
              {((angle_Top.f && e.N !== "F" && e.N !== "B") || (angle_Top.r && e.N !== "R" && e.N !== "L" ) || (angle_Top.b && e.N !== "F" && e.N !== "B") || (angle_Top.l && e.N !== "R" && e.N !== "L" )) !==
                0 && (
                <InclinedWall
                  id={id}
                  wall={e}
                  width={width}
                  height={height}
                  length={length}
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
                  topSize={0.1}
                  components={[]} // Add the appropriate value for components
                />
              )}
              <boxGeometry args={[e.W, e.H, e.L]} />
              <meshStandardMaterial map={_wallTexture} />
            </mesh>
          ))}
      </mesh>
    </>
  ) : null;
}
