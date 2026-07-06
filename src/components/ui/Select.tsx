import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, name, options, placeholder, className = "", ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={name}
          className="block font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-light mb-1.5"
        >
          {label}
        </label>
        <select
          ref={ref}
          id={name}
          name={name}
          className={`w-full bg-white border-[1.5px] border-ink-navy/10 rounded-xl px-3.5 py-2.5 text-sm text-slate font-body appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10 transition-all duration-200 hover:border-ink-navy/20 focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,162,39,0.1)] focus:bg-[#fffdf8] ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
