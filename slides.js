/* ============================================================
   Slides HTML | A Jogada 37 da Liderança
   Anderson Marinho | Igarapé Digital
   ============================================================ */

const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const slideCounter = document.querySelector("#slideCounter");

let currentSlide = 0;

function showSlide(index) {
  if (index < 0 || index >= slides.length) return;

  slides[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");

  updateControls();
}

function updateControls() {
  slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;

  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function goToFirstSlide() {
  showSlide(0);
}

function goToLastSlide() {
  showSlide(slides.length - 1);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

document.addEventListener("keydown", function(event) {
  const key = event.key;

  if (key === "ArrowRight" || key === "PageDown" || key === " ") {
    event.preventDefault();
    nextSlide();
  }

  if (key === "ArrowLeft" || key === "PageUp") {
    event.preventDefault();
    prevSlide();
  }

  if (key === "Home") {
    event.preventDefault();
    goToFirstSlide();
  }

  if (key === "End") {
    event.preventDefault();
    goToLastSlide();
  }

  if (key === "f" || key === "F") {
    toggleFullscreen();
  }
});

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(function() {});
    return;
  }

  document.exitFullscreen().catch(function() {});
}

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function(event) {
  touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener("touchend", function(event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) < 60) return;

  if (diff > 0) {
    nextSlide();
  } else {
    prevSlide();
  }
}

updateControls();
