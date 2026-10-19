import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "References",
  description: "Selected security testing work, shown only with client permission.",
  alternates: { canonical: "/references" },
};

// Placeholders only. Replace each entry with work the client has approved in writing.
const SLOTS = [
  { n: "01", client: "[Client name — pending permission]", type: "[Web application penetration test — placeholder]", summary: "[One-sentence summary of scope and outcome, approved by the client.]" },
  { n: "02", client: "[Client name — pending permission]", type: "[API security review — placeholder]", summary: "[One-sentence summary of scope and outcome, approved by the client.]" },
  { n: "03", client: "[Client name — pending permission]", type: "[Infrastructure assessment — placeholder]", summary: "[One-sentence summary of scope and outcome, approved by the client.]" },
];

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        eyebrow="References"
        title={
          <>
            Selected work, <em>shown with permission.</em>
          </>
        }
        intro="Client engagements appear here only once the client has agreed to be named or described. Until then, each slot below marks the kind of work we are set up to show."
      />
      <section className="border-t border-line">
        <ul className="mx-auto max-w-page divide-y divide-line px-4 sm:px-8 lg:px-12">
          {SLOTS.map((slot) => (
            <li key={slot.n} className="grid gap-6 py-12 md:grid-cols-[4rem_1fr_2fr] md:gap-8">
              <span className="font-mono text-sm text-muted">{slot.n}</span>
              <div>
                <p className="font-serif text-2xl text-muted">{slot.client}</p>
              </div>
              <div>
                <p className="eyebrow mb-3">Engagement type</p>
                <p>{slot.type}</p>
                <p className="mt-2 text-muted">{slot.summary}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-4 max-w-page px-4 pb-16 text-sm text-muted sm:px-8 lg:px-12">
          Every entry above is a placeholder and does not describe a real engagement. Replace each one only with work the
          client has approved in writing. Testimonials and logos follow the same rule.
        </p>
      </section>
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-page flex-col gap-8 px-4 py-24 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p className="font-serif text-3xl sm:text-4xl">Start with a conversation.</p>
          <ButtonLink href="/contact" variant="solid">
            Start your own assessment
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
