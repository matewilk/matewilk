import { getServices } from "../../fetchers";
import { Motion } from "../utils/MotionWrapper";
import { childrenAnimation } from "../../lib/motion";
import Service from "../elements/Service";

const ServicesSection = async () => {
  const data = await getServices();

  if (!data) return null;

  return (
    <div className="services-wrapper grid grid-cols-3 gap-7">
      {data?.map((service, index) => (
        <Motion
          type="div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className="col-span-3 lg:col-span-1"
          key={service.id}
        >
          <Service service={service} />
        </Motion>
      ))}
    </div>
  );
};

export default ServicesSection;
