export type Industry =
  | "retail"
  | "manufacturing"
  | "healthcare"
  | "food"
  | "warehouse"
  | "itam";

export type Channel = "store" | "online" | "both";
export type WipStatus = "raw" | "wip" | "finished";
export type Lifecycle = "active" | "repair" | "retire";
export type OrderType = "sales" | "purchase";
export type OrderStatus =
  | "pending"
  | "picking"
  | "packed"
  | "shipped"
  | "received"
  | "cancelled";
export type MoveType =
  | "in"
  | "out"
  | "transfer"
  | "adjust"
  | "production"
  | "recipe"
  | "sale"
  | "return";
export type AlertKind =
  | "low_stock"
  | "expiry"
  | "overstock"
  | "license"
  | "perishable"
  | "critical"
  | "recall";
export type AlertSeverity = "info" | "warn" | "critical";

export type Item = {
  id: string;
  sku: string;
  name: string;
  industry: Industry;
  category: string;
  qty: number;
  reorderPoint: number;
  unitCost: number;
  locationId: string;
  barcode: string;
  supplierId: string;
  channel?: Channel;
  storeQty?: number;
  onlineQty?: number;
  expiry?: string;
  lot?: string;
  batch?: string;
  fifoDate?: string;
  wipStatus?: WipStatus;
  bomId?: string;
  licenseUsed?: number;
  licenseTotal?: number;
  lifecycle?: Lifecycle;
  critical?: boolean;
  perishable?: boolean;
};

export type Location = {
  id: string;
  code: string;
  name: string;
  type: "shelf" | "bin" | "aisle" | "dock" | "cold" | "secure";
  warehouse: string;
};

export type Supplier = {
  id: string;
  name: string;
  leadDays: number;
  email: string;
  category: string;
  phone: string;
};

export type OrderLine = { itemId: string; qty: number; price: number };

export type Order = {
  id: string;
  type: OrderType;
  status: OrderStatus;
  partner: string;
  lines: OrderLine[];
  channel?: Channel;
  createdAt: string;
  notes: string;
};

export type Recipe = {
  id: string;
  name: string;
  salePrice: number;
  ingredients: { itemId: string; qty: number }[];
};

export type Bom = {
  id: string;
  name: string;
  outputItemId: string;
  outputQty: number;
  components: { itemId: string; qty: number }[];
};

export type StockMove = {
  id: string;
  itemId: string;
  qty: number;
  type: MoveType;
  from?: string;
  to?: string;
  note: string;
  at: string;
};

export type Alert = {
  id: string;
  kind: AlertKind;
  severity: AlertSeverity;
  message: string;
  itemId?: string;
  read: boolean;
  createdAt: string;
};

export type Settings = {
  company: string;
  currency: string;
  defaultReorder: number;
  expiryWarnDays: number;
  autoReorder: boolean;
};

export type IMSSnapshot = {
  items: Item[];
  locations: Location[];
  suppliers: Supplier[];
  orders: Order[];
  recipes: Recipe[];
  boms: Bom[];
  moves: StockMove[];
  dismissedAlertIds: string[];
  settings: Settings;
};
