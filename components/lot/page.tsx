import { Room } from "@/app/page";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

export default function Lot({width, height, size, length, name }:Room){
    
    return (
       
        <mesh position={[0, -15, -25]} rotation={new THREE.Euler(0,Math.PI/ 2 ,0)}>  {/* Position the floor below the camera */}
            <boxGeometry args={[width,.1, length]} />
            <meshBasicMaterial color="gray" />
        </mesh>
        
       
    );
}