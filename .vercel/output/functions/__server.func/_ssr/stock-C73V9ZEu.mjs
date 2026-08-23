import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as useIMS, c as Input, h as num, i as Card, o as Field, r as Button, t as AppShell, u as Select } from "./ui-C7fR5Lgf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock-C73V9ZEu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StockPage() {
	const items = useIMS((s) => s.items);
	const locations = useIMS((s) => s.locations);
	const moves = useIMS((s) => s.moves);
	const adjust = useIMS((s) => s.adjustQty);
	const scanAdjust = useIMS((s) => s.scanAdjust);
	const [itemId, setItemId] = (0, import_react.useState)(items[0]?.id ?? "");
	const [qty, setQty] = (0, import_react.useState)(10);
	const [code, setCode] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("in");
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Receive & issue",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Manual movement"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Direction",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: mode,
							onChange: (e) => setMode(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "in",
								children: "Stock in (receive)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "out",
								children: "Stock out (issue)"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Item",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: itemId,
							onChange: (e) => setItemId(e.target.value),
							children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: i.id,
								children: [
									i.name,
									" (",
									num(i.qty),
									" on hand)"
								]
							}, i.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Quantity",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							value: qty,
							onChange: (e) => setQty(Number(e.target.value))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: receive,
						children: mode === "in" ? "Receive" : "Issue"
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Barcode scan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-muted",
					children: "Type a barcode or SKU — same as waving a scanner."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Barcode / SKU",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: code,
								onChange: (e) => setCode(e.target.value),
								placeholder: "890123400001 or RTL-TEE-01"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "pink",
							onClick: scan,
							children: "Scan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-muted",
							children: "Try 890123400001 (Classic Cotton Tee) or HC-INS-21 (Insulin)."
						})
					]
				})
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 font-display text-lg font-semibold",
				children: "Recent movements"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 text-sm font-bold",
				children: moves.slice(0, 12).map((m) => {
					const it = items.find((i) => i.id === m.itemId);
					const loc = locations.find((l) => l.id === m.to || l.id === m.from);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap justify-between gap-2 border-b border-border py-2 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							m.type,
							" · ",
							it?.name ?? m.itemId,
							" · ",
							num(m.qty)
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [m.note, loc ? ` · ${loc.code}` : ""]
						})]
					}, m.id);
				})
			})]
		})]
	});
}
//#endregion
export { StockPage as component };
