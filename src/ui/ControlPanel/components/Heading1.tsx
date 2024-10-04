import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface HeadingProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  As?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export default function Heading1({
  As = "h1",
  children,
  className,
  ...rest
}: HeadingProps) {
  return (
    <As
      className={twMerge(clsx("text-3xl font-semibold", className))}
      {...rest}
    >
      {children}
    </As>
  );
}
