"use client";

import Link from "next/link";
import {
  Activity, ArrowRight, BarChart3, BookOpen, Bot, Building2, Check, CheckCircle2,
  ChevronRight, CircleDollarSign, Cloud, GraduationCap, HeartHandshake,
  Landmark, Layers3, LockKeyhole, Mail, MessageSquareText, Network, Radio, School,
  ShieldCheck, Sparkles, UserRoundCog, UsersRound, WalletCards,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CampusKraftInterestForm } from "@/components/campuskraft/CampusKraftInterestForm";

const audiences = [
  [School, "Schools", "Planned tools for admissions, attendance, fees, examinations, parent communication and daily administration."],
  [Landmark, "Colleges", "Planned academic, departmental, student lifecycle and finance workflows for higher education."],
  [GraduationCap, "Universities", "A configurable foundation intended for faculties, programmes, departments and complex academic structures."],
  [BookOpen, "Coaching Institutes", "Planned batch, enrolment, attendance, fee and communication workflows for learning centres."],
  [UsersRound, "Training Centres", "Flexible programme and learner operations designed for professional and vocational training."],
  [Building2, "Madrasas", "Flexible academic structures intended to support modern and traditional educational workflows."],
  [Network, "Multi-Campus Institutions", "A planned central view with institution-level controls and isolated campus operations."],
] as const;

const moduleGroups = [
  ["Admissions & Student Lifecycle", "MVP", ["Enquiry Management", "Online Applications", "Admission Workflow", "Document Collection", "Student Information System", "Student Profiles", "Certificates", "Student Promotion", "Alumni Records"]],
  ["Academic Management", "Under Design", ["Classes and Sections", "Subjects", "Academic Years", "Timetable", "Lesson Planning", "Homework", "Assignments", "Examinations", "Grading", "Report Cards", "Results", "Academic Calendar"]],
  ["Attendance", "MVP", ["Student Attendance", "Staff Attendance", "Period Attendance", "Leave Requests", "Attendance Alerts", "Biometric Integration", "RFID Integration"]],
  ["Finance", "MVP", ["Fee Structures", "Fee Collection", "Online Payments", "Discounts", "Scholarships", "Fines", "Receipts", "Refunds", "Outstanding Reports", "Accounting Integration"]],
  ["Communication", "MVP", ["Announcements", "Notices", "Email", "SMS", "WhatsApp Integration", "Parent Communication", "Emergency Alerts", "Event Notifications"]],
  ["People & HR", "Future Phase", ["Employee Records", "Recruitment", "Leave Management", "Payroll", "Staff Attendance", "Appraisals", "Department Management"]],
  ["Campus Operations", "Future Phase", ["Library", "Transport", "GPS Tracking", "Hostel", "Inventory", "Assets", "Visitor Management", "Gate Passes", "Maintenance Requests"]],
  ["Role Portals", "Planned", ["Admin Portal", "Principal Portal", "Teacher Portal", "Student Portal", "Parent Portal", "Staff Portal"]],
  ["Analytics & Reports", "Planned", ["Admission Reports", "Fee Reports", "Attendance Analytics", "Academic Performance", "Operational Dashboards", "Custom Reports", "Export Tools"]],
] as const;

const mvpItems = ["Institution Setup", "User and Role Management", "Student Information System", "Admissions", "Classes and Sections", "Student Attendance", "Fee Structures", "Fee Collection", "Notices and Announcements", "Teacher Portal", "Parent Portal", "Basic Reports", "Audit Logs"];

const aiCapabilities = ["Student Performance Insights", "Attendance Pattern Detection", "Fee Collection Forecasting", "Automated Report Summaries", "Parent Communication Assistance", "Timetable Suggestions", "Admission Enquiry Assistance", "Administrative AI Assistant", "Natural Language Reporting", "Risk and Dropout Indicators", "Document Data Extraction", "Knowledge Assistant for Staff"];

const roles = [
  ["Super Admin", "Planned controls for platform configuration, tenant administration and operational oversight."],
  ["Institution Admin", "Planned tools for users, academic setup, workflows, permissions and institution-wide configuration."],
  ["Principal", "Planned access to institution-wide academic, attendance, finance and operational summaries."],
  ["Teacher", "Planned tools for attendance, assignments, classroom updates, marks and parent communication."],
  ["Accountant", "Planned fee setup, collection, receipts, outstanding reports and reconciliation workflows."],
  ["HR Staff", "Planned employee records, attendance, leave, payroll and department administration."],
  ["Librarian", "Planned catalogue, issue, return, fine and circulation management workflows."],
  ["Transport Manager", "Planned route, vehicle, rider and transport operations visibility."],
  ["Student", "Planned access to learning updates, attendance, assignments, results, notices and schedules."],
  ["Parent", "Planned visibility into attendance, fees, results, notices and institutional communication."],
] as const;

const integrations = ["Payment Gateways", "SMS Providers", "Email Providers", "WhatsApp Business", "Biometric Devices", "RFID Systems", "GPS Providers", "Accounting Software", "Video Conferencing", "Identity Providers", "Government Education Portals", "APIs and Webhooks"];

const roadmap = [
  ["01", "Foundation and MVP", "In Development", ["Institution setup", "Authentication", "Roles and permissions", "Student records", "Admissions", "Attendance", "Fees", "Notices", "Basic reports"]],
  ["02", "Academic and Operational Expansion", "Planned", ["Examinations", "Results", "Timetable", "Homework", "HR", "Payroll", "Library", "Transport", "Inventory"]],
  ["03", "Mobile and Integrations", "Future Phase", ["Parent mobile experience", "Student mobile experience", "Teacher mobile experience", "Payment integrations", "SMS", "WhatsApp", "Biometric", "GPS"]],
  ["04", "Intelligence and Automation", "Future Roadmap", ["AI assistant", "Predictive analytics", "Automated reporting", "Workflow automation", "Natural language insights"]],
] as const;

const dashboardData = {
  Overview: { icon: Activity, metrics: [["Students", "2,480"], ["Present today", "91.4%"], ["Pending fees", "₹8.2L"], ["Active staff", "184"]], label: "Campus activity", bars: [74, 91, 67, 84, 78, 94, 88] },
  Admissions: { icon: UserRoundCog, metrics: [["Enquiries", "386"], ["Applied", "214"], ["In review", "82"], ["Admitted", "119"]], label: "Application pipeline", bars: [32, 48, 61, 76, 82, 88, 94] },
  Attendance: { icon: CheckCircle2, metrics: [["Overall", "91.4%"], ["On leave", "48"], ["Alerts", "17"], ["Classes", "64"]], label: "Weekly attendance", bars: [84, 91, 87, 93, 89, 78, 92] },
  Fees: { icon: WalletCards, metrics: [["Collected", "₹32.4L"], ["Pending", "₹8.2L"], ["Today", "₹1.1L"], ["Receipts", "126"]], label: "Collection progress", bars: [44, 52, 61, 68, 76, 83, 91] },
  Academics: { icon: BookOpen, metrics: [["Class average", "78%"], ["Assessments", "26"], ["Assignments", "142"], ["Published", "18"]], label: "Subject performance", bars: [72, 84, 68, 91, 78, 86, 81] },
  Communication: { icon: MessageSquareText, metrics: [["Notices", "14"], ["Delivered", "96%"], ["Scheduled", "8"], ["Replies", "42"]], label: "Message delivery", bars: [58, 72, 79, 83, 91, 94, 96] },
  Analytics: { icon: BarChart3, metrics: [["Reports", "32"], ["Dashboards", "9"], ["Exports", "18"], ["Signals", "24"]], label: "Operational trends", bars: [48, 62, 56, 73, 81, 76, 92] },
} as const;

const faq = [
  ["What is CampusKraft?", "CampusKraft is an upcoming cloud-based education ERP and campus operating platform being developed by CodeKraft."],
  ["Is CampusKraft currently available?", "No. CampusKraft is currently entering early-stage MVP development. Early access enquiries and institutional feedback are open, but access is not guaranteed."],
  ["Who is CampusKraft being built for?", "It is being designed for schools, colleges, universities, coaching institutes, training centres, madrasas and multi-campus educational organisations."],
  ["Which modules will be included first?", "The proposed MVP focuses on institution setup, roles, student records, admissions, attendance, fees, notices, core portals, reports and audit logs. The scope may evolve."],
  ["Will CampusKraft support mobile apps?", "Mobile experiences are part of a future phase. They are not currently available and their form may evolve during product discovery."],
  ["Will it support multiple campuses?", "Multi-campus management and institution-level data isolation are target capabilities in the product architecture."],
  ["Will it include AI features?", "AI capabilities are planned for later phases after dependable core workflows and data foundations are established. They are not currently available."],
  ["Can our institution participate in early product discussions?", "Yes. Institutions can register interest and share operational challenges. Selected organisations may be invited to discovery or future pilot discussions."],
  ["Is registering interest a purchase commitment?", "No. Registering interest does not create a purchase commitment and does not guarantee early or pilot access."],
  ["When will CampusKraft launch?", "A fixed launch date has not been finalised. Rollout is planned in phases and timing will depend on development, validation and institutional feedback."],
] as const;

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <header className="ck-campus-heading"><p>{eyebrow}</p><h2>{title}</h2>{copy ? <span>{copy}</span> : null}</header>;
}

function DashboardPreview({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<keyof typeof dashboardData>("Overview");
  const data = dashboardData[active];
  const Icon = data.icon;
  return (
    <div className={`ck-campus-dashboard ${compact ? "is-compact" : ""}`}>
      <div className="ck-campus-windowbar"><span><i /><i /><i /></span><strong>Concept Preview</strong><small>campuskraft / {active.toLowerCase()}</small></div>
      {!compact ? <div className="ck-campus-tabs" role="tablist" aria-label="CampusKraft concept areas">{Object.keys(dashboardData).map((tab) => <button key={tab} type="button" role="tab" aria-selected={active === tab} onClick={() => setActive(tab as keyof typeof dashboardData)}>{tab}</button>)}</div> : null}
      <div className="ck-campus-dashboard-body">
        <aside aria-hidden="true"><span className="is-active"><Layers3 size={16} /></span>{[UsersRound, BookOpen, CircleDollarSign, Mail, BarChart3].map((SideIcon, index) => <span key={index}><SideIcon size={16} /></span>)}</aside>
        <div className="ck-campus-dashboard-main">
          <div className="ck-campus-dash-title"><span><Icon size={18} />{active}</span><em>early product concept</em></div>
          <div className="ck-campus-metrics">{data.metrics.map(([label, value]) => <article key={label}><small>{label}</small><strong>{value}</strong><i>planned metric</i></article>)}</div>
          <div className="ck-campus-chart-row"><article className="ck-campus-chart"><span>{data.label}</span><div>{data.bars.map((height, index) => <i key={index} style={{ "--bar": `${height}%` } as React.CSSProperties} />)}</div><small>Mon Tue Wed Thu Fri Sat Sun</small></article><article className="ck-campus-feed"><span>Activity feed</span>{["Attendance synced", "Fee receipt prepared", "Notice scheduled"].map((item) => <p key={item}><i />{item}<small>concept</small></p>)}</article></div>
        </div>
      </div>
      <p className="ck-campus-concept-note">Concept interface shown for product vision. Final features and design may evolve.</p>
    </div>
  );
}

export function CampusKraftExperience() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".ck-campus-section, .ck-campus-final");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sections.forEach((section) => section.classList.add("ck-reveal"));
    if (reduceMotion) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="ck-campus-status"><span><i />In Development</span><p>CampusKraft is currently in active development. Early access enquiries are open.</p><Link href="#early-access">Register interest <ArrowRight size={14} /></Link></div>

      <section className="ck-campus-hero" aria-labelledby="campuskraft-title">
        <div className="ck-campus-hero-copy"><p>&lt; an upcoming product by CodeKraft /&gt;</p><div className="ck-campus-product-badge"><Sparkles size={15} /><strong>CampusKraft</strong><span>In Development</span></div><h1 id="campuskraft-title">The Future Operating Platform for <em>Education.</em></h1><h2>One connected platform being built for admissions, academics, administration, finance, communication and intelligent campus operations.</h2><p className="ck-campus-lead">CampusKraft is an upcoming cloud-based ERP platform being developed by CodeKraft for schools, colleges, universities and educational organisations. It is planned to simplify institutional workflows through one secure, scalable and modern system.</p><div className="ck-campus-actions"><Link className="ck-campus-primary" href="#early-access">Register for Early Access <ArrowRight size={18} /></Link><Link className="ck-campus-secondary" href="/contact">Discuss Your Institution&apos;s Needs</Link></div><Link href="#roadmap" className="ck-campus-text-link">Explore the product roadmap <ChevronRight size={15} /></Link></div>
        <div className="ck-campus-hero-visual"><div className="ck-campus-orbit-label"><Radio size={14} /> Early Product Concept</div><DashboardPreview compact /></div>
      </section>

      <section className="ck-campus-section ck-campus-vision">
        <SectionHeading eyebrow="product.vision" title="One Platform. Every Campus Workflow." copy="Educational operations often span disconnected tools, spreadsheets, paper records and manual communication. CampusKraft is being designed to bring those workflows into one coherent operating layer." />
        <div className="ck-campus-compare"><article><span>Current challenges</span>{["Disconnected systems", "Manual paperwork", "Repetitive data entry", "Limited visibility", "Delayed communication", "Complex fee tracking", "Difficult reporting", "Poor departmental coordination"].map((item) => <p key={item}><i>×</i>{item}</p>)}</article><article className="is-vision"><span>CampusKraft vision</span>{["Unified institutional data", "Automated workflows", "Real-time dashboards", "Role-based portals", "Centralised communication", "Secure cloud access", "Configurable academic structures", "Scalable multi-campus management"].map((item) => <p key={item}><Check size={15} />{item}</p>)}</article></div>
      </section>

      <section className="ck-campus-section"><SectionHeading eyebrow="institution.fit" title="Built Around Different Kinds of Learning." copy="A flexible product direction for institutions with different academic structures, teams and operating realities." /><div className="ck-campus-audience-grid">{audiences.map(([Icon, title, text]) => <article key={title}><Icon size={23} /><span>planned fit</span><h3>{title}</h3><p>{text}</p><i aria-hidden="true">{title.slice(0, 2).toUpperCase()}</i></article>)}</div></section>

      <section className="ck-campus-section" id="modules"><SectionHeading eyebrow="product.modules" title="Planned Modules" copy="CampusKraft is being designed as a modular platform that institutions can adopt according to their operational needs. Status labels show the current roadmap intent—not completed functionality." /><div className="ck-campus-bento">{moduleGroups.map(([title, status, items]) => <article key={title}><header><h3>{title}</h3><span>{status}</span></header><div>{items.map((item) => <small key={item}>{item}</small>)}</div></article>)}</div></section>

      <section className="ck-campus-section ck-campus-mvp"><div><SectionHeading eyebrow="release.01" title="Initial MVP Focus" copy="The first planned version concentrates on the dependable workflows institutions use every day." /><p className="ck-campus-disclaimer">The initial MVP scope may evolve based on institutional feedback and technical validation.</p></div><div className="ck-campus-checklist">{mvpItems.map((item, index) => <p key={item}><span>{String(index + 1).padStart(2, "0")}</span><CheckCircle2 size={17} />{item}</p>)}</div></section>

      <section className="ck-campus-section ck-campus-ai"><SectionHeading eyebrow="future.intelligence" title="Intelligence Built Into the Roadmap" copy="AI capabilities are planned for gradual introduction after strong core workflows and reliable data foundations are established." /><div className="ck-campus-ai-grid">{aiCapabilities.map((item) => <article key={item}><Bot size={19} /><span>Planned AI Capability</span><h3>{item}</h3></article>)}</div><p className="ck-campus-disclaimer"><Sparkles size={15} /> AI features are part of the product roadmap and are not currently available.</p></section>

      <section className="ck-campus-section"><SectionHeading eyebrow="interface.system" title="Explore the Product Concept" copy="Switch between planned workflow views. Every panel below is generated for product vision and is not a production screenshot." /><DashboardPreview /></section>

      <section className="ck-campus-section"><SectionHeading eyebrow="access.roles" title="Designed Around Every Role" copy="Role-based experiences are planned so each person sees the workflows and decisions relevant to their responsibility." /><div className="ck-campus-role-grid">{roles.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="ck-campus-section ck-campus-architecture"><SectionHeading eyebrow="planned technical architecture" title="Designed for a Scalable Foundation" copy="The initial system is planned as a modular monolith with clear service boundaries and a future path toward distributed services where scale or operational needs justify it." /><div className="ck-campus-arch-flow" aria-label="Planned CampusKraft technical architecture">{["Web & mobile clients", "API layer", "Authentication & permissions", "Domain modules", "PostgreSQL", "Redis & queues", "Storage & notifications", "Monitoring & audit logs"].map((item, index) => <div key={item}><span>{index + 1}</span><strong>{item}</strong>{index < 7 ? <ChevronRight size={16} /> : null}</div>)}</div><div className="ck-campus-stack-grid"><article><span>Frontend</span><p>React · Next.js · TypeScript</p></article><article><span>Backend</span><p>Node.js · API layer · Service layer · Validation · Background jobs</p></article><article><span>Data</span><p>PostgreSQL · Prisma ORM · Redis · Queue processing</p></article><article><span>Infrastructure</span><p>AWS · Docker · Object storage · CDN · Monitoring · Automated deployments</p></article></div><div className="ck-campus-principles">{["Multi-tenant design", "Role-based access control", "Modular architecture", "API-first design", "Audit logging", "Configurable workflows", "Institution-level data isolation", "Scalable background processing", "Cloud-native deployment", "Mobile-ready APIs"].map((item) => <span key={item}>{item}</span>)}</div></section>

      <section className="ck-campus-section ck-campus-security"><div><SectionHeading eyebrow="security.foundation" title="Security Planned From the Foundation" copy="CampusKraft is being designed with layered access, data protection and operational accountability in mind." /><p>The architecture is intended to support privacy and compliance requirements as the product matures. No compliance certification is being claimed at this stage.</p></div><div>{["Role-based access control", "Institution data isolation", "Encryption in transit", "Encryption at rest", "Audit logs", "Secure authentication", "Session management", "Backup strategy", "Permission controls", "Activity monitoring", "Data export and retention controls", "Vulnerability management", "Least-privilege access", "Secure development practices"].map((item) => <span key={item}><ShieldCheck size={16} />{item}</span>)}</div></section>

      <section className="ck-campus-section"><SectionHeading eyebrow="integration.map" title="Planned Integrations" copy="External connections will be evaluated and introduced in phases. No provider relationship or active integration is implied." /><div className="ck-campus-integrations">{integrations.map((item) => <article key={item}><Cloud size={18} /><h3>{item}</h3><span>Planned Integration</span></article>)}</div></section>

      <section className="ck-campus-section" id="roadmap"><SectionHeading eyebrow="product.sequence" title="A Phased Product Roadmap" copy="Core records and workflows come first. Broader operations, mobile experiences and intelligence follow only after validation." /><div className="ck-campus-roadmap">{roadmap.map(([id, title, status, items]) => <article key={id}><header><span>{id}</span><em>{status}</em></header><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><p className="ck-campus-disclaimer">Roadmap items and sequence may change based on product development, user research and institutional requirements.</p></section>

      <section className="ck-campus-section ck-campus-early" id="early-access"><div className="ck-campus-early-copy"><SectionHeading eyebrow="early.access" title="Help Shape CampusKraft" copy="We are inviting schools, colleges and educational organisations to share their operational challenges and register interest in the early development programme." /><div>{["Share institutional requirements", "Influence feature priorities", "Participate in product discovery", "Get early product updates", "Be considered for pilot access", "Receive onboarding discussions when available"].map((item) => <p key={item}><Check size={16} />{item}</p>)}</div><Link href="/contact" className="ck-campus-secondary">Talk to CodeKraft <ArrowRight size={16} /></Link><small>Registration does not guarantee pilot access or create a purchase commitment.</small></div><CampusKraftInterestForm /></section>

      <section className="ck-campus-section ck-campus-faq"><SectionHeading eyebrow="product.questions" title="Frequently Asked Questions" copy="Straight answers about the current product stage, intended scope and participation." /><div>{faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="ck-campus-final"><div><HeartHandshake size={30} /><p>&lt; build.with.us /&gt;</p><h2>Help Build the Future of Campus Management.</h2><span>Share your institution&apos;s challenges and register your interest in CampusKraft&apos;s upcoming development journey.</span></div><div className="ck-campus-actions"><Link className="ck-campus-primary" href="#early-access">Register Early Interest <ArrowRight size={18} /></Link><Link className="ck-campus-secondary" href="/contact">Contact CodeKraft</Link></div><small>CampusKraft is currently under development. Product features, roadmap and availability may change.</small></section>

      <p className="ck-campus-footer-disclosure"><LockKeyhole size={14} /> CampusKraft is an upcoming product by CodeKraft. The interfaces and features shown are conceptual and may change. <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></p>
    </>
  );
}
