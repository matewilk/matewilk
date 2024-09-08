"use client";
import { useState } from "react";
import Scroll from "react-scroll";
import { RiArrowUpSLine } from "react-icons/ri";

import { Motion } from "../utils/MotionWrapper";
import useEventListener from "../../hooks/useEventListener";

export const ScrollToTopBtn = () => {
  const [backToTop, setBackToTop] = useState(false);

  const scroll = Scroll.animateScroll;

  const isVisible = () => {
    const scrollTop = window.scrollY;
    scrollTop > 50 ? setBackToTop(true) : setBackToTop(false);
  };

  useEventListener("scroll", isVisible);

  return (
    <Motion
      type="button"
      initial={{
        opacity: 1,
        x: 1000,
      }}
      animate={{
        opacity: backToTop ? 1 : 0,
        x: backToTop ? 0 : 1000,
      }}
      className="btn fixed bottom-12 left-auto top-auto right-7 z-30 rounded-full p-2.5 text-xl"
      onClick={() => scroll.scrollToTop()}
    >
      <RiArrowUpSLine />
    </Motion>
  );
};
