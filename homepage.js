// Image 1 Text Anim
const paragraph1 = document.querySelectorAll(".image-1-text");

document.addEventListener("scroll", function () {
  paragraph1.forEach((paragraph) => {
    if (isInView1(paragraph)) {
      paragraph.classList.add("image-1-text--visible")
    }
  });
});

function isInView1 (element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top < (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
  );
}

// Image 2 Text Anim
const paragraph2 = document.querySelectorAll(".image-2-text");

document.addEventListener("scroll", function () {
  paragraph2.forEach((paragraph) => {
    if (isInView2(paragraph)) {
      paragraph.classList.add("image-2-text--visible")
    } else paragraph.classList.remove("image-2-text--visible")
  });
});

function isInView2 (element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top < (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
  );
}

// Image 3 Text Anim
const paragraph3 = document.querySelectorAll(".image-3-text");

document.addEventListener("scroll", function () {
  paragraph3.forEach((paragraph) => {
    if (isInView3(paragraph)) {
      paragraph.classList.add("image-3-text--visible")
    } else paragraph.classList.remove("image-3-text--visible")
  });
});

function isInView3 (element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top < (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
  );
}

// Image 3 Subtext Text Anim
const paragraph4 = document.querySelectorAll(".image-3-subtext-1");

document.addEventListener("scroll", function () {
  paragraph4.forEach((paragraph) => {
    if (isInView4(paragraph)) {
      paragraph.classList.add("image-3-subtext-1--visible")
    } else paragraph.classList.remove("image-3-subtext-1--visible")
  });
});

function isInView4 (element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top < (window.innerHeight - 300 || document.documentElement.clientHeight - 300)
  );
}

//NETTUNO ENGINE SCRIPT
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const clock = new THREE.Clock();
let mixer;

const container = document.getElementById('engine-container');
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 2);
sunLight.position.set(5, 5, 5);
scene.add(sunLight);

// Controls (Allows user to rotate the engine)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

// Load the CarEngine.glb
const loader = new GLTFLoader();
loader.load('./images/CarEngine.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Check if the model has animations
    if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);

        // Play the first animation clip (usually index 0)
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
    }

    // Center logic...
}, undefined, (error) => {
    console.error(error);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta(); // Get time passed since last frame
    if (mixer) {
        mixer.update(delta); // Tell the mixer to move the animation forward
    }

    controls.update();
    renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate(); 

// Image Comparison Slider
const slider = document.querySelector(".slider input");
const img = document.querySelector(".images .img-2");
const dragLine = document.querySelector(".slider .drag-line");

// Event listener to update image width and drag line position on slider input
slider.oninput = () => {
  let sliderVal = slider.value;
  dragLine.style.left = sliderVal + "%"; // Move drag line
  img.style.width = sliderVal + "%"; // Adjust the width of the second image
}

// Butterfly Doors Button Clicker
window.showSecond = showSecond;
window.showFirst = showFirst;

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
    target.onanimationend = animationEnded;
     target.style.display = display;
    target.style.animation = `fade-in ${duration}ms 1`;
  })
}