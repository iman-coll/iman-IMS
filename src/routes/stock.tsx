import { AppShell } from "@/components/shell";
import { Button, Card, Field, Input, Select } from "@/components/ui";
import { num } from "@/lib/format";
import { useIMS } from "@/lib/store";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/stock")({
  component: StockPage,
});

function StockPage() {
  const items = useIMS((s) => s.items);
  const locations = useIMS((s) => s.locations);
  const moves = useIMS((s) => s.moves);
  const adjust = useIMS((s) => s.adjustQty);
  const scanAdjust = useIMS((s) => s.scanAdjust);
  const [itemId, setItemId] = useState(items[0]?.id ?? "");
  const [qty, setQty] = useState(10);
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<"in" | "out">("in");

  function receive() {
    adjust(itemId, mode === "in" ? qty : -qty, mode === "in" ? "Stock receive" : "Stock issue", mode);
    toast.success(mode === "in" ? "Stock received" : "Stock issued");
  }

  function scan() {
    const hit = scanAdjust(code, mode === "in" ? qty : -qty);
    if (!hit) toast.error("No item matches that barcode or SKU");
    else {
      toast.success(`${hit.name} updated`);
      setCode("");
    }
  }

  return (
    <AppShell title="Receive & issue">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-semibold">Manual movement</h2>
          <div className="mt-3 grid gap-3">
            <Field label="Direction">
              <Select value={mode} onChange={(e) => setMode(e.target.value as "in" | "out")}>
                <option value="in">Stock in (receive)</option>
                <option value="out">Stock out (issue)</option>
              </Select>
            </Field>
            <Field label="Item">
              <Select value={itemId} onChange={(e) => setItemId(e.target.value)}>
                {items.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name} ({num(i.qty)} on hand)
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Quantity">
              <Input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
            </Field>
            <Button onClick={receive}>{mode === "in" ? "Receive" : "Issue"}</Button>
          </div>
        </Card>
        <Card>
          <h2 className="font-display text-lg font-semibold">Barcode scan</h2>
          <p className="text-sm font-semibold text-muted">Type a barcode or SKU — same as waving a scanner.</p>
          <div className="mt-3 grid gap-3">
            <Field label="Barcode / SKU">
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="890123400001 or RTL-TEE-01" />
            </Field>
            <Button variant="pink" onClick={scan}>
              Scan
            </Button>
            <p className="text-xs font-bold text-muted">Try 890123400001 (Classic Cotton Tee) or HC-INS-21 (Insulin).</p>
          </div>
        </Card>
      </div>
      <Card className="mt-4">
        <h2 className="mb-2 font-display text-lg font-semibold">Recent movements</h2>
        <ul className="grid gap-2 text-sm font-bold">
          {moves.slice(0, 12).map((m) => {
            const it = items.find((i) => i.id === m.itemId);
            const loc = locations.find((l) => l.id === m.to || l.id === m.from);
            return (
              <li key={m.id} className="flex flex-wrap justify-between gap-2 border-b border-border py-2 last:border-0">
                <span>
                  {m.type} · {it?.name ?? m.itemId} · {num(m.qty)}
                </span>
                <span className="text-muted">
                  {m.note}
                  {loc ? ` · ${loc.code}` : ""}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>
    </AppShell>
  );
}
