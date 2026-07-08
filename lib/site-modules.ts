export const siteModules = [
  { key: "home", label: "home", path: "/" },
  { key: "about", label: "about", path: "/about" },
  { key: "services", label: "services", path: "/services" },
  { key: "work", label: "work", path: "/portfolio" },
  { key: "process", label: "process", path: "/process" },
  { key: "contact", label: "contact", path: "/contact" },
] as const;

export const services = [
  {
    title: "Web Development",
    summary: "High-performance websites with precise responsive behavior, clean architecture, and strong SEO foundations.",
    output: "marketing sites, landing systems, company websites",
    detail: "Ideal for companies that need a premium public presence, fast pages, clear messaging, and a site that works across mobile, tablet, and desktop without feeling generic.",
    stack: ["Next.js", "TypeScript", "SEO", "Responsive UI"],
  },
  {
    title: "Web Applications",
    summary: "Custom dashboards, portals, tools, and workflows built around how your team actually works.",
    output: "admin panels, SaaS interfaces, internal systems",
    detail: "We turn repeated operations into usable software: role-based views, data tables, forms, workflows, dashboards, and product-style interfaces.",
    stack: ["React", "APIs", "Dashboards", "Auth-ready UI"],
  },
  {
    title: "E-Commerce",
    summary: "Product discovery, catalog structure, checkout journeys, and conversion-focused storefront experiences.",
    output: "online stores, catalogs, payment-ready experiences",
    detail: "From product browsing to enquiry or checkout, we design commerce flows that help customers understand, compare, trust, and act.",
    stack: ["Catalog UX", "Cart Flow", "Payments", "Mobile Commerce"],
  },
  {
    title: "ERP & Business Systems",
    summary: "Operational software that brings data, roles, and repeated business tasks into one usable interface.",
    output: "inventory, reporting, workflow automation",
    detail: "For teams outgrowing spreadsheets, we build structured systems for inventory, reporting, approvals, internal workflows, and business visibility.",
    stack: ["Data Models", "Reports", "Workflow UI", "Admin Tools"],
  },
  {
    title: "UI/UX Design",
    summary: "Interface systems that feel sharp, readable, and premium across desktop and mobile.",
    output: "wireframes, design systems, interactive prototypes",
    detail: "We design screens as systems: spacing, states, typography, cards, controls, mobile behavior, and interaction patterns that can scale.",
    stack: ["Design Systems", "Prototypes", "User Flows", "Interface Audit"],
  },
  {
    title: "Maintenance & Growth",
    summary: "Ongoing improvements, security updates, performance checks, and product iteration after launch.",
    output: "support, audits, feature releases",
    detail: "After launch, we help with improvements, content changes, bug fixes, analytics-informed iteration, performance tuning, and new features.",
    stack: ["Support", "Optimization", "Iteration", "Monitoring"],
  },
];

export const processSteps = [
  {
    title: "Discover",
    summary: "We map the business goal, users, workflows, content, and constraints before designing anything.",
    artifact: "scope.map",
    checklist: ["Business goal", "User paths", "Content inventory", "Success signals"],
  },
  {
    title: "Design",
    summary: "We turn the idea into screens, flows, and system rules that make the product feel coherent.",
    artifact: "interface.system",
    checklist: ["Wireframes", "Visual direction", "Responsive states", "Interaction rules"],
  },
  {
    title: "Develop",
    summary: "We build the experience with clean components, responsive layouts, and production-ready foundations.",
    artifact: "build.module",
    checklist: ["Components", "Pages", "Data contracts", "Quality checks"],
  },
  {
    title: "Deploy",
    summary: "We ship, test, optimize, and prepare the product for real users on real devices.",
    artifact: "release.package",
    checklist: ["Production build", "SEO checks", "Device QA", "Deployment"],
  },
  {
    title: "Support",
    summary: "We keep improving the system after launch so it keeps matching the business as it grows.",
    artifact: "growth.loop",
    checklist: ["Maintenance", "New features", "Performance tuning", "Iteration"],
  },
];

export const contactMethods = [
  {
    label: "Email",
    value: "hello@codekraft.co.in",
    href: "mailto:hello@codekraft.co.in",
  },
  {
    label: "Phone",
    value: "+91 80730 49854",
    href: "tel:+918073049854",
  },
  {
    label: "Location",
    value: "Gulbarga, Karnataka, India",
    href: "https://www.google.com/maps/search/?api=1&query=Gulbarga%2C%20Karnataka%2C%20India",
  },
];

export const siteKnowledge = [
  "CodeKraft is a software development studio based in Gulbarga, Karnataka, India.",
  "CodeKraft builds websites, web applications, e-commerce systems, ERP and business systems, UI/UX design, and maintenance plans.",
  "CodeKraft's public contact email is hello@codekraft.co.in and phone number is +91 80730 49854.",
  "CodeKraft uses a design direction inspired by premium product systems: Apple, Linear, Stripe, Vercel, Figma, and VS Code.",
  "The CodeKraft process is Discover, Design, Develop, Deploy, and Support.",
  "CodeKraft client projects include GM Aerotech, Vril Innovation, NDRF, MA Quality Products, Ayasya Yoga, Hotel Ashokavana, Qaser Al Talah, Vibrant Ritchie, and Ceyone Society.",
  "The website is built as module-style navigation: home, about, services, work, process, and contact.",
];
