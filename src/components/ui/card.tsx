import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "cn";

type CardOwnProps = {
  className?: string;
  children?: ReactNode;
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
  return <Tag data-slot="card" className={cn("flex flex-col", className)} {...props} />;
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 data-slot="card-title" className={cn("leading-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="card-description" className={cn("text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn(className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center", className)} {...props} />;
}
