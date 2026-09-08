export function Sun({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="44"
      height="44"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.4" />
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={i}
          d={`M24 3V9`}
          transform={`rotate(${i * 30} 24 24)`}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
export function Arrow({
  direction = "right",
}: {
  direction?: "right" | "left" | "down" | "up-right";
}) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transform: `rotate(${{ right: 0, left: 180, down: 90, "up-right": -45 }[direction]}deg)`,
      }}
    >
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
