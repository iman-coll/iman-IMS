import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime, date

st.set_page_config(page_title="IMAN IMS — 2026", page_icon="📦", layout="wide", initial_sidebar_state="expanded")

# ============================================================
# IMAN IMS 2026 — Executive + Operational UI
# Compact Synapse-style visual dashboard using the same IMS
# inventory concepts/data as app.py.
# ============================================================

st.markdown("""
<style>
:root{--bg:#0B0D19;--panel:#131625;--card:#181C30;--border:#262B44;--text:#F4F7FB;--muted:#8D98AE;--cyan:#00D4FF;--violet:#7C5CFF;--pink:#FF4FD8;--teal:#26D9C2;--orange:#FF9F43;--green:#00E5A0;--red:#FF647C}
[data-testid="stAppViewContainer"]{background:var(--bg);color:var(--text)}
[data-testid="stHeader"]{background:rgba(11,13,25,.92)}
[data-testid="stSidebar"]{background:#090B14;border-right:1px solid var(--border)}
.block-container{max-width:1550px;padding-top:1rem}
h1,h2,h3,h4,p,label{color:var(--text)!important}
.subtle,.stCaption{color:var(--muted)!important}
.card{background:linear-gradient(145deg,#1A1E33,#16192A);border:1px solid var(--border);border-radius:14px;padding:16px;box-shadow:0 10px 28px rgba(0,0,0,.24);height:100%}
.kpi{position:relative;overflow:hidden;background:linear-gradient(145deg,#1B2037,#151829);border:1px solid var(--border);border-radius:14px;padding:15px 17px;height:116px}
.kpi:after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--cyan),var(--violet),var(--pink))}
.klabel{font-size:.72rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted)}
.kvalue{font-size:1.55rem;font-weight:800;margin-top:6px;color:var(--text)}
.kdelta{font-size:.77rem;color:var(--green);margin-top:4px}
.activity{padding:9px 0;border-bottom:1px solid #252A40;font-size:.84rem}.activity:last-child{border:0}
.badge{float:right;background:#222843;border:1px solid #343B5C;color:#B9C3D8;border-radius:999px;padding:2px 8px;font-size:.7rem}
.navhint{font-size:.72rem;color:#8D98AE;margin-top:-8px;margin-bottom:8px}
[data-testid="stMetricValue"]{color:var(--text)}
.stProgress>div>div>div>div{background:linear-gradient(90deg,var(--violet),var(--cyan),var(--green))}
[data-testid="stDataFrame"]{border:1px solid var(--border);border-radius:12px;overflow:hidden}
button[kind="secondary"]{border-color:#303653}
</style>
""", unsafe_allow_html=True)

# ---------------------------- DATA ----------------------------
ITEMS = [
("Classic Cotton Tee","RTL-TEE-01","retail","Apparel",120,40,8.50,"Storefront","sup_1"),
("Canvas Tote","RTL-TOT-02","retail","Bags",64,18,11.00,"Storefront","sup_1"),
("City Sneakers","RTL-SNK-03","retail","Footwear",36,16,32.00,"Storefront","sup_1"),
("Crossbody Mini","RTL-BAG-04","retail","Bags",18,20,24.00,"Storefront","sup_1"),
("Soft Brim Hat","RTL-HAT-05","retail","Apparel",54,15,9.00,"Storefront","sup_1"),
("Steel Coil 2mm","MFG-STL-10","manufacturing","Raw",42,20,86.00,"Plant 1","sup_2"),
("Aluminum Rod","MFG-ALU-11","manufacturing","Raw",80,30,14.00,"Plant 1","sup_2"),
("Gear Blank","MFG-GER-12","manufacturing","Component",26,24,7.50,"Plant 1","sup_2"),
("Motor Housing (WIP)","MFG-WIP-13","manufacturing","WIP",9,4,48.00,"Plant 1","sup_2"),
("Finished Mini Motor","MFG-FIN-14","manufacturing","Finished",14,8,72.00,"Main DC","sup_2"),
("Copper Wire Spool","MFG-CPR-15","manufacturing","Raw",11,12,19.00,"Plant 1","sup_2"),
("Amoxicillin 500mg","HC-AMX-20","healthcare","Drug",240,80,.42,"Clinic","sup_3"),
("Insulin Vial 10ml","HC-INS-21","healthcare","Drug",18,24,28.00,"Clinic","sup_3"),
("Surgical Gloves (box)","HC-GLV-22","healthcare","Supply",96,40,6.20,"Clinic","sup_3"),
("Defibrillator Pack","HC-DEF-23","healthcare","Asset",4,2,890.00,"Clinic","sup_3"),
("Ibuprofen 200mg","HC-IBU-24","healthcare","Drug",400,100,.12,"Clinic","sup_3"),
("Roma Tomatoes (kg)","FD-TOM-30","food","Produce",18,8,2.40,"Kitchen","sup_4"),
("Cheddar Slices","FD-CHS-31","food","Dairy",40,16,3.10,"Kitchen","sup_4"),
("Brioche Buns","FD-BUN-32","food","Bakery",48,20,.55,"Kitchen","sup_4"),
("Crisp Lettuce","FD-LET-33","food","Produce",9,10,1.80,"Kitchen","sup_4"),
("Beef Patties","FD-PAT-34","food","Protein",32,16,1.90,"Kitchen","sup_4"),
("Whole Milk (L)","FD-MLK-35","food","Dairy",14,12,1.20,"Kitchen","sup_4"),
("Pallet Wrap","WH-WRP-40","warehouse","Packing",70,20,4.40,"Main DC","sup_5"),
("Shipping Labels","WH-LBL-41","warehouse","Packing",500,120,.04,"Main DC","sup_5"),
("Wood Pallets","WH-PLT-42","warehouse","Equipment",28,12,9.00,"Main DC","sup_5"),
("MacBook Pro 14","IT-LPT-50","itam","Hardware",12,3,1899.00,"HQ","sup_6"),
("Work Phone","IT-PHN-51","itam","Hardware",22,6,799.00,"HQ","sup_6"),
("Creative Cloud Seats","IT-LIC-52","itam","License",1,1,55.00,"HQ","sup_6"),
("Team Chat Seats","IT-LIC-53","itam","License",1,1,8.00,"HQ","sup_6"),
("Core Switch","IT-NET-54","itam","Hardware",2,1,2400.00,"HQ","sup_6"),
]

ORDERS = [
("ORD-1001","Sales","Picking","Maya Chen","Online","2026-08-24 09:12"),
("ORD-1002","Sales","Pending","Walk-in #441","Store","2026-08-24 11:40"),
("ORD-1003","Sales","Packed","River Outfitters","Online","2026-08-24 08:05"),
("PO-2001","Purchase","Pending","MediLot Pharma","Supplier","2026-08-24 07:30"),
("PO-2002","Purchase","Received","Freshfield Produce","Supplier","2026-08-22 16:10"),
("ORD-1004","Sales","Shipped","Luis Ortega","Online","2026-08-22 14:22"),
]

SUPPLIERS=[
("sup_1","Northwind Apparel","Retail","7 days","orders@northwind.example"),
("sup_2","Alloy & Gear Co.","Manufacturing","12 days","sales@alloygear.example"),
("sup_3","MediLot Pharma","Healthcare","4 days","supply@medilot.example"),
("sup_4","Freshfield Produce","Food","1 day","hello@freshfield.example"),
("sup_5","Harbor Freight Logistics","Warehouse","3 days","dock@harbor.example"),
("sup_6","Cloudstack Licensing","ITAM","2 days","seats@cloudstack.example"),
]

LOCATIONS=[
("A-01","Retail floor — apparel","Storefront","Aisle"),("A-02","Retail floor — accessories","Storefront","Shelf"),
("B-01","Pick face — fast movers","Main DC","Bin"),("B-02","Reserve rack","Main DC","Shelf"),
("C-01","Inbound dock","Main DC","Dock"),("C-02","Outbound dock","Main DC","Dock"),
("M-01","Raw materials cage","Plant 1","Bin"),("M-02","Assembly line","Plant 1","Aisle"),
("H-01","Pharmacy fridge","Clinic","Cold"),("H-02","Secure cabinet","Clinic","Secure"),
("K-01","Walk-in cooler","Kitchen","Cold"),("K-02","Dry store","Kitchen","Shelf"),
("IT-01","IT cage","HQ","Secure")]

MOVES=[
("MV-001","Classic Cotton Tee",24,"IN","A-01","PO receive","2026-08-20 10:00"),
("MV-002","Insulin Vial 10ml",6,"OUT","H-01","Clinic dispense","2026-08-22 15:12"),
("MV-003","Roma Tomatoes (kg)",12,"IN","K-01","Produce delivery","2026-08-22 16:10"),
("MV-004","City Sneakers",4,"OUT","A-01","Sales order","2026-08-24 10:30"),
]

df=pd.DataFrame(ITEMS,columns=["Item","SKU","Industry","Category","Qty","Reorder","Unit Cost","Location","Supplier ID"])
odf=pd.DataFrame(ORDERS,columns=["ID","Type","Status","Partner","Channel","Created"])
sdf=pd.DataFrame(SUPPLIERS,columns=["ID","Supplier","Category","Lead Time","Email"])
ldf=pd.DataFrame(LOCATIONS,columns=["Code","Location","Warehouse","Type"])
mdf=pd.DataFrame(MOVES,columns=["ID","Item","Qty","Type","Location","Reason","Time"])

# ---------------------------- HELPERS ----------------------------
INDUSTRY_LABEL={"retail":"Retail & E-commerce","manufacturing":"Manufacturing","healthcare":"Healthcare","food":"Food & Hospitality","warehouse":"Warehousing","itam":"IT Asset Management"}

def money(v): return f"PKR {v:,.0f}"
def filtered_data():
    x=df.copy()
    if st.session_state.location!="All Locations": x=x[x.Location==st.session_state.location]
    if st.session_state.industry!="All Industries": x=x[x.Industry==st.session_state.industry]
    q=st.session_state.search.strip().lower()
    if q: x=x[x.apply(lambda r:q in str(r.Item).lower() or q in str(r.SKU).lower() or q in str(r.Category).lower(),axis=1)]
    return x

def kpi(label,value,delta,cls=""):
    return f'<div class="kpi {cls}"><div class="klabel">{label}</div><div class="kvalue">{value}</div><div class="kdelta">{delta}</div></div>'

# ---------------------------- NAVIGATION ----------------------------
NAV=[
("🏠","Executive Overview"),("📦","Items"),("🛒","Orders"),("📥","Receive & Issue"),
("🏢","Suppliers"),("📍","Locations"),("🚨","Alerts"),("📊","Reports"),("⚙️","Settings")]

if "page" not in st.session_state: st.session_state.page="Executive Overview"
if "location" not in st.session_state: st.session_state.location="All Locations"
if "industry" not in st.session_state: st.session_state.industry="All Industries"
if "search" not in st.session_state: st.session_state.search=""

with st.sidebar:
    st.markdown("# 📦 IMAN IMS")
    st.caption("Inventory Management System · 2026")
    st.divider()
    for icon,name in NAV:
        if st.button(f"{icon}  {name}",key="nav_"+name,use_container_width=True,type="primary" if st.session_state.page==name else "secondary"):
            st.session_state.page=name
            st.rerun()
    st.divider()
    st.caption("● System operational")
    st.caption(f"{len(df):,} tracked SKUs · {len(odf)} orders")

# Header filters shown on dashboard/operational pages
f1,f2,f3,f4=st.columns([1.15,1.2,1.2,2])
with f1: period=st.selectbox("Period",["This Quarter","This Month","Last 6 Months"],key="period",label_visibility="collapsed")
with f2: st.session_state.location=st.selectbox("Location",["All Locations"]+sorted(df.Location.unique()),index=(["All Locations"]+sorted(df.Location.unique())).index(st.session_state.location),label_visibility="collapsed")
with f3: st.session_state.industry=st.selectbox("Industry",["All Industries"]+list(INDUSTRY_LABEL.values()),index=(["All Industries"]+list(INDUSTRY_LABEL.values())).index(st.session_state.industry),label_visibility="collapsed")
with f4: st.session_state.search=st.text_input("Search",value=st.session_state.search,placeholder="🔍 Search SKU, product or category...",label_visibility="collapsed")

current=filtered_data()
units=int(current.Qty.sum())
value=float((current.Qty*current["Unit Cost"]).sum())
low=int((current.Qty<=current.Reorder).sum())
critical=int((current.Qty<=current.Reorder*.5).sum())
open_orders=int(odf.Status.isin(["Pending","Picking"]).sum())

# ============================================================
# EXECUTIVE OVERVIEW
# ============================================================
if st.session_state.page=="Executive Overview":
    st.title("Executive Inventory Overview")
    st.markdown(f'<div class="subtle">IMAN IMS · {period} · {len(current)} SKUs in current filter</div>',unsafe_allow_html=True)
    st.write("")
    kcols=st.columns(4)
    vals=[("Inventory Value",f"PKR {value/1_000_000:.2f}M","+8.2% ↑"),("Stock Units",f"{units:,}","+6.4% ↑"),("Low Stock",str(low),f"{critical} critical"),("Open Orders",str(open_orders),"3 pending")]
    for c,v in zip(kcols,vals): c.markdown(kpi(*v),unsafe_allow_html=True)

    months=["Mar","Apr","May","Jun","Jul","Aug"]
    movement=pd.DataFrame({"Month":months,"Stock In":[920,1080,970,1240,1160,1380],"Stock Out":[610,740,680,810,790,860]})
    fig=px.line(movement,x="Month",y=["Stock In","Stock Out"],markers=True,title="Inventory Movement — Last 6 Months")
    fig.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",margin=dict(l=8,r=8,t=50,b=8),legend_title_text="",hovermode="x unified")
    fig.update_traces(selector=dict(name="Stock In"),line=dict(color="#00D4FF",width=3),marker=dict(color="#00D4FF"))
    fig.update_traces(selector=dict(name="Stock Out"),line=dict(color="#FF4FD8",width=3),marker=dict(color="#FF4FD8"))

    loc=current.groupby("Location",as_index=False)["Qty"].sum()
    donut=px.pie(loc,values="Qty",names="Location",hole=.62,title="Stock Distribution")
    donut.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",margin=dict(l=5,r=5,t=50,b=5),legend_title_text="")
    donut.update_traces(marker=dict(colors=["#00D4FF","#7C5CFF","#26D9C2","#FF4FD8","#FF9F43","#6C7895"],line=dict(color="#181C30",width=3)),textinfo="percent")

    turnover=pd.DataFrame({"Category":["Food","Electronics","Apparel","Furniture"],"Turnover":[6.1,5.2,4.8,3.9]})
    bar=px.bar(turnover,x="Category",y="Turnover",text_auto=True,title="Inventory Turnover Rate")
    bar.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",margin=dict(l=8,r=8,t=50,b=8),showlegend=False)
    bar.update_traces(marker_color=["#00D4FF","#7C5CFF","#FF9F43","#FF647C"],marker_line_color="#262B44",marker_line_width=1)

    c1,c2,c3=st.columns([1.7,1,1])
    with c1: st.markdown('<div class="card">',unsafe_allow_html=True); st.plotly_chart(fig,use_container_width=True); st.markdown('</div>',unsafe_allow_html=True)
    with c2: st.markdown('<div class="card">',unsafe_allow_html=True); st.plotly_chart(donut,use_container_width=True); st.markdown('</div>',unsafe_allow_html=True)
    with c3: st.markdown('<div class="card">',unsafe_allow_html=True); st.plotly_chart(bar,use_container_width=True); st.markdown('</div>',unsafe_allow_html=True)

    a,b,c=st.columns([1.5,1,1])
    with a:
        st.markdown('<div class="card"><h3>Recent Activities</h3>',unsafe_allow_html=True)
        for dot,text,t in [("🔵","Purchase Order #1023 received","3m ago"),("🟣","Stock transfer completed","18m ago"),("🟢","Purchase Order #1025 approved","1h ago"),("🟠","New inventory item added","2h ago"),("🔵","Stock adjustment completed","3h ago")]: st.markdown(f'<div class="activity">{dot} {text}<span class="badge">{t}</span></div>',unsafe_allow_html=True)
        st.markdown('</div>',unsafe_allow_html=True)
    with b:
        healthy=max(0,min(1,1-low/max(1,len(current))))
        st.markdown('<div class="card"><h3>Inventory Health</h3><p class="subtle">Current stock condition</p>',unsafe_allow_html=True); st.progress(healthy); st.metric("Healthy Stock",f"{healthy:.0%}","+4.1%"); st.caption("🟢 In Stock · 🟠 Low · 🔴 Critical"); st.markdown('</div>',unsafe_allow_html=True)
    with c:
        st.markdown('<div class="card"><h3>Pending Actions</h3>',unsafe_allow_html=True)
        for name,count in [("Purchase Orders",3),("Stock Adjustments",2),("Supplier Requests",1),("Invoices",2)]: st.markdown(f'<div class="activity">{name}<span class="badge">{count} pending</span></div>',unsafe_allow_html=True)
        st.markdown('</div>',unsafe_allow_html=True)

# ============================================================
# ITEMS
# ============================================================
elif st.session_state.page=="Items":
    st.title("📦 Items")
    st.markdown('<div class="subtle">Operational item master — search, filter, inspect stock and reorder status.</div>',unsafe_allow_html=True)
    a,b,c=st.columns([2,1,1])
    q=a.text_input("Item search",placeholder="Name, SKU, barcode, category...")
    low_only=c.checkbox("Low stock only")
    x=current.copy()
    if q:
        z=q.lower(); x=x[x.apply(lambda r:z in str(r.Item).lower() or z in str(r.SKU).lower() or z in str(r.Category).lower(),axis=1)]
    if low_only: x=x[x.Qty<=x.Reorder]
    x["Stock Value"]=x.Qty*x["Unit Cost"]
    x["Status"]=x.apply(lambda r:"🔴 Critical" if r.Qty<=r.Reorder*.5 else ("🟠 Low" if r.Qty<=r.Reorder else "🟢 Healthy"),axis=1)
    st.caption(f"{len(x)} items")
    st.dataframe(x[["Item","SKU","Category","Qty","Reorder","Stock Value","Location","Supplier ID","Status"]],use_container_width=True,hide_index=True)
    low=x[x.Qty<=x.Reorder]
    if not low.empty:
        st.subheader("Low-stock action queue")
        selected=st.selectbox("Select item",low.Item.tolist())
        r=low[low.Item==selected].iloc[0]
        suggested=max(int(r.Reorder*2-r.Qty),int(r.Reorder))
        if st.button("Generate reorder suggestion",use_container_width=True): st.success(f"Reorder {suggested} units of {r.Item}. Assigned supplier: {r['Supplier ID']}.")

# ============================================================
# ORDERS
# ============================================================
elif st.session_state.page=="Orders":
    st.title("🛒 Orders")
    st.markdown('<div class="subtle">Sales and purchase order control center.</div>',unsafe_allow_html=True)
    a,b,c,d=st.columns(4)
    a.metric("Total Orders",len(odf)); b.metric("Pending / Picking",int(odf.Status.isin(["Pending","Picking"]).sum())); c.metric("Purchase Orders",int((odf.Type=="Purchase").sum())); d.metric("Received",int((odf.Status=="Received").sum()))
    typ=st.selectbox("Type",["All","Sales","Purchase"])
    show=odf if typ=="All" else odf[odf.Type==typ]
    st.dataframe(show,use_container_width=True,hide_index=True)
    st.subheader("Order status distribution")
    chart=px.bar(odf.Status.value_counts().rename_axis("Status").reset_index(name="Orders"),x="Status",y="Orders",text_auto=True)
    chart.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",showlegend=False)
    chart.update_traces(marker_color="#7C5CFF")
    st.plotly_chart(chart,use_container_width=True)

# ============================================================
# RECEIVE & ISSUE
# ============================================================
elif st.session_state.page=="Receive & Issue":
    st.title("📥 Receive & Issue")
    st.markdown('<div class="subtle">Record inbound receipts, outbound issues and inventory adjustments.</div>',unsafe_allow_html=True)
    left,right=st.columns(2)
    with left:
        st.markdown('<div class="card"><h3>Receive Stock</h3>',unsafe_allow_html=True)
        item=st.selectbox("Item to receive",df.Item.tolist(),key="receive_item")
        qty=st.number_input("Quantity",min_value=1,value=10,step=1,key="receive_qty")
        ref=st.text_input("Reference / PO",placeholder="PO-2003",key="receive_ref")
        if st.button("Confirm Receipt",use_container_width=True): st.success(f"Received {qty} × {item}. Reference: {ref or 'Manual receipt'}")
        st.markdown('</div>',unsafe_allow_html=True)
    with right:
        st.markdown('<div class="card"><h3>Issue Stock</h3>',unsafe_allow_html=True)
        item2=st.selectbox("Item to issue",df.Item.tolist(),key="issue_item")
        qty2=st.number_input("Quantity to issue",min_value=1,value=1,step=1,key="issue_qty")
        reason=st.selectbox("Reason",["Sales order","Internal use","Clinic dispense","Production","Damaged","Adjustment"])
        if st.button("Confirm Issue",use_container_width=True): st.warning(f"Issued {qty2} × {item2}. Reason: {reason}")
        st.markdown('</div>',unsafe_allow_html=True)
    st.subheader("Recent movement history")
    st.dataframe(mdf,use_container_width=True,hide_index=True)

# ============================================================
# SUPPLIERS
# ============================================================
elif st.session_state.page=="Suppliers":
    st.title("🏢 Suppliers")
    st.markdown('<div class="subtle">Supplier directory, categories and replenishment lead times.</div>',unsafe_allow_html=True)
    a,b,c=st.columns(3); a.metric("Suppliers",len(sdf)); b.metric("Categories",sdf.Category.nunique()); c.metric("Fastest Lead",sdf["Lead Time"].iloc[3])
    st.dataframe(sdf,use_container_width=True,hide_index=True)
    chart=px.bar(sdf,x="Supplier",y=sdf["Lead Time"].str.extract(r"(\d+)")[0].astype(int),title="Supplier Lead Time (days)")
    chart.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",showlegend=False)
    chart.update_traces(marker_color="#00D4FF")
    st.plotly_chart(chart,use_container_width=True)

# ============================================================
# LOCATIONS
# ============================================================
elif st.session_state.page=="Locations":
    st.title("📍 Locations")
    st.markdown('<div class="subtle">Warehouse, plant, clinic, kitchen and IT storage locations.</div>',unsafe_allow_html=True)
    st.dataframe(ldf,use_container_width=True,hide_index=True)
    stock_by=current.groupby("Location",as_index=False).Qty.sum().sort_values("Qty",ascending=False)
    chart=px.bar(stock_by,x="Location",y="Qty",text_auto=True,title="Units by Location")
    chart.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",showlegend=False)
    chart.update_traces(marker_color="#26D9C2")
    st.plotly_chart(chart,use_container_width=True)

# ============================================================
# ALERTS
# ============================================================
elif st.session_state.page=="Alerts":
    st.title("🚨 Alerts")
    low_df=current[current.Qty<=current.Reorder]
    critical_df=current[current.Qty<=current.Reorder*.5]
    expiring=["Insulin Vial 10ml","Crisp Lettuce","Whole Milk (L)"]
    a,b,c=st.columns(3); a.metric("Low Stock",len(low_df)); b.metric("Critical",len(critical_df)); c.metric("Expiry Watch",len(expiring))
    if not critical_df.empty:
        st.subheader("🔴 Critical stock")
        st.dataframe(critical_df[["Item","SKU","Qty","Reorder","Location"]],use_container_width=True,hide_index=True)
    st.subheader("🟠 Low stock")
    st.dataframe(low_df[["Item","SKU","Qty","Reorder","Location"]],use_container_width=True,hide_index=True)
    st.subheader("⏳ Expiry watch")
    st.info("Insulin Vial 10ml · expires 28 Aug 2026")
    st.warning("Crisp Lettuce · expires 25 Aug 2026")
    st.warning("Whole Milk (L) · expires 26 Aug 2026")

# ============================================================
# REPORTS
# ============================================================
elif st.session_state.page=="Reports":
    st.title("📊 Reports")
    st.markdown('<div class="subtle">Compact management reporting derived from the same inventory dataset.</div>',unsafe_allow_html=True)
    r1,r2,r3,r4=st.columns(4); r1.metric("Inventory Value",money(value)); r2.metric("Units",f"{units:,}"); r3.metric("Low Stock",low); r4.metric("SKUs",len(current))
    category=current.groupby("Category",as_index=False).agg(Units=("Qty","sum"),Value=("Unit Cost",lambda s:0))
    category["Value"]=current.groupby("Category").apply(lambda g:(g.Qty*g["Unit Cost"]).sum(),include_groups=False).values
    chart=px.bar(category,x="Category",y="Value",text_auto=True,title="Inventory Value by Category")
    chart.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",showlegend=False)
    chart.update_traces(marker_color="#7C5CFF")
    st.plotly_chart(chart,use_container_width=True)
    report=current.copy(); report["Stock Value"]=report.Qty*report["Unit Cost"]
    st.dataframe(report[["Item","SKU","Industry","Category","Qty","Reorder","Stock Value","Location"]],use_container_width=True,hide_index=True)
    st.download_button("⬇️ Export current report CSV",report.to_csv(index=False),file_name="iman_ims_inventory_report.csv",mime="text/csv",use_container_width=True)

# ============================================================
# SETTINGS
# ============================================================
elif st.session_state.page=="Settings":
    st.title("⚙️ Settings")
    st.markdown('<div class="subtle">Business configuration for the executive IMS layer.</div>',unsafe_allow_html=True)
    a,b=st.columns(2)
    with a:
        st.markdown('<div class="card"><h3>Company</h3>',unsafe_allow_html=True)
        st.text_input("Company name",value="IMAN IMS")
        st.selectbox("Currency",["PKR","USD","EUR","GBP"],index=0)
        st.number_input("Default reorder point",min_value=1,value=20)
        st.number_input("Expiry warning days",min_value=1,value=30)
        st.checkbox("Automatic reorder suggestions",value=True)
        st.markdown('</div>',unsafe_allow_html=True)
    with b:
        st.markdown('<div class="card"><h3>System</h3>',unsafe_allow_html=True)
        st.success("● Dashboard operational")
        st.write("Data source: IMAN IMS seed inventory")
        st.write(f"Tracked SKUs: {len(df)}")
        st.write(f"Tracked orders: {len(odf)}")
        st.write(f"Locations: {len(ldf)}")
        st.write("UI: IMAN IMS 2026 Executive + Operational")
        st.markdown('</div>',unsafe_allow_html=True)

st.caption(f"IMAN IMS · 2026 · {st.session_state.page} · refreshed {datetime.now().strftime('%d %b %Y, %H:%M')}")
