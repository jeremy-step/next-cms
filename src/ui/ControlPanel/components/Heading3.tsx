import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface HeadingProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  As?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export default function Heading3({
  As = "h3",
  children,
  className,
  ...rest
}: HeadingProps) {
  return (
    <As
      className={twMerge(clsx("text-xl font-semibold mb-5", className))}
      {...rest}
    >
      {children}
    </As>
  );
}
