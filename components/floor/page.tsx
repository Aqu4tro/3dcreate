import * as THREE from "three";

export default function Floor({width, height, size }: {width:number, height: number, size: number}){
    
    return (
       
        <mesh position={[0, -15, -25]} rotation={new THREE.Euler(0,Math.PI/ 2 ,0)}>  {/* Position the floor below the camera */}
            <boxGeometry args={[width, height, size]} />
            <meshBasicMaterial color="gray" />
        </mesh>
        
       
    );
}