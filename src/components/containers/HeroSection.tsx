import Image from "next/image";
import { RiArrowDownLine } from "react-icons/ri";
import Link from "next/link";

import { Motion } from "../utils/MotionWrapper";
import { childrenAnimation } from "../../lib/motion";
import { Typed } from "../utils/TypedWrapper";
import { getInformation } from "../../fetchers";
import SocialIcons from "../elements/SocialIcons";

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
                    // loader={imageLoader}
                    unoptimized={true}
                    src={data.thumbImage}
                    alt={data.fullName}
                    height={200}
                    width={200}
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
          {scroll ? (
            <Motion
              type="div"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 }}
              variants={childrenAnimation}
              className="herosection-bottom absolute left-0 top-auto bottom-10 w-full justify-between text-center"
            >
              <Link
                href="/#section-about"
                className="flex cursor-pointer items-center justify-center text-xs font-medium uppercase tracking-widest transition-all hover:text-primary"
              >
                <RiArrowDownLine className="inline animate-bounce text-base" />
                <span className="pl-2">Scroll Down</span>
              </Link>
            </Motion>
          ) : null}
        </div>
      </div>
    </div>
  );
};
