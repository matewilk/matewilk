"use client";
import { useCallback, useRef, useState, useEffect } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import BlogTile from "../elements/BlogTile";
import { Spinner } from "../utils";

const BlogSection = ({ blogs }) => {
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef<SwiperRef>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  if (!mounted)
    return (
      <div className="block py-20 text-center">
        <Spinner />
      </div>
    );
  if (!blogs) return null;

  return (
    <div className="swiper-holder">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={28}
        slidesPerView={3}
        autoplay={{
          delay: 5000,
        }}
        centerInsufficientSlides={true}
        ref={sliderRef}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {blogs &&
          blogs.map((blog, index) => (
            <SwiperSlide key={index}>
              <div className="slider-item">
                <BlogTile
                  {...{
                    ...blog,
                    slug: blog._raw.sourceFileName.replace(".md", ""),
                    type: "blog",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <button className="swiper-button-prev" onClick={handlePrev}></button>
      <button className="swiper-button-next" onClick={handleNext}></button>
    </div>
  );
};

export default BlogSection;
