import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-3xl">Stey Security</p>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Independent cybersecurity agency based in Italy, working with software teams around the world.
            </p>
            <a href={`mailto:${SITE.email}`} className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-accent">
              {SITE.email}
            </a>
          </div>
          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Legal">
            <p className="eyebrow mb-4">Legal</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
          <p className="eyebrow">© {new Date().getFullYear()} Stey Security</p>
          <p className="eyebrow">Security is never an assumption.</p>
        </div>
      </div>
    </footer>
  );
}
