'use client';
import styles from "./cta.module.css";
import { useEffect, useState } from "react";
import Logo from "@/components/logo/big/logo";
import PillButton from "@/components/Pill_button/pill";


const ctaPillContent = () => {
  return (
    <div className={styles.cta_pill_content_wrapper}>
      <p>PRADĖK SAVO KELIONĘ <span>ŠIANDIEN </span>!</p>
    </div>
  )
};

export default function Cta() {
  
  const [viewportWidth, setViewportWidth] = useState(0);
  const [animate, setAnimate] = useState(false);
  const logoHeight = viewportWidth < 480 ? 40 : 60;
  const logoSpacing = {
    circle: viewportWidth < 480 ? -5 : -7, 
    triangle: viewportWidth < 480 ? -8 : -10
  };

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth(); // set on mount
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const target = document.getElementById("home");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        } else {
          setAnimate(false);
        }
      },
      { threshold: 0.9 }
    );

    observer.observe(target);

    return () => observer.unobserve(target);
  }, []);
  
  return (
    <article id="cta" className={`${styles.wrapper} ${animate ? styles.animate : ""}`}>
      <div className={styles.home_logo_wrapper}>
        <Logo 
          height ={logoHeight} 
          colorCircle= 'var(--darkText)' 
          colorTriangle="var(--darkText)"
          marginCircle={logoSpacing.circle}
          marginTriangle={logoSpacing.triangle}
          />
        <div className={styles.cta_hero_name}>
          <p className={styles.cta_hero_Firstname}>Rita Raukaitė -</p>
          <p className={styles.cta_hero_Lastname}>Vaitiekūnė</p>
        </div>
      </div>
      <div className={styles.slogan}>
        <span>Atrakink</span>
        <span>Savo</span>
        <span>Potencialą !</span>
      </div>
      <div className={styles.post_slogan}>
        <p>Asmeninis augimas ir saviugda</p>
      </div>  
      <PillButton 
        buttonContent={ctaPillContent()} 
        backgroundColor={"#9d00ff"}
        destination={"produktai"}  
        />
    </article>
  )
}