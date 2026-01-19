'use client'
import styles from "@styles/page.module.css";
import aboutStyles from "./about.module.css";
import Image from "next/image";
import { useEffect } from "react";
import Hero from "./articles/hero/hero"
import MovingShape from "./articles/moving_shape/moving_shape"
import StripedSVGPattern from "@/components/striped_BG";
import Introduction from "./articles/introduction/introduction"

export default function AboutSection({ id, index }) {

  return (
    <section 
      id={id} 
      className={`${styles.section} ${aboutStyles.wrapper}`}
      data-section={index}
    >
      <Introduction/>
      <div className={aboutStyles.stripes_wrapper}>
        <StripedSVGPattern 
          angle={210} 
          stripeColor="rgba(4, 38, 1, 0.2)" 
          stripeThickness={1} 
          gap={5} width={100} 
          height={800} 
          fadeHeight={100}
        />
      </div>
      <MovingShape id={id}/>
      <Hero />
    </section>
  );
}
