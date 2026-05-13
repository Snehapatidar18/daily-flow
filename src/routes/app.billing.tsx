import { createFileRoute } from "@tanstack/react-router";
import { Download, Share2, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export const Route = createFileRoute("/app/billing")({
  component: BillingPage,
});

const data = [
  { m: "Mar", v: 32000 }, { m: "Apr", v: 38000 }, { m: "May", v: 41200 },
  { m: "Jun", v: 39800 }, { m: "Jul", v: 47500 }, { m: "Aug", v: 52300 },
];

const dues = [
  { name: "Meena Rao", amt: 1240, days: 12 },
  { name: "Karan Verma", amt: 860, days: 7 },
  { name: "Pooja D.", amt: 540, days: 4 },
];

const invoices = [
  { id: "INV-1042", name: "Ravi Sharma", date: "Aug 1", amt: 3200, status: "Paid" },
  { id: "INV-1041", name: "Anjali Patel", date: "Aug 1", amt: 1800, status: "Paid" },
  { id: "INV-1040", name: "Meena Rao", date: "Jul 28", amt: 1240, status: "Due" },
  { id: "INV-1039", name: "Sunita Joshi", date: "Jul 28", amt: 2400, status: "Paid" },
];

function BillingPage() {
  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold">Billing</h1>
        <button className="inline-flex items-center gap-1.5 rounded-xl glass px-3 py-1.5 text-xs font-medium">
          <Download className="h-3.5 w-3.5" /> Export
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground">This month</div>
          <div className="mt-1 font-display text-2xl font-bold text-gradient">
            <AnimatedCounter value={52300} prefix="₹" />
          </div>
          <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-success">
            <TrendingUp className="h-3 w-3" /> +10%
          </div>
        </GlassCard>
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground">Pending</div>
          <div className="mt-1 font-display text-2xl font-bold">
            <AnimatedCounter value={2640} prefix="₹" />
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">3 customers</div>
        </GlassCard>
      </div>

      {/* Chart */}
      <GlassCard className="mt-4 p-5" hover={false}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Revenue</div>
            <div className="text-xs text-muted-foreground">Last 6 months</div>
          </div>
        </div>
        <div className="mt-3 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.22 280)" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="oklch(0.7 0.22 280)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.7 0.03 260)", fontSize: 11 }} />
              <Tooltip
                cursor={{ stroke: "oklch(1 0 0 / 0.1)" }}
                contentStyle={{
                  background: "oklch(0.22 0.04 265)", border: "1px solid oklch(1 0 0 / 0.1)",
                  borderRadius: 12, fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="v" stroke="oklch(0.7 0.22 280)" strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Due cards */}
      <div className="mt-5">
        <div className="mb-2.5 flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold">Pending payments</h3>
          <button className="text-xs text-primary-glow">Send all</button>
        </div>
        <div className="space-y-2.5">
          {dues.map((d) => (
            <div key={d.name} className="glass flex items-center justify-between rounded-2xl p-3.5">
              <div className="min-w-0">
                <div className="text-sm font-medium">{d.name}</div>
                <div className="text-xs text-muted-foreground">Due {d.days} days</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right text-sm font-semibold">₹{d.amt}</div>
                <button className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-success">
                  <Share2 className="h-4 w-4 text-success-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="mt-5">
        <div className="mb-2.5 flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold">Invoices</h3>
        </div>
        <GlassCard className="overflow-hidden p-0" hover={false}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id} className="border-t border-white/5">
                  <td className="px-4 py-3">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-xs text-muted-foreground">{i.id} · {i.date}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold">₹{i.amt}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        i.status === "Paid"
                          ? "bg-success/15 text-success"
                          : "bg-yellow-400/15 text-yellow-300"
                      }`}
                    >
                      {i.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </div>
  );
}
