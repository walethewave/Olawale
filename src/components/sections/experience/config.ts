import { Experience } from '@/types/experience';

const experiences: Experience[] = [
  {
    name: 'AI Engineer',
    duration: 'March 2025 - Present',
    company: 'Qucoon',
    description:
      'Architected a 5-agent AI customer support system for fintech — Intent Classifier, Conversation Bot, Product Bot, Support Bot, and Escalation Agent. Built multi-step chain-of-thought workflows with Redis memory, concurrent async execution, and LLM response validation with automatic fallbacks. Also shipped a document Q&A system using RAG with confidence scoring and FastAPI REST APIs.'
  },
  {
    name: 'AI Engineer (Projects)',
    duration: '2024 - 2025',
    company: 'Independent',
    description:
      'Built and deployed production AI systems including Dr. Amina (medical RAG chatbot for Northern Nigeria with 648 health documents), a fraud detection pipeline on 1M+ transactions, and ConfidenceAI — a live coaching platform powered by Google Gemini with explainable scoring.'
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
