import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f2f2);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("car-section").appendChild(renderer.domElement);

camera.position.set(0, 2, 5);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 1));

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// Orbit Controls (rotation with mouse)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let carBodyMaterial;

// Load GLB
const loader = new GLTFLoader();
loader.load('./images/BlueMC20.glb', (gltf) => {

  const car = gltf.scene;
  scene.add(car);

  car.traverse((child) => {
    if (child.isMesh && child.name.includes("Paint")) {
      carBodyMaterial = child.material;
    }
  });
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Color Change
document.querySelectorAll("#colors button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (carBodyMaterial) {
      carBodyMaterial.color.set(btn.dataset.color);
    }
  });
});