'use client';
import { useEffect } from "react";
import styles from "@styles/page.module.css";
import homeStyles from "./home.module.css";
import Image from "next/image";
import StripedSVGPattern from "@/components/striped_BG";
import LogoSmall from "../logo/small/logo_small";
import Logo from "../logo/big/logo";
import ResponsiveLogo from "../logo/responsiveLogo";
import PillButton from "../Pill_button/pill";

// const imageLoader = ({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`
const ctaPillContent = () => {
  return (
    <div className={homeStyles.cta_pill_content_wrapper}>
      <p>PRADĖK SAVO KELIONĘ <span>ŠIANDIEN </span>!</p>
      {/* <p>Get Started</p> */}
    </div>
  )
};

export default function Home({ someVariable }) {

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  const ctaLogoHeight = viewportWidth < 480 ? 40 : 60;
  const ctaLogoSpacing = viewportWidth < 480 ? 8 : 4;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const styles = document.documentElement.style;
      const offsetX = scrollY * 0.3;
      const offsetYDownFast = scrollY * 0.5;
      const offsetYDownSlow = scrollY * 0.2;
      const offsetYPositive = -offsetYDownFast;

      const variables = {
        '--svg-offset-x': `${offsetX}px`,
        '--svg-offset-y-down-fast': `${offsetYDownFast}px`,
        '--svg-offset-y-down-slow': `${offsetYDownSlow}px`,
        '--svg-offset-y-positive': `${offsetYPositive}px`
      };

      for (const [key, value] of Object.entries(variables)) {
        styles.setProperty(key, value);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="home" className={`${styles.section} ${homeStyles.home_section}`}>
      {/* <div className={styles.bg_shape}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1750" height="1333" viewBox="-200 0 1734 1333">
          <defs>
            <linearGradient id="gradient" x1="1" x2="0" y1="0.6415" y2="0.3585">
              <stop offset="0" stopColor="#FFCC00"/>
              <stop offset="1" stopColor="#E39700"/>
            </linearGradient>
          </defs>
          <path
            d="M1142.704 0L1533.226 656.5c3.573 6.188 3.573 13.812 0 20L1142.704 1323c-3.572 6.188-10.174 10-17.319 10H-200V0h1322.704z"
            fill="url(#gradient)"
          />
        </svg>
      </div> */}
      <div className={homeStyles.cta_wrapper}>
        <div className={homeStyles.home_logo_wrapper}>
          <ResponsiveLogo height={ctaLogoHeight} spacing={4} colorCircle="#042601" colorTriangle="#042601" />
          <div className={homeStyles.cta_hero_name}>
            <p className={homeStyles.cta_hero_Firstname}>Rita Raukaitė -</p>
            <p className={homeStyles.cta_hero_Lastname}>Vaitiekūnė</p>
          </div>
        </div>
        <div className={homeStyles.slogan}>
          <span>Atrakink</span>
          <span>Savo</span>
          <span>Potencialą !</span>
        </div>
        <div className={homeStyles.post_slogan}>
          <p>Asmeninis augimas ir saviugda</p>
        </div>
        <PillButton 
          buttonContent={ctaPillContent()} 
          backgroundColor={"#9d00ff"}
          destination={"produktai"}  
        />
      </div>
      <div className={homeStyles.red_triangle}>
        <div className={homeStyles.nav_logo_wrapper }>
          <LogoSmall colorCircle={"#F9FFF7"} colorTriangle={"#F9FFF7"} />
        </div> 
        <Image src="/BG_shapes/red_triangle.svg" alt="hero" width="554" height="481" />
      </div>
      <StripedSVGPattern 
        angle={210} 
        stripeColor="rgba(4, 38, 1, 0.2)" 
        stripeThickness={1} 
        gap={5} width={100} 
        height={700} 
        fadeHeight={100}
      />
      <div className={`${homeStyles.hero_section} ${homeStyles.masked}`}>
        <div className={homeStyles.hero_img}>
          <Image src="/hero.webp" alt="hero" width="551" height="826" style={{ filter: 'brightness(1.2)' }}/>
        </div>
        <div className={homeStyles.hero_bg}>
          <Image src="/hero_bg.webp" alt="hero" width="684" height="1026" />
        </div>
        <div className={homeStyles.hero_bg_shape}>
          <Image src="/hero_bg_shape.svg" alt="hero" width="600" height="600" />
        </div>
      </div>
    </div>
  );
}
