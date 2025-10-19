import clsx from "clsx";
import styles from "./card.module.scss";
import { FC } from "react";

interface Props {
  title?: string;
  description?: string;
  iconImage?: string;
  className?: string;
}

export const Card: FC<Props> = ({ title, description, iconImage, className }) => {
  return (
    <div
      data-slot="card"
      className={clsx(styles["card"], className)}
    >
      <div className={styles["card-content"]}>
        <div className={styles["icon-title-container"]}>
          {iconImage && (
            <div className={styles["icon-wrapper"]}>
              <div className={styles["icon-glow"]}></div>
              <div className={styles["icon-container"]}>
                <img
                  src={iconImage}
                  alt={title}
                  className={styles["icon-image"]}
                />
              </div>
            </div>
          )}

          <div className={styles["title-section"]}>
            {title && (
              <h3 className={styles["card-title-custom"]}>
                {title}
              </h3>
            )}
            <div className={styles["title-line"]}></div>
          </div>
        </div>

        {description && (
          <p className={styles["description-text"]}>
            {description}
          </p>
        )}

        <div className={styles["background-decoration"]}></div>
      </div>
    </div>
  );
}
