// Module-level set to track elements that have already been observed.
// This prevents re-mounting route components from re-attaching the observer
// to persistent elements (like the footer), which caused the page to
// auto-scroll on every route transition.
const observed = new WeakSet<Element>();

let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("reveal-visible");
            el.classList.remove("reveal-hidden");
            sharedObserver!.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
  }
  return sharedObserver;
}

export function initReveal() {
  if (typeof window === "undefined") return;

  const observer = getObserver();

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    // Skip elements that are already observed or already visible
    if (observed.has(el) || el.classList.contains("reveal-visible")) return;

    observed.add(el);
    el.classList.add("reveal-hidden");
    observer.observe(el);
  });

  return observer;
}

export default initReveal;
