import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { ServiceRow } from "@/components/ServiceRow";
import { SectionHeader } from "@/components/PageHero";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Security is never an assumption",
  description:
    "Stey Security tests the web applications, APIs and infrastructure your product runs on. Request a free, manually reviewed security review.",
  alternates: { canonical: "/" },
};

const PREVIEW = SERVICES.filter((s) => ["web-application-penetration-testing", "api-security-testing", "remediation-guidance"].includes(s.slug));

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-page px-4 pb-24 pt-20 sm:px-8 sm:pt-28 lg:px-12">
        <p className="eyebrow">Web application · API · Infrastructure</p>
        <h1 className="display mt-8 max-w-5xl text-[clamp(3rem,8vw,7.5rem)]">
          Security is <em>never</em>
          <br />
          an assumption.
        </h1>
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-md text-lg text-muted">
            Stey Security tests the web applications, APIs and infrastructure your product runs on. We find what is
            actually exposed, explain it in plain terms, and help you fix it in the order that matters.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="solid">
              Request a Free Security Review
            </ButtonLink>
            <ButtonLink href="/services" variant="outline">
              Explore Our Services
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-preview" className="border-t border-line">
        <div className="mx-auto max-w-page space-y-16 px-4 py-24 sm:px-8 lg:px-12">
          <SectionHeader number="01" label="What we do" title={<span id="services-preview">Focused testing for the parts of your product that carry real risk.</span>}>
            <p>
              We work with startups, small and medium-sized businesses and SaaS teams. Every engagement is scoped to your
              product and your team.
            </p>
          </SectionHeader>
          <ul>
            {PREVIEW.map((service) => (
              <ServiceRow key={service.slug} service={service} href="/services" />
            ))}
          </ul>
          <div>
            <ButtonLink href="/services" variant="text" arrow={false}>
              View all six services →
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="free-review" className="bg-surface">
        <div className="mx-auto max-w-page space-y-16 px-4 py-24 sm:px-8 lg:px-12">
          <SectionHeader number="02" label="Free security review" title={<span id="free-review">A first look at your product, <em>read by a person.</em></span>} />
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:pl-[16rem]">
            <div>
              <h3 className="eyebrow mb-4">How it works</h3>
              <p className="text-muted">
                Every request is reviewed manually by someone on our team. We look at what you share, ask the questions we
                need, and talk through a sensible first step.
              </p>
              <p className="mt-4 text-muted">
                The initial review helps determine the right next step, which may be a full assessment, a focused test, or
                a few recommendations. It is not an automated scan and does not certify your system as secure.
              </p>
            </div>
            <div>
              <h3 className="eyebrow mb-4">What it requires</h3>
              <p className="text-muted">
                Active testing only begins once you have confirmed you are authorized to test the systems in scope, and the
                scope is agreed in writing.
              </p>
              <div className="mt-10">
                <ButtonLink href="/contact" variant="solid">
                  Request Your Free Review
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
