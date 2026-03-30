'use client';
import { useRef, useState, useEffect } from "react";
import styles from "../main.module.css";
import homeStyles from "./home.module.css";
import Image from "next/image";
import StripedSVGPattern from "@/components/striped_BG";
import Hero from "./articles/hero/hero";
import LeftShape from "./articles/left_shape/left_shape";
import BgShape from "./articles/bg_shape/bg_shape";
import Cta from "./articles/cta/cta";

export default function HomeSection({ id, index }) {

  const sectionRef = useRef(null);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    // ResizeObserver to track section height dynamically
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        setSectionHeight(entry.contentRect.height + 50); // +50px extra
      }
    });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const extraAtBottom = () => {
    const maxWidth = window.innerWidth;
    if (maxWidth<=480) return 85;
    return 95;
  } 




  return (
    <section 
      ref={sectionRef} 
      id={id || "home"} 
      className={`section ${styles.section} ${homeStyles.wrapper}`}
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
      <BgShape extraHeight={(sectionHeight - 1525.99) + extraAtBottom()}/>
      {/* <Image 
        className={homeStyles.bg_shape}
        src="/BG_shapes/yellow_polygon.svg" 
        alt="bg_shape" 
        width={0} 
        height={0} 
        // sizes="100vw" 
        style={{ width: 'auto', height: '1600px' }}
      /> */}
      <Cta />
      <Hero />
      <LeftShape />
    </section>
  );
}
