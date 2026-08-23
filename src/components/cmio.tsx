import { cn } from "@/lib/cn";
import type { CSSProperties, ReactNode } from "react";

export type BoxPct = { left: number; top: number; width: number; height: number };

export type Hotspot = BoxPct & {
  id: string;
  label: string;
  onClick: () => void;
};

function boxStyle(b: BoxPct): CSSProperties {
  return {
    left: `${b.left}%`,
    top: `${b.top}%`,
    width: `${b.width}%`,
    height: `${b.height}%`,
  };
}

export function CmioCanvas({
  src,
  alt,
  hotspots,
  patches,
  debug,
  className,
}: {
  src: string;
  alt: string;
  hotspots: Hotspot[];
  patches?: { id: string; box: BoxPct; className?: string; node: ReactNode }[];
  debug?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("cmio-stage overflow-hidden rounded-[28px] bg-surface shadow-[var(--shadow-card)]", className)}>
      <img className="cmio-art" src={src} alt={alt} draggable={false} />
      {patches?.map((p) => (
        <div key={p.id} className={cn("cmio-patch", debug && "ring-2 ring-red-500", p.className)} style={boxStyle(p.box)}>
          {p.node}
        </div>
      ))}
      {hotspots.map((h) => (
        <button
          key={h.id}
          type="button"
          className={cn("cmio-hotspot", debug && "debug")}
          style={boxStyle(h)}
          aria-label={h.label}
          title={h.label}
          onClick={h.onClick}
        />
      ))}
    </div>
  );
}
