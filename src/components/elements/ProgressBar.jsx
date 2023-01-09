import { motion } from "framer-motion";

const ProgressBar = ({ skill: { title, percentage } }) => {
  return (
    <div className="progress">
      <h5>{title}</h5>
      <div className="progress-bar relative h-2 w-full rounded-full bg-primary bg-opacity-20">
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          variants={{
            visible: { scaleX: 1, originX: 0 },
            hidden: { scaleX: 0, originX: 0 },
          }}
          className="progress-progress absolute left-0 top-0 h-full rounded-full bg-primary"
          style={{ width: `${percentage}%` }}
        ></motion.span>
      </div>
    </div>
  );
};

export default ProgressBar;
