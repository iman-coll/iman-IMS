import streamlit as st
from datetime import date, datetime, timedelta
from collections import defaultdict
import copy

st.set_page_config(page_title="IMAN Inventory Management System", page_icon="📦", layout="wide", initial_sidebar_state="expanded")

# -----------------------------------------------------------------------------
# IMAN IMS - Streamlit implementation of the existing React/Vite modules.
# The original React files remain untouched in src/. This file is the Python
# deployment entry point and keeps its own session-state data so the app works
# on Streamlit Community Cloud without Node/Vite.
# -----------------------------------------------------------------------------

INDUSTRIES = {
    "retail": ("Retail & E-commerce", "🛍️"),
    "manufacturing": ("Manufacturing", "🏭"),
    "healthcare": ("Healthcare", "🏥"),
    "food": ("Food & Hospitality", "🍔"),
    "warehouse": ("Warehousing", "📦"),
    "itam": ("IT Asset Management", "💻"),
}

LOCATIONS = [
    {"id":"loc_a01","code":"A-01","name":"Retail floor — apparel","type":"aisle","warehouse":"Storefront"},
    {"id":"loc_a02","code":"A-02","name":"Retail floor — accessories","type":"shelf","warehouse":"Storefront"},
    {"id":"loc_b01","code":"B-01","name":"Pick face — fast movers","type":"bin","warehouse":"Main DC"},
    {"id":"loc_b02","code":"B-02","name":"Reserve rack","type":"shelf","warehouse":"Main DC"},
    {"id":"loc_c01","code":"C-01","name":"Inbound dock","type":"dock","warehouse":"Main DC"},
    {"id":"loc_c02","code":"C-02","name":"Outbound dock","type":"dock","warehouse":"Main DC"},
    {"id":"loc_m1","code":"M-01","name":"Raw materials cage","type":"bin","warehouse":"Plant 1"},
    {"id":"loc_m2","code":"M-02","name":"Assembly line","type":"aisle","warehouse":"Plant 1"},
    {"id":"loc_h1","code":"H-01","name":"Pharmacy fridge","type":"cold","warehouse":"Clinic"},
    {"id":"loc_h2","code":"H-02","name":"Secure cabinet","type":"secure","warehouse":"Clinic"},
    {"id":"loc_k1","code":"K-01","name":"Walk-in cooler","type":"cold","warehouse":"Kitchen"},
    {"id":"loc_k2","code":"K-02","name":"Dry store","type":"shelf","warehouse":"Kitchen"},
    {"id":"loc_it","code":"IT-01","name":"IT cage","type":"secure","warehouse":"HQ"},
]

SUPPLIERS = [
    {"id":"sup_1","name":"Northwind Apparel","leadDays":7,"email":"orders@northwind.example","category":"Retail","phone":"555-0140"},
    {"id":"sup_2","name":"Alloy & Gear Co.","leadDays":12,"email":"sales@alloygear.example","category":"Manufacturing","phone":"555-0188"},
    {"id":"sup_3","name":"MediLot Pharma","leadDays":4,"email":"supply@medilot.example","category":"Healthcare","phone":"555-0201"},
    {"id":"sup_4","name":"Freshfield Produce","leadDays":1,"email":"hello@freshfield.example","category":"Food","phone":"555-0112"},
    {"id":"sup_5","name":"Harbor Freight Logistics","leadDays":3,"email":"dock@harbor.example","category":"Warehouse","phone":"555-0166"},
    {"id":"sup_6","name":"Cloudstack Licensing","leadDays":2,"email":"seats@cloudstack.example","category":"ITAM","phone":"555-0199"},
]

def item(i, sku, name, industry, category, qty, reorder, cost, loc, barcode, sup, **kw):
    d = {"id":i,"sku":sku,"name":name,"industry":industry,"category":category,"qty":qty,"reorderPoint":reorder,"unitCost":cost,"locationId":loc,"barcode":barcode,"supplierId":sup}
    d.update(kw)
    return d

SEED_ITEMS = [
    item("itm_tee","RTL-TEE-01","Classic Cotton Tee","retail","Apparel",120,40,8.5,"loc_a01","890123400001","sup_1",channel="both",storeQty=48,onlineQty=72),
    item("itm_tote","RTL-TOT-02","Canvas Tote","retail","Bags",64,18,11,"loc_a02","890123400002","sup_1",channel="both",storeQty=22,onlineQty=42),
    item("itm_shoe","RTL-SNK-03","City Sneakers","retail","Footwear",36,16,32,"loc_a01","890123400003","sup_1",channel="both",storeQty=12,onlineQty=24),
    item("itm_bag","RTL-BAG-04","Crossbody Mini","retail","Bags",18,20,24,"loc_a02","890123400004","sup_1",channel="both",storeQty=6,onlineQty=12),
    item("itm_hat","RTL-HAT-05","Soft Brim Hat","retail","Apparel",54,15,9,"loc_a01","890123400005","sup_1",channel="store",storeQty=30,onlineQty=24),
    item("itm_coil","MFG-STL-10","Steel Coil 2mm","manufacturing","Raw",42,20,86,"loc_m1","890123410010","sup_2",wipStatus="raw"),
    item("itm_rod","MFG-ALU-11","Aluminum Rod","manufacturing","Raw",80,30,14,"loc_m1","890123410011","sup_2",wipStatus="raw"),
    item("itm_gear","MFG-GER-12","Gear Blank","manufacturing","Component",26,24,7.5,"loc_m1","890123410012","sup_2",wipStatus="raw"),
    item("itm_assy","MFG-WIP-13","Motor Housing (WIP)","manufacturing","WIP",9,4,48,"loc_m2","890123410013","sup_2",wipStatus="wip"),
    item("itm_motor","MFG-FIN-14","Finished Mini Motor","manufacturing","Finished",14,8,72,"loc_b01","890123410014","sup_2",wipStatus="finished"),
    item("itm_wire","MFG-CPR-15","Copper Wire Spool","manufacturing","Raw",11,12,19,"loc_m1","890123410015","sup_2",wipStatus="raw"),
    item("itm_amox","HC-AMX-20","Amoxicillin 500mg","healthcare","Drug",240,80,.42,"loc_h1","890123420020","sup_3",expiry="2026-09-10",lot="A12345",batch="B-8821",critical=True),
    item("itm_ins","HC-INS-21","Insulin Vial 10ml","healthcare","Drug",18,24,28,"loc_h1","890123420021","sup_3",expiry="2026-08-28",lot="IN-4401",batch="B-9102",critical=True),
    item("itm_glv","HC-GLV-22","Surgical Gloves (box)","healthcare","Supply",96,40,6.2,"loc_h2","890123420022","sup_3",expiry="2027-03-01",lot="GL-19",batch="B-2200"),
    item("itm_defib","HC-DEF-23","Defibrillator Pack","healthcare","Asset",4,2,890,"loc_h2","890123420023","sup_3",critical=True,lifecycle="active"),
    item("itm_ibu","HC-IBU-24","Ibuprofen 200mg","healthcare","Drug",400,100,.12,"loc_h1","890123420024","sup_3",expiry="2027-01-15",lot="IB-77",batch="B-1044"),
    item("itm_tom","FD-TOM-30","Roma Tomatoes (kg)","food","Produce",18,8,2.4,"loc_k1","890123430030","sup_4",fifoDate="2026-08-21",expiry="2026-08-27",perishable=True),
    item("itm_chs","FD-CHS-31","Cheddar Slices","food","Dairy",40,16,3.1,"loc_k1","890123430031","sup_4",fifoDate="2026-08-20",expiry="2026-09-02",perishable=True),
    item("itm_bun","FD-BUN-32","Brioche Buns","food","Bakery",48,20,.55,"loc_k2","890123430032","sup_4",fifoDate="2026-08-22",expiry="2026-08-26",perishable=True),
    item("itm_let","FD-LET-33","Crisp Lettuce","food","Produce",9,10,1.8,"loc_k1","890123430033","sup_4",fifoDate="2026-08-19",expiry="2026-08-25",perishable=True),
    item("itm_pat","FD-PAT-34","Beef Patties","food","Protein",32,16,1.9,"loc_k1","890123430034","sup_4",fifoDate="2026-08-22",expiry="2026-08-29",perishable=True),
    item("itm_mlk","FD-MLK-35","Whole Milk (L)","food","Dairy",14,12,1.2,"loc_k1","890123430035","sup_4",fifoDate="2026-08-21",expiry="2026-08-26",perishable=True),
    item("itm_wrap","WH-WRP-40","Pallet Wrap","warehouse","Packing",70,20,4.4,"loc_b02","890123440040","sup_5"),
    item("itm_lbl","WH-LBL-41","Shipping Labels","warehouse","Packing",500,120,.04,"loc_b01","890123440041","sup_5"),
    item("itm_plt","WH-PLT-42","Wood Pallets","warehouse","Equipment",28,12,9,"loc_c01","890123440042","sup_5"),
    item("itm_mbp","IT-LPT-50","MacBook Pro 14","itam","Hardware",12,3,1899,"loc_it","890123450050","sup_6",lifecycle="active"),
    item("itm_phn","IT-PHN-51","Work Phone","itam","Hardware",22,6,799,"loc_it","890123450051","sup_6",lifecycle="active"),
    item("itm_adobe","IT-LIC-52","Creative Cloud Seats","itam","License",1,1,55,"loc_it","890123450052","sup_6",licenseUsed=25,licenseTotal=50,lifecycle="active"),
    item("itm_slack","IT-LIC-53","Team Chat Seats","itam","License",1,1,8,"loc_it","890123450053","sup_6",licenseUsed=47,licenseTotal=50,lifecycle="active"),
    item("itm_sw","IT-NET-54","Core Switch","itam","Hardware",2,1,2400,"loc_it","890123450054","sup_6",lifecycle="repair"),
]

SEED_ORDERS = [
    {"id":"ord_1001","type":"sales","status":"picking","partner":"Maya Chen","channel":"online","createdAt":"2026-08-24T09:12:00","notes":"Gift wrap","lines":[{"itemId":"itm_tee","qty":2,"price":24},{"itemId":"itm_tote","qty":1,"price":28}]},
    {"id":"ord_1002","type":"sales","status":"pending","partner":"Walk-in #441","channel":"store","createdAt":"2026-08-24T11:40:00","notes":"","lines":[{"itemId":"itm_shoe","qty":1,"price":79}]},
    {"id":"ord_1003","type":"sales","status":"packed","partner":"River Outfitters","channel":"online","createdAt":"2026-08-24T08:05:00","notes":"Wholesale","lines":[{"itemId":"itm_tee","qty":12,"price":18},{"itemId":"itm_hat","qty":6,"price":16}]},
    {"id":"ord_2001","type":"purchase","status":"pending","partner":"MediLot Pharma","createdAt":"2026-08-24T07:30:00","notes":"Insulin restock — critical","lines":[{"itemId":"itm_ins","qty":40,"price":28}]},
    {"id":"ord_2002","type":"purchase","status":"received","partner":"Freshfield Produce","createdAt":"2026-08-22T16:10:00","notes":"Morning produce","lines":[{"itemId":"itm_tom","qty":12,"price":2.4},{"itemId":"itm_let","qty":8,"price":1.8}]},
    {"id":"ord_1004","type":"sales","status":"shipped","partner":"Luis Ortega","channel":"online","createdAt":"2026-08-22T14:22:00","notes":"","lines":[{"itemId":"itm_bag","qty":1,"price":48}]},
]

SEED_MOVES = [
    {"id":"mv_1","itemId":"itm_tee","qty":24,"type":"in","to":"loc_a01","note":"PO receive","at":"2026-08-20T10:00:00"},
    {"id":"mv_2","itemId":"itm_ins","qty":6,"type":"out","from":"loc_h1","note":"Clinic dispense","at":"2026-08-22T15:12:00"},
    {"id":"mv_3","itemId":"itm_tom","qty":12,"type":"in","to":"loc_k1","note":"Produce delivery","at":"2026-08-22T16:10:00"},
]

DEFAULT_SETTINGS = {"company":"Stocklot HQ","currency":"USD","defaultReorder":20,"expiryWarnDays":30,"autoReorder":True}

if "ims" not in st.session_state:
    st.session_state.ims = {"items":copy.deepcopy(SEED_ITEMS),"orders":copy.deepcopy(SEED_ORDERS),"moves":copy.deepcopy(SEED_MOVES),"suppliers":copy.deepcopy(SUPPLIERS),"locations":copy.deepcopy(LOCATIONS),"settings":copy.deepcopy(DEFAULT_SETTINGS),"dismissed":set()}

def data(): return st.session_state.ims

def save():
    # Streamlit session state is the safe cloud-compatible working store.
    # The original React localStorage store remains preserved in src/lib/store.ts.
    st.session_state.ims = data()

def money(v):
    c=data()["settings"]["currency"]
    symbols={"USD":"$","EUR":"€","GBP":"£","PKR":"Rs "}
    return f"{symbols.get(c,c+' ')}{v:,.2f}"

def item_name(iid):
    return next((x["name"] for x in data()["items"] if x["id"]==iid), iid)

def stats():
    its=data()["items"]; ods=data()["orders"]
    return {
        "units":sum(0 if i["category"]=="License" else i["qty"] for i in its),
        "skus":len(its),
        "low":sum(i["qty"]<=i["reorderPoint"] for i in its),
        "orders_today":sum(o["createdAt"].startswith(str(date.today())) for o in ods),
        "pending":sum(o["status"] in ("pending","picking") for o in ods),
        "value":sum((i.get("licenseTotal",0)*i["unitCost"] if i.get("licenseTotal") else i["qty"]*i["unitCost"]) for i in its),
    }

def alerts():
    out=[]; today=date.today(); warn=data()["settings"]["expiryWarnDays"]
    for i in data()["items"]:
        if i["qty"]<=i["reorderPoint"]:
            sev="critical" if i.get("critical") or i["qty"]==0 else "warn"
            out.append({"id":"low_"+i["id"],"kind":"critical" if i.get("critical") else "low_stock","severity":sev,"message":f"{i['name']} is {'out of stock' if i['qty']==0 else 'below reorder point'} ({i['qty']} / min {i['reorderPoint']}).","itemId":i["id"]})
        if i.get("expiry"):
            try: d=(date.fromisoformat(i["expiry"])-today).days
            except ValueError: d=9999
            if d<0 or d<=warn:
                out.append({"id":"exp_"+i["id"],"kind":"expiry","severity":"critical" if d<=5 else "warn","message":f"{i['name']} expires in {d} day(s) ({i['expiry']})." if d>=0 else f"{i['name']} expired {-d} day(s) ago ({i['expiry']}).","itemId":i["id"]})
        if i.get("licenseTotal") and i.get("licenseUsed",0)/i["licenseTotal"]>=.9:
            out.append({"id":"lic_"+i["id"],"kind":"license","severity":"critical" if i["licenseUsed"]>=i["licenseTotal"] else "warn","message":f"{i['name']} seats {i['licenseUsed']}/{i['licenseTotal']}","itemId":i["id"]})
    rank={"critical":0,"warn":1,"info":2}
    return sorted(out,key=lambda x:rank[x["severity"]])

def adjust(iid, delta, note, move_type=None):
    for i in data()["items"]:
        if i["id"]==iid:
            i["qty"]=max(0,round(i["qty"]+delta,2))
            if i.get("channel") and i.get("storeQty") is not None:
                total=max(1,i.get("storeQty",0)+i.get("onlineQty",0)); share=i.get("storeQty",0)/total
                i["storeQty"]=round(i["qty"]*share); i["onlineQty"]=max(0,i["qty"]-i["storeQty"])
            break
    data()["moves"].insert(0,{"id":f"mv_{datetime.now().timestamp()}","itemId":iid,"qty":abs(delta),"type":move_type or ("in" if delta>=0 else "out"),"note":note,"at":datetime.now().isoformat(timespec="seconds")})
    save()

def reorder(iid):
    i=next(x for x in data()["items"] if x["id"]==iid); sup=next((s for s in data()["suppliers"] if s["id"]==i["supplierId"]),None)
    qty=max(i["reorderPoint"]*2-i["qty"],i["reorderPoint"])
    data()["orders"].insert(0,{"id":f"PO-{len(data()['orders'])+2001}","type":"purchase","status":"pending","partner":sup["name"] if sup else "Supplier","createdAt":datetime.now().isoformat(timespec="seconds"),"notes":"Generated from low-stock alert","lines":[{"itemId":iid,"qty":qty,"price":i["unitCost"]}]})
    save()

def nav_page():
    s=st.sidebar
    s.markdown("# 📦 IMAN IMS")
    s.caption(data()["settings"]["company"])
    page=s.radio("Navigation",["🏠 Dashboard","📦 Items","🛒 Orders","📥 Receive & Issue","🏢 Suppliers","📍 Locations","🚨 Alerts","📊 Reports","⚙️ Settings"],label_visibility="collapsed")
    s.divider()
    q=s.text_input("🔎 Global search",placeholder="Items, SKU, barcode...")
    if q: st.session_state.global_search=q
    s.caption(f"{len(alerts())} active alerts")
    return page

page=nav_page()

# -----------------------------------------------------------------------------
# DASHBOARD
# -----------------------------------------------------------------------------
if page=="🏠 Dashboard":
    st.title("📦 Inventory Management System")
    st.caption("Real-time inventory overview across retail, manufacturing, healthcare, food, warehouse and ITAM.")
    stt=stats(); c1,c2,c3,c4=st.columns(4)
    c1.metric("Total items",f"{stt['units']:,}"); c2.metric("Low stock",stt["low"]); c3.metric("Orders today",stt["orders_today"]); c4.metric("Total value",money(stt["value"]))
    st.divider()
    q=st.session_state.get("global_search","").strip().lower()
    if q:
        hits=[i for i in data()["items"] if q in i["name"].lower() or q in i["sku"].lower() or q in i["barcode"]]
        st.subheader(f"Search results · {len(hits)}")
        st.dataframe([{ "Item":i["name"],"SKU":i["sku"],"Stock":i["qty"],"Industry":INDUSTRIES[i["industry"]][0]} for i in hits],use_container_width=True,hide_index=True)
    a,b,c=st.columns(3)
    for col,(key,title) in zip((a,b,c),list(INDUSTRIES.items())[:3]):
        subset=[i for i in data()["items"] if i["industry"]==key]
        col.subheader(f"{title[1]} {title[0]}"); col.metric("SKUs",len(subset)); col.write(f"{sum(i['qty'] for i in subset):,} units · {sum(i['qty']<=i['reorderPoint'] for i in subset)} low")
    a,b,c=st.columns(3)
    for col,(key,title) in zip((a,b,c),list(INDUSTRIES.items())[3:]):
        subset=[i for i in data()["items"] if i["industry"]==key]
        col.subheader(f"{title[1]} {title[0]}"); col.metric("SKUs",len(subset)); col.write(f"{sum(i['qty'] for i in subset):,} units · {sum(i['qty']<=i['reorderPoint'] for i in subset)} low")
    st.subheader("🚨 Priority alerts")
    for a in alerts()[:6]:
        (st.error if a["severity"]=="critical" else st.warning)(a["message"])
    st.subheader("✨ Quick actions")
    q1,q2,q3,q4=st.columns(4)
    if q1.button("➕ Add item",use_container_width=True): st.session_state.quick="items"
    if q2.button("🛒 New order",use_container_width=True): st.session_state.quick="orders"
    if q3.button("📥 Receive stock",use_container_width=True): st.session_state.quick="stock"
    if q4.button("📊 View reports",use_container_width=True): st.session_state.quick="reports"

# -----------------------------------------------------------------------------
# ITEMS
# -----------------------------------------------------------------------------
elif page=="📦 Items":
    st.title("📦 Items")
    f1,f2,f3=st.columns([2,1,1]); q=f1.text_input("Search","",placeholder="Name, SKU, barcode, category..."); industry=f2.selectbox("Industry",["All"]+[x[0] for x in INDUSTRIES.values()]); low=f3.checkbox("Low stock only")
    reverse={v[0]:k for k,v in INDUSTRIES.items()}; ind=reverse.get(industry)
    filtered=[i for i in data()["items"] if (not ind or i["industry"]==ind) and (not low or i["qty"]<=i["reorderPoint"]) and (not q or q.lower() in i["name"].lower() or q.lower() in i["sku"].lower() or q in i["barcode"] or q.lower() in i["category"].lower())]
    st.caption(f"{len(filtered)} items")
    rows=[]
    for i in filtered:
        loc=next((l for l in data()["locations"] if l["id"]==i["locationId"]),None)
        rows.append({"Item":i["name"],"SKU":i["sku"],"Industry":INDUSTRIES[i["industry"]][0],"On hand":i["qty"],"Reorder":i["reorderPoint"],"Location":loc["code"] if loc else "—","Value":round(i["qty"]*i["unitCost"],2),"Status":"LOW" if i["qty"]<=i["reorderPoint"] else "OK"})
    st.dataframe(rows,use_container_width=True,hide_index=True)
    st.divider(); st.subheader("Add / edit item")
    choices={f"{i['name']} · {i['sku']}":i["id"] for i in data()["items"]}; edit_label=st.selectbox("Existing item (or create new)",["➕ New item"]+list(choices))
    existing=next((i for i in data()["items"] if i["id"]==choices.get(edit_label)),None)
    with st.form("item_form"):
        a,b,c=st.columns(3)
        name=a.text_input("Name",existing["name"] if existing else ""); sku=b.text_input("SKU",existing["sku"] if existing else ""); category=c.text_input("Category",existing["category"] if existing else "General")
        a,b,c=st.columns(3); industry2=a.selectbox("Industry",list(INDUSTRIES),index=list(INDUSTRIES).index(existing["industry"]) if existing else 0); qty=b.number_input("Quantity",min_value=0.0,value=float(existing["qty"]) if existing else 0.0); reorder=c.number_input("Reorder point",min_value=0.0,value=float(existing["reorderPoint"]) if existing else float(data()["settings"]["defaultReorder"]))
        a,b,c=st.columns(3); cost=a.number_input("Unit cost",min_value=0.0,value=float(existing["unitCost"]) if existing else 0.0,step=.01); barcode=b.text_input("Barcode",existing["barcode"] if existing else ""); loc=c.selectbox("Location",[l["id"] for l in data()["locations"]],index=[l["id"] for l in data()["locations"]].index(existing["locationId"]) if existing else 0,format_func=lambda x: next(l["code"]+" — "+l["name"] for l in data()["locations"] if l["id"]==x))
        sup=st.selectbox("Supplier",[s["id"] for s in data()["suppliers"]],index=[s["id"] for s in data()["suppliers"]].index(existing["supplierId"]) if existing else 0,format_func=lambda x: next(s["name"] for s in data()["suppliers"] if s["id"]==x))
        expiry=st.text_input("Expiry (optional)",existing.get("expiry","") if existing else ""); critical=st.checkbox("Critical stock",existing.get("critical",False) if existing else False); perishable=st.checkbox("Perishable",existing.get("perishable",False) if existing else False)
        submitted=st.form_submit_button("Save item")
    if submitted:
        if not name or not sku: st.error("Name and SKU are required.")
        elif existing:
            existing.update(name=name,sku=sku,category=category,industry=industry2,qty=qty,reorderPoint=reorder,unitCost=cost,barcode=barcode,locationId=loc,supplierId=sup,expiry=expiry or None,critical=critical,perishable=perishable); save(); st.success("Item updated.")
        else:
            new=item(f"itm_{len(data()['items'])+1}",sku,name,industry2,category,qty,reorder,cost,loc,barcode or f"{datetime.now().timestamp():.0f}",sup,expiry=expiry or None,critical=critical,perishable=perishable); data()["items"].insert(0,new); save(); st.success("Item added.")

# -----------------------------------------------------------------------------
# ORDERS
# -----------------------------------------------------------------------------
elif page=="🛒 Orders":
    st.title("🛒 Orders")
    with st.expander("➕ New order",expanded=False):
        with st.form("order_form"):
            typ=st.selectbox("Type",["sales","purchase"]); partner=st.text_input("Customer / supplier"); channel=st.selectbox("Channel",["online","store","both"]); iid=st.selectbox("Item",[i["id"] for i in data()["items"]],format_func=lambda x:item_name(x)); qty=st.number_input("Quantity",1.0,100000.0,1.0); create=st.form_submit_button("Create order")
        if create:
            it=next(i for i in data()["items"] if i["id"]==iid)
            data()["orders"].insert(0,{"id":f"ORD-{len(data()['orders'])+1001}","type":typ,"status":"pending","partner":partner or "Walk-in","channel":channel if typ=="sales" else None,"createdAt":datetime.now().isoformat(timespec="seconds"),"notes":"","lines":[{"itemId":iid,"qty":qty,"price":it["unitCost"]*(2.2 if typ=="sales" else 1)}]}); save(); st.success("Order created.")
    for o in data()["orders"]:
        total=sum(l["qty"]*l["price"] for l in o["lines"])
        left,right=st.columns([4,1]); left.markdown(f"**{o['id']}** · `{o['type']}` · **{o['status']}**  \\n{o['partner']} · {o['createdAt'][:16]}")
        left.write(" · ".join(f"{item_name(l['itemId'])} × {l['qty']}" for l in o["lines"]))
        right.metric("Total",money(total))
        if o["status"] not in ("shipped","received","cancelled"):
            if o["type"]=="purchase":
                if right.button("Receive",key="recv"+o["id"]):
                    for l in o["lines"]: adjust(l["itemId"],l["qty"],"Purchase received","in")
                    o["status"]="received"; save(); st.rerun()
            else:
                nxt={"pending":"picking","picking":"packed","packed":"shipped"}.get(o["status"])
                if right.button(nxt.title() if nxt else "Advance",key="adv"+o["id"]):
                    o["status"]=nxt; save(); st.rerun()
        st.divider()

# -----------------------------------------------------------------------------
# STOCK
# -----------------------------------------------------------------------------
elif page=="📥 Receive & Issue":
    st.title("📥 Receive & Issue")
    a,b=st.columns(2)
    with a:
        st.subheader("Manual movement")
        mode=st.selectbox("Direction",["in","out"],format_func=lambda x:"Stock in (receive)" if x=="in" else "Stock out (issue)")
        iid=st.selectbox("Item",[i["id"] for i in data()["items"]],format_func=lambda x:f"{item_name(x)} ({next(i['qty'] for i in data()['items'] if i['id']==x):g} on hand)")
        qty=st.number_input("Quantity",1.0,100000.0,10.0)
        if st.button("Receive" if mode=="in" else "Issue",use_container_width=True): adjust(iid,qty if mode=="in" else -qty,"Stock receive" if mode=="in" else "Stock issue",mode); st.success("Stock updated."); st.rerun()
    with b:
        st.subheader("Barcode / SKU scan")
        code=st.text_input("Barcode / SKU",placeholder="890123400001 or RTL-TEE-01")
        scan_qty=st.number_input("Scan quantity",1.0,100000.0,1.0)
        if st.button("🔎 Scan and update",use_container_width=True):
            hit=next((i for i in data()["items"] if i["barcode"]==code or i["sku"].lower()==code.lower()),None)
            if hit: adjust(hit["id"],scan_qty if mode=="in" else -scan_qty,"Barcode scan",mode); st.success(f"{hit['name']} updated"); st.rerun()
            else: st.error("No item matches that barcode or SKU.")
    st.subheader("Recent movements")
    st.dataframe([{ "Type":m["type"],"Item":item_name(m["itemId"]),"Qty":m["qty"],"Note":m["note"],"At":m["at"]} for m in data()["moves"][:15]],use_container_width=True,hide_index=True)

# -----------------------------------------------------------------------------
# SUPPLIERS
# -----------------------------------------------------------------------------
elif page=="🏢 Suppliers":
    st.title("🏢 Suppliers")
    with st.expander("➕ Add supplier"):
        with st.form("sup_form"):
            n=st.text_input("Name"); cat=st.text_input("Category"); lead=st.number_input("Lead days",1,365,7); email=st.text_input("Email"); phone=st.text_input("Phone"); add=st.form_submit_button("Save supplier")
        if add and n:
            data()["suppliers"].insert(0,{"id":f"sup_{len(data()['suppliers'])+1}","name":n,"category":cat or "General","leadDays":lead,"email":email,"phone":phone}); save(); st.success("Supplier added.")
    for s in data()["suppliers"]:
        catalog=[i for i in data()["items"] if i["supplierId"]==s["id"]]; low=[i for i in catalog if i["qty"]<=i["reorderPoint"]]
        with st.container(border=True):
            x,y,z=st.columns([3,2,1]); x.subheader(s["name"]); x.write(f"{s['category']} · {s['email']} · {s['phone']}"); y.write(f"**{len(catalog)} SKUs** · {len(low)} below reorder · lead {s['leadDays']}d")
            if z.button("Draft restock PO",key="restock"+s["id"]):
                for i in low: reorder(i["id"])
                st.success("Purchase order drafted.")

# -----------------------------------------------------------------------------
# LOCATIONS
# -----------------------------------------------------------------------------
elif page=="📍 Locations":
    st.title("📍 Locations")
    with st.container(border=True):
        st.subheader("Transfer item")
        iid=st.selectbox("Item",[i["id"] for i in data()["items"]],format_func=item_name); target=st.selectbox("To bin",[l["id"] for l in data()["locations"]],format_func=lambda x:next(l["code"]+" — "+l["name"] for l in data()["locations"] if l["id"]==x))
        if st.button("Transfer"): 
            it=next(i for i in data()["items"] if i["id"]==iid); old=it["locationId"]; it["locationId"]=target; data()["moves"].insert(0,{"id":f"mv_{datetime.now().timestamp()}","itemId":iid,"qty":it["qty"],"type":"transfer","from":old,"to":target,"note":"Location transfer","at":datetime.now().isoformat(timespec="seconds")}); save(); st.success("Transferred."); st.rerun()
    cols=st.columns(3)
    for idx,l in enumerate(data()["locations"]):
        here=[i for i in data()["items"] if i["locationId"]==l["id"]]
        with cols[idx%3]:
            with st.container(border=True):
                st.subheader(f"{l['code']} · {l['type']}"); st.caption(f"{l['name']} · {l['warehouse']}"); st.metric("Units",f"{sum(i['qty'] for i in here):g}"); st.write(" · ".join(i["name"] for i in here[:4]) or "Empty")

# -----------------------------------------------------------------------------
# ALERTS
# -----------------------------------------------------------------------------
elif page=="🚨 Alerts":
    st.title("🚨 Alerts")
    al=alerts(); unread=[a for a in al if a["id"] not in data()["dismissed"]]; st.caption(f"{len(unread)} open · {len(al)} total")
    for a in al:
        dismissed=a["id"] in data()["dismissed"]
        with st.container(border=True):
            if a["severity"]=="critical": st.error(f"**{a['kind'].replace('_',' ')}** — {a['message']}")
            else: st.warning(f"**{a['kind'].replace('_',' ')}** — {a['message']}")
            c1,c2=st.columns(2)
            if a.get("itemId") and a["kind"] in ("low_stock","critical","perishable","expiry") and c1.button("Draft reorder",key="alre"+a["id"]): reorder(a["itemId"]); st.success("Purchase order drafted.")
            if not dismissed and c2.button("Dismiss",key="ald"+a["id"]): data()["dismissed"].add(a["id"]); save(); st.rerun()

# -----------------------------------------------------------------------------
# REPORTS
# -----------------------------------------------------------------------------
elif page=="📊 Reports":
    st.title("📊 Reports")
    stt=stats(); a,b,c,d=st.columns(4); a.metric("Inventory value",money(stt["value"])); b.metric("Units on hand",f"{stt['units']:,}"); c.metric("Low-stock SKUs",stt["low"]); d.metric("Open orders",stt["pending"])
    by=[]
    for k,(title,icon) in INDUSTRIES.items():
        its=[i for i in data()["items"] if i["industry"]==k]; by.append({"Industry":title,"Units":sum(0 if i["category"]=="License" else i["qty"] for i in its),"Value":sum((i.get("licenseTotal",0)*i["unitCost"] if i.get("licenseTotal") else i["qty"]*i["unitCost"]) for i in its),"Low":sum(i["qty"]<=i["reorderPoint"] for i in its)})
    st.subheader("Units by industry"); st.bar_chart({r["Industry"]:r["Units"] for r in by})
    st.subheader("Inventory value by industry"); st.bar_chart({r["Industry"]:r["Value"] for r in by})
    st.subheader("Industry report"); st.dataframe(by,use_container_width=True,hide_index=True)
    st.subheader("Low-stock products"); st.dataframe([{ "Item":i["name"],"SKU":i["sku"],"Stock":i["qty"],"Reorder":i["reorderPoint"],"Value":i["qty"]*i["unitCost"]} for i in data()["items"] if i["qty"]<=i["reorderPoint"]],use_container_width=True,hide_index=True)

# -----------------------------------------------------------------------------
# SETTINGS
# -----------------------------------------------------------------------------
elif page=="⚙️ Settings":
    st.title("⚙️ Settings")
    s=data()["settings"]
    with st.form("settings"):
        company=st.text_input("Company",s["company"]); currency=st.selectbox("Currency",["USD","EUR","GBP","PKR"],index=["USD","EUR","GBP","PKR"].index(s["currency"])); default=st.number_input("Default reorder point",0,100000,s["defaultReorder"]); expiry=st.number_input("Expiry warning (days)",0,3650,s["expiryWarnDays"]); auto=st.checkbox("Suggest purchase orders at reorder point",s["autoReorder"]); save_settings=st.form_submit_button("Save settings")
    if save_settings: s.update(company=company,currency=currency,defaultReorder=default,expiryWarnDays=expiry,autoReorder=auto); save(); st.success("Settings saved.")
    st.divider(); st.subheader("Demo data")
    if st.button("Reset demo data",type="secondary"):
        st.session_state.ims={"items":copy.deepcopy(SEED_ITEMS),"orders":copy.deepcopy(SEED_ORDERS),"moves":copy.deepcopy(SEED_MOVES),"suppliers":copy.deepcopy(SUPPLIERS),"locations":copy.deepcopy(LOCATIONS),"settings":copy.deepcopy(DEFAULT_SETTINGS),"dismissed":set()}; st.success("Demo data restored."); st.rerun()

st.sidebar.divider()
st.sidebar.caption("IMAN IMS · Streamlit Python edition")
st.sidebar.caption("Original React/Vite source remains preserved in the repository.")
