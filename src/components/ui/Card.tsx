import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
}

export default function Card({ variant = "light", className = "", children, ...props }: CardProps) {
  const base = "rounded-2xl border transition-all duration-200";
  const variants = {
    light: "bg-white border-ink-navy/[0.06] shadow-sm",
    dark: "bg-ink-navy border-white/10 shadow-2xl shadow-black/20",
  };
  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`border-b border-ink-navy/[0.06] px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-5 ${className}`} {...props}>
      {children}
    </div>
  );
}
