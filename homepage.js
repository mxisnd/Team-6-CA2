

//button click

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