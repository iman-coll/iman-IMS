import { create } from "zustand";
import { useMemo } from "react";
import { cloneSeed, TODAY_ISO } from "./seed";
import { daysUntil, uid } from "./format";
import type {
  Alert,
  Channel,
  IMSSnapshot,
  Industry,
  Item,
  Lifecycle,
  Order,
  OrderStatus,
  Settings,
  WipStatus,
} from "./types";

const KEY = "stocklot-ims-v1";

function persist(state: IMSSnapshot) {
  if (typeof localStorage === "undefined") return;
  const snap: IMSSnapshot = {
    items: state.items,
    locations: state.locations,
    suppliers: state.suppliers,
    orders: state.orders,
    recipes: state.recipes,
    boms: state.boms,
    moves: state.moves,
    dismissedAlertIds: state.dismissedAlertIds,
    settings: state.settings,
  };
  localStorage.setItem(KEY, JSON.stringify(snap));
}

function load(): IMSSnapshot {
  const seed = cloneSeed();
  if (typeof localStorage === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as Partial<IMSSnapshot>;
    return {
      items: parsed.items ?? seed.items,
      locations: parsed.locations ?? seed.locations,
      suppliers: parsed.suppliers ?? seed.suppliers,
      orders: parsed.orders ?? seed.orders,
      recipes: parsed.recipes ?? seed.recipes,
      boms: parsed.boms ?? seed.boms,
      moves: parsed.moves ?? seed.moves,
      dismissedAlertIds: parsed.dismissedAlertIds ?? [],
      settings: { ...seed.settings, ...parsed.settings },
    };
  } catch {
    return seed;
  }
}

export type Stats = {
  totalUnits: number;
  skuCount: number;
  inStockSkus: number;
  lowStock: number;
  ordersToday: number;
  pendingOrders: number;
  totalValue: number;
};

export function computeStats(items: Item[], orders: Order[]): Stats {
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
    }, 0),
  };
}

export function computeAlerts(items: Item[], dismissedAlertIds: string[], settings: Settings): Alert[] {
  const list: Alert[] = [];
  for (const it of items) {
    if (it.qty <= it.reorderPoint) {
      list.push({
        id: `low_${it.id}`,
        kind: it.critical ? "critical" : "low_stock",
        severity: it.critical || it.qty === 0 ? "critical" : "warn",
        message: `${it.name} is ${it.qty === 0 ? "out of stock" : "below reorder point"} (${it.qty} / min ${it.reorderPoint}).`,
        itemId: it.id,
        read: dismissedAlertIds.includes(`low_${it.id}`),
        createdAt: TODAY_ISO,
      });
    }
    if (it.expiry) {
      const d = daysUntil(it.expiry);
      if (d < 0) {
        list.push({
          id: `exp_${it.id}`,
          kind: "expiry",
          severity: "critical",
          message: `${it.name} expired ${-d} day${-d === 1 ? "" : "s"} ago (${it.expiry}).`,
          itemId: it.id,
          read: dismissedAlertIds.includes(`exp_${it.id}`),
          createdAt: TODAY_ISO,
        });
      } else if (d <= settings.expiryWarnDays) {
        list.push({
          id: `expw_${it.id}`,
          kind: it.perishable ? "perishable" : "expiry",
          severity: d <= 5 ? "critical" : "warn",
          message: `${it.name} expires in ${d} day${d === 1 ? "" : "s"} (${it.expiry}${it.lot ? `, lot ${it.lot}` : ""}).`,
          itemId: it.id,
          read: dismissedAlertIds.includes(`expw_${it.id}`),
          createdAt: TODAY_ISO,
        });
      }
    }
    if (it.licenseTotal && it.licenseUsed != null && it.licenseUsed / it.licenseTotal >= 0.9) {
      list.push({
        id: `lic_${it.id}`,
        kind: "license",
        severity: it.licenseUsed >= it.licenseTotal ? "critical" : "warn",
        message: `${it.name} seats ${it.licenseUsed}/${it.licenseTotal}.`,
        itemId: it.id,
        read: dismissedAlertIds.includes(`lic_${it.id}`),
        createdAt: TODAY_ISO,
      });
    }
    if (it.qty > it.reorderPoint * 8 && it.unitCost * it.qty > 400) {
      list.push({
        id: `ov_${it.id}`,
        kind: "overstock",
        severity: "info",
        message: `${it.name} looks overstocked (${it.qty} on hand).`,
        itemId: it.id,
        read: dismissedAlertIds.includes(`ov_${it.id}`),
        createdAt: TODAY_ISO,
      });
    }
  }
  const rank = { critical: 0, warn: 1, info: 2 };
  return list.sort((a, b) => rank[a.severity] - rank[b.severity] || Number(a.read) - Number(b.read));
}

export type IMSState = IMSSnapshot & {
  hydrated: boolean;
  hydrate: () => void;
  resetDemo: () => void;
  stats: () => Stats;
  alerts: () => Alert[];
  itemById: (id: string) => Item | undefined;
  adjustQty: (id: string, delta: number, note: string, type?: "in" | "out" | "adjust" | "sale" | "return") => void;
  setItem: (item: Item) => void;
  addItem: (item: Omit<Item, "id">) => string;
  removeItem: (id: string) => void;
  transfer: (id: string, toLocationId: string) => void;
  scanAdjust: (code: string, delta: number, channel?: Channel) => Item | null;
  fulfillOrder: (orderId: string, next: OrderStatus) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt">) => string;
  receivePurchase: (orderId: string) => void;
  sellRecipe: (recipeId: string, servings: number) => { ok: boolean; missing: string[] };
  startProduction: (bomId: string, qty: number) => { ok: boolean; missing: string[] };
  finishProduction: (qty: number) => void;
  setWip: (id: string, status: WipStatus) => void;
  setLifecycle: (id: string, life: Lifecycle) => void;
  assignLicense: (id: string, delta: number) => void;
  updateSettings: (s: Partial<Settings>) => void;
  dismissAlert: (id: string) => void;
  cycleCount: (locationId: string, counts: Record<string, number>) => void;
  crossDock: (itemId: string, qty: number) => void;
  syncChannels: (id: string) => void;
  setChannelQty: (id: string, storeQty: number, onlineQty: number) => void;
};

function bump(item: Item, delta: number): Item {
  const qty = Math.max(0, Math.round((item.qty + delta) * 100) / 100);
  const next = { ...item, qty };
  if (item.channel && item.storeQty != null && item.onlineQty != null) {
    const total = Math.max(1, item.storeQty + item.onlineQty);
    const storeShare = item.storeQty / total;
    next.storeQty = Math.max(0, Math.round(qty * storeShare));
    next.onlineQty = Math.max(0, qty - next.storeQty);
  }
  return next;
}

export const useIMS = create<IMSState>((set, get) => ({
  ...cloneSeed(),
  hydrated: false,
  hydrate: () => {
    const snap = load();
    set({ ...snap, hydrated: true });
  },
  resetDemo: () => {
    const snap = cloneSeed();
    persist(snap);
    set({ ...snap, hydrated: true });
  },
  stats: () => computeStats(get().items, get().orders),
  alerts: () => computeAlerts(get().items, get().dismissedAlertIds, get().settings),
  itemById: (id) => get().items.find((i) => i.id === id),
  adjustQty: (id, delta, note, type = delta >= 0 ? "in" : "out") => {
    set((s) => {
      const items = s.items.map((i) => (i.id === id ? bump(i, delta) : i));
      const moves = [
        {
          id: uid("mv"),
          itemId: id,
          qty: Math.abs(delta),
          type,
          note,
          at: new Date().toISOString(),
        },
        ...s.moves,
      ].slice(0, 80);
      const next = { ...s, items, moves };
      persist(next);
      return next;
    });
  },
  setItem: (item) => {
    set((s) => {
      const items = s.items.map((i) => (i.id === item.id ? item : i));
      const next = { ...s, items };
      persist(next);
      return next;
    });
  },
  addItem: (item) => {
    const id = uid("itm");
    set((s) => {
      const next = { ...s, items: [{ ...item, id }, ...s.items] };
      persist(next);
      return next;
    });
    return id;
  },
  removeItem: (id) => {
    set((s) => {
      const next = { ...s, items: s.items.filter((i) => i.id !== id) };
      persist(next);
      return next;
    });
  },
  transfer: (id, toLocationId) => {
    set((s) => {
      const item = s.items.find((i) => i.id === id);
      const items = s.items.map((i) => (i.id === id ? { ...i, locationId: toLocationId } : i));
      const moves = [
        {
          id: uid("mv"),
          itemId: id,
          qty: item?.qty ?? 0,
          type: "transfer" as const,
          from: item?.locationId,
          to: toLocationId,
          note: "Location transfer",
          at: new Date().toISOString(),
        },
        ...s.moves,
      ].slice(0, 80);
      const next = { ...s, items, moves };
      persist(next);
      return next;
    });
  },
  scanAdjust: (code, delta, channel) => {
    const needle = code.trim().toLowerCase();
    const item = get().items.find(
      (i) =>
        i.barcode.toLowerCase() === needle ||
        i.sku.toLowerCase() === needle ||
        i.name.toLowerCase() === needle,
    );
    if (!item) return null;
    if (channel && item.storeQty != null && item.onlineQty != null) {
      set((s) => {
        const items = s.items.map((i) => {
          if (i.id !== item.id) return i;
          const storeQty = Math.max(0, (i.storeQty ?? 0) + (channel === "store" ? delta : 0));
          const onlineQty = Math.max(0, (i.onlineQty ?? 0) + (channel === "online" ? delta : 0));
          return { ...i, storeQty, onlineQty, qty: storeQty + onlineQty };
        });
        const next = {
          ...s,
          items,
          moves: [
            {
              id: uid("mv"),
              itemId: item.id,
              qty: Math.abs(delta),
              type: delta < 0 ? ("sale" as const) : ("return" as const),
              note: `Scan ${channel}`,
              at: new Date().toISOString(),
            },
            ...s.moves,
          ].slice(0, 80),
        };
        persist(next);
        return next;
      });
    } else {
      get().adjustQty(item.id, delta, `Scan ${code}`, delta < 0 ? "sale" : "return");
    }
    return get().itemById(item.id) ?? item;
  },
  fulfillOrder: (orderId, nextStatus) => {
    set((s) => {
      const order = s.orders.find((o) => o.id === orderId);
      if (!order) return s;
      let items = s.items;
      if (order.type === "sales" && nextStatus === "picking" && order.status === "pending") {
        items = items.map((it) => {
          const line = order.lines.find((l) => l.itemId === it.id);
          return line ? bump(it, -line.qty) : it;
        });
      }
      const orders = s.orders.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o));
      const next = { ...s, items, orders };
      persist(next);
      return next;
    });
  },
  addOrder: (order) => {
    const id = uid("ord");
    set((s) => {
      const next = {
        ...s,
        orders: [{ ...order, id, createdAt: new Date().toISOString() }, ...s.orders],
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
      const orders = s.orders.map((o) => (o.id === orderId ? { ...o, status: "received" as const } : o));
      const next = { ...s, items, orders };
      persist(next);
      return next;
    });
  },
  sellRecipe: (recipeId, servings) => {
    const recipe = get().recipes.find((r) => r.id === recipeId);
    if (!recipe) return { ok: false, missing: ["Recipe"] };
    const missing: string[] = [];
    for (const ing of recipe.ingredients) {
      const it = get().itemById(ing.itemId);
      const need = ing.qty * servings;
      if (!it || it.qty < need) missing.push(it?.name ?? ing.itemId);
    }
    if (missing.length) return { ok: false, missing };
    set((s) => {
      let items = s.items;
      for (const ing of recipe.ingredients) {
        items = items.map((i) => (i.id === ing.itemId ? bump(i, -ing.qty * servings) : i));
      }
      const next = {
        ...s,
        items,
        moves: [
          {
            id: uid("mv"),
            itemId: recipe.ingredients[0]?.itemId ?? "",
            qty: servings,
            type: "recipe" as const,
            note: `Sold ${servings}× ${recipe.name}`,
            at: new Date().toISOString(),
          },
          ...s.moves,
        ].slice(0, 80),
      };
      persist(next);
      return next;
    });
    return { ok: true, missing: [] };
  },
  startProduction: (bomId, qty) => {
    const bom = get().boms.find((b) => b.id === bomId);
    if (!bom) return { ok: false, missing: ["BOM"] };
    const missing: string[] = [];
    for (const c of bom.components) {
      const it = get().itemById(c.itemId);
      const need = c.qty * qty;
      if (!it || it.qty < need) missing.push(it?.name ?? c.itemId);
    }
    if (missing.length) return { ok: false, missing };
    set((s) => {
      let items = s.items;
      for (const c of bom.components) {
        items = items.map((i) => (i.id === c.itemId ? bump(i, -c.qty * qty) : i));
      }
      items = items.map((i) => (i.id === "itm_assy" ? bump(i, qty) : i));
      const next = {
        ...s,
        items,
        moves: [
          {
            id: uid("mv"),
            itemId: "itm_assy",
            qty,
            type: "production" as const,
            note: `Started ${qty}× ${bom.name}`,
            at: new Date().toISOString(),
          },
          ...s.moves,
        ].slice(0, 80),
      };
      persist(next);
      return next;
    });
    return { ok: true, missing: [] };
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
      const next = { ...s, items };
      persist(next);
      return next;
    });
  },
  setWip: (id, status) => {
    set((s) => {
      const next = { ...s, items: s.items.map((i) => (i.id === id ? { ...i, wipStatus: status } : i)) };
      persist(next);
      return next;
    });
  },
  setLifecycle: (id, life) => {
    set((s) => {
      const next = { ...s, items: s.items.map((i) => (i.id === id ? { ...i, lifecycle: life } : i)) };
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
          return { ...i, licenseUsed };
        }),
      };
      persist(next);
      return next;
    });
  },
  updateSettings: (patch) => {
    set((s) => {
      const next = { ...s, settings: { ...s.settings, ...patch } };
      persist(next);
      return next;
    });
  },
  dismissAlert: (id) => {
    set((s) => {
      const next = { ...s, dismissedAlertIds: [...new Set([...s.dismissedAlertIds, id])] };
      persist(next);
      return next;
    });
  },
  cycleCount: (locationId, counts) => {
    set((s) => {
      const items = s.items.map((i) => {
        if (i.locationId !== locationId) return i;
        if (counts[i.id] == null) return i;
        return { ...i, qty: Math.max(0, counts[i.id]) };
      });
      const next = {
        ...s,
        items,
        moves: [
          {
            id: uid("mv"),
            itemId: Object.keys(counts)[0] ?? "",
            qty: 0,
            type: "adjust" as const,
            note: `Cycle count ${locationId}`,
            at: new Date().toISOString(),
          },
          ...s.moves,
        ].slice(0, 80),
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
          return { ...i, qty: storeQty + onlineQty, channel: "both" as const };
        }),
      };
      persist(next);
      return next;
    });
  },
  setChannelQty: (id, storeQty, onlineQty) => {
    set((s) => {
      const next = {
        ...s,
        items: s.items.map((i) =>
          i.id === id
            ? { ...i, storeQty: Math.max(0, storeQty), onlineQty: Math.max(0, onlineQty), qty: Math.max(0, storeQty) + Math.max(0, onlineQty) }
            : i,
        ),
      };
      persist(next);
      return next;
    });
  },
}));

export const INDUSTRY_META: Record<
  Industry,
  { title: string; blurb: string; color: string; features: { key: string; title: string; body: string }[] }
> = {
  retail: {
    title: "Retail & E-commerce",
    blurb: "Real-time counts across stores and the web, faster pick-pack-ship, and barcode updates on every sale or return.",
    color: "var(--color-pink)",
    features: [
      { key: "stock", title: "Stock tracking", body: "Monitor product counts in real time across online stores and physical shops." },
      { key: "fulfill", title: "Order fulfillment", body: "Speed up picking, packing, and shipping items to buyers." },
      { key: "barcode", title: "Barcode scanning", body: "Use codes to quickly update item counts during sales or returns." },
      { key: "sync", title: "Multi-channel sync", body: "Keep inventory synchronized the moment stock moves in any channel." },
    ],
  },
  manufacturing: {
    title: "Manufacturing & Production",
    blurb: "Feed the line with the right parts, watch work-in-progress, and order materials only as needed.",
    color: "var(--color-blue)",
    features: [
      { key: "raw", title: "Raw materials control", body: "Track parts needed to build goods before assembly begins." },
      { key: "wip", title: "Work-in-progress (WIP)", body: "Monitor items currently moving down the production line." },
      { key: "bom", title: "Bill of materials (BOM)", body: "List every component required to build a finished product." },
      { key: "jit", title: "Just-in-time (JIT)", body: "Order materials only as needed to lower storage costs." },
    ],
  },
  healthcare: {
    title: "Healthcare & Pharmaceuticals",
    blurb: "Expiration, lot tracing, and critical-stock alerts so life-saving inventory is never a guess.",
    color: "var(--color-green)",
    features: [
      { key: "expiry", title: "Expiration monitoring", body: "Track use-by dates on medicine and supplies to stop waste." },
      { key: "batch", title: "Batch & lot tracking", body: "Follow specific drug lots so recalls can be handled quickly." },
      { key: "critical", title: "Critical stock alerts", body: "Warn staff when life-saving medicine or urgent supplies run low." },
      { key: "asset", title: "Asset security", body: "Monitor high-cost tools and critical medical supplies." },
    ],
  },
  food: {
    title: "Food, Beverage & Hospitality",
    blurb: "FIFO for perishables, recipe deductions on every plate, and restock alerts before the kitchen runs dry.",
    color: "var(--color-orange)",
    features: [
      { key: "fifo", title: "Perishable management (FIFO)", body: "Use older food first so nothing spoils on the shelf." },
      { key: "recipe", title: "Recipe tracking & costing", body: "Deduct exact ingredient amounts when a menu item sells." },
      { key: "alerts", title: "Perishable alerts", body: "Warn staff when ingredients are close to spoiling." },
      { key: "supplier", title: "Supplier ordering", body: "Send automated restock alerts before kitchen supplies run out." },
    ],
  },
  warehouse: {
    title: "Warehousing & Logistics",
    blurb: "Know the bin, scan the unit, and move freight from inbound to outbound without extra dwell time.",
    color: "var(--color-primary)",
    features: [
      { key: "map", title: "Location mapping", body: "Assign exact shelf, bin, or aisle spots to every item." },
      { key: "scan", title: "Barcode & RFID scanning", body: "Speed up receiving and counting stock." },
      { key: "dock", title: "Cross-docking", body: "Move goods straight from incoming trucks to outgoing vehicles." },
      { key: "cycle", title: "Cycle counting", body: "Audit small groups regularly instead of one massive yearly count." },
    ],
  },
  itam: {
    title: "IT & Software (ITAM)",
    blurb: "Treat laptops, phones, and licenses as inventory — seats, lifecycle, and replacement dates included.",
    color: "var(--color-teal)",
    features: [
      { key: "hw", title: "Hardware tracking", body: "Log company laptops, phones, and network devices." },
      { key: "lic", title: "Software licenses", body: "Monitor active subscriptions and user counts." },
      { key: "life", title: "Lifecycle management", body: "Plan when to repair, refresh, or replace tech tools." },
      { key: "sec", title: "Asset security", body: "Keep visibility over valuable devices and software." },
    ],
  },
};

export function industryOf(slug: string): Industry | null {
  if (slug in INDUSTRY_META) return slug as Industry;
  return null;
}

export function useStats() {
  const items = useIMS((s) => s.items);
  const orders = useIMS((s) => s.orders);
  return useMemo(() => computeStats(items, orders), [items, orders]);
}

export function useAlerts() {
  const items = useIMS((s) => s.items);
  const dismissed = useIMS((s) => s.dismissedAlertIds);
  const settings = useIMS((s) => s.settings);
  return useMemo(() => computeAlerts(items, dismissed, settings), [items, dismissed, settings]);
}

