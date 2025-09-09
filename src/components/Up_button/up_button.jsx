'use client';
import { useEffect } from "react";
import styles from "./up_button.module.css";
import { HiChevronDoubleUp } from "react-icons/hi2";

export default function UpButton({ someVariable }) {

  useEffect(() => {
    const apear_position = window.innerHeight * 0.6;
    const UpButton = document.getElementById("up_button");

    function handleScroll() {
      const scrollY = window.scrollY;
      if (scrollY > apear_position) {
        UpButton.classList.add(styles.show_button);
      } else {
        UpButton.classList.remove(styles.show_button);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  return (
    <div 
      id="up_button"
      className={styles.up_button}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
    >
      <HiChevronDoubleUp style={{ fontSize: "30px" , color: "#FFC000"}}/>
    </div>
  );
}
