import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene, Camera, Renderer
const container = document.getElementById('container3D');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

// Clock for animations
const clock = new THREE.Clock();
let mixer;
let carModel;

// Load GLB Model
const loader = new GLTFLoader();
loader.load('./images/BlueMC20.glb', (gltf) => {
    carModel = gltf.scene;
    carModel.scale.set(2, 2, 2); // adjust scale as needed
    carModel.position.set(0, -.5, 0);
    scene.add(carModel);

    if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(carModel);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
    }
}, undefined, (error) => console.error(error));

// Animate loop
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Color change buttons
const colorButtons = document.querySelectorAll('.color-circle');
colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!carModel) return;
        const color = btn.getAttribute('data-color');
        carModel.traverse(child => {
            if (child.isMesh && child.material) {
                child.material.color.set(color);
            }
        });
    });
});