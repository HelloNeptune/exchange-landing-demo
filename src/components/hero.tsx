import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import styles from "./hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className='container x2'>
        <div className="grid gap-12 items-center md-grid-cols-2">
          <div className={styles.content}>
            <div className={styles['text-content']}>
              <h1 className={styles.title}>
                Exchange Your Money{" "}
                <span className={styles['title-highlight']}>
                  Easily, Quickly And Securely
                </span>
              </h1>
              <p className={styles.description}>
                Best source for currency conversion, sending
                money online and tracking exchange rates. Live
                tracking and notifications • Flexible delivery
                and payment options.
              </p>
            </div>
            <Button className={styles['button']}>
              Exchange Fund
              <ArrowRight className="size-5" />
            </Button>
          </div>
          <div className={styles['image-container']}>
            <div className={styles['background-blur']}></div>
            <div className={styles['image-wrapper']}>
              <img
                src="/hero.png"
                alt="Currency Exchange"
                className={styles['hero-image']}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}