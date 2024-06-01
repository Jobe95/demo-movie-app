import { cva } from "class-variance-authority";
import { cn } from "../utils/tailwind-classes";

interface BadgeProps {
  text?: string;
  variant?: "rating" | "genre" | "default";
  size?: "small" | "large";
  className?: string;
}

const statusMessageVariants = cva("inline-block rounded-full font-semibold", {
  variants: {
    variant: {
      rating: "bg-amber-500/30 text-amber-500",
      genre: "bg-indigo-500/30 text-indigo-500",
      default: "bg-gray-500/30 text-gray-500",
    },
    size: {
      small: "px-3 py-1 text-xs",
      large: "px-4 py-1 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "small",
  },
});

export const Badge = ({ text, variant, size, className }: BadgeProps) => {
  if (!text) {
    return null;
  }

  return (
    <span className={cn(statusMessageVariants({ variant, size }), className)}>
      <p>{text}</p>
    </span>
  );
};
