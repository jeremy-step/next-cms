import clsx from "clsx";

interface PanelProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  Tag?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export default function BasePanel({
  Tag = "div",
  children,
  className,
  ...rest
}: PanelProps) {
  return (
    <Tag
      {...rest}
      className={clsx(
        "p-4 rounded-md bg-slate-200 text-slate-950 dark:bg-slate-800 dark:text-slate-50",
        className
      )}
    >
      {children}
    </Tag>
  );
}
