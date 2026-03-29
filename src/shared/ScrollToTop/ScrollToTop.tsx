import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // For hash links, let smooth scroll work as expected
      const timeout = setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
      return () => clearTimeout(timeout);
    }

    // Force instant scroll to top — override CSS smooth-scroll
    // so the user is never left mid-page on route transition
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.body.scrollTop = 0; // fallback for some mobile browsers

    // Restore smooth scroll after a tick so anchor links still work
    const restore = setTimeout(() => {
      html.style.scrollBehavior = "";
    }, 100);

    return () => clearTimeout(restore);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;

