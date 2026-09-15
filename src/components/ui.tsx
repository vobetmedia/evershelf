import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "link";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center font-sans font-bold uppercase text-[14px] tracking-normal transition-colors duration-150 disabled:cursor-not-allowed";
const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-paper border border-accent hover:bg-accent-dark hover:border-accent-dark disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-600",
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper disabled:border-gray-400 disabled:text-gray-600",
  link: "bg-transparent text-ink underline-offset-4 hover:text-accent",
};
const sizes: Record<Size, string> = {
  md: "h-[54px] px-8",
  lg: "h-[62px] px-10 text-[15px]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${variant === "link" ? "h-auto px-0" : sizes[size]} ${extra}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

export function SectionHeader({
  title,
  subtitle,
  action,
  size = "xl",
  align = "center",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: { href: string; label: string };
  size?: "xl" | "sm";
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignCls} gap-3 mb-8 md:mb-10`}>
      <h2
        className={`display ${
          size === "xl" ? "text-[42px] md:text-[74px]" : "text-[26px] md:text-[28px]"
        }`}
      >
        {title}
      </h2>
      {subtitle && <p className="max-w-[520px] text-[17px] leading-6">{subtitle}</p>}
      {action && (
        <Link
          href={action.href}
          className="text-[12px] font-bold uppercase underline underline-offset-4 hover:text-accent"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function Stars({ rating, size = 16, className = "" }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-[2px] text-accent-mid ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.5 5.9 21l1.5-6.8L2.2 9.5l6.9-.7z"
            fill={i < rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

export function RatingBadge({
  approval,
  size = "sm",
  className = "",
}: {
  approval: number;
  size?: "sm" | "lg";
  className?: string;
}) {
  const dim = size === "lg" ? "h-[105px] w-[105px]" : "h-[64px] w-[64px]";
  const pct = size === "lg" ? "text-[32px]" : "text-[20px]";
  const label = size === "lg" ? "text-[10px]" : "text-[7px]";
  return (
    <span
      className={`inline-flex ${dim} shrink-0 flex-col items-center justify-center rounded-full bg-accent text-paper ${className}`}
      title={`${approval}% of customers would buy again`}
    >
      <span className={`display ${pct} leading-none`}>{approval}%</span>
      <span className={`${label} font-bold uppercase leading-none mt-1`}>Would buy again</span>
    </span>
  );
}

export function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 30" className={`h-[34px] w-[46px] ${className}`} aria-hidden="true">
      <path d="M0 30V13.6L8.6 0h9.4l-6.2 13.6H17V30H0zm22.9 0V13.6L31.5 0H41l-6.2 13.6h5.1V30H22.9z" fill="currentColor" />
    </svg>
  );
}
