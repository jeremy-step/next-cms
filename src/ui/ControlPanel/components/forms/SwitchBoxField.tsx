"use client";

import { FormState } from "@lib/actions/definitions";
import { useId } from "react";
import SwitchBox from "../SwitchBox";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  label: string;
  name: string;
  state: FormState;
  ref?: React.RefObject<HTMLInputElement>;
}

export default function SwitchBoxField({
  title = undefined,
  label,
  name,
  state,
  className,
  ref = undefined,
  ...rest
}: FieldProps) {
  const id = useId();

  return (
    <div className={className}>
      {title && <div className="mb-2 block text-sm font-medium">{title}</div>}
      <div className="relative rounded-md">
        <div className="flex gap-2 items-center">
          <SwitchBox
            name={name}
            label={label}
            ref={ref}
            defaultValue="1"
            {...rest}
          />
          <div className="text-sm" aria-hidden>
            {label}
          </div>
        </div>

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
