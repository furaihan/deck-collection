import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap font-medium uppercase leading-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        muted: "bg-muted text-muted-foreground",
        outline: "border border-border text-muted-foreground",
        signal: "bg-signal text-signal-foreground",
      },
      size: {
        default: "px-2 py-1 text-[10px] tracking-[0.12em]",
        sm: "px-1.5 py-0.5 text-[9px] tracking-[0.12em]",
      },
    },
    defaultVariants: { variant: "muted", size: "default" },
  },
);

export function Badge({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { badgeVariants };
