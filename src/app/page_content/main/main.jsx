'use client';
import styles from "./main.module.css";
import { useSections } from "@/context/SectionsContext";
import { useSectionSnap } from "@/lib/hooks/useSectionSnap";
import HomeSection from "./Home_section/home_section";

export default function Main() {

  const { dataSections } = useSections();
  // console.log(dataSections);
  
  const { handleTouchStart, handleTouchEnd } = useSectionSnap();

  return (
    <main 
      className={styles.wrapper}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* {dataSections.map((section) => (
        <section
          id={section.href}
          key={section.id}
          className={styles.section}
          data-section={section.id}
        >
          {section.label}
        </section>
        ))} */}
        {/* //-------------------------------------------------------// */}
        <HomeSection id={dataSections[0].href} index={dataSections[0].id}/>
        {/* <ExpHome id={dataSections[0].href} index={dataSections[0].id}/> */}
        {/* <section
          id={dataSections[0].href}
          className={styles.section}
          data-section={dataSections[0].id}
        >
          {dataSections[0].label}
        </section> */}
        <section
          id={dataSections[1].href}
          className={styles.section}
          data-section={dataSections[1].id}
        >
          {dataSections[1].label}
        </section>
        <section
          id={dataSections[2].href}
          className={styles.section}
          data-section={dataSections[2].id}
        >
          {dataSections[2].label}
        </section>
        <section
          id={dataSections[3].href}
          className={styles.section}
          data-section={dataSections[3].id}
        >
          {dataSections[3].label}
        </section>
        <section
          id={dataSections[4].href}
          className={styles.section}
          data-section={dataSections[4].id}
        >
          {dataSections[4].label}
        </section>

    </main>
  );
}
