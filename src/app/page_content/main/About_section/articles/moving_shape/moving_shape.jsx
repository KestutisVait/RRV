'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./moving_shape.module.css";

export default function MovingShape({id}) {

  const [animate, setAnimate] = useState(false);

useEffect(() => {
  const target = document.getElementById(id);
  if (!target) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      const ratio = entry.intersectionRatio;

      if (ratio >= 0.3) {
        setAnimate(true);
      } else if (ratio < 0.5) {
        setAnimate(false);
      }
    },
    { threshold: Array.from({ length: 101 }, (_, i) => i / 100) } // 0 → 1 in 0.01 steps
  );

  observer.observe(target);

  return () => observer.unobserve(target);
}, []);

  return (
    <article className={`${styles.wrapper} ${animate ? styles.animate : ""}`}>
      <svg className={styles.logo} xmlns="http://www.w3.org/2000/svg" viewBox="12 23 95 82">
        <circle cx="59.5" cy="64" r="41" fill="currentColor" />
      </svg>
     <Image 
        className={styles.shape}
        src="/BG_shapes/about_left_shape.svg" 
        alt="moving shape" 
        width="0" 
        height="0" 
        style={{ width: 'auto', height: '855px'}}
      />
    </article>
  );
}