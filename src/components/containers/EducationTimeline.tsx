import { RiBookLine } from "react-icons/ri";

import { Motion } from "../utils/MotionWrapper";
import { getEducationBackground } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import TimelineItem from "../elements/TimelineItem";

const EducationTimeline = async () => {
  const data = await getEducationBackground();

  if (!data) return null;

  return (
    <div className="education-timeline">
      <h4>
        <RiBookLine className="mr-2 inline-block text-primary" />
        Degree & Education
      </h4>
      {data?.map((timeline, index) => (
        <Motion
          type="div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className="timeline-wrap"
          key={timeline.id}
        >
          <TimelineItem timeline={timeline} />
        </Motion>
      ))}
    </div>
  );
};

export default EducationTimeline;
