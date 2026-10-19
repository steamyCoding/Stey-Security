import Link from "next/link";
import type { Service } from "@/lib/services";

export function ServiceRow({ service, href, detailed = false }: { service: Service; href?: string; detailed?: boolean }) {
  const content = (
    <div className="grid gap-6 py-8 md:grid-cols-[4rem_1.2fr_1.6fr_1fr] md:items-start md:gap-8">
      <span className="font-mono text-sm text-muted">{service.number}</span>
      <h3 className="font-serif text-2xl leading-tight sm:text-3xl">{service.title}</h3>
      <p className={`text-muted ${detailed ? "" : "md:pr-6"}`}>{service.description}</p>
      <div className="space-y-2">
        <p className="eyebrow text-[0.62rem]">Business value</p>
        <p className="text-sm">{service.value}</p>
      </div>
    </div>
  );

  return (
    <li className="border-t border-line last:border-b">
      {href ? (
        <Link href={href} className="group block transition-colors hover:text-accent">
          {content}
        </Link>
      ) : (
        content
      )}
    </li>
  );
}
