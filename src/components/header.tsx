import { Button } from "./ui/button";
import styles from "./header.module.scss";

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className='container'>
          <div className={styles['header-content']}>
            <div className={styles['logo-container']}>
              <img 
                src="logo.png" 
                alt="EasyExchange" 
                className={styles.logo}
              />
            </div>
            <Button variant="outline">
              Login
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
