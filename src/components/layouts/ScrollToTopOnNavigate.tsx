import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

export function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (hash) return; // let #anchor links work

    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash, lenis]);

  return null;
}