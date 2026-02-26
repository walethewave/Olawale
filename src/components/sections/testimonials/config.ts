import { Testimonial } from '@/types/testimonial';

const testimonials: Testimonial[] = [
  {
    name: 'Qucoon Engineering',
    image: '/images/person/1.jpg',
    username: '@qucoon',
    testimonial:
      'Olawale designed and shipped our multi-agent AI customer support system from scratch. His ability to orchestrate 5 specialized agents with chain-of-thought reasoning and Redis memory was exactly what we needed. The system handles live fintech conversations reliably.'
  },
  {
    name: 'DataFest 2025 Team',
    image: '/images/person/2.jpg',
    username: '@datafest',
    testimonial:
      'Olawale built Dr. Amina during the hackathon — a medical RAG chatbot for Northern Nigeria with emergency detection, Hausa voice input, and 648 verified health documents. He went from idea to deployed Streamlit app in days. Impressive engineering under pressure.'
  },
  {
    name: 'FlexiSAF Internship',
    image: '/images/person/3.jpg',
    username: '@flexisaf',
    testimonial:
      'During his Gen AI and Data Science internship, Olawale consistently delivered well-structured ML pipelines and showed genuine curiosity about how models behave in production. Sharp thinker who writes clean, reproducible code.'
  },
  {
    name: 'Open Source Community',
    image: '/images/person/4.jpg',
    username: '@github',
    testimonial:
      'His fraud detection repo is one of the most honest ML projects I have seen — no inflated accuracy claims, real SHAP interpretability, and thoughtful feature engineering on 1M+ transactions. Refreshing to see someone treat ML like an engineering discipline.'
  }
];

export { testimonials };
