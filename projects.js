// projects.js

const PROJECTS = [
  {
    id: "salon-buildout-1",
    title: "Spa & Salon Build-Out",
    location: "Johnson County, KS",
    summary:
      "Commercial tenant improvement requiring high-density plumbing layouts, ventilation coordination, electrical upgrades, and full inspection sequencing. Delivered with disciplined scheduling and clean turnover.",
    tags: ["Spa & Salon", "Tenant Improvement", "Inspection Sequencing"],
    photos: [
      "assets/projects/salon-buildout-1/01-start.jpg",
      "assets/projects/salon-buildout-1/02-mid.jpg",
      "assets/projects/salon-buildout-1/03-finish.jpg",
    ],
  },
  {
    id: "retail-ti-1",
    title: "Retail Tenant Improvement",
    location: "Overland Park, KS",
    summary:
      "Interior demolition and reconfiguration involving mechanical, electrical, and plumbing coordination within a multi-tenant commercial environment. Completed through final inspection and occupancy approval.",
    tags: ["Retail", "MEP Coordination", "Turnover"],
    photos: [
      "assets/projects/retail-ti-1/01-start.jpg",
      "assets/projects/retail-ti-1/02-mid.jpg",
      "assets/projects/retail-ti-1/03-finish.jpg",
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "TK Remodeling ran a tight schedule, coordinated trades well, and delivered an inspection-ready space. Communication was clear from start to finish.",
    name: "Client Name",
    role: "Business Owner, Johnson County",
  },
  {
    quote:
      "Their team handled scope changes professionally and kept the project moving. Closeout and turnover were clean and organized.",
    name: "Client Name",
    role: "Property Manager, Kansas City Metro",
  },
];

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
}

function safeImage(src) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  img.loading = "lazy";
  img.onerror = () => {
    img.style.display = "none";
  };
  return img;
}

function renderProjects() {
  const wrap = document.getElementById("projectsGrid");
  if (!wrap) return;

  PROJECTS.forEach((p) => {
    const card = el("div", "proj");

    const head = el(
      "div",
      "proj-head",
      `<h3>${p.title}</h3><div class="proj-meta">${p.location}</div>`
    );
    card.appendChild(head);

    const summary = el("p", "proj-summary", p.summary);
    card.appendChild(summary);

    const tags = el("div", "proj-tags");
    p.tags.forEach((t) => tags.appendChild(el("span", "pill", t)));
    card.appendChild(tags);

    const gallery = el("div", "proj-gallery");
    p.photos.forEach((src) => gallery.appendChild(safeImage(src)));
    card.appendChild(gallery);

    wrap.appendChild(card);
  });
}

function renderTestimonials() {
  const wrap = document.getElementById("testimonialsGrid");
  if (!wrap) return;

  TESTIMONIALS.forEach((t) => {
    const card = el("div", "tcard");
    card.appendChild(el("div", "tquote", `“${t.quote}”`));
    card.appendChild(el("div", "tname", `<strong>${t.name}</strong>`));
    card.appendChild(el("div", "trole", t.role));
    wrap.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderTestimonials();
});
