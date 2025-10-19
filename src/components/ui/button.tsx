import React, { FC } from "react";
import clsx from "clsx";
import styles from "./button.module.scss";

type Variant = "default" | "outline" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button: FC<ButtonProps> = ({ variant = "default", size = "default", className, ...props }) => {
  const buttonClass = clsx(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size === "default" ? "default-size" : size}`],
    className
  );

  return <button className={buttonClass} {...props} />;
};
