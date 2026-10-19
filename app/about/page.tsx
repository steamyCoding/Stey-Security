import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Stey Security is an independent cybersecurity agency based in Italy, focused on practical security, clear communication and transparent engagements.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  { n: "01", title: "Practical security", body: "We rank risks by what they would cost your business, not by how long a scanner's list can get." },
  { n: "02", title: "Clear communication", body: "Findings are written so a founder can decide and an engineer can act, without either needing to translate." },
  { n: "03", title: "Actionable recommendations", body: "Every issue comes with a concrete fix path, realistic for your stack and your team's current capacity." },
  { n: "04", title: "Transparent engagement", body: "Scope, timing, access and deliverables are written down before work starts. Nothing changes without agreement." },
  { n: "05", title: "Security tailored to you", body: "A seed-stage product and a scaling SaaS platform carry different risks. We design each engagement around yours." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A small, independent practice <em>with senior hands on the work.</em>
          </>
        }
      />
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-page gap-12 px-4 py-20 sm:px-8 lg:grid-cols-[14rem_1fr] lg:px-12">
          <p className="eyebrow pt-2">Who we are</p>
          <div className="max-w-2xl space-y-6 text-lg text-muted">
            <p>
              Stey Security is an independent cybersecurity agency based in Italy. We work with startups, small and
              medium-sized businesses and SaaS companies that need credible security testing without enterprise overhead.
            </p>
            <p>
              We are deliberately small today. That keeps the people doing the testing close to the people making the
              decisions, and it keeps engagements focused on what matters for your product.
            </p>
            <p>
              Our long-term aim is to support larger organizations and enterprise clients as we grow. The principles behind
              the work will stay the same at every size: honest scope, clear reporting and recommendations that your team
              can act on.
            </p>
            <p>
              We do not claim certifications, awards or client results that we do not hold. Where we have work to show, it
              appears on the References page, with permission from the clients concerned.
            </p>
          </div>
        </div>
      </section>
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-page px-4 py-24 sm:px-8 lg:px-12">
          <p className="eyebrow">Principles</p>
          <h2 className="display mt-6 text-[clamp(2.2rem,4.5vw,3.75rem)]">What we hold ourselves to.</h2>
          <ul className="mt-16 divide-y divide-line border-y border-line">
            {PRINCIPLES.map((p) => (
              <li key={p.n} className="grid gap-4 py-8 md:grid-cols-[4rem_1fr_2fr] md:gap-8">
                <span className="font-mono text-sm text-muted">{p.n}</span>
                <h3 className="font-serif text-2xl">{p.title}</h3>
                <p className="text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
