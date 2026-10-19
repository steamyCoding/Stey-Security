export type Service = {
  slug: string;
  number: string;
  title: string;
  description: string;
  value: string;
};

export const SERVICES: readonly Service[] = [
  {
    slug: "web-application-penetration-testing",
    number: "01",
    title: "Web Application Penetration Testing",
    description:
      "Hands-on testing of authentication, session handling, access control, input handling and business logic. The areas automated scanners usually miss.",
    value: "Find flaws before your customers or an attacker do.",
  },
  {
    slug: "api-security-testing",
    number: "02",
    title: "API Security Testing",
    description:
      "Review of endpoints, authorization between services, token handling, rate limits and the data your APIs return by default.",
    value: "APIs are often the largest untested surface of a SaaS product.",
  },
  {
    slug: "vulnerability-assessments",
    number: "03",
    title: "Vulnerability Assessments",
    description:
      "A structured survey of weaknesses across your systems, verified and ranked by how much they would matter if exploited.",
    value: "A clear, ranked picture of what to address first.",
  },
  {
    slug: "infrastructure-security-assessments",
    number: "04",
    title: "Infrastructure Security Assessments",
    description:
      "Review of cloud configuration, network exposure, secrets handling, identity settings and server hardening.",
    value: "Confirms what is reachable from the internet, and why.",
  },
  {
    slug: "security-consulting",
    number: "05",
    title: "Security Consulting",
    description:
      "Advice on architecture, secure development practices and the trade-offs behind product decisions.",
    value: "Better decisions made early, when they are still cheap.",
  },
  {
    slug: "remediation-guidance",
    number: "06",
    title: "Remediation Guidance",
    description:
      "Concrete fix guidance written for your engineers, prioritised against your team's capacity, with a follow-up review of the changes.",
    value: "Findings that actually get closed.",
  },
];

export const CONTACT_SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.title),
  "Not sure yet",
] as const;
