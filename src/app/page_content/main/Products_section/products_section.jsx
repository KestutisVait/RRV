'use client';
import styles from "../main.module.css";
import productStyles from "./products_section.module.css";
import Products from "./articles/products/products";
import Services from "./articles/servicess/servises"; 
import { ProductProvider } from "@/context/ProductsContext";
 
export default function HomeSection({ id, index }) {

  return (
    <section  
      // id={id || "produktai"} 
      id="produktai" 
      className={`${styles.section} ${productStyles.wrapper}`}
      data-section={index}  
    >
      <ProductProvider>
        <Products/>
      </ProductProvider>
      {/* <Services/> */}
    </section>
  );
}
