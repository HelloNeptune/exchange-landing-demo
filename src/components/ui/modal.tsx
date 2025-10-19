import { FC, ReactNode } from "react";
import { X } from "lucide-react";
import styles from "./modal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Modal: FC<Props> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button className={styles['close-button']} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};
