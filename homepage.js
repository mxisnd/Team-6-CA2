import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(1.5, 1.5, 1.5); 

let object;
let objectToRender = 'BlueMC20'; 

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.target.set(0, 0, 0);
controls.update();

const loader = new GLTFLoader();
loader.load(
  `images/${objectToRender}.glb`,
  function(gltf) {
    object = gltf.scene;
    scene.add(object);
    
    controls.update();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error("Error loading model:", error);
  }
);

const topLight = new THREE.DirectionalLight(0xffffff, 3);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);
  controls.update(); 
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// Selecting the slider input, second image, and drag line elements
const slider = document.querySelector(".slider input");
const img = document.querySelector(".images .img-2");
const dragLine = document.querySelector(".slider .drag-line");

// Event listener to update image width and drag line position on slider input
slider.oninput = () => {
  let sliderVal = slider.value;
  dragLine.style.left = sliderVal + "%"; // Move drag line
  img.style.width = sliderVal + "%"; // Adjust the width of the second image
}

async function showSecond(target) {
  let second = document.getElementById('second');
  await fadeOut(target);
  await fadeIn(second);
}

async function showFirst(target) {
  let first = document.getElementById('first');
  await fadeOut(target);
  await fadeIn(first);
}

function fadeOut(target, duration = 500) {
  return new Promise(resolve => {
    const animationEnded = () => {
        target.style.display = 'none';
        target.onanimationend = null;
        target.style.animation =  null;
        resolve();
    };
    target.onanimationend = animationEnded;
    target.style.animation = `fade-out ${duration}ms 1`;
  })
}

function fadeIn(target, duration = 500, display = 'block') {
  return new Promise(resolve => {
    const animationEnded = () => {
        target.onanimationend = null;
        target.style.animation =  null;
        resolve();
    };
    target.animationend = animationEnded;
     target.style.display = display;
    target.style.animation = `fade-in ${duration}ms 1`;
  })
}