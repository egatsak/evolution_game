import { ButtonHTMLAttributes, memo, ReactNode } from "react";

export enum ButtonTheme {
  CLEAR = "clear",
  OUTLINE = "outline",
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const { className, children, theme, ...otherProps } = props;

  return (
    <button type="button" className={`${className} ${theme}`} {...otherProps}>
      {children}
    </button>
  );
});
