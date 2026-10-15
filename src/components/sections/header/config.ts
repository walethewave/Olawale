import { Link } from '@/types/link';

// This is a setting for the compact header
const linkLimit = 4;
//

const links: Link[] = [
  {
    title: 'Home',
    href: '/',
    thumbnail: 'home.jpg'
  },
  {
    title: 'About',
    href: '/about',
    thumbnail: 'about.jpg'
  },
  {
    title: 'Projects',
    href: '/projects',
    thumbnail: 'projects.jpg'
  },
  {
    title: 'Client Work',
    href: '/client-work',
    thumbnail: 'client-work.jpg'
  },
  {
    title: 'Blog',
    href: '/blog',
    thumbnail: 'blog.jpg'
  }
];

// Links for the floating pill header on the homepage
const pillLinks = [
  { title: 'Home', href: '/' },
  { title: 'Blog', href: '/blog' },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/olawale-afolabi-691114255/',
    external: true
  },
] as const;

// The two CVs served from /public/cv
const cvLinks = [
  { label: 'AI Engineer CV', href: '/cv/Afolabi_Olawale_AI_Engineer_CV.pdf' },
  { label: 'ML Engineer CV', href: '/cv/Afolabi_Olawale_ML_Engineer_CV.pdf' }
] as const;

export { linkLimit, links, pillLinks, cvLinks };
