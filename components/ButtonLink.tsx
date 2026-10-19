import Link from "next/link";

type Variant = "solid" | "outline" | "text";
type Size = "sm" | "md";

const base =
  "group inline-flex items-center gap-3 whitespace-nowrap font-sans transition-colors duration-200 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  solid: "bg-inverse-bg text-inverse-text hover:bg-accent hover:text-paper",
  outline: "border border-line text-ink hover:border-accent hover:text-accent",
  text: "text-ink underline underline-offset-8 decoration-line hover:decoration-accent hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-xs uppercase tracking-[0.12em]",
  md: "px-6 py-4 text-sm",
};

export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  children,
  arrow = true,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]}`}>
      {children}
      {arrow && <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>}
    </Link>
  );
}
