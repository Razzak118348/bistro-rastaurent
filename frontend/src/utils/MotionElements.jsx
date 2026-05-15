import { motion } from "framer-motion";

// Motion H2 Component
export const MotionH2 = ({ text, className = "", duration = 0.8, ...props }) => (
  <motion.h2
    initial={{ opacity: 0, y: -40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration }}
    {...props}
    className={`text-center text-lg md:text-2xl font-bold ${className}`}
  >
    {text}
  </motion.h2>
);
// Motion H1 Component
export const MotionH1 = ({ text, className = "", duration = 0.8, ...props }) => (
  <motion.h1
    initial={{ opacity: 0, y: -40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration }}
    {...props}
    className={`text-center text-lg md:text-2xl font-bold ${className}`}
  >
    {text}
  </motion.h1>
);


// Motion Paragraph Component
export const MotionP = ({ children, className = "", duration = 0.8, delay = 0, ...props }) => (
  <motion.p
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration, delay }}
    {...props}
    className={`text-base leading-relaxed ${className}`}
  >
    {children}
  </motion.p>
);

// Motion Div Component
export const MotionDiv = ({ children, className = "", duration = 0.8, delay = 0, y = 50, x = 0, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    transition={{ duration, delay }}
    {...props}
    className={className}
  >
    {children}
  </motion.div>
);

// Motion Span Component
export const MotionSpan = ({ children, className = "", duration = 0.8, delay = 0, y = 50, x = 0, ...props }) => (
  <motion.span
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    transition={{ duration, delay }}
    {...props}
    className={className}
  >
    {children}
  </motion.span>
);