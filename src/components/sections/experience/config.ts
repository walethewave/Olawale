import { Experience } from '@/types/experience';

const experiences: Experience[] = [
  {
    name: 'AI Engineer & Solution Architect',
    duration: 'March 2025 - Present',
    company: 'Qucoon',
    description:
      'Architected a 5-agent AI customer support system for fintech — Intent Classifier, Conversation Bot, Product Bot, Support Bot, and Escalation Agent. Built multi-step chain-of-thought workflows with Redis memory, concurrent async execution, and LLM response validation with automatic fallbacks. Also shipped a document Q&A system using RAG with confidence scoring and FastAPI REST APIs.'
  },
  {
    name: 'Freelance AI / Research Consultant',
    duration: 'Dec 2024 - Oct 2025',
    company: 'Upwork',
    description:
      'Delivered completed 5.0-rated Upwork engagements, including an AI-powered coding course review and a job-posting research project for Gujarat, India. Worked quickly, communicated clearly, and turned ambiguous requests into actionable deliverables.'
  },
  {
    name: 'Data Analyst',
    duration: 'Aug 2024 - Present',
    company: 'FlesiXAF',
    description:
      'Contributed to data-driven projects focused on educational data, using SQL, Python, and Power BI to clean, analyze, and visualize datasets. Built reports and dashboards that turned raw data into decision-ready insights.'
  },
  {
    name: 'B.Sc. Mathematics & Education',
    duration: 'Aug 2021 - Jan 2025',
    company: 'Lagos State University',
    description:
      'Studied mathematics with a focus on statistical modeling, linear algebra, and computational methods — the foundation that makes my ML work tick. Applied mathematical thinking to real-world data problems throughout my studies.'
  }
];

export { experiences };
