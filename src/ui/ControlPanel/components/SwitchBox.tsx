import clsx from "clsx";
import { useId } from "react";
import { twMerge } from "tailwind-merge";

interface SwitchProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}

export default function SwitchBox({
  label,
  name = undefined,
  defaultChecked = false,
  disabled = false,
  className,
  ref = undefined,
  ...rest
}: SwitchProps) {
  const id = `${name ?? ""}-${useId()}`;

  return (
    <div className={twMerge(clsx("relative w-min", className))}>
      <input
        id={id}
        name={name}
        type="checkbox"
        className="peer sr-only"
        aria-labelledby={id}
        defaultChecked={defaultChecked}
        disabled={disabled}
        ref={ref}
        {...rest}
      />
      <label
        htmlFor={id}
        className="
        relative
        block w-12 h-6 p-0.5 rounded-full border bg-slate-100 border-slate-300 dark:bg-slate-900 dark:border-slate-700 peer-focus-visible:outline outline-2 peer-focus-visible:outline-sky-500
        before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:translate-x-0.5 before:aspect-square before:h-[calc(100%-0.25rem)] before:bg-red-700 dark:before:bg-red-300 before:rounded-full peer-checked:before:translate-x-[calc(150%-(0.125rem/2))]
        before:transition-all peer-checked:before:bg-green-700 dark:peer-checked:before:bg-green-300
        peer-disabled:before:!bg-gray-500 cursor-pointer peer-disabled:cursor-not-allowed
        "
      >
        <span className="sr-only">{label}</span>
      </label>
    </div>
  );
}
