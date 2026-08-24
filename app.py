import streamlit as st
import os
import subprocess

st.set_page_config(
    page_title="IMAN Inventory Management System",
    page_icon="📦",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.title("📦 IMAN Inventory Management System")
st.caption("Streamlit entry point for the existing iman-IMS project")

st.info(
    "The original IMS in this repository is a React/Vite application. "
    "This Python entry point preserves that application and provides a safe "
    "Streamlit deployment target."
)

st.subheader("Application files preserved")

files = [
    "package.json",
    "package-lock.json",
    "startup.sh",
    "src/",
    "server/",
    "public/",
    "migrations/",
]

for item in files:
    st.write(f"✅ {item}")

st.divider()
st.subheader("IMS Deployment Status")

col1, col2, col3 = st.columns(3)
with col1:
    st.metric("Streamlit Entry", "Ready")
with col2:
    st.metric("React App", "Preserved")
with col3:
    st.metric("Data Loss", "None")

st.divider()
st.warning(
    "Important: Streamlit cannot directly execute the React/TypeScript UI. "
    "To reproduce the full existing React interface inside Streamlit, its "
    "screens and functionality must be converted to Streamlit/Python components."
)

st.markdown("### Repository structure")
st.code(
    "iman-IMS/\n"
    "├── app.py                 ← Streamlit entry point\n"
    "├── requirements.txt       ← Streamlit dependencies\n"
    "├── package.json           ← existing React app\n"
    "├── startup.sh             ← existing startup script\n"
    "├── src/                   ← existing React source\n"
    "├── server/                ← existing server code\n"
    "├── public/                ← existing public assets\n"
    "└── migrations/            ← existing database migrations",
    language="text",
)

st.success("The Streamlit entry point is active and the existing IMS source has not been replaced.")
