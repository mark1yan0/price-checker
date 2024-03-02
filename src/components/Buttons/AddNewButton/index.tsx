'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const buttonAnimation = {
  rest: {
    scale: 1,
  },
  hovering: {
    scale: 2,
  },
};

const svgAnimation = {
  rest: {
    rotate: 0,
  },
  hovering: {
    rotate: 360,
  },
};

const AddNewButton = () => {
  return (
    <motion.div
      variants={buttonAnimation}
      className="-bg--color-primary-300 fixed bottom-5 left-[50%] rounded-full"
      whileTap={{
        scale: 1.8,
      }}
      initial="rest"
      whileHover="hovering"
    >
      <Link className="block h-full w-full p-3" href="/brands/new">
        <motion.svg
          variants={svgAnimation}
          initial="rest"
          whileHover="hovering"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          stroke="white"
          className="stroke-1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </motion.svg>
      </Link>
    </motion.div>
  );
};

export default AddNewButton;
