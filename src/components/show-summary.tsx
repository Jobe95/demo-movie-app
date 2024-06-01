import DOMPurify from "dompurify";
import { cn } from "../utils/tailwind-classes";

interface ShowSummaryProps {
  summary?: string;
  className?: string;
}

export const ShowSummary = ({ summary, className }: ShowSummaryProps) => {
  if (!summary) {
    return null;
  }
  const cleanSummary = DOMPurify.sanitize(summary);

  return (
    <div
      className={cn("text-sm text-gray-500", className)}
      aria-live="polite"
      dangerouslySetInnerHTML={{ __html: cleanSummary }}
    />
  );
};
