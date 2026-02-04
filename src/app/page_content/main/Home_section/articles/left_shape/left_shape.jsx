'use client';

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./left_shape.module.css";

export default function LeftShape() {
  const ref = useRef(null);
  const [targetPx, setTargetPx] = useState(0);

  // Update targetPx based on window height
  useEffect(() => {
    const updateTargetY = () => setTargetPx(window.innerHeight - 550);
    updateTargetY(); // initial Y calculation

    window.addEventListener("resize", updateTargetY);
    return () => window.removeEventListener("resize", updateTargetY);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, targetPx]);
  const x = useTransform(scrollYProgress, [0, 1], [0, - targetPx / 1.75]);

  const xSmooth = useSpring(x, { stiffness: 250, damping: 50, mass: 1 });
  const ySmooth = useSpring(y, { stiffness: 250, damping: 50, mass: 1 });

  return (
    <article ref={ref} className={styles.wrapper}>
      <motion.div style={{ x: xSmooth, y: ySmooth }}>
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
//--------fot safekeeping----------//

// import Logo from "@/components/logo/big/logo";

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

