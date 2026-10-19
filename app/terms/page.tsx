import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-6 px-4 py-24 sm:px-8">
      <p className="eyebrow">Legal</p>
      <h1 className="display text-5xl">Terms of Service</h1>
      <p className="border border-accent p-4 text-sm text-accent">
        Placeholder. This text has not been reviewed by a lawyer and must be replaced with the final terms before the site
        goes live.
      </p>
      <p className="text-muted">
        Submitting the contact form does not authorize any security testing. Testing starts only after written authorization
        and an agreed scope, as described on the Our Approach page.
      </p>
    </article>
  );
}
