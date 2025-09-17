import styles from "@styles/page.module.css";
import Header from "./page_content/header/header"; 
import Intro from "./intro/intro"; 
import Main from "./page_content/main/main.jsx";  


export default function Page() {

  return (
    <div className={styles.page} >
      <Intro>
        <Header />
        <Main />
      </Intro>

      {/* <div className={styles.bg_shape}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1750" height="1333" viewBox="-200 0 1734 1333">
          <defs>
            <linearGradient id="gradient" x1="1" x2="0" y1="0.6415" y2="0.3585">
              <stop offset="0" stopColor="#FFCC00"/>
              <stop offset="1" stopColor="#E39700"/>
            </linearGradient>
          </defs>
          <path
             d="M1294.66 653.357L909.268 0.898907L6.40997e-06 0.898986L0.000120497 1305.9C0.000121366 1315.84 8.05896 1323.9 18.0001 1323.9L908.452 1323.9C914.888 1323.9 920.835 1320.46 924.048 1314.89L1294.76 671.498C1298 665.875 1297.96 658.944 1294.66 653.357Z"
            fill="url(#gradient)"
          />
        </svg>
      </div>  */}
    </div>
  );
}
