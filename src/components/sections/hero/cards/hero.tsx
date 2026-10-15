import { project } from '@/app/source';
import { metadata as meta } from '@/app/config';
import FeatureCard from '@/components/sections/hero/cards/feature-card';
import HeroHeading from '@/components/sections/hero/cards/hero-heading';

function Hero() {
  const pages = project.getPages();
  // Confidence AI is rendered from a hardcoded entry on the projects page too,
  // so counting from content keeps both numbers consistent
  const production = pages.filter((p) => p.data.track === 'production').length;
  const research = pages.filter((p) => p.data.track === 'research').length;

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-16 pt-32 md:px-6 md:pt-36">
      <HeroHeading label={meta.author.label} />

      <div className="relative mt-14 grid w-full grid-cols-1 items-end gap-5 md:mt-20 md:grid-cols-[1fr_1.4fr_1fr]">
        <FeatureCard
          index={0}
          tilt={-2}
          href="/about"
          image="/images/home/me.jpg"
          imagePosition="50% 20%"
          eyebrow="About"
          title="Hi, I'm Olawale"
          chips={['AI/ML engineer', 'Python', 'RAG']}
          className="h-[420px] md:h-[460px]"
        />
        <FeatureCard
          index={1}
          tilt={0}
          href="/projects?track=production"
          image="/images/home/production.svg"
          eyebrow="Production"
          title="AI/ML in production & solution architecture"
          chips={[`${production} projects`, 'RAG', 'Deployed apps']}
          className="h-[420px] md:h-[520px]"
        />
        <FeatureCard
          index={2}
          tilt={2}
          href="/projects?track=research"
          image="/images/home/research.svg"
          eyebrow="Research"
          title="AI/ML research"
          chips={[`${research} projects`, 'Fraud', 'NLP', 'Vision']}
          className="h-[420px] md:h-[460px]"
        />
      </div>
    </section>
  );
}

export default Hero;
