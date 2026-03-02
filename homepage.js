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
    rect.top < (window.innerHeight - 400 || document.documentElement.clientHeight - 400)
  );
}

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