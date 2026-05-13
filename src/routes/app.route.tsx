import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, X, CheckCircle2, Phone } from "lucide-react";

export const Route = createFileRoute("/app")({
  component: RoutePage,
});

function RoutePage() {
  const [popup, setPopup] = useState(true);
  const [delivered, setDelivered] = useState(false);

  return (
    <div className="relative h-[calc(100vh-7rem)]">
      {/* Map */}
      <div className="absolute inset-0 grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-success/10" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 700" preserveAspectRatio="none">
          <path d="M30 650 C 100 500, 60 380, 200 300 S 360 120, 380 30"
            stroke="oklch(0.7 0.22 280)" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="2 8" fill="none" opacity="0.7"/>
          <path d="M30 650 C 100 500, 60 380, 200 300"
            stroke="oklch(0.72 0.18 150)" strokeWidth="3" strokeLinecap="round" fill="none" />
          {[
            [60, 560], [120, 440], [200, 300], [290, 200], [360, 80],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill={i < 2 ? "oklch(0.72 0.18 150)" : "oklch(0.7 0.22 280)"} />
            </g>
          ))}
        </svg>

        {/* Driver pulse */}
        <div className="absolute" style={{ left: "calc(50% - 20px)", top: "42%" }}>
          <div className="relative grid h-10 w-10 place-items-center">
            <span className="absolute h-10 w-10 rounded-full bg-primary/40 pulse-ring" />
            <div className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-primary shadow-glow">
              <Navigation className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div className="absolute inset-x-3 top-3 z-10 flex items-center gap-2">
        <div className="glass-strong flex flex-1 items-center gap-3 rounded-2xl px-4 py-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-success">
            <MapPin className="h-4 w-4 text-success-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs text-muted-foreground">Next stop</div>
            <div className="truncate text-sm font-semibold">Anjali Patel · House 14</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">ETA</div>
            <div className="text-sm font-semibold text-success">2 min</div>
          </div>
        </div>
      </div>

      {/* Progress ring */}
      <div className="absolute right-3 top-24 z-10">
        <div className="glass relative grid h-16 w-16 place-items-center rounded-full">
          <svg className="absolute inset-0" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" stroke="oklch(1 0 0 / 0.1)" strokeWidth="4" fill="none" />
            <circle
              cx="32" cy="32" r="28" stroke="oklch(0.72 0.18 150)" strokeWidth="4" fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`} strokeDashoffset={`${2 * Math.PI * 28 * (1 - 0.66)}`}
              strokeLinecap="round" transform="rotate(-90 32 32)"
            />
          </svg>
          <div className="text-xs font-bold">66%</div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="absolute inset-x-3 bottom-3 z-10">
        <div className="glass-strong rounded-2xl p-4 shadow-glass">
          <button className="w-full rounded-xl bg-gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            End delivery route
          </button>
        </div>
      </div>

      {/* Auto-detect popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="absolute inset-x-3 bottom-24 z-20"
          >
            <div className="glass-strong relative rounded-2xl p-5 shadow-glow">
              <button
                onClick={() => setPopup(false)}
                className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full glass"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-primary-glow">
                Auto-detected · Customer nearby
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-base font-bold text-primary-foreground shadow-glow">
                  AP
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base font-semibold">Anjali Patel</div>
                  <div className="text-xs text-muted-foreground">1 L milk · ₹60</div>
                </div>
                <button className="grid h-10 w-10 place-items-center rounded-xl glass">
                  <Phone className="h-4 w-4 text-primary-glow" />
                </button>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { setDelivered(true); setTimeout(() => { setDelivered(false); setPopup(false); }, 1400); }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-success py-3 text-sm font-bold text-success-foreground"
              >
                {delivered ? <><CheckCircle2 className="h-5 w-5" /> Delivered!</> : "Mark delivered"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
