// Slider with dots + counter
// Works on any page using:
// <div class="slider" data-slider>
//   <button data-prev>...</button>
//   <div class="slider-track" data-track> <img ...> ... </div>
//   <button data-next>...</button>
// </div>

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll("[data-slider]");

  sliders.forEach((slider) => {
    const track = slider.querySelector("[data-track]");
    const prev = slider.querySelector("[data-prev]");
    const next = slider.querySelector("[data-next]");
    const imgs = Array.from(track?.querySelectorAll("img") || []);

    if (!track || !prev || !next || imgs.length === 0) return;

    // Create UI (dots + counter) under the slider
    const ui = document.createElement("div");
    ui.className = "slider-ui";

    const dotsWrap = document.createElement("div");
    dotsWrap.className = "slider-dots";

    const count = document.createElement("div");
    count.className = "slider-count";

    ui.appendChild(dotsWrap);
    ui.appendChild(count);

    // Insert UI right after slider
    slider.insertAdjacentElement("afterend", ui);

    let index = 0;

    const scrollToIndex = (i) => {
      index = Math.max(0, Math.min(i, imgs.length - 1));
      const target = imgs[index];
      target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      updateUI();
    };

    const updateUI = () => {
      const dots = dotsWrap.querySelectorAll(".slider-dot");
      dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
      count.textContent = `${index + 1} / ${imgs.length}`;
    };

    // Build dots
    imgs.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => scrollToIndex(i));
      dotsWrap.appendChild(dot);
    });

    // Prev/Next
    prev.addEventListener("click", () => scrollToIndex(index - 1));
    next.addEventListener("click", () => scrollToIndex(index + 1));

    // Update index on scroll (for swipe / drag)
    let scrollTimer = null;
    track.addEventListener("scroll", () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        // find closest image to left edge
        const trackLeft = track.getBoundingClientRect().left;
        let best = 0;
        let bestDist = Infinity;

        imgs.forEach((img, i) => {
          const dist = Math.abs(img.getBoundingClientRect().left - trackLeft);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });

        index = best;
        updateUI();
      }, 80);
    });

    // First paint
    updateUI();
  });
});
