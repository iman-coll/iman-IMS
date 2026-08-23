import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as useIMS, i as Card, n as Badge, r as Button, t as AppShell, v as useAlerts } from "./ui-C7fR5Lgf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alerts-BQL67-Fm.js
var import_jsx_runtime = require_jsx_runtime();
function AlertsPage() {
	const alerts = useAlerts();
	const dismiss = useIMS((s) => s.dismissAlert);
	const addOrder = useIMS((s) => s.addOrder);
	const items = useIMS((s) => s.items);
	const suppliers = useIMS((s) => s.suppliers);
	const navigate = useNavigate();
	const unread = alerts.filter((a) => !a.read);
	function reorder(itemId) {
		const it = items.find((i) => i.id === itemId);
		if (!it) return;
		const sup = suppliers.find((s) => s.id === it.supplierId);
		addOrder({
			type: "purchase",
			status: "pending",
			partner: sup?.name ?? "Supplier",
			notes: "Generated from alert",
			lines: [{
				itemId: it.id,
				qty: Math.max(it.reorderPoint * 2 - it.qty, it.reorderPoint),
				price: it.unitCost
			}]
		});
		toast.success("Purchase order drafted");
		navigate({ to: "/orders" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Alerts",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 text-sm font-bold text-muted",
			children: [
				unread.length,
				" open · ",
				alerts.length,
				" total"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: alerts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: a.read ? "opacity-60" : "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: a.severity === "critical" ? "danger" : a.severity === "warn" ? "orange" : "muted",
						children: a.kind.replace("_", " ")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-bold",
						children: a.message
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [(a.kind === "low_stock" || a.kind === "critical" || a.kind === "perishable") && a.itemId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => reorder(a.itemId),
							children: "Reorder"
						}) : null, !a.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "soft",
							onClick: () => dismiss(a.id),
							children: "Dismiss"
						}) : null]
					})]
				})
			}, a.id))
		})]
	});
}
//#endregion
export { AlertsPage as component };
