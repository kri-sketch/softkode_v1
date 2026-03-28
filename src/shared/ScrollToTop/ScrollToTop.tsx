import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there's a hash, find the element and scroll to it smoothly
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Otherwise, jump to the top instantly for a snappier feel
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as any, // Cast to any because some typings might not have 'instant'
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
