import { Testimonial } from '@/types/testimonial';

const testimonials: Testimonial[] = [
  {
    name: 'Upwork Client',
    testimonial:
      'Great working with Olawale, quick and responsive'
  },
  {
    name: 'Upwork Client',
    testimonial:
      'Great work'
  },
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
  }
];

export { testimonials };
