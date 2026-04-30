from __future__ import annotations

from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path("/Users/walethewave/Desktop/Project/Portfolio/Olawale")
OUTPUT = ROOT / "public" / "resume.pdf"

NAME = "Afolabi Olawale Goodluck"
TITLE = "AI Engineer & Solution Architect"
CONTACT = (
    "Lagos, Nigeria | +234 808 441 5996 | lekanolawale477@gmail.com | "
    "linkedin.com/in/olawale-afolabi-691114255 | github.com/walethewave"
)

SUMMARY = (
    "AI Engineer and Solution Architect building production systems for fintech, "
    "document intelligence, and multilingual NLP. Experienced shipping multi-agent "
    "assistants, RAG pipelines, and client-facing tools with Python, FastAPI, Redis, "
    "PostgreSQL, Supabase, Pinecone, and modern LLM stacks. Currently building voice-in, "
    "voice-out conversational AI for Yoruba, Igbo, Hausa, and English."
)

SKILLS = [
    (
        "AI / ML / NLP",
        "Python, FastAPI, LangChain, Gemini, OpenAI, Pydantic, RAG, agent orchestration, prompt engineering, embeddings, vector search, scikit-learn, TensorFlow, PyTorch",
    ),
    (
        "Data / Infra",
        "PostgreSQL, Redis, Supabase, Pinecone, Power BI, SQL, ETL, Docker, AWS, Git",
    ),
    (
        "Product / Delivery",
        "Next.js, TypeScript, Streamlit, Flask, REST APIs, async Python, validation, fallback logic",
    ),
]

EXPERIENCE = [
    {
        "company": "Qucoon",
        "title": "AI Engineer & Solution Architect",
        "duration": "March 2025 - Present",
        "bullets": [
            "Architected a 5-agent fintech support system with an Intent Classifier, Conversation Bot, Product Bot, Support Bot, and Escalation Agent.",
            "Built Redis-backed memory, concurrent async workflows, and LLM response validation with automatic fallbacks for stable production behavior.",
            "Shipped document Q&A using RAG, confidence scoring, and FastAPI REST APIs for real client queries.",
        ],
    },
    {
        "company": "Upwork",
        "title": "Freelance AI / Research Consultant",
        "duration": "Dec 2024 - Oct 2025",
        "bullets": [
            "Delivered 5.0-rated engagements including an AI-powered coding course review and a job-posting research project for Gujarat, India.",
            "Translated ambiguous client requests into clear deliverables through fast communication, structured execution, and reliable turnaround.",
        ],
    },
    {
        "company": "FlesiXAF",
        "title": "Data Analyst",
        "duration": "Aug 2024 - Present",
        "bullets": [
            "Cleaned, analyzed, and visualized educational datasets using SQL, Python, and Power BI.",
            "Built reports and dashboards that turned raw data into decision-ready insights for stakeholders.",
        ],
    },
]

PROJECTS = [
    {
        "name": "ConfidenceAI - Live Coaching Platform",
        "stack": "Google Gemini, Streamlit, Pydantic",
        "detail": (
            "Real-time confidence coaching with explainable scoring, session memory, and structured output. "
            "Built for live deployment with consistent user sessions."
        ),
    },
    {
        "name": "Dr. Amina - AI Healthcare for Northern Nigeria",
        "stack": "Google Gemini, Pinecone, Supabase",
        "detail": (
            "Medical RAG chatbot for underserved communities with Hausa voice input, emergency detection, "
            "and 648 verified health documents."
        ),
    },
    {
        "name": "Fighting Fraud with Machine Learning",
        "stack": "Python, scikit-learn, SHAP",
        "detail": (
            "Production-grade fraud detection on 1M+ interbank transactions with a 0.3% fraud rate, 38 engineered features, "
            "and interpretable model outputs."
        ),
    },
    {
        "name": "Insightflow - Building Materials Inventory Tracker",
        "stack": "Next.js, TypeScript, Google Gemini, Supabase, PostgreSQL, Power BI",
        "detail": (
            "Conversational inventory tracking for building materials stores with regex fallback and Power BI-ready SQL views."
        ),
    },
]

EDUCATION = {
    "school": "Lagos State University",
    "degree": "B.Sc. Mathematics & Education",
    "duration": "Aug 2021 - Jan 2025",
    "detail": "Focused on statistical modeling, linear algebra, and computational methods.",
}


def build_styles() -> dict[str, ParagraphStyle]:
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="ResumeName",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=19,
            leading=22,
            textColor=colors.HexColor("#111827"),
            alignment=TA_LEFT,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ResumeTitle",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=11.5,
            leading=14,
            textColor=colors.HexColor("#1F4E79"),
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ResumeContact",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=11,
            textColor=colors.HexColor("#4B5563"),
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=12,
            textColor=colors.HexColor("#1F4E79"),
            spaceBefore=6,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9.1,
            leading=12.1,
            textColor=colors.HexColor("#111827"),
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodySmall",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=11.3,
            textColor=colors.HexColor("#111827"),
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ResumeBullet",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.9,
            leading=11.4,
            leftIndent=12,
            firstLineIndent=-9,
            spaceAfter=2,
            textColor=colors.HexColor("#111827"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="EntryHeader",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.3,
            leading=11.2,
            textColor=colors.HexColor("#111827"),
            spaceAfter=1,
        )
    )
    styles.add(
        ParagraphStyle(
            name="EntryMeta",
            parent=styles["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8.6,
            leading=10.5,
            textColor=colors.HexColor("#6B7280"),
            spaceAfter=1,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ProjectHeader",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.9,
            leading=10.8,
            textColor=colors.HexColor("#111827"),
            spaceAfter=1,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ProjectDetail",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=11.0,
            textColor=colors.HexColor("#111827"),
            spaceAfter=4,
        )
    )
    return styles


styles = build_styles()


def section_title(text: str) -> Paragraph:
    return Paragraph(escape(text.upper()), styles["SectionTitle"])


def bullet(text: str) -> Paragraph:
    return Paragraph(f"- {escape(text)}", styles["ResumeBullet"])


def build_skills_table() -> Table:
    data = []
    for category, items in SKILLS:
        data.append(
            [
                Paragraph(escape(category), styles["EntryHeader"]),
                Paragraph(escape(items), styles["BodySmall"]),
            ]
        )

    table = Table(data, colWidths=[1.35 * inch, 5.85 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#EFF6FF")),
                ("TEXTCOLOR", (0, 0), (-1, -1), colors.HexColor("#111827")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#D1D5DB")),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#D1D5DB")),
            ]
        )
    )
    return table


def build_entry(company: str, title: str, duration: str, bullets: list[str]) -> list:
    flowables: list = [
        Paragraph(f"<b>{escape(company)}</b> | {escape(duration)}", styles["EntryHeader"]),
        Paragraph(escape(title), styles["EntryMeta"]),
    ]
    flowables.extend(bullet(item) for item in bullets)
    flowables.append(Spacer(1, 0.04 * inch))
    return flowables


def build_project(name: str, stack: str, detail: str) -> list:
    return [
        Paragraph(f"<b>{escape(name)}</b> <font color='#6B7280'>| {escape(stack)}</font>", styles["ProjectHeader"]),
        Paragraph(escape(detail), styles["ProjectDetail"]),
    ]


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#6B7280"))
    canvas.drawRightString(doc.pagesize[0] - doc.rightMargin, 0.42 * inch, f"Page {canvas.getPageNumber()}")
    canvas.restoreState()


def build_pdf(output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=LETTER,
        leftMargin=0.6 * inch,
        rightMargin=0.6 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.6 * inch,
        title=NAME,
        author=NAME,
    )

    story: list = []
    story.append(Paragraph(escape(NAME), styles["ResumeName"]))
    story.append(Paragraph(escape(TITLE), styles["ResumeTitle"]))
    story.append(Paragraph(escape(CONTACT), styles["ResumeContact"]))
    story.append(HRFlowable(width="100%", thickness=0.9, color=colors.HexColor("#1F4E79"), spaceBefore=2, spaceAfter=8))

    story.append(section_title("Professional Summary"))
    story.append(Paragraph(escape(SUMMARY), styles["Body"]))

    story.append(section_title("Core Skills"))
    story.append(build_skills_table())

    story.append(section_title("Experience"))
    for item in EXPERIENCE:
        story.extend(build_entry(item["company"], item["title"], item["duration"], item["bullets"]))

    story.append(section_title("Selected Projects"))
    for project in PROJECTS:
        story.extend(build_project(project["name"], project["stack"], project["detail"]))

    story.append(section_title("Education"))
    story.append(Paragraph(f"<b>{escape(EDUCATION['school'])}</b> | {escape(EDUCATION['degree'])} | {escape(EDUCATION['duration'])}", styles["EntryHeader"]))
    story.append(Paragraph(escape(EDUCATION["detail"]), styles["Body"]))

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)


if __name__ == "__main__":
    build_pdf(OUTPUT)
    print(f"Wrote {OUTPUT}")
