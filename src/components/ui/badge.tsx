import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap font-medium uppercase leading-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        secondary: "bg-muted text-muted-foreground",
        muted: "bg-muted text-muted-foreground",
        outline: "border border-border text-muted-foreground",
        ghost: "text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
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
  variant = "muted",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      { className: cn(badgeVariants({ variant, size }), className) },
      props,
    ),
    render,
    state: { slot: "badge", variant, size },
  });
}

export { badgeVariants };
