import * as THREE from "three";
import { Plane } from "@react-three/drei";
import { wall } from "../../utils/walls/page";

interface InclinedWallProps {
  id: number;
  width: number;
  length: number;
  size: number;
  height: number;
  angle_Top: { f: number; l: number; r: number; b: number };
  tickLot: number;
  wall: wall;
  _wallTexture: THREE.Texture;
}

export default function InclinedWall({
  width,
  length,
  size,
  height,
  angle_Top,
  wall,
  _wallTexture,
  tickLot,
}: InclinedWallProps) {
  let vertices = new Float32Array([]);
  let vertices_2 = new Float32Array([]);

  const indices = new Uint16Array([0, 1, 2]);

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
              height / 2 - tickLot / 2,
              length / 2 - size / 2,
              -size / 2,
              (length + size) * Math.tan(angle_Top.b) - tickLot / 2 + height / 2 ,
              length / 2 - size / 2,
              -size / 2,
              height / 2 - tickLot / 2,
              -length / 2 - size / 2,
            ]
          : angle_Top.f
          ? [
              -size / 2,
              height / 2 - tickLot / 2,
              length / 2 + size / 2,
              -size / 2,
              (length + size) * Math.tan(angle_Top.f) - tickLot / 2 + height / 2,
              -length / 2 + size / 2,
              -size / 2,
              height / 2 - tickLot / 2,
              -length / 2 + size / 2,
            ]
          : []
      );

      vertices_2 = new Float32Array(
        angle_Top.b
          ? [
              size / 2,
              (length + size) * Math.tan(angle_Top.b) - tickLot / 2 + height / 2,
              length / 2 - size / 2,
              size / 2,
              height / 2 - tickLot / 2,
              length / 2 - size / 2,
              size / 2,
              height / 2 - tickLot / 2,
              -length / 2 - size / 2,
            ]
          : angle_Top.f
          ? [
              size / 2,
              height / 2 - tickLot / 2,
              -length / 2 + size / 2,
              size / 2,
              height / 2 - tickLot / 2 + (length + size)* Math.tan(angle_Top.f),
              -length / 2 + size / 2,
              size / 2,
              height / 2 - tickLot / 2,
              length / 2 + size / 2,
            ]
          : []
      );
      break;

    case "L":
      vertices = new Float32Array(
        angle_Top.b
          ? [
              -size / 2,
              height / 2 - tickLot / 2,
              length / 2 - size / 2,
              -size / 2,
              (length + size) * Math.tan(angle_Top.b) - tickLot / 2 + height / 2,
              length / 2 - size / 2,
              -size / 2,
              height / 2 - tickLot / 2,
              -length / 2 + size / 2,
            ]
          : angle_Top.f
          ? [
              -size / 2,
              height / 2 - tickLot / 2,
              length / 2 + size / 2,
              -size / 2,
              (length + size) * Math.tan(angle_Top.f) - tickLot / 2 + height / 2,
              -length / 2 + size / 2,
              -size / 2,
              height / 2 - tickLot / 2,
              -length / 2 + size / 2,
            ]
          : []
      );

      vertices_2 = new Float32Array(
        angle_Top.b
          ? [
              size / 2,
              (length + size) * Math.tan(angle_Top.b) - tickLot / 2 + height / 2,
              length / 2 - size / 2,
              size / 2,
              height / 2 - tickLot / 2,
              length / 2 - size / 2,
              size / 2,
              height / 2 - tickLot / 2,
              -length / 2 - size / 2,
            ]
          : angle_Top.f
          ? [
              size / 2,
              height / 2 - tickLot / 2,
              -length / 2 + size / 2,
              size / 2,
              (length + size) * Math.tan(angle_Top.f) - tickLot / 2 + height / 2,
              -length / 2 + size / 2,
              size / 2,
              height / 2 - tickLot / 2,
              length / 2 + size / 2,
            ]
          : []
      );
      break;

    case "F":
      vertices = new Float32Array(
        angle_Top.r
          ? [
              -width / 2 + size,
              width * Math.tan(angle_Top.r) - tickLot / 2 + height / 2,
              -size / 2,
              width / 2,
              height / 2 - tickLot / 2,
              -size / 2,
              -width / 2 + size,
              height / 2 - tickLot / 2,
              -size / 2,
            ]
          : angle_Top.l
          ? [
              -width / 2,
              height / 2 - tickLot / 2,
              -size / 2,
              width / 2 - size,
              width * Math.tan(angle_Top.l) - tickLot / 2 + height / 2,
              -size / 2,
              width / 2 - size,
              height / 2 - tickLot / 2,
              -size / 2,
            ]
          : []
      );

      vertices_2 = new Float32Array(
        angle_Top.r
          ? [
              -width / 2 + size,
              height / 2 - tickLot / 2,
              size / 2,
              width / 2,
              height / 2 - tickLot / 2,
              size / 2,
              -width / 2 + size,
              width * Math.tan(angle_Top.r) - tickLot / 2 + height / 2,
              size / 2,
            ]
          : angle_Top.l
          ? [
              width / 2 - size,
              width * Math.tan(angle_Top.l) - tickLot / 2 + height / 2,
              size / 2,
              -width / 2,
              height / 2 - tickLot / 2,
              size / 2,
              width / 2 - size,
              height / 2 - tickLot / 2,
              size / 2,
            ]
          : []
      );
      break;

    case "B":
      vertices = new Float32Array(
        angle_Top.r
          ? [
              -width / 2 + size,
              width * Math.tan(angle_Top.r) - tickLot / 2 + height / 2,
              -size / 2,
              width / 2,
              height / 2 - tickLot / 2,
              -size / 2,
              -width / 2 + size,
              height / 2 - tickLot / 2,
              -size / 2,
            ]
          : angle_Top.l
          ? [
              -width / 2,
              height / 2 - tickLot / 2,
              -size / 2,
              width / 2 - size,
              width * Math.tan(angle_Top.l) - tickLot / 2 + height / 2,
              -size / 2,
              width / 2 - size,
              height / 2 - tickLot / 2,
              -size / 2,
            ]
          : []
      );

      vertices_2 = new Float32Array(
        angle_Top.r
          ? [
              -width / 2 + size,
              height / 2 - tickLot / 2,
              size / 2,
              width / 2,
              height / 2 - tickLot / 2,
              size / 2,
              -width / 2 + size,
              width * Math.tan(angle_Top.r) - tickLot / 2 + height / 2,
              size / 2,
            ]
          : angle_Top.l
          ? [
              width / 2 - size,
              width * Math.tan(angle_Top.l) - tickLot / 2 + height / 2,
              size / 2,
              -width / 2,
              height / 2 - tickLot / 2,
              size / 2,
              width / 2 - size,
              height / 2 - tickLot / 2,
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
        <meshStandardMaterial map={_wallTexture instanceof THREE.Texture ? _wallTexture : null} />
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
        <meshStandardMaterial map={_wallTexture instanceof THREE.Texture ? _wallTexture : null} />
      </mesh>
      <Plane
        args={[
          (angle_Top.r || angle_Top.l ? width / Math.cos(angle_Top.l || angle_Top.r) + size/2 : size),
          (angle_Top.f || angle_Top.b ? length / Math.cos(angle_Top.f || angle_Top.b) + size/2 : size),
        ]}
        rotation={
          new THREE.Euler(
            -Math.PI / 2 + (angle_Top.f || -angle_Top.b) + 0.001,
            (angle_Top.l || angle_Top.r) ? (-angle_Top.l || angle_Top.r) : 0,
            0
          )
          
        }
        position={[
          0,
          height / 2 - 0.04 + (length * Math.tan(angle_Top.f) / 2 || length * Math.tan(angle_Top.b) / 2 || width * Math.tan(angle_Top.r) / 2 || width * Math.tan(angle_Top.l) / 2) ,
          angle_Top.f ? size / 5 : angle_Top.b ? size / 5 : 0,
        ]
        }
      >
        <meshStandardMaterial map={_wallTexture instanceof THREE.Texture ? _wallTexture : null} />
      </Plane>
    </mesh>
  );
}
