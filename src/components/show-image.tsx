import { cn } from "../utils/tailwind-classes";

interface ShowImageProps {
  image?: string | null;
  alt?: string;
  variant?: "medium" | "original";
  className?: string;
}
export const ShowImage = ({
  image,
  alt,
  variant = "medium",
  className,
}: ShowImageProps) => {
  const defaultImage = "/finde.png";
  const aspectRatio = variant === "medium" ? 210 / 295 : 680 / 1000;

  return (
    <div
      className={cn("relative m-auto w-full overflow-hidden md:m-0", {
        "max-w-[350px]": variant === "original",
      })}
      style={{
        aspectRatio: aspectRatio,
      }}
    >
      <img
        src={image ?? defaultImage}
        alt={!image ? "Default image used, no image available" : alt}
        role="img"
        className={cn(
          "absolute left-0 top-0 h-full w-full object-cover",
          className,
        )}
      />
    </div>
  );
};
