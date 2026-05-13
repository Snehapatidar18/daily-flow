import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Truck, Users, Wallet, MapPin, Bell, Plus, ChevronRight, CheckCircle2, Clock,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".d-stat", { y: 18, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" });
      gsap.from(".d-card", { y: 24, opacity: 0, duration: 0.7, delay: 0.2, stagger: 0.1, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { l: "Deliveries", v: 28, s: "/42", Icon: Truck, c: "from-primary to-primary-glow" },
    { l: "Pending", v: 14, Icon: Users, c: "from-yellow-500 to-orange-400" },
    { l: "Earnings", v: 3240, prefix: "₹", Icon: Wallet, c: "from-success to-emerald-400" },
    { l: "Distance", v: 12, suffix: " km", Icon: MapPin, c: "from-violet-500 to-fuchsia-500" },
  ];

  const upcoming = [
    { name: "Ravi Sharma", note: "2 L milk", amt: 120, time: "in 2 min", status: "next" },
    { name: "Anjali Patel", note: "1 L milk", amt: 60, time: "in 8 min", status: "due" },
    { name: "Sunita Joshi", note: "20 L water", amt: 80, time: "in 15 min", status: "due" },
    { name: "Vikram S.", note: "Newspaper", amt: 45, time: "Done · 7:24 AM", status: "done" },
  ];

  return (
    <div ref={ref} className="px-4 pt-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Good morning</p>
          <h1 className="mt-0.5 font-display text-xl font-bold">Suresh K.</h1>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full glass px-2.5 py-1 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-success/70" />
              <span className="relative h-2 w-2 rounded-full bg-success" />
            </span>
            On route · Sector 14
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="grid h-10 w-10 place-items-center rounded-xl glass">
            <Bell className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow">
            SK
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.l} className="d-stat glass rounded-2xl p-4">
            <div className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${s.c} shadow-glow`}>
              <s.Icon className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="mt-3 font-display text-2xl font-bold">
              <AnimatedCounter value={s.v} prefix={s.prefix} suffix={s.suffix} />
              {s.s && <span className="text-sm text-muted-foreground">{s.s}</span>}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Route progress */}
      <GlassCard className="d-card mt-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Today's route</div>
            <div className="text-xs text-muted-foreground">28 of 42 stops complete</div>
          </div>
          <div className="text-sm font-semibold text-success">66%</div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "66%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-success"
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-xl bg-gradient-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
            Continue route
          </button>
          <button className="rounded-xl glass px-4 py-2.5 text-sm font-medium">Pause</button>
        </div>
      </GlassCard>

      {/* Timeline */}
      <div className="d-card mt-5">
        <div className="mb-3 flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold">Today's customers</h3>
          <button className="text-xs text-primary-glow">See all</button>
        </div>
        <div className="space-y-2.5">
          {upcoming.map((u) => (
            <motion.div
              key={u.name}
              whileTap={{ scale: 0.98 }}
              className="glass flex items-center gap-3 rounded-2xl p-3.5"
            >
              <div
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                  u.status === "done"
                    ? "bg-success/15 text-success"
                    : u.status === "next"
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "bg-white/5 text-muted-foreground"
                }`}
              >
                {u.status === "done" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="truncate text-sm font-medium">{u.name}</div>
                  <div className="text-sm font-semibold">₹{u.amt}</div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="truncate">{u.note}</span>
                  <span>{u.time}</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-24 right-5 z-30 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow"
        aria-label="Quick add"
      >
        <Plus className="h-6 w-6 text-primary-foreground" strokeWidth={2.6} />
      </motion.button>
    </div>
  );
}
