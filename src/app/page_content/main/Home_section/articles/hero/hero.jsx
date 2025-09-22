'use client';
import Image from "next/image";
import { useEffect } from "react";
import styles from "./hero.module.css";

export default function Hero() {

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const styles = document.documentElement.style;
      // const offsetX = scrollY * 0.3;
      const heroImgOffset = scrollY * 0.5;
      const heroBgOffset = scrollY * 0.2;
      const heroShapeOffset = - heroImgOffset;

      const variables = {
        // '--svg-offset-x': `${offsetX}px`,
        '--hero_img_offset': `${heroImgOffset}px`,
        '--hero_bg_offset': `${heroBgOffset}px`,
        '--hero_shape_offset': `${heroShapeOffset}px`
      };

      for (const [key, value] of Object.entries(variables)) {
        styles.setProperty(key, value);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
      <article className={styles.wrapper}>
        <div className={styles.hero_img}>
          <Image src="/hero.webp" alt="hero" width="551" height="826" style={{ filter: 'brightness(1.2)', objectFit: 'cover' }}/>
        </div>
        <div className={styles.hero_bg}>
          <Image src="/hero_bg.webp" alt="hero" width="684" height="1026" />
        </div>
        <div className={styles.hero_bg_shape}>
          <Image src="/hero_bg_shape.svg" alt="hero" width="600" height="600" />
        </div>
      </article>
  );
}