"use client";
import React, { useRef, useState, useEffect } from "react";
import { m, useInView, useSpring } from "framer-motion";
import { motion } from "framer-motion";
export const Cardsanim = ({ children, klass, staggerspeed }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: "some", once: true });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: staggerspeed ? staggerspeed : 0.35 },
        },
      }}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={klass}
    >
      {children}
    </motion.div>
  );
};

export default Cardsanim;

export const Staggeranim = ({ children, klass }) => {
  return (
    <motion.div
      initial={{opacity: 0, rotate: 2}}
      animate={{opacity: 1, rotate: 0}}
      variants={{
        hidden: { opacity: 0, rotate: 2 },
        show: { opacity: 1, rotate: 0 },
      }}
      transition={{ duration: 1 }}
      className={klass}
    >
      {children}
    </motion.div>
  );
};

export const Slidefromleft = ({ children, klass }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, translateX: "-50px" },
        show: { opacity: 1, translateX: 0 },
      }}
      transition={{ duration: 1.2 }}
      className={klass}
    >
      {children}
    </motion.div>
  );
};

export const Staggeranimstyletwo = ({ children, klass }) => {
  return (
    <motion.div
      initial={{opacity: 0, rotate: 0.85}}
      animate={{opacity: 1, rotate: 0}}
      variants={{
        hidden: { opacity: 0, scale: 0.85 },
        show: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 1.2 }}
      className={klass}
    >
      {children}
    </motion.div>
  );
};

export const Staggeranimstylethree = ({ children, klass, viewspeed }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
      animate={inView ? "show" : "hidden"}
      transition={{ duration: viewspeed ? viewspeed : 1.2 }}
      className={klass}
    >
      {children}
    </motion.div>
  );
};

export const Drawsvg = ({ children, klass }) => {
  return (
    <motion.div
      initial={{ clipPath: "polygon(0 0, 100% 0, 100% 65%, 0 65%)" }}
      whileInView={{
        clipPath: "polygon(0 0, 0 65%, 50% 98%, 100% 65%, 100% 0)",
      }}
      transition={{ duration: 5.5 }}
      className={klass}
    >
      {children}
    </motion.div>
  );
};

export const RunningNumbers = ({ number, prefix, addition }) => {
  const [displaySubs, setDisplaySubs] = useState(0);

  const springSubCount = useSpring(0, {
    bounce: 0,
    duration: 3000,
  });

  springSubCount.on("change", (value) => {
    setDisplaySubs(Math.round(value));
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      springSubCount.set(number);
    }
  }, [isInView, number, springSubCount]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.5, delay: 0.2 }}
    >
      {prefix}
      {displaySubs}
      {addition}
    </motion.div>
  );
};
