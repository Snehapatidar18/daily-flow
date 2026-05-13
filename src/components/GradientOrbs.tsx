export function GradientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-32 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px] animate-float" />
      <div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-success/20 blur-[140px] animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-primary-glow/25 blur-[120px] animate-float"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
