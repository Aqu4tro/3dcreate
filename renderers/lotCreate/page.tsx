import { Room } from "@/app/page";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import Block from "../blockCreate/page";

interface LotProps extends Room {}

export function walls({ width, length, tickLot, topSize, size, height }: { width: number; length: number; tickLot: number; topSize: number; size: number; height: number }) {
  const walls = [];
  const sizePin = size / 2;

  walls.push({ x: 0, y: height / 2 - (topSize - tickLot) /2, z: -length / 2 + sizePin, H: height - (topSize + tickLot), W: width, L: size });
  walls.push({ x: 0, y: height / 2 - (topSize - tickLot) /2, z: length / 2 - sizePin, H: height - (topSize + tickLot), W: width, L: size });
  walls.push({ x: width / 2 - sizePin, y: height / 2 - (topSize - tickLot) /2, z: 0, H: height - (topSize + tickLot), W: size, L: length });
  walls.push({ x: -width / 2 + sizePin, y: height / 2 - (topSize - tickLot) /2  , z: 0, H: height - (topSize + tickLot), W: size, L: length });

  return walls;
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
  disable,
  top,
  floor
}: LotProps) {
  
  

  return (
    !disable && tickLot && (
      <>
        {/* Render floor */}
        { floor && (<mesh
          position={[0, tickLot / 2, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          name="floor"
        >
          <boxGeometry args={[width, tickLot, length]} />
          <meshBasicMaterial color="gray" />
        </mesh>)}

        {/* Render top surface if height is defined */}
        {height && top && (
          <mesh position={[0, height - .05  ,0]} rotation={new THREE.Euler(0,0,0)} name="top-surface"> 
            <boxGeometry args={[width, .1, length]} />
            <meshBasicMaterial color={"blue"} />
          </mesh>
        )}

        {/* Render walls if dimensions are defined */}
        {height && size && tickLot && walls({ width, height, size, length, tickLot, topSize: .1 }).map((e, index) => (
          <mesh key={index} position={[e.x,e.y,e.z]} rotation={new THREE.Euler(0,0,0)} name={`wall-${index}`}> 
            <boxGeometry args={[e.W, e.H, e.L]} />
            <meshBasicMaterial color={"pink"} />
          </mesh>
        ))}

        {/* Render additional objects */}
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
            byLot={id}
            disable={disable}
            top={e.top}
            floor={e.floor}
          />
        ))}
      </>
    )
  );
}
