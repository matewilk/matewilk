import { Motion } from "../utils/MotionWrapper";
import { getLanguageskills } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import ProgressBar from "../elements/ProgressBar";

const LanguageSkills = async () => {
  const data = await getLanguageskills();

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-7">
      {data?.map((skill, index) => (
        <Motion
          type="div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{
            scale: 1.05,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
              delay: 0,
              duration: 1,
            },
          }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className="col-span-2 md:col-span-1"
          key={skill.id}
        >
          <ProgressBar skill={skill} />
        </Motion>
      ))}
    </div>
  );
};

export default LanguageSkills;
