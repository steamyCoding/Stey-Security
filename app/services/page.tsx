import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServiceRow } from "@/components/ServiceRow";
import { ButtonLink } from "@/components/ButtonLink";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web application penetration testing, API security testing, vulnerability assessments, infrastructure security assessments, security consulting and remediation guidance.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Six disciplines. <em>One goal:</em> know your real exposure.
          </>
        }
        intro="Each engagement is scoped to your product and your team. We focus on the parts of your system that carry real risk to your customers and your business, and we say plainly what we did not test."
      />
      <section className="border-t border-line">
        <ul className="mx-auto max-w-page px-4 sm:px-8 lg:px-12">
          {SERVICES.map((service) => (
            <ServiceRow key={service.slug} service={service} detailed />
          ))}
        </ul>
      </section>
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-page flex-col gap-8 px-4 py-24 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p className="max-w-xl font-serif text-3xl leading-snug sm:text-4xl">
            Not sure which service fits? Most first conversations start with the free review. We will tell you if you do
            not need one of these yet.
          </p>
          <ButtonLink href="/contact" variant="solid">
            Request a Free Security Review
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
