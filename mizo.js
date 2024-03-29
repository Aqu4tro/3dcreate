import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const rendeniza = new THREE.WebGLRenderer();
document.body.appendChild(rendeniza.domElement);
const scene = new THREE.Scene();
const camera  = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1,2000);
const loader = new GLTFLoader();
const url = 'modern_bookshelf.glb';

loader.load(url, function (gltf) {
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      // Apply the material to the mesh
      child.material = new THREE.MeshBasicMaterial({ color: 'cyan' });
    }
  });
  scene.add(gltf.scene);
});
const controls = new OrbitControls(camera, rendeniza.domElement);
controls.update();
camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  rendeniza.render(scene, camera);
};


animate();