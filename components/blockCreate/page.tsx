import { Room } from "@/app/page";
import { Text } from "@react-three/drei";
import * as THREE from  "three";
export default function Block({name,width, length,height,size,tickLot,byLot, id}:Room){
    return (
        <mesh
          position={[0, -20, -15]}
          rotation={new THREE.Euler(0, Math.PI / 2, 0)}
        >
          <boxGeometry args={[width, tickLot, length]} />
          <meshBasicMaterial color="green" />
          <Text>{name}</Text>
        </mesh>
      );

}