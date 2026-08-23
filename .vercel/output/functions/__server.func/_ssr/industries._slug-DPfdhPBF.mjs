import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as useIMS, c as Input, f as daysUntil, h as num, i as Card, m as money, n as Badge, o as Field, p as industryOf, r as Button, s as INDUSTRY_META, t as AppShell, u as Select } from "./ui-C7fR5Lgf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route } from "./router-WRc_beU_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/industries._slug-DPfdhPBF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IndustryPage() {
	const { slug } = Route.useParams();
	const industry = industryOf(slug);
	if (!industry) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Unknown module",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "font-bold text-primary",
			children: "Back to dashboard"
		})
	});
	const meta = INDUSTRY_META[industry];
	const [tab, setTab] = (0, import_react.useState)(meta.features[0]?.key ?? "");
	const allItems = useIMS((s) => s.items);
	const items = (0, import_react.useMemo)(() => allItems.filter((i) => i.industry === industry), [allItems, industry]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: tone(industry),
					children: meta.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight",
					children: meta.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-sm font-semibold text-muted",
					children: meta.blurb
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-sm font-extrabold text-primary",
				children: "← Dashboard"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: meta.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setTab(f.key),
				className: tab === f.key ? "rounded-full px-4 py-2 text-sm font-extrabold text-white" : "rounded-full border border-border bg-surface px-4 py-2 text-sm font-extrabold",
				style: tab === f.key ? { background: meta.color } : void 0,
				children: f.title
			}, f.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-muted",
				children: meta.features.find((f) => f.key === tab)?.body
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
			industry,
			tab,
			items
		})
	] });
}
function Tool({ industry, tab, items }) {
	if (industry === "retail") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetailTools, {
		tab,
		items
	});
	if (industry === "manufacturing") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfgTools, {
		tab,
		items
	});
	if (industry === "healthcare") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthTools, {
		tab,
		items
	});
	if (industry === "food") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodTools, {
		tab,
		items
	});
	if (industry === "warehouse") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhTools, {
		tab,
		items
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItamTools, {
		tab,
		items
	});
}
function RetailTools({ tab, items }) {
	const setChannelQty = useIMS((s) => s.setChannelQty);
	const scanAdjust = useIMS((s) => s.scanAdjust);
	const syncChannels = useIMS((s) => s.syncChannels);
	const allOrders = useIMS((s) => s.orders);
	const orders = (0, import_react.useMemo)(() => allOrders.filter((o) => o.type === "sales"), [allOrders]);
	const fulfill = useIMS((s) => s.fulfillOrder);
	const [code, setCode] = (0, import_react.useState)("890123400001");
	const [channel, setChannel] = (0, import_react.useState)("store");
	if (tab === "barcode") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: "Barcode scanning"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-muted",
			children: "Scan during a sale (−1) or a return (+1)."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Barcode / SKU",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: code,
						onChange: (e) => setCode(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Channel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: channel,
						onChange: (e) => setChannel(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "store",
							children: "Store"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "online",
							children: "Online"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "pink",
						onClick: () => {
							const hit = scanAdjust(code, -1, channel);
							hit ? toast.success(`Sold 1 ${hit.name}`) : toast.error("Not found");
						},
						children: "Sale"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => {
							const hit = scanAdjust(code, 1, channel);
							hit ? toast.success(`Returned 1 ${hit.name}`) : toast.error("Not found");
						},
						children: "Return"
					})]
				})
			]
		})
	] });
	if (tab === "fulfill") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-extrabold",
				children: [
					o.id,
					" · ",
					o.partner
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					o.status,
					" · ",
					o.channel
				]
			})] }), o.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "pink",
				onClick: () => {
					fulfill(o.id, "picking");
					toast.success("Picking started — stock deducted");
				},
				children: "Start pick"
			}) : o.status === "picking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => {
					fulfill(o.id, "packed");
					toast.success("Packed");
				},
				children: "Pack"
			}) : o.status === "packed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "green",
				onClick: () => {
					fulfill(o.id, "shipped");
					toast.success("Shipped");
				},
				children: "Ship"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "green",
				children: o.status
			})]
		}, o.id))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "grid gap-3 sm:grid-cols-[1fr_auto]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-extrabold",
					children: i.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Store ",
						num(i.storeQty ?? 0),
						" · Online ",
						num(i.onlineQty ?? 0),
						" · Total ",
						num(i.qty)
					]
				}),
				tab === "stock" || tab === "sync" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs font-bold",
							children: ["Store", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								className: "mt-1 w-24",
								value: i.storeQty ?? 0,
								onChange: (e) => setChannelQty(i.id, Number(e.target.value), i.onlineQty ?? 0)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs font-bold",
							children: ["Online", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								className: "mt-1 w-24",
								value: i.onlineQty ?? 0,
								onChange: (e) => setChannelQty(i.id, i.storeQty ?? 0, Number(e.target.value))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "self-end",
							onClick: () => {
								syncChannels(i.id);
								toast.success("Channels synced");
							},
							children: "Sync"
						})
					]
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: i.qty <= i.reorderPoint ? "danger" : "green",
				children: i.qty <= i.reorderPoint ? "Low" : "In stock"
			})]
		}, i.id))
	});
}
function MfgTools({ tab, items }) {
	const boms = useIMS((s) => s.boms);
	const start = useIMS((s) => s.startProduction);
	const finish = useIMS((s) => s.finishProduction);
	const setWip = useIMS((s) => s.setWip);
	const addOrder = useIMS((s) => s.addOrder);
	const suppliers = useIMS((s) => s.suppliers);
	const [qty, setQty] = (0, import_react.useState)(1);
	const raw = items.filter((i) => i.wipStatus === "raw");
	const wip = items.filter((i) => i.wipStatus === "wip");
	const fin = items.filter((i) => i.wipStatus === "finished");
	if (tab === "bom") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: boms.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg font-semibold",
			children: b.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 grid gap-1 text-sm font-bold",
			children: b.components.map((c) => {
				const it = useIMS.getState().itemById(c.itemId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it?.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular",
						children: [
							c.qty,
							" each · have ",
							num(it?.qty ?? 0)
						]
					})]
				}, c.itemId);
			})
		})] }, b.id))
	});
	if (tab === "jit") {
		const need = raw.filter((i) => i.qty <= i.reorderPoint);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Just-in-time suggestions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-muted",
				children: "Order only what the line is about to consume."
			}),
			need.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-bold",
				children: "Line is covered — no JIT buy needed."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-2",
				children: need.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold",
						children: [
							i.name,
							" · ",
							num(i.qty),
							" on hand"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "blue",
						onClick: () => {
							const sup = suppliers.find((s) => s.id === i.supplierId);
							addOrder({
								type: "purchase",
								status: "pending",
								partner: sup?.name ?? "Mill",
								notes: "JIT",
								lines: [{
									itemId: i.id,
									qty: i.reorderPoint * 2 - i.qty,
									price: i.unitCost
								}]
							});
							toast.success("JIT purchase drafted");
						},
						children: "Order now"
					})]
				}, i.id))
			})
		] });
	}
	if (tab === "wip") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 md:grid-cols-3",
		children: [
			"raw",
			"wip",
			"finished"
		].map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display font-semibold capitalize",
			children: col === "wip" ? "Work-in-progress" : col
		}), (col === "raw" ? raw : col === "wip" ? wip : fin).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "mt-2 w-full rounded-xl bg-bg px-3 py-2 text-left text-sm font-bold",
			onClick: () => {
				const next = col === "raw" ? "wip" : col === "wip" ? "finished" : "finished";
				setWip(i.id, next);
				toast.success(`${i.name} → ${next}`);
			},
			children: [i.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-0.5 block text-xs text-muted",
				children: [num(i.qty), " units"]
			})]
		}, i.id))] }, col))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: "Raw materials & build"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap items-end gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Build qty",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 1,
						value: qty,
						onChange: (e) => setQty(Number(e.target.value))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "blue",
					onClick: () => {
						const r = start("bom_motor", qty);
						r.ok ? toast.success(`Started ${qty} motor(s) — materials consumed`) : toast.error(`Missing: ${r.missing.join(", ")}`);
					},
					children: "Start production"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => {
						finish(qty);
						toast.success("Moved WIP to finished goods");
					},
					children: "Finish goods"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-2",
			children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex justify-between text-sm font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular",
					children: [
						num(i.qty),
						" · ",
						i.wipStatus
					]
				})]
			}, i.id))
		})
	] });
}
function HealthTools({ tab, items }) {
	const addOrder = useIMS((s) => s.addOrder);
	const suppliers = useIMS((s) => s.suppliers);
	const [lot, setLot] = (0, import_react.useState)("");
	const recalled = (0, import_react.useMemo)(() => {
		const q = lot.trim().toLowerCase();
		if (!q) return [];
		return items.filter((i) => (i.lot ?? "").toLowerCase().includes(q) || (i.batch ?? "").toLowerCase().includes(q));
	}, [lot, items]);
	if (tab === "batch") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: "Batch / lot recall"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Lot or batch number",
			className: "mt-3 max-w-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: lot,
				onChange: (e) => setLot(e.target.value),
				placeholder: "A12345 or B-9102"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-2",
			children: (lot ? recalled : items).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl bg-bg px-3 py-2 text-sm font-bold",
				children: [
					i.name,
					" · lot ",
					i.lot ?? "—",
					" · batch ",
					i.batch ?? "—",
					" · ",
					num(i.qty),
					" on hand"
				]
			}, i.id))
		}),
		lot && recalled.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-3",
			variant: "danger",
			onClick: () => toast.success(`Recall notice drafted for lot ${lot} (${recalled.length} SKU)`),
			children: "Draft recall"
		}) : null
	] });
	if (tab === "asset") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: items.filter((i) => i.category === "Asset" || i.critical).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-extrabold",
			children: i.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				i.lifecycle ?? "tracked",
				" · ",
				num(i.qty),
				" · ",
				money(i.unitCost)
			]
		})] }, i.id))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: items.slice().sort((a, b) => (a.expiry ?? "9999").localeCompare(b.expiry ?? "9999")).map((i) => {
			const d = i.expiry ? daysUntil(i.expiry) : null;
			const hot = d != null && d <= 30;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: hot ? "border-danger/40" : "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-extrabold",
						children: i.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold text-muted",
						children: [
							i.expiry ? `EXP ${i.expiry}` : "No expiry",
							" ",
							d != null ? `· ${d < 0 ? "expired" : `${d} days`}` : "",
							i.lot ? ` · lot ${i.lot}` : ""
						]
					})] }), i.qty <= i.reorderPoint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "green",
						onClick: () => {
							const sup = suppliers.find((s) => s.id === i.supplierId);
							addOrder({
								type: "purchase",
								status: "pending",
								partner: sup?.name ?? "MediLot",
								notes: "Critical restock",
								lines: [{
									itemId: i.id,
									qty: i.reorderPoint * 2,
									price: i.unitCost
								}]
							});
							toast.success("Critical restock PO drafted");
						},
						children: "Restock"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: hot ? "danger" : "green",
						children: [num(i.qty), " on hand"]
					})]
				})
			}, i.id);
		})
	});
}
function FoodTools({ tab, items }) {
	const recipes = useIMS((s) => s.recipes);
	const sell = useIMS((s) => s.sellRecipe);
	const addOrder = useIMS((s) => s.addOrder);
	const suppliers = useIMS((s) => s.suppliers);
	const settings = useIMS((s) => s.settings);
	const fifo = items.slice().sort((a, b) => (a.fifoDate ?? "").localeCompare(b.fifoDate ?? ""));
	if (tab === "recipe") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 md:grid-cols-2",
		children: recipes.map((r) => {
			const cost = r.ingredients.reduce((s, ing) => {
				return s + (useIMS.getState().itemById(ing.itemId)?.unitCost ?? 0) * ing.qty;
			}, 0);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: r.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-bold text-muted",
					children: [
						"Sell ",
						money(r.salePrice, settings.currency),
						" · food cost ",
						money(cost, settings.currency)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 text-sm font-bold",
					children: r.ingredients.map((ing) => {
						const it = useIMS.getState().itemById(ing.itemId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							it?.name,
							" × ",
							ing.qty,
							" (have ",
							num(it?.qty ?? 0),
							")"
						] }, ing.itemId);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: "orange",
					onClick: () => {
						const res = sell(r.id, 1);
						res.ok ? toast.success(`Sold ${r.name} — ingredients deducted`) : toast.error(`Missing ${res.missing.join(", ")}`);
					},
					children: "Sell 1 plate"
				})
			] }, r.id);
		})
	});
	if (tab === "supplier") {
		const low = items.filter((i) => i.qty <= i.reorderPoint);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: "Kitchen restock"
		}), low.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-bold",
				children: i.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "orange",
				onClick: () => {
					const sup = suppliers.find((s) => s.id === i.supplierId);
					addOrder({
						type: "purchase",
						status: "pending",
						partner: sup?.name ?? "Freshfield",
						notes: "Kitchen auto-order",
						lines: [{
							itemId: i.id,
							qty: i.reorderPoint * 2 - i.qty,
							price: i.unitCost
						}]
					});
					toast.success("Supplier order drafted");
				},
				children: "Order"
			})]
		}, i.id))] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: "FIFO — oldest first"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-muted",
			children: "Use the top of the list before anything else."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-3 grid gap-2",
			children: fifo.map((i, idx) => {
				const d = i.expiry ? daysUntil(i.expiry) : null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between rounded-xl bg-bg px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold",
						children: [
							idx + 1,
							". ",
							i.name,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 text-xs text-muted",
								children: [
									"in ",
									i.fifoDate ?? "—",
									" · exp ",
									i.expiry ?? "—"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: d != null && d <= 5 ? "danger" : "orange",
						children: num(i.qty)
					})]
				}, i.id);
			})
		})
	] });
}
function WhTools({ tab, items }) {
	const locations = useIMS((s) => s.locations);
	const transfer = useIMS((s) => s.transfer);
	const cycleCount = useIMS((s) => s.cycleCount);
	const crossDock = useIMS((s) => s.crossDock);
	const scanAdjust = useIMS((s) => s.scanAdjust);
	const [bin, setBin] = (0, import_react.useState)(locations[0]?.id ?? "");
	const [code, setCode] = (0, import_react.useState)("");
	const [counts, setCounts] = (0, import_react.useState)({});
	const here = items.filter((i) => i.locationId === bin);
	if (tab === "scan") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-lg font-semibold",
		children: "Receive by scan"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 flex flex-wrap gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: code,
			onChange: (e) => setCode(e.target.value),
			placeholder: "Barcode",
			className: "max-w-xs"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => {
				const hit = scanAdjust(code, 1);
				hit ? toast.success(`Received 1 ${hit.name}`) : toast.error("Unknown code");
				setCode("");
			},
			children: "Scan in"
		})]
	})] });
	if (tab === "dock") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: "Cross-dock"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-muted",
			children: "Move inbound goods straight to the outbound dock and issue them."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-2",
			children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold",
					children: i.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => {
						crossDock(i.id, Math.min(1, i.qty));
						toast.success("Cross-docked 1 unit to outbound");
					},
					children: "Dock 1"
				})]
			}, i.id))
		})
	] });
	if (tab === "cycle") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: "Cycle count"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Bin",
			className: "max-w-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: bin,
				onChange: (e) => {
					setBin(e.target.value);
					setCounts({});
				},
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-2",
			children: here.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-bold",
					children: [
						i.name,
						" (system ",
						num(i.qty),
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					className: "w-24",
					value: counts[i.id] ?? i.qty,
					onChange: (e) => setCounts({
						...counts,
						[i.id]: Number(e.target.value)
					})
				})]
			}, i.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-3",
			onClick: () => {
				cycleCount(bin, Object.keys(counts).length ? counts : Object.fromEntries(here.map((i) => [i.id, i.qty])));
				toast.success("Cycle count posted");
			},
			children: "Post count"
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
		children: locations.map((l) => {
			const list = useIMS.getState().items.filter((i) => i.locationId === l.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "rounded-2xl border border-border bg-surface p-4 text-left shadow-[var(--shadow-card)]",
				onClick: () => {
					const first = items[0];
					if (first) {
						transfer(first.id, l.id);
						toast.success(`Mapped ${first.name} → ${l.code}`);
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold",
						children: l.code
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-muted",
						children: l.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs font-bold",
						children: [list.length, " SKUs"]
					})
				]
			}, l.id);
		})
	});
}
function ItamTools({ tab, items }) {
	const assign = useIMS((s) => s.assignLicense);
	const setLifecycle = useIMS((s) => s.setLifecycle);
	const hw = items.filter((i) => i.category === "Hardware");
	const lic = items.filter((i) => i.category === "License");
	if (tab === "lic") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: lic.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-extrabold",
				children: i.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					i.licenseUsed,
					"/",
					i.licenseTotal,
					" seats"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-2 overflow-hidden rounded-full bg-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-teal",
					style: { width: `${Math.min(100, (i.licenseUsed ?? 0) / (i.licenseTotal || 1) * 100)}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "teal",
					onClick: () => assign(i.id, 1),
					children: "Assign seat"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => assign(i.id, -1),
					children: "Release"
				})]
			})
		] }, i.id))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: hw.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-extrabold",
				children: i.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					num(i.qty),
					" units · ",
					i.lifecycle
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: i.lifecycle ?? "active",
				onChange: (e) => setLifecycle(i.id, e.target.value),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "active",
						children: "Active"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "repair",
						children: "Repair"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "retire",
						children: "Retire"
					})
				]
			})]
		}, i.id))
	});
}
function tone(id) {
	return {
		retail: "pink",
		manufacturing: "blue",
		healthcare: "green",
		food: "orange",
		warehouse: "primary",
		itam: "teal"
	}[id];
}
//#endregion
export { IndustryPage as component };
