import styles from "./pill.module.css";
import Link from "next/link";

export default function PillButton({ backgroundColor, buttonContent, destination }) {
    const BgColor = backgroundColor;

  return (
    <div 
        className={styles.wrapper} 
        style={{ "--BgColor": BgColor }} 
        onClick={() => {
            const section = document.getElementById(destination);
            section?.scrollIntoView({ behavior: "smooth" })
        }}>
      {buttonContent}
    </div>
  );
}
