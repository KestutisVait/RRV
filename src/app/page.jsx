import Link from "next/link";
import styles from "..//styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>LET'S CREATE</h1>
      <Link href="/some_page" className={styles.link}>Some page</Link>
      <Link href="/api/hello" className={styles.link}>Api</Link>
    </div>
  );
}
