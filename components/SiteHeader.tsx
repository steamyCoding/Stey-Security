"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink } from "./ButtonLink";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-baseline gap-3 whitespace-nowrap" aria-label="Stey Security, home">
          <span className="font-serif text-xl">Stey Security</span>
          <span className="eyebrow hidden text-[0.6rem] sm:inline">Security Agency</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.href} href={link.href} active={pathname === link.href}>
              {link.label}
            </NavItem>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <ButtonLink href="/contact" variant="outline" size="sm">
              Get a Security Assessment
            </ButtonLink>
          </div>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <button
            type="button"
            className="border border-line px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div id={menuId} hidden={!open} className="border-t border-line bg-paper lg:hidden">
        <nav aria-label="Mobile" className="mx-auto flex max-w-page flex-col px-4 py-4 sm:px-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-serif text-2xl"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="py-4 font-serif text-2xl text-accent">
            Get a Security Assessment
          </Link>
          <div className="pt-4 md:hidden">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavItem({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`text-sm transition-colors hover:text-accent ${active ? "text-ink underline underline-offset-8" : "text-muted"}`}
    >
      {children}
    </Link>
  );
}
