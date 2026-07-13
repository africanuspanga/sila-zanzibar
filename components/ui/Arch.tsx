import Image from "next/image";
import { cn } from "@/lib/cn";

// An SVG of the Zanzibari ogee arch — the shape at the heart of the SILA
// favicon. Used to frame imagery and as a quiet decorative motif.

// A single ogee-arch outline path within a 0 0 100 130 viewBox.
export const ARCH_PATH =
  "M4,130 L4,64 C4,42 14,30 30,24 C40,20 44,12 50,2 C56,12 60,20 70,24 C86,30 96,42 96,64 L96,130 Z";

export function ArchOutline({
  className,
  strokeWidth = 3,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 130"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d={ARCH_PATH}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// An image cropped inside the ogee-arch silhouette.
export function ArchImage({
  src,
  alt,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const clipId = "arch-" + src.replace(/[^a-z0-9]/gi, "").slice(-12);
  return (
    <div className={cn("relative", className)}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {/* Normalised ogee arch (0–1 space). */}
            <path d="M0.04,1 L0.04,0.49 C0.04,0.32 0.14,0.23 0.30,0.185 C0.40,0.155 0.44,0.09 0.50,0.015 C0.56,0.09 0.60,0.155 0.70,0.185 C0.86,0.23 0.96,0.32 0.96,0.49 L0.96,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ clipPath: `url(#${clipId})` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}
