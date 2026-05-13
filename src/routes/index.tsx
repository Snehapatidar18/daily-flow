import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  ArrowRight, Play, MapPin, Users, Wallet, Bell, ShieldCheck, Sparkles,
  Truck, Droplet, Newspaper, Milk, Check, ChevronDown,
} from "lucide-react";
import { TopNav } from "@/components/TopNav";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RouteLedger — Smart Delivery Tracking for Daily Suppliers" },
      { name: "description", content: "Automatically manage deliveries, customers, and billing while distributing products on your daily route." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopNav />
      <Hero />
      <TrustedBy />
      <ProblemSolution />
      <HowItWorks />
      <DashboardPreview />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

/* ------------------------------ Hero ------------------------------ */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger", {
        y: 30, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.1,
      });
      gsap.from(".hero-mock", {
        y: 60, opacity: 0, scale: 0.96, duration: 1.1, ease: "power3.out", delay: 0.4,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <RouteLines />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="text-center">
          <div className="hero-stagger mx-auto inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
            Built for India's daily delivery workforce
          </div>
          <h1 className="hero-stagger mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            Smart Delivery Tracking <br className="hidden md:block" />
            for <span className="text-gradient">Daily Suppliers</span>
          </h1>
          <p className="hero-stagger mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Automatically manage deliveries, customers, and billing — while you're out on the route.
          </p>
          <div className="hero-stagger mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-2xl glass px-6 py-3.5 text-sm font-semibold transition hover:bg-white/10">
              <Play className="h-4 w-4 text-primary-glow" /> Watch Demo
            </button>
          </div>
        </div>

        <DashboardMock />
      </div>
    </section>
  );
}

function RouteLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden
    >
      <defs>
        <linearGradient id="rg" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.22 275)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.7 0.22 280)" stopOpacity="1" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 150)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[120, 260, 420, 560].map((y, i) => (
        <path
          key={i}
          d={`M0 ${y} C 300 ${y - 60}, 700 ${y + 80}, 1200 ${y - 30}`}
          fill="none" stroke="url(#rg)" strokeWidth="1.5"
          strokeDasharray="6 10"
          style={{
            animation: `dash 12s linear infinite`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}
      <style>{`@keyframes dash { to { stroke-dashoffset: -200; } }`}</style>
    </svg>
  );
}

function DashboardMock() {
  return (
    <div className="hero-mock relative mx-auto mt-14 max-w-4xl">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-primary opacity-30 blur-3xl" />
      <div className="glass-strong relative rounded-3xl p-3 shadow-glass md:p-5">
        <div className="flex items-center gap-1.5 px-2 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Deliveries", val: "42", icon: Truck, c: "text-primary-glow" },
            { label: "Customers", val: "128", icon: Users, c: "text-success" },
            { label: "Earnings", val: "₹4,820", icon: Wallet, c: "text-primary-glow" },
            { label: "Distance", val: "18 km", icon: MapPin, c: "text-success" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-3">
              <s.icon className={`h-4 w-4 ${s.c}`} />
              <div className="mt-2 text-xl font-semibold">{s.val}</div>
              <div className="text-[11px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="glass rounded-2xl p-4 md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Today's route</div>
              <div className="text-xs text-success">On track</div>
            </div>
            <div className="relative mt-3 h-32 overflow-hidden rounded-xl grid-bg">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-success/20" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 130">
                <path d="M10 110 C 80 30, 200 130, 390 20" fill="none"
                  stroke="oklch(0.7 0.22 280)" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="120" cy="62" r="4" fill="oklch(0.72 0.18 150)" />
                <circle cx="240" cy="78" r="4" fill="oklch(0.72 0.18 150)" />
                <circle cx="390" cy="20" r="6" fill="oklch(0.7 0.22 280)" />
              </svg>
            </div>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="text-sm font-medium">Next stop</div>
            <div className="mt-3 text-sm text-muted-foreground">Ravi Sharma · #14</div>
            <div className="mt-1 text-xs text-muted-foreground">2 L milk · ₹120</div>
            <button className="mt-4 w-full rounded-xl bg-gradient-success py-2 text-xs font-semibold text-success-foreground">
              Mark delivered
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Trusted ---------------------------- */
function TrustedBy() {
  const items = [
    { Icon: Milk, name: "Dairy co-ops" },
    { Icon: Droplet, name: "Water suppliers" },
    { Icon: Newspaper, name: "News vendors" },
    { Icon: Truck, name: "Route distributors" },
  ];
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by daily delivery teams
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map(({ Icon, name }) => (
            <div key={name} className="glass flex items-center justify-center gap-2 rounded-xl py-4 text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-primary-glow" /> {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Problem / Solution --------------------- */
function ProblemSolution() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
        <GlassCard className="p-7">
          <div className="text-xs font-semibold uppercase tracking-widest text-destructive/90">The problem</div>
          <h3 className="mt-3 font-display text-2xl font-bold">Paper diaries don't scale</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>• Forgotten deliveries and missed payments</li>
            <li>• Hours wasted writing monthly bills by hand</li>
            <li>• No way to share invoices with customers</li>
            <li>• Hard to remember each customer's daily quantity</li>
          </ul>
        </GlassCard>
        <GlassCard className="p-7">
          <div className="text-xs font-semibold uppercase tracking-widest text-success">RouteLedger</div>
          <h3 className="mt-3 font-display text-2xl font-bold">Your route, automated</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              "Auto-detect customer when you arrive",
              "One-tap delivery confirmation",
              "Bills generated automatically every month",
              "Share invoices on WhatsApp instantly",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {t}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </section>
  );
}

/* ----------------------------- HowItWorks ------------------------- */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Add your route", d: "Import customers and set daily quantities once." },
    { n: "02", t: "Deliver as usual", d: "Tap to confirm. We track distance and timing automatically." },
    { n: "03", t: "Get paid faster", d: "Auto-generated bills shared on WhatsApp. Track dues in real time." },
  ];
  return (
    <section id="how" className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader eyebrow="How it works" title="Three steps. Zero paperwork." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="glass rounded-2xl p-6"
            >
              <div className="font-display text-3xl font-bold text-gradient">{s.n}</div>
              <div className="mt-3 text-lg font-semibold">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Stats / preview -------------------- */
function DashboardPreview() {
  const stats = [
    { v: 12000, s: "+", l: "Deliveries / day" },
    { v: 98, s: "%", l: "On-time rate" },
    { v: 4, s: " hrs", l: "Saved weekly" },
    { v: 2300, s: "+", l: "Active routes" },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {stats.map((st) => (
              <div key={st.l}>
                <div className="font-display text-3xl font-bold text-gradient md:text-4xl">
                  <AnimatedCounter value={st.v} suffix={st.s} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Features --------------------------- */
function Features() {
  const items = [
    { Icon: MapPin, t: "Live route tracking", d: "GPS-based auto-detect when you reach each customer." },
    { Icon: Users, t: "Customer ledger", d: "Daily quantities, holidays, and pause requests in one place." },
    { Icon: Wallet, t: "Auto billing", d: "Monthly bills generated and shared in seconds." },
    { Icon: Bell, t: "Smart reminders", d: "Customers get gentle WhatsApp nudges for due payments." },
    { Icon: ShieldCheck, t: "Offline-first", d: "Works in low signal areas. Syncs when you're back online." },
    { Icon: Sparkles, t: "Voice add-ons", d: "Add a quantity hands-free with voice while delivering." },
  ];
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader eyebrow="Features" title="Everything you need on the route" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map(({ Icon, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <GlassCard className="h-full p-6">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="mt-4 text-base font-semibold">{t}</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Testimonials ----------------------- */
function Testimonials() {
  const items = [
    { n: "Suresh K.", r: "Milk supplier · Pune", q: "I used to write in 4 diaries every night. Now I'm done in 5 minutes after my route." },
    { n: "Priya M.", r: "Water canister business · Bengaluru", q: "Customers stopped arguing about quantities. Everything is in the app, with timestamps." },
    { n: "Anil G.", r: "Newspaper agency · Jaipur", q: "Monthly billing used to take me 3 days. RouteLedger does it in one tap." },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader eyebrow="Loved by suppliers" title="Real stories from the route" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((t) => (
            <GlassCard key={t.n} className="h-full p-6">
              <p className="text-sm leading-relaxed text-foreground/90">"{t.q}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground">
                  {t.n.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Pricing ---------------------------- */
function Pricing() {
  const tiers = [
    { name: "Starter", price: "Free", desc: "Up to 30 customers", feats: ["Customer ledger", "Manual billing", "Basic reports"] },
    { name: "Pro", price: "₹299", per: "/mo", featured: true, desc: "Up to 500 customers", feats: ["Live GPS tracking", "Auto WhatsApp bills", "Voice add-ons", "Offline mode"] },
    { name: "Business", price: "₹799", per: "/mo", desc: "Multiple riders", feats: ["Multi-route", "Team accounts", "Priority support", "Custom branding"] },
  ];
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader eyebrow="Pricing" title="Pay only when you scale" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl p-7 ${t.featured ? "glass-strong shadow-glow" : "glass"}`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
                  Most popular
                </div>
              )}
              <div className="text-sm font-medium text-muted-foreground">{t.name}</div>
              <div className="mt-3 flex items-end gap-1">
                <span className="font-display text-4xl font-bold">{t.price}</span>
                {t.per && <span className="pb-1 text-sm text-muted-foreground">{t.per}</span>}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{t.desc}</div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {t.feats.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/app"
                className={`mt-6 flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  t.featured
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "glass hover:bg-white/10"
                }`}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ -------------------------------- */
function FAQ() {
  const qs = [
    { q: "Does it work without internet?", a: "Yes. RouteLedger is offline-first. Everything syncs once you're back online." },
    { q: "Can my customers see their bill?", a: "Yes — tap once to share a clean PDF on WhatsApp or SMS." },
    { q: "Do I need a fancy phone?", a: "No. RouteLedger runs smoothly on entry-level Android phones." },
    { q: "Is my data safe?", a: "All your customer data is encrypted and only accessible by you." },
  ];
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeader eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10 space-y-3">
          {qs.map((item) => (
            <details key={item.q} className="glass group rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                {item.q}
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Footer ----------------------------- */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary">
            <Truck className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-foreground">RouteLedger</span>
        </div>
        <div>© {new Date().getFullYear()} RouteLedger. All rights reserved.</div>
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-glow">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}
