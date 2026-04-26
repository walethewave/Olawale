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
    description: ''
  },
  {
    name: 'Machine Learning',
    Icon: CircuitBoardIcon,
    description: ''
  },
  {
    name: 'Deep Learning & Neural Networks',
    Icon: NetworkIcon,
    description: ''
  },
  {
    name: 'Data Engineering & MLOps',
    Icon: DatabaseIcon,
    description: ''
  },
  {
    name: 'Computer Vision & NLP',
    Icon: CpuIcon,
    description: ''
  },
  {
    name: 'Cloud AI & Deployment',
    Icon: CloudIcon,
    description: ''
  },
  {
    name: 'AI Model Optimization',
    Icon: ActivityIcon,
    description: ''
  },
  {
    name: 'Data Visualization & Analytics',
    Icon: BarChart2Icon,
    description: ''
  },
  {
    name: 'AI Research & Innovation',
    Icon: ZapIcon,
    description: ''
  }
];

export { trimLen, skills };
