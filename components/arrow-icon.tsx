export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`size-[1.2rem] overflow-visible ${
        diagonal
          ? "-rotate-45 transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-1"
          : "ml-auto"
      }`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        className="stroke-current stroke-[1.25] [stroke-linecap:round] [stroke-linejoin:round]"
        d="M4 12H20M14 6L20 12L14 18"
      />
    </svg>
  );
}
