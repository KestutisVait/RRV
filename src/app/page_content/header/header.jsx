import styles from "./header.module.css";
import Nav from "./nav/nav";
import Logo from "../../../components/logo/big/logo.jsx";
export default function Header({ someVariable }) {
  return (
    <header className={styles.wrapper}>
      <div className={styles.logo_wrapper}>
        <Logo 
          height ={20} 
          spacing={10} 
          colorCircle= 'var(--lightText)' 
          colorTriangle="var(--lightText)"
          marginCircle={-1}
          marginTriangle={-3}
        />
      </div>
      <Nav />
    </header>
  );
}
