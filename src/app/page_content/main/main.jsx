'use client';
import styles from "./main.module.css";
import { useSections } from "@/context/SectionsContext";
import { useSectionSnap } from "@/lib/hooks/useSectionSnap";
import HomeSection from "./Home_section/home_section";
import AboutSection from "./About_section/about_section";
import ProductsSection from "./Products_section/products_section";
// import { ProductProvider } from "@/context/ProductsContext";
import Carousel from "@/components/carousel/carousel";

export default function Main() {

  const { dataSections } = useSections();
  // console.log(dataSections);
  
  const { handleTouchStart, handleTouchEnd } = useSectionSnap();

  if (!dataSections || dataSections.length === 0) return null;

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
        <AboutSection id={dataSections[1].href} index={dataSections[1].id}/>
        {/* <ProductProvider> */}
          <ProductsSection id={dataSections[2].href} index={dataSections[2].id}/>
        {/* </ProductProvider> */}
        {/* <section
          id={dataSections[1].href}
          className={styles.section}
          data-section={dataSections[1].id}
        >
          {dataSections[1].label}
        </section> */}
        {/* <section
          id={dataSections[2].href}
          className={styles.section}
          data-section={dataSections[2].id}
        >
          {dataSections[2].label}
        </section> */}
        {/* <ProductProvider> */}
          <section
            id={dataSections[3].href}
            className={styles.section}
            data-section={dataSections[3].id}
          >
            {dataSections[3].label}
            {/* <Carousel direction={"right"}/> */}
          </section>
        {/* </ProductProvider> */}
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
