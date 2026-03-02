// ===== IMPORTS =====
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.183.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.183.2/examples/jsm/loaders/GLTFLoader.js';

// ===== GET CONTAINER =====
const container = document.getElementById("container3D");

// ===== SCENE =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// ===== CAMERA =====
const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 4);

// ===== RENDERER =====
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// ===== LIGHTING (IMPORTANT) =====
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// ===== LOAD MODEL =====
let carModel;

const loader = new GLTFLoader();
loader.load(
  'images/BlueMC20.glb',
  function (gltf) {
    carModel = gltf.scene;

    // Adjust scale if needed
    carModel.scale.set(0.5, 0.5, 0.5);

    scene.add(carModel);
    console.log("✅ Model loaded successfully");
  },
  undefined,
  function (error) {
    console.error("❌ Error loading model:", error);
  }
);

// ===== ANIMATION LOOP =====
function animate() {
  requestAnimationFrame(animate);

  if (carModel) {
    carModel.rotation.y += 0.002; // slow rotate
  }

  renderer.render(scene, camera);
}
animate();

// ===== RESIZE FIX =====
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// ===== COLOR BUTTONS =====
document.querySelectorAll('.color-circle').forEach((button) => {
  button.addEventListener('click', () => {
    const color = button.getAttribute('data-color');

    if (!carModel) return;

    carModel.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(color);
      }
    });
  });
});