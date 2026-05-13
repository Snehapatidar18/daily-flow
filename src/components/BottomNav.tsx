import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Users, Route as RouteIcon, Receipt, Settings } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { to: "/app", label: "Home", icon: LayoutDashboard },
  { to: "/app/customers", label: "Customers", icon: Users },
  { to: "/app/tracking", label: "Route", icon: RouteIcon },
  { to: "/app/billing", label: "Billing", icon: Receipt },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pt-1">
      <div className="glass-strong mx-auto flex max-w-md items-center justify-between rounded-2xl px-2 py-2 shadow-glass">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className="relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5"
            >
              {active && (
                <motion.div
                  layoutId="bnav-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-primary opacity-90"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon
                className={`relative z-10 h-5 w-5 ${active ? "text-primary-foreground" : "text-muted-foreground"}`}
                strokeWidth={active ? 2.4 : 1.8}
              />
              <span
                className={`relative z-10 text-[10px] font-medium ${active ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
