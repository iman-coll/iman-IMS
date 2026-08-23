import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as useIMS, h as num, i as Card, n as Badge, o as Field, r as Button, t as AppShell, u as Select } from "./ui-C7fR5Lgf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/locations-C2dMAPtK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LocationsPage() {
	const locations = useIMS((s) => s.locations);
	const items = useIMS((s) => s.items);
	const transfer = useIMS((s) => s.transfer);
	const [from, setFrom] = (0, import_react.useState)(items[0]?.id ?? "");
	const [to, setTo] = (0, import_react.useState)(locations[0]?.id ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Locations",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-semibold",
				children: "Move an item"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Item",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: from,
							onChange: (e) => setFrom(e.target.value),
							children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: i.id,
								children: i.name
							}, i.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "To bin",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: to,
							onChange: (e) => setTo(e.target.value),
							children: locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: l.id,
								children: [
									l.code,
									" — ",
									l.name
								]
							}, l.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								transfer(from, to);
								toast.success("Transferred");
							},
							children: "Transfer"
						})
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: locations.map((l) => {
				const here = items.filter((i) => i.locationId === l.id);
				const units = here.reduce((s, i) => s + i.qty, 0);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl font-semibold",
							children: l.code
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-muted",
							children: l.name
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "primary",
							children: l.type
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm font-bold",
						children: l.warehouse
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							here.length,
							" SKUs · ",
							num(units),
							" units"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 grid gap-1 text-sm font-semibold",
						children: here.slice(0, 4).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular",
								children: num(i.qty)
							})]
						}, i.id))
					})
				] }, l.id);
			})
		})]
	});
}
//#endregion
export { LocationsPage as component };
