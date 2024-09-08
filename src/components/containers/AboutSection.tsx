import Image from "next/image";
import { childrenAnimation } from "../../lib/motion";
import { getInformation } from "../../fetchers";

import { Motion } from "../utils/MotionWrapper";
import { shimmer, toBase64 } from "src/lib/utils";

const AboutSection = async () => {
  const data = await getInformation();

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 items-center gap-7">
      <div className="col-span-2 lg:col-span-1">
        <Motion
          type="div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          variants={childrenAnimation}
          className="about-image overflow-hidden rounded-lg"
        >
          <div className="about-image-inner fiximage relative border-10 border-primary border-opacity-20">
            <span className="absolute -top-2.5 left-0 z-10 h-2.5 w-10 animate-ledgerleftright rounded-full bg-gradient-to-r from-transparent to-primary"></span>
            <span className="absolute top-auto -bottom-2.5 left-auto z-10 h-2.5 w-10 animate-ledgerrightleft rounded-full bg-gradient-to-r from-primary to-transparent"></span>
            <span className="absolute -left-2.5 top-auto z-10 h-10 w-2.5 animate-ledgerbottomtop rounded-full bg-gradient-to-t from-transparent to-primary"></span>
            <span className="absolute left-auto -right-2.5 z-10 h-10 w-2.5 animate-ledgertopbottom rounded-full bg-gradient-to-b from-transparent to-primary"></span>
            <Image
              src={data.largeImage}
              height={720}
              width={1090}
              alt={data.fullName}
              objectFit="cover"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(1090, 720)
              )}`}
            />
          </div>
        </Motion>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <Motion
          type="div"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          variants={childrenAnimation}
          className="about-content"
        >
          <h3>
            Hi, I am <span className="text-primary">{data.fullName}</span>
          </h3>
          <ul className="styledlist">
            {data.firstName && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  First Name{" "}
                </strong>
                : {data.firstName}
              </li>
            )}
            {data.lastName && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Last Name{" "}
                </strong>
                : {data.lastName}
              </li>
            )}
            {data.languages.length ? (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Languages{" "}
                </strong>
                : {data.languages.join(", ")}
              </li>
            ) : null}
            {data.experience.length ? (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Experience{" "}
                </strong>
                :{" "}
                {new Date().getFullYear() -
                  new Date(data.experience).getFullYear()}
                + years
              </li>
            ) : null}
            {data.location && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Location{" "}
                </strong>
                : {data.location}
              </li>
            )}
            {data.freelance && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Freelance{" "}
                </strong>
                : {data.freelance}
              </li>
            )}
          </ul>
          <a href="/resume.pdf" className="btn mt-3">
            <span>Download Resume</span>
          </a>
        </Motion>
      </div>
    </div>
  );
};

export default AboutSection;
