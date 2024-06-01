import { cva } from "class-variance-authority";
import { cn } from "../utils/tailwind-classes";

interface StatusMessageProps {
  message?: string;
  variant?: "success" | "warning" | "error" | "info";
  className?: string;
}

const statusMessageVariants = cva("flex items-center rounded-md p-3 text-sm", {
  variants: {
    variant: {
      success: "bg-emerald-500/30 text-emerald-500",
      warning: "bg-amber-500/30 text-amber-500",
      error: "bg-red-500/30 text-red-500",
      info: "bg-sky-500/30 text-sky-500",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export const StatusMessage = ({
  message,
  variant,
  className,
}: StatusMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={cn(statusMessageVariants({ variant }), className)}
      role="status"
      aria-live={variant === "error" ? "assertive" : "polite"}
    >
      <p>{message}</p>
    </div>
  );
};
