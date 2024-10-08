"use client";

import { FormState } from "@lib/actions/definitions";
import { useId } from "react";

interface FieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  state: FormState;
}

export default function TextareaField({
  label,
  name,
  state,
  className,
  ...rest
}: FieldProps) {
  const id = useId();

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-2 rounded-md">
        <textarea
          id={id}
          name={name}
          aria-describedby={`${id}-error`}
          className="block w-full max-h-24 min-h-16 h-20 py-2 rounded-md border resize-y bg-slate-100 !border-slate-300 dark:bg-slate-900 dark:!border-slate-700 !ring-0 outline-2 focus:outline-offset-0 focus:outline-sky-500 placeholder:text-gray-500"
          {...rest}
        />
        <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
          {state?.errors &&
            state.errors[name] &&
            state.errors[name].map((error, index) => (
              <p className="mt-2 text-sm text-red-500" key={index}>
                {error}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
