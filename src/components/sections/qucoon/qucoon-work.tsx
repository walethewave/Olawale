import React from 'react';

import MotionWrap from '@/components/motion-wrap';
import Reveal from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type WorkItem = {
  title: string;
  tag: string;
  description: string;
  techTags: string[];
};

const workItems: WorkItem[] = [
  {
    title: '5-Agent AI Customer Support System',
    tag: 'Production',
    description:
      'Designed and deployed a multi-agent pipeline — Intent Classifier → Conversation Bot → Product Bot → Support Bot → Escalation Agent — with Redis persistent memory, concurrent async execution, LLM response validation, and automatic fallbacks.',
    techTags: ['Redis', 'FastAPI', 'LangChain', 'Python', 'Async']
  },
  {
    title: 'Document Intelligence Platform',
    tag: 'Production',
    description:
      'RAG system with confidence scoring over internal fintech documentation. FastAPI REST APIs serving real client queries with semantic search and fallback logic for low-confidence responses.',
    techTags: ['RAG', 'FastAPI', 'Pinecone', 'Python']
  }
];

function QucoonWork() {
  return (
    <MotionWrap className="w-full py-24 lg:py-32" id="qucoon-work">
      <div className="space-y-4 px-4 md:px-6 lg:space-y-10">
        <div className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <Reveal>
              <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                Production Work at Qucoon
              </h2>
            </Reveal>
          </div>
          <p className="mt-4 hidden text-gray-500 dark:text-gray-400 lg:mt-0 lg:block lg:w-[35%]">
            Production AI systems built for fintech support and knowledge retrieval.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {workItems.map((item) => (
            <Card
              key={item.title}
              className="h-full border-border border-l-4 bg-primary/5 shadow-sm dark:bg-primary/10"
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex h-full flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-xl font-bold leading-tight">
                      {item.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
                    >
                      {item.tag}
                    </Badge>
                  </div>

                  <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {item.techTags.map((techTag) => (
                      <Badge
                        key={techTag}
                        variant="outline"
                        className="rounded-full border-border bg-background/70 px-3 py-1 text-[0.75rem] font-medium text-foreground shadow-sm"
                      >
                        {techTag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MotionWrap>
  );
}

export default QucoonWork;