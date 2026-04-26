import React from 'react';

import MotionWrap from '@/components/motion-wrap';
import Reveal from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

function NextBuild() {
  return (
    <MotionWrap className="w-full py-24 lg:py-32" id="what-im-building-next">
      <div className="px-4 md:px-6">
        <div className="mb-6 flex flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <Reveal>
              <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                What I&apos;m Building Next
              </h2>
            </Reveal>
          </div>
          <p className="mt-4 hidden text-gray-500 dark:text-gray-400 lg:mt-0 lg:block lg:w-[35%]">
            A closer look at the next product direction I&apos;m pushing toward.
          </p>
        </div>

        <Card className="relative overflow-hidden border border-border/70 bg-gradient-to-br from-primary/10 via-background to-secondary/15 shadow-[0_22px_70px_-28px_hsl(var(--primary)/0.45)] dark:from-primary/15 dark:via-background dark:to-secondary/20">
          <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />

          <CardContent className="relative p-6 md:p-8 lg:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
                >
                  In Progress
                </Badge>
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                  2026
                </span>
              </div>

              <h3 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                Nigerian Multilingual Conversational AI
              </h3>

              <div className="max-w-4xl space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300 md:text-base">
                <p>
                  Most Nigerian AI products wrap an English LLM and call it
                  localized. That is translation lag, not localization.
                </p>
                <p>
                  I am building voice-in, voice-out conversational AI that
                  natively understands Yoruba, Igbo, Hausa, and Nigerian
                  English — not as translated inputs, but as primary
                  languages.
                </p>
                <p>
                  First milestone: A conversational finance tracker in Pidgin
                  English and Yoruba, connected to Nigerian bank APIs —
                  deployable in 2026.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Status:
                </span>
                <Badge
                  variant="outline"
                  className="rounded-full border-border bg-background/70 px-3 py-1 text-[0.75rem] font-medium text-foreground shadow-sm"
                >
                  In Progress · 2026
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MotionWrap>
  );
}

export default NextBuild;