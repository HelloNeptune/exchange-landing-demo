import { FC } from "react";
import { Eye, Mail, Lock } from "lucide-react";
import { Button } from "./ui/button";
import styles from "./login-form.module.scss";

interface Props {
  onClose: () => void;
}

export const LoginForm: FC<Props> = ({ onClose }) => {
  return (
    <div className={styles['login-form']}>
      <div className={styles.welcome}>
        <h3 className={styles['welcome-title']}>Welcome Back!</h3>
        <p className={styles['welcome-text']}>Sign in to your account to continue</p>
      </div>

      <form className={styles.form}>
        <div className={styles['input-group']}>
          <label className={styles.label}>Email Address</label>
          <div className={styles['input-wrapper']}>
            <Mail className={styles['input-icon']} size={18} />
            <input
              type="email"
              className={styles.input}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className={styles['input-group']}>
          <label className={styles.label}>Password</label>
          <div className={styles['input-wrapper']}>
            <Lock className={styles['input-icon']} size={18} />
            <input
              type="password"
              className={styles.input}
              placeholder="Enter your password"
            />
            <button type="button" className={styles['eye-button']}>
              <Eye size={18} />
            </button>
          </div>
        </div>

        <div className={styles.options}>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            Remember me
          </label>
          <a href="#" className={styles['forgot-password']}>
            Forgot Password?
          </a>
        </div>

        <Button className={styles['login-button']}>
          Sign In
        </Button>

        <div className={styles.divider}>
        </div>

        <div className={styles.signup}>
          Don't have an account?{" "}
          <a href="#" className={styles['signup-link']}>
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};
