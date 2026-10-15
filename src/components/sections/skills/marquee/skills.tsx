import { skillGroups } from '@/components/sections/skills/config';
import MarqueeRow from '@/components/sections/skills/marquee/marquee-row';

const allSkills = skillGroups.flatMap((group) => [...group.items]);
// Split into two rows that stream in opposite directions
const rows = [
  allSkills.filter((_, i) => i % 2 === 0),
  allSkills.filter((_, i) => i % 2 === 1)
];

function Skills() {
  return (
    <section id="skills" className="w-full pb-24 pt-8">
      <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.18em] text-[hsl(var(--ink-soft))]">
        Stack I work with
      </p>
      <div className="flex flex-col gap-3">
        <MarqueeRow items={rows[0]} speed={-1.6} />
        <MarqueeRow items={rows[1]} speed={1.6} />
      </div>
    </section>
  );
}

export default Skills;
