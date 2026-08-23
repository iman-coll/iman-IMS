import { AppShell } from "@/components/shell";
import { Badge, Button, Card } from "@/components/ui";
import { useAlerts, useIMS } from "@/lib/store";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/alerts")({
  component: AlertsPage,
});

function AlertsPage() {
  const alerts = useAlerts();
  const dismiss = useIMS((s) => s.dismissAlert);
  const addOrder = useIMS((s) => s.addOrder);
  const items = useIMS((s) => s.items);
  const suppliers = useIMS((s) => s.suppliers);
  const navigate = useNavigate();
  const unread = alerts.filter((a) => !a.read);

  function reorder(itemId?: string) {
    const it = items.find((i) => i.id === itemId);
    if (!it) return;
    const sup = suppliers.find((s) => s.id === it.supplierId);
    addOrder({
      type: "purchase",
      status: "pending",
      partner: sup?.name ?? "Supplier",
      notes: "Generated from alert",
      lines: [{ itemId: it.id, qty: Math.max(it.reorderPoint * 2 - it.qty, it.reorderPoint), price: it.unitCost }],
    });
    toast.success("Purchase order drafted");
    navigate({ to: "/orders" });
  }

  return (
    <AppShell title="Alerts">
      <p className="mb-4 text-sm font-bold text-muted">{unread.length} open · {alerts.length} total</p>
      <div className="grid gap-3">
        {alerts.map((a) => (
          <Card key={a.id} className={a.read ? "opacity-60" : ""}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge tone={a.severity === "critical" ? "danger" : a.severity === "warn" ? "orange" : "muted"}>
                  {a.kind.replace("_", " ")}
                </Badge>
                <p className="mt-2 font-bold">{a.message}</p>
              </div>
              <div className="flex gap-2">
                {(a.kind === "low_stock" || a.kind === "critical" || a.kind === "perishable") && a.itemId ? (
                  <Button variant="ghost" onClick={() => reorder(a.itemId)}>Reorder</Button>
                ) : null}
                {!a.read ? (
                  <Button variant="soft" onClick={() => dismiss(a.id)}>Dismiss</Button>
                ) : null}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
