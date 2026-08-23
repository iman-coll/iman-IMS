import { AppShell } from "@/components/shell";
import { Card } from "@/components/ui";
import { money, num } from "@/lib/format";
import { INDUSTRY_META, useIMS, useStats } from "@/lib/store";
import type { Industry } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
});

const COLORS = ["#ef6d9a", "#5aa3ea", "#62b56a", "#ef9a3a", "#8b6cf0", "#4eb4bc"];

function ReportsPage() {
  const items = useIMS((s) => s.items);
  const orders = useIMS((s) => s.orders);
  const stats = useStats();
  const settings = useIMS((s) => s.settings);

  const byIndustry = (Object.keys(INDUSTRY_META) as Industry[]).map((k) => {
    const list = items.filter((i) => i.industry === k);
    return {
      name: INDUSTRY_META[k].title.split("&")[0].trim(),
      units: list.reduce((s, i) => s + (i.category === "License" ? 0 : i.qty), 0),
      value: list.reduce((s, i) => s + (i.licenseTotal ? i.licenseTotal * i.unitCost : i.qty * i.unitCost), 0),
      low: list.filter((i) => i.qty <= i.reorderPoint).length,
    };
  });

  return (
    <AppShell title="Reports">
      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card>
          <p className="text-xs font-bold text-muted">Inventory value</p>
          <p className="font-display text-2xl font-semibold tabular">{money(stats.totalValue, settings.currency)}</p>
        </Card>
        <Card>
          <p className="text-xs font-bold text-muted">Units on hand</p>
          <p className="font-display text-2xl font-semibold tabular">{num(stats.totalUnits)}</p>
        </Card>
        <Card>
          <p className="text-xs font-bold text-muted">Low-stock SKUs</p>
          <p className="font-display text-2xl font-semibold tabular text-danger">{stats.lowStock}</p>
        </Card>
        <Card>
          <p className="text-xs font-bold text-muted">Open orders</p>
          <p className="font-display text-2xl font-semibold tabular">{stats.pendingOrders}</p>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="h-80">
          <h2 className="mb-2 font-display text-lg font-semibold">Units by industry</h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={byIndustry}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4dcf4" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="units" radius={[8, 8, 0, 0]}>
                {byIndustry.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="h-80">
          <h2 className="mb-2 font-display text-lg font-semibold">Value mix</h2>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie data={byIndustry} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {byIndustry.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => money(v, settings.currency)} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card className="mt-4">
        <h2 className="mb-2 font-display text-lg font-semibold">Demand snapshot</h2>
        <p className="text-sm font-semibold text-muted">
          {orders.filter((o) => o.type === "sales").length} sales orders in the ledger. Low-stock SKUs:{" "}
          {items
            .filter((i) => i.qty <= i.reorderPoint)
            .map((i) => i.name)
            .join(", ") || "none"}.
        </p>
      </Card>
    </AppShell>
  );
}
