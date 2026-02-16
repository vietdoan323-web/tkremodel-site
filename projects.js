// Simple slider: scrolls one image at a time.
// Works with any number of images inside .slider-track

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll("[data-slider]");

  sliders.forEach((slider) => {
    const track = slider.querySelector("[data-track]");
    const prev = slider.querySelector("[data-prev]");
    const next = slider.querySelector("[data-next]");

    if (!track || !prev || !next) return;

    const scrollOne = (direction) => {
      const firstImg = track.querySelector("img");
      if (!firstImg) return;

      // Use the visible width of one slide + gap
      const slideWidth = firstImg.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0");
      const amount = slideWidth + (isNaN(gap) ? 0 : gap);

      track.scrollBy({ left: direction * amount, behavior: "smooth" });
    };

    prev.addEventListener("click", () => scrollOne(-1));
    next.addEventListener("click", () => scrollOne(1));
  });
});
