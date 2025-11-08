// 'use client';
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
    </div>
  );
}
