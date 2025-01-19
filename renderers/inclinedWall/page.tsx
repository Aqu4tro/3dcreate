import * as THREE from "three";
import { Plane } from "@react-three/drei";
import { Room } from "@/app/page";
import { wall } from "../../utils/walls/page";

interface InclinedWallProps extends Room {
  wall: wall;
}

export default function InclinedWall({
  width,
  length,
  size,
  height,
  angle_Top,
  wall,
  wallTexture,
  topSize,
  tickLot,
}: InclinedWallProps) {
  let vertices = new Float32Array([]); // Define your vertices array

  let vertices_2 = new Float32Array([]); // Define your vertices_2 array

  const indices = new Uint16Array([
    0, 1, 2,
    // Add more indices as needed
  ]);

  const uvs = new Float32Array(
    angle_Top.f
      ? [1, 0, 0, 0.25, 0, 0]
      : angle_Top.b
      ? [0, 0.25, 0, 0, 1, 0]
      : angle_Top.l
      ? [1, 0, 0, 0.25, 0, 0]
      : angle_Top.r
      ? [0, 0.25, 1, 0, 0, 0]
      : []
  );
  const uvs_2 = new Float32Array(
    angle_Top.b
      ? [0, 0.25, 0, 0, 1, 0]
      : angle_Top.f
      ? [0, 0, 0, 0.25, 1, 0]
      : angle_Top.l
      ? [0, 0.25, 1, 0, 0, 0]
      : angle_Top.r
      ? [0, 0, 1, 0, 0, 0.25]
      : []
  );

  switch (wall.N) {
    case "R":
      vertices = new Float32Array(
        angle_Top.b
          ? [
              -size / 2,
              height / 2 - 0.1,
              length / 2,
              -size / 2,
              wall.y + (angle_Top.b * length) - (topSize ? topSize : 0 + tickLot),
              length / 2,
              -size / 2,
              height / 2 - 0.1,
              -length / 2,
            ]
          : angle_Top.f
          ? [
              -size / 2,
              height / 2 - 0.1,
              length / 2 - size,
              -size / 2,
              wall.y + (angle_Top.f * length) - (topSize ? topSize : 0 + tickLot),
              -length / 2 + size,
              -size / 2,
              height / 2 - 0.1,
              -length / 2 + size,
            ]
          : []
      );
      vertices_2 = new Float32Array(
        angle_Top.b
          ? [
              size / 2,
              wall.y + (angle_Top.b * length) - (topSize ? topSize : 0 + tickLot),
              length / 2,
              size / 2,
              height / 2 - 0.1,
              length / 2,
              size / 2,
              height / 2 - 0.1,
              -length / 2,
            ]
          : angle_Top.f
          ? [
              size / 2,
              height / 2 - 0.1,
              -length / 2 + size,
              size / 2,
              wall.y + (angle_Top.f * length) -  (topSize ? topSize : 0 + tickLot),
              -length / 2 + size,
              size / 2,
              height / 2 - 0.1,
              length / 2,
            ]
          : []
      );

      break;
    case "L":
      vertices = new Float32Array(
        angle_Top.b
          ? [
              -size / 2,
              height / 2 - 0.1,
              length / 2,
              -size / 2,
              wall.y + (angle_Top.b * length) - (topSize ? topSize : 0 + tickLot),
              length / 2,
              -size / 2,
              height / 2 - 0.1,
              -length / 2,
            ]
          : angle_Top.f
          ? [
              -size / 2,
              height / 2 - 0.1,
              length / 2 - size,
              -size / 2,
              wall.y + (angle_Top.f * length) - (topSize ? topSize : 0 + tickLot),
              -length / 2 + size,
              -size / 2,
              height / 2 - 0.1,
              -length / 2 + size,
            ]
          : []
      );
      vertices_2 = new Float32Array(
        angle_Top.b
          ? [
              size / 2,
              wall.y + (angle_Top.b * length) - (topSize ? topSize : 0 + tickLot),
              length / 2,
              size / 2,
              height / 2 - 0.1,
              length / 2,
              size / 2,
              height / 2 - 0.1,
              -length / 2,
            ]
          : angle_Top.f
          ? [
              size / 2,
              height / 2 - 0.1,
              -length / 2 + size,
              size / 2,
              wall.y + (angle_Top.f * length) - (topSize ? topSize : 0 + tickLot),
              -length / 2 + size,
              size / 2,
              height / 2 - 0.1,
              length / 2,
            ]
          : []
      );

      break;
    case "F":
      vertices = new Float32Array(
        angle_Top.r
          ? [
              -width / 2,
              wall.y + (angle_Top.r * width) - (topSize ? topSize : 0 + tickLot),
              -size / 2,
              width / 2,
              height / 2 - 0.1,
              -size / 2,
              -width / 2,
              height / 2 - 0.1,
              -size / 2,
            ]
          : angle_Top.l
          ? [
              -width / 2,
              height / 2 - 0.1,
              -size / 2,
              width / 2,
              wall.y + (angle_Top.l * width) - (topSize ? topSize : 0 + tickLot),
              -size / 2,
              width / 2,
              height / 2 - 0.1,
              -size / 2,
            ]
          : []
      );
      vertices_2 = new Float32Array(
        angle_Top.r
          ? [
              -width / 2,
              height / 2 - 0.1,
              size / 2,
              width / 2,
              height / 2 - 0.1,
              size / 2,
              -width / 2,
              wall.y + (angle_Top.r * width) - (topSize ? topSize : 0 + tickLot),
              size / 2,
            ]
          : angle_Top.l
          ? [
              width / 2,
              wall.y + (angle_Top.l * width) - (topSize ? topSize : 0 + tickLot),
              size / 2,
              -width / 2,
              height / 2 - 0.1,
              size / 2,
              width / 2,
              height / 2 - 0.1,
              size / 2,
            ]
          : []
      );
      break;
    case "B":
      vertices = new Float32Array(
        angle_Top.r
          ? [
              -width / 2,
              wall.y + (angle_Top.r * width) - (topSize ? topSize : 0 + tickLot),
              -size / 2,
              width / 2,
              height / 2 - 0.1,
              -size / 2,
              -width / 2,
              height / 2 - 0.1,
              -size / 2,
            ]
          : angle_Top.l
          ? [
              -width / 2,
              height / 2 - 0.1,
              -size / 2,
              width / 2,
              wall.y + (angle_Top.l * width) - (topSize ? topSize : 0 + tickLot),
              -size / 2,
              width / 2,
              height / 2 - 0.1,
              -size / 2,
            ]
          : []
      );
      vertices_2 = new Float32Array(
        angle_Top.r
          ? [
              -width / 2,
              height / 2 - 0.1,
              size / 2,
              width/ 2,
              height / 2 - 0.1,
              size / 2,
              -width / 2,
              wall.y + (angle_Top.r * width) - (topSize ? topSize : 0 + tickLot),
              size / 2,
            ]
          : angle_Top.l
          ? [
              width / 2,
              wall.y + (angle_Top.l * width) - (topSize ? topSize : 0 + tickLot),
              size / 2,
              -width / 2,
              height / 2 - 0.1,
              size / 2,
              width / 2,
              height / 2 - 0.1,
              size / 2,
            ]
          : []
      );
      break;
  }

  return (
    <mesh>
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={vertices}
            count={vertices.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-uv"
            array={uvs}
            count={uvs.length / 2}
            itemSize={2}
          />
          <bufferAttribute
            attach="index"
            array={indices}
            count={indices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <meshStandardMaterial map={wallTexture} />
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
            attach="attributes-uv"
            array={uvs_2}
            count={uvs_2.length / 2}
            itemSize={2}
          />
          <bufferAttribute
            attach="index"
            array={indices}
            count={indices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      <Plane
        args={[
          angle_Top.r || angle_Top.l ? Math.sqrt(wall.y + ((angle_Top.l || angle_Top.r) * width) - (topSize ? topSize : 0 + tickLot)*wall.y + ((angle_Top.l || angle_Top.r) * width) - (topSize ? topSize : 0 + tickLot) + (width-size*2) * (width-size*2))  : size,
          angle_Top.r || angle_Top.l ? size : Math.sqrt(wall.y + ((angle_Top.f || angle_Top.b) * length) - (topSize ? topSize : 0 + tickLot)*wall.y + ((angle_Top.f || angle_Top.b) * length) - (topSize ? topSize : 0 + tickLot) + (length-size*2) * (length-size*2))   ,
        ]}
        rotation={
          new THREE.Euler(
            angle_Top.l || angle_Top.r
              ? -1.5702 
              : -1.5702 + (angle_Top.f || angle_Top.b)  ,  
            (-angle_Top.l || angle_Top.r)  ,
            0
          )
        }
        position={[
          0,
          height / 2 +
            (angle_Top.f * length/2 || angle_Top.b * length/2|| angle_Top.r * width/2|| angle_Top.l * width/2) - (topSize ? topSize : 0 + tickLot)  ,
          angle_Top.f ? size/5 : angle_Top.b ? size /5 : 0,
        ]}
      >
        <meshStandardMaterial map={wallTexture} />
      </Plane>
    </mesh>
  );
}
