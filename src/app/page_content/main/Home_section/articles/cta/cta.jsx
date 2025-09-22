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

  useEffect(() => {
    const ctaElement = document.getElementById("cta");
    const apieElement = document.getElementById("apie");
    
    if (!ctaElement || !apieElement) return;

    const fadeConfig = [
      { index: 0, start: 0.05, factor: 5 },
      { index: 1, start: 0.2, factor: 5 },
      { index: 2, start: 0.3, factor: 5 },
      { index: 3, start: 0.4, factor: 5 }, 
    ];
    
    const handleScroll = () => {
      const rect = apieElement.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleRatio = Math.max(0, Math.min(1, (windowHeight - rect.top) / rect.height));
      
      fadeConfig.forEach(({ index, start, factor }) => {
        const child = ctaElement.children[index];
        if (!child) return;
        
        if (visibleRatio > start) {
          child.style.opacity = Math.max(0, 1 - (visibleRatio - start) * factor);
        } else {
          child.style.opacity = 1;
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth(); // set on mount
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  
  const logoHeight = viewportWidth < 480 ? 40 : 60;
  const logoSpacing = {
    circle: viewportWidth < 480 ? -5 : -7, 
    triangle: viewportWidth < 480 ? -8 : -10
  };
  
  return (
    <article id="cta" className={styles.wrapper}>
      <div className={styles.home_logo_wrapper}>
        {/* <Logo height={ctaLogoHeight} spacing={4} colorCircle="#042601" colorTriangle="#042601" /> */}
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