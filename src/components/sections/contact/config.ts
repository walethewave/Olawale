import { Contact } from '@/types/contact';
import {
  SiGithub,
  SiLinkedin,
  SiX,
  SiWhatsApp
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
      name: 'Whatsapp',
      href: 'https://wa.me/+2347037374036',
      Icon: SiWhatsApp
    },
    {
      name: 'X',
      href: 'https://x.com/Dreykin5',
      Icon: SiX
    },
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/in/olawale-goodluck-691114255/',
      Icon: SiLinkedin
    }
  ]
};

export { contact };
