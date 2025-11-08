import styles from "./card.module.css";
import Image from "next/image";
import PillButton from "../Pill_button/pill";

export default function Card({ poster, price, shortInfo, pricePerHour, empty, handleInfoClick }) {
  return (
    <div className={styles.wrapper}  style={{ filter: `${empty ? " grayscale(0.8)" : "none"}` }}>
      <img className={styles.poster} src={poster} alt="card" />
      <div className={styles.cta}>
        <div className={styles.buy_pill}>
          <PillButton 
            textColor="var(--lightText)" 
            backgroundColor="var(--purple)" 
            buttonContent="Įsigyk dabar" 
            destination="" 
          />
        </div>
        <p className={styles.price}>
          {price}{' '} 
          <span className={styles.currency}>{pricePerHour ? "EUR./VAL." : "EUR."}</span>
        </p>
      </div>
      <p className={styles.short_info}>{shortInfo}</p>
      <div className={styles.pills_wrapper}>
        <PillButton 
          textColor="var(--lightText)" 
          backgroundColor="var(--darkText)" 
          buttonContent="Plačiau" 
          onClickAction={handleInfoClick} 
        />
      </div>
    </div>
  );
}
