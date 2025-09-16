'use client';
import { useEffect, useRef, useState } from "react";
import styles from "@styles/page.module.css";
import HomeSection from "@/app/sections/Home_section/home_section.jsx";
import AboutSection from "@/app/sections/About_section/about_section.jsx";
import Nav from "@/components/Nav/Nav.jsx";
import UpButton from "@/components/Up_button/up_button.jsx";
import { getNavItems } from "../lib/fetch_nav_items.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNavItems();
      setSections(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const sectionsEls = containerRef.current.querySelectorAll("[data-scroll-section]");

    // // Set up smooth scrolling using GSAP
    // const scrollTween = gsap.to(containerRef.current, {
    //   y: () => -(window.scrollY),
    //   ease: "power1.out",
    //   scrollTrigger: {
    //     trigger: containerRef.current,
    //     start: "top top",
    //     end: () => "+=" + containerRef.current.offsetHeight,
    //     scrub: 0.1,
    //   }
    // });

    // Snap to nearest section
ScrollTrigger.create({
  trigger: containerRef.current,
  start: "top top",
  end: () => "+=" + containerRef.current.offsetHeight,
  scrub: true,
  snap: {
    snapTo: 1 / (sectionsEls.length - 1), // divide scroll progress evenly
    duration: {min: 0.1, max: 0.5},          // optional: snap animation time
    ease: "none"
  }
});
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [sections]);

  if (sections.length === 0) return <div>Loading...</div>;

  return (
    <div className={styles.page} >
      <Nav sections={sections}/>
      <UpButton />
      <div className={styles.sections_wrapper} ref={containerRef}>
        <HomeSection data-scroll-section/>
        <AboutSection data-scroll-section id={sections[0].href} />
        <div data-scroll-section id="produktai" className={styles.section} style={{ height: '100vh' }}>produktai</div>
        <div data-scroll-section id="tinklarastis" className={styles.section} style={{ height: '100vh' }}>tinklarastis</div>
        <div data-scroll-section id="kontaktai" className={styles.section} style={{ height: '100vh' }}>kontaktai</div>
      </div>

      <div className={styles.bg_shape}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1750" height="1333" viewBox="-200 0 1734 1333">
          <defs>
            <linearGradient id="gradient" x1="1" x2="0" y1="0.6415" y2="0.3585">
              <stop offset="0" stopColor="#FFCC00"/>
              <stop offset="1" stopColor="#E39700"/>
            </linearGradient>
          </defs>
          <path
             d="M1294.66 653.357L909.268 0.898907L6.40997e-06 0.898986L0.000120497 1305.9C0.000121366 1315.84 8.05896 1323.9 18.0001 1323.9L908.452 1323.9C914.888 1323.9 920.835 1320.46 924.048 1314.89L1294.76 671.498C1298 665.875 1297.96 658.944 1294.66 653.357Z"
            fill="url(#gradient)"
          />
        </svg>
      </div>
    </div>
  );
}
