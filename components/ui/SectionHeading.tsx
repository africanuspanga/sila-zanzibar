import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className={tone === "light" ? "eyebrow-light" : "eyebrow"}>
            <span className="h-px w-6 bg-current" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "h-display mt-4 text-[2.1rem] leading-[1.08] sm:text-[2.7rem]",
            tone === "light" ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 text-[1.02rem] leading-relaxed",
              tone === "light" ? "text-white/70" : "text-muted"
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
