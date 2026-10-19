import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a free security review, a custom assessment quote or ask a general question about Stey Security services.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-page gap-16 px-4 pb-24 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-[1fr_1.4fr] lg:gap-24 lg:px-12">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-6 text-[clamp(2.6rem,5.5vw,5rem)]">
          Start with <em>a conversation.</em>
        </h1>
        <p className="mt-8 max-w-sm text-lg text-muted">
          Tell us what you are building and what you need. Whether it is a free review, a question about a service, or a
          custom quote, we will reply personally.
        </p>
        <a href={`mailto:${SITE.email}`} className="mt-10 inline-block font-mono text-sm underline underline-offset-4 hover:text-accent">
          {SITE.email}
        </a>
      </div>
      <div>
        <ContactForm />
      </div>
    </section>
  );
}
