import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>create test run</div>
        
        <div>test results list</div>
        <div>individual test results</div>
      </div>
    </main>
  );
}
