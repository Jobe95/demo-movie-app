import React from "react";
import { cn } from "../utils/tailwind-classes";

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const ContentContainer = ({
  children,
  className,
  as: Component = "div",
}: ContentContainerProps) => {
  return (
    <Component className="p-4 sm:p-8">
      <div className={cn("mx-auto max-w-screen-xl", className)}>{children}</div>
    </Component>
  );
};
