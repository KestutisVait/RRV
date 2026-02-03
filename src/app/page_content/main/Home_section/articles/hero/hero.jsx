'use client';

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./hero.module.css";

export default function Hero() {
  const ref = useRef(null);

const { scrollY } = useScroll();
  // Parallax mappings (tweak values to taste)
  const heroImgY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroBgY = useTransform(scrollY, [0, 1000], [0, 260]);
  const heroShapeY = useTransform(scrollY, [0, 1000], [0, -120]);

  return (
    <article ref={ref} className={styles.wrapper}>
      <motion.div
        className={styles.hero_img}
        style={{ y: heroImgY }}
      >
        <Image
          src="/hero.webp"
          alt="hero"
          width={551}
          height={826}
          style={{ filter: "brightness(1.2)", objectFit: "cover" }}
          priority
        />
      </motion.div>

      <motion.div
        className={styles.hero_bg}
        style={{ y: heroBgY }}
      >
        <Image
          src="/hero_bg.webp"
          alt="hero background"
          width={684}
          height={1026}
        />
      </motion.div>

      <motion.div
        className={styles.hero_bg_shape}
        style={{ y: heroShapeY }}
      >
        <Image
          src="/hero_bg_shape.svg"
          alt="hero shape"
          width={600}
          height={600}
        />
      </motion.div>
    </article>
  );
}
