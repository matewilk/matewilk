"use client";
import { FC } from "react";
import { Link as ScrollLink } from "react-scroll";
import { RiArrowDownLine } from "react-icons/ri";

import { childrenAnimation } from "src/lib/motion";
import { Motion } from "../utils/MotionWrapper";

export const ScrollDownBtn: FC = () => {
  return (
    <Motion
      type="div"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.8 }}
      variants={childrenAnimation}
      className="herosection-bottom absolute left-0 top-auto bottom-10 w-full justify-between text-center"
    >
      <ScrollLink
        to="section-about"
        spy={true}
        smooth="easeInQuad"
        offset={-74}
        duration={1000}
        className="flex cursor-pointer items-center justify-center text-xs font-medium uppercase tracking-widest transition-all hover:text-primary"
      >
        <RiArrowDownLine className="inline animate-bounce text-base" />
        <span className="pl-2">Scroll Down</span>
      </ScrollLink>
    </Motion>
  );
};
