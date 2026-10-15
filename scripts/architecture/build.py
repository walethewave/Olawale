"""Build one Solution Architecture PDF per project.

Run from the repo root:
    uv run --with reportlab python scripts/architecture/build.py [slug ...]

Output: public/architecture/projects/<slug>/deck.pdf

Safety: a file is only overwritten if it carries this script's producer marker,
so a deck uploaded by hand is never replaced.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

sys.path.insert(0, str(Path(__file__).parent))
from content import CONTENT  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
MARKER = "portfolio-arch-gen"
AUTHOR = "Afolabi Olawale"
ROLE = "AI/ML Engineer"
PRIVATE_REPOS = {"insightflow", "groundwork"}
PRODUCTION = {
    "agora_rag", "nigerian_rag_health_system", "groundwork",
    "digital_lending_esign_prediction", "insightflow", "confidence_ai_coaching",
}

W, H = 960, 540
M = 44  # page margin
INK = HexColor("#14110f")
PAPER = HexColor("#f4f1ea")
PANEL = HexColor("#fbfaf6")
LINE = HexColor("#d9d4c8")
SOFT = HexColor("#6b645c")
ACCENT = HexColor("#e8501f")

FONT_DIR = Path("/System/Library/Fonts/Supplemental")


def register_fonts() -> tuple[str, str, str]:
    """Register Arial + Courier New if present, else fall back to built-ins."""
    try:
        pdfmetrics.registerFont(TTFont("Body", str(FONT_DIR / "Arial.ttf")))
        pdfmetrics.registerFont(TTFont("Body-Bold", str(FONT_DIR / "Arial Bold.ttf")))
        pdfmetrics.registerFont(TTFont("Mono", str(FONT_DIR / "Courier New.ttf")))
        return "Body", "Body-Bold", "Mono"
    except Exception:  # noqa: BLE001 - any font problem just means built-ins
        return "Helvetica", "Helvetica-Bold", "Courier"


BODY, BOLD, MONO = register_fonts()


# ---------- source data ----------
def read_frontmatter(slug: str) -> dict:
    """Pull title, date, website, github and tag labels from the project's mdx."""
    text = (ROOT / "content" / "projects" / f"{slug}.mdx").read_text()
    front = text.split("---")[1]
    get = lambda key: (re.search(rf"^{key}:\s*(.+)$", front, re.M) or [None, None])[1]
    title = (get("title") or slug).strip().strip('"')
    return {
        "title": title,
        "website": (get("website") or "").strip() or None,
        "github": (get("github") or "").strip() or None,
        "tags": re.findall(r"label:\s*(.+)", front),
    }


def read_stages(slug: str) -> list[tuple[str, str]]:
    """Read the flow stages from the site's data.ts so PDF and figure never drift."""
    text = (ROOT / "src" / "components" / "story" / "data.ts").read_text()
    start = text.index(f"\n  {slug}: {{")
    block = text[start:]
    block = block[block.index("stages: ["):]
    block = block[: block.index("\n    ]")]
    q = r"'((?:[^'\\]|\\.)*)'"
    pairs = re.findall(rf"label:\s*{q},\s*note:\s*{q}", block)
    return [(a.replace("\\'", "'"), b.replace("\\'", "'")) for a, b in pairs]


# ---------- drawing helpers ----------
def style(size: float, font: str = None, color=INK, leading: float = None) -> ParagraphStyle:
    return ParagraphStyle(
        "s", fontName=font or BODY, fontSize=size, leading=leading or size * 1.32, textColor=color
    )


def para(c, text: str, x: float, y_top: float, width: float, st: ParagraphStyle) -> float:
    """Draw wrapped text with its top at y_top; return the height used."""
    p = Paragraph(escape(text), st)
    _, h = p.wrap(width, 2000)
    p.drawOn(c, x, y_top - h)
    return h


def fit_para(c, text, x, y_top, width, max_h, size, font=None, color=INK) -> float:
    """Shrink font until the paragraph fits in max_h."""
    while size > 7:
        st = style(size, font, color)
        p = Paragraph(escape(text), st)
        _, h = p.wrap(width, 2000)
        if h <= max_h:
            p.drawOn(c, x, y_top - h)
            return h
        size -= 0.5
    raise ValueError(f"text does not fit: {text[:60]!r}")


def chip(c, text: str, x: float, y: float, dark: bool = False) -> float:
    """Draw a pill label; return its width."""
    c.setFont(MONO, 8.5)
    w = c.stringWidth(text, MONO, 8.5) + 16
    c.setStrokeColor(HexColor("#4a443d") if dark else LINE)
    c.setFillColor(white if dark else PANEL)
    c.setFillAlpha(0.06 if dark else 1)
    c.roundRect(x, y, w, 20, 10, stroke=1, fill=1)
    c.setFillAlpha(1)
    c.setFillColor(HexColor("#e9e4d8") if dark else INK)
    c.drawString(x + 8, y + 6.5, text)
    return w


def page_chrome(c, name: str, page: int, total: int, title: str) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(SOFT)
    c.setFont(MONO, 8.5)
    c.drawString(M, H - 34, f"{name.upper()}  /  SOLUTION ARCHITECTURE")
    c.drawRightString(W - M, H - 34, f"{page:02d} / {total:02d}")
    c.setFillColor(INK)
    c.setFont(BOLD, 26)
    c.drawString(M, H - 72, title)
    c.setStrokeColor(LINE)
    c.line(M, 34, W - M, 34)
    c.setFillColor(SOFT)
    c.setFont(BODY, 8.5)
    c.drawString(M, 20, f"{AUTHOR}  -  {ROLE}")
    c.setFillColor(ACCENT)
    c.circle(W - M - 3, 24, 3, stroke=0, fill=1)


def arrow(c, x1, y1, x2, y2) -> None:
    c.setStrokeColor(ACCENT)
    c.setFillColor(ACCENT)
    c.setLineWidth(1.4)
    c.line(x1, y1, x2, y2)
    import math

    a = math.atan2(y2 - y1, x2 - x1)
    s = 6
    c.saveState()
    p = c.beginPath()
    p.moveTo(x2, y2)
    p.lineTo(x2 - s * math.cos(a - 0.45), y2 - s * math.sin(a - 0.45))
    p.lineTo(x2 - s * math.cos(a + 0.45), y2 - s * math.sin(a + 0.45))
    p.close()
    c.drawPath(p, stroke=0, fill=1)
    c.restoreState()
    c.setLineWidth(1)


# ---------- pages ----------
def cover(c, slug, meta, info, total):
    c.setFillColor(INK)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    kind = "PRODUCTION" if slug in PRODUCTION else "RESEARCH"
    c.setFillColor(ACCENT)
    c.setFont(MONO, 10)
    c.drawString(M + 4, H - 70, f"{kind}  /  SOLUTION ARCHITECTURE")
    c.circle(M - 4, H - 66.5, 3, stroke=0, fill=1)

    h = para(c, meta["title"], M, H - 96, 600, style(38, BOLD, white, 44))
    para(c, info["tagline"], M, H - 96 - h - 24, 560, style(15, BODY, HexColor("#cfc9bc"), 21))

    # fact tiles
    tile_w, gap = 262, 18
    for i, (value, label) in enumerate(info["facts"]):
        x = M + i * (tile_w + gap)
        c.setStrokeColor(HexColor("#3a3530"))
        c.setFillColor(HexColor("#1b1814"))
        c.roundRect(x, 70, tile_w, 108, 12, stroke=1, fill=1)
        fit = 30 if len(value) < 12 else 22
        c.setFillColor(ACCENT)
        c.setFont(BOLD, fit)
        c.drawString(x + 18, 70 + 62, value)
        para(c, label, x + 18, 70 + 52, tile_w - 36, style(10.5, BODY, HexColor("#cfc9bc"), 14))

    # built-with chips on the right
    c.setFillColor(HexColor("#8a8379"))
    c.setFont(MONO, 8.5)
    c.drawString(W - M - 190, H - 70, "BUILT WITH")
    y = H - 100
    for tag in meta["tags"][:7]:
        chip(c, tag, W - M - 190, y, dark=True)
        y -= 28
    c.setFillColor(HexColor("#8a8379"))
    c.setFont(BODY, 9)
    c.drawString(M, 36, f"{AUTHOR}  -  {ROLE}")


def flow_page(c, slug, meta, info, stages, page, total):
    page_chrome(c, meta["title"].split(" - ")[0].split(" — ")[0], page, total, "How it works")
    n = len(stages)
    per_row = n if n <= 4 else 3
    rows = (n + per_row - 1) // per_row
    gap = 36
    box_w = (W - 2 * M - (per_row - 1) * gap) / per_row
    has_parts = bool(info.get("parts"))
    # With no parts table below, give the diagram the whole page and centre it
    box_h = 96 if has_parts else (150 if rows == 1 else 130)
    row_gap = 34
    top = H - 100
    if not has_parts:
        total_h = rows * box_h + (rows - 1) * row_gap
        top = (H - 100 + 56) / 2 + total_h / 2
    note_size = 10.5 if has_parts else 12.5

    positions = []
    for i, (label, note) in enumerate(stages):
        r, col = divmod(i, per_row)
        x = M + col * (box_w + gap)
        y = top - r * (box_h + row_gap) - box_h
        positions.append((x, y))
        c.setStrokeColor(LINE)
        c.setFillColor(PANEL)
        c.roundRect(x, y, box_w, box_h, 12, stroke=1, fill=1)
        c.setFillColor(ACCENT)
        c.circle(x + 20, y + box_h - 20, 10, stroke=0, fill=1)
        c.setFillColor(white)
        c.setFont(BOLD, 10)
        c.drawCentredString(x + 20, y + box_h - 23.5, str(i + 1))
        c.setFillColor(INK)
        c.setFont(BOLD, 12)
        c.drawString(x + 38, y + box_h - 24, label)
        fit_para(c, note, x + 16, y + box_h - 40, box_w - 32, box_h - 48, note_size, BODY, SOFT)

    # arrows between boxes
    for i in range(n - 1):
        (x1, y1), (x2, y2) = positions[i], positions[i + 1]
        if y1 == y2:
            arrow(c, x1 + box_w + 4, y1 + box_h / 2, x2 - 4, y2 + box_h / 2)
        else:  # wrap to the next row with an elbow
            mid = y1 - row_gap / 2
            c.setStrokeColor(ACCENT)
            c.setLineWidth(1.4)
            c.line(x1 + box_w / 2, y1, x1 + box_w / 2, mid)
            c.line(x1 + box_w / 2, mid, x2 + box_w / 2, mid)
            c.setLineWidth(1)
            arrow(c, x2 + box_w / 2, mid, x2 + box_w / 2, y2 + box_h + 3)

    y_after = top - rows * box_h - (rows - 1) * row_gap - 18
    if info.get("note"):
        h = para(c, info["note"], M, y_after, W - 2 * M, style(10.5, BODY, ACCENT, 14))
        y_after -= h + 18

    if has_parts:
        c.setFillColor(SOFT)
        c.setFont(MONO, 8.5)
        c.drawString(M, y_after - 6, "WHAT EACH PART DOES")
        y = y_after - 18
        avail = y - 52
        row_h = min(26, avail / len(info["parts"]))
        for name, role in info["parts"]:
            c.setStrokeColor(LINE)
            c.line(M, y, W - M, y)
            c.setFillColor(INK)
            c.setFont(BOLD, 10)
            c.drawString(M, y - row_h + 9, name)
            fit_para(c, role, M + 200, y - 5, W - 2 * M - 200, row_h - 6, 10.5, BODY, SOFT)
            y -= row_h


def decisions_page(c, slug, meta, info, page, total):
    page_chrome(c, meta["title"].split(" - ")[0].split(" — ")[0], page, total, "Key decisions")
    items = info["decisions"]
    cols = 3 if len(items) == 3 else 2
    rows = (len(items) + cols - 1) // cols
    gap = 18
    top, bottom = H - 96, 56
    card_w = (W - 2 * M - (cols - 1) * gap) / cols
    card_h = min((top - bottom - (rows - 1) * gap) / rows, 270)
    # centre the grid vertically when the cards are capped in height
    top = (top + bottom) / 2 + (rows * card_h + (rows - 1) * gap) / 2
    for i, (title, why, cost) in enumerate(items):
        r, col = divmod(i, cols)
        x = M + col * (card_w + gap)
        y = top - r * (card_h + gap) - card_h
        c.setStrokeColor(LINE)
        c.setFillColor(PANEL)
        c.roundRect(x, y, card_w, card_h, 14, stroke=1, fill=1)
        c.setFillColor(ACCENT)
        c.setFont(MONO, 11)
        c.drawString(x + 18, y + card_h - 28, f"{i + 1:02d}")
        h = para(c, title, x + 18, y + card_h - 40, card_w - 36, style(15, BOLD, INK, 19))
        body_top = y + card_h - 40 - h - 8
        reserve = 64 if cost else 0
        used = fit_para(c, why, x + 18, body_top, card_w - 36, body_top - y - 14 - reserve, 12.5, BODY, SOFT)
        if cost:
            ty = body_top - used - 12
            c.setFillColor(ACCENT)
            c.setFont(MONO, 8)
            c.drawString(x + 18, ty - 6, "TRADE-OFF")
            fit_para(c, cost, x + 18, ty - 14, card_w - 36, ty - y - 22, 11.5, BODY, INK)


def status_page(c, slug, meta, info, page, total):
    page_chrome(c, meta["title"].split(" - ")[0].split(" — ")[0], page, total, "Stack, status and what is next")
    columns = [("BUILT WITH", "stack")]
    if info.get("limits"):
        columns.append(("KNOWN LIMITS", "limits"))
    if info.get("next"):
        columns.append(("NEXT STEPS", "next"))
    gap = 28
    col_w = (W - 2 * M - (len(columns) - 1) * gap) / len(columns)
    top = H - 100
    for i, (head, key) in enumerate(columns):
        x = M + i * (col_w + gap)
        c.setFillColor(ACCENT)
        c.setFont(MONO, 9)
        c.drawString(x, top, head)
        c.setStrokeColor(LINE)
        c.line(x, top - 8, x + col_w, top - 8)
        y = top - 28
        if key == "stack":
            cx = x
            for tag in meta["tags"]:
                w = c.stringWidth(tag, MONO, 8.5) + 16
                if cx + w > x + col_w:
                    cx, y = x, y - 28
                chip(c, tag, cx, y, dark=False)
                cx += w + 8
            y -= 44
        else:
            for item in info[key]:
                c.setFillColor(ACCENT)
                c.circle(x + 3, y - 5, 2.4, stroke=0, fill=1)
                h = para(c, item, x + 16, y, col_w - 16, style(11, BODY, INK, 15))
                y -= h + 12

    # links
    links = []
    if meta["website"]:
        links.append(("LIVE DEMO", meta["website"]))
    if meta["github"] and slug not in PRIVATE_REPOS:
        links.append(("SOURCE", meta["github"]))
    ly = 96
    for label, url in links:
        c.setFillColor(SOFT)
        c.setFont(MONO, 8.5)
        c.drawString(M, ly + 14, label)
        c.setFillColor(INK)
        c.setFont(BODY, 11)
        c.drawString(M + 80, ly + 14, url)
        c.linkURL(url, (M + 80, ly + 8, M + 80 + c.stringWidth(url, BODY, 11), ly + 26), relative=0)
        ly -= 24


def build(slug: str) -> Path | None:
    out = ROOT / "public" / "architecture" / "projects" / slug / "deck.pdf"
    if out.exists() and MARKER.encode() not in out.read_bytes():
        print(f"skip {slug}: deck.pdf was uploaded by hand, not overwriting")
        return None

    info = CONTENT[slug]
    meta = read_frontmatter(slug)
    stages = read_stages(slug)
    if not stages:
        raise SystemExit(f"{slug}: no stages found in data.ts")

    out.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(out), pagesize=(W, H))
    c.setTitle(f"{meta['title']} - Solution Architecture")
    c.setAuthor(AUTHOR)
    c.setProducer(MARKER)
    total = 4
    cover(c, slug, meta, info, total)
    c.showPage()
    flow_page(c, slug, meta, info, stages, 2, total)
    c.showPage()
    decisions_page(c, slug, meta, info, 3, total)
    c.showPage()
    status_page(c, slug, meta, info, 4, total)
    c.showPage()
    c.save()
    print(f"ok   {slug}")
    return out


if __name__ == "__main__":
    slugs = sys.argv[1:] or list(CONTENT)
    unknown = [s for s in slugs if s not in CONTENT]
    if unknown:
        raise SystemExit(f"unknown slug(s): {unknown}")
    for s in slugs:
        build(s)
