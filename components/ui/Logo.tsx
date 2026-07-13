import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

// The SILA wordmark. `tone="light"` renders it white for dark backgrounds.
export function Logo({
  tone = "dark",
  className,
  width = 116,
}: {
  tone?: "dark" | "light";
  className?: string;
  width?: number;
}) {
  return (
    <Link
      href="/"
      aria-label="SILA Real Estate — home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/sila-logo.png"
        alt="SILA Real Estate"
        width={width}
        height={Math.round(width * 0.36)}
        priority
        className={cn(
          "h-auto w-auto",
          tone === "light" && "brightness-0 invert"
        )}
        style={{ width }}
      />
    </Link>
  );
}
