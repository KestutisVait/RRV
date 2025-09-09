"use client"; // (Next.js only, in app router)

import { useEffect, useState } from "react";
import Logo from "./big/logo.jsx";

export default function ResponsiveLogo(props) {
  const [isMounted, setIsMounted] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setWidth(window.innerWidth);

    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Default SSR-safe height (same on server + first client render)
  let height = 60;

  // Once mounted, adapt based on viewport
  if (isMounted) {
    if (width < 480) {
      height = 40;
    } else if (width < 768) {
      height = 50;
    } else {
      height = 60;
    }
  }

  return <Logo {...props} height={height} />;
}
