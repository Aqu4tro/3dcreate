import { Room } from "@/app/page";
import * as THREE from "three";
import { walls } from "../lotCreate/page";
import { useEffect, useState } from "react";

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
  floor,
  byLot,
}: Room) {
  const [isDisabled, setIsDisabled] = useState<boolean>(disable);

  useEffect(() => {
    setIsDisabled(disable);
    
  }, [disable]);

  return !disable && tickLot ? (
    <>
    <mesh position={[position.x, position.y, position.z]}>

    
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
          position={[0, height - 0.05, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          name="top-surface"
        >
          <boxGeometry args={[width, 0.1, length]} />
          <meshBasicMaterial color={"blue"} />
        </mesh>
      )}

      {/* Render walls if dimensions are defined */}
      {height &&
        size &&
        tickLot &&
        walls({ width, height, size, length, tickLot, topSize: 0.1 }).map(
          (e, index) => (
            <mesh
              key={index}
              position={[e.x, e.y, e.z]}
              rotation={new THREE.Euler(0, 0, 0)}
              name={`wall-${index}`}
            >
              <boxGeometry args={[e.W, e.H, e.L]} />
              <meshBasicMaterial color={"pink"} />
            </mesh>
          )
        )}
        </mesh>
    </>
  ) : null;
}
