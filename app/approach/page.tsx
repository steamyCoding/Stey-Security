import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "Our five-stage security assessment process and the ground rules every engagement follows: written authorization, defined boundaries, immediate notice and no overclaiming.",
  alternates: { canonical: "/approach" },
};

const STAGES = [
  { n: "i.", title: "Understand the environment", body: "We learn how your product is built, where your data lives and who depends on it, before touching anything." },
  { n: "ii.", title: "Define the assessment scope", body: "Together we agree exactly which systems are in scope, what is out, and the rules of engagement, in writing." },
  { n: "iii.", title: "Conduct authorized testing", body: "Testing stays inside the agreed scope and authorization, with care taken not to disrupt your live service." },
  { n: "iv.", title: "Deliver actionable findings", body: "Each finding states what we found, how serious it is, how we confirmed it and what a practical fix looks like." },
  { n: "v.", title: "Support remediation", body: "We answer your engineers' questions and review the fixes, so the work ends with issues closed rather than a PDF." },
];

const RULES = [
  { k: "A", title: "Written authorization", body: "We test only systems you own or are formally authorized to test, confirmed in writing before work begins." },
  { k: "B", title: "Defined boundaries", body: "Scope, timing and any production limits are agreed up front. Anything outside them stays untouched." },
  { k: "C", title: "Immediate notice", body: "If we find something that puts data or service at immediate risk, you hear about it at once, not at the end." },
  { k: "D", title: "No overclaiming", body: "A report states what was tested and what was not. A clean result is never presented as proof that a system is secure." },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        title={
          <>
            A process you can follow <em>without a security background.</em>
          </>
        }
        intro="Every engagement moves through the same five stages. You always know what we are doing, what we have touched, and what happens next."
      />

      <section className="border-t border-line">
        <ol className="mx-auto grid max-w-page gap-12 px-4 py-20 sm:px-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-8 lg:px-12">
          {STAGES.map((stage) => (
            <li key={stage.n} className="border-t border-line pt-6">
              <p className="font-mono text-sm text-muted">{stage.n}</p>
              <h2 className="mt-4 font-serif text-2xl leading-tight">{stage.title}</h2>
              <p className="mt-4 text-sm text-muted">{stage.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-page px-4 py-24 sm:px-8 lg:px-12">
          <p className="eyebrow">Ground rules</p>
          <h2 className="display mt-6 max-w-3xl text-[clamp(2.2rem,4.5vw,3.75rem)]">
            What we will <em>always</em> do, before any testing starts.
          </h2>
          <p className="mt-6 max-w-xl text-muted">
            These are written into every scope agreement, so they never depend on memory or goodwill.
          </p>
          <ul className="mt-16 grid gap-px bg-line md:grid-cols-2">
            {RULES.map((rule) => (
              <li key={rule.k} className="bg-surface p-8 lg:p-10">
                <p className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-accent">{rule.k}</span>
                  <span className="font-serif text-2xl">{rule.title}</span>
                </p>
                <p className="mt-4 max-w-md text-muted">{rule.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-page flex-col gap-8 px-4 py-24 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p className="max-w-2xl font-serif text-3xl leading-snug sm:text-4xl">
            Technical depth where your engineers need it. Plain language where your decisions are made.
          </p>
          <ButtonLink href="/contact" variant="outline">
            Start your own assessment
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
