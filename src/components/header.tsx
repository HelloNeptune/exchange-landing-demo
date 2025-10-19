import { useState } from "react";
import { Button } from "./ui/button";
import styles from "./header.module.scss";

export function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

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
            <Button variant="outline" onClick={openLoginModal}>
              Login
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
