import { clientProjects } from "@/lib/client-projects";
import { processSteps, services, siteKnowledge } from "@/lib/site-modules";
import { siteConfig } from "@/lib/site-config";

export type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

function pickAnswer(question: string, answers: string[]) {
  const score = question.split("").reduce((total, character) => total + character.charCodeAt(0), 0);
  return answers[score % answers.length];
}

export function buildSiteContext() {
  return [
    "CodeKraft website knowledge base:",
    "",
    "Studio:",
    siteKnowledge.map((item) => `- ${item}`).join("\n"),
    "",
    "Services:",
    services
      .map(
        (service) =>
          `- ${service.title}: ${service.summary} Detail: ${service.detail} Output: ${service.output}. Stack: ${service.stack.join(", ")}.`,
      )
      .join("\n"),
    "",
    "Process:",
    processSteps
      .map(
        (step, index) =>
          `${index + 1}. ${step.title}: ${step.summary} Artifact: ${step.artifact}. Checklist: ${step.checklist.join(", ")}.`,
      )
      .join("\n"),
    "",
    "Client work:",
    clientProjects
      .map(
        (project) =>
          `- ${project.name}: ${project.category}, ${project.summary} Services: ${project.services.join(", ")}. URL: ${project.url}`,
      )
      .join("\n"),
    "",
    "Delivery cell:",
    "- Strategy: scope, goals, workflows, and launch priorities.",
    "- Design: interface systems, responsive layouts, content rhythm, and interaction polish.",
    "- Engineering: frontend, backend, data contracts, integrations, deployment, and QA.",
    "- Growth: maintenance, iteration, performance checks, analytics, and improvements after launch.",
    "",
    "Contact:",
    `- Email: ${siteConfig.contactEmail}`,
    "- Phone: +91 80730 49854",
    `- Location: ${siteConfig.location}`,
  ].join("\n");
}

export function answerFromSite(question: string) {
  const input = question.toLowerCase();
  const serviceMatch = services.find((service) => input.includes(service.title.toLowerCase().split(" ")[0]));
  const projectMatch = clientProjects.find((project) => input.includes(project.name.toLowerCase()));
  const greetingMatch = /^(hi|hello|hey|yo|namaste|salam|good morning|good afternoon|good evening)\b/.test(input);
  const thanksMatch = /\b(thanks|thank you|nice|great|cool|awesome)\b/.test(input);
  const processMatch = input.includes("process") || input.includes("step") || input.includes("flow") || input.includes("how you work") || input.includes("how do you work");
  const broadHowMatch = input.includes("how") && (input.includes("project") || input.includes("build") || input.includes("deliver") || input.includes("start"));

  if (greetingMatch) {
    return pickAnswer(input, [
      "Hey, welcome to CodeKraft. Tell me what you want to build and I will point you to the right service or next step.",
      "Hello. I can help with CodeKraft services, client work, process, AI, cloud, mobile apps, and contact details. Tiny console, useful answers.",
      "Hi. You bring the idea, I will bring the map. Ask me about websites, apps, ERP, AI, or how a project moves from brief to launch.",
    ]);
  }

  if (thanksMatch) {
    return pickAnswer(input, [
      "Anytime. What should we decode next?",
      "Happy to help. My official job title is probably Small Helpful Box.",
      "You got it. Ask me about services, process, clients, or contact whenever you are ready.",
    ]);
  }

  if (projectMatch) {
    return `${projectMatch.name} is one of our ${projectMatch.category} client modules. Focus areas: ${projectMatch.services.join(", ")}. ${projectMatch.summary}`;
  }

  if (input.includes("ai") || input.includes("chatbot") || input.includes("automation") || input.includes("agent")) {
    return pickAnswer(input, [
      "For AI, we focus on useful layers: website assistants, enquiry sorting, smart search, content helpers, workflow automation, and internal copilots.",
      "AI works best when it is connected to real content and rules. For CodeKraft projects, that can mean chat support, lead qualification, automation, or dashboard assistance.",
      "We can add AI where it saves time: answering common questions, guiding users, helping teams search data, or turning messy enquiries into structured briefs.",
    ]);
  }

  if (input.includes("database") || input.includes("db") || input.includes("data") || input.includes("backend") || input.includes("api")) {
    return pickAnswer(input, [
      "For backend work, we first map data: users, roles, tables, permissions, files, reports, and API contracts. Then the interface has something solid to talk to.",
      "If a project needs a database, we design the data model early. That keeps dashboards, forms, reports, and mobile screens from becoming chaos with buttons.",
      "A clean system usually has three layers: interface, API, and database. CodeKraft plans those together so the product can grow without rewiring everything later.",
    ]);
  }

  if (input.includes("cloud") || input.includes("deploy") || input.includes("hosting") || input.includes("server")) {
    return pickAnswer(input, [
      "Cloud delivery covers deployment, domains, environment variables, backups, monitoring, and performance checks.",
      "We treat deployment as part of the product, not an afterthought. The goal is simple: launch smoothly, stay fast, and know what to fix if something breaks.",
      "For cloud setup, CodeKraft can handle hosting, production builds, domains, env setup, analytics, and basic monitoring.",
    ]);
  }

  if (input.includes("mobile") || input.includes("android") || input.includes("ios")) {
    return pickAnswer(input, [
      "For mobile, we start with flows: login, roles, forms, data screens, notifications, and API behavior. Then we decide responsive web app or native-ready architecture.",
      "Mobile is not just shrinking the website. We plan touch behavior, navigation, loading states, offline needs, and the backend behind it.",
      "If the mobile app needs accounts, data, reports, or notifications, we design the API and database along with the screens.",
    ]);
  }

  if (input.includes("price") || input.includes("cost") || input.includes("budget") || input.includes("charge")) {
    return "Pricing depends on scope: website, web app, e-commerce, ERP, AI layer, cloud setup, and support needs. Best next step: send a brief through the contact module and we can map a sensible phase-one build.";
  }

  if (input.includes("timeline") || input.includes("time") || input.includes("how long")) {
    return pickAnswer(input, [
      "Timeline depends on scope. A focused website can move quickly; ERP, mobile, database, and AI work need more discovery and QA.",
      "We usually break work into phases: first useful version, then improvements. That keeps the launch realistic instead of turning into a never-ending wishlist.",
      "The fastest way to estimate timeline is to send a brief: service needed, pages or features, content status, integrations, and deadline.",
    ]);
  }

  if (processMatch || broadHowMatch) {
    return pickAnswer(input, [
      "We usually start with a discovery call or brief, then map scope, users, content, data, and success signals. After that: design the screens, build the frontend/backend, test on real devices, deploy, and support.",
      `The CodeKraft flow is ${processSteps.map((step) => step.title).join(" -> ")}. In plain English: understand the problem, design the system, build it properly, launch it cleanly, then keep improving it.`,
      "Our process is practical: first we decide what the product must do, then how it should feel, then how the data/backend/cloud pieces connect. Only after that do we polish the interface and ship.",
      "Think of it as a product pipeline: brief -> scope -> UI/UX -> components -> API/database -> QA -> deployment -> support. Less theatre, more working software.",
    ]);
  }

  if (
    serviceMatch ||
    input.includes("service") ||
    input.includes("build") ||
    input.includes("what do you do") ||
    input.includes("what you do") ||
    input.includes("provide") ||
    input.includes("offer") ||
    input.includes("website") ||
    input.includes("app") ||
    input.includes("erp") ||
    input.includes("ecommerce") ||
    input.includes("e-commerce")
  ) {
    const service = serviceMatch ?? services[0];
    return pickAnswer(input, [
      `CodeKraft builds ${services.map((item) => item.title).join(", ")}. For ${service.title}: ${service.detail}`,
      `If you are looking at ${service.title}, the usual output is ${service.output}. ${service.summary}`,
      `Short version: we design and build digital products that are useful, responsive, and maintainable. ${service.title} is one lane: ${service.detail}`,
    ]);
  }

  if (input.includes("contact") || input.includes("phone") || input.includes("email") || input.includes("call")) {
    return `You can contact CodeKraft at ${siteConfig.contactEmail} or call ${siteConfig.phoneDisplay}. For CampusKraft, use the dedicated institutional interest form on the product page.`;
  }

  if (input.includes("client") || input.includes("portfolio") || input.includes("work")) {
    return `CodeKraft client modules include ${clientProjects.map((project) => project.name).join(", ")}. Open the work module for project links and details.`;
  }

  if (input.includes("about") || input.includes("codekraft")) {
    return `${siteKnowledge[0]} ${siteKnowledge[3]}`;
  }

  return "I do not want to invent fake facts, my tiny circuits have standards. Ask me about CodeKraft services, process, database/backend, mobile apps, cloud, AI, client work, pricing direction, or contact details.";
}
