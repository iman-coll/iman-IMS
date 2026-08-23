import { AppShell } from "@/components/shell";
import { Button, Card, Field, Input, Modal } from "@/components/ui";
import { uid } from "@/lib/format";
import { useIMS } from "@/lib/store";
import type { Supplier } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/suppliers")({
  component: SuppliersPage,
});

function SuppliersPage() {
  const suppliers = useIMS((s) => s.suppliers);
  const items = useIMS((s) => s.items);
  const addOrder = useIMS((s) => s.addOrder);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Partial<Supplier>>({});

  function save() {
    if (!draft.name) return toast.error("Name required");
    useIMS.setState((s) => {
      const next = {
        ...s,
        suppliers: [
          {
            id: uid("sup"),
            name: draft.name!,
            leadDays: Number(draft.leadDays) || 7,
            email: draft.email || "",
            phone: draft.phone || "",
            category: draft.category || "General",
          },
          ...s.suppliers,
        ],
      };
      localStorage.setItem("stocklot-ims-v1", JSON.stringify(next));
      return next;
    });
    toast.success("Supplier added");
    setOpen(false);
  }

  function restock(sup: Supplier) {
    const low = items.filter((i) => i.supplierId === sup.id && i.qty <= i.reorderPoint);
    if (!low.length) {
      toast.message("No low-stock items for this supplier");
      return;
    }
    addOrder({
      type: "purchase",
      status: "pending",
      partner: sup.name,
      notes: "Auto restock from supplier card",
      lines: low.map((i) => ({ itemId: i.id, qty: Math.max(i.reorderPoint * 2 - i.qty, i.reorderPoint), price: i.unitCost })),
    });
    toast.success(`Drafted PO for ${low.length} item(s)`);
  }

  return (
    <AppShell title="Suppliers">
      <div className="mb-4 flex justify-end">
        <Button onClick={() => { setDraft({}); setOpen(true); }}>Add supplier</Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {suppliers.map((s) => {
          const catalog = items.filter((i) => i.supplierId === s.id);
          const low = catalog.filter((i) => i.qty <= i.reorderPoint);
          return (
            <Card key={s.id}>
              <p className="font-display text-lg font-semibold">{s.name}</p>
              <p className="text-sm font-semibold text-muted">
                {s.category} · lead {s.leadDays}d
              </p>
              <p className="mt-1 text-sm font-bold">{s.email}</p>
              <p className="text-sm text-muted">{s.phone}</p>
              <p className="mt-2 text-sm font-bold">
                {catalog.length} SKUs · {low.length} below reorder
              </p>
              <Button className="mt-3" variant="ghost" onClick={() => restock(s)}>
                Draft restock PO
              </Button>
            </Card>
          );
        })}
      </div>
      <Modal open={open} title="Add supplier" onClose={() => setOpen(false)}>
        <div className="grid gap-3">
          <Field label="Name"><Input value={draft.name ?? ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Field>
          <Field label="Category"><Input value={draft.category ?? ""} onChange={(e) => setDraft({ ...draft, category: e.target.value })} /></Field>
          <Field label="Lead days"><Input type="number" value={draft.leadDays ?? 7} onChange={(e) => setDraft({ ...draft, leadDays: Number(e.target.value) })} /></Field>
          <Field label="Email"><Input value={draft.email ?? ""} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></Field>
          <Field label="Phone"><Input value={draft.phone ?? ""} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></Field>
          <Button onClick={save}>Save</Button>
        </div>
      </Modal>
    </AppShell>
  );
}
