'use client';
// import { useEffect, useState } from "react";
import styles from "./nav.module.css";
import { useSections } from "@/context/SectionsContext";

export default function Example() {

    const { dataSections } = useSections();

    return (
        <div className={styles.wrapper}>
            {dataSections && dataSections.map((item) => (
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
