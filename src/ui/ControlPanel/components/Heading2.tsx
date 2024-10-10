import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface HeadingProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  As?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export default function Heading2({
  As = "h2",
  children,
  className,
  ...rest
}: HeadingProps) {
  return (
    <As
      className={twMerge(clsx("text-2xl font-semibold mb-5", className))}
      {...rest}
    >
      {children}
    </As>
  );
}
