import { BoxMascot } from "@/components/mascot";
import { cn } from "@/lib/cn";
import { useAlerts, useIMS } from "@/lib/store";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  MapPin,
  Menu,
  Plus,
  Settings,
  ShoppingCart,
  Truck,
  Warehouse,
  X,
  BarChart3,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/items", label: "Items", icon: Boxes },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/suppliers", label: "Suppliers", icon: Truck },
  { to: "/locations", label: "Locations", icon: MapPin },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function useHydrateIMS() {
  const hydrate = useIMS((s) => s.hydrate);
  const hydrated = useIMS((s) => s.hydrated);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return hydrated;
}

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const hydrated = useHydrateIMS();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const unread = useAlerts().filter((a) => !a.read).length;
  const router = useRouter();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const items = useIMS.getState().items.filter(
      (i) =>
        i.name.toLowerCase().includes(query) ||
        i.sku.toLowerCase().includes(query) ||
        i.barcode.includes(query),
    );
    return items.slice(0, 6);
  }, [q, hydrated]);

  return (
    <div className="min-h-screen sparkle-bg text-fg">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-[250px] border-r border-border bg-sidebar p-4 transition-transform duration-200 lg:static lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
              <BoxMascot className="h-11 w-11" />
              <span>
                <span className="block font-display text-lg font-bold leading-none text-primary">IMS</span>
                <span className="text-[11px] font-bold text-muted">Inventory System</span>
              </span>
            </Link>
            <button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="size-5" />
            </button>
          </div>
          <nav className="grid gap-1">
            {NAV.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors",
                    active ? "bg-primary text-primary-fg" : "text-fg/80 hover:bg-bg",
                  )}
                >
                  <Icon className="size-4" />
                  {n.label}
                  {n.to === "/alerts" && unread > 0 ? (
                    <span className="ml-auto rounded-full bg-pink px-1.5 text-[10px] text-white">{unread}</span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div className="mt-5 rounded-2xl border border-border bg-linear-to-br from-[#fff0f6] to-[#f2efff] p-3">
            <p className="text-xs font-extrabold text-fg">Quick actions</p>
            <div className="mt-2 grid gap-1.5">
              <Link to="/items" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm font-bold hover:bg-bg">
                <Plus className="size-4 text-primary" /> Add item
              </Link>
              <Link to="/orders" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm font-bold hover:bg-bg">
                <ClipboardList className="size-4 text-pink" /> New order
              </Link>
              <Link to="/stock" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm font-bold hover:bg-bg">
                <Warehouse className="size-4 text-blue" /> Receive stock
              </Link>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-surface p-3">
            <BoxMascot className="h-12 w-12" />
            <p className="text-xs font-bold leading-snug text-muted">
              Stock is happy.
              <span className="mt-0.5 block text-fg">All systems running smoothly.</span>
            </p>
          </div>
        </aside>

        {open ? (
          <button className="fixed inset-0 z-30 bg-[#261e3d]/30 lg:hidden" aria-label="Close menu" onClick={() => setOpen(false)} />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-bg-tint/90 px-4 py-3 backdrop-blur-sm">
            <button className="rounded-xl border border-border bg-surface p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="size-5" />
            </button>
            <div className="relative min-w-0 flex-1">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search items, orders, suppliers…"
                className="w-full rounded-2xl border border-border bg-surface py-2.5 pl-4 pr-10 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/40"
              />
              {results.length > 0 ? (
                <div className="absolute top-[110%] left-0 z-30 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
                  {results.map((r) => (
                    <button
                      key={r.id}
                      className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-bold hover:bg-bg"
                      onClick={() => {
                        setQ("");
                        router.history.push(`/items?q=${encodeURIComponent(r.sku)}`);
                      }}
                    >
                      <span>{r.name}</span>
                      <span className="text-xs text-muted">{r.sku}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <Link to="/alerts" className="relative rounded-2xl border border-border bg-surface p-2.5" aria-label="Alerts">
              <Bell className="size-5" />
              {unread > 0 ? (
                <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-pink px-1 text-[10px] font-extrabold text-white">
                  {unread}
                </span>
              ) : null}
            </Link>
            <Link to="/settings" className="hidden items-center gap-2 rounded-2xl border border-border bg-surface py-1.5 pr-3 pl-1.5 sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffd8e8] text-sm font-extrabold">A</span>
              <span className="leading-tight">
                <span className="block text-sm font-extrabold">Admin</span>
                <span className="text-[11px] font-bold text-muted">Administrator</span>
              </span>
            </Link>
          </header>
          <main className="flex-1 p-4 sm:p-6">
            {title ? <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight">{title}</h1> : null}
            {hydrated ? children : <div className="h-40 animate-pulse rounded-2xl bg-surface" />}
          </main>
        </div>
      </div>
    </div>
  );
}
