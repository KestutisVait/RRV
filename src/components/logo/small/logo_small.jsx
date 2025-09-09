import styles from "../logo.module.css";

export default function LogoSmall({ colorCircle, colorTriangle }) {
  return (
    <div 
      className={styles.nav_logo}      
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="12 23 95 82">
        <circle cx="59.5" cy="64" r="41" fill={colorCircle} />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="12 23 95 82">
        <circle cx="59.5" cy="64" r="41" fill={colorCircle} />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="12 23 95 82">
        <path d="M68.16 97.625
                C64.311 104.292 54.689 104.292 50.84 97.625
                L16.632 38.375
                C12.783 31.708 17.594 23.375 25.292 23.375
                H93.708
                C101.406 23.375 106.217 31.708 102.368 38.375
                Z" fill={colorTriangle}/>
      </svg>

    </div>
  );
}
