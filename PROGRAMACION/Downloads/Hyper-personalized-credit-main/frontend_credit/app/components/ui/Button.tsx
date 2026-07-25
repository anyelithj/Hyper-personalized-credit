import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  className?: string;
};

export function Button({ children, variant = "primary", href, className = "", ...props }: ButtonProps) {
  const baseClass = "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition";
  const variants = {
    primary: "bg-sky-600 text-white hover:bg-sky-700",
    secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
    ghost: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  };

  const combinedClassName = `${baseClass} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
