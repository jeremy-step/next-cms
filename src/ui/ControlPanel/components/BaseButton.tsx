import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface ButtonProps
  extends React.HtmlHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  children?: React.ReactNode;
  as?: "button" | "Link";
  href?: string;
  disabled?: boolean;
  mode?: "success" | "info" | "alert" | "warning" | "base";
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export default function BaseButton({
  as = "button",
  href = "",
  mode = "info",
  disabled = false,
  onClick = undefined,
  type = undefined,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = `pt-3 pr-3 pb-3 pl-3 rounded transition-colors text-center font-semibold select-none
    active:shadow-[inset_0_0_2px_2px_rgba(0_0_0/.2)] dark:active:shadow-[inset_0_0_2px_2px_rgba(0_0_0/.4)]
    disabled:!bg-gray-500 disabled:cursor-not-allowed disabled:!shadow-none
    [&[aria-disabled="true"]]:!bg-gray-500 [&[aria-disabled="true"]]:cursor-not-allowed [&[aria-disabled="true"]]:!shadow-none`;

  const _mode = {
    "bg-green-700 hover:bg-green-600 active:bg-green-600 text-white dark:bg-green-300 dark:hover:bg-green-400 dark:active:bg-green-400 dark:text-black":
      mode === "success",
    "bg-sky-700 hover:bg-sky-600 active:bg-sky-600 text-white dark:bg-sky-300 dark:hover:bg-sky-400 dark:active:bg-sky-400 dark:text-black":
      mode === "info",
    "bg-red-700 hover:bg-red-600 active:bg-red-600 text-white dark:bg-red-300 dark:hover:bg-red-400 dark:active:bg-red-400 dark:text-black":
      mode === "alert",
    "bg-amber-700 hover:bg-amber-600 active:bg-amber-600 text-white dark:bg-amber-300 dark:hover:bg-amber-400 dark:active:bg-amber-400 dark:text-black":
      mode === "warning",
    "bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-600 text-white dark:bg-neutral-300 dark:hover:bg-neutral-400 dark:active:bg-neutral-400 dark:text-black":
      mode === "base",
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if ((e.target as HTMLElement).closest('[aria-disabled="true"]')) {
      e.preventDefault();
    }

    if (onClick) {
      onClick(e);
    }
  };

  switch (as) {
    case "Link":
      return (
        <Link
          href={href}
          className={twMerge(clsx(classes, _mode, className))}
          {...rest}
          onClick={handleClick}
        >
          {children}
        </Link>
      );

    default:
      return (
        <button
          className={twMerge(clsx(classes, _mode, className))}
          {...rest}
          disabled={disabled}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      );
  }
}
