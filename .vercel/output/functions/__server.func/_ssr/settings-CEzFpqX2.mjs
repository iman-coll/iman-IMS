import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as useIMS, c as Input, i as Card, o as Field, r as Button, t as AppShell, u as Select } from "./ui-C7fR5Lgf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CEzFpqX2.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const settings = useIMS((s) => s.settings);
	const update = useIMS((s) => s.updateSettings);
	const reset = useIMS((s) => s.resetDemo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Settings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "max-w-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Company",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: settings.company,
							onChange: (e) => update({ company: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Currency",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: settings.currency,
							onChange: (e) => update({ currency: e.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "USD",
									children: "USD"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "EUR",
									children: "EUR"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "GBP",
									children: "GBP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "PKR",
									children: "PKR"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Default reorder point",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: settings.defaultReorder,
							onChange: (e) => update({ defaultReorder: Number(e.target.value) })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Expiry warning (days)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: settings.expiryWarnDays,
							onChange: (e) => update({ expiryWarnDays: Number(e.target.value) })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: settings.autoReorder,
							onChange: (e) => update({ autoReorder: e.target.checked })
						}), "Suggest purchase orders when stock hits the reorder point"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						onClick: () => {
							reset();
							toast.success("Demo data restored");
						},
						children: "Reset demo data"
					})
				]
			})
		})
	});
}
//#endregion
export { SettingsPage as component };
