# CodeKraft

CodeKraft is a premium software company website built as a module-style digital operating system rather than a standard brochure site.

The design direction blends the sharpness of Apple, Linear, Stripe, Vercel, Figma, and VS Code with a CodeKraft identity: dark interface, cyan/violet glow, animated code elements, structured cards, a 3D hero experience, and a JSON-style contact flow.

## Website Modules

- Home: animated hero, CodeKraft tesseract visual, client rail, and featured work preview.
- About: studio philosophy, operating principles, client proof, and team section.
- Services: web development, web applications, e-commerce, ERP/business systems, UI/UX, and maintenance.
- Work: real client portfolio modules with live project links.
- Process: delivery architecture covering discovery, design, frontend, backend, database, cloud, AI, QA, deployment, and support.
- Contact: JSON-style enquiry form connected to Resend.
- Privacy: policy and rights information.

## Tech Stack

- Framework: Next.js 16 App Router
- Language: TypeScript
- UI: React 19
- Styling: Tailwind CSS v4 through global CSS design system
- Animation: CSS animations, Framer Motion, GSAP-ready structure
- 3D: Three.js, React Three Fiber, Drei
- Icons: Lucide React
- Email: Resend API
- Deployment target: Vercel

## Contact Form

The contact form renders a live JSON preview for the visitor and submits to:

```txt
POST /api/contact
```

The API route sends a branded HTML email template through Resend.

Public email:

```txt
hello@codekraft.co.in
```

Required local environment variables:

```txt
RESEND_API_KEY=
RESEND_FROM_EMAIL=CodeKraft <hello@codekraft.co.in>
RESEND_DELIVERY_EMAIL=hello@codekraft.co.in
```

Important: `hello@codekraft.co.in` must be verified in Resend before production sending from that address.

## Team

- Yaseen Feroz: Full Stack
- Md Asadullah: Marketing
- Nagraj Awanti: Full Stack
- Md Aejaz: Technical Writer
- Sharjeel Zeeshan: UI/UX

## Client Work

Current client modules include:

- GM Aerotech
- Vril Innovation
- NDRF
- MA Quality Products
- Ayasya Yoga
- Hotel Ashokavana
- Qaser Al Talah
- Vibrant Ritchie
- Ceyone Society

## Social Links

- GitHub: https://github.com/yaseenferoz
- LinkedIn: https://www.linkedin.com/in/yaseen-feroz/

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Project Notes

- `.env.local` is ignored by git and should never be committed.
- The contact API owns the final delivery email; the browser does not expose private delivery configuration.
- The hero has a WebGL fallback so the homepage still renders if the browser blocks WebGL.
- The chatbot is local and answers from website content only.

