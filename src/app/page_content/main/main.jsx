"use client";
import { use, useEffect, useState } from "react";
import styles from "./main.module.css";
import next from "next";

export default function Main() {
  const [sectionInView, setSectionInView] = useState(1);
  const [nextSection, setNextSection] = useState(2);
  const [prevSection, setPrevSection] = useState(null);

  useEffect(() => {
    const sections = ["1", "2", "3", "4", "5"].map((id) =>
      document.getElementById(id)
    );
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setSectionInView(parseInt(entry.target.id));
                    console.log(`Section ${parseInt(entry.target.id)} is in view`);
                    
                    setNextSection(parseInt(entry.target.id) + 1);
                    setPrevSection(parseInt(entry.target.id) - 1);
                }
            });
        },
        {
            root: null,
            threshold: 0.98,
        }
    );
    
    sections.forEach((section) => {
        if (section) observer.observe(section);
    });
    
    return () => {
        sections.forEach((section) => {
            if (section) observer.unobserve(section);
        });
    };
}, []);


useEffect(() => {
    const sections = ["1", "2", "3", "4", "5"].map((id) =>
      document.getElementById(id)
    );
    function handleKeydown(event) {
        if (event.key === "ArrowDown") {
            if (nextSection >5) return;
            event.preventDefault();
            sections[nextSection -1].scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
        if (event.key === "ArrowUp") {
            if (prevSection < 1) return;
            event.preventDefault();
            sections[prevSection -1].scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
}

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [sectionInView]);

  return (
    <div className={styles.container}>
      <section id="1" className={styles.section}>
        Section 1
      </section>
      <section id="2" className={styles.section}>
        Section 2
      </section>
      <section id="3" className={styles.section}>
        Section 3
      </section>
      <section id="4" className={styles.section}>
        Section 4
      </section>
      <section id="5" className={styles.section}>
        Section 5
      </section>
    </div>
  );
}
