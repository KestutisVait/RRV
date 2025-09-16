'use client'
import styles from "@styles/page.module.css";
import aboutStyles from "./about.module.css";
import Image from "next/image";
import { useEffect } from "react";

export default function AboutSection({ id }) {

//   // -------------------------------------------------------

//   function scrollToSection(section, duration = 1000) {
//   const start = window.scrollY;
//   const end = section.getBoundingClientRect().top + start;
//   const distance = end - start;
//   let startTime = null;

//   // Example easing: cubic-bezier(0.25, 1, 0.5, 1) ≈ "easeOutCubic"
//   function easeOutCubic(t) {
//     return 1 - Math.pow(1 - t, 3);
//   }

//   function animation(currentTime) {
//     if (startTime === null) startTime = currentTime;
//     const timeElapsed = currentTime - startTime;
//     const progress = Math.min(timeElapsed / duration, 1);

//     const easedProgress = easeOutCubic(progress);

//     window.scrollTo(0, start + distance * easedProgress);

//     if (timeElapsed < duration) requestAnimationFrame(animation);
//   }

//   requestAnimationFrame(animation);
// }
// // ----------------------------------------------

//   useEffect(() => {
//     const section = document.querySelector(`.${aboutStyles.about_section}`);
//     const mask = document.querySelector(`.${aboutStyles.hero_section}`);

//     if (!section) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             // section.scrollIntoView( { behavior: "smooth", block: "start" });
//             scrollToSection(section, 800);
//             mask.classList.add(aboutStyles.animate_mask_in);
//           } else {
//             // console.log("Out of view");
//             mask.classList.remove(aboutStyles.animate_mask_in);
//           }
//         });
//       },
//       {
//         root: null,       // viewport
//         rootMargin: "0px",
//         threshold: 0.5,  
//       }
//     );
//     observer.observe(section);

//     return () => {
//       if (section) observer.unobserve(section);
//     };
//   }, []);

  return (
    <div data-scroll-section id={id} className={`${styles.section} ${aboutStyles.about_section}`}>
      <article>
        <h1>Apie mane</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit...
        </p>
      </article>
      <div className={aboutStyles.hero_section}>
        <Image className={aboutStyles.hero_bg} src="/about_hero_bg.webp" alt="hero" width={500} height={750} />
        <Image className={aboutStyles.hero_img} src="/about_hero.webp" alt="hero" width={500} height={750} />
      </div>
    </div>
  );
}
