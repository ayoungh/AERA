export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow arrow--diagonal" : "arrow"}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M4 12H20M14 6L20 12L14 18" />
    </svg>
  );
}
