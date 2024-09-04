import { RiBriefcaseLine } from "react-icons/ri";

import { Motion } from "../utils/MotionWrapper";
import { getJobExperience } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import TimelineItem from "../elements/TimelineItem";

type Job = {
  id: string;
  title: string;
  meta: string;
  text: string;
  year: string;
};

const JobTimeline = async () => {
  const data: Array<Job> = await getJobExperience();

  if (!data) return null;

  return (
    <div className="job-experience">
      <h4>
        <RiBriefcaseLine className="mr-2 inline-block text-primary" />
        Work Experience
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

export default JobTimeline;
