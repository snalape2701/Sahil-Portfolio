/**
 * Design reminder: Infrastructure at Dusk — evidence-led systems storytelling,
 * offset deployment flight paths, and precise Ion Blue/amber engineering signals.
 */
import {
  ArrowUpRight,
  Award,
  Box,
  CircleAlert,
  Check,
  ChevronDown,
  CircleDot,
  Cloud,
  Code2,
  Container,
  Database,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Menu,
  Network,
  Send,
  ServerCog,
  ShieldCheck,
  Terminal,
  Workflow,
  X,
} from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "profile", label: "Profile" },
  { id: "work", label: "Selected Work" },
  { id: "toolkit", label: "Toolkit" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;

const sourceCollectionUrl = "https://github.com/snalape2701";
const contactDeliveryEmail = "sahiltalape2701@gmail.com";
const opportunityEmailHref = "https://mail.google.com/mail/?view=cm&fs=1&to=sahiltalape2701%40gmail.com&su=Cloud%20%26%20DevOps%20opportunity&body=Hello%20Sahil%2C%0A%0A";

const skillGroups = {
  "Cloud & DevOps": ["AWS EC2", "AWS S3", "IAM", "Docker", "Jenkins", "GitHub Actions", "CI/CD"],
  Engineering: ["Python", "JavaScript", "SQL", "Spring Boot", "Flask", "Linux / Bash"],
  Data: ["MySQL", "MongoDB", "Git", "GitHub", "HTML5", "CSS3"],
} as const;

const projectData = [
  {
    id: "static-cloud",
    index: "01",
    eyebrow: "Cloud delivery",
    title: "Cloud-Based Static Website Deployment",
    range: "Feb — Apr 2026",
    image: "/manus-storage/sahil-aws-architecture_692d9c68.png",
    imageAlt: "Abstract cloud asset delivery architecture",
    status: "DEPLOYED",
    summary:
      "A production-style static site delivery path, designed around secure hosting, CDN delivery, domain configuration, and observability.",
    stack: ["Amazon S3", "Route 53", "Git / GitHub", "HTML · CSS · JS"],
    route: ["Responsive UI", "Object storage", "Custom domain + HTTPS", "Monitoring"],
    caseStudy: {
      objective: "Publish a responsive static site through a secure, domain-ready cloud delivery path.",
      delivery: "Static assets → object storage → custom-domain configuration → monitoring.",
      evidence: "Architecture scope, delivery documentation, and availability checks.",
    },
    points: [
      "Configured scalable static hosting and content delivery workflows.",
      "Applied structured source control and deployment documentation.",
      "Tracked availability and performance to support reliable delivery.",
    ],
  },
  {
    id: "pipeline",
    index: "02",
    eyebrow: "Automation systems",
    title: "CI/CD Pipeline Automation System",
    range: "May 2026 — Present",
    image: "/manus-storage/sahil-cicd-orbit_e50f24ca.png",
    imageAlt: "Abstract continuous deployment automation orbit",
    status: "IN BUILD",
    summary:
      "An automated build-to-deploy workflow that brings together validation, containerization, image distribution, and deployment monitoring.",
    stack: ["GitHub Actions", "Docker", "Docker Hub", "Linux / Bash"],
    route: ["Commit / PR", "Build + test", "Container image", "Deploy + observe"],
    caseStudy: {
      objective: "Reduce the manual steps between a code change and a deployable container.",
      delivery: "Commit / pull request → validation → image build → deployment monitoring.",
      evidence: "Pipeline documentation, build logs, and a troubleshooting workflow.",
    },
    points: [
      "Automated tests and validation on pushes and pull requests.",
      "Created reproducible Docker-based application environments.",
      "Documented pipeline architecture, logs, and troubleshooting workflow.",
    ],
  },
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type NoticeTone = "info" | "success" | "error" | "action";

function SystemNotice({ id, title, detail, tone }: { id: string | number; title: string; detail: string; tone: NoticeTone }) {
  const isSuccess = tone === "success";
  const isError = tone === "error";
  const isAction = tone === "action";
  const Icon = isSuccess ? ShieldCheck : isError ? CircleAlert : isAction ? Send : Cloud;
  const accent = isSuccess ? "text-[#70e0ac]" : isError ? "text-[#ff9e94]" : isAction ? "text-[#f0bd62]" : "text-[#6db8ff]";
  const signal = isSuccess ? "bg-[#64dea9]" : isError ? "bg-[#ef7d72]" : isAction ? "bg-[#efb454]" : "bg-[#49a6ff]";

  return (
    <div className="system-notice relative w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-[#83bfff]/25 bg-[#08141e]/95 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#49a6ff]/85 to-transparent" />
      <div aria-hidden className="inspection-overlay absolute inset-0 opacity-[0.12]" />
      <div className="relative flex items-start gap-3">
        <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.035] ${accent}`}><Icon className="h-4 w-4" strokeWidth={1.7} /></span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3"><p className="font-display text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#9bc4e4]">System notice</p><span className={`h-1.5 w-1.5 rounded-full ${signal} shadow-[0_0_10px_currentColor]`} /></div>
          <p className="mt-1.5 text-sm font-bold text-[#e8f5ff]">{title}</p>
          <p className="mt-1 text-xs leading-5 text-[#91aabd]">{detail}</p>
        </div>
        <button type="button" onClick={() => toast.dismiss(id)} aria-label="Dismiss notification" className="route-link -mr-1 -mt-1 rounded-md p-1 text-[#7392a8] hover:bg-white/[0.06] hover:text-[#d9edff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#49a6ff]"><X className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

function showSystemNotice(title: string, detail: string, tone: NoticeTone = "info") {
  toast.custom((id) => <SystemNotice id={id} title={title} detail={detail} tone={tone} />, { duration: 5200 });
}

function showEmailComposeNotice() {
  showSystemNotice("Gmail compose opening", "A direct opportunity message is opening in a new tab, ready for you to send.", "action");
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");
  const [activeSkill, setActiveSkill] = useState<keyof typeof skillGroups>("Cloud & DevOps");
  const [activeProject, setActiveProject] = useState<string | null>("static-cloud");
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);
  const [formValues, setFormValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const projectCardRefs = useRef<Record<string, HTMLElement | null>>({});
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveNav(mostVisible.target.id);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0.05, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newlyVisible = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target.id);
        if (newlyVisible.length) {
          setVisibleProjects((current) => Array.from(new Set([...current, ...newlyVisible])));
          entries.filter((entry) => entry.isIntersecting).forEach((entry) => observer.unobserve(entry.target));
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    Object.values(projectCardRefs.current).forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    setActiveNav(id);
    scrollToId(id);
  };

  const updateFormField = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: "" }));
    if (formState !== "idle") setFormState("idle");
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (formValues.name.trim().length < 2) errors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(formValues.email)) errors.email = "Enter a valid email address.";
    if (formValues.subject.trim().length < 3) errors.subject = "Add a short subject (at least 3 characters).";
    if (formValues.message.trim().length < 20) errors.message = "Please share a little more (at least 20 characters).";
    return errors;
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      setFormState("idle");
      return;
    }

    setFormState("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactDeliveryEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          subject: formValues.subject.trim(),
          message: formValues.message.trim(),
          _subject: `New portfolio message — ${formValues.subject.trim()}`,
          _template: "table",
          _honey: "",
          _url: window.location.href,
        }),
      });
      if (!response.ok) throw new Error("The message could not be sent.");
      setFormValues({ name: "", email: "", subject: "", message: "" });
      setFormErrors({});
      setFormState("success");
      showSystemNotice("Message relayed", "Your details and message were sent to Sahil’s Gmail inbox. He can reply directly to your email address.", "success");
    } catch {
      setFormState("error");
      showSystemNotice("Message relay unavailable", "Please use the direct email fallback below and try again later.", "error");
    }
  };

  return (
    <main className="site-shell min-h-screen text-[#edf6ff]">
      <div aria-hidden className="latency-grid pointer-events-none absolute inset-x-0 top-0 z-0 h-[48rem]" />
      <div aria-hidden className="noise-layer pointer-events-none absolute inset-0 z-0" />

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#081018]/80 backdrop-blur-xl">
        <div className="container flex h-[4.75rem] items-center justify-between gap-5">
          <button
            onClick={() => handleNav("overview")}
            aria-label="Scroll to portfolio overview"
            className="route-link flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#49a6ff]"
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#49a6ff]/25 bg-[#49a6ff]/[0.06] shadow-[inset_0_1px_0_rgba(184,224,255,0.08)]">
              <span aria-hidden className="header-logo-pulse absolute inset-0 rounded-xl border border-[#49a6ff]/55" />
              <Cloud aria-hidden className="h-6 w-6 text-[#7cc6ff]" strokeWidth={1.65} />
              <Workflow aria-hidden className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 rounded-full bg-[#0a1722] p-[1px] text-[#70e0ac]" strokeWidth={2} />
              <span className="sr-only">Cloud and DevOps</span>
              <span aria-hidden className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#49a6ff] shadow-[0_0_10px_#49a6ff]" />
            </span>
            <span className="text-left leading-none">
              <span className="flex items-center gap-1.5 font-display text-[0.82rem] font-bold tracking-[0.13em] text-[#f4f9ff]">SAHIL <span className="text-[#64aff5]">TALAPE</span></span>
              <span className="mt-1 block font-display text-[0.5rem] font-bold uppercase tracking-[0.16em] text-[#7fa1b9]">Cloud / DevOps Engineer</span>
            </span>
          </button>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.025] p-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                aria-current={activeNav === item.id ? "page" : undefined}
                className={`route-link relative flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[0.65rem] font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#49a6ff] ${
                  activeNav === item.id ? "bg-[#49a6ff]/12 text-[#d5ebff]" : "text-[#7f9aaf] hover:bg-white/[0.04] hover:text-[#dceeff]"
                }`}
              >
                {item.label}
                {activeNav === item.id && <span className="absolute inset-x-3 -bottom-[1px] h-px bg-[#49a6ff] shadow-[0_0_10px_#49a6ff]" />}
              </button>
            ))}
          </nav>

          <a
            href={opportunityEmailHref}
            target="_blank"
            rel="noreferrer"
            onClick={showEmailComposeNotice}
            className="route-link hidden items-center gap-2 rounded-lg border border-[#49a6ff]/35 bg-[#49a6ff]/10 px-3.5 py-2 text-xs font-bold text-[#c7e4ff] hover:border-[#49a6ff]/70 hover:bg-[#49a6ff]/15 xl:flex"
          >
            Let&apos;s connect <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="route-link rounded-lg border border-white/10 bg-white/[0.04] p-2.5 text-[#c8deef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#49a6ff] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/[0.07] bg-[#0b151e]/95 px-5 py-4 shadow-2xl lg:hidden">
            <nav aria-label="Mobile primary navigation" className="mx-auto grid max-w-md gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  aria-current={activeNav === item.id ? "page" : undefined}
                  className={`route-link flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold ${
                    activeNav === item.id ? "bg-[#49a6ff]/10 text-[#c6e2ff]" : "text-[#9fb5c7]"
                  }`}
                >
                  <span>{item.label}</span> <ArrowUpRight className="h-4 w-4" />
                </button>
              ))}
              <a
                href={opportunityEmailHref}
                target="_blank"
                rel="noreferrer"
                onClick={showEmailComposeNotice}
                className="route-link mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#49a6ff] px-3 py-3 text-sm font-bold text-[#07121b]"
              >
                Let&apos;s connect <Mail className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </header>

      <aside aria-label="Deployment rail" className="fixed bottom-0 left-0 top-[4.75rem] z-40 hidden w-[4.75rem] border-r border-white/[0.08] bg-[#09131c]/82 backdrop-blur-xl lg:flex lg:flex-col lg:items-center">
        <div className="mt-6 h-12 w-px bg-gradient-to-b from-transparent via-[#49a6ff]/65 to-transparent" />
        <nav className="mt-4 flex w-full flex-col items-center gap-2" aria-label="Desktop deployment navigation">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              title={item.label}
              aria-label={item.label}
              data-active={activeNav === item.id}
              onClick={() => handleNav(item.id)}
              className="rail-node route-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#49a6ff]"
            >
              <span className="absolute left-[3.2rem] whitespace-nowrap font-display text-[0.52rem] font-bold uppercase tracking-[0.14em] text-[#89a9bf] opacity-0 transition-opacity duration-150 group-hover:opacity-100">{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto mb-7 flex flex-col items-center gap-3 text-[#648296]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#efb454] shadow-[0_0_12px_rgba(239,180,84,0.8)]" title="Deployment status signal" />
          <span className="font-display text-[0.5rem] font-bold tracking-[0.16em] [writing-mode:vertical-rl]">FLIGHT_PATH</span>
        </div>
      </aside>

      <section id="overview" className="section-flight-path relative z-10 scroll-mt-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#081018_0%,rgba(8,16,24,0.9)_28%,rgba(8,16,24,0.34)_67%,#081018_100%)]" />
        <img
          src="/manus-storage/sahil-hero-infrastructure_264b0ed0.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[63%_center] opacity-85 mix-blend-screen"
        />
        <div aria-hidden className="absolute right-[9%] top-[27%] hidden h-28 w-52 border border-[#83bfff]/20 bg-[#07131d]/20 p-3 backdrop-blur-[1px] lg:block">
          <div className="inspection-overlay absolute inset-0 opacity-55" />
          <div className="relative flex items-center justify-between font-display text-[0.5rem] font-bold uppercase tracking-[0.14em] text-[#a5c9e7]"><span>Route inspection</span><span className="text-[#efb454]">3 nodes</span></div>
          <div className="relative mt-5 flex items-center gap-4"><span className="h-2 w-2 rounded-full border border-[#7ec0fb] bg-[#102e43]" /><span className="h-px flex-1 bg-[#49a6ff]/75" /><span className="h-2 w-2 rounded-full bg-[#49a6ff] shadow-[0_0_12px_#49a6ff]" /></div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-[#081018]" />

        <div className="container relative grid min-h-[calc(100svh-4.75rem)] items-center gap-12 py-20 lg:grid-cols-[minmax(0,0.94fr)_minmax(20rem,0.65fr)] lg:py-24">
          <div className="max-w-3xl">
            <div className="reveal-up mb-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="eyebrow">Cloud / DevOps Engineer</span>
              <span className="flex items-center gap-2 font-display text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#8ba8bd]">
                <span className="status-dot" /> Available for opportunities
              </span>
            </div>
            <h1 className="reveal-up font-display text-[clamp(3rem,8vw,6.7rem)] font-bold leading-[0.88] tracking-[-0.065em] text-[#f1f8ff]">
              Cloud delivery,
              <span className="block text-[#74b7ff]">built to hold.</span>
            </h1>
            <p className="reveal-up-delay mt-7 max-w-xl text-[0.97rem] leading-7 text-[#b3c8d8] sm:text-lg sm:leading-8">
              I&apos;m Sahil Talape — an aspiring Cloud/DevOps Engineer focused on secure, scalable, automated infrastructure and dependable application delivery.
            </p>
            <div className="reveal-up-delay mt-9 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleNav("work")}
                className="route-link inline-flex items-center gap-2 rounded-lg bg-[#49a6ff] px-5 py-3.5 text-sm font-bold text-[#07121b] shadow-[0_12px_30px_rgba(73,166,255,0.2)] hover:bg-[#78bcff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Inspect selected work <ArrowUpRight className="h-4 w-4" />
              </button>
              <a
                href="/manus-storage/Sahil-Talape-Cloud-DevOps-Engineer-Resume_b929201c.pdf"
                download="file:///N:/Resume/Sahil%20Resume.pdf"
                onClick={() => showSystemNotice("Resume download initiated", "Sahil’s current résumé is downloading now. Check your downloads folder when it finishes.", "success")}
                className="resume-download-button route-link inline-flex items-center gap-2 rounded-lg border border-[#7ab8ec]/45 bg-[#102b40]/80 px-5 py-3.5 text-sm font-bold text-[#d8ecfd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#49a6ff]"
              >
                <span className="relative z-10">Download resume</span> <Download className="resume-download-icon relative z-10 h-4 w-4" />
              </a>
              <a
                href={opportunityEmailHref}
                target="_blank"
                rel="noreferrer"
                onClick={showEmailComposeNotice}
                className="route-link inline-flex items-center gap-2 rounded-lg border border-white/[0.13] bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-[#d8e9f7] hover:border-[#7fb9ed]/60 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#49a6ff]"
              >
                Start a conversation <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="floating-node glass-panel relative ml-auto w-full max-w-md overflow-hidden rounded-2xl p-5 sm:p-6 lg:mt-24">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#49a6ff]/10" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-[0.63rem] font-bold uppercase tracking-[0.18em] text-[#8fb5d1]">Deployment profile</p>
                <p className="mt-2 font-display text-xl font-semibold text-[#ebf6ff]">Release-ready foundations</p>
              </div>
              <Cloud className="h-8 w-8 text-[#60adfb]" strokeWidth={1.45} />
            </div>
            <div className="my-6 signal-line" />
            <dl className="relative grid grid-cols-2 gap-x-5 gap-y-5">
              <div>
                <dt className="font-display text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#7590a4]">Base</dt>
                <dd className="mt-1 text-sm font-semibold text-[#d9edf9]">Pune, India</dd>
              </div>
              <div>
                <dt className="font-display text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#7590a4]">Primary cloud</dt>
                <dd className="mt-1 text-sm font-semibold text-[#d9edf9]">AWS</dd>
              </div>
              <div>
                <dt className="font-display text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#7590a4]">Delivery</dt>
                <dd className="mt-1 text-sm font-semibold text-[#d9edf9]">CI/CD + Docker</dd>
              </div>
              <div>
                <dt className="font-display text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#7590a4]">Focus</dt>
                <dd className="mt-1 text-sm font-semibold text-[#d9edf9]">Automation</dd>
              </div>
            </dl>
            <div className="relative mt-6 flex items-center gap-2 border-t border-white/[0.08] pt-4 text-xs text-[#8ba8bd]">
              <ShieldCheck className="h-4 w-4 text-[#72d7a7]" /> Secure, scalable, documented.
            </div>
          </aside>
        </div>
      </section>

      <section id="profile" className="section-flight-path relative z-10 scroll-mt-24 border-y border-white/[0.07] bg-[#0a151e]/55 py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(73,166,255,0.1),transparent_27%),linear-gradient(90deg,rgba(73,166,255,0.035),transparent_48%)]" />
        <div className="container relative grid items-center gap-12 lg:grid-cols-[minmax(16rem,0.72fr)_minmax(0,1fr)] lg:gap-24">
          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="absolute -left-5 top-8 h-24 w-px bg-gradient-to-b from-transparent via-[#49a6ff]/80 to-transparent" />
            <div className="absolute -right-4 bottom-12 h-20 w-20 border border-[#49a6ff]/20" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#78b9ef]/35 bg-[#102131] p-2 shadow-[0_24px_65px_rgba(0,0,0,0.28)]">
              <img src="/manus-storage/sahil-talape-profile-4k-natural_f12a8b9d.png" alt="Portrait of Sahil Talape" className="h-full w-full rounded-xl object-cover object-center" />
            </div>
            <div className="relative -mt-5 ml-auto mr-5 flex w-[72%] items-center gap-3 rounded-lg border border-white/[0.1] bg-[#0a1722]/95 px-4 py-3 shadow-xl backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#49a6ff] shadow-[0_0_10px_#49a6ff]" />
              <p className="font-display text-[0.56rem] font-bold uppercase tracking-[0.14em] text-[#a9c7df]">Pune, India · Available for opportunities</p>
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="eyebrow">Professional profile</p>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[0.94] tracking-[-0.055em] text-[#edf7ff] sm:text-5xl">Meet the engineer behind the release.</h2>
            <p className="mt-7 max-w-2xl text-sm leading-7 text-[#a9c0d0] sm:text-base sm:leading-8">Sahil is an aspiring Cloud and DevOps Engineer who brings a practical, detail-oriented approach to AWS delivery, container workflows, and CI/CD automation. He values clear documentation, repeatable systems, and dependable handoffs.</p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.1] sm:grid-cols-3">
              {[
                ["Base", "Pune, India"],
                ["Focus", "Cloud + DevOps"],
                ["Working style", "Structured delivery"],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#0b1822] px-5 py-4"><p className="font-display text-[0.55rem] font-bold uppercase tracking-[0.16em] text-[#7898ae]">{label}</p><p className="mt-2 text-sm font-semibold text-[#d7e9f6]">{value}</p></div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/in/sahil-talape-706842393" target="_blank" rel="noreferrer" onClick={() => showSystemNotice("Opening LinkedIn profile", "Sahil’s professional profile will open in a new tab.")} className="route-link inline-flex items-center gap-2 rounded-lg bg-[#49a6ff] px-4 py-3 text-sm font-bold text-[#07121b] hover:bg-[#79bdff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">View LinkedIn profile <ArrowUpRight className="h-4 w-4" /></a>
              <a href={opportunityEmailHref} target="_blank" rel="noreferrer" onClick={showEmailComposeNotice} className="route-link inline-flex items-center gap-2 rounded-lg border border-white/[0.13] bg-white/[0.03] px-4 py-3 text-sm font-bold text-[#cce3f4] hover:border-[#80bfee]/55 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#49a6ff]">Start a conversation <Send className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-24 pt-5 lg:pb-32">
        <div className="container grid gap-14 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-24">
          <div className="lg:pt-2">
            <p className="eyebrow">System intent</p>
          </div>
          <div className="max-w-4xl">
            <p className="font-display text-2xl font-medium leading-[1.22] tracking-[-0.04em] text-[#e6f3fc] sm:text-3xl lg:text-[2.6rem]">
              A practical builder who connects cloud services, version control, containers, and continuous delivery into reliable systems.
            </p>
            <div className="mt-9 grid gap-7 border-l border-[#49a6ff]/30 pl-6 sm:grid-cols-2 sm:gap-12 sm:pl-8">
              <p className="text-sm leading-7 text-[#9eb5c7]">
                With hands-on work across AWS, GitHub Actions, Docker, and Linux, I build deployment workflows with attention to security, operational visibility, and repeatability.
              </p>
              <div className="flex flex-wrap content-start gap-2">
                {["Cloud hosting", "Container workflows", "Pipeline automation", "Monitoring mindset"].map((item) => (
                  <span key={item} className="rounded-full border border-white/[0.1] bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-[#b6cddd]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-rule relative z-10" />

      <section id="work" className="section-flight-path relative z-10 scroll-mt-24 py-24 lg:py-32">
        <div className="container">
          <div className="grid gap-9 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-24">
            <div>
              <p className="eyebrow">Selected work</p>
              <p className="mt-5 max-w-[12rem] text-sm leading-6 text-[#8da5b8]">Two practical systems that move from architecture to observable delivery.</p>
            </div>
            <div>
              <div className="flex flex-wrap items-end justify-between gap-5">
                <h2 className="max-w-2xl font-display text-4xl font-bold leading-[0.94] tracking-[-0.055em] text-[#edf7ff] sm:text-5xl">Architecture, release, repeat.</h2>
                <div className="hidden items-center gap-2 pb-1 text-xs font-semibold text-[#91aabd] sm:flex"><CircleDot className="h-3.5 w-3.5 text-[#49a6ff]" /> Click a system to inspect the route.</div>
              </div>

              <div className="mt-8 flex items-center gap-3 border-y border-white/[0.08] py-3 font-display text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#718fa4]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#49a6ff] shadow-[0_0_10px_#49a6ff]" />
                Case-study trace: brief / implementation / proof route
              </div>

              <div className="mt-6 space-y-5">
                {projectData.map((project, projectIndex) => {
                  const isExpanded = activeProject === project.id;
                  const isVisible = visibleProjects.includes(`project-${project.id}`);
                  return (
                    <article
                      key={project.id}
                      id={`project-${project.id}`}
                      ref={(element) => { projectCardRefs.current[`project-${project.id}`] = element; }}
                      style={{ transitionDelay: `${projectIndex * 100}ms` }}
                      className={`project-reveal group overflow-hidden rounded-2xl border transition-[opacity,transform,border-color,background-color,box-shadow] duration-500 ease-out ${isVisible ? "is-visible" : ""} ${
                        isExpanded ? "border-[#49a6ff]/45 bg-[#132434]/55 shadow-[0_25px_60px_rgba(0,0,0,0.18)]" : "border-white/[0.09] bg-white/[0.025] hover:border-[#7cb8e9]/30 hover:bg-white/[0.045]"
                      }`}
                    >
                      <button
                        onClick={() => setActiveProject(isExpanded ? null : project.id)}
                        aria-expanded={isExpanded}
                        className="route-link grid w-full text-left md:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)]"
                      >
                        <div className="relative min-h-[13rem] overflow-hidden border-b border-white/[0.08] md:min-h-full md:border-b-0 md:border-r">
                          <img src={project.image} alt={project.imageAlt} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.035]" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#07111a]/85 via-[#07111a]/10 to-transparent" />
                          <div aria-hidden className="inspection-overlay absolute inset-0 opacity-30" />
                          <div aria-hidden className="absolute left-7 top-8 flex items-center gap-2 font-display text-[0.5rem] font-bold uppercase tracking-[0.16em] text-[#a5c9e7]"><span className="h-1.5 w-1.5 rounded-full bg-[#49a6ff] shadow-[0_0_10px_#49a6ff]" /> inspect route</div>
                          <div aria-hidden className="absolute right-7 top-12 hidden h-px w-20 bg-[#49a6ff]/70 md:block" />
                          <div aria-hidden className="absolute right-[5.4rem] top-[2.75rem] hidden h-2 w-2 rounded-full border border-[#a8d3f6] bg-[#122a3c] md:block" />
                          <span className="absolute bottom-5 left-5 font-display text-[0.66rem] font-bold tracking-[0.2em] text-[#b7d8f2]">SYS_{project.index}</span>
                        </div>
                        <div className="p-6 sm:p-8">
                          <div className="flex items-center justify-between gap-5">
                            <span className="eyebrow text-[#88bfff]">{project.eyebrow}</span>
                            <span className="shrink-0 text-right text-xs font-semibold text-[#7994a8]"><span className="mb-1 flex items-center justify-end gap-1.5 font-display text-[0.55rem] font-bold tracking-[0.13em] text-[#efb454]"><span className="h-1.5 w-1.5 rounded-full bg-[#efb454] shadow-[0_0_10px_rgba(239,180,84,0.65)]" />{project.status}</span>{project.range}</span>
                          </div>
                          <h3 className="mt-5 max-w-xl font-display text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#eaf6ff] sm:text-3xl">{project.title}</h3>
                          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#9db4c5]">{project.summary}</p>
                          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#badeff]">
                            {isExpanded ? "Close architecture" : "Inspect architecture"}
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-[#49a6ff]/15 bg-[#061018]/45 px-6 py-7 sm:px-8 sm:py-8">
                          <div className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14">
                            <div>
                              <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8aabc3]">Implementation highlights</p>
                              <ul className="mt-5 space-y-3.5">
                                {project.points.map((point) => (
                                  <li key={point} className="flex gap-3 text-sm leading-6 text-[#b7cedd]">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#66dfa9]" /> {point}
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-7 flex flex-wrap gap-2">
                                {project.stack.map((item) => <span key={item} className="rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 text-[0.69rem] font-semibold text-[#a9c8df]">{item}</span>)}
                              </div>
                            </div>
                            <div className="rounded-xl border border-white/[0.09] bg-[#0c1923]/80 p-5">
                              <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8aabc3]">Delivery route</p>
                              <ol className="mt-5 space-y-0">
                                {project.route.map((step, index) => (
                                  <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                                    {index < project.route.length - 1 && <span className="absolute left-[0.45rem] top-5 h-[calc(100%-0.45rem)] w-px bg-gradient-to-b from-[#49a6ff]/70 to-[#49a6ff]/5" />}
                                    <span className="relative z-10 mt-0.5 flex h-[0.95rem] w-[0.95rem] shrink-0 items-center justify-center rounded-full border border-[#72b6f6] bg-[#142b3d] text-[0.5rem] font-bold text-[#b5dcff]">{index + 1}</span>
                                    <span className="text-sm font-semibold text-[#c8dfef]">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                          <div className="mt-8 grid gap-5 border-t border-white/[0.08] pt-7 lg:grid-cols-[1.22fr_0.78fr]">
                            <div className="rounded-xl border border-white/[0.09] bg-white/[0.025] p-5">
                              <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#6db2f5]" /><p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8aabc3]">Case-study frame</p></div>
                              <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                                <div><dt className="font-display text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[#668499]">Objective</dt><dd className="mt-2 text-xs leading-5 text-[#b7cedd]">{project.caseStudy.objective}</dd></div>
                                <div><dt className="font-display text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[#668499]">Delivery shape</dt><dd className="mt-2 text-xs leading-5 text-[#b7cedd]">{project.caseStudy.delivery}</dd></div>
                                <div><dt className="font-display text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[#668499]">Evidence trail</dt><dd className="mt-2 text-xs leading-5 text-[#b7cedd]">{project.caseStudy.evidence}</dd></div>
                              </dl>
                            </div>
                            <div className="rounded-xl border border-[#49a6ff]/20 bg-[#0a1924]/80 p-5">
                              <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8eb7d6]">Proof route</p>
                              <p className="mt-2 text-xs leading-5 text-[#91abbf]">Public repositories and related implementation work are maintained in Sahil&apos;s source collection.</p>
                              <div className="mt-4 flex flex-wrap gap-3">
                                <a href={sourceCollectionUrl} target="_blank" rel="noreferrer" onClick={() => showSystemNotice("Opening source collection", "Sahil’s public implementation work will open in a new tab.")} className="route-link inline-flex items-center gap-1.5 text-xs font-bold text-[#bfe0fb] hover:text-white">Review GitHub <ExternalLink className="h-3.5 w-3.5" /></a>
                                <a href="mailto:sahiltalape2701@gmail.com?subject=Case%20study%20walkthrough" className="route-link inline-flex items-center gap-1.5 text-xs font-bold text-[#87bdf0] hover:text-[#d9edff]">Request walkthrough <ArrowUpRight className="h-3.5 w-3.5" /></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-rule relative z-10" />

      <section id="toolkit" className="section-flight-path relative z-10 scroll-mt-24 py-24 lg:py-32">
        <div className="container grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-24">
          <div>
            <p className="eyebrow">Engineering toolkit</p>
            <p className="mt-5 max-w-[12rem] text-sm leading-6 text-[#8da5b8]">Technologies selected for building, packaging, moving, and observing applications.</p>
          </div>
          <div>
            <h2 className="max-w-2xl font-display text-4xl font-bold leading-[0.94] tracking-[-0.055em] text-[#edf7ff] sm:text-5xl">The stack behind the handoff.</h2>
            <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
              {(Object.keys(skillGroups) as Array<keyof typeof skillGroups>).map((group) => (
                <button
                  role="tab"
                  aria-selected={activeSkill === group}
                  key={group}
                  onClick={() => setActiveSkill(group)}
                  className={`route-link rounded-lg border px-4 py-2.5 text-xs font-bold ${
                    activeSkill === group ? "border-[#49a6ff]/55 bg-[#49a6ff]/12 text-[#c8e4ff]" : "border-white/[0.09] bg-white/[0.025] text-[#819eb2] hover:border-white/[0.2] hover:text-[#c5dae9]"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
            <div className="toolchain-route mt-7 grid overflow-hidden rounded-xl border border-[#49a6ff]/18 bg-[#0a1721]/80 sm:grid-cols-4">
              {["Source", "Build", "Package", "Observe"].map((stage, index) => <div key={stage} className="toolchain-stage relative px-4 py-3.5"><span className="relative z-10 flex items-center gap-2 font-display text-[0.56rem] font-bold uppercase tracking-[0.14em] text-[#9cc5e4]"><span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#77baef] bg-[#102b3d] text-[0.48rem] text-[#d9efff]">{index + 1}</span>{stage}</span></div>)}
            </div>
            <div role="tabpanel" className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.1] sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups[activeSkill].map((skill, index) => {
                const icon = activeSkill === "Cloud & DevOps" ? [Cloud, ServerCog, ShieldCheck, Container, Workflow, GitBranch, Network][index] : activeSkill === "Engineering" ? [Code2, Code2, Database, Layers3, Terminal, Terminal][index] : [Database, Database, GitBranch, Github, Code2, Code2][index];
                const Icon = icon ?? Box;
                return (
                  <div key={skill} className="group flex min-h-32 flex-col justify-between bg-[#0d1922] p-5 transition-colors hover:bg-[#122433]">
                    <Icon className="h-5 w-5 text-[#6bb0f5] transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#d4e8f7]">{skill}</p>
                      <p className="mt-1 text-[0.67rem] font-medium text-[#7190a5]">{activeSkill}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs leading-5 text-[#7f9bad]"><Terminal className="h-3.5 w-3.5 text-[#49a6ff]" /> Select a category to review the tools used across Sahil&apos;s cloud delivery work.</p>
          </div>
        </div>
      </section>

      <section id="credentials" className="section-flight-path relative z-10 scroll-mt-24 overflow-hidden border-y border-white/[0.08] bg-[#0b151e]/55 py-24 lg:py-32">
        <img src="/manus-storage/sahil-grid-texture_e2aa8755.png" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="container relative grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-24">
          <div>
            <p className="eyebrow">Credentials</p>
            <p className="mt-5 max-w-[12rem] text-sm leading-6 text-[#8da5b8]">Formal learning and certifications that support the practical work.</p>
          </div>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
              <div>
              <div className="flex flex-wrap items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#49a6ff]/45 bg-[#49a6ff]/10 font-display text-[0.58rem] font-bold text-[#b8dcf9]">03</span><p className="font-display text-[0.58rem] font-bold uppercase tracking-[0.15em] text-[#7ea7c6]">Evidence checkpoint</p><span className="h-px w-12 bg-[#49a6ff]/45" /></div>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[0.94] tracking-[-0.055em] text-[#edf7ff] sm:text-5xl">Cloud foundations, continuously tested.</h2>
              <div className="mt-10 border-t border-white/[0.11]">
                <div className="border-b border-white/[0.09] py-5">
                  <p className="font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#75a9d6]">Primary technical preparation</p>
                  {[
                    ["Cloud and DevOps Mastery", "Exlearn Technologies, Pune", "Certificate ID: f6f4fde7-c67f-4e41-883c-6c1a134fa94b"],
                    ["Basics of Python", "Infosys Springboard", "Foundational certification"],
                  ].map(([title, organisation, detail]) => (
                    <div key={title} className="group grid gap-2 border-t border-white/[0.07] py-5 first:mt-4 sm:grid-cols-[2.1rem_minmax(0,1fr)_minmax(9rem,0.55fr)] sm:gap-4">
                      <Award className="h-5 w-5 text-[#6db2f5]" strokeWidth={1.35} />
                      <div><h3 className="font-display text-base font-semibold text-[#dceefa]">{title}</h3><p className="mt-1 text-xs text-[#8eabbf]">{organisation}</p></div>
                      <p className="text-xs leading-5 text-[#7897ac]">{detail}</p>
                    </div>
                  ))}
                </div>
                <div className="py-6">
                  <p className="font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#718fa4]">Supporting learning</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Data Analytics Job Simulation", "Deloitte", "Virtual experience program"],
                      ["Computer Typing — Basic", "GCC-TBC", "English typing: 30 WPM, A Grade"],
                    ].map(([title, organisation, detail]) => (
                      <div key={title} className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4">
                        <h3 className="font-display text-sm font-semibold text-[#c9dfef]">{title}</h3>
                        <p className="mt-1 text-xs text-[#8eabbf]">{organisation}</p>
                        <p className="mt-3 text-xs leading-5 text-[#7897ac]">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <aside className="glass-panel self-start rounded-2xl p-6 sm:p-7">
              <GraduationCap className="h-7 w-7 text-[#79baff]" strokeWidth={1.35} />
              <p className="mt-7 font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8aabc3]">Education</p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#e7f4fd]">B.B.A. in Computer Application</h3>
              <p className="mt-3 text-sm leading-6 text-[#9ab2c4]">Savitribai Phule Pune University, Pune</p>
              <div className="mt-7 grid grid-cols-2 border-t border-white/[0.09] pt-5">
                <div><p className="font-display text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[#7190a5]">Period</p><p className="mt-1.5 text-sm font-semibold text-[#cde5f7]">2023 — 2026</p></div>
                <div><p className="font-display text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[#7190a5]">CGPA</p><p className="mt-1.5 text-sm font-semibold text-[#cde5f7]">9.37 / 10.0</p></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="contact" className="section-flight-path relative z-10 py-24 lg:py-32">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl border border-[#49a6ff]/25 bg-[linear-gradient(115deg,rgba(20,51,75,0.75),rgba(10,20,30,0.88)_52%,rgba(8,16,24,0.95))] px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#49a6ff]/15" />
            <div className="absolute right-12 top-16 h-2 w-2 rounded-full bg-[#49a6ff] shadow-[0_0_20px_#49a6ff]" />
            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(22rem,0.9fr)] lg:gap-16">
              <div className="max-w-3xl">
                <div className="mb-6 flex flex-wrap items-center gap-3 font-display text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#84acc8]"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#49a6ff]/45 bg-[#49a6ff]/10 text-[#b8dcf9]">04</span><span>Opportunity route</span><span className="h-px w-12 bg-[#49a6ff]/45" /><span>Context → conversation → handoff</span></div>
                <p className="eyebrow">Next deployment</p>
                <h2 className="mt-6 font-display text-4xl font-bold leading-[0.92] tracking-[-0.06em] text-[#eff8ff] sm:text-5xl lg:text-6xl">Let&apos;s build the route from idea to release.</h2>
                <p className="mt-6 max-w-xl text-sm leading-7 text-[#a9c1d2] sm:text-base">Open to Cloud and DevOps opportunities where structured delivery, thoughtful automation, and a readiness to learn matter.</p>
                <div className="mt-8 flex flex-wrap gap-4 text-xs text-[#8daabd]"><a href="https://www.linkedin.com/in/sahil-talape-706842393" target="_blank" rel="noreferrer" className="route-link flex items-center gap-1.5 hover:text-[#d8ecfb]"><Linkedin className="h-3.5 w-3.5" /> Connect on LinkedIn <ArrowUpRight className="h-3 w-3" /></a><a href={opportunityEmailHref} target="_blank" rel="noreferrer" onClick={showEmailComposeNotice} className="route-link flex items-center gap-1.5 hover:text-[#d8ecfb]"><Mail className="h-3.5 w-3.5" /> Direct email</a></div>
              </div>
              <form onSubmit={handleContactSubmit} noValidate className="glass-panel relative rounded-xl p-5 sm:p-6" aria-label="Contact Sahil">
                <div className="mb-5 flex items-center justify-between gap-4"><div><p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#90b7d4]">Gmail message relay</p><p className="mt-1 text-sm font-semibold text-[#e6f4fd]">Send a direct note</p></div><Mail className="h-5 w-5 text-[#69aff5]" /></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold text-[#a8c1d2]">Name<input value={formValues.name} onChange={(event) => updateFormField("name", event.target.value)} aria-invalid={Boolean(formErrors.name)} aria-describedby={formErrors.name ? "contact-name-error" : undefined} className={`mt-2 w-full rounded-lg border bg-[#07121a]/65 px-3 py-2.5 text-sm text-[#e8f5ff] outline-none transition placeholder:text-[#58758b] focus:border-[#49a6ff] focus:ring-2 focus:ring-[#49a6ff]/20 ${formErrors.name ? "border-[#ef7d72]" : "border-white/[0.12]"}`} placeholder="Your name" /></label>
                  <label className="block text-xs font-semibold text-[#a8c1d2]">Email<input type="email" value={formValues.email} onChange={(event) => updateFormField("email", event.target.value)} aria-invalid={Boolean(formErrors.email)} aria-describedby={formErrors.email ? "contact-email-error" : undefined} className={`mt-2 w-full rounded-lg border bg-[#07121a]/65 px-3 py-2.5 text-sm text-[#e8f5ff] outline-none transition placeholder:text-[#58758b] focus:border-[#49a6ff] focus:ring-2 focus:ring-[#49a6ff]/20 ${formErrors.email ? "border-[#ef7d72]" : "border-white/[0.12]"}`} placeholder="name@company.com" /></label>
                </div>
                <label className="mt-4 block text-xs font-semibold text-[#a8c1d2]">Subject<input value={formValues.subject} onChange={(event) => updateFormField("subject", event.target.value)} aria-invalid={Boolean(formErrors.subject)} aria-describedby={formErrors.subject ? "contact-subject-error" : undefined} className={`mt-2 w-full rounded-lg border bg-[#07121a]/65 px-3 py-2.5 text-sm text-[#e8f5ff] outline-none transition placeholder:text-[#58758b] focus:border-[#49a6ff] focus:ring-2 focus:ring-[#49a6ff]/20 ${formErrors.subject ? "border-[#ef7d72]" : "border-white/[0.12]"}`} placeholder="What would you like to discuss?" /></label>
                <label className="mt-4 block text-xs font-semibold text-[#a8c1d2]">Message<textarea value={formValues.message} onChange={(event) => updateFormField("message", event.target.value)} aria-invalid={Boolean(formErrors.message)} aria-describedby={formErrors.message ? "contact-message-error" : undefined} rows={4} className={`mt-2 w-full resize-none rounded-lg border bg-[#07121a]/65 px-3 py-2.5 text-sm leading-6 text-[#e8f5ff] outline-none transition placeholder:text-[#58758b] focus:border-[#49a6ff] focus:ring-2 focus:ring-[#49a6ff]/20 ${formErrors.message ? "border-[#ef7d72]" : "border-white/[0.12]"}`} placeholder="Tell me about the role, project, or opportunity." /></label>
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                {Object.entries(formErrors).map(([field, error]) => <p key={field} id={`contact-${field}-error`} className="mt-2 text-xs text-[#ff9e94]">{error}</p>)}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><button type="submit" disabled={formState === "sending"} className="route-link inline-flex items-center justify-center gap-2 rounded-lg bg-[#49a6ff] px-4 py-3 text-sm font-bold text-[#07121b] disabled:cursor-wait disabled:opacity-70">{formState === "sending" ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Send message</>}</button><span className="text-[0.66rem] leading-5 text-[#7899af]">Name, email, subject, and message go to Sahil&apos;s Gmail.</span></div>
                <div aria-live="polite" className="mt-4">{formState === "success" && <p className="rounded-lg border border-[#64dea9]/25 bg-[#64dea9]/10 px-3 py-2.5 text-xs leading-5 text-[#aef0cb]"><Check className="mr-1.5 inline h-3.5 w-3.5" />Message sent to Sahil&apos;s Gmail. He can reply directly to your email address.</p>}{formState === "error" && <p className="rounded-lg border border-[#ef7d72]/25 bg-[#ef7d72]/10 px-3 py-2.5 text-xs leading-5 text-[#ffc3bd]">The relay is unavailable right now. Please <a href="mailto:sahiltalape2701@gmail.com" className="font-bold underline underline-offset-2">send Sahil an email directly</a>.</p>}</div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.08] py-8">
        <div className="container flex flex-col gap-6 text-xs text-[#7693a7] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><img src="/manus-storage/sahil-cloud-mark_402e496a.png" alt="" className="h-8 w-8 object-contain" /><span>© {year} Sahil Talape. Designed for dependable delivery.</span></div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Pune, Maharashtra</span>
            <a href="https://github.com/snalape2701" target="_blank" rel="noreferrer" className="route-link flex items-center gap-1.5 hover:text-[#bfddf4]"><Github className="h-3.5 w-3.5" /> GitHub <ArrowUpRight className="h-3 w-3" /></a>
            <a href="mailto:sahiltalape2701@gmail.com" className="route-link flex items-center gap-1.5 hover:text-[#bfddf4]"><Mail className="h-3.5 w-3.5" /> Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
