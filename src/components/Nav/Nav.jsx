'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./nav.module.css";

export default function Example({ someVariable }) {
    const [navItems, setNavItems] = useState([]);

    console.log(styles);
    

    useEffect(() => {

        const fetchedNavItems = async () => {
          try {
            const response = await axios.get("/data/nav.json");
            console.log(response.data);
            setNavItems(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchedNavItems();
        
    }, []);


  return (
    <div className={styles.wrapper}>
      {/* <LogoSmall 
        colorCircle={"#F9FFF7"} 
        colorTriangle={"#9747FF"}
        
      /> */}
        {navItems && navItems.map((item) => (
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
