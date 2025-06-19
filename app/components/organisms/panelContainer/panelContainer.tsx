'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import clsx from 'clsx';
import './panelContainer.scss';

const PanelContainer = ({ id, item, className }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
  });

  return (
    <motion.section
      ref={ref}
      className={clsx('panel', className)}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
      id={id}
    >
      <h2>{item}</h2>
    </motion.section>
  );
};

export default PanelContainer;
