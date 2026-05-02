"use client";

import { useRef } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { SectionHeader } from "@/components/sections/SectionHeader";
import {
  REVIEW_AUTOPLAY_DELAY_MS,
  REVIEW_ITEMS,
  REVIEW_RATING,
  REVIEWS_URL,
} from "@/constants/reviews";
import { useLanguage } from "@/context/LanguageContext";

import "swiper/css";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function ReviewsSection() {
  const { language, t } = useLanguage();
  const reviews = t.reviews;
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="reviews-section">
      <SectionHeader
        eyebrow={reviews?.eyebrow}
        title={reviews?.title}
        description={reviews?.description}
        className="reviews-header"
      />

      <div className="reviews-stage">
        {/* ── Vertical swiper ── */}
        <Swiper
          className="reviews-swiper"
          modules={[Autoplay, Pagination]}
          direction="vertical"
          loop
          autoplay={{
            delay: REVIEW_AUTOPLAY_DELAY_MS,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {REVIEW_ITEMS.map((review) => (
            <SwiperSlide key={review.author}>
              <div className="reviews-quote-wrap">
                <span className="reviews-quote-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="ui-subtitle">{review.text[language]}</p>
                <div className="reviews-meta">
                  <div className="reviews-stars" aria-label="5 out of 5 stars">
                    {Array.from({ length: REVIEW_RATING }).map((_, i) => (
                      <StarIcon key={i} className="reviews-star-icon" />
                    ))}
                  </div>
                  <span className="reviews-author-line">— {review.author}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <a
          className="reviews-all-link"
          href={REVIEWS_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>{reviews.moreLink}</span>
          <ArrowTopRightOnSquareIcon aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
