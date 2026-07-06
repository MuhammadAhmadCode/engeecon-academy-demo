import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-ink-navy font-semibold shadow-[0_4px_14px_rgba(201,162,39,0.25)] hover:bg-gold-light hover:shadow-[0_8px_25px_rgba(201,162,39,0.35)] hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 active:scale-[0.99] active:shadow-[0_2px_8px_rgba(201,162,39,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
  secondary:
    "bg-transparent text-white/60 border border-white/15 hover:border-white/30 hover:text-white/85 hover:bg-white/5 hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "bg-transparent text-slate hover:bg-ink-navy/[0.04] border border-ink-navy/10 hover:border-ink-navy/20",
  danger:
    "bg-stamp-red text-white font-semibold hover:bg-stamp-red/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5",
  md: "text-sm px-5 py-2.5 rounded-xl gap-2",
  lg: "text-sm px-8 py-3.5 rounded-xl gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className = "", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center font-body transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading && <span className="spinner spinner-white" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
