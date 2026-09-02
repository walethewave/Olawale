import Link from 'next/link';
import { PresentationIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ArchitectureDeckLinkProps {
  href?: string;
}

export default function ArchitectureDeckLink({
  href
}: ArchitectureDeckLinkProps) {
  if (!href) return null;

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: 'outline' }), 'group')}
      target="_blank"
      download
    >
      <PresentationIcon className="mr-2 size-4" />
      Solution Architecture Deck
    </Link>
  );
}
