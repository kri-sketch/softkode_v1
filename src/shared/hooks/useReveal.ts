// Simple hook that attaches IntersectionObserver to elements with [data-reveal]
// When element enters viewport it receives the `reveal-visible` class.
export function initReveal(options?: IntersectionObserverInit) {
  if (typeof window === "undefined") return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        el.classList.add("reveal-visible");
        el.classList.remove("reveal-hidden");
        observer.unobserve(el);
      }
    });
  }, options || { threshold: 0.12 });

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    // only attach if not already visible
    if (!el.classList.contains("reveal-visible")) {
      el.classList.add("reveal-hidden");
      observer.observe(el);
    }
  });

  return observer;
}

export default initReveal;
