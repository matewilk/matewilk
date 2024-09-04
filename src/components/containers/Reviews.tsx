"use client";
import { useCallback, useRef } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import Review from "../elements/Review";

type Review = {
  id: string;
  name: string;
  meta: string;
  givenreview: string;
  image: string;
  text: string;
};

type Props = {
  data: Array<Review>;
};

export const Reviews = ({ data }: Props) => {
  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className="swiper-holder">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={28}
        slidesPerView={3}
        autoplay={{
          delay: 4000,
        }}
        centerInsufficientSlides={true}
        ref={sliderRef}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {data?.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="slider-item">
              <Review review={review} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-prev" onClick={handlePrev}></button>
      <button className="swiper-button-next" onClick={handleNext}></button>
    </div>
  );
};
