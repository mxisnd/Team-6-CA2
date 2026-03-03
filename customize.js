import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

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
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
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
let carBodyMeshes = [];

// Load GLB Model
const loader = new GLTFLoader();
loader.load('./assets/BlueMC20.glb', (gltf) => {
    carModel = gltf.scene;
    carModel.scale.set(2, 2, 2); // adjust scale as needed
    carModel.position.set(0, -.5, 0);
    scene.add(carModel);

    const rgbeLoader = new RGBELoader();

    rgbeLoader.load(
        './assets/citrus_orchard_road_puresky_2k.hdr', // put an HDR file in assets folder
        function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;

            scene.environment = texture; // this gives reflections
            scene.background = texture;  // optional (shows HDR background)
        }
    );

    // Find ONLY the paint material meshes
    carModel.traverse(child => {
        if(child.isMesh) {
            console.log("Mesh:", child.name);

            if (child.name.includes("2023Paint_Material_0")) {
                carBodyMeshes.push(child);
                console.log("Paint mesh stored:", child.name);
            }
        }

        if (child.isMesh && child.name.toLowerCase().includes("2023Window_Material_0")) {
            child.material.metalness = 1;
            child.material.roughness = 0;
            child.material.transmission = 1;   // makes it real glass
            child.material.ior = 1.5;
            child.material.thickness = 0.1;
            child.material.envMapIntensity = 1.5;
        }
    });

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
        if (!carBodyMeshes.length) {
            console.log("No paint meshes found yet.");
            return;
        }
        const color = btn.getAttribute('data-color');

        carBodyMeshes.forEach(mesh => {
            mesh.material.color.set(color);
        });
    });
});