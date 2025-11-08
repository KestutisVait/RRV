'use client';
import { useState, useEffect } from "react";
import styles from "./hero.module.css";
import Image from "next/image";

export default function Hero() {

  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth(); // set on mount
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  
  return (
    <article className={styles.wrapper}>
      <div className={styles.hero_img}>
        <Image src="/about_hero.webp" alt="hero" width="551" height="826" style={{ filter: 'brightness(1.2)' }}/>
      </div>
      <div className={styles.hero_bg}>
        <Image src="/about_hero_bg.webp" alt="hero" width="830" height="1245" style={{ filter: 'brightness(0.9)' }}/>
      </div>
      {/* <div className={styles.hero_bg_shape}>
        <Image src="/hero_bg_shape.svg" alt="hero" width="600" height="600" />
      </div> */}
  </article>
  );
}