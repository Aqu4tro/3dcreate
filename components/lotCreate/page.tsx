import { Room } from "@/app/page";
import { Text } from "@react-three/drei";

import * as THREE from "three";
import Block from "../blockCreate/page";
export default function Lot({
  id,
  width,
  length,
  name,
  tickLot,
  objects,
}: Room) {
  return (
    <>
      <mesh
        position={[0, -10, -15]}
        rotation={new THREE.Euler(0, Math.PI / 2, 0)}
      >
        <boxGeometry args={[width, tickLot, length]} />
        <meshBasicMaterial color="gray" />
        <Text>{name}</Text>
      </mesh>
      {objects?.map((e) => (
        <Block
          width={e.width}
          id={e.id}
          size={e.size}
          height={e.height}
          tickLot={e.tickLot}
          name={e.name}
          length={e.length}
          byLot={id}
        />
      ))}
    </>
  );
}
