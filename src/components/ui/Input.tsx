import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  mono?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, mono = false, className = "", ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={name}
          className="block font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-light mb-1.5"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          className={`w-full bg-white border-[1.5px] border-ink-navy/10 rounded-xl px-3.5 py-2.5 text-sm text-slate font-body placeholder:text-slate-light/40 transition-all duration-200 hover:border-ink-navy/20 focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,162,39,0.1)] focus:bg-[#fffdf8] ${mono ? "font-mono text-[13px]" : ""} ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
