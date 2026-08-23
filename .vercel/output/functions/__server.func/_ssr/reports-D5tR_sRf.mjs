import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as useIMS, h as num, i as Card, m as money, s as INDUSTRY_META, t as AppShell, x as useStats } from "./ui-C7fR5Lgf.mjs";
import { a as CartesianGrid, c as Cell, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Bar, r as YAxis, s as Pie, t as PieChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-D5tR_sRf.js
var import_jsx_runtime = require_jsx_runtime();
var COLORS = [
	"#ef6d9a",
	"#5aa3ea",
	"#62b56a",
	"#ef9a3a",
	"#8b6cf0",
	"#4eb4bc"
];
function ReportsPage() {
	const items = useIMS((s) => s.items);
	const orders = useIMS((s) => s.orders);
	const stats = useStats();
	const settings = useIMS((s) => s.settings);
	const byIndustry = Object.keys(INDUSTRY_META).map((k) => {
		const list = items.filter((i) => i.industry === k);
		return {
			name: INDUSTRY_META[k].title.split("&")[0].trim(),
			units: list.reduce((s, i) => s + (i.category === "License" ? 0 : i.qty), 0),
			value: list.reduce((s, i) => s + (i.licenseTotal ? i.licenseTotal * i.unitCost : i.qty * i.unitCost), 0),
			low: list.filter((i) => i.qty <= i.reorderPoint).length
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Reports",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-muted",
						children: "Inventory value"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold tabular",
						children: money(stats.totalValue, settings.currency)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-muted",
						children: "Units on hand"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold tabular",
						children: num(stats.totalUnits)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-muted",
						children: "Low-stock SKUs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold tabular text-danger",
						children: stats.lowStock
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-muted",
						children: "Open orders"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold tabular",
						children: stats.pendingOrders
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "h-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 font-display text-lg font-semibold",
						children: "Units by industry"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "85%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: byIndustry,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "#e4dcf4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: {
										fontSize: 11,
										fontWeight: 700
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "units",
									radius: [
										8,
										8,
										0,
										0
									],
									children: byIndustry.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i] }, i))
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "h-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 font-display text-lg font-semibold",
						children: "Value mix"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "85%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
							data: byIndustry,
							dataKey: "value",
							nameKey: "name",
							innerRadius: 50,
							outerRadius: 80,
							paddingAngle: 3,
							children: byIndustry.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i] }, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => money(v, settings.currency) })] })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 font-display text-lg font-semibold",
					children: "Demand snapshot"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-semibold text-muted",
					children: [
						orders.filter((o) => o.type === "sales").length,
						" sales orders in the ledger. Low-stock SKUs:",
						" ",
						items.filter((i) => i.qty <= i.reorderPoint).map((i) => i.name).join(", ") || "none",
						"."
					]
				})]
			})
		]
	});
}
//#endregion
export { ReportsPage as component };
