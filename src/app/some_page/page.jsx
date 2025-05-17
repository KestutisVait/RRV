import styles from "..//..//styles/page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <h3 className={styles.title}>Some page</h3>
      <Link href="/" className={styles.link}>Home</Link>
    </div>
  );
}
