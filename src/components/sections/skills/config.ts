import { Skill } from '@/types/skill';
import {
  CodeIcon,          // Python/Programming
  CircuitBoardIcon,  // Machine Learning  
  DatabaseIcon,      // Data Engineering
  NetworkIcon,       // Deep Learning/Neural Networks  
  BotIcon,           // AI/Automation
  GitBranchIcon,     // MLOps/Version Control
  CloudIcon,         // Cloud Computing
  BarChart2Icon,     // Data Visualization
  CheckCircleIcon,   // Problem Solving
  CpuIcon,           // Computer Vision/NLP
  ActivityIcon,      // Model Optimization
  ZapIcon            // Real-time AI Systems
} from 'lucide-react';

const trimLen: number = -1; // 0 is accordion only, -1 is does not restrict the length

const skills: Skill[] = [
  {
    name: 'Python & AI Frameworks',
    Icon: CodeIcon,
    description: `Expert in Python programming with extensive experience in AI/ML frameworks including TensorFlow, PyTorch, Scikit-learn, and Keras. I leverage Python's ecosystem for building end-to-end machine learning pipelines, developing neural networks, and creating scalable AI applications. Proficient in NumPy, Pandas, and other scientific computing libraries for data manipulation and analysis.`
  },
  {
    name: 'Machine Learning',
    Icon: CircuitBoardIcon,
    description: `Specialized in developing and deploying machine learning models including supervised, unsupervised, and reinforcement learning algorithms. Experienced in feature engineering, model selection, hyperparameter tuning, and performance optimization. I build predictive models for classification, regression, clustering, and recommendation systems using various ML techniques.`
  },
  {
    name: 'Deep Learning & Neural Networks',
    Icon: NetworkIcon,
    description: `Proficient in designing and training deep neural networks including CNNs, RNNs, LSTMs, and Transformers. I specialize in computer vision, natural language processing, and sequence modeling. Experienced with transfer learning, fine-tuning pre-trained models, and building custom architectures for specific AI applications.`
  },
  {
    name: 'Data Engineering & MLOps',
    Icon: DatabaseIcon,
    description: `Skilled in building robust data pipelines and ML infrastructure. Experienced in data warehousing, ETL processes, and database management with SQL and NoSQL systems. I implement MLOps practices including model versioning, automated testing, continuous integration, and deployment pipelines for production-ready AI systems.`
  },
  {
    name: 'Computer Vision & NLP',
    Icon: CpuIcon,
    description: `Specialized in developing computer vision applications for image classification, object detection, and semantic segmentation. Expert in NLP tasks including text classification, sentiment analysis, named entity recognition, and language modeling. I work with OpenCV, Pillow, spaCy, NLTK, and Hugging Face transformers.`
  },
  {
    name: 'Cloud AI & Deployment',
    Icon: CloudIcon,
    description: `Experienced in deploying AI models on cloud platforms including AWS, Google Cloud, and Azure. Proficient in containerization with Docker, orchestration with Kubernetes, and serverless deployments. I build scalable AI APIs, implement model serving infrastructure, and ensure high availability for production AI systems.`
  },
  {
    name: 'AI Model Optimization',
    Icon: ActivityIcon,
    description: `Expert in optimizing AI models for performance, efficiency, and scalability. Skilled in model compression techniques, quantization, pruning, and knowledge distillation. I optimize models for edge deployment, reduce inference time, and implement real-time AI solutions while maintaining accuracy and reliability.`
  },
  {
    name: 'Data Visualization & Analytics',
    Icon: BarChart2Icon,
    description: `Proficient in creating compelling data visualizations and interactive dashboards using tools like Matplotlib, Seaborn, Plotly, and Streamlit. I transform complex AI model outputs and data insights into clear, actionable visualizations for stakeholders, enabling data-driven decision making in AI projects.`
  },
  {
    name: 'AI Research & Innovation',
    Icon: ZapIcon,
    description: `Passionate about staying current with AI research and implementing cutting-edge techniques. I experiment with new architectures, read research papers, and adapt novel approaches to solve business problems. Experienced in A/B testing for AI systems, statistical analysis, and continuous model improvement.`
  }
];

export { trimLen, skills };
