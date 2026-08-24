import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="IMAN IMS — Executive Overview", page_icon="📦", layout="wide")

# IMAN IMS 2026 executive dashboard — based on the supplied Synapse-style layout.
st.markdown("""
<style>
:root{--bg:#0B0D19;--panel:#131625;--card:#181C30;--border:#262B44;--text:#F4F7FB;--muted:#8D98AE;--cyan:#00D4FF;--violet:#7C5CFF;--pink:#FF4FD8;--teal:#26D9C2;--orange:#FF9F43;--green:#00E5A0;--red:#FF647C}
[data-testid="stAppViewContainer"]{background:var(--bg);color:var(--text)}
[data-testid="stHeader"]{background:rgba(11,13,25,.9)}
[data-testid="stSidebar"]{background:#090B14;border-right:1px solid var(--border)}
.block-container{max-width:1500px;padding-top:1.2rem}
h1,h2,h3,p,label{color:var(--text)!important}
.subtle{color:var(--muted)!important;font-size:.86rem}
.card{background:linear-gradient(145deg,#1A1E33,#16192A);border:1px solid var(--border);border-radius:14px;padding:17px;box-shadow:0 10px 28px rgba(0,0,0,.25);height:100%}
.kpi{position:relative;overflow:hidden;background:linear-gradient(145deg,#1B2037,#151829);border:1px solid var(--border);border-radius:14px;padding:16px 18px;height:120px}
.kpi:after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--cyan),var(--violet),var(--pink))}
.kpi:nth-child(2):after{background:linear-gradient(90deg,var(--violet),var(--pink))}
.kpi:nth-child(3):after{background:linear-gradient(90deg,var(--orange),#FF6B6B)}
.kpi:nth-child(4):after{background:linear-gradient(90deg,var(--green),var(--cyan))}
.klabel{font-size:.73rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted)}
.kvalue{font-size:1.65rem;font-weight:800;margin-top:7px;color:var(--text)}
.kdelta{font-size:.78rem;color:var(--green);margin-top:4px}
.activity{padding:9px 0;border-bottom:1px solid #252A40;font-size:.86rem}.activity:last-child{border:0}
.badge{float:right;background:#222843;border:1px solid #343B5C;color:#B9C3D8;border-radius:999px;padding:2px 8px;font-size:.72rem}
hr{border-color:var(--border)!important}
.stProgress>div>div>div>div{background:linear-gradient(90deg,var(--violet),var(--cyan),var(--green))}
</style>
""", unsafe_allow_html=True)

# Compact graphical IMS data
kpis = [
    ("Inventory Value", "PKR 8.42M", "+8.2% ↑"),
    ("Stock Units", "8,420", "+6.4% ↑"),
    ("Low Stock", "37", "5 critical"),
    ("Open Orders", "24", "3 pending"),
]

with st.sidebar:
    st.markdown("# 📦 IMAN IMS")
    st.caption("Inventory Management System · 2026")
    st.divider()
    st.radio("Navigate", ["Executive Overview", "Inventory", "Orders", "Stock Movements", "Suppliers", "Locations", "Reports"], label_visibility="collapsed")
    st.divider()
    st.caption("● System operational")

head_l, head_r = st.columns([4,2])
with head_l:
    st.title("Executive Inventory Overview")
    st.markdown('<div class="subtle">IMAN IMS · Executive snapshot of stock, movement and operational health</div>', unsafe_allow_html=True)
with head_r:
    st.text_input("Search", placeholder="🔍 Search SKU, product, supplier...", label_visibility="collapsed")

f1,f2,f3 = st.columns(3)
with f1: st.selectbox("Period", ["This Month", "This Quarter", "Last 6 Months"], label_visibility="collapsed")
with f2: st.selectbox("Location", ["All Locations", "Main DC", "Storefront", "Plant 1", "Clinic"], label_visibility="collapsed")
with f3: st.selectbox("Category", ["All Categories", "Apparel", "Electronics", "Food", "Healthcare", "Raw Materials"], label_visibility="collapsed")

cols=st.columns(4)
for c,(label,value,delta) in zip(cols,kpis):
    with c:
        st.markdown(f'<div class="kpi"><div class="klabel">{label}</div><div class="kvalue">{value}</div><div class="kdelta">{delta}</div></div>',unsafe_allow_html=True)

st.write("")

# Middle row: large line chart + donut + turnover
months=["Mar","Apr","May","Jun","Jul","Aug"]
df=pd.DataFrame({"Month":months,"Stock In":[920,1080,970,1240,1160,1380],"Stock Out":[610,740,680,810,790,860]})
fig=px.line(df,x="Month",y=["Stock In","Stock Out"],markers=True,title="Inventory Movement — Last 6 Months")
fig.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",margin=dict(l=8,r=8,t=50,b=8),legend_title_text="",hovermode="x unified")
fig.update_traces(selector=dict(name="Stock In"),line=dict(color="#00D4FF",width=3),marker=dict(color="#00D4FF"))
fig.update_traces(selector=dict(name="Stock Out"),line=dict(color="#FF4FD8",width=3),marker=dict(color="#FF4FD8"))

loc=pd.DataFrame({"Location":["Main DC","Storefront","Plant 1","Clinic","Other"],"Share":[34,28,21,10,7]})
donut=px.pie(loc,values="Share",names="Location",hole=.62,title="Stock Distribution")
donut.update_layout(plot_bgcolor="#181C30",paper_bgcolor="#181C30",font_color="#F4F7FB",margin=dict(l=5,r=5,t=50,b=5),legend_title_text="")
donut.update_traces(marker=dict(colors=["#00D4FF","#7C5CFF","#26D9C2","#FF4FD8","#FF9F43"],line=dict(color="#181C30",width=3)),textinfo="percent")

turn=pd.DataFrame({"Category":["Food","Electronics","Apparel","Furniture"],"Turnover":[6.1,5.2,4.8,3.9]})
bar=px.bar(turn,x="Category",y="Turnover",text_auto=True,title="Inventory Turnover Rate")
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

# Bottom row
b1,b2,b3=st.columns([1.5,1,1])
with b1:
    st.markdown('<div class="card"><h3>Recent Activities</h3>',unsafe_allow_html=True)
    for text,time,dot in [("Purchase Order #1023 received","3m ago","🔵"),("Stock transfer completed","18m ago","🟣"),("Purchase Order #1025 approved","1h ago","🟢"),("New inventory item added","2h ago","🟠"),("Stock adjustment completed","3h ago","🔵")]:
        st.markdown(f'<div class="activity">{dot} {text}<span class="badge">{time}</span></div>',unsafe_allow_html=True)
    st.markdown('</div>',unsafe_allow_html=True)
with b2:
    st.markdown('<div class="card"><h3>Inventory Health</h3><p class="subtle">Overall stock condition</p>',unsafe_allow_html=True)
    st.progress(.82)
    st.metric("Healthy Stock","82%", "+4.1%")
    st.caption("🟢 In Stock 82%  ·  🟠 Low 12%  ·  🔴 Critical 4%  ·  ⚫ Out 2%")
    st.markdown('</div>',unsafe_allow_html=True)
with b3:
    st.markdown('<div class="card"><h3>Pending Actions</h3>',unsafe_allow_html=True)
    for name,count in [("Purchase Orders",3),("Stock Adjustments",2),("Supplier Requests",1),("Invoices",2)]:
        st.markdown(f'<div class="activity">{name}<span class="badge">{count} pending</span></div>',unsafe_allow_html=True)
    st.markdown('</div>',unsafe_allow_html=True)

st.caption("IMAN IMS · Compact executive dashboard · Demo data is summarized for graphical presentation; detailed records remain in the full IMS modules.")
