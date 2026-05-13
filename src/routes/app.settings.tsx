import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Moon, Sun, Bell, Mic, Globe, User, ChevronRight, LogOut, Shield,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 rounded-full transition ${
        on ? "bg-gradient-primary shadow-glow" : "bg-white/10"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}

function Row({
  Icon, title, desc, right,
}: { Icon: any; title: string; desc?: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5">
        <Icon className="h-4 w-4 text-primary-glow" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{title}</div>
        {desc && <div className="text-xs text-muted-foreground">{desc}</div>}
      </div>
      {right}
    </div>
  );
}

function SettingsPage() {
  const [dark, setDark] = useState(true);
  const [notif, setNotif] = useState(true);
  const [voice, setVoice] = useState(false);
  const [lang, setLang] = useState("English");

  return (
    <div className="px-4 pt-6">
      <h1 className="font-display text-xl font-bold">Settings</h1>

      {/* Profile */}
      <GlassCard className="mt-4 flex items-center gap-3 p-4" hover={false}>
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-base font-bold text-primary-foreground shadow-glow">
          SK
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold">Suresh Kumar</div>
          <div className="text-xs text-muted-foreground">+91 98765 43210 · Pro plan</div>
        </div>
        <button className="grid h-9 w-9 place-items-center rounded-xl glass">
          <ChevronRight className="h-4 w-4" />
        </button>
      </GlassCard>

      {/* Preferences */}
      <h3 className="mb-2 mt-6 px-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Preferences
      </h3>
      <GlassCard className="overflow-hidden p-0" hover={false}>
        <Row
          Icon={dark ? Moon : Sun}
          title="Dark mode"
          desc="Easy on the eyes during early routes"
          right={<Toggle on={dark} onChange={setDark} />}
        />
        <div className="border-t border-white/5" />
        <Row
          Icon={Bell}
          title="Notifications"
          desc="Delivery reminders & payment alerts"
          right={<Toggle on={notif} onChange={setNotif} />}
        />
        <div className="border-t border-white/5" />
        <Row
          Icon={Mic}
          title="Voice assistant"
          desc="Add deliveries hands-free"
          right={<Toggle on={voice} onChange={setVoice} />}
        />
        <div className="border-t border-white/5" />
        <Row
          Icon={Globe}
          title="Language"
          right={
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="rounded-xl glass px-2.5 py-1.5 text-xs"
            >
              {["English", "हिंदी", "मराठी", "தமிழ்"].map((l) => (
                <option key={l} className="bg-card text-foreground">{l}</option>
              ))}
            </select>
          }
        />
      </GlassCard>

      <h3 className="mb-2 mt-6 px-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Account
      </h3>
      <GlassCard className="overflow-hidden p-0" hover={false}>
        <Row Icon={User} title="Account details" right={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
        <div className="border-t border-white/5" />
        <Row Icon={Shield} title="Privacy & security" right={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
      </GlassCard>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl glass py-3.5 text-sm font-medium text-destructive">
        <LogOut className="h-4 w-4" /> Sign out
      </button>

      <div className="mt-6 text-center text-[11px] text-muted-foreground">RouteLedger · v1.0.0</div>
    </div>
  );
}
