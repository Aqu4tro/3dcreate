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
  byLot,
}: Room) {
  const texture = useTexture("/assets/walls.jpg");
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
            <meshBasicMaterial color="gray" />
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
            <meshBasicMaterial color={"blue"} />
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
              {(angle_Top.f || angle_Top.r || angle_Top.b || angle_Top.l) !==
                0 && (
                <InclinedWall
                  id={id}
                  wall={e}
                  width={width}
                  height={height}
                  length={length}
                  angle_Top={angle_Top}
                  size={size}
                  texture={texture}
                  name={name}
                  tickLot={tickLot}
                  top={top}
                  floor={floor}
                  position={position}
                  rotation={rotation}
                  disable={disable}
                />
              )}
              <boxGeometry args={[e.W, e.H, e.L]} />
              <meshStandardMaterial map={texture} />
            </mesh>
          ))}
      </mesh>
    </>
  ) : null;
}
