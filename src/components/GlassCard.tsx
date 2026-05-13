import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type Props = HTMLMotionProps<"div"> & { hover?: boolean };

export const GlassCard = forwardRef<HTMLDivElement, Props>(
  ({ className, hover = true, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      whileHover={hover ? { y: -3, transition: { duration: 0.25 } } : undefined}
      className={cn(
        "glass rounded-2xl p-5 shadow-glass transition-shadow",
        hover && "hover:shadow-glow",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  ),
);
GlassCard.displayName = "GlassCard";
