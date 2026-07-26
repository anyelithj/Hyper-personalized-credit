export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  className?: string;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-slate-950 text-white hover:bg-black focus-visible:ring-slate-950/20",
  secondary:
    "border border-slate-300 bg-white text-slate-950 hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-slate-950/10",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={props.type ?? "button"}
      className={
        `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantClasses[variant]} ` +
        className
      }
      {...props}
    />
  );
}
