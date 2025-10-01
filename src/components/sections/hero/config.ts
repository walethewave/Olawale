import { Hero } from '@/types/hero';
import { metadata as meta } from '@/app/config';

const hero: Hero = {
  name: meta.author.name,
  label: meta.author.label,
  description: 'I engineer intelligent systems and build AI solutions that solve real-world problems. Welcome to my portfolio.'
};

export { hero };
