import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("carCanvas") });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

let carMaterial; // store reference

const loader = new GLTFLoader();
loader.load('car.glb', function (gltf) {

    const car = gltf.scene;
    scene.add(car);

    // Find the car mesh and store its material
    car.traverse((child) => {
        if (child.isMesh) {
            carMaterial = child.material;
        }
    });

});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

const buttons = document.querySelectorAll("#colorPicker button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const color = button.getAttribute("data-color");

        if (carMaterial) {
            carMaterial.color.set(color);
        }
    });
});