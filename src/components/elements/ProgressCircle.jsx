import { motion } from "framer-motion";
import { ReactSVG } from "react-svg";

import { childrenAnimation } from "../../lib/motion";

const ProgressCircle = ({ skill: { title, percentage, icon } }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: percentage / 100,
      opacity: 1,
    },
  };
  return (
    <div className="circleprogress card hovercard relative p-4 text-center md:p-5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.6 }}
        variants={childrenAnimation}
        className="relative mb-2 inline-block text-primary"
      >
        <motion.svg
          className="circle"
          width="120"
          height="120"
          viewBox="0 0 120 120"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.circle
            className="circlebg"
            cx="60"
            cy="60"
            r="54"
            pathLength="1"
            strokeLinecap="round"
            strokeWidth={8}
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            strokeLinecap="round"
            strokeWidth={8}
            variants={draw}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.svg>
        <span className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 transform text-center text-xl text-body">
          <ReactSVG
            className="fill-current text-primary"
            src={icon}
            beforeInjection={(svg) => {
              svg.setAttribute("height", "auto");
              svg.setAttribute("width", "auto");
              svg.setAttribute("fill", "currentColor");
            }}
          />
        </span>
      </motion.div>
      <h5>{title}</h5>
    </div>
  );
};

export default ProgressCircle;
