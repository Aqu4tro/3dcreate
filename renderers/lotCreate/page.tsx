import { Room } from "@/app/page";
import * as THREE from "three";
import Block from "../blockCreate/page";
import { ThreeEvent } from "@react-three/fiber";
import { Plane } from "@react-three/drei";


interface LotProps extends Room {
  selected: boolean | undefined;
  setSelected: () => void;
}

export function walls({ width, length, tickLot, topSize, size, height, angle_Top }: { width: number; length: number; tickLot: number; topSize: number; size: number; height: number; angle_Top: { f: number; l: number; r: number; b: number } }) {
  const walls = [];
  const sizePin = size / 2;

  walls.push({ x: 0, y: (height / 2 - (topSize - tickLot) / 2) + angle_Top.f * 4, z: -length / 2 + sizePin, H: height - (topSize + tickLot) + angle_Top.f * 9, W: width, L: size, N: "F" });
  walls.push({ x: 0, y: (height / 2 - (topSize - tickLot) / 2) + angle_Top.b * 4, z: length / 2 - sizePin, H: height - (topSize + tickLot) + (angle_Top.b) * 9, W: width, L: size, N: "B" });
  walls.push({ x: width / 2 - sizePin, y: (height / 2 - (topSize - tickLot) / 2) + angle_Top.r, z: 0, H: height - (topSize + tickLot), W: size, L: length, N: "R" });
  walls.push({ x: -width / 2 + sizePin, y: (height / 2 - (topSize - tickLot) / 2) + angle_Top.l, z: 0, H: height - (topSize + tickLot), W: size, L: length, N: "L" });

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
  selected,
  setSelected,
  disable,
  top,
  floor,
  position,
  rotation,
  angle_Top,
}: LotProps) {


  // Function to toggle selection state
  function switchSelect(event: ThreeEvent<MouseEvent> | MouseEvent | TouchEvent) {
    event.stopPropagation(); // Prevent click event from bubbling up
    setSelected(); // Call the setSelected function

  };

  return (
    !disable && tickLot && (
      <>

        <mesh onClick={(event) => switchSelect(event)} position={[position.x, position.y, position.z]} rotation={new THREE.Euler(rotation.x, rotation.y, rotation.z)} >
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
            <mesh position={[0, height - .05 + (angle_Top.b || angle_Top.f ? angle_Top.f + 0.155 * 2  : 0), 0]} rotation={new THREE.Euler(angle_Top.f, 0, angle_Top.r)} name="top-surface">
              <boxGeometry args={[width + .3, .1, length + .3]} />
              <meshBasicMaterial color={"blue"} />
            </mesh>
          )}

          {/* Render walls if dimensions are defined */}
          {height && size && tickLot && walls({ width, height, size, length, tickLot, topSize: .1, angle_Top }).map((e, index) => {
            let vertices = new Float32Array();
            let vertices_2 = new Float32Array();
            let vertices_3 = new Float32Array();
            switch (e.N) {
              case "R":
                vertices = new Float32Array(angle_Top.b ? [e.z - size / 2, height / 2 - 0.1, e.x, e.z - size / 2, e.y + angle_Top.f * 8.5 - 0.1,   size , e.z - size / 2, height / 2 - 0.1, -length / 2] : (angle_Top.f ? [e.z - size / 2, height / 2 - 0.1, e.x, e.z - size / 2, e.y + angle_Top.f * 8.5 - 0.1, -length / 2 + size , e.z - size / 2, height / 2 - 0.1, -length / 2] : []));
                vertices_2 = new Float32Array(angle_Top.b ? [0,0,0,0,0,0,0,0,0] : (angle_Top.f ? [e.z + size / 2, height / 2 - 0.1, -e.x, e.z + size / 2, e.y + angle_Top.f * 8.5   - 0.1, -length / 2 + size , e.z + size / 2, height / 2 - 0.1, length / 2] : []));
               
                break;
              case "L":
               vertices = new Float32Array(angle_Top.b ? [-width, height + angle_Top.b * 8, -length, width + e.x, height, length, width, height, e.x] : (angle_Top.f ? [e.z - size / 2, height / 2 - 0.1, length /2, e.z - size / 2, e.y + angle_Top.f * 8.5 - 0.1, -length / 2 + size , e.z - size / 2, height / 2 - 0.1, -length / 2] : []));
                vertices_2 = new Float32Array(angle_Top.b ? [-width, height + angle_Top.b * 8, length, width + e.x, height, -length, width, height, e.x] : (angle_Top.f ? [e.z + size / 2, height / 2 - 0.1, -length /2, e.z + size / 2, e.y + angle_Top.f * 8.5 - 0.1, -length / 2 + size , e.z + size / 2, height / 2 - 0.1, length / 2] : []));
               
                break;
              case "F":
                //vertices = new Float32Array(angle_Top.r ? [1, 2, 3] : (angle_Top.l ? [1, 2, 3] : []));
                break;
              case "B":
                //vertices = new Float32Array(angle_Top.r ? [1, 2, 3] : (angle_Top.l ? [1, 2, 3] : []));
                break;

            }

            const indices = new Uint16Array([
              0, 1, 2,
              // Add more indices as needed
            ]);

            return (
              <mesh key={index} position={[e.x, e.y, e.z]} rotation={new THREE.Euler(0, 0, 0)} name={`wall-${index}`}>


                {vertices.length != 0 && (
                  <mesh >
                    <mesh >
                      <bufferGeometry>
                        <bufferAttribute
                          attach="attributes-position"
                          array={vertices}
                          count={vertices.length / 3}
                          itemSize={3}
                        />
                        <bufferAttribute
                          attach="index"
                          array={indices}
                          count={indices.length}
                          itemSize={1}
                        />
                      </bufferGeometry>
                      <meshBasicMaterial  color={"pink"}/>
                    </mesh>
                    <mesh>
                      <bufferGeometry>
                        <bufferAttribute
                          attach="attributes-position"
                          array={vertices_2}
                          count={vertices_2.length / 3}
                          itemSize={3}
                        />
                        <bufferAttribute
                          attach="index"
                          array={indices}
                          count={indices.length}
                          itemSize={1}
                        />
                      </bufferGeometry>
                      <meshBasicMaterial color={"pink"}/>
                    </mesh>
                    <Plane
                      args={[size, length]}
                      rotation={new THREE.Euler(-angle_Top.f * 14.76, 0, angle_Top.r)}
                      position={[0, height / 2 + angle_Top.f * 3.3, 0]}
                    >
                      <meshBasicMaterial  color={"pink"}/>
                    </Plane>
                  </mesh>
                )

                }



                <boxGeometry args={[e.W, e.H, e.L]} />

                <meshBasicMaterial color={"pink"} />
              </mesh>


            )
          })}

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
              disable={e.disable}
              top={e.top}
              floor={e.floor}
              position={e.position}
              rotation={e.rotation}
              angle_Top={e.angle_Top}
            />
          ))}
        </mesh>

      </>
    )
  );
}
