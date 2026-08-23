import { AppShell } from "@/components/shell";
import { Badge, Button, Card, Field, Select } from "@/components/ui";
import { num } from "@/lib/format";
import { useIMS } from "@/lib/store";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/locations")({
  component: LocationsPage,
});

function LocationsPage() {
  const locations = useIMS((s) => s.locations);
  const items = useIMS((s) => s.items);
  const transfer = useIMS((s) => s.transfer);
  const [from, setFrom] = useState(items[0]?.id ?? "");
  const [to, setTo] = useState(locations[0]?.id ?? "");

  return (
    <AppShell title="Locations">
      <Card className="mb-4">
        <p className="font-display text-lg font-semibold">Move an item</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Field label="Item">
            <Select value={from} onChange={(e) => setFrom(e.target.value)}>
              {items.map((i) => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </Select>
          </Field>
          <Field label="To bin">
            <Select value={to} onChange={(e) => setTo(e.target.value)}>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>{l.code} — {l.name}</option>
              ))}
            </Select>
          </Field>
          <div className="flex items-end">
            <Button onClick={() => { transfer(from, to); toast.success("Transferred"); }}>Transfer</Button>
          </div>
        </div>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((l) => {
          const here = items.filter((i) => i.locationId === l.id);
          const units = here.reduce((s, i) => s + i.qty, 0);
          return (
            <Card key={l.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-xl font-semibold">{l.code}</p>
                  <p className="text-sm font-bold text-muted">{l.name}</p>
                </div>
                <Badge tone="primary">{l.type}</Badge>
              </div>
              <p className="mt-2 text-sm font-bold">{l.warehouse}</p>
              <p className="text-sm text-muted">{here.length} SKUs · {num(units)} units</p>
              <ul className="mt-2 grid gap-1 text-sm font-semibold">
                {here.slice(0, 4).map((i) => (
                  <li key={i.id} className="flex justify-between">
                    <span>{i.name}</span>
                    <span className="tabular">{num(i.qty)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
