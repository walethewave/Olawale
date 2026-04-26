import Reveal from '@/components/reveal';
import MotionWrap from '@/components/motion-wrap';
import { Badge } from '@/components/ui/badge';

const skillGroups = [
  {
    title: 'Languages & Backend',
    items: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis']
  },
  {
    title: 'AI / ML / NLP',
    items: [
      'PyTorch',
      'TensorFlow',
      'HuggingFace',
      'scikit-learn',
      'LangChain',
      'OpenAI'
    ]
  },
  {
    title: 'Cloud & Infrastructure',
    items: ['AWS', 'Pinecone', 'Supabase', 'Streamlit']
  },
  {
    title: 'Data & Visualization',
    items: ['Pandas', 'NumPy', 'Power BI', 'Plotly']
  }
] as const;

function Skills() {
  return (
    <MotionWrap className="w-full py-24 lg:py-32" id="skills">
      <div className="space-y-4 px-4 md:px-6 lg:space-y-10">
        <div className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <Reveal>
              <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                My
              </h2>
            </Reveal>
            <Reveal>
              <h2 className="-mt-2 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                Skills
              </h2>
            </Reveal>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-border bg-muted/40 p-4"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="rounded-full border-border bg-background/70 px-3 py-1 text-[0.8rem] font-medium text-foreground shadow-sm"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionWrap>
  );
}

export default Skills;
