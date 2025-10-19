import { Hero } from "./components/hero";
import styles from "./app.module.scss";

export default function App() {
  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <Hero />
      </main>
      <footer className={styles.footer}>
        <div className={`container ${styles['footer-container']}`}>
          <p className={styles['footer-text']}>
            © 2025 <b>EASYEXCHANGE</b>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}