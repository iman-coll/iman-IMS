import { AppShell } from "@/components/shell";
import { Button, Card, Field, Input, Select } from "@/components/ui";
import { useIMS } from "@/lib/store";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const settings = useIMS((s) => s.settings);
  const update = useIMS((s) => s.updateSettings);
  const reset = useIMS((s) => s.resetDemo);

  return (
    <AppShell title="Settings">
      <Card className="max-w-xl">
        <div className="grid gap-3">
          <Field label="Company">
            <Input value={settings.company} onChange={(e) => update({ company: e.target.value })} />
          </Field>
          <Field label="Currency">
            <Select value={settings.currency} onChange={(e) => update({ currency: e.target.value })}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="PKR">PKR</option>
            </Select>
          </Field>
          <Field label="Default reorder point">
            <Input type="number" value={settings.defaultReorder} onChange={(e) => update({ defaultReorder: Number(e.target.value) })} />
          </Field>
          <Field label="Expiry warning (days)">
            <Input type="number" value={settings.expiryWarnDays} onChange={(e) => update({ expiryWarnDays: Number(e.target.value) })} />
          </Field>
          <label className="flex items-center gap-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={settings.autoReorder}
              onChange={(e) => update({ autoReorder: e.target.checked })}
            />
            Suggest purchase orders when stock hits the reorder point
          </label>
          <Button
            variant="danger"
            onClick={() => {
              reset();
              toast.success("Demo data restored");
            }}
          >
            Reset demo data
          </Button>
        </div>
      </Card>
    </AppShell>
  );
}
