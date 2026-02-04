'use client';

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./hero.module.css";

export default function Hero() {
  const ref = useRef(null);

  // Track THIS hero only
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Raw parallax values
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const heroBgY = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const heroShapeY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Smooth them (important on iOS)
  const heroImgYSmooth = useSpring(heroImgY, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

  const heroBgYSmooth = useSpring(heroBgY, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

  const heroShapeYSmooth = useSpring(heroShapeY, {
    stiffness: 70,
    damping: 22,
    mass: 0.8,
  });

  return (
    <article ref={ref} className={styles.wrapper}>
      <motion.div
        className={styles.hero_img}
        style={{ y: heroImgYSmooth }}
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
        style={{ y: heroBgYSmooth }}
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
        style={{ y: heroShapeYSmooth }}
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
