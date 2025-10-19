import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { CurrencyConverter } from "./components/currency-converter";
import styles from "./app.module.scss";

export default function App() {
  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <CurrencyConverter />
        <Features />
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