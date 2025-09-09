import Link from "next/link";
import styles from "@styles/page.module.css";
import HomeSection from "@/components/Home_section/home_section.jsx";
import Nav from "@/components/Nav/Nav.jsx";
import UpButton from "@/components/Up_button/up_button.jsx";

export default function Home() {

  
  return (
    <div className={styles.page}>
      <Nav />
      <UpButton />
      <HomeSection />
      <div id="apie" className={styles.section} style={{ height: '200vh' }}></div>
      <div id="produktai" className={styles.section} style={{ height: '200vh' }}>produktai</div>
      <div id="tinklarastis" className={styles.section} style={{ height: '200vh' }}>tinklarastis</div>
      <div id="kontaktai" className={styles.section} style={{ height: '200vh' }}>kontaktai</div>

      <div className={styles.bg_shape}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1750" height="1333" viewBox="-200 0 1734 1333">
          <defs>
            <linearGradient id="gradient" x1="1" x2="0" y1="0.6415" y2="0.3585">
              <stop offset="0" stopColor="#FFCC00"/>
              <stop offset="1" stopColor="#E39700"/>
            </linearGradient>
          </defs>
          <path
            d="M1142.704 0L1533.226 656.5c3.573 6.188 3.573 13.812 0 20L1142.704 1323c-3.572 6.188-10.174 10-17.319 10H-200V0h1322.704z"
            fill="url(#gradient)"
          />
        </svg>
      </div>
    </div>
  );
}
