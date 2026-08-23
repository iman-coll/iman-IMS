import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "soft" | "pink" | "blue" | "green" | "orange" | "teal";
}) {
  const map: Record<string, string> = {
    primary: "bg-primary text-primary-fg shadow-[var(--shadow-pop)] hover:brightness-105",
    ghost: "bg-surface text-primary border border-border hover:bg-bg-tint",
    danger: "bg-danger text-white hover:brightness-105",
    soft: "bg-bg-tint text-fg border border-border hover:bg-surface",
    pink: "bg-pink text-white hover:brightness-105",
    blue: "bg-blue text-white hover:brightness-105",
    green: "bg-green text-white hover:brightness-105",
    orange: "bg-orange text-white hover:brightness-105",
    teal: "bg-teal text-white hover:brightness-105",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-[transform,filter] duration-150 active:scale-[0.98] disabled:opacity-50",
        map[variant],
        className,
      )}
      {...props}
    />
  );
}

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("grid gap-1.5 text-sm font-semibold text-fg", className)}>
      <span className="text-muted">{label}</span>
      {children}
    </label>
  );
}

const control =
  "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-fg outline-none transition-shadow focus:ring-2 focus:ring-primary/40";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, props.className)} {...props} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(control, props.className)} {...props} />;
}

export function Badge({
  children,
  tone = "primary",
}: {
  children: ReactNode;
  tone?: "primary" | "pink" | "blue" | "green" | "orange" | "teal" | "danger" | "muted";
}) {
  const map: Record<string, string> = {
    primary: "bg-primary/12 text-primary",
    pink: "bg-pink/12 text-pink",
    blue: "bg-blue/12 text-blue",
    green: "bg-green/15 text-green",
    orange: "bg-orange/15 text-orange",
    teal: "bg-teal/15 text-teal",
    danger: "bg-danger/12 text-danger",
    muted: "bg-border text-muted",
  };
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide", map[tone])}>
      {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-card)]", className)}>
      {children}
    </div>
  );
}

export function Modal({
  open,
  title,
  onClose,
  children,
  wide,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#261e3d]/45 p-3 sm:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          "max-h-[90vh] w-full overflow-auto rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]",
          wide ? "max-w-3xl" : "max-w-lg",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 id="modal-title" className="font-display text-xl font-semibold">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-bg-tint px-2.5 py-1 text-sm font-bold text-muted"
            aria-label="Close"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-bg-tint px-6 py-10 text-center">
      <p className="font-display text-lg font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  );
}
