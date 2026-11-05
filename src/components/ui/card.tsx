import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

type CardOwnProps = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * A plain container. The deck grid renders cards as `article`, so the element
 * is injectable rather than fixed to a `div`.
 */
export function Card<E extends ElementType = "div">({
  as,
  className,
  ...props
}: CardOwnProps & { as?: E } & Omit<ComponentProps<E>, keyof CardOwnProps | "as">) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag className={cn("flex flex-col", className)} {...props} />;
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 className={cn("leading-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn(className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex items-center", className)} {...props} />;
}
