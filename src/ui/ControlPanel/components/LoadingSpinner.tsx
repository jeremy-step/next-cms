import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface SpinnerProps extends React.HtmlHTMLAttributes<HTMLElement> {
  label?: string;
}

export default function LoadingSpinner({
  label = "",
  className,
  ...rest
}: SpinnerProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "flex gap-2 place-items-center before:block before:w-5 before:aspect-square before:border-2 before:border-current before:border-t-transparent before:rounded-full before:animate-spin",
          className
        )
      )}
      {...rest}
    >
      {label}
    </div>
  );
}
