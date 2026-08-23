import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as useIMS, c as Input, g as shortDate, i as Card, l as Modal, m as money, n as Badge, o as Field, r as Button, t as AppShell, u as Select } from "./ui-C7fR5Lgf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-DwqQYN0m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FLOW = {
	pending: "picking",
	picking: "packed",
	packed: "shipped"
};
function OrdersPage() {
	const orders = useIMS((s) => s.orders);
	const items = useIMS((s) => s.items);
	const settings = useIMS((s) => s.settings);
	const fulfill = useIMS((s) => s.fulfillOrder);
	const addOrder = useIMS((s) => s.addOrder);
	const receive = useIMS((s) => s.receivePurchase);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)({
		type: "sales",
		partner: "",
		itemId: items[0]?.id ?? "",
		qty: 1,
		channel: "online"
	});
	function total(o) {
		return o.lines.reduce((s, l) => s + l.qty * l.price, 0);
	}
	function advance(o) {
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
			channel: draft.type === "sales" ? draft.channel : void 0,
			notes: "",
			lines: [{
				itemId: item.id,
				qty: draft.qty,
				price: item.unitCost * (draft.type === "sales" ? 2.2 : 1)
			}]
		});
		toast.success("Order created");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Orders",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setOpen(true),
					children: "New order"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-extrabold",
									children: o.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: o.type === "sales" ? "pink" : "blue",
									children: o.type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: o.status === "pending" ? "orange" : o.status === "shipped" || o.status === "received" ? "green" : "primary",
									children: o.status
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm font-semibold text-muted",
							children: [
								o.partner,
								" · ",
								shortDate(o.createdAt),
								" ",
								o.channel ? `· ${o.channel}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 text-sm font-bold",
							children: o.lines.map((l) => {
								const it = items.find((i) => i.id === l.itemId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									it?.name ?? l.itemId,
									" × ",
									l.qty
								] }, l.itemId);
							})
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl font-semibold tabular",
							children: money(total(o), settings.currency)
						}), o.status !== "shipped" && o.status !== "received" && o.status !== "cancelled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => advance(o),
							children: o.type === "purchase" ? "Receive" : o.status === "pending" ? "Start pick" : o.status === "picking" ? "Pack" : "Ship"
						}) : null]
					})]
				}, o.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open,
				title: "New order",
				onClose: () => setOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: draft.type,
								onChange: (e) => setDraft({
									...draft,
									type: e.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "sales",
									children: "Sales"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "purchase",
									children: "Purchase"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Customer / supplier",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.partner,
								onChange: (e) => setDraft({
									...draft,
									partner: e.target.value
								})
							})
						}),
						draft.type === "sales" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Channel",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: draft.channel,
								onChange: (e) => setDraft({
									...draft,
									channel: e.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "online",
									children: "Online"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "store",
									children: "Store"
								})]
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Item",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: draft.itemId,
								onChange: (e) => setDraft({
									...draft,
									itemId: e.target.value
								}),
								children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: i.id,
									children: i.name
								}, i.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Quantity",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 1,
								value: draft.qty,
								onChange: (e) => setDraft({
									...draft,
									qty: Number(e.target.value)
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: create,
							children: "Create order"
						})
					]
				})
			})
		]
	});
}
//#endregion
export { OrdersPage as component };
