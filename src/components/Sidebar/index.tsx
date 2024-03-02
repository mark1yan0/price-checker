'use client';

import { AnimatePresence, motion } from 'framer-motion';
import CloseButton from './CloseButton';

const Sidebar = ({
  opened,
  onClose,
  children,
}: {
  opened: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence initial={false}>
      {opened ? (
        <motion.div
          aria-hidden="true"
          className="-bg--color-surface-200 absolute right-0 top-0 z-50 h-full min-w-full p-4 md:min-w-[500px]"
          initial={{
            x: '100%',
          }}
          animate={{ x: 0, transition: { bounce: 0, duration: 0.3 } }}
          exit={{ x: '100%' }}
        >
          <div className="flex w-full justify-end">
            <CloseButton onClick={onClose} />
          </div>
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Sidebar;
