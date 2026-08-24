import html
from typing import Any

import pandas as pd
import streamlit as st

RAINBOW = ["#00D4FF", "#7C5CFF", "#FF4FD8", "#FF9F43", "#00E5A0", "#26D9C2"]


def render_ims_table(data: Any, *args, **kwargs) -> None:
    """Render a Streamlit dataframe as a dark grey, white-text IMS table.

    The renderer intentionally avoids st.dataframe because its Glide-based
    canvas is not reliably themeable with page CSS. This gives the IMS tables
    deterministic grey cells, white text, and rainbow borders.
    """
    if isinstance(data, pd.DataFrame):
        df = data.copy()
    else:
        try:
            df = pd.DataFrame(data)
        except Exception:
            df = pd.DataFrame({"Value": [str(data)]})

    hide_index = kwargs.get("hide_index", True)
    if not hide_index:
        df = df.reset_index().rename(columns={"index": "Index"})

    def cell(value: Any) -> str:
        if pd.isna(value):
            value = ""
        return html.escape(str(value))

    headers = list(df.columns)
    head_html = "".join(
        f'<th style="--accent:{RAINBOW[i % len(RAINBOW)]}">{cell(col)}</th>'
        for i, col in enumerate(headers)
    )

    body_rows = []
    for row_idx, row in enumerate(df.itertuples(index=False, name=None)):
        cells = []
        for col_idx, value in enumerate(row):
            accent = RAINBOW[col_idx % len(RAINBOW)]
            cells.append(
                f'<td style="--accent:{accent}">{cell(value)}</td>'
            )
        body_rows.append(f'<tr>{"".join(cells)}</tr>')

    table = f"""
    <div class="ims-table-wrap">
      <div class="ims-table-scroll">
        <table class="ims-table">
          <thead><tr>{head_html}</tr></thead>
          <tbody>{''.join(body_rows)}</tbody>
        </table>
      </div>
    </div>
    """
    st.markdown(table, unsafe_allow_html=True)
