import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, f as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as uid, b as useIMS, c as Input, h as num, i as Card, l as Modal, m as money, n as Badge, o as Field, r as Button, s as INDUSTRY_META, t as AppShell, u as Select } from "./ui-C7fR5Lgf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/items-hHqsUBJ9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ItemsPage() {
	const searchStr = useRouterState({ select: (s) => s.location.searchStr });
	const params = new URLSearchParams(searchStr.startsWith("?") ? searchStr : `?${searchStr}`);
	const items = useIMS((s) => s.items);
	const locations = useIMS((s) => s.locations);
	const suppliers = useIMS((s) => s.suppliers);
	const settings = useIMS((s) => s.settings);
	const adjustQty = useIMS((s) => s.adjustQty);
	const addItem = useIMS((s) => s.addItem);
	const setItem = useIMS((s) => s.setItem);
	const removeItem = useIMS((s) => s.removeItem);
	const [q, setQ] = (0, import_react.useState)(params.get("q") ?? "");
	const [industry, setIndustry] = (0, import_react.useState)(params.get("industry") ?? "all");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return items.filter((i) => {
			if (industry !== "all" && i.industry !== industry) return false;
			if (!needle) return true;
			return i.name.toLowerCase().includes(needle) || i.sku.toLowerCase().includes(needle) || i.barcode.includes(needle) || i.category.toLowerCase().includes(needle);
		});
	}, [
		items,
		q,
		industry
	]);
	function save() {
		if (!editing?.name || !editing.sku) {
			toast.error("Name and SKU are required");
			return;
		}
		const loc = editing.locationId || locations[0]?.id || "";
		const sup = editing.supplierId || suppliers[0]?.id || "";
		if (editing.id) {
			const prev = items.find((i) => i.id === editing.id);
			if (prev) setItem({
				...prev,
				...editing
			});
			toast.success("Item updated");
		} else {
			addItem({
				sku: editing.sku,
				name: editing.name,
				industry: editing.industry || "retail",
				category: editing.category || "General",
				qty: Number(editing.qty) || 0,
				reorderPoint: Number(editing.reorderPoint) || settings.defaultReorder,
				unitCost: Number(editing.unitCost) || 0,
				locationId: loc,
				barcode: editing.barcode || uid("bc").replace("_", ""),
				supplierId: sup,
				channel: editing.channel,
				expiry: editing.expiry,
				lot: editing.lot,
				perishable: editing.perishable,
				critical: editing.critical
			});
			toast.success("Item added to inventory");
		}
		setEditing(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Items",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Search",
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Name, SKU, barcode…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Industry",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: industry,
							onChange: (e) => setIndustry(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All industries"
							}), Object.entries(INDUSTRY_META).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: v.title
							}, k))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setEditing({
							industry: "retail",
							qty: 0,
							reorderPoint: settings.defaultReorder,
							unitCost: 0
						}),
						children: "Add item"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-x-auto p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border bg-bg-tint text-xs font-extrabold tracking-wide text-muted uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Item"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Industry"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "On hand"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Location"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Value"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((i) => {
						const loc = locations.find((l) => l.id === i.locationId);
						const low = i.qty <= i.reorderPoint;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-extrabold",
										children: i.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-bold text-muted",
										children: [
											i.sku,
											" · ",
											i.barcode
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: tone(i.industry),
										children: i.industry
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: low ? "font-extrabold text-danger tabular" : "font-extrabold tabular",
											children: num(i.qty)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-1 text-xs text-muted",
											children: ["min ", i.reorderPoint]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "rounded-lg bg-bg px-2 py-0.5 text-xs font-extrabold",
												onClick: () => adjustQty(i.id, -1, "Manual issue", "out"),
												children: "−"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "rounded-lg bg-bg px-2 py-0.5 text-xs font-extrabold",
												onClick: () => adjustQty(i.id, 1, "Manual receive", "in"),
												children: "+"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-xs font-bold text-muted",
									children: loc ? `${loc.code} · ${loc.warehouse}` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-extrabold tabular",
									children: money(i.qty * i.unitCost, settings.currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "mr-2 text-xs font-extrabold text-primary",
										onClick: () => setEditing(i),
										children: "Edit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "text-xs font-extrabold text-danger",
										onClick: () => {
											removeItem(i.id);
											toast.success("Removed");
										},
										children: "Delete"
									})]
								})
							]
						}, i.id);
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: !!editing,
				title: editing?.id ? "Edit item" : "Add item",
				onClose: () => setEditing(null),
				wide: true,
				children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.name ?? "",
								onChange: (e) => setEditing({
									...editing,
									name: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "SKU",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.sku ?? "",
								onChange: (e) => setEditing({
									...editing,
									sku: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Industry",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: editing.industry ?? "retail",
								onChange: (e) => setEditing({
									...editing,
									industry: e.target.value
								}),
								children: Object.keys(INDUSTRY_META).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: INDUSTRY_META[k].title
								}, k))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.category ?? "",
								onChange: (e) => setEditing({
									...editing,
									category: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Quantity",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: editing.qty ?? 0,
								onChange: (e) => setEditing({
									...editing,
									qty: Number(e.target.value)
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Reorder point",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: editing.reorderPoint ?? 0,
								onChange: (e) => setEditing({
									...editing,
									reorderPoint: Number(e.target.value)
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Unit cost",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: "0.01",
								value: editing.unitCost ?? 0,
								onChange: (e) => setEditing({
									...editing,
									unitCost: Number(e.target.value)
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Barcode",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.barcode ?? "",
								onChange: (e) => setEditing({
									...editing,
									barcode: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Location",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: editing.locationId ?? locations[0]?.id,
								onChange: (e) => setEditing({
									...editing,
									locationId: e.target.value
								}),
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Supplier",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: editing.supplierId ?? suppliers[0]?.id,
								onChange: (e) => setEditing({
									...editing,
									supplierId: e.target.value
								}),
								children: suppliers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: s.name
								}, s.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Expiry (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: editing.expiry ?? "",
								onChange: (e) => setEditing({
									...editing,
									expiry: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Lot / batch",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.lot ?? "",
								onChange: (e) => setEditing({
									...editing,
									lot: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !!editing.critical,
									onChange: (e) => setEditing({
										...editing,
										critical: e.target.checked
									})
								}), "Critical stock"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !!editing.perishable,
									onChange: (e) => setEditing({
										...editing,
										perishable: e.target.checked
									})
								}), "Perishable"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: save,
								children: "Save item"
							})
						})
					]
				}) : null
			})
		]
	});
}
function tone(i) {
	return {
		retail: "pink",
		manufacturing: "blue",
		healthcare: "green",
		food: "orange",
		warehouse: "primary",
		itam: "teal"
	}[i];
}
//#endregion
export { ItemsPage as component };
