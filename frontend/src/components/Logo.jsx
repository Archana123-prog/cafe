import { CAFE } from "../config";

export default function Logo({ size = 44 }) {
  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={`${CAFE.name} logo`}>
        <rect width="64" height="64" rx="16" fill="#2a1608" />
        <path d="M18 28h26v10a13 13 0 0 1-13 13h0a13 13 0 0 1-13-13z" fill="#f7c948" />
        <path d="M44 31h3a5 5 0 0 1 0 10h-4" fill="none" stroke="#f7c948" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M25 21c-2-3 2-4 0-8M32 21c-2-3 2-4 0-8M39 21c-2-3 2-4 0-8" fill="none" stroke="#e8472b" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <span className="text-2xl font-extrabold tracking-tight text-[#2a1608]">{CAFE.name}</span>
    </div>
  );
}
