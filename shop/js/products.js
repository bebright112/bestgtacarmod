const PRODUCTS = [
  {
    name: "Toyota Century 2021",
    price: "$20.00",
    tags: ["new", "toyota", "sedan"],
    isFree: false,
    image: "https://ik.imagekit.io/fhh6vyvfq/21cen.png",
    link: "products/21century.html",
    badge: "NEW",
  },
  {
    name: "Hyundai Palisade 2026",
    price: "$35.00",
    tags: ["hyundai", "suv"],
    isFree: false,
    image: "https://ik.imagekit.io/fhh6vyvfq/26pal.png",
    link: "products/26palisade.html",
    badge: "Hyundai",
  },
  {
    name: "Mercedes E-Class 2024",
    price: "$20.00",
    tags: ["mercedes", "seden"],
    isFree: false,
    image: "https://ik.imagekit.io/fhh6vyvfq/24ecl.png",
    link: "products/24eclass.html",
    badge: "Mercedes",
  },
  {
    name: "BMW i3 2016",
    price: "$0.00",
    tags: ["bmw", "suv", "free", "ev"],
    isFree: true,
    image: "https://ik.imagekit.io/fhh6vyvfq/16i3.png",
    link: "products/16i3.html",
    badge: "Free",
  },
  {
    name: "Xenexis X90",
    price: "$0.00",
    tags: ["debad", "seden", "free"],
    isFree: true,
    image: "https://ik.imagekit.io/fhh6vyvfq/21x90.png",
    link: "products/21x90.html",
    badge: "Free",
  },
];

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderProducts(products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = products
    .map((p) => {
      const name = escapeHtml(p.name);
      const price = escapeHtml(p.price);
      const img = escapeHtml(p.image);
      const link = escapeHtml(p.link);
      const badge = (p.badge || "").trim();

      const badgeHtml =
        badge.length > 0
          ? `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${escapeHtml(
              badge
            )}</div>`
          : "";

      return `
      <div class="col mb-5">
        <a href="${link}" class="text-decoration-none text-dark">
          <div class="card h-100 position-relative">
            ${badgeHtml}
            <img class="card-img-top" src="${img}" alt="${name}" />
            <div class="card-body p-4">
              <div class="text-center">
                <h5 class="fw-bolder">${name}</h5>
                <div class="text-muted">${price}</div>
              </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <span class="btn btn-outline-dark mt-auto">See More</span>
              </div>
            </div>
          </div>
        </a>
      </div>
      `;
    })
    .join("");
}

function applyFilter(filter) {
  if (filter === "all") return PRODUCTS;

  if (filter === "free") return PRODUCTS.filter(p => p.isFree === true);
  if (filter === "paid") return PRODUCTS.filter(p => p.isFree !== true);

  return PRODUCTS.filter(p => (p.tags || []).includes(filter));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(PRODUCTS);

  const filterWrap = document.getElementById("filters");
  if (!filterWrap) return;

  filterWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;

    filterWrap.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    renderProducts(applyFilter(filter));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(PRODUCTS);
});
