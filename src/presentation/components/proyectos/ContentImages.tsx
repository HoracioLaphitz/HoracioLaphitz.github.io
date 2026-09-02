import { useEffect } from "react";

export function ContentImages() {
  useEffect(() => {
    const container = document.querySelector("[data-content-body]");
    if (!container) return;

    const images = container.querySelectorAll("img");
    images.forEach((img) => {
      if (img.dataset.zoomable === "true") return;
      img.dataset.zoomable = "true";
      img.style.cursor = "pointer";
      img.addEventListener("click", (e) => {
        e.preventDefault();
        const src = img.src;
        const alt = img.alt || "";
        openLightbox(src, alt);
      });
    });
  }, []);

  return null;
}

function openLightbox(src: string, alt: string) {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.9);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
  `;

  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.style.cssText = "max-width: 95vw; max-height: 95vh; object-fit: contain;";

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", function onKey(e) {
    if (e.key === "Escape") {
      close();
      document.removeEventListener("keydown", onKey);
    }
  });
}
