import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as uid, b as useIMS, c as Input, i as Card, l as Modal, o as Field, r as Button, t as AppShell } from "./ui-C7fR5Lgf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/suppliers-VF-n4U9y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SuppliersPage() {
	const suppliers = useIMS((s) => s.suppliers);
	const items = useIMS((s) => s.items);
	const addOrder = useIMS((s) => s.addOrder);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)({});
	function save() {
		if (!draft.name) return toast.error("Name required");
		useIMS.setState((s) => {
			const next = {
				...s,
				suppliers: [{
					id: uid("sup"),
					name: draft.name,
					leadDays: Number(draft.leadDays) || 7,
					email: draft.email || "",
					phone: draft.phone || "",
					category: draft.category || "General"
				}, ...s.suppliers]
			};
			localStorage.setItem("stocklot-ims-v1", JSON.stringify(next));
			return next;
		});
		toast.success("Supplier added");
		setOpen(false);
	}
	function restock(sup) {
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
			lines: low.map((i) => ({
				itemId: i.id,
				qty: Math.max(i.reorderPoint * 2 - i.qty, i.reorderPoint),
				price: i.unitCost
			}))
		});
		toast.success(`Drafted PO for ${low.length} item(s)`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Suppliers",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						setDraft({});
						setOpen(true);
					},
					children: "Add supplier"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: suppliers.map((s) => {
					const catalog = items.filter((i) => i.supplierId === s.id);
					const low = catalog.filter((i) => i.qty <= i.reorderPoint);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold",
							children: s.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold text-muted",
							children: [
								s.category,
								" · lead ",
								s.leadDays,
								"d"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-bold",
							children: s.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: s.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm font-bold",
							children: [
								catalog.length,
								" SKUs · ",
								low.length,
								" below reorder"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-3",
							variant: "ghost",
							onClick: () => restock(s),
							children: "Draft restock PO"
						})
					] }, s.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open,
				title: "Add supplier",
				onClose: () => setOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.name ?? "",
								onChange: (e) => setDraft({
									...draft,
									name: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.category ?? "",
								onChange: (e) => setDraft({
									...draft,
									category: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Lead days",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: draft.leadDays ?? 7,
								onChange: (e) => setDraft({
									...draft,
									leadDays: Number(e.target.value)
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.email ?? "",
								onChange: (e) => setDraft({
									...draft,
									email: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.phone ?? "",
								onChange: (e) => setDraft({
									...draft,
									phone: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: save,
							children: "Save"
						})
					]
				})
			})
		]
	});
}
//#endregion
export { SuppliersPage as component };
