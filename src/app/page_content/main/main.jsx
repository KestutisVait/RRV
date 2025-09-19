'use client';
import styles from "./main.module.css";
import { useSections } from "@/context/SectionsContext";
import { useSectionSnap } from "@/lib/hooks/useSectionSnap";

export default function Main() {

  const { dataSections } = useSections();
  const { handleTouchStart, handleTouchEnd } = useSectionSnap();

  return (
    <main 
      className={styles.wrapper}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {dataSections.map((section) => (
        <section
        id={section.href}
        key={section.id}
        className={styles.section}
        data-section={section.id}
        >
          {section.label}
        </section>
      ))}
    </main>
  );
}
