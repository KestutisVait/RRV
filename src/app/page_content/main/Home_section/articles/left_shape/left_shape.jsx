'use client'
import styles from "./left_shape.module.css";
import { useEffect } from "react";
import Image from "next/image";
import Logo from "@/components/logo/big/logo";

export default function LeftShape() {

useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const offsetX = scrollY * 0.3;

    document.documentElement.style.setProperty("--offset-x", `${offsetX}px`);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <article className={styles.wrapper}>
      
      <div className={styles.logo_wrapper }>
        <Logo 
          height ={25} 
          colorCircle= 'var(--lightText)' 
          colorTriangle="var(--lightText)"
          marginCircle={-1}
          marginTriangle={-3}
        />
      </div> 
      <Image src="/BG_shapes/red_triangle.svg" alt="hero" width="554" height="481" />
    </article>
  )
}