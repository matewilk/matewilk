import Image from "next/image";

import { Motion } from "../utils/MotionWrapper";
import { childrenAnimation } from "../../lib/motion";
import { Typed } from "../utils/TypedWrapper";
import { getInformation } from "../../fetchers";
import SocialIcons from "../elements/SocialIcons";
import { ScrollDownBtn } from "../elements/ScrollDownBtn";
import { shimmer, toBase64 } from "src/lib/utils";

export const HeroSection = async ({
  blurred = true,
  scroll = true,
  typed = true,
}) => {
  const data = await getInformation();

  if (!data) return null;

  return (
    <div className="herosection relative overflow-hidden">
      {!blurred && (
        <div className="herosection-bg absolute left-0 top-0 h-full w-full"></div>
      )}
      <div
        className={`herosection-content relative z-20 bg-grey-darken  ${
          blurred ? "bg-opacity-20" : "bg-opacity-90"
        }`}
      >
        <div className="container relative mx-auto">
          <div className="flex min-h-screen w-full items-center justify-center">
            <div className="herosection-content w-full py-20 text-center md:w-3/4">
              <Motion
                type="div"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                variants={childrenAnimation}
                className="herosection-imagewrapper relative mb-5 inline-block overflow-hidden rounded-full align-middle"
              >
                <span className="herosection-imageanimation absolute left-0 top-0 z-10 h-full w-full animate-spin rounded-full bg-gradient-to-tr from-primary to-transparent"></span>
                <div className="herosection-image fiximage relative z-20 inline-block h-[150px] w-[150px] overflow-hidden rounded-full border-6 border-primary border-opacity-10 align-middle">
                  <Image
                    src={data.thumbImage}
                    alt={data.fullName}
                    height={200}
                    width={200}
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(200, 200)
                    )}`}
                  />
                </div>
              </Motion>
              <Motion
                type="h1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                variants={childrenAnimation}
                className="mb-5 text-heading"
              >
                <span className="block sm:inline">Hi, I am</span>{" "}
                {typed ? (
                  <Typed
                    loop
                    typeSpeed={100}
                    backSpeed={20}
                    backDelay={2000}
                    strings={[data.fullName, "a Full-Stack Developer"]}
                    className="text-primary"
                  />
                ) : (
                  <span className="text-primary">{data.fullName}</span>
                )}
              </Motion>
              <Motion
                type="p"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                variants={childrenAnimation}
                className="lead mb-0"
              >
                {data.bio}
              </Motion>
              <Motion
                type="div"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                variants={childrenAnimation}
                className="herosection-socialicons mt-7 text-center"
              >
                <SocialIcons data={data.socialAddress} rounded={false} />
              </Motion>
            </div>
          </div>
          {scroll ? <ScrollDownBtn /> : null}
        </div>
      </div>
    </div>
  );
};
