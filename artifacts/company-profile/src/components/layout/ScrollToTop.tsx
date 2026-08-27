import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Scrolls to the top on every route change, except when the new URL
 * carries a #hash — then it scrolls to that section instead.
 * Also disables the browser's own scroll restoration so back/forward
 * navigation doesn't jump back to a mid-page scroll offset.
 */
export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
