import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-page px-4 py-32 sm:px-8 lg:px-12">
      <p className="eyebrow">404</p>
      <h1 className="display mt-6 text-5xl">This page does not exist.</h1>
      <div className="mt-10">
        <ButtonLink href="/" variant="outline">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
