import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, f as useRouterState, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Plus, d as LayoutDashboard, f as ClipboardList, g as Bell, h as Boxes, i as Truck, l as Menu, m as ChartColumn, n as Warehouse, o as ShoppingCart, s as Settings, t as X, u as MapPin } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-C7fR5Lgf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BoxMascot({ className = "h-16 w-16" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 80 80",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12",
				y: "24",
				width: "56",
				height: "46",
				rx: "10",
				fill: "#E8B86D"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12",
				y: "24",
				width: "56",
				height: "14",
				rx: "8",
				fill: "#D7A45A"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "34",
				y: "16",
				width: "12",
				height: "12",
				rx: "3",
				fill: "#C9924C"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "50",
				r: "4.2",
				fill: "#3A2A1A"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "48",
				cy: "50",
				r: "4.2",
				fill: "#3A2A1A"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M36 58c4 5 8 5 12 0",
				fill: "none",
				stroke: "#3A2A1A",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "26",
				cy: "54",
				r: "3.4",
				fill: "#F4A7B9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "54",
				cy: "54",
				r: "3.4",
				fill: "#F4A7B9"
			})
		]
	});
}
function CloudBuddy({ className = "h-12 w-16" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 72 48",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "28",
				cy: "28",
				rx: "18",
				ry: "14",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "44",
				cy: "26",
				rx: "16",
				ry: "13",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "36",
				cy: "20",
				rx: "14",
				ry: "12",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "30",
				cy: "24",
				r: "2.2",
				fill: "#3A2A1A"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "42",
				cy: "24",
				r: "2.2",
				fill: "#3A2A1A"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 30c3 3 7 3 10 0",
				fill: "none",
				stroke: "#3A2A1A",
				strokeWidth: "2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "26",
				cy: "28",
				r: "2",
				fill: "#F4A7B9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "46",
				cy: "28",
				r: "2",
				fill: "#F4A7B9"
			})
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var TODAY = "2026-08-23";
var defaultSettings = {
	company: "Stocklot HQ",
	currency: "USD",
	defaultReorder: 20,
	expiryWarnDays: 30,
	autoReorder: true
};
var locations = [
	{
		id: "loc_a01",
		code: "A-01",
		name: "Retail floor — apparel",
		type: "aisle",
		warehouse: "Storefront"
	},
	{
		id: "loc_a02",
		code: "A-02",
		name: "Retail floor — accessories",
		type: "shelf",
		warehouse: "Storefront"
	},
	{
		id: "loc_b01",
		code: "B-01",
		name: "Pick face — fast movers",
		type: "bin",
		warehouse: "Main DC"
	},
	{
		id: "loc_b02",
		code: "B-02",
		name: "Reserve rack",
		type: "shelf",
		warehouse: "Main DC"
	},
	{
		id: "loc_c01",
		code: "C-01",
		name: "Inbound dock",
		type: "dock",
		warehouse: "Main DC"
	},
	{
		id: "loc_c02",
		code: "C-02",
		name: "Outbound dock",
		type: "dock",
		warehouse: "Main DC"
	},
	{
		id: "loc_m1",
		code: "M-01",
		name: "Raw materials cage",
		type: "bin",
		warehouse: "Plant 1"
	},
	{
		id: "loc_m2",
		code: "M-02",
		name: "Assembly line",
		type: "aisle",
		warehouse: "Plant 1"
	},
	{
		id: "loc_h1",
		code: "H-01",
		name: "Pharmacy fridge",
		type: "cold",
		warehouse: "Clinic"
	},
	{
		id: "loc_h2",
		code: "H-02",
		name: "Secure cabinet",
		type: "secure",
		warehouse: "Clinic"
	},
	{
		id: "loc_k1",
		code: "K-01",
		name: "Walk-in cooler",
		type: "cold",
		warehouse: "Kitchen"
	},
	{
		id: "loc_k2",
		code: "K-02",
		name: "Dry store",
		type: "shelf",
		warehouse: "Kitchen"
	},
	{
		id: "loc_it",
		code: "IT-01",
		name: "IT cage",
		type: "secure",
		warehouse: "HQ"
	}
];
var suppliers = [
	{
		id: "sup_1",
		name: "Northwind Apparel",
		leadDays: 7,
		email: "orders@northwind.example",
		category: "Retail",
		phone: "555-0140"
	},
	{
		id: "sup_2",
		name: "Alloy & Gear Co.",
		leadDays: 12,
		email: "sales@alloygear.example",
		category: "Manufacturing",
		phone: "555-0188"
	},
	{
		id: "sup_3",
		name: "MediLot Pharma",
		leadDays: 4,
		email: "supply@medilot.example",
		category: "Healthcare",
		phone: "555-0201"
	},
	{
		id: "sup_4",
		name: "Freshfield Produce",
		leadDays: 1,
		email: "hello@freshfield.example",
		category: "Food",
		phone: "555-0112"
	},
	{
		id: "sup_5",
		name: "Harbor Freight Logistics",
		leadDays: 3,
		email: "dock@harbor.example",
		category: "Warehouse",
		phone: "555-0166"
	},
	{
		id: "sup_6",
		name: "Cloudstack Licensing",
		leadDays: 2,
		email: "seats@cloudstack.example",
		category: "ITAM",
		phone: "555-0199"
	}
];
var items = [
	{
		id: "itm_tee",
		sku: "RTL-TEE-01",
		name: "Classic Cotton Tee",
		industry: "retail",
		category: "Apparel",
		qty: 120,
		storeQty: 48,
		onlineQty: 72,
		reorderPoint: 40,
		unitCost: 8.5,
		locationId: "loc_a01",
		barcode: "890123400001",
		supplierId: "sup_1",
		channel: "both"
	},
	{
		id: "itm_tote",
		sku: "RTL-TOT-02",
		name: "Canvas Tote",
		industry: "retail",
		category: "Bags",
		qty: 64,
		storeQty: 22,
		onlineQty: 42,
		reorderPoint: 18,
		unitCost: 11,
		locationId: "loc_a02",
		barcode: "890123400002",
		supplierId: "sup_1",
		channel: "both"
	},
	{
		id: "itm_shoe",
		sku: "RTL-SNK-03",
		name: "City Sneakers",
		industry: "retail",
		category: "Footwear",
		qty: 36,
		storeQty: 12,
		onlineQty: 24,
		reorderPoint: 16,
		unitCost: 32,
		locationId: "loc_a01",
		barcode: "890123400003",
		supplierId: "sup_1",
		channel: "both"
	},
	{
		id: "itm_bag",
		sku: "RTL-BAG-04",
		name: "Crossbody Mini",
		industry: "retail",
		category: "Bags",
		qty: 18,
		storeQty: 6,
		onlineQty: 12,
		reorderPoint: 20,
		unitCost: 24,
		locationId: "loc_a02",
		barcode: "890123400004",
		supplierId: "sup_1",
		channel: "both"
	},
	{
		id: "itm_hat",
		sku: "RTL-HAT-05",
		name: "Soft Brim Hat",
		industry: "retail",
		category: "Apparel",
		qty: 54,
		storeQty: 30,
		onlineQty: 24,
		reorderPoint: 15,
		unitCost: 9,
		locationId: "loc_a01",
		barcode: "890123400005",
		supplierId: "sup_1",
		channel: "store"
	},
	{
		id: "itm_coil",
		sku: "MFG-STL-10",
		name: "Steel Coil 2mm",
		industry: "manufacturing",
		category: "Raw",
		qty: 42,
		reorderPoint: 20,
		unitCost: 86,
		locationId: "loc_m1",
		barcode: "890123410010",
		supplierId: "sup_2",
		wipStatus: "raw"
	},
	{
		id: "itm_rod",
		sku: "MFG-ALU-11",
		name: "Aluminum Rod",
		industry: "manufacturing",
		category: "Raw",
		qty: 80,
		reorderPoint: 30,
		unitCost: 14,
		locationId: "loc_m1",
		barcode: "890123410011",
		supplierId: "sup_2",
		wipStatus: "raw"
	},
	{
		id: "itm_gear",
		sku: "MFG-GER-12",
		name: "Gear Blank",
		industry: "manufacturing",
		category: "Component",
		qty: 26,
		reorderPoint: 24,
		unitCost: 7.5,
		locationId: "loc_m1",
		barcode: "890123410012",
		supplierId: "sup_2",
		wipStatus: "raw"
	},
	{
		id: "itm_assy",
		sku: "MFG-WIP-13",
		name: "Motor Housing (WIP)",
		industry: "manufacturing",
		category: "WIP",
		qty: 9,
		reorderPoint: 4,
		unitCost: 48,
		locationId: "loc_m2",
		barcode: "890123410013",
		supplierId: "sup_2",
		wipStatus: "wip",
		bomId: "bom_motor"
	},
	{
		id: "itm_motor",
		sku: "MFG-FIN-14",
		name: "Finished Mini Motor",
		industry: "manufacturing",
		category: "Finished",
		qty: 14,
		reorderPoint: 8,
		unitCost: 72,
		locationId: "loc_b01",
		barcode: "890123410014",
		supplierId: "sup_2",
		wipStatus: "finished",
		bomId: "bom_motor"
	},
	{
		id: "itm_wire",
		sku: "MFG-CPR-15",
		name: "Copper Wire Spool",
		industry: "manufacturing",
		category: "Raw",
		qty: 11,
		reorderPoint: 12,
		unitCost: 19,
		locationId: "loc_m1",
		barcode: "890123410015",
		supplierId: "sup_2",
		wipStatus: "raw"
	},
	{
		id: "itm_amox",
		sku: "HC-AMX-20",
		name: "Amoxicillin 500mg",
		industry: "healthcare",
		category: "Drug",
		qty: 240,
		reorderPoint: 80,
		unitCost: .42,
		locationId: "loc_h1",
		barcode: "890123420020",
		supplierId: "sup_3",
		expiry: "2026-09-10",
		lot: "A12345",
		batch: "B-8821",
		critical: true
	},
	{
		id: "itm_ins",
		sku: "HC-INS-21",
		name: "Insulin Vial 10ml",
		industry: "healthcare",
		category: "Drug",
		qty: 18,
		reorderPoint: 24,
		unitCost: 28,
		locationId: "loc_h1",
		barcode: "890123420021",
		supplierId: "sup_3",
		expiry: "2026-08-28",
		lot: "IN-4401",
		batch: "B-9102",
		critical: true
	},
	{
		id: "itm_glv",
		sku: "HC-GLV-22",
		name: "Surgical Gloves (box)",
		industry: "healthcare",
		category: "Supply",
		qty: 96,
		reorderPoint: 40,
		unitCost: 6.2,
		locationId: "loc_h2",
		barcode: "890123420022",
		supplierId: "sup_3",
		expiry: "2027-03-01",
		lot: "GL-19",
		batch: "B-2200"
	},
	{
		id: "itm_defib",
		sku: "HC-DEF-23",
		name: "Defibrillator Pack",
		industry: "healthcare",
		category: "Asset",
		qty: 4,
		reorderPoint: 2,
		unitCost: 890,
		locationId: "loc_h2",
		barcode: "890123420023",
		supplierId: "sup_3",
		critical: true,
		lifecycle: "active"
	},
	{
		id: "itm_ibu",
		sku: "HC-IBU-24",
		name: "Ibuprofen 200mg",
		industry: "healthcare",
		category: "Drug",
		qty: 400,
		reorderPoint: 100,
		unitCost: .12,
		locationId: "loc_h1",
		barcode: "890123420024",
		supplierId: "sup_3",
		expiry: "2027-01-15",
		lot: "IB-77",
		batch: "B-1044"
	},
	{
		id: "itm_tom",
		sku: "FD-TOM-30",
		name: "Roma Tomatoes (kg)",
		industry: "food",
		category: "Produce",
		qty: 18,
		reorderPoint: 8,
		unitCost: 2.4,
		locationId: "loc_k1",
		barcode: "890123430030",
		supplierId: "sup_4",
		fifoDate: "2026-08-21",
		expiry: "2026-08-27",
		perishable: true
	},
	{
		id: "itm_chs",
		sku: "FD-CHS-31",
		name: "Cheddar Slices",
		industry: "food",
		category: "Dairy",
		qty: 40,
		reorderPoint: 16,
		unitCost: 3.1,
		locationId: "loc_k1",
		barcode: "890123430031",
		supplierId: "sup_4",
		fifoDate: "2026-08-20",
		expiry: "2026-09-02",
		perishable: true
	},
	{
		id: "itm_bun",
		sku: "FD-BUN-32",
		name: "Brioche Buns",
		industry: "food",
		category: "Bakery",
		qty: 48,
		reorderPoint: 20,
		unitCost: .55,
		locationId: "loc_k2",
		barcode: "890123430032",
		supplierId: "sup_4",
		fifoDate: "2026-08-22",
		expiry: "2026-08-26",
		perishable: true
	},
	{
		id: "itm_let",
		sku: "FD-LET-33",
		name: "Crisp Lettuce",
		industry: "food",
		category: "Produce",
		qty: 9,
		reorderPoint: 10,
		unitCost: 1.8,
		locationId: "loc_k1",
		barcode: "890123430033",
		supplierId: "sup_4",
		fifoDate: "2026-08-19",
		expiry: "2026-08-25",
		perishable: true
	},
	{
		id: "itm_pat",
		sku: "FD-PAT-34",
		name: "Beef Patties",
		industry: "food",
		category: "Protein",
		qty: 32,
		reorderPoint: 16,
		unitCost: 1.9,
		locationId: "loc_k1",
		barcode: "890123430034",
		supplierId: "sup_4",
		fifoDate: "2026-08-22",
		expiry: "2026-08-29",
		perishable: true
	},
	{
		id: "itm_mlk",
		sku: "FD-MLK-35",
		name: "Whole Milk (L)",
		industry: "food",
		category: "Dairy",
		qty: 14,
		reorderPoint: 12,
		unitCost: 1.2,
		locationId: "loc_k1",
		barcode: "890123430035",
		supplierId: "sup_4",
		fifoDate: "2026-08-21",
		expiry: "2026-08-26",
		perishable: true
	},
	{
		id: "itm_wrap",
		sku: "WH-WRP-40",
		name: "Pallet Wrap",
		industry: "warehouse",
		category: "Packing",
		qty: 70,
		reorderPoint: 20,
		unitCost: 4.4,
		locationId: "loc_b02",
		barcode: "890123440040",
		supplierId: "sup_5"
	},
	{
		id: "itm_lbl",
		sku: "WH-LBL-41",
		name: "Shipping Labels",
		industry: "warehouse",
		category: "Packing",
		qty: 500,
		reorderPoint: 120,
		unitCost: .04,
		locationId: "loc_b01",
		barcode: "890123440041",
		supplierId: "sup_5"
	},
	{
		id: "itm_plt",
		sku: "WH-PLT-42",
		name: "Wood Pallets",
		industry: "warehouse",
		category: "Equipment",
		qty: 28,
		reorderPoint: 12,
		unitCost: 9,
		locationId: "loc_c01",
		barcode: "890123440042",
		supplierId: "sup_5"
	},
	{
		id: "itm_mbp",
		sku: "IT-LPT-50",
		name: "MacBook Pro 14",
		industry: "itam",
		category: "Hardware",
		qty: 12,
		reorderPoint: 3,
		unitCost: 1899,
		locationId: "loc_it",
		barcode: "890123450050",
		supplierId: "sup_6",
		lifecycle: "active"
	},
	{
		id: "itm_phn",
		sku: "IT-PHN-51",
		name: "Work Phone",
		industry: "itam",
		category: "Hardware",
		qty: 22,
		reorderPoint: 6,
		unitCost: 799,
		locationId: "loc_it",
		barcode: "890123450051",
		supplierId: "sup_6",
		lifecycle: "active"
	},
	{
		id: "itm_adobe",
		sku: "IT-LIC-52",
		name: "Creative Cloud Seats",
		industry: "itam",
		category: "License",
		qty: 1,
		reorderPoint: 1,
		unitCost: 55,
		locationId: "loc_it",
		barcode: "890123450052",
		supplierId: "sup_6",
		licenseUsed: 25,
		licenseTotal: 50,
		lifecycle: "active"
	},
	{
		id: "itm_slack",
		sku: "IT-LIC-53",
		name: "Team Chat Seats",
		industry: "itam",
		category: "License",
		qty: 1,
		reorderPoint: 1,
		unitCost: 8,
		locationId: "loc_it",
		barcode: "890123450053",
		supplierId: "sup_6",
		licenseUsed: 47,
		licenseTotal: 50,
		lifecycle: "active"
	},
	{
		id: "itm_sw",
		sku: "IT-NET-54",
		name: "Core Switch",
		industry: "itam",
		category: "Hardware",
		qty: 2,
		reorderPoint: 1,
		unitCost: 2400,
		locationId: "loc_it",
		barcode: "890123450054",
		supplierId: "sup_6",
		lifecycle: "repair"
	}
];
var recipes = [{
	id: "rcp_burger",
	name: "House Burger",
	salePrice: 12.5,
	ingredients: [
		{
			itemId: "itm_bun",
			qty: 1
		},
		{
			itemId: "itm_pat",
			qty: 1
		},
		{
			itemId: "itm_let",
			qty: .1
		},
		{
			itemId: "itm_tom",
			qty: .15
		},
		{
			itemId: "itm_chs",
			qty: 1
		}
	]
}, {
	id: "rcp_salad",
	name: "Garden Salad",
	salePrice: 8,
	ingredients: [
		{
			itemId: "itm_let",
			qty: .4
		},
		{
			itemId: "itm_tom",
			qty: .2
		},
		{
			itemId: "itm_chs",
			qty: .5
		}
	]
}];
var boms = [{
	id: "bom_motor",
	name: "Mini Motor BOM",
	outputItemId: "itm_motor",
	outputQty: 1,
	components: [
		{
			itemId: "itm_coil",
			qty: .2
		},
		{
			itemId: "itm_rod",
			qty: 1
		},
		{
			itemId: "itm_gear",
			qty: 2
		},
		{
			itemId: "itm_wire",
			qty: .25
		}
	]
}];
var orders = [
	{
		id: "ord_1001",
		type: "sales",
		status: "picking",
		partner: "Maya Chen",
		channel: "online",
		createdAt: `${TODAY}T09:12:00`,
		notes: "Gift wrap",
		lines: [{
			itemId: "itm_tee",
			qty: 2,
			price: 24
		}, {
			itemId: "itm_tote",
			qty: 1,
			price: 28
		}]
	},
	{
		id: "ord_1002",
		type: "sales",
		status: "pending",
		partner: "Walk-in #441",
		channel: "store",
		createdAt: `${TODAY}T11:40:00`,
		notes: "",
		lines: [{
			itemId: "itm_shoe",
			qty: 1,
			price: 79
		}]
	},
	{
		id: "ord_1003",
		type: "sales",
		status: "packed",
		partner: "River Outfitters",
		channel: "online",
		createdAt: `${TODAY}T08:05:00`,
		notes: "Wholesale",
		lines: [{
			itemId: "itm_tee",
			qty: 12,
			price: 18
		}, {
			itemId: "itm_hat",
			qty: 6,
			price: 16
		}]
	},
	{
		id: "ord_2001",
		type: "purchase",
		status: "pending",
		partner: "MediLot Pharma",
		createdAt: `${TODAY}T07:30:00`,
		notes: "Insulin restock — critical",
		lines: [{
			itemId: "itm_ins",
			qty: 40,
			price: 28
		}]
	},
	{
		id: "ord_2002",
		type: "purchase",
		status: "received",
		partner: "Freshfield Produce",
		createdAt: "2026-08-22T16:10:00",
		notes: "Morning produce",
		lines: [{
			itemId: "itm_tom",
			qty: 12,
			price: 2.4
		}, {
			itemId: "itm_let",
			qty: 8,
			price: 1.8
		}]
	},
	{
		id: "ord_1004",
		type: "sales",
		status: "shipped",
		partner: "Luis Ortega",
		channel: "online",
		createdAt: "2026-08-22T14:22:00",
		notes: "",
		lines: [{
			itemId: "itm_bag",
			qty: 1,
			price: 48
		}]
	}
];
var moves = [
	{
		id: "mv_1",
		itemId: "itm_tee",
		qty: 24,
		type: "in",
		to: "loc_a01",
		note: "PO receive",
		at: "2026-08-20T10:00:00"
	},
	{
		id: "mv_2",
		itemId: "itm_ins",
		qty: 6,
		type: "out",
		from: "loc_h1",
		note: "Clinic dispense",
		at: "2026-08-22T15:12:00"
	},
	{
		id: "mv_3",
		itemId: "itm_tom",
		qty: 12,
		type: "in",
		to: "loc_k1",
		note: "Produce delivery",
		at: "2026-08-22T16:10:00"
	}
];
function cloneSeed() {
	return {
		items: structuredClone(items),
		locations: structuredClone(locations),
		suppliers: structuredClone(suppliers),
		orders: structuredClone(orders),
		recipes: structuredClone(recipes),
		boms: structuredClone(boms),
		moves: structuredClone(moves),
		dismissedAlertIds: [],
		settings: { ...defaultSettings }
	};
}
var TODAY_ISO = TODAY;
function money(n, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		maximumFractionDigits: n >= 100 ? 0 : 2
	}).format(n);
}
function num(n) {
	return new Intl.NumberFormat("en-US").format(Math.round(n * 100) / 100);
}
function daysUntil(date, today = "2026-08-23") {
	const a = /* @__PURE__ */ new Date(today + "T00:00:00");
	const b = /* @__PURE__ */ new Date(date + "T00:00:00");
	return Math.round((b.getTime() - a.getTime()) / 864e5);
}
function uid(prefix) {
	return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}
function shortDate(iso) {
	const [y, m, day] = iso.slice(0, 10).split("-");
	return `${m}/${day}/${y}`;
}
var KEY = "stocklot-ims-v1";
function persist(state) {
	if (typeof localStorage === "undefined") return;
	const snap = {
		items: state.items,
		locations: state.locations,
		suppliers: state.suppliers,
		orders: state.orders,
		recipes: state.recipes,
		boms: state.boms,
		moves: state.moves,
		dismissedAlertIds: state.dismissedAlertIds,
		settings: state.settings
	};
	localStorage.setItem(KEY, JSON.stringify(snap));
}
function load() {
	const seed = cloneSeed();
	if (typeof localStorage === "undefined") return seed;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return seed;
		const parsed = JSON.parse(raw);
		return {
			items: parsed.items ?? seed.items,
			locations: parsed.locations ?? seed.locations,
			suppliers: parsed.suppliers ?? seed.suppliers,
			orders: parsed.orders ?? seed.orders,
			recipes: parsed.recipes ?? seed.recipes,
			boms: parsed.boms ?? seed.boms,
			moves: parsed.moves ?? seed.moves,
			dismissedAlertIds: parsed.dismissedAlertIds ?? [],
			settings: {
				...seed.settings,
				...parsed.settings
			}
		};
	} catch {
		return seed;
	}
}
function computeStats(items, orders) {
	const today = TODAY_ISO;
	return {
		totalUnits: items.reduce((s, i) => s + (i.category === "License" ? 0 : i.qty), 0),
		skuCount: items.length,
		inStockSkus: items.filter((i) => i.qty > 0).length,
		lowStock: items.filter((i) => i.qty <= i.reorderPoint).length,
		ordersToday: orders.filter((o) => o.createdAt.startsWith(today)).length,
		pendingOrders: orders.filter((o) => o.status === "pending" || o.status === "picking").length,
		totalValue: items.reduce((s, i) => {
			if (i.licenseTotal) return s + i.licenseTotal * i.unitCost;
			return s + i.qty * i.unitCost;
		}, 0)
	};
}
function computeAlerts(items, dismissedAlertIds, settings) {
	const list = [];
	for (const it of items) {
		if (it.qty <= it.reorderPoint) list.push({
			id: `low_${it.id}`,
			kind: it.critical ? "critical" : "low_stock",
			severity: it.critical || it.qty === 0 ? "critical" : "warn",
			message: `${it.name} is ${it.qty === 0 ? "out of stock" : "below reorder point"} (${it.qty} / min ${it.reorderPoint}).`,
			itemId: it.id,
			read: dismissedAlertIds.includes(`low_${it.id}`),
			createdAt: TODAY_ISO
		});
		if (it.expiry) {
			const d = daysUntil(it.expiry);
			if (d < 0) list.push({
				id: `exp_${it.id}`,
				kind: "expiry",
				severity: "critical",
				message: `${it.name} expired ${-d} day${-d === 1 ? "" : "s"} ago (${it.expiry}).`,
				itemId: it.id,
				read: dismissedAlertIds.includes(`exp_${it.id}`),
				createdAt: TODAY_ISO
			});
			else if (d <= settings.expiryWarnDays) list.push({
				id: `expw_${it.id}`,
				kind: it.perishable ? "perishable" : "expiry",
				severity: d <= 5 ? "critical" : "warn",
				message: `${it.name} expires in ${d} day${d === 1 ? "" : "s"} (${it.expiry}${it.lot ? `, lot ${it.lot}` : ""}).`,
				itemId: it.id,
				read: dismissedAlertIds.includes(`expw_${it.id}`),
				createdAt: TODAY_ISO
			});
		}
		if (it.licenseTotal && it.licenseUsed != null && it.licenseUsed / it.licenseTotal >= .9) list.push({
			id: `lic_${it.id}`,
			kind: "license",
			severity: it.licenseUsed >= it.licenseTotal ? "critical" : "warn",
			message: `${it.name} seats ${it.licenseUsed}/${it.licenseTotal}.`,
			itemId: it.id,
			read: dismissedAlertIds.includes(`lic_${it.id}`),
			createdAt: TODAY_ISO
		});
		if (it.qty > it.reorderPoint * 8 && it.unitCost * it.qty > 400) list.push({
			id: `ov_${it.id}`,
			kind: "overstock",
			severity: "info",
			message: `${it.name} looks overstocked (${it.qty} on hand).`,
			itemId: it.id,
			read: dismissedAlertIds.includes(`ov_${it.id}`),
			createdAt: TODAY_ISO
		});
	}
	const rank = {
		critical: 0,
		warn: 1,
		info: 2
	};
	return list.sort((a, b) => rank[a.severity] - rank[b.severity] || Number(a.read) - Number(b.read));
}
function bump(item, delta) {
	const qty = Math.max(0, Math.round((item.qty + delta) * 100) / 100);
	const next = {
		...item,
		qty
	};
	if (item.channel && item.storeQty != null && item.onlineQty != null) {
		const total = Math.max(1, item.storeQty + item.onlineQty);
		const storeShare = item.storeQty / total;
		next.storeQty = Math.max(0, Math.round(qty * storeShare));
		next.onlineQty = Math.max(0, qty - next.storeQty);
	}
	return next;
}
var useIMS = create((set, get) => ({
	...cloneSeed(),
	hydrated: false,
	hydrate: () => {
		set({
			...load(),
			hydrated: true
		});
	},
	resetDemo: () => {
		const snap = cloneSeed();
		persist(snap);
		set({
			...snap,
			hydrated: true
		});
	},
	stats: () => computeStats(get().items, get().orders),
	alerts: () => computeAlerts(get().items, get().dismissedAlertIds, get().settings),
	itemById: (id) => get().items.find((i) => i.id === id),
	adjustQty: (id, delta, note, type = delta >= 0 ? "in" : "out") => {
		set((s) => {
			const items = s.items.map((i) => i.id === id ? bump(i, delta) : i);
			const moves = [{
				id: uid("mv"),
				itemId: id,
				qty: Math.abs(delta),
				type,
				note,
				at: (/* @__PURE__ */ new Date()).toISOString()
			}, ...s.moves].slice(0, 80);
			const next = {
				...s,
				items,
				moves
			};
			persist(next);
			return next;
		});
	},
	setItem: (item) => {
		set((s) => {
			const items = s.items.map((i) => i.id === item.id ? item : i);
			const next = {
				...s,
				items
			};
			persist(next);
			return next;
		});
	},
	addItem: (item) => {
		const id = uid("itm");
		set((s) => {
			const next = {
				...s,
				items: [{
					...item,
					id
				}, ...s.items]
			};
			persist(next);
			return next;
		});
		return id;
	},
	removeItem: (id) => {
		set((s) => {
			const next = {
				...s,
				items: s.items.filter((i) => i.id !== id)
			};
			persist(next);
			return next;
		});
	},
	transfer: (id, toLocationId) => {
		set((s) => {
			const item = s.items.find((i) => i.id === id);
			const items = s.items.map((i) => i.id === id ? {
				...i,
				locationId: toLocationId
			} : i);
			const moves = [{
				id: uid("mv"),
				itemId: id,
				qty: item?.qty ?? 0,
				type: "transfer",
				from: item?.locationId,
				to: toLocationId,
				note: "Location transfer",
				at: (/* @__PURE__ */ new Date()).toISOString()
			}, ...s.moves].slice(0, 80);
			const next = {
				...s,
				items,
				moves
			};
			persist(next);
			return next;
		});
	},
	scanAdjust: (code, delta, channel) => {
		const needle = code.trim().toLowerCase();
		const item = get().items.find((i) => i.barcode.toLowerCase() === needle || i.sku.toLowerCase() === needle || i.name.toLowerCase() === needle);
		if (!item) return null;
		if (channel && item.storeQty != null && item.onlineQty != null) set((s) => {
			const items = s.items.map((i) => {
				if (i.id !== item.id) return i;
				const storeQty = Math.max(0, (i.storeQty ?? 0) + (channel === "store" ? delta : 0));
				const onlineQty = Math.max(0, (i.onlineQty ?? 0) + (channel === "online" ? delta : 0));
				return {
					...i,
					storeQty,
					onlineQty,
					qty: storeQty + onlineQty
				};
			});
			const next = {
				...s,
				items,
				moves: [{
					id: uid("mv"),
					itemId: item.id,
					qty: Math.abs(delta),
					type: delta < 0 ? "sale" : "return",
					note: `Scan ${channel}`,
					at: (/* @__PURE__ */ new Date()).toISOString()
				}, ...s.moves].slice(0, 80)
			};
			persist(next);
			return next;
		});
		else get().adjustQty(item.id, delta, `Scan ${code}`, delta < 0 ? "sale" : "return");
		return get().itemById(item.id) ?? item;
	},
	fulfillOrder: (orderId, nextStatus) => {
		set((s) => {
			const order = s.orders.find((o) => o.id === orderId);
			if (!order) return s;
			let items = s.items;
			if (order.type === "sales" && nextStatus === "picking" && order.status === "pending") items = items.map((it) => {
				const line = order.lines.find((l) => l.itemId === it.id);
				return line ? bump(it, -line.qty) : it;
			});
			const orders = s.orders.map((o) => o.id === orderId ? {
				...o,
				status: nextStatus
			} : o);
			const next = {
				...s,
				items,
				orders
			};
			persist(next);
			return next;
		});
	},
	addOrder: (order) => {
		const id = uid("ord");
		set((s) => {
			const next = {
				...s,
				orders: [{
					...order,
					id,
					createdAt: (/* @__PURE__ */ new Date()).toISOString()
				}, ...s.orders]
			};
			persist(next);
			return next;
		});
		return id;
	},
	receivePurchase: (orderId) => {
		set((s) => {
			const order = s.orders.find((o) => o.id === orderId);
			if (!order || order.type !== "purchase") return s;
			const items = s.items.map((it) => {
				const line = order.lines.find((l) => l.itemId === it.id);
				return line ? bump(it, line.qty) : it;
			});
			const orders = s.orders.map((o) => o.id === orderId ? {
				...o,
				status: "received"
			} : o);
			const next = {
				...s,
				items,
				orders
			};
			persist(next);
			return next;
		});
	},
	sellRecipe: (recipeId, servings) => {
		const recipe = get().recipes.find((r) => r.id === recipeId);
		if (!recipe) return {
			ok: false,
			missing: ["Recipe"]
		};
		const missing = [];
		for (const ing of recipe.ingredients) {
			const it = get().itemById(ing.itemId);
			const need = ing.qty * servings;
			if (!it || it.qty < need) missing.push(it?.name ?? ing.itemId);
		}
		if (missing.length) return {
			ok: false,
			missing
		};
		set((s) => {
			let items = s.items;
			for (const ing of recipe.ingredients) items = items.map((i) => i.id === ing.itemId ? bump(i, -ing.qty * servings) : i);
			const next = {
				...s,
				items,
				moves: [{
					id: uid("mv"),
					itemId: recipe.ingredients[0]?.itemId ?? "",
					qty: servings,
					type: "recipe",
					note: `Sold ${servings}× ${recipe.name}`,
					at: (/* @__PURE__ */ new Date()).toISOString()
				}, ...s.moves].slice(0, 80)
			};
			persist(next);
			return next;
		});
		return {
			ok: true,
			missing: []
		};
	},
	startProduction: (bomId, qty) => {
		const bom = get().boms.find((b) => b.id === bomId);
		if (!bom) return {
			ok: false,
			missing: ["BOM"]
		};
		const missing = [];
		for (const c of bom.components) {
			const it = get().itemById(c.itemId);
			const need = c.qty * qty;
			if (!it || it.qty < need) missing.push(it?.name ?? c.itemId);
		}
		if (missing.length) return {
			ok: false,
			missing
		};
		set((s) => {
			let items = s.items;
			for (const c of bom.components) items = items.map((i) => i.id === c.itemId ? bump(i, -c.qty * qty) : i);
			items = items.map((i) => i.id === "itm_assy" ? bump(i, qty) : i);
			const next = {
				...s,
				items,
				moves: [{
					id: uid("mv"),
					itemId: "itm_assy",
					qty,
					type: "production",
					note: `Started ${qty}× ${bom.name}`,
					at: (/* @__PURE__ */ new Date()).toISOString()
				}, ...s.moves].slice(0, 80)
			};
			persist(next);
			return next;
		});
		return {
			ok: true,
			missing: []
		};
	},
	finishProduction: (qty) => {
		const assy = get().itemById("itm_assy");
		if (!assy || assy.qty < qty) return;
		set((s) => {
			const items = s.items.map((i) => {
				if (i.id === "itm_assy") return bump(i, -qty);
				if (i.id === "itm_motor") return bump(i, qty);
				return i;
			});
			const next = {
				...s,
				items
			};
			persist(next);
			return next;
		});
	},
	setWip: (id, status) => {
		set((s) => {
			const next = {
				...s,
				items: s.items.map((i) => i.id === id ? {
					...i,
					wipStatus: status
				} : i)
			};
			persist(next);
			return next;
		});
	},
	setLifecycle: (id, life) => {
		set((s) => {
			const next = {
				...s,
				items: s.items.map((i) => i.id === id ? {
					...i,
					lifecycle: life
				} : i)
			};
			persist(next);
			return next;
		});
	},
	assignLicense: (id, delta) => {
		set((s) => {
			const next = {
				...s,
				items: s.items.map((i) => {
					if (i.id !== id || i.licenseTotal == null || i.licenseUsed == null) return i;
					const licenseUsed = Math.min(i.licenseTotal, Math.max(0, i.licenseUsed + delta));
					return {
						...i,
						licenseUsed
					};
				})
			};
			persist(next);
			return next;
		});
	},
	updateSettings: (patch) => {
		set((s) => {
			const next = {
				...s,
				settings: {
					...s.settings,
					...patch
				}
			};
			persist(next);
			return next;
		});
	},
	dismissAlert: (id) => {
		set((s) => {
			const next = {
				...s,
				dismissedAlertIds: [.../* @__PURE__ */ new Set([...s.dismissedAlertIds, id])]
			};
			persist(next);
			return next;
		});
	},
	cycleCount: (locationId, counts) => {
		set((s) => {
			const items = s.items.map((i) => {
				if (i.locationId !== locationId) return i;
				if (counts[i.id] == null) return i;
				return {
					...i,
					qty: Math.max(0, counts[i.id])
				};
			});
			const next = {
				...s,
				items,
				moves: [{
					id: uid("mv"),
					itemId: Object.keys(counts)[0] ?? "",
					qty: 0,
					type: "adjust",
					note: `Cycle count ${locationId}`,
					at: (/* @__PURE__ */ new Date()).toISOString()
				}, ...s.moves].slice(0, 80)
			};
			persist(next);
			return next;
		});
	},
	crossDock: (itemId, qty) => {
		get().transfer(itemId, "loc_c02");
		get().adjustQty(itemId, -qty, "Cross-dock to outbound", "out");
	},
	syncChannels: (id) => {
		set((s) => {
			const next = {
				...s,
				items: s.items.map((i) => {
					if (i.id !== id) return i;
					const storeQty = i.storeQty ?? 0;
					const onlineQty = i.onlineQty ?? 0;
					return {
						...i,
						qty: storeQty + onlineQty,
						channel: "both"
					};
				})
			};
			persist(next);
			return next;
		});
	},
	setChannelQty: (id, storeQty, onlineQty) => {
		set((s) => {
			const next = {
				...s,
				items: s.items.map((i) => i.id === id ? {
					...i,
					storeQty: Math.max(0, storeQty),
					onlineQty: Math.max(0, onlineQty),
					qty: Math.max(0, storeQty) + Math.max(0, onlineQty)
				} : i)
			};
			persist(next);
			return next;
		});
	}
}));
var INDUSTRY_META = {
	retail: {
		title: "Retail & E-commerce",
		blurb: "Real-time counts across stores and the web, faster pick-pack-ship, and barcode updates on every sale or return.",
		color: "var(--color-pink)",
		features: [
			{
				key: "stock",
				title: "Stock tracking",
				body: "Monitor product counts in real time across online stores and physical shops."
			},
			{
				key: "fulfill",
				title: "Order fulfillment",
				body: "Speed up picking, packing, and shipping items to buyers."
			},
			{
				key: "barcode",
				title: "Barcode scanning",
				body: "Use codes to quickly update item counts during sales or returns."
			},
			{
				key: "sync",
				title: "Multi-channel sync",
				body: "Keep inventory synchronized the moment stock moves in any channel."
			}
		]
	},
	manufacturing: {
		title: "Manufacturing & Production",
		blurb: "Feed the line with the right parts, watch work-in-progress, and order materials only as needed.",
		color: "var(--color-blue)",
		features: [
			{
				key: "raw",
				title: "Raw materials control",
				body: "Track parts needed to build goods before assembly begins."
			},
			{
				key: "wip",
				title: "Work-in-progress (WIP)",
				body: "Monitor items currently moving down the production line."
			},
			{
				key: "bom",
				title: "Bill of materials (BOM)",
				body: "List every component required to build a finished product."
			},
			{
				key: "jit",
				title: "Just-in-time (JIT)",
				body: "Order materials only as needed to lower storage costs."
			}
		]
	},
	healthcare: {
		title: "Healthcare & Pharmaceuticals",
		blurb: "Expiration, lot tracing, and critical-stock alerts so life-saving inventory is never a guess.",
		color: "var(--color-green)",
		features: [
			{
				key: "expiry",
				title: "Expiration monitoring",
				body: "Track use-by dates on medicine and supplies to stop waste."
			},
			{
				key: "batch",
				title: "Batch & lot tracking",
				body: "Follow specific drug lots so recalls can be handled quickly."
			},
			{
				key: "critical",
				title: "Critical stock alerts",
				body: "Warn staff when life-saving medicine or urgent supplies run low."
			},
			{
				key: "asset",
				title: "Asset security",
				body: "Monitor high-cost tools and critical medical supplies."
			}
		]
	},
	food: {
		title: "Food, Beverage & Hospitality",
		blurb: "FIFO for perishables, recipe deductions on every plate, and restock alerts before the kitchen runs dry.",
		color: "var(--color-orange)",
		features: [
			{
				key: "fifo",
				title: "Perishable management (FIFO)",
				body: "Use older food first so nothing spoils on the shelf."
			},
			{
				key: "recipe",
				title: "Recipe tracking & costing",
				body: "Deduct exact ingredient amounts when a menu item sells."
			},
			{
				key: "alerts",
				title: "Perishable alerts",
				body: "Warn staff when ingredients are close to spoiling."
			},
			{
				key: "supplier",
				title: "Supplier ordering",
				body: "Send automated restock alerts before kitchen supplies run out."
			}
		]
	},
	warehouse: {
		title: "Warehousing & Logistics",
		blurb: "Know the bin, scan the unit, and move freight from inbound to outbound without extra dwell time.",
		color: "var(--color-primary)",
		features: [
			{
				key: "map",
				title: "Location mapping",
				body: "Assign exact shelf, bin, or aisle spots to every item."
			},
			{
				key: "scan",
				title: "Barcode & RFID scanning",
				body: "Speed up receiving and counting stock."
			},
			{
				key: "dock",
				title: "Cross-docking",
				body: "Move goods straight from incoming trucks to outgoing vehicles."
			},
			{
				key: "cycle",
				title: "Cycle counting",
				body: "Audit small groups regularly instead of one massive yearly count."
			}
		]
	},
	itam: {
		title: "IT & Software (ITAM)",
		blurb: "Treat laptops, phones, and licenses as inventory — seats, lifecycle, and replacement dates included.",
		color: "var(--color-teal)",
		features: [
			{
				key: "hw",
				title: "Hardware tracking",
				body: "Log company laptops, phones, and network devices."
			},
			{
				key: "lic",
				title: "Software licenses",
				body: "Monitor active subscriptions and user counts."
			},
			{
				key: "life",
				title: "Lifecycle management",
				body: "Plan when to repair, refresh, or replace tech tools."
			},
			{
				key: "sec",
				title: "Asset security",
				body: "Keep visibility over valuable devices and software."
			}
		]
	}
};
function industryOf(slug) {
	if (slug in INDUSTRY_META) return slug;
	return null;
}
function useStats() {
	const items = useIMS((s) => s.items);
	const orders = useIMS((s) => s.orders);
	return (0, import_react.useMemo)(() => computeStats(items, orders), [items, orders]);
}
function useAlerts() {
	const items = useIMS((s) => s.items);
	const dismissed = useIMS((s) => s.dismissedAlertIds);
	const settings = useIMS((s) => s.settings);
	return (0, import_react.useMemo)(() => computeAlerts(items, dismissed, settings), [
		items,
		dismissed,
		settings
	]);
}
var NAV = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/items",
		label: "Items",
		icon: Boxes
	},
	{
		to: "/orders",
		label: "Orders",
		icon: ShoppingCart
	},
	{
		to: "/suppliers",
		label: "Suppliers",
		icon: Truck
	},
	{
		to: "/locations",
		label: "Locations",
		icon: MapPin
	},
	{
		to: "/reports",
		label: "Reports",
		icon: ChartColumn
	},
	{
		to: "/alerts",
		label: "Alerts",
		icon: Bell
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function useHydrateIMS() {
	const hydrate = useIMS((s) => s.hydrate);
	const hydrated = useIMS((s) => s.hydrated);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	return hydrated;
}
function AppShell({ children, title }) {
	const hydrated = useHydrateIMS();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const unread = useAlerts().filter((a) => !a.read).length;
	const router = useRouter();
	const [q, setQ] = (0, import_react.useState)("");
	const results = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		if (!query) return [];
		return useIMS.getState().items.filter((i) => i.name.toLowerCase().includes(query) || i.sku.toLowerCase().includes(query) || i.barcode.includes(query)).slice(0, 6);
	}, [q, hydrated]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen sparkle-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-screen max-w-[1600px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: cn("fixed inset-y-0 left-0 z-40 w-[250px] border-r border-border bg-sidebar p-4 transition-transform duration-200 lg:static lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex items-center gap-2.5",
								onClick: () => setOpen(false),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoxMascot, { className: "h-11 w-11" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-lg font-bold leading-none text-primary",
									children: "IMS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold text-muted",
									children: "Inventory System"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-lg p-2 lg:hidden",
								onClick: () => setOpen(false),
								"aria-label": "Close menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "grid gap-1",
							children: NAV.map((n) => {
								const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
								const Icon = n.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: n.to,
									onClick: () => setOpen(false),
									className: cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors", active ? "bg-primary text-primary-fg" : "text-fg/80 hover:bg-bg"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
										n.label,
										n.to === "/alerts" && unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-auto rounded-full bg-pink px-1.5 text-[10px] text-white",
											children: unread
										}) : null
									]
								}, n.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-2xl border border-border bg-linear-to-br from-[#fff0f6] to-[#f2efff] p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold text-fg",
								children: "Quick actions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/items",
										onClick: () => setOpen(false),
										className: "flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm font-bold hover:bg-bg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 text-primary" }), " Add item"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/orders",
										onClick: () => setOpen(false),
										className: "flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm font-bold hover:bg-bg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4 text-pink" }), " New order"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/stock",
										onClick: () => setOpen(false),
										className: "flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm font-bold hover:bg-bg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Warehouse, { className: "size-4 text-blue" }), " Receive stock"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2 rounded-2xl border border-border bg-surface p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoxMascot, { className: "h-12 w-12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-bold leading-snug text-muted",
								children: ["Stock is happy.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-fg",
									children: "All systems running smoothly."
								})]
							})]
						})
					]
				}),
				open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "fixed inset-0 z-30 bg-[#261e3d]/30 lg:hidden",
					"aria-label": "Close menu",
					onClick: () => setOpen(false)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-bg-tint/90 px-4 py-3 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-xl border border-border bg-surface p-2 lg:hidden",
								onClick: () => setOpen(true),
								"aria-label": "Open menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Search items, orders, suppliers…",
									className: "w-full rounded-2xl border border-border bg-surface py-2.5 pl-4 pr-10 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/40"
								}), results.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-[110%] left-0 z-30 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]",
									children: results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-bold hover:bg-bg",
										onClick: () => {
											setQ("");
											router.history.push(`/items?q=${encodeURIComponent(r.sku)}`);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted",
											children: r.sku
										})]
									}, r.id))
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/alerts",
								className: "relative rounded-2xl border border-border bg-surface p-2.5",
								"aria-label": "Alerts",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-pink px-1 text-[10px] font-extrabold text-white",
									children: unread
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/settings",
								className: "hidden items-center gap-2 rounded-2xl border border-border bg-surface py-1.5 pr-3 pl-1.5 sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-8 w-8 place-items-center rounded-full bg-[#ffd8e8] text-sm font-extrabold",
									children: "A"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "leading-tight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-extrabold",
										children: "Admin"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold text-muted",
										children: "Administrator"
									})]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "flex-1 p-4 sm:p-6",
						children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mb-4 font-display text-3xl font-semibold tracking-tight",
							children: title
						}) : null, hydrated ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-2xl bg-surface" })]
					})]
				})
			]
		})
	});
}
function Button({ variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-[transform,filter] duration-150 active:scale-[0.98] disabled:opacity-50", {
			primary: "bg-primary text-primary-fg shadow-[var(--shadow-pop)] hover:brightness-105",
			ghost: "bg-surface text-primary border border-border hover:bg-bg-tint",
			danger: "bg-danger text-white hover:brightness-105",
			soft: "bg-bg-tint text-fg border border-border hover:bg-surface",
			pink: "bg-pink text-white hover:brightness-105",
			blue: "bg-blue text-white hover:brightness-105",
			green: "bg-green text-white hover:brightness-105",
			orange: "bg-orange text-white hover:brightness-105",
			teal: "bg-teal text-white hover:brightness-105"
		}[variant], className),
		...props
	});
}
function Field({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("grid gap-1.5 text-sm font-semibold text-fg", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: label
		}), children]
	});
}
var control = "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-fg outline-none transition-shadow focus:ring-2 focus:ring-primary/40";
function Input(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(control, props.className),
		...props
	});
}
function Select(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(control, props.className),
		...props
	});
}
function Badge({ children, tone = "primary" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide", {
			primary: "bg-primary/12 text-primary",
			pink: "bg-pink/12 text-pink",
			blue: "bg-blue/12 text-blue",
			green: "bg-green/15 text-green",
			orange: "bg-orange/15 text-orange",
			teal: "bg-teal/15 text-teal",
			danger: "bg-danger/12 text-danger",
			muted: "bg-border text-muted"
		}[tone]),
		children
	});
}
function Card({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-card)]", className),
		children
	});
}
function Modal({ open, title, onClose, children, wide }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-[#261e3d]/45 p-3 sm:items-center",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("max-h-[90vh] w-full overflow-auto rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]", wide ? "max-w-3xl" : "max-w-lg"),
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "modal-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "modal-title",
					className: "font-display text-xl font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "rounded-lg bg-bg-tint px-2.5 py-1 text-sm font-bold text-muted",
					"aria-label": "Close",
					children: "Close"
				})]
			}), children]
		})
	});
}
//#endregion
export { uid as _, CloudBuddy as a, useIMS as b, Input as c, cn as d, daysUntil as f, shortDate as g, num as h, Card as i, Modal as l, money as m, Badge as n, Field as o, industryOf as p, Button as r, INDUSTRY_META as s, AppShell as t, Select as u, useAlerts as v, useStats as x, useHydrateIMS as y };
