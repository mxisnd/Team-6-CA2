const paragraph5 = document.querySelectorAll(".preorder_text");

function checkVisibility() {
  paragraph5.forEach((paragraph) => {
    if (isInView5(paragraph)) {
      paragraph.classList.add("preorder_text--visible");
    }
  });
}

function isInView5(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top < (window.innerHeight - 20 || document.documentElement.clientHeight - 20)
  );
}

checkVisibility();

document.addEventListener("scroll", checkVisibility);