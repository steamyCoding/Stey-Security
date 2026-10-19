export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-page px-4 pb-20 pt-20 sm:px-8 sm:pt-28 lg:px-12">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display mt-6 max-w-4xl text-[clamp(2.6rem,6vw,5.5rem)]">{title}</h1>
      {intro && <p className="mt-8 max-w-xl text-lg text-muted">{intro}</p>}
      {children}
    </section>
  );
}

export function SectionHeader({ number, label, title, children }: { number: string; label: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
      <p className="eyebrow pt-2">
        {number} — {label}
      </p>
      <div>
        <h2 className="display text-[clamp(2rem,4vw,3.5rem)]">{title}</h2>
        {children && <div className="mt-6 max-w-2xl text-muted">{children}</div>}
      </div>
    </div>
  );
}
