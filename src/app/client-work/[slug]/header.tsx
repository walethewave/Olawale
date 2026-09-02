'use client';

import { motion } from 'framer-motion';

import { ClientProject } from '@/types/client-project';
import { Badge } from '@/components/ui/badge';
import ArchitectureDeckLink from '@/components/architecture-deck-link';
import React from 'react';

const animation = {
  hide: {
    x: -30,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1
  }
};

type HeaderProps = {
  metadata: ClientProject & { architectureDeck?: string };
};

const Header = (props: HeaderProps) => {
  const {
    metadata: { title, description, industry, role, tags, architectureDeck }
  } = props;

  return (
    <div className="space-y-8 pt-10">
      <motion.div
        className="flex items-center gap-3"
        initial={animation.hide}
        animate={animation.show}
      >
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-bold">{title}</div>
          <div>{description}</div>
        </div>
      </motion.div>
      <motion.div
        className="flex flex-wrap items-center gap-2"
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        {industry && <Badge variant="secondary">{industry}</Badge>}
        {role && <Badge variant="secondary">{role}</Badge>}
      </motion.div>
      {architectureDeck && (
        <motion.div
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.15 }}
        >
          <ArchitectureDeckLink href={architectureDeck} />
        </motion.div>
      )}
      <motion.div
        className="mt-2 flex flex-wrap gap-2"
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        {tags?.map((tag, index) => (
          <Badge key={`client-project-tag_${index}`}>{tag.label}</Badge>
        ))}
      </motion.div>
    </div>
  );
};
export default Header;
