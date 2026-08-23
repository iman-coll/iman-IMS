import { CmioCanvas, type BoxPct, type Hotspot } from "@/components/cmio";
import { CloudBuddy } from "@/components/mascot";
import { AppShell, useHydrateIMS } from "@/components/shell";
import { Badge, Button, Card, Modal } from "@/components/ui";
import { cn } from "@/lib/cn";
import { money, num } from "@/lib/format";
import { INDUSTRY_META, useIMS, useStats } from "@/lib/store";
import type { Industry } from "@/lib/types";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { Check, ShoppingCart, TriangleAlert, Boxes, Wallet } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

const INDUSTRIES: Industry[] = [
  "retail",
  "manufacturing",
  "healthcare",
  "food",
  "warehouse",
  "itam",
];

function Home() {
  const hydrated = useHydrateIMS();
  const debug =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("debug") === "1";
  const router = useRouter();
  const stats = useStats();
  const settings = useIMS((s) => s.settings);
  const [info, setInfo] = useState<{ title: string; body: string } | null>(null);
  const [search, setSearch] = useState("");

  const go = (to: string) => {
    router.history.push(to);
  };

  const hotspots: Hotspot[] = useMemo(
    () => [
      { id: "logo", left: 1.4, top: 1.6, width: 12.4, height: 8.8, label: "Home", onClick: () => go("/") },
      { id: "nav-dash", left: 1.6, top: 11.2, width: 12.0, height: 4.6, label: "Dashboard", onClick: () => go("/") },
      { id: "nav-items", left: 1.6, top: 16.0, width: 12.0, height: 4.4, label: "Items", onClick: () => go("/items") },
      { id: "nav-orders", left: 1.6, top: 20.6, width: 12.0, height: 4.4, label: "Orders", onClick: () => go("/orders") },
      { id: "nav-suppliers", left: 1.6, top: 25.2, width: 12.0, height: 4.4, label: "Suppliers", onClick: () => go("/suppliers") },
      { id: "nav-locations", left: 1.6, top: 29.8, width: 12.0, height: 4.4, label: "Locations", onClick: () => go("/locations") },
      { id: "nav-reports", left: 1.6, top: 34.4, width: 12.0, height: 4.4, label: "Reports", onClick: () => go("/reports") },
      { id: "nav-alerts", left: 1.6, top: 39.0, width: 12.0, height: 4.4, label: "Alerts", onClick: () => go("/alerts") },
      { id: "nav-settings", left: 1.6, top: 43.6, width: 12.0, height: 4.6, label: "Settings", onClick: () => go("/settings") },
      { id: "qa-add", left: 1.8, top: 54.6, width: 11.6, height: 4.2, label: "Add item", onClick: () => go("/items") },
      { id: "qa-order", left: 1.8, top: 59.2, width: 11.6, height: 4.2, label: "New order", onClick: () => go("/orders") },
      { id: "qa-recv", left: 1.8, top: 63.8, width: 11.6, height: 4.2, label: "Receive stock", onClick: () => go("/stock") },
      { id: "qa-rep", left: 1.8, top: 68.4, width: 11.6, height: 4.2, label: "View reports", onClick: () => go("/reports") },
      { id: "mascot", left: 1.5, top: 76.5, width: 12.2, height: 20.5, label: "Stock smart", onClick: () => setInfo({ title: "Stock smart, business smarter", body: "Every click on this picture is live. Sidebar, KPIs, industry cards, features and benefits all open real inventory tools." }) },
      { id: "bell", left: 79.6, top: 2.0, width: 3.6, height: 6.2, label: "Notifications", onClick: () => go("/alerts") },
      { id: "admin", left: 83.6, top: 1.8, width: 14.4, height: 6.6, label: "Admin settings", onClick: () => go("/settings") },
      { id: "kpi-items", left: 49.0, top: 9.4, width: 12.2, height: 9.4, label: "Total items", onClick: () => go("/items") },
      { id: "kpi-low", left: 61.6, top: 9.4, width: 11.4, height: 9.4, label: "Low stock", onClick: () => go("/alerts") },
      { id: "kpi-orders", left: 73.4, top: 9.4, width: 11.2, height: 9.4, label: "Orders today", onClick: () => go("/orders") },
      { id: "kpi-value", left: 85.0, top: 9.4, width: 13.0, height: 9.4, label: "Total value", onClick: () => go("/reports") },
      { id: "retail", left: 14.6, top: 20.2, width: 27.2, height: 27.6, label: "Retail & E-commerce", onClick: () => go("/industries/retail") },
      { id: "mfg", left: 42.6, top: 20.2, width: 27.0, height: 27.6, label: "Manufacturing", onClick: () => go("/industries/manufacturing") },
      { id: "health", left: 70.4, top: 20.2, width: 27.4, height: 27.6, label: "Healthcare", onClick: () => go("/industries/healthcare") },
      { id: "food", left: 14.6, top: 49.0, width: 27.2, height: 26.8, label: "Food & Hospitality", onClick: () => go("/industries/food") },
      { id: "wh", left: 42.6, top: 49.0, width: 27.0, height: 26.8, label: "Warehousing", onClick: () => go("/industries/warehouse") },
      { id: "itam", left: 70.4, top: 49.0, width: 27.4, height: 26.8, label: "ITAM", onClick: () => go("/industries/itam") },
      { id: "feat-rt", left: 15.0, top: 79.4, width: 9.6, height: 16.8, label: "Real-time tracking", onClick: () => setInfo({ title: "Real-time tracking", body: "Stock counts update the instant an item is sold, shipped, received, cooked, or assembled. The numbers on this dashboard are live." }) },
      { id: "feat-ar", left: 25.0, top: 79.4, width: 9.6, height: 16.8, label: "Automated reordering", onClick: () => setInfo({ title: "Automated reordering", body: "When on-hand quantity drops to the reorder point, Stocklot raises an alert and can draft a purchase order to the usual supplier." }) },
      { id: "feat-di", left: 35.0, top: 79.4, width: 9.6, height: 16.8, label: "Data integration", onClick: () => setInfo({ title: "Data integration", body: "Channels, locations, recipes, BOMs and licenses share one stock ledger — no spreadsheet round-trips." }) },
      { id: "feat-df", left: 45.0, top: 79.4, width: 9.6, height: 16.8, label: "Demand forecasting", onClick: () => go("/reports") },
      { id: "ben-so", left: 56.6, top: 79.4, width: 9.6, height: 16.8, label: "Prevent stockouts", onClick: () => go("/alerts") },
      { id: "ben-ov", left: 66.6, top: 79.4, width: 9.6, height: 16.8, label: "Avoid overstock", onClick: () => go("/reports") },
      { id: "ben-tm", left: 76.6, top: 79.4, width: 9.6, height: 16.8, label: "Save time", onClick: () => setInfo({ title: "Save time", body: "Barcode scan, recipe deduct, cycle count and JIT suggestions replace clipboard counts." }) },
      { id: "ben-cost", left: 86.6, top: 79.4, width: 10.4, height: 16.8, label: "Lower costs", onClick: () => go("/reports") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const kpiBox = (left: number): BoxPct => ({ left, top: 13.05, width: 8.6, height: 4.4 });

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;
    router.history.push(`/items?q=${encodeURIComponent(q)}`);
  }

  return (
    <>
      <div className="hidden min-h-screen flex-col bg-[#efe8fb] p-2 lg:flex xl:p-3">
        <div className="mx-auto w-full max-w-[1560px]">
          {hydrated ? (
            <CmioCanvas
              src="/images/dashboard.jpg"
              alt="Inventory Management System visual dashboard"
              hotspots={hotspots}
              debug={debug}
              patches={[
                {
                  id: "search",
                  box: { left: 53.6, top: 2.4, width: 24.6, height: 5.4 },
                  className: "rounded-full",
                  node: (
                    <form onSubmit={onSearchSubmit} className="h-full w-full">
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search items, orders, suppliers…"
                        className="h-full w-full rounded-full border-0 bg-white px-4 text-[13px] font-semibold text-fg outline-none"
                      />
                    </form>
                  ),
                },
                {
                  id: "n-items",
                  box: kpiBox(50.2),
                  className: "bg-white",
                  node: <KpiPatch value={num(stats.totalUnits)} />,
                },
                {
                  id: "n-low",
                  box: kpiBox(62.6),
                  className: "bg-white",
                  node: <KpiPatch value={num(stats.lowStock)} className="text-danger" />,
                },
                {
                  id: "n-ord",
                  box: kpiBox(74.4),
                  className: "bg-white",
                  node: <KpiPatch value={num(stats.ordersToday)} />,
                },
                {
                  id: "n-val",
                  box: { left: 86.2, top: 12.6, width: 10.4, height: 4.6 },
                  className: "bg-white",
                  node: <KpiPatch value={money(stats.totalValue, settings.currency)} className="text-[clamp(14px,1.45vw,26px)]" />,
                },
              ]}
            />
          ) : (
            <div className="cmio-stage animate-pulse rounded-[28px] bg-surface" />
          )}
          <p className="mt-2 text-center text-xs font-bold text-muted">
            Click any control on the picture — sidebar, KPIs, industry cards, features and benefits are live.
          </p>
        </div>
      </div>

      <div className="lg:hidden">
        <AppShell>
          <LiveDashboard onInfo={setInfo} />
        </AppShell>
      </div>

      <Modal open={!!info} title={info?.title ?? ""} onClose={() => setInfo(null)}>
        <p className="text-sm leading-relaxed text-muted">{info?.body}</p>
        <div className="mt-4">
          <Button onClick={() => setInfo(null)}>Got it</Button>
        </div>
      </Modal>
    </>
  );
}

function KpiPatch({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn("font-display text-[clamp(16px,1.7vw,30px)] font-semibold leading-none text-fg tabular", className)}>
      {value}
    </span>
  );
}

function LiveDashboard({ onInfo }: { onInfo: (v: { title: string; body: string }) => void }) {
  const stats = useStats();
  const settings = useIMS((s) => s.settings);
  const navigate = useNavigate();
  const kpis = [
    { label: "Total items", value: num(stats.totalUnits), icon: Boxes, tone: "text-fg", to: "/items" },
    { label: "Low stock", value: num(stats.lowStock), icon: TriangleAlert, tone: "text-danger", to: "/alerts" },
    { label: "Orders today", value: num(stats.ordersToday), icon: ShoppingCart, tone: "text-pink", to: "/orders" },
    { label: "Total value", value: money(stats.totalValue, settings.currency), icon: Wallet, tone: "text-green", to: "/reports" },
  ] as const;

  return (
    <div className="grid gap-4">
      <section className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
        <CloudBuddy className="h-14 w-20 shrink-0" />
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Welcome back, Admin</h1>
          <p className="text-sm text-muted">Here is what is happening with your inventory today.</p>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-3">
        {kpis.map((k) => (
          <button
            key={k.label}
            onClick={() => navigate({ to: k.to })}
            className="rounded-2xl border border-border bg-surface p-3 text-left shadow-[var(--shadow-card)]"
          >
            <p className="text-xs font-bold text-muted">{k.label}</p>
            <p className={cn("mt-1 font-display text-2xl font-semibold tabular", k.tone)}>{k.value}</p>
          </button>
        ))}
      </section>
      <section className="grid gap-3">
        {INDUSTRIES.map((id) => {
          const m = INDUSTRY_META[id];
          return (
            <Card key={id} className="p-0 overflow-hidden">
              <button
                className="w-full p-4 text-left"
                onClick={() => navigate({ to: "/industries/$slug", params: { slug: id } })}
              >
                <Badge tone={toneFor(id)}>{m.title}</Badge>
                <p className="mt-2 text-sm font-semibold text-muted">{m.blurb}</p>
                <ul className="mt-2 grid gap-1">
                  {m.features.slice(0, 3).map((f) => (
                    <li key={f.key} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-green" />
                      <span className="font-bold">{f.title}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-3 inline-flex rounded-full px-3 py-1 text-xs font-extrabold text-white" style={{ background: m.color }}>
                  View details
                </span>
              </button>
            </Card>
          );
        })}
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-semibold">Key features</h2>
          <button className="mt-2 block text-left text-sm font-bold text-primary" onClick={() => onInfo({ title: "Real-time tracking", body: "Counts update the moment stock moves." })}>
            Real-time tracking
          </button>
          <button className="mt-1 block text-left text-sm font-bold text-primary" onClick={() => navigate({ to: "/alerts" })}>
            Automated reordering
          </button>
        </Card>
        <Card>
          <h2 className="font-display text-lg font-semibold">Main benefits</h2>
          <p className="mt-2 text-sm font-semibold text-muted">Prevent stockouts, avoid overstock, save time, lower holding costs.</p>
          <Button className="mt-3" onClick={() => navigate({ to: "/reports" })}>
            Open reports
          </Button>
        </Card>
      </section>
    </div>
  );
}

function toneFor(id: Industry): "pink" | "blue" | "green" | "orange" | "primary" | "teal" {
  return {
    retail: "pink",
    manufacturing: "blue",
    healthcare: "green",
    food: "orange",
    warehouse: "primary",
    itam: "teal",
  }[id] as "pink" | "blue" | "green" | "orange" | "primary" | "teal";
}
