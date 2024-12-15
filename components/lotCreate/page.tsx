import { Room } from "@/app/page";
import { Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

export default function Lot({
  width,
  height,
  size,
  length,
  name,
  tickLot,
}: Room) {
  return (
    <mesh
      position={[0, -10, -15]}
      rotation={new THREE.Euler(0, Math.PI / 2, 0)}
    >
      <boxGeometry args={[width, tickLot, length]} />
      <meshBasicMaterial color="gray" />
      <Text>{name}</Text>
    </mesh>
  );
}
