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
It also stores the lead in Supabase when Supabase environment variables are configured.

Public email:

```txt
hello@codekraft.co.in
```

Required local environment variables:

```txt
RESEND_API_KEY=
RESEND_FROM_EMAIL=CodeKraft <hello@codekraft.co.in>
RESEND_DELIVERY_EMAIL=hello@codekraft.co.in
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=8740133934
```

Important: `hello@codekraft.co.in` must be verified in Resend before production sending from that address.

Supabase table:

```sql
create table leads (
  id bigint generated always as identity primary key,
  name text,
  email text,
  phone text,
  service text,
  message text,
  source text default 'chatbot',
  created_at timestamp with time zone default now()
);
```

## CodeKraft AI Sales Assistant

The chatbot uses:

```txt
POST /api/chat
```

If `GEMINI_API_KEY` is present, the route calls Gemini with CodeKraft website context only. OpenAI remains optional as a secondary provider. If no AI key is configured, it falls back to the local rule-based answer engine.

The assistant is designed as a sales assistant, not only a FAQ bot. It can:

- Answer questions about CodeKraft services, process, client work, team, AI, cloud, mobile, and contact details.
- Recommend a suitable solution lane based on visitor requirements.
- Ask for missing lead details such as name, phone, email, budget, timeline, and project requirements.
- Save chatbot leads in Supabase with the full conversation transcript.
- Email the complete chatbot conversation to the CodeKraft inbox through Resend.
- Send instant Telegram lead alerts when Telegram bot credentials are configured.

Recommended AI environment variables:

```txt
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
```

Optional OpenAI fallback:

```txt
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

When a chatbot conversation includes project intent, `/api/chat` stores it as a Supabase lead with:

```txt
source=chatbot
```

Budget and requirements are stored inside the lead `message` field with the conversation transcript, because the current Supabase `leads` table intentionally stays compact.

Telegram lead alerts use:

```txt
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=8740133934
```

The bot username is `@codekraft_leads_bot`, but Telegram API calls require the bot token from BotFather.

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
- The chatbot can use Gemini/OpenAI through `/api/chat`, with a local website-content fallback.
- Chatbot enquiries with email or phone are stored in Supabase `leads`.
