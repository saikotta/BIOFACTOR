(() => {
  if (!new URLSearchParams(window.location.search).has("poultryStatic")) return;

  document.documentElement.dataset.poultryStatic = "";

  const nativeMatchMedia = window.matchMedia.bind(window);
  const allowDiagramMotion = new URLSearchParams(window.location.search).has("poultryDiagramMotion");
  window.matchMedia = (query) => {
    const result = nativeMatchMedia(query);
    if (query.includes("prefers-reduced-motion")) {
      Object.defineProperty(result, "matches", { configurable: true, value: !allowDiagramMotion });
    }
    return result;
  };

  const style = document.createElement("style");
  style.textContent = `
    html[data-poultry-static],
    html[data-poultry-static] body,
    html[data-poultry-static] main,
    html[data-poultry-static] .page,
    html[data-poultry-static] .section,
    html[data-poultry-static] .layout,
    html[data-poultry-static] .frame {
      background-color: transparent !important;
      background-image: none !important;
    }
    html[data-poultry-static] *,
    html[data-poultry-static] *::before,
    html[data-poultry-static] *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
    html[data-poultry-static] [data-aos],
    html[data-poultry-static] .reveal,
    html[data-poultry-static] .fade-in,
    html[data-poultry-static] .animate,
    html[data-poultry-static] .rise,
    html[data-poultry-static] [class*="rise"],
    html[data-poultry-static] [class*="reveal"],
    html[data-poultry-static] [class*="animate"] {
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
    html[data-poultry-static] .headline-line {
      opacity: 1 !important;
      transform: none !important;
    }
    html[data-poultry-static] :is(h1, h2, h3, h4, h5, h6, p, li, td, th):not(.evidence-panel):not(.evidence-panel *) {
      color: #10260f !important;
    }
  `;
  document.head.appendChild(style);
})();