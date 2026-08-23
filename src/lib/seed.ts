import type {
  Bom,
  Item,
  Location,
  Order,
  Recipe,
  Settings,
  StockMove,
  Supplier,
} from "./types";

const TODAY = "2026-08-23";

export const defaultSettings: Settings = {
  company: "Stocklot HQ",
  currency: "USD",
  defaultReorder: 20,
  expiryWarnDays: 30,
  autoReorder: true,
};

export const locations: Location[] = [
  { id: "loc_a01", code: "A-01", name: "Retail floor — apparel", type: "aisle", warehouse: "Storefront" },
  { id: "loc_a02", code: "A-02", name: "Retail floor — accessories", type: "shelf", warehouse: "Storefront" },
  { id: "loc_b01", code: "B-01", name: "Pick face — fast movers", type: "bin", warehouse: "Main DC" },
  { id: "loc_b02", code: "B-02", name: "Reserve rack", type: "shelf", warehouse: "Main DC" },
  { id: "loc_c01", code: "C-01", name: "Inbound dock", type: "dock", warehouse: "Main DC" },
  { id: "loc_c02", code: "C-02", name: "Outbound dock", type: "dock", warehouse: "Main DC" },
  { id: "loc_m1", code: "M-01", name: "Raw materials cage", type: "bin", warehouse: "Plant 1" },
  { id: "loc_m2", code: "M-02", name: "Assembly line", type: "aisle", warehouse: "Plant 1" },
  { id: "loc_h1", code: "H-01", name: "Pharmacy fridge", type: "cold", warehouse: "Clinic" },
  { id: "loc_h2", code: "H-02", name: "Secure cabinet", type: "secure", warehouse: "Clinic" },
  { id: "loc_k1", code: "K-01", name: "Walk-in cooler", type: "cold", warehouse: "Kitchen" },
  { id: "loc_k2", code: "K-02", name: "Dry store", type: "shelf", warehouse: "Kitchen" },
  { id: "loc_it", code: "IT-01", name: "IT cage", type: "secure", warehouse: "HQ" },
];

export const suppliers: Supplier[] = [
  { id: "sup_1", name: "Northwind Apparel", leadDays: 7, email: "orders@northwind.example", category: "Retail", phone: "555-0140" },
  { id: "sup_2", name: "Alloy & Gear Co.", leadDays: 12, email: "sales@alloygear.example", category: "Manufacturing", phone: "555-0188" },
  { id: "sup_3", name: "MediLot Pharma", leadDays: 4, email: "supply@medilot.example", category: "Healthcare", phone: "555-0201" },
  { id: "sup_4", name: "Freshfield Produce", leadDays: 1, email: "hello@freshfield.example", category: "Food", phone: "555-0112" },
  { id: "sup_5", name: "Harbor Freight Logistics", leadDays: 3, email: "dock@harbor.example", category: "Warehouse", phone: "555-0166" },
  { id: "sup_6", name: "Cloudstack Licensing", leadDays: 2, email: "seats@cloudstack.example", category: "ITAM", phone: "555-0199" },
];

export const items: Item[] = [
  { id: "itm_tee", sku: "RTL-TEE-01", name: "Classic Cotton Tee", industry: "retail", category: "Apparel", qty: 120, storeQty: 48, onlineQty: 72, reorderPoint: 40, unitCost: 8.5, locationId: "loc_a01", barcode: "890123400001", supplierId: "sup_1", channel: "both" },
  { id: "itm_tote", sku: "RTL-TOT-02", name: "Canvas Tote", industry: "retail", category: "Bags", qty: 64, storeQty: 22, onlineQty: 42, reorderPoint: 18, unitCost: 11, locationId: "loc_a02", barcode: "890123400002", supplierId: "sup_1", channel: "both" },
  { id: "itm_shoe", sku: "RTL-SNK-03", name: "City Sneakers", industry: "retail", category: "Footwear", qty: 36, storeQty: 12, onlineQty: 24, reorderPoint: 16, unitCost: 32, locationId: "loc_a01", barcode: "890123400003", supplierId: "sup_1", channel: "both" },
  { id: "itm_bag", sku: "RTL-BAG-04", name: "Crossbody Mini", industry: "retail", category: "Bags", qty: 18, storeQty: 6, onlineQty: 12, reorderPoint: 20, unitCost: 24, locationId: "loc_a02", barcode: "890123400004", supplierId: "sup_1", channel: "both" },
  { id: "itm_hat", sku: "RTL-HAT-05", name: "Soft Brim Hat", industry: "retail", category: "Apparel", qty: 54, storeQty: 30, onlineQty: 24, reorderPoint: 15, unitCost: 9, locationId: "loc_a01", barcode: "890123400005", supplierId: "sup_1", channel: "store" },

  { id: "itm_coil", sku: "MFG-STL-10", name: "Steel Coil 2mm", industry: "manufacturing", category: "Raw", qty: 42, reorderPoint: 20, unitCost: 86, locationId: "loc_m1", barcode: "890123410010", supplierId: "sup_2", wipStatus: "raw" },
  { id: "itm_rod", sku: "MFG-ALU-11", name: "Aluminum Rod", industry: "manufacturing", category: "Raw", qty: 80, reorderPoint: 30, unitCost: 14, locationId: "loc_m1", barcode: "890123410011", supplierId: "sup_2", wipStatus: "raw" },
  { id: "itm_gear", sku: "MFG-GER-12", name: "Gear Blank", industry: "manufacturing", category: "Component", qty: 26, reorderPoint: 24, unitCost: 7.5, locationId: "loc_m1", barcode: "890123410012", supplierId: "sup_2", wipStatus: "raw" },
  { id: "itm_assy", sku: "MFG-WIP-13", name: "Motor Housing (WIP)", industry: "manufacturing", category: "WIP", qty: 9, reorderPoint: 4, unitCost: 48, locationId: "loc_m2", barcode: "890123410013", supplierId: "sup_2", wipStatus: "wip", bomId: "bom_motor" },
  { id: "itm_motor", sku: "MFG-FIN-14", name: "Finished Mini Motor", industry: "manufacturing", category: "Finished", qty: 14, reorderPoint: 8, unitCost: 72, locationId: "loc_b01", barcode: "890123410014", supplierId: "sup_2", wipStatus: "finished", bomId: "bom_motor" },
  { id: "itm_wire", sku: "MFG-CPR-15", name: "Copper Wire Spool", industry: "manufacturing", category: "Raw", qty: 11, reorderPoint: 12, unitCost: 19, locationId: "loc_m1", barcode: "890123410015", supplierId: "sup_2", wipStatus: "raw" },

  { id: "itm_amox", sku: "HC-AMX-20", name: "Amoxicillin 500mg", industry: "healthcare", category: "Drug", qty: 240, reorderPoint: 80, unitCost: 0.42, locationId: "loc_h1", barcode: "890123420020", supplierId: "sup_3", expiry: "2026-09-10", lot: "A12345", batch: "B-8821", critical: true },
  { id: "itm_ins", sku: "HC-INS-21", name: "Insulin Vial 10ml", industry: "healthcare", category: "Drug", qty: 18, reorderPoint: 24, unitCost: 28, locationId: "loc_h1", barcode: "890123420021", supplierId: "sup_3", expiry: "2026-08-28", lot: "IN-4401", batch: "B-9102", critical: true },
  { id: "itm_glv", sku: "HC-GLV-22", name: "Surgical Gloves (box)", industry: "healthcare", category: "Supply", qty: 96, reorderPoint: 40, unitCost: 6.2, locationId: "loc_h2", barcode: "890123420022", supplierId: "sup_3", expiry: "2027-03-01", lot: "GL-19", batch: "B-2200" },
  { id: "itm_defib", sku: "HC-DEF-23", name: "Defibrillator Pack", industry: "healthcare", category: "Asset", qty: 4, reorderPoint: 2, unitCost: 890, locationId: "loc_h2", barcode: "890123420023", supplierId: "sup_3", critical: true, lifecycle: "active" },
  { id: "itm_ibu", sku: "HC-IBU-24", name: "Ibuprofen 200mg", industry: "healthcare", category: "Drug", qty: 400, reorderPoint: 100, unitCost: 0.12, locationId: "loc_h1", barcode: "890123420024", supplierId: "sup_3", expiry: "2027-01-15", lot: "IB-77", batch: "B-1044" },

  { id: "itm_tom", sku: "FD-TOM-30", name: "Roma Tomatoes (kg)", industry: "food", category: "Produce", qty: 18, reorderPoint: 8, unitCost: 2.4, locationId: "loc_k1", barcode: "890123430030", supplierId: "sup_4", fifoDate: "2026-08-21", expiry: "2026-08-27", perishable: true },
  { id: "itm_chs", sku: "FD-CHS-31", name: "Cheddar Slices", industry: "food", category: "Dairy", qty: 40, reorderPoint: 16, unitCost: 3.1, locationId: "loc_k1", barcode: "890123430031", supplierId: "sup_4", fifoDate: "2026-08-20", expiry: "2026-09-02", perishable: true },
  { id: "itm_bun", sku: "FD-BUN-32", name: "Brioche Buns", industry: "food", category: "Bakery", qty: 48, reorderPoint: 20, unitCost: 0.55, locationId: "loc_k2", barcode: "890123430032", supplierId: "sup_4", fifoDate: "2026-08-22", expiry: "2026-08-26", perishable: true },
  { id: "itm_let", sku: "FD-LET-33", name: "Crisp Lettuce", industry: "food", category: "Produce", qty: 9, reorderPoint: 10, unitCost: 1.8, locationId: "loc_k1", barcode: "890123430033", supplierId: "sup_4", fifoDate: "2026-08-19", expiry: "2026-08-25", perishable: true },
  { id: "itm_pat", sku: "FD-PAT-34", name: "Beef Patties", industry: "food", category: "Protein", qty: 32, reorderPoint: 16, unitCost: 1.9, locationId: "loc_k1", barcode: "890123430034", supplierId: "sup_4", fifoDate: "2026-08-22", expiry: "2026-08-29", perishable: true },
  { id: "itm_mlk", sku: "FD-MLK-35", name: "Whole Milk (L)", industry: "food", category: "Dairy", qty: 14, reorderPoint: 12, unitCost: 1.2, locationId: "loc_k1", barcode: "890123430035", supplierId: "sup_4", fifoDate: "2026-08-21", expiry: "2026-08-26", perishable: true },

  { id: "itm_wrap", sku: "WH-WRP-40", name: "Pallet Wrap", industry: "warehouse", category: "Packing", qty: 70, reorderPoint: 20, unitCost: 4.4, locationId: "loc_b02", barcode: "890123440040", supplierId: "sup_5" },
  { id: "itm_lbl", sku: "WH-LBL-41", name: "Shipping Labels", industry: "warehouse", category: "Packing", qty: 500, reorderPoint: 120, unitCost: 0.04, locationId: "loc_b01", barcode: "890123440041", supplierId: "sup_5" },
  { id: "itm_plt", sku: "WH-PLT-42", name: "Wood Pallets", industry: "warehouse", category: "Equipment", qty: 28, reorderPoint: 12, unitCost: 9, locationId: "loc_c01", barcode: "890123440042", supplierId: "sup_5" },

  { id: "itm_mbp", sku: "IT-LPT-50", name: "MacBook Pro 14", industry: "itam", category: "Hardware", qty: 12, reorderPoint: 3, unitCost: 1899, locationId: "loc_it", barcode: "890123450050", supplierId: "sup_6", lifecycle: "active" },
  { id: "itm_phn", sku: "IT-PHN-51", name: "Work Phone", industry: "itam", category: "Hardware", qty: 22, reorderPoint: 6, unitCost: 799, locationId: "loc_it", barcode: "890123450051", supplierId: "sup_6", lifecycle: "active" },
  { id: "itm_adobe", sku: "IT-LIC-52", name: "Creative Cloud Seats", industry: "itam", category: "License", qty: 1, reorderPoint: 1, unitCost: 55, locationId: "loc_it", barcode: "890123450052", supplierId: "sup_6", licenseUsed: 25, licenseTotal: 50, lifecycle: "active" },
  { id: "itm_slack", sku: "IT-LIC-53", name: "Team Chat Seats", industry: "itam", category: "License", qty: 1, reorderPoint: 1, unitCost: 8, locationId: "loc_it", barcode: "890123450053", supplierId: "sup_6", licenseUsed: 47, licenseTotal: 50, lifecycle: "active" },
  { id: "itm_sw", sku: "IT-NET-54", name: "Core Switch", industry: "itam", category: "Hardware", qty: 2, reorderPoint: 1, unitCost: 2400, locationId: "loc_it", barcode: "890123450054", supplierId: "sup_6", lifecycle: "repair" },
];

export const recipes: Recipe[] = [
  {
    id: "rcp_burger",
    name: "House Burger",
    salePrice: 12.5,
    ingredients: [
      { itemId: "itm_bun", qty: 1 },
      { itemId: "itm_pat", qty: 1 },
      { itemId: "itm_let", qty: 0.1 },
      { itemId: "itm_tom", qty: 0.15 },
      { itemId: "itm_chs", qty: 1 },
    ],
  },
  {
    id: "rcp_salad",
    name: "Garden Salad",
    salePrice: 8,
    ingredients: [
      { itemId: "itm_let", qty: 0.4 },
      { itemId: "itm_tom", qty: 0.2 },
      { itemId: "itm_chs", qty: 0.5 },
    ],
  },
];

export const boms: Bom[] = [
  {
    id: "bom_motor",
    name: "Mini Motor BOM",
    outputItemId: "itm_motor",
    outputQty: 1,
    components: [
      { itemId: "itm_coil", qty: 0.2 },
      { itemId: "itm_rod", qty: 1 },
      { itemId: "itm_gear", qty: 2 },
      { itemId: "itm_wire", qty: 0.25 },
    ],
  },
];

export const orders: Order[] = [
  {
    id: "ord_1001",
    type: "sales",
    status: "picking",
    partner: "Maya Chen",
    channel: "online",
    createdAt: `${TODAY}T09:12:00`,
    notes: "Gift wrap",
    lines: [
      { itemId: "itm_tee", qty: 2, price: 24 },
      { itemId: "itm_tote", qty: 1, price: 28 },
    ],
  },
  {
    id: "ord_1002",
    type: "sales",
    status: "pending",
    partner: "Walk-in #441",
    channel: "store",
    createdAt: `${TODAY}T11:40:00`,
    notes: "",
    lines: [{ itemId: "itm_shoe", qty: 1, price: 79 }],
  },
  {
    id: "ord_1003",
    type: "sales",
    status: "packed",
    partner: "River Outfitters",
    channel: "online",
    createdAt: `${TODAY}T08:05:00`,
    notes: "Wholesale",
    lines: [
      { itemId: "itm_tee", qty: 12, price: 18 },
      { itemId: "itm_hat", qty: 6, price: 16 },
    ],
  },
  {
    id: "ord_2001",
    type: "purchase",
    status: "pending",
    partner: "MediLot Pharma",
    createdAt: `${TODAY}T07:30:00`,
    notes: "Insulin restock — critical",
    lines: [{ itemId: "itm_ins", qty: 40, price: 28 }],
  },
  {
    id: "ord_2002",
    type: "purchase",
    status: "received",
    partner: "Freshfield Produce",
    createdAt: "2026-08-22T16:10:00",
    notes: "Morning produce",
    lines: [
      { itemId: "itm_tom", qty: 12, price: 2.4 },
      { itemId: "itm_let", qty: 8, price: 1.8 },
    ],
  },
  {
    id: "ord_1004",
    type: "sales",
    status: "shipped",
    partner: "Luis Ortega",
    channel: "online",
    createdAt: "2026-08-22T14:22:00",
    notes: "",
    lines: [{ itemId: "itm_bag", qty: 1, price: 48 }],
  },
];

export const moves: StockMove[] = [
  { id: "mv_1", itemId: "itm_tee", qty: 24, type: "in", to: "loc_a01", note: "PO receive", at: "2026-08-20T10:00:00" },
  { id: "mv_2", itemId: "itm_ins", qty: 6, type: "out", from: "loc_h1", note: "Clinic dispense", at: "2026-08-22T15:12:00" },
  { id: "mv_3", itemId: "itm_tom", qty: 12, type: "in", to: "loc_k1", note: "Produce delivery", at: "2026-08-22T16:10:00" },
];

export function cloneSeed() {
  return {
    items: structuredClone(items),
    locations: structuredClone(locations),
    suppliers: structuredClone(suppliers),
    orders: structuredClone(orders),
    recipes: structuredClone(recipes),
    boms: structuredClone(boms),
    moves: structuredClone(moves),
    dismissedAlertIds: [] as string[],
    settings: { ...defaultSettings },
  };
}

export const TODAY_ISO = TODAY;
