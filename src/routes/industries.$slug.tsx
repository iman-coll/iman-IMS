import { AppShell } from "@/components/shell";
import { Badge, Button, Card, Field, Input, Select } from "@/components/ui";
import { daysUntil, money, num } from "@/lib/format";
import { INDUSTRY_META, industryOf, useIMS } from "@/lib/store";
import type { Channel, Industry, Item } from "@/lib/types";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/industries/$slug")({
  component: IndustryPage,
});

function IndustryPage() {
  const { slug } = Route.useParams();
  const industry = industryOf(slug);
  if (!industry) {
    return (
      <AppShell title="Unknown module">
        <Link to="/" className="font-bold text-primary">
          Back to dashboard
        </Link>
      </AppShell>
    );
  }
  const meta = INDUSTRY_META[industry];
  const [tab, setTab] = useState(meta.features[0]?.key ?? "");
  const allItems = useIMS((s) => s.items);
  const items = useMemo(() => allItems.filter((i) => i.industry === industry), [allItems, industry]);

  return (
    <AppShell>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge tone={tone(industry)}>{meta.title}</Badge>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">{meta.title}</h1>
          <p className="mt-1 max-w-2xl text-sm font-semibold text-muted">{meta.blurb}</p>
        </div>
        <Link to="/" className="text-sm font-extrabold text-primary">
          ← Dashboard
        </Link>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {meta.features.map((f) => (
          <button
            key={f.key}
            onClick={() => setTab(f.key)}
            className={
              tab === f.key
                ? "rounded-full px-4 py-2 text-sm font-extrabold text-white"
                : "rounded-full border border-border bg-surface px-4 py-2 text-sm font-extrabold"
            }
            style={tab === f.key ? { background: meta.color } : undefined}
          >
            {f.title}
          </button>
        ))}
      </div>
      <Card className="mb-4">
        <p className="text-sm font-semibold text-muted">{meta.features.find((f) => f.key === tab)?.body}</p>
      </Card>
      <Tool industry={industry} tab={tab} items={items} />
    </AppShell>
  );
}

function Tool({ industry, tab, items }: { industry: Industry; tab: string; items: Item[] }) {
  if (industry === "retail") return <RetailTools tab={tab} items={items} />;
  if (industry === "manufacturing") return <MfgTools tab={tab} items={items} />;
  if (industry === "healthcare") return <HealthTools tab={tab} items={items} />;
  if (industry === "food") return <FoodTools tab={tab} items={items} />;
  if (industry === "warehouse") return <WhTools tab={tab} items={items} />;
  return <ItamTools tab={tab} items={items} />;
}

function RetailTools({ tab, items }: { tab: string; items: Item[] }) {
  const setChannelQty = useIMS((s) => s.setChannelQty);
  const scanAdjust = useIMS((s) => s.scanAdjust);
  const syncChannels = useIMS((s) => s.syncChannels);
  const allOrders = useIMS((s) => s.orders);
  const orders = useMemo(() => allOrders.filter((o) => o.type === "sales"), [allOrders]);
  const fulfill = useIMS((s) => s.fulfillOrder);
  const [code, setCode] = useState("890123400001");
  const [channel, setChannel] = useState<Channel>("store");

  if (tab === "barcode") {
    return (
      <Card>
        <h2 className="font-display text-lg font-semibold">Barcode scanning</h2>
        <p className="text-sm font-semibold text-muted">Scan during a sale (−1) or a return (+1).</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Field label="Barcode / SKU">
            <Input value={code} onChange={(e) => setCode(e.target.value)} />
          </Field>
          <Field label="Channel">
            <Select value={channel} onChange={(e) => setChannel(e.target.value as Channel)}>
              <option value="store">Store</option>
              <option value="online">Online</option>
            </Select>
          </Field>
          <div className="flex items-end gap-2">
            <Button
              variant="pink"
              onClick={() => {
                const hit = scanAdjust(code, -1, channel);
                hit ? toast.success(`Sold 1 ${hit.name}`) : toast.error("Not found");
              }}
            >
              Sale
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                const hit = scanAdjust(code, 1, channel);
                hit ? toast.success(`Returned 1 ${hit.name}`) : toast.error("Not found");
              }}
            >
              Return
            </Button>
          </div>
        </div>
      </Card>
    );
  }
  if (tab === "fulfill") {
    return (
      <div className="grid gap-3">
        {orders.map((o) => (
          <Card key={o.id} className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-extrabold">
                {o.id} · {o.partner}
              </p>
              <p className="text-sm text-muted">{o.status} · {o.channel}</p>
            </div>
            {o.status === "pending" ? (
              <Button variant="pink" onClick={() => { fulfill(o.id, "picking"); toast.success("Picking started — stock deducted"); }}>
                Start pick
              </Button>
            ) : o.status === "picking" ? (
              <Button onClick={() => { fulfill(o.id, "packed"); toast.success("Packed"); }}>Pack</Button>
            ) : o.status === "packed" ? (
              <Button variant="green" onClick={() => { fulfill(o.id, "shipped"); toast.success("Shipped"); }}>Ship</Button>
            ) : (
              <Badge tone="green">{o.status}</Badge>
            )}
          </Card>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-3">
      {items.map((i) => (
        <Card key={i.id} className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="font-extrabold">{i.name}</p>
            <p className="text-sm text-muted">
              Store {num(i.storeQty ?? 0)} · Online {num(i.onlineQty ?? 0)} · Total {num(i.qty)}
            </p>
            {tab === "stock" || tab === "sync" ? (
              <div className="mt-2 flex flex-wrap gap-2">
                <label className="text-xs font-bold">
                  Store
                  <Input
                    type="number"
                    className="mt-1 w-24"
                    value={i.storeQty ?? 0}
                    onChange={(e) => setChannelQty(i.id, Number(e.target.value), i.onlineQty ?? 0)}
                  />
                </label>
                <label className="text-xs font-bold">
                  Online
                  <Input
                    type="number"
                    className="mt-1 w-24"
                    value={i.onlineQty ?? 0}
                    onChange={(e) => setChannelQty(i.id, i.storeQty ?? 0, Number(e.target.value))}
                  />
                </label>
                <Button variant="ghost" className="self-end" onClick={() => { syncChannels(i.id); toast.success("Channels synced"); }}>
                  Sync
                </Button>
              </div>
            ) : null}
          </div>
          <Badge tone={i.qty <= i.reorderPoint ? "danger" : "green"}>{i.qty <= i.reorderPoint ? "Low" : "In stock"}</Badge>
        </Card>
      ))}
    </div>
  );
}

function MfgTools({ tab, items }: { tab: string; items: Item[] }) {
  const boms = useIMS((s) => s.boms);
  const start = useIMS((s) => s.startProduction);
  const finish = useIMS((s) => s.finishProduction);
  const setWip = useIMS((s) => s.setWip);
  const addOrder = useIMS((s) => s.addOrder);
  const suppliers = useIMS((s) => s.suppliers);
  const [qty, setQty] = useState(1);
  const raw = items.filter((i) => i.wipStatus === "raw");
  const wip = items.filter((i) => i.wipStatus === "wip");
  const fin = items.filter((i) => i.wipStatus === "finished");

  if (tab === "bom") {
    return (
      <div className="grid gap-3">
        {boms.map((b) => (
          <Card key={b.id}>
            <p className="font-display text-lg font-semibold">{b.name}</p>
            <ul className="mt-2 grid gap-1 text-sm font-bold">
              {b.components.map((c) => {
                const it = useIMS.getState().itemById(c.itemId);
                return (
                  <li key={c.itemId} className="flex justify-between">
                    <span>{it?.name}</span>
                    <span className="tabular">{c.qty} each · have {num(it?.qty ?? 0)}</span>
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>
    );
  }
  if (tab === "jit") {
    const need = raw.filter((i) => i.qty <= i.reorderPoint);
    return (
      <Card>
        <h2 className="font-display text-lg font-semibold">Just-in-time suggestions</h2>
        <p className="text-sm font-semibold text-muted">Order only what the line is about to consume.</p>
        {need.length === 0 ? <p className="mt-3 font-bold">Line is covered — no JIT buy needed.</p> : null}
        <ul className="mt-3 grid gap-2">
          {need.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold">{i.name} · {num(i.qty)} on hand</span>
              <Button
                variant="blue"
                onClick={() => {
                  const sup = suppliers.find((s) => s.id === i.supplierId);
                  addOrder({
                    type: "purchase",
                    status: "pending",
                    partner: sup?.name ?? "Mill",
                    notes: "JIT",
                    lines: [{ itemId: i.id, qty: i.reorderPoint * 2 - i.qty, price: i.unitCost }],
                  });
                  toast.success("JIT purchase drafted");
                }}
              >
                Order now
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    );
  }
  if (tab === "wip") {
    return (
      <div className="grid gap-3 md:grid-cols-3">
        {(["raw", "wip", "finished"] as const).map((col) => (
          <Card key={col}>
            <p className="font-display font-semibold capitalize">{col === "wip" ? "Work-in-progress" : col}</p>
            {(col === "raw" ? raw : col === "wip" ? wip : fin).map((i) => (
              <button
                key={i.id}
                className="mt-2 w-full rounded-xl bg-bg px-3 py-2 text-left text-sm font-bold"
                onClick={() => {
                  const next = col === "raw" ? "wip" : col === "wip" ? "finished" : "finished";
                  setWip(i.id, next);
                  toast.success(`${i.name} → ${next}`);
                }}
              >
                {i.name}
                <span className="mt-0.5 block text-xs text-muted">{num(i.qty)} units</span>
              </button>
            ))}
          </Card>
        ))}
      </div>
    );
  }
  return (
    <Card>
      <h2 className="font-display text-lg font-semibold">Raw materials & build</h2>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <Field label="Build qty">
          <Input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
        </Field>
        <Button
          variant="blue"
          onClick={() => {
            const r = start("bom_motor", qty);
            r.ok ? toast.success(`Started ${qty} motor(s) — materials consumed`) : toast.error(`Missing: ${r.missing.join(", ")}`);
          }}
        >
          Start production
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            finish(qty);
            toast.success("Moved WIP to finished goods");
          }}
        >
          Finish goods
        </Button>
      </div>
      <ul className="mt-4 grid gap-2">
        {items.map((i) => (
          <li key={i.id} className="flex justify-between text-sm font-bold">
            <span>{i.name}</span>
            <span className="tabular">{num(i.qty)} · {i.wipStatus}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function HealthTools({ tab, items }: { tab: string; items: Item[] }) {
  const addOrder = useIMS((s) => s.addOrder);
  const suppliers = useIMS((s) => s.suppliers);
  const [lot, setLot] = useState("");

  const recalled = useMemo(() => {
    const q = lot.trim().toLowerCase();
    if (!q) return [];
    return items.filter((i) => (i.lot ?? "").toLowerCase().includes(q) || (i.batch ?? "").toLowerCase().includes(q));
  }, [lot, items]);

  if (tab === "batch") {
    return (
      <Card>
        <h2 className="font-display text-lg font-semibold">Batch / lot recall</h2>
        <Field label="Lot or batch number" className="mt-3 max-w-sm">
          <Input value={lot} onChange={(e) => setLot(e.target.value)} placeholder="A12345 or B-9102" />
        </Field>
        <ul className="mt-3 grid gap-2">
          {(lot ? recalled : items).map((i) => (
            <li key={i.id} className="rounded-xl bg-bg px-3 py-2 text-sm font-bold">
              {i.name} · lot {i.lot ?? "—"} · batch {i.batch ?? "—"} · {num(i.qty)} on hand
            </li>
          ))}
        </ul>
        {lot && recalled.length ? (
          <Button
            className="mt-3"
            variant="danger"
            onClick={() => toast.success(`Recall notice drafted for lot ${lot} (${recalled.length} SKU)`)}
          >
            Draft recall
          </Button>
        ) : null}
      </Card>
    );
  }
  if (tab === "asset") {
    return (
      <div className="grid gap-3">
        {items.filter((i) => i.category === "Asset" || i.critical).map((i) => (
          <Card key={i.id}>
            <p className="font-extrabold">{i.name}</p>
            <p className="text-sm text-muted">
              {i.lifecycle ?? "tracked"} · {num(i.qty)} · {money(i.unitCost)}
            </p>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-3">
      {items
        .slice()
        .sort((a, b) => (a.expiry ?? "9999").localeCompare(b.expiry ?? "9999"))
        .map((i) => {
          const d = i.expiry ? daysUntil(i.expiry) : null;
          const hot = d != null && d <= 30;
          return (
            <Card key={i.id} className={hot ? "border-danger/40" : ""}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-extrabold">{i.name}</p>
                  <p className="text-sm font-bold text-muted">
                    {i.expiry ? `EXP ${i.expiry}` : "No expiry"} {d != null ? `· ${d < 0 ? "expired" : `${d} days`}` : ""}
                    {i.lot ? ` · lot ${i.lot}` : ""}
                  </p>
                </div>
                {i.qty <= i.reorderPoint ? (
                  <Button
                    variant="green"
                    onClick={() => {
                      const sup = suppliers.find((s) => s.id === i.supplierId);
                      addOrder({
                        type: "purchase",
                        status: "pending",
                        partner: sup?.name ?? "MediLot",
                        notes: "Critical restock",
                        lines: [{ itemId: i.id, qty: i.reorderPoint * 2, price: i.unitCost }],
                      });
                      toast.success("Critical restock PO drafted");
                    }}
                  >
                    Restock
                  </Button>
                ) : (
                  <Badge tone={hot ? "danger" : "green"}>{num(i.qty)} on hand</Badge>
                )}
              </div>
            </Card>
          );
        })}
    </div>
  );
}

function FoodTools({ tab, items }: { tab: string; items: Item[] }) {
  const recipes = useIMS((s) => s.recipes);
  const sell = useIMS((s) => s.sellRecipe);
  const addOrder = useIMS((s) => s.addOrder);
  const suppliers = useIMS((s) => s.suppliers);
  const settings = useIMS((s) => s.settings);
  const fifo = items.slice().sort((a, b) => (a.fifoDate ?? "").localeCompare(b.fifoDate ?? ""));

  if (tab === "recipe") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {recipes.map((r) => {
          const cost = r.ingredients.reduce((s, ing) => {
            const it = useIMS.getState().itemById(ing.itemId);
            return s + (it?.unitCost ?? 0) * ing.qty;
          }, 0);
          return (
            <Card key={r.id}>
              <p className="font-display text-lg font-semibold">{r.name}</p>
              <p className="text-sm font-bold text-muted">
                Sell {money(r.salePrice, settings.currency)} · food cost {money(cost, settings.currency)}
              </p>
              <ul className="mt-2 text-sm font-bold">
                {r.ingredients.map((ing) => {
                  const it = useIMS.getState().itemById(ing.itemId);
                  return (
                    <li key={ing.itemId}>
                      {it?.name} × {ing.qty} (have {num(it?.qty ?? 0)})
                    </li>
                  );
                })}
              </ul>
              <Button
                className="mt-3"
                variant="orange"
                onClick={() => {
                  const res = sell(r.id, 1);
                  res.ok ? toast.success(`Sold ${r.name} — ingredients deducted`) : toast.error(`Missing ${res.missing.join(", ")}`);
                }}
              >
                Sell 1 plate
              </Button>
            </Card>
          );
        })}
      </div>
    );
  }
  if (tab === "supplier") {
    const low = items.filter((i) => i.qty <= i.reorderPoint);
    return (
      <Card>
        <h2 className="font-display text-lg font-semibold">Kitchen restock</h2>
        {low.map((i) => (
          <div key={i.id} className="mt-2 flex items-center justify-between">
            <span className="font-bold">{i.name}</span>
            <Button
              variant="orange"
              onClick={() => {
                const sup = suppliers.find((s) => s.id === i.supplierId);
                addOrder({
                  type: "purchase",
                  status: "pending",
                  partner: sup?.name ?? "Freshfield",
                  notes: "Kitchen auto-order",
                  lines: [{ itemId: i.id, qty: i.reorderPoint * 2 - i.qty, price: i.unitCost }],
                });
                toast.success("Supplier order drafted");
              }}
            >
              Order
            </Button>
          </div>
        ))}
      </Card>
    );
  }
  return (
    <Card>
      <h2 className="font-display text-lg font-semibold">FIFO — oldest first</h2>
      <p className="text-sm font-semibold text-muted">Use the top of the list before anything else.</p>
      <ol className="mt-3 grid gap-2">
        {fifo.map((i, idx) => {
          const d = i.expiry ? daysUntil(i.expiry) : null;
          return (
            <li key={i.id} className="flex items-center justify-between rounded-xl bg-bg px-3 py-2">
              <span className="font-bold">
                {idx + 1}. {i.name}
                <span className="ml-2 text-xs text-muted">in {i.fifoDate ?? "—"} · exp {i.expiry ?? "—"}</span>
              </span>
              <Badge tone={d != null && d <= 5 ? "danger" : "orange"}>{num(i.qty)}</Badge>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

function WhTools({ tab, items }: { tab: string; items: Item[] }) {
  const locations = useIMS((s) => s.locations);
  const transfer = useIMS((s) => s.transfer);
  const cycleCount = useIMS((s) => s.cycleCount);
  const crossDock = useIMS((s) => s.crossDock);
  const scanAdjust = useIMS((s) => s.scanAdjust);
  const [bin, setBin] = useState(locations[0]?.id ?? "");
  const [code, setCode] = useState("");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const here = items.filter((i) => i.locationId === bin);

  if (tab === "scan") {
    return (
      <Card>
        <h2 className="font-display text-lg font-semibold">Receive by scan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Barcode" className="max-w-xs" />
          <Button
            onClick={() => {
              const hit = scanAdjust(code, 1);
              hit ? toast.success(`Received 1 ${hit.name}`) : toast.error("Unknown code");
              setCode("");
            }}
          >
            Scan in
          </Button>
        </div>
      </Card>
    );
  }
  if (tab === "dock") {
    return (
      <Card>
        <h2 className="font-display text-lg font-semibold">Cross-dock</h2>
        <p className="text-sm font-semibold text-muted">Move inbound goods straight to the outbound dock and issue them.</p>
        <ul className="mt-3 grid gap-2">
          {items.map((i) => (
            <li key={i.id} className="flex items-center justify-between">
              <span className="font-bold">{i.name}</span>
              <Button
                variant="ghost"
                onClick={() => {
                  crossDock(i.id, Math.min(1, i.qty));
                  toast.success("Cross-docked 1 unit to outbound");
                }}
              >
                Dock 1
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    );
  }
  if (tab === "cycle") {
    return (
      <Card>
        <h2 className="font-display text-lg font-semibold">Cycle count</h2>
        <Field label="Bin" className="max-w-sm">
          <Select value={bin} onChange={(e) => { setBin(e.target.value); setCounts({}); }}>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>{l.code} — {l.name}</option>
            ))}
          </Select>
        </Field>
        <ul className="mt-3 grid gap-2">
          {here.map((i) => (
            <li key={i.id} className="flex items-center justify-between gap-3">
              <span className="font-bold">{i.name} (system {num(i.qty)})</span>
              <Input
                type="number"
                className="w-24"
                value={counts[i.id] ?? i.qty}
                onChange={(e) => setCounts({ ...counts, [i.id]: Number(e.target.value) })}
              />
            </li>
          ))}
        </ul>
        <Button
          className="mt-3"
          onClick={() => {
            cycleCount(bin, Object.keys(counts).length ? counts : Object.fromEntries(here.map((i) => [i.id, i.qty])));
            toast.success("Cycle count posted");
          }}
        >
          Post count
        </Button>
      </Card>
    );
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {locations.map((l) => {
        const list = useIMS.getState().items.filter((i) => i.locationId === l.id);
        return (
          <button
            key={l.id}
            className="rounded-2xl border border-border bg-surface p-4 text-left shadow-[var(--shadow-card)]"
            onClick={() => {
              const first = items[0];
              if (first) {
                transfer(first.id, l.id);
                toast.success(`Mapped ${first.name} → ${l.code}`);
              }
            }}
          >
            <p className="font-display text-2xl font-semibold">{l.code}</p>
            <p className="text-sm font-bold text-muted">{l.name}</p>
            <p className="mt-2 text-xs font-bold">{list.length} SKUs</p>
          </button>
        );
      })}
    </div>
  );
}

function ItamTools({ tab, items }: { tab: string; items: Item[] }) {
  const assign = useIMS((s) => s.assignLicense);
  const setLifecycle = useIMS((s) => s.setLifecycle);
  const hw = items.filter((i) => i.category === "Hardware");
  const lic = items.filter((i) => i.category === "License");

  if (tab === "lic") {
    return (
      <div className="grid gap-3">
        {lic.map((i) => (
          <Card key={i.id}>
            <p className="font-extrabold">{i.name}</p>
            <p className="text-sm text-muted">
              {i.licenseUsed}/{i.licenseTotal} seats
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg">
              <div
                className="h-full bg-teal"
                style={{ width: `${Math.min(100, ((i.licenseUsed ?? 0) / (i.licenseTotal || 1)) * 100)}%` }}
              />
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="teal" onClick={() => assign(i.id, 1)}>Assign seat</Button>
              <Button variant="ghost" onClick={() => assign(i.id, -1)}>Release</Button>
            </div>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-3">
      {hw.map((i) => (
        <Card key={i.id} className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-extrabold">{i.name}</p>
            <p className="text-sm text-muted">{num(i.qty)} units · {i.lifecycle}</p>
          </div>
          <Select
            value={i.lifecycle ?? "active"}
            onChange={(e) => setLifecycle(i.id, e.target.value as "active" | "repair" | "retire")}
          >
            <option value="active">Active</option>
            <option value="repair">Repair</option>
            <option value="retire">Retire</option>
          </Select>
        </Card>
      ))}
    </div>
  );
}

function tone(id: Industry) {
  return { retail: "pink", manufacturing: "blue", healthcare: "green", food: "orange", warehouse: "primary", itam: "teal" }[id] as
    | "pink"
    | "blue"
    | "green"
    | "orange"
    | "primary"
    | "teal";
}
