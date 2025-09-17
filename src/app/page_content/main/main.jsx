"use client";
import { useRef, useEffect, useState } from "react";
import styles from "./main.module.css";
import { useSections } from "@/context/SectionsContext";

export default function Main() {

  // const [sectionInView, setSectionInView] = useState(1);
  // const [nextSection, setNextSection] = useState(2);
  // const [prevSection, setPrevSection] = useState(null);
  const { dataSections } = useSections();

  const sectionInViewRef = useRef(1);
  const nextRef = useRef(2);
  const prevRef = useRef(null);

  // useEffect(() => { nextRef.current = nextSection }, [nextSection]);
  // useEffect(() => { prevRef.current = prevSection }, [prevSection]);

  // ------------------- OBSERVER ----------------------- //
  
  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.id);
            sectionInViewRef.current = id;
            nextRef.current = id + 1;
            prevRef.current = id - 1;
            // console.log(`Section ${parseInt(entry.target.id)} is in view`);
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
  
  // ------------------- KEY DOWN SNAPPING ----------------------- //
  
  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    function handleKeydown(event) {
      if (event.key === "ArrowDown") {
        if (nextRef.current > dataSections.length) return;
        event.preventDefault();
        sections[nextRef.current -1]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      if (event.key === "ArrowUp") {
        if (prevRef.current < 1) return;
        event.preventDefault();
        sections[prevRef.current -1]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    
    window.addEventListener("keydown", handleKeydown);
    
    return () => window.removeEventListener("keydown", handleKeydown);
  });
  
  // ------------------- MOUSE WHEEL SNAPPING ----------------------- //

  useEffect(() => {
    function handleMouseWheel(event) {
      if (event.deltaY > 0) {
        if (nextRef.current > dataSections.length) return;
        document.getElementById(nextRef.current)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (event.deltaY < 0) {
        if (prevRef.current < 1) return;
        document.getElementById(prevRef.current)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    
    window.addEventListener("wheel", handleMouseWheel);
    
    return () => window.removeEventListener("wheel", handleMouseWheel);
  });



  return (
    <main className={styles.container}>
      {dataSections.map((section) => (
        <section
        id={section.id}
        key={section.id}
        className={styles.section}
        data-section
        >
          {section.label}
        </section>
      ))}
    </main>
  );
}
