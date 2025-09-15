'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./nav.module.css";

export default function Example({ sections }) {
    const [navItems, setNavItems] = useState([]);

    // console.log(sections[0]);
    

  return (
    <div className={styles.wrapper}>
        {sections && sections.map((item) => (
            <div
                className={styles.nav_item} 
                key={item.id} 
                onClick={() => {
                    const section = document.getElementById(item.href);
                    section?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
            >
                {item.label}
            </div>
        ))}
    </div>
  );
}
