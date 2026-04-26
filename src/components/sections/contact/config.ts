import { Contact } from '@/types/contact';
import {
  SiGithub,
  SiLinkedin,
  SiX
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
      href: 'https://www.linkedin.com/in/olawale-goodluck-691114255/',
      Icon: SiLinkedin
    }
  ]
};

export { contact };
