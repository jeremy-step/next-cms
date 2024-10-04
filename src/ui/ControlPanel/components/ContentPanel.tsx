import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface PanelProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  Tag?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export default function ContentPanel({
  Tag = "div",
  children,
  className,
  ...rest
}: PanelProps) {
  return (
    <Tag
      {...rest}
      className={twMerge(
        clsx(
          "pt-3 pr-3 pb-3 pl-3 rounded bg-slate-300 dark:bg-slate-700 !bg-opacity-30",
          className
        )
      )}
    >
      {children}
    </Tag>
  );
}
