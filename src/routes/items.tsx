import { AppShell } from "@/components/shell";
import { Badge, Button, Card, Field, Input, Modal, Select } from "@/components/ui";
import { money, num, uid } from "@/lib/format";
import { INDUSTRY_META, useIMS } from "@/lib/store";
import type { Channel, Industry, Item } from "@/lib/types";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/items")({
  component: ItemsPage,
});

function ItemsPage() {
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  const params = new URLSearchParams(searchStr.startsWith("?") ? searchStr : `?${searchStr}`);
  const items = useIMS((s) => s.items);
  const locations = useIMS((s) => s.locations);
  const suppliers = useIMS((s) => s.suppliers);
  const settings = useIMS((s) => s.settings);
  const adjustQty = useIMS((s) => s.adjustQty);
  const addItem = useIMS((s) => s.addItem);
  const setItem = useIMS((s) => s.setItem);
  const removeItem = useIMS((s) => s.removeItem);
  const [q, setQ] = useState(params.get("q") ?? "");
  const [industry, setIndustry] = useState<string>(params.get("industry") ?? "all");
  const [editing, setEditing] = useState<Partial<Item> | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((i) => {
      if (industry !== "all" && i.industry !== industry) return false;
      if (!needle) return true;
      return (
        i.name.toLowerCase().includes(needle) ||
        i.sku.toLowerCase().includes(needle) ||
        i.barcode.includes(needle) ||
        i.category.toLowerCase().includes(needle)
      );
    });
  }, [items, q, industry]);

  function save() {
    if (!editing?.name || !editing.sku) {
      toast.error("Name and SKU are required");
      return;
    }
    const loc = editing.locationId || locations[0]?.id || "";
    const sup = editing.supplierId || suppliers[0]?.id || "";
    if (editing.id) {
      const prev = items.find((i) => i.id === editing.id);
      if (prev) setItem({ ...prev, ...editing } as Item);
      toast.success("Item updated");
    } else {
      addItem({
        sku: editing.sku,
        name: editing.name,
        industry: (editing.industry as Industry) || "retail",
        category: editing.category || "General",
        qty: Number(editing.qty) || 0,
        reorderPoint: Number(editing.reorderPoint) || settings.defaultReorder,
        unitCost: Number(editing.unitCost) || 0,
        locationId: loc,
        barcode: editing.barcode || uid("bc").replace("_", ""),
        supplierId: sup,
        channel: editing.channel as Channel | undefined,
        expiry: editing.expiry,
        lot: editing.lot,
        perishable: editing.perishable,
        critical: editing.critical,
      });
      toast.success("Item added to inventory");
    }
    setEditing(null);
  }

  return (
    <AppShell title="Items">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <Field label="Search" className="flex-1">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, SKU, barcode…" />
        </Field>
        <Field label="Industry">
          <Select value={industry} onChange={(e) => setIndustry(e.target.value)}>
            <option value="all">All industries</option>
            {Object.entries(INDUSTRY_META).map(([k, v]) => (
              <option key={k} value={k}>
                {v.title}
              </option>
            ))}
          </Select>
        </Field>
        <Button onClick={() => setEditing({ industry: "retail", qty: 0, reorderPoint: settings.defaultReorder, unitCost: 0 })}>
          Add item
        </Button>
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border bg-bg-tint text-xs font-extrabold tracking-wide text-muted uppercase">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Industry</th>
              <th className="px-4 py-3">On hand</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => {
              const loc = locations.find((l) => l.id === i.locationId);
              const low = i.qty <= i.reorderPoint;
              return (
                <tr key={i.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-extrabold">{i.name}</p>
                    <p className="text-xs font-bold text-muted">
                      {i.sku} · {i.barcode}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={tone(i.industry)}>{i.industry}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className={low ? "font-extrabold text-danger tabular" : "font-extrabold tabular"}>{num(i.qty)}</span>
                    <span className="ml-1 text-xs text-muted">min {i.reorderPoint}</span>
                    <div className="mt-1 flex gap-1">
                      <button className="rounded-lg bg-bg px-2 py-0.5 text-xs font-extrabold" onClick={() => adjustQty(i.id, -1, "Manual issue", "out")}>
                        −
                      </button>
                      <button className="rounded-lg bg-bg px-2 py-0.5 text-xs font-extrabold" onClick={() => adjustQty(i.id, 1, "Manual receive", "in")}>
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-muted">{loc ? `${loc.code} · ${loc.warehouse}` : "—"}</td>
                  <td className="px-4 py-3 font-extrabold tabular">{money(i.qty * i.unitCost, settings.currency)}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="mr-2 text-xs font-extrabold text-primary" onClick={() => setEditing(i)}>
                      Edit
                    </button>
                    <button
                      className="text-xs font-extrabold text-danger"
                      onClick={() => {
                        removeItem(i.id);
                        toast.success("Removed");
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <Modal open={!!editing} title={editing?.id ? "Edit item" : "Add item"} onClose={() => setEditing(null)} wide>
        {editing ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name">
              <Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <Field label="SKU">
              <Input value={editing.sku ?? ""} onChange={(e) => setEditing({ ...editing, sku: e.target.value })} />
            </Field>
            <Field label="Industry">
              <Select value={editing.industry ?? "retail"} onChange={(e) => setEditing({ ...editing, industry: e.target.value as Industry })}>
                {Object.keys(INDUSTRY_META).map((k) => (
                  <option key={k} value={k}>
                    {INDUSTRY_META[k as Industry].title}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Category">
              <Input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
            </Field>
            <Field label="Quantity">
              <Input type="number" value={editing.qty ?? 0} onChange={(e) => setEditing({ ...editing, qty: Number(e.target.value) })} />
            </Field>
            <Field label="Reorder point">
              <Input type="number" value={editing.reorderPoint ?? 0} onChange={(e) => setEditing({ ...editing, reorderPoint: Number(e.target.value) })} />
            </Field>
            <Field label="Unit cost">
              <Input type="number" step="0.01" value={editing.unitCost ?? 0} onChange={(e) => setEditing({ ...editing, unitCost: Number(e.target.value) })} />
            </Field>
            <Field label="Barcode">
              <Input value={editing.barcode ?? ""} onChange={(e) => setEditing({ ...editing, barcode: e.target.value })} />
            </Field>
            <Field label="Location">
              <Select value={editing.locationId ?? locations[0]?.id} onChange={(e) => setEditing({ ...editing, locationId: e.target.value })}>
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.code} — {l.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Supplier">
              <Select value={editing.supplierId ?? suppliers[0]?.id} onChange={(e) => setEditing({ ...editing, supplierId: e.target.value })}>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Expiry (optional)">
              <Input type="date" value={editing.expiry ?? ""} onChange={(e) => setEditing({ ...editing, expiry: e.target.value })} />
            </Field>
            <Field label="Lot / batch">
              <Input value={editing.lot ?? ""} onChange={(e) => setEditing({ ...editing, lot: e.target.value })} />
            </Field>
            <div className="flex items-center gap-4 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" checked={!!editing.critical} onChange={(e) => setEditing({ ...editing, critical: e.target.checked })} />
                Critical stock
              </label>
              <label className="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" checked={!!editing.perishable} onChange={(e) => setEditing({ ...editing, perishable: e.target.checked })} />
                Perishable
              </label>
            </div>
            <div className="sm:col-span-2">
              <Button onClick={save}>Save item</Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </AppShell>
  );
}

function tone(i: Industry) {
  return { retail: "pink", manufacturing: "blue", healthcare: "green", food: "orange", warehouse: "primary", itam: "teal" }[i] as
    | "pink"
    | "blue"
    | "green"
    | "orange"
    | "primary"
    | "teal";
}
