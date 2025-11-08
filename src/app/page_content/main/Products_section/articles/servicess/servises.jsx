import styles from "./services.module.css";
import Image from "next/image";
import StripedSVGPattern from "@/components/striped_BG";
import Card from "@/components/card/card";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";

export default function Services() {

  const shortInfo = "Susitikime pasikalbėti apie Tau kylančius iššūkius."
  const price = 40

  const poster = "/product_img/2.png"
  return (
        <article className={styles.wrapper}>
      <CiCircleChevLeft className={styles.icon_back}/>
      <div className={styles.card_wrapper}>
        <Card poster={poster} price={price} shortInfo={shortInfo} costPerHour={true} />
      </div>
      <StripedSVGPattern
        angle={210} 
        stripeColor="rgba(4, 38, 1, 0.2)" 
        stripeThickness={1} 
        gap={5} width={100} 
        height={700} 
        fadeHeight={100}
      />
      <CiCircleChevRight className={styles.icon_next}/>
      {/* <p className={styles.title}>Paslaugos</p> */}
    </article>
  );
};

