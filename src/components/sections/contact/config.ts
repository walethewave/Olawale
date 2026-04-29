import { Contact } from '@/types/contact';
import {
  SiGithub,
  SiLinkedin,
  SiX,
  SiTiktok
} from '@icons-pack/react-simple-icons';

const contact: Contact = {
  email: 'lekanolawale477@gmail.com',
  socials: [
    {
      name: 'Github',
      href: 'https://github.com/walethewave',
      Icon: SiGithub
    },
    {
      name: 'X',
      href: 'https://x.com/Dreykin5',
      Icon: SiX
    },
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/in/olawale-afolabi-691114255/',
      Icon: SiLinkedin
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@data_withwale',
      Icon: SiTiktok
    }
  ]
};

export { contact };
