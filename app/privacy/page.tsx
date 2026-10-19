import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-6 px-4 py-24 sm:px-8">
      <p className="eyebrow">Legal</p>
      <h1 className="display text-5xl">Privacy Policy</h1>
      <p className="border border-accent p-4 text-sm text-accent">
        Placeholder. This text has not been reviewed by a lawyer and must be replaced with the final policy before the site
        goes live.
      </p>
      <p className="text-muted">
        The contact form collects your name, business email, company, optional website, service of interest, message and
        authorization confirmation. We use this information only to respond to your request. We do not sell it or share it
        with third parties. Questions about your data can be sent to {SITE.email}.
      </p>
    </article>
  );
}
