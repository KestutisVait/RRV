
'use client';
import style from "./intro.module.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Intro({ children }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!showContent && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 3, ease: "easeInOut" }}
          className={style.wrapper}
        >
          <p>intro animation</p>
        </motion.div>
      )}
      {showContent && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
