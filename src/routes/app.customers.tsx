import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, ChevronDown, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/app/customers")({
  component: CustomersPage,
});

const customers = [
  { name: "Ravi Sharma", product: "Milk · 2 L", due: 120, status: "delivered", route: "Sector 14" },
  { name: "Anjali Patel", product: "Milk · 1 L", due: 60, status: "pending", route: "Sector 14" },
  { name: "Sunita Joshi", product: "Water · 20 L", due: 80, status: "pending", route: "Sector 18" },
  { name: "Vikram Singh", product: "Newspaper", due: 45, status: "delivered", route: "Sector 18" },
  { name: "Meena Rao", product: "Milk · 1 L", due: 1240, status: "overdue", route: "Sector 22" },
  { name: "Arjun Mehta", product: "Water · 40 L", due: 160, status: "pending", route: "Sector 22" },
];

const filters = ["All routes", "Sector 14", "Sector 18", "Sector 22"];

function CustomersPage() {
  const [filter, setFilter] = useState("All routes");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const list = customers.filter(
    (c) =>
      (filter === "All routes" || c.route === filter) &&
      c.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold">Customers</h1>
        <span className="text-xs text-muted-foreground">{list.length} active</span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="glass flex flex-1 items-center gap-2 rounded-2xl px-3.5 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customer"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              filter === f
                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                : "glass text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2.5">
        {list.map((c) => {
          const isOpen = expanded === c.name;
          return (
            <motion.div key={c.name} layout className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => setExpanded(isOpen ? null : c.name)}
                className="flex w-full items-center gap-3 p-3.5 text-left"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow">
                  {c.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="truncate text-sm font-semibold">{c.name}</div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        c.status === "delivered"
                          ? "bg-success/15 text-success"
                          : c.status === "overdue"
                          ? "bg-destructive/15 text-destructive"
                          : "bg-yellow-400/15 text-yellow-300"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{c.product}</span>
                    <span className="font-semibold text-foreground">₹{c.due}</span>
                  </div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-white/5"
                  >
                    <div className="space-y-2 p-3.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-primary-glow" /> {c.route}
                      </div>
                      <div className="flex gap-2">
                        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-success py-2 text-xs font-semibold text-success-foreground">
                          Mark delivered
                        </button>
                        <button className="grid h-9 w-9 place-items-center rounded-xl glass">
                          <Phone className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-24 right-5 z-30 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow"
        aria-label="Add customer"
      >
        <Plus className="h-6 w-6 text-primary-foreground" strokeWidth={2.6} />
      </motion.button>
    </div>
  );
}
