import { AppShell } from "@/components/shell";
import { Badge, Button, Card, Field, Input, Modal, Select } from "@/components/ui";
import { money, shortDate } from "@/lib/format";
import { useIMS } from "@/lib/store";
import type { Channel, Order, OrderStatus } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

const FLOW: Record<string, OrderStatus | undefined> = {
  pending: "picking",
  picking: "packed",
  packed: "shipped",
};

function OrdersPage() {
  const orders = useIMS((s) => s.orders);
  const items = useIMS((s) => s.items);
  const settings = useIMS((s) => s.settings);
  const fulfill = useIMS((s) => s.fulfillOrder);
  const addOrder = useIMS((s) => s.addOrder);
  const receive = useIMS((s) => s.receivePurchase);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({
    type: "sales" as Order["type"],
    partner: "",
    itemId: items[0]?.id ?? "",
    qty: 1,
    channel: "online" as Channel,
  });

  function total(o: Order) {
    return o.lines.reduce((s, l) => s + l.qty * l.price, 0);
  }

  function advance(o: Order) {
    if (o.type === "purchase") {
      receive(o.id);
      toast.success("Purchase received — stock increased");
      return;
    }
    const next = FLOW[o.status];
    if (!next) return;
    fulfill(o.id, next);
    toast.success(`Order ${o.id} → ${next}`);
  }

  function create() {
    const item = items.find((i) => i.id === draft.itemId);
    if (!draft.partner || !item) {
      toast.error("Partner and item required");
      return;
    }
    addOrder({
      type: draft.type,
      status: "pending",
      partner: draft.partner,
      channel: draft.type === "sales" ? draft.channel : undefined,
      notes: "",
      lines: [{ itemId: item.id, qty: draft.qty, price: item.unitCost * (draft.type === "sales" ? 2.2 : 1) }],
    });
    toast.success("Order created");
    setOpen(false);
  }

  return (
    <AppShell title="Orders">
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setOpen(true)}>New order</Button>
      </div>
      <div className="grid gap-3">
        {orders.map((o) => (
          <Card key={o.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-extrabold">{o.id}</p>
                <Badge tone={o.type === "sales" ? "pink" : "blue"}>{o.type}</Badge>
                <Badge tone={o.status === "pending" ? "orange" : o.status === "shipped" || o.status === "received" ? "green" : "primary"}>
                  {o.status}
                </Badge>
              </div>
              <p className="mt-1 text-sm font-semibold text-muted">
                {o.partner} · {shortDate(o.createdAt)} {o.channel ? `· ${o.channel}` : ""}
              </p>
              <ul className="mt-1 text-sm font-bold">
                {o.lines.map((l) => {
                  const it = items.find((i) => i.id === l.itemId);
                  return (
                    <li key={l.itemId}>
                      {it?.name ?? l.itemId} × {l.qty}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-display text-xl font-semibold tabular">{money(total(o), settings.currency)}</p>
              {o.status !== "shipped" && o.status !== "received" && o.status !== "cancelled" ? (
                <Button onClick={() => advance(o)}>
                  {o.type === "purchase" ? "Receive" : o.status === "pending" ? "Start pick" : o.status === "picking" ? "Pack" : "Ship"}
                </Button>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
      <Modal open={open} title="New order" onClose={() => setOpen(false)}>
        <div className="grid gap-3">
          <Field label="Type">
            <Select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as Order["type"] })}>
              <option value="sales">Sales</option>
              <option value="purchase">Purchase</option>
            </Select>
          </Field>
          <Field label="Customer / supplier">
            <Input value={draft.partner} onChange={(e) => setDraft({ ...draft, partner: e.target.value })} />
          </Field>
          {draft.type === "sales" ? (
            <Field label="Channel">
              <Select value={draft.channel} onChange={(e) => setDraft({ ...draft, channel: e.target.value as Channel })}>
                <option value="online">Online</option>
                <option value="store">Store</option>
              </Select>
            </Field>
          ) : null}
          <Field label="Item">
            <Select value={draft.itemId} onChange={(e) => setDraft({ ...draft, itemId: e.target.value })}>
              {items.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Quantity">
            <Input type="number" min={1} value={draft.qty} onChange={(e) => setDraft({ ...draft, qty: Number(e.target.value) })} />
          </Field>
          <Button onClick={create}>Create order</Button>
        </div>
      </Modal>
    </AppShell>
  );
}
