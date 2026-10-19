export const SITE = {
  name: "Stey Security",
  email: "hello@steysecurity.com",
  location: "Italy, working globally",
  description:
    "Independent cybersecurity agency based in Italy. Web application, API and infrastructure security testing for software teams.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Our Approach" },
  { href: "/about", label: "About" },
  { href: "/references", label: "References" },
] as const;
