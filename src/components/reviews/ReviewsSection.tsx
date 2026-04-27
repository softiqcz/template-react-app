"use client";

import { useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import type {Swiper as SwiperType} from "swiper";

import {useLanguage} from "@/context/LanguageContext";

import "swiper/css";

type Review = {
    author: string;
    text: {
        cs: string;
        en: string;
    };
};

const reviews: Review[] = [
    {
        author: "Anna",
        text: {
            cs: "Nasazení bylo rychlé, přehledné a bez zbytečných komplikací. Tým si šablonu dokázal upravit během jednoho odpoledne.",
            en: "The setup was fast, clear, and free of unnecessary friction. Our team adapted the template in a single afternoon.",
        },
    },
    {
        author: "Martin",
        text: {
            cs: "Oceňujeme čistou strukturu a rozumné výchozí komponenty. Projekt působí připraveně pro skutečnou produkční práci.",
            en: "We appreciate the clean structure and sensible default components. The project feels ready for real production work.",
        },
    },
    {
        author: "Lucie",
        text: {
            cs: "Uživatelské rozhraní je jednoduché, rychlé a dobře čitelné. Přesně takový základ jsme pro interní aplikaci potřebovali.",
            en: "The interface is simple, fast, and easy to scan. It was exactly the kind of foundation we needed for an internal app.",
        },
    },
    {
        author: "Petr",
        text: {
            cs: "Design drží profesionální tón a zároveň nezdržuje vývoj. Výborný start pro SaaS prototyp i menší firemní portál.",
            en: "The design keeps a professional tone without slowing development. A strong start for a SaaS prototype or company portal.",
        },
    },
    {
        author: "Eva",
        text: {
            cs: "Komponenty mají dobrý rytmus, fungují na mobilu a není potřeba je celé přepisovat. To se u šablon nestává často.",
            en: "The components have good rhythm, work on mobile, and do not need to be rewritten from scratch. That is rare in templates.",
        },
    },
    {
        author: "Tomáš",
        text: {
            cs: "Kód je přímočarý a snadno se čte. Nový vývojář v týmu se v projektu zorientoval během prvního dne.",
            en: "The code is straightforward and easy to read. A new developer on our team found their way around on day one.",
        },
    },
    {
        author: "Nikola",
        text: {
            cs: "Stránka působí důvěryhodně a moderně. Oceňujeme, že vizuál není přeplácaný a obsah má dost prostoru.",
            en: "The page feels trustworthy and modern. We value that the visuals are not overdone and the content has room to breathe.",
        },
    },
    {
        author: "Daniel",
        text: {
            cs: "Dostali jsme pevný technický základ, který jde dobře rozšiřovat. Přechod od prototypu k aplikaci byl plynulý.",
            en: "We got a solid technical base that scales well. Moving from prototype to application was smooth.",
        },
    },
];

function StarIcon({className}: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            style={{fill: "currentColor"}}
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
    );
}

export function ReviewsSection() {
    const {language, t} = useLanguage();
    const copy = t.reviews;
    const swiperRef = useRef<SwiperType | null>(null);
    const [current, setCurrent] = useState(0);

    return (
        <section className="reviews-section">
            {copy?.title && (
                <div className="site-container reviews-header">
                    {copy.eyebrow && <p className="reviews-eyebrow">{copy.eyebrow}</p>}
                    <h2 className="reviews-title">{copy.title}</h2>
                    {copy.description && (
                        <p className="reviews-description">{copy.description}</p>
                    )}
                </div>
            )}

            <div className="reviews-stage">
                {/* ── Vertical swiper ── */}
                <Swiper
                    className="reviews-swiper"
                    modules={[Autoplay, Pagination]}
                    direction="vertical"
                    loop
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.author}>
                            <div className="reviews-quote-wrap">
                                <span className="reviews-quote-mark" aria-hidden="true">&ldquo;</span>
                                <p className="ui-subtitle">{review.text[language]}</p>
                                <div className="reviews-meta">
                                    <div className="reviews-stars" aria-label="5 out of 5 stars">
                                        {Array.from({length: 5}).map((_, i) => (
                                            <StarIcon key={i} className="reviews-star-icon"/>
                                        ))}
                                    </div>
                                    <span className="reviews-author-line">— {review.author}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}