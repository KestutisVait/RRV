'use client';

import styles from "./left_shape.module.css";
import Image from "next/image";
import Logo from "@/components/logo/big/logo";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LeftShape() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  const vh = window.innerHeight;

  // Horizontal parallax (centered so layout never shifts)
  // const strength = 120;

  const x = useTransform( scrollYProgress, [0, 1], [0, -420]);
  const y = useTransform( scrollYProgress, [0, 1], [0, 700]);
  

  return (
    <article ref={ref} className={styles.wrapper}>
      {/* <motion.div
        className={styles.logo_wrapper}
        style={{ x }}
      >
        <Logo
          height={25}
          colorCircle="var(--lightText)"
          colorTriangle="var(--lightText)"
          marginCircle={-1}
          marginTriangle={-3}
        />
      </motion.div> */}

      <motion.div style={{ x, y }}>
        <Image
          src="/BG_shapes/red_triangle.svg"
          alt="red triangle"
          width={554}
          height={481}
        />
      </motion.div>
    </article>
  );
}
