import { Motion } from "../utils/MotionWrapper";
import { getTechskills } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import ProgressCircle from "../elements/ProgressCircle";

const TechSkills = async () => {
  const data = await getTechskills();

  if (!data) return null;

  return (
    <div className="grid grid-cols-3 gap-7">
      {data?.map((skill, index) => (
        <Motion
          type="div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className="col-span-3 lg:col-span-1"
          key={skill.id}
          whileHover={{
            scale: 1.1,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
              // delay: 0.2 * index,
            },
          }}
        >
          <ProgressCircle skill={skill} />
        </Motion>
      ))}
    </div>
  );
};

export default TechSkills;
