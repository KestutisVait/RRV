'use client';
import styles from "../main.module.css";
import homeStyles from "./home.module.css";
import Image from "next/image";
import StripedSVGPattern from "@/components/striped_BG";
import Hero from "./articles/hero/hero";
import LeftShape from "./articles/left_shape/left_shape";
import Cta from "./articles/cta/cta";

export default function HomeSection({ id, index }) {

  return (
    <section  
      id={id || "home"} 
      className={`${styles.section} ${homeStyles.wrapper}`}
      data-section={index}  
    >
      <StripedSVGPattern 
        angle={210} 
        stripeColor="rgba(4, 38, 1, 0.2)" 
        stripeThickness={1} 
        gap={5} width={100} 
        height={700} 
        fadeHeight={100}
      />
      <Image 
        className={homeStyles.bg_shape}
        src="/BG_shapes/yellow_polygon.svg" 
        alt="bg_shape" 
        width={0} 
        height={0} 
        // sizes="100vw" 
        style={{ width: 'auto', height: '1600px' }}
      />
      <Cta />
      <Hero />
      <LeftShape />
    </section>
  );
}
