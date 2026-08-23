export function BoxMascot({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <rect x="12" y="24" width="56" height="46" rx="10" fill="#E8B86D" />
      <rect x="12" y="24" width="56" height="14" rx="8" fill="#D7A45A" />
      <rect x="34" y="16" width="12" height="12" rx="3" fill="#C9924C" />
      <circle cx="32" cy="50" r="4.2" fill="#3A2A1A" />
      <circle cx="48" cy="50" r="4.2" fill="#3A2A1A" />
      <path d="M36 58c4 5 8 5 12 0" fill="none" stroke="#3A2A1A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="26" cy="54" r="3.4" fill="#F4A7B9" />
      <circle cx="54" cy="54" r="3.4" fill="#F4A7B9" />
    </svg>
  );
}

export function CloudBuddy({ className = "h-12 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 48" className={className} aria-hidden="true">
      <ellipse cx="28" cy="28" rx="18" ry="14" fill="#fff" />
      <ellipse cx="44" cy="26" rx="16" ry="13" fill="#fff" />
      <ellipse cx="36" cy="20" rx="14" ry="12" fill="#fff" />
      <circle cx="30" cy="24" r="2.2" fill="#3A2A1A" />
      <circle cx="42" cy="24" r="2.2" fill="#3A2A1A" />
      <path d="M32 30c3 3 7 3 10 0" fill="none" stroke="#3A2A1A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="26" cy="28" r="2" fill="#F4A7B9" />
      <circle cx="46" cy="28" r="2" fill="#F4A7B9" />
    </svg>
  );
}
