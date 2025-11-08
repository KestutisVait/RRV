import styles from "./pill.module.css";
import Link from "next/link";

export default function PillButton({ textColor, backgroundColor, buttonContent, destination, onClickAction }) {
    const BgColor = backgroundColor;

  return (
    <div 
        className={styles.wrapper} 
        style={{ "--BgColor": BgColor, color: textColor }} 
        onClick={onClickAction}>
      {buttonContent}
    </div>
  );
}
