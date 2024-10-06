import { Skill } from '@/types/skill';
import {
  CodeIcon,          // Correct
  DatabaseIcon,      // Replaced SqlIcon
  BarChartIcon,      // Replaced PowerBIIcon
  FileTextIcon,      // Replaced ExcelIcon
  ClipboardIcon,     // Replaced JamoviIcon
  SearchIcon,        // Replaced DataAnalysisIcon
  PieChartIcon,      // Replaced StatisticsIcon
  BarChart2Icon,     // Replaced ChartLineIcon with BarChart2Icon
  CheckCircleIcon    // Replaced ProblemSolvingIcon
} from 'lucide-react';

const trimLen: number = -1; // 0 is accordion only, -1 is does not restrict the length

const skills: Skill[] = [
  {
    name: 'Python',
    Icon: CodeIcon,
    description: `Data Analysis involves leveraging Python to extract, process, and analyze data, transforming raw information into actionable insights. This includes descriptive statistics to summarize data, inferential statistics to make predictions and draw conclusions, and data visualization techniques to communicate findings clearly. Overall, Python is an essential tool for facilitating data-driven decision-making across various industries.`
  },
  {
    name: 'SQL',
    Icon: DatabaseIcon,
    description: `SQL (Structured Query Language) is essential for managing and querying relational databases. This skill enables data analysts to efficiently retrieve, manipulate, and analyze data from various sources. By leveraging SQL, analysts can perform complex joins, aggregations, and subqueries to derive meaningful insights from large datasets, ensuring accurate and timely decision-making.`
  },
  {
    name: 'Power BI',
    Icon: BarChartIcon,
    description: `Power BI is a powerful business analytics tool that transforms raw data into interactive visualizations and reports. This skill allows data analysts to create intuitive dashboards that facilitate data exploration and storytelling. With Power BI, analysts can connect to multiple data sources, apply advanced analytics, and share insights across the organization, enhancing data-driven strategies.`
  },
  {
    name: 'Excel',
    Icon: FileTextIcon,
    description: `Excel is a versatile spreadsheet application widely used for data analysis and visualization. This skill encompasses using formulas, pivot tables, and charts to organize and interpret data effectively. Excel's functionality allows data analysts to perform calculations, conduct scenario analysis, and present data in a user-friendly format, making it an indispensable tool for quick analysis and reporting.`
  },
  {
    name: 'Jamovi',
    Icon: ClipboardIcon,
    description: `Jamovi is a user-friendly statistical software that simplifies data analysis. This skill involves using Jamovi's intuitive interface to perform a range of statistical tests and visualize data without the need for extensive programming knowledge. Analysts can easily conduct descriptive statistics, inferential analyses, and generate visualizations, making it accessible for both novice and experienced users.`
  },
  {
    name: 'Data Analysis',
    Icon: SearchIcon,
    description: `Data Analysis encompasses the systematic examination of data to uncover patterns, trends, and insights. This skill involves applying various analytical techniques, including data cleaning, exploratory data analysis, and modeling, to interpret data effectively. By leveraging tools and methodologies, data analysts can provide actionable recommendations that drive business outcomes and improve decision-making processes.`
  },
  {
    name: 'Statistics',
    Icon: PieChartIcon,
    description: `Statistics is a fundamental discipline that underpins data analysis. This skill involves applying statistical methods to analyze data sets, draw conclusions, and make predictions. By utilizing descriptive and inferential statistics, data analysts can summarize data characteristics, test hypotheses, and quantify uncertainty, ultimately guiding strategic decisions and enhancing analytical rigor.`
  },
  {
    name: 'Data Visualization',
    Icon: BarChart2Icon, // Changed from ChartLineIcon to BarChart2Icon
    description: `Data Visualization is the graphical representation of information and data. This skill enables data analysts to create meaningful visual displays that convey complex data insights clearly and effectively. By utilizing various visualization tools and techniques, analysts can transform data into intuitive visuals, facilitating better understanding and decision-making.`
  },
  {
    name: 'Problem Solving',
    Icon: CheckCircleIcon,
    description: `Problem Solving is the ability to identify, analyze, and provide solutions to complex issues using data-driven approaches. This skill encompasses critical thinking and analytical reasoning, enabling data analysts to tackle challenges, develop effective strategies, and deliver actionable insights that enhance business performance.`
  }
];

export { trimLen, skills };
