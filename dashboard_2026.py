import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime

st.set_page_config(page_title="IMAN IMS — Executive Overview", page_icon="📦", layout="wide")

# -----------------------------------------------------------------------------
# IMAN IMS 2026 — compact executive dashboard
# Uses the same seed inventory/order concepts as the full Streamlit IMS.
# The full operational modules remain in app.py.
# -----------------------------------------------------------------------------

st.markdown("""
<style>
:root{--bg:#0B0D19;--panel:#131625;--card:#181C30;--border:#262B44;--text:#F4F7FB;--muted:#8D98AE;--cyan:#00D4FF;--violet:#7C5CFF;--pink:#FF4FD8;--teal:#26D9C2;--orange:#FF9F43;--green:#00E5A0;--red:#FF647C}
[data-testid="stAppViewContainer"]{background:var(--bg);color:var(--text)}
[data-testid="stHeader"]{background:rgba(11,13,25,.9)}
[data-testid="stSidebar"]{background:#090B14;border-right:1px solid var(--border)}
.block-container{max-width:1500px;padding-top:1.1rem}
h1,h2,h3,p,label{color:var(--text)!important}
.subtle{color:var(--muted)!important;font-size:.86rem}
.card{background:linear-gradient(145deg,#1A1E33,#16192A);border:1px solid var(--border);border-radius:14px;padding:14px;box-shadow:0 10px 28px rgba(0,0,0,.25);height:100%}
.kpi{position:relative;overflow:hidden;background:linear-gradient(145deg,#1B2037,#151829);border:1px solid var(--border);border-radius:14px;padding:15px 17px;height:116px}
.kpi:after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--cyan),var(--violet),var(--pink))}
.kpi:nth-child(2):after{background:linear-gradient(90deg,var(--violet),var(--pink))}
.kpi:nth-child(3):after{background:linear-gradient(90deg,var(--orange),#FF6B6B)}
.kpi:nth-child(4):after{background:linear-gradient(90deg,var(--green),var(--cyan))}
.klabel{font-size:.72rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted)}
.kvalue{font-size:1.55rem;font-weight:800;margin-top:6px;color:var(--text)}
.kdelta{font-size:.77rem;color:var(--green);margin-top:4px}
.activity{padding:8px 0;border-bottom:1px solid #252A40;font-size:.84rem}.activity:last-child{border:0}
.badge{float:right;background:#222843;border:1px solid #343B5C;color:#B9C3D8;border-radius:999px;padding:2px 8px;font-size:.7rem}
[data-testid="stMetricValue"]{color:var(--text)}
.stProgress>div>div>div>div{background:linear-gradient(90deg,var(--violet),var(--cyan),var(--green))}
</style>
""", unsafe_allow_html=True)

# Data mirrors the full IMS seed records in app.py, condensed for executive use.
ITEMS = [
    ("Classic Cotton Tee","RTL-TEE-01","retail","Apparel",120,40,8.50,"Storefront"),
    ("Canvas Tote","RTL-TOT-02","retail","Bags",64,18,11.00,"Storefront"),
    ("City Sneakers","RTL-SNK-03","retail","Footwear",36,16,32.00,"Storefront"),
    ("Crossbody Mini","RTL-BAG-04","retail","Bags",18,20,24.00,"Storefront"),
    ("Soft Brim Hat","RTL-HAT-05","retail","Apparel",54,15,9.00,"Storefront"),
    ("Steel Coil 2mm","MFG-STL-10","manufacturing","Raw",42,20,86.00,"Plant 1"),
    ("Aluminum Rod","MFG-ALU-11","manufacturing","Raw",80,30,14.00,"Plant 1"),
    ("Gear Blank","MFG-GER-12","manufacturing","Component",26,24,7.50,"Plant 1"),
    ("Motor Housing (WIP)","MFG-WIP-13","manufacturing","WIP",9,4,48.00,"Plant 1"),
    ("Finished Mini Motor","MFG-FIN-14","manufacturing","Finished",14,8,72.00,"Main DC"),
    ("Copper Wire Spool","MFG-CPR-15","manufacturing","Raw",11,12,19.00,"Plant 1"),
    ("Amoxicillin 500mg","HC-AMX-20","healthcare","Drug",240,80,.42,"Clinic"),
    ("Insulin Vial 10ml","HC-INS-21","healthcare","Drug",18,24,28.00,"Clinic"),
    ("Surgical Gloves (box)","HC-GLV-22","healthcare","Supply",96,40,6.20,"Clinic"),
    ("Defibrillator Pack","HC-DEF-23","healthcare","Asset",4,2,890.00,"Clinic"),
    ("Ibuprofen 200mg","HC-IBU-24","healthcare","Drug",400,100,.12,"Clinic"),
    ("Roma Tomatoes (kg)","FD-TOM-30","food","Produce",18,8,2.40,"Kitchen"),
    ("Cheddar Slices","FD-CHS-31","food","Dairy",40,16,3.10,"Kitchen"),
    ("Brioche Buns","FD-BUN-32","food","Bakery",48,20,.55,"Kitchen"),
    ("Crisp Lettuce","FD-LET-33","food","Produce",9,10,1.80,"Kitchen"),
    ("Beef Patties","FD-PAT-34","food","Protein",32,16,1.90,"Kitchen"),
    ("Whole Milk (L)","FD-MLK-35","food","Dairy",14,12,1.20,"Kitchen"),
    ("Pallet Wrap","WH-WRP-40","warehouse","Packing",70,20,4.40,"Main DC"),
    ("Shipping Labels","WH-LBL-41","warehouse","Packing",500,120,.04,"Main DC"),
    ("Wood Pallets","WH-PLT-42","warehouse","Equipment",28,12,9.00,"Main DC"),
    ("MacBook Pro 14","IT-LPT-50","itam","Hardware",12,3,1899.00,"HQ"),
    ("Work Phone","IT-PHN-51","itam","Hardware",22,6,799.00,"HQ"),
    ("Creative Cloud Seats","IT-LIC-52","itam","License",1,1,55.00,"HQ"),
    ("Team Chat Seats","IT-LIC-53","itam","License",1,1,8.00,"HQ"),
    ("Core Switch","IT-NET-54","itam","Hardware",2,1,2400.00,"HQ"),
]

ORDERS = [
    ("ord_1001","Sales","Picking","Maya Chen","online"),
    ("ord_1002","Sales","Pending","Walk-in #441","store"),
    ("ord_1003","Sales","Packed","River Outfitters","online"),
    ("ord_2001","Purchase","Pending","MediLot Pharma",""),
    ("ord_2002","Purchase","Received","Freshfield Produce",""),
    ("ord_1004","Sales","Shipped","Luis Ortega","online"),
]

cols=["Item","SKU","Industry","Category","Qty","Reorder","Unit Cost","Location"]
df=pd.DataFrame(ITEMS,columns=cols)

with st.sidebar:
    st.markdown("# 📦 IMAN IMS")
    st.caption("Inventory Management System · 2026")
    st.divider()
    view=st.radio("View",["Executive Overview","Inventory Snapshot","Orders Snapshot"],label_visibility="collapsed")
    st.divider()
    st.caption("● System operational")
    st.caption(f"{len(df):,} tracked SKUs · {len(ORDERS)} seed orders")

# Filters affect the graphical dashboard.
f1,f2,f3,f4=st.columns([1.2,1.2,1.2,2])
with f1: period=st.selectbox("Period",["This Quarter","This Month","Last 6 Months"],label_visibility="collapsed")
with f2: location=st.selectbox("Location",["All Locations"]+sorted(df.Location.unique()),label_visibility="collapsed")
with f3: industry=st.selectbox("Industry",["All Industries","Retail & E-commerce","Manufacturing","Healthcare","Food & Hospitality","Warehousing","IT Asset Management"],label_visibility="collapsed")
with f4: search=st.text_input("Search",placeholder="🔍 Search SKU, product or category...",label_visibility="collapsed")

industry_map={
    "Retail & E-commerce":"retail","Manufacturing":"manufacturing","Healthcare":"healthcare",
    "Food & Hospitality":"food","Warehousing":"warehouse","IT Asset Management":"itam"
}
filtered=df.copy()
if location!="All Locations": filtered=filtered[filtered.Location==location]
if industry!="All Industries": filtered=filtered[filtered.Industry==industry_map[industry]]
if search:
    q=search.lower()
    filtered=filtered[filtered.apply(lambda r:q in str(r.Item).lower() or q in str(r.SKU).lower() or q in str(r.Category).lower(),axis=1)]

# Executive KPIs
units=int(filtered.Qty.sum())
value=float((filtered.Qty*filtered["Unit Cost"]).sum())
low=int((filtered.Qty<=filtered.Reorder).sum())
open_orders=sum(o[2] in ("Pending","Picking") for o in ORDERS)

st.title("Executive Inventory Overview")
st.markdown(f'<div class="subtle">IMAN IMS · {period} · compact operational snapshot · {len(filtered)} SKUs in current filter</div>',unsafe_allow_html=True)
st.write("")

kpi_values=[
    ("Inventory Value",f"PKR {value/1_000_000:.2f}M","+8.2% ↑"),
    ("Stock Units",f"{units:,}","+6.4% ↑"),
    ("Low Stock",str(low),f"{sum((filtered.Qty<=filtered.Reorder)&(filtered.Qty<=filtered.Reorder*.5))} critical"),
    ("Open Orders",str(open_orders),"3 pending"),
]
kcols=st.columns(4)
for c,(label,val,delta) in zip(kcols,kpi_values):
    with c: st.markdown(f'<div class="kpi"><div class="klabel">{label}</div><div class="kvalue">{val}</div><div class="kdelta">{delta}</div></div>',unsafe_allow_html=True)

if view=="Executive Overview":
    # Six-point graphical movement series, kept compact like the reference design.
    months=["Mar","Apr","May","Jun","Jul","Aug"]
    stock_in=[920,1080,970,1240,1160,1380]
    stock_out=[610,740,680,810,790,860]
    movement=pd.DataFrame({"Month":months,"Stock In":stock_in,"Stock Out":stock_out})
    fig=px.line(movement,x="Month",y=["Stock In","Stock Out"],markers=True,title="Inventory Movement — Last 6 Months")
    fig.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",margin=dict(l=8,r=8,t=50,b=8),legend_title_text="",hovermode="x unified")
    fig.update_traces(selector=dict(name="Stock In"),line=dict(color="#00D4FF",width=3),marker=dict(color="#00D4FF"))
    fig.update_traces(selector=dict(name="Stock Out"),line=dict(color="#FF4FD8",width=3),marker=dict(color="#FF4FD8"))

    loc=filtered.groupby("Location",as_index=False)["Qty"].sum()
    if loc.empty: loc=pd.DataFrame({"Location":["No data"],"Qty":[1]})
    donut=px.pie(loc,values="Qty",names="Location",hole=.62,title="Stock Distribution")
    donut.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",margin=dict(l=5,r=5,t=50,b=5),legend_title_text="")
    donut.update_traces(marker=dict(colors=["#00D4FF","#7C5CFF","#26D9C2","#FF4FD8","#FF9F43"],line=dict(color="#181C30",width=3)),textinfo="percent")

    turnover=pd.DataFrame({"Category":["Food","Electronics","Apparel","Furniture"],"Turnover":[6.1,5.2,4.8,3.9]})
    bar=px.bar(turnover,x="Category",y="Turnover",text_auto=True,title="Inventory Turnover Rate")
    bar.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",margin=dict(l=8,r=8,t=50,b=8),showlegend=False)
    bar.update_traces(marker_color=["#00D4FF","#7C5CFF","#FF9F43","#FF647C"],marker_line_color="#262B44",marker_line_width=1)

    c1,c2,c3=st.columns([1.7,1,1])
    with c1:
        st.markdown('<div class="card">',unsafe_allow_html=True); st.plotly_chart(fig,use_container_width=True); st.markdown('</div>',unsafe_allow_html=True)
    with c2:
        st.markdown('<div class="card">',unsafe_allow_html=True); st.plotly_chart(donut,use_container_width=True); st.markdown('</div>',unsafe_allow_html=True)
    with c3:
        st.markdown('<div class="card">',unsafe_allow_html=True); st.plotly_chart(bar,use_container_width=True); st.markdown('</div>',unsafe_allow_html=True)

    st.write("")
    b1,b2,b3=st.columns([1.5,1,1])
    with b1:
        st.markdown('<div class="card"><h3>Recent Activities</h3>',unsafe_allow_html=True)
        activities=[("🔵","Purchase Order #1023 received","3m ago"),("🟣","Stock transfer completed","18m ago"),("🟢","Purchase Order #1025 approved","1h ago"),("🟠","New inventory item added","2h ago"),("🔵","Stock adjustment completed","3h ago")]
        for dot,text,t in activities: st.markdown(f'<div class="activity">{dot} {text}<span class="badge">{t}</span></div>',unsafe_allow_html=True)
        st.markdown('</div>',unsafe_allow_html=True)
    with b2:
        st.markdown('<div class="card"><h3>Inventory Health</h3><p class="subtle">Current stock condition</p>',unsafe_allow_html=True)
        healthy=max(0,min(1,1-(low/max(1,len(filtered)))))
        st.progress(healthy)
        st.metric("Healthy Stock",f"{healthy:.0%}","+4.1%")
        st.caption("🟢 In Stock · 🟠 Low · 🔴 Critical")
        st.markdown('</div>',unsafe_allow_html=True)
    with b3:
        st.markdown('<div class="card"><h3>Pending Actions</h3>',unsafe_allow_html=True)
        for name,count in [("Purchase Orders",3),("Stock Adjustments",2),("Supplier Requests",1),("Invoices",2)]: st.markdown(f'<div class="activity">{name}<span class="badge">{count} pending</span></div>',unsafe_allow_html=True)
        st.markdown('</div>',unsafe_allow_html=True)

elif view=="Inventory Snapshot":
    st.subheader("📦 Inventory Snapshot")
    st.caption("Compact view of the same seed inventory used by the full IMS.")
    show=filtered.copy(); show["Stock Value"]=show.Qty*show["Unit Cost"]; show["Status"]=show.apply(lambda r:"🔴 Critical" if r.Qty<=r.Reorder*.5 else ("🟠 Low" if r.Qty<=r.Reorder else "🟢 Healthy"),axis=1)
    st.dataframe(show[["Item","SKU","Category","Qty","Reorder","Stock Value","Location","Status"]],use_container_width=True,hide_index=True)

    low_items=show[show.Qty<=show.Reorder]
    if not low_items.empty:
        st.subheader("Low-stock action queue")
        selected=st.selectbox("Select item",low_items.Item.tolist())
        row=low_items[low_items.Item==selected].iloc[0]
        if st.button("Generate reorder suggestion",use_container_width=True):
            suggested=max(int(row.Reorder*2-row.Qty),int(row.Reorder))
            st.success(f"Suggested reorder: {suggested} units of {row.Item} from its assigned supplier.")

elif view=="Orders Snapshot":
    st.subheader("🛒 Orders Snapshot")
    odf=pd.DataFrame(ORDERS,columns=["ID","Type","Status","Partner","Channel"])
    a,b,c=st.columns(3)
    a.metric("Total orders",len(odf)); b.metric("Pending / Picking",int(odf.Status.isin(["Pending","Picking"]).sum())); c.metric("Purchase orders",int((odf.Type=="Purchase").sum()))
    st.dataframe(odf,use_container_width=True,hide_index=True)

st.caption(f"IMAN IMS · 2026 executive layer · refreshed {datetime.now().strftime('%d %b %Y, %H:%M')} · Detailed operational modules remain in app.py.")
