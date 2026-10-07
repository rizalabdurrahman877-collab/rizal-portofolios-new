export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="ambient-background pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="ambient-background__aurora" />
      <div className="ambient-background__glow ambient-background__glow--blue" />
      <div className="ambient-background__glow ambient-background__glow--violet" />
      <div className="ambient-background__grid" />
      <div className="ambient-background__streak ambient-background__streak--one" />
      <div className="ambient-background__streak ambient-background__streak--two" />
      <div className="ambient-background__particles">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="ambient-background__vignette" />
    </div>
  );
}