"use client";

import {useEffect, useRef, useState} from "react";

import {useLanguage} from "@/context/LanguageContext";
import {Button} from "@/components/ui/button";

type Review = {
    author: string;
    text: {
        cs: string;
        en: string;
    };
};

const reviews: Review[] = [
    {
        author: "Anna Novak",
        text: {
            cs: "Nasazení bylo rychlé, přehledné a bez zbytečných komplikací. Tým si šablonu dokázal upravit během jednoho odpoledne.",
            en: "The setup was fast, clear, and free of unnecessary friction. Our team adapted the template in a single afternoon.",
        },
    },
    {
        author: "Martin Kral",
        text: {
            cs: "Oceňujeme čistou strukturu a rozumné výchozí komponenty. Projekt působí připraveně pro skutečnou produkční práci.",
            en: "We appreciate the clean structure and sensible default components. The project feels ready for real production work.",
        },
    },
    {
        author: "Lucie Dvorak",
        text: {
            cs: "Uživatelské rozhraní je jednoduché, rychlé a dobře čitelné. Přesně takový základ jsme pro interní aplikaci potřebovali.",
            en: "The interface is simple, fast, and easy to scan. It was exactly the kind of foundation we needed for an internal app.",
        },
    },
    {
        author: "Petr Svoboda",
        text: {
            cs: "Design drží profesionální tón a zároveň nezdržuje vývoj. Výborný start pro SaaS prototyp i menší firemní portál.",
            en: "The design keeps a professional tone without slowing development. A strong start for a SaaS prototype or company portal.",
        },
    },
    {
        author: "Eva Horak",
        text: {
            cs: "Komponenty mají dobrý rytmus, fungují na mobilu a není potřeba je celé přepisovat. To se u šablon nestává často.",
            en: "The components have good rhythm, work on mobile, and do not need to be rewritten from scratch. That is rare in templates.",
        },
    },
    {
        author: "Tomas Urban",
        text: {
            cs: "Kód je přímočarý a snadno se čte. Nový vývojář v týmu se v projektu zorientoval během prvního dne.",
            en: "The code is straightforward and easy to read. A new developer on our team found their way around on day one.",
        },
    },
    {
        author: "Klara Vesela",
        text: {
            cs: "Stránka působí důvěryhodně a moderně. Oceňujeme, že vizuál není přeplácaný a obsah má dost prostoru.",
            en: "The page feels trustworthy and modern. We value that the visuals are not overdone and the content has room to breathe.",
        },
    },
    {
        author: "Daniel Cerny",
        text: {
            cs: "Dostali jsme pevný technický základ, který jde dobře rozšiřovat. Přechod od prototypu k aplikaci byl plynulý.",
            en: "We got a solid technical base that scales well. Moving from prototype to application was smooth.",
        },
    },
];

// ── Inline star (no heroicons dep required here) ──────────────────────────────
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

// ── Scrolling ticker strip ────────────────────────────────────────────────────
interface TickerProps {
    reviews: Review[];
    language: "cs" | "en";
    onSelect: (index: number) => void;
    /** Shared ref so the stage hover also halts the ticker */
    pauseRef: React.MutableRefObject<boolean>;
}

function Ticker({reviews, language, onSelect, pauseRef}: TickerProps) {
    const railRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const offsetRef = useRef(0);
    const SPEED = 0.55; // px per frame

    // Duplicate items for a seamless infinite loop
    const doubled = [...reviews, ...reviews];

    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;

        function tick() {
            if (!rail) return;
            if (!pauseRef.current) {
                offsetRef.current -= SPEED;
                const half = rail.scrollWidth / 2;
                if (Math.abs(offsetRef.current) >= half) offsetRef.current = 0;
                rail.style.transform = `translateX(${offsetRef.current}px)`;
            }
            rafRef.current = requestAnimationFrame(tick);
        }

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [pauseRef]);

    return (
        <div className="reviews-ticker-viewport">
            <div className="reviews-ticker-rail" ref={railRef}>
                {doubled.map((review, i) => (
                    <Button
                        variant="ghost"
                        key={`${review.author}-${i}`}
                        className="reviews-ticker-item"
                        onClick={() => onSelect(i % reviews.length)}
                        aria-label={`Jump to review by ${review.author}`}
                    >
            <span className="reviews-ticker-name">
              {review.author.split(" ")[0]}
            </span>
                        <span className="reviews-ticker-dot" aria-hidden="true"/>
                        <span className="reviews-ticker-snippet">
              {review.text[language]}
            </span>
                    </Button>
                ))}
            </div>
        </div>
    );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function ReviewsSection() {
    const {language, t} = useLanguage();
    const copy = t.reviews;

    const [current, setCurrent] = useState(0);
    const [exiting, setExiting] = useState(false);
    const pauseRef = useRef(false);

    function goTo(index: number) {
        if (index === current) return;
        setExiting(true);
        setTimeout(() => {
            setCurrent(index);
            setExiting(false);
        }, 350);
    }

    // Auto-advance
    useEffect(() => {
        const id = setInterval(() => {
            if (!pauseRef.current) {
                goTo((current + 1) % reviews.length);
            }
        }, 4500);
        return () => clearInterval(id);
    }, [current]);

    const activeReview = reviews[current];

    return (
        <section className="reviews-section">
            {/* Optional section header from your i18n copy */}
            {copy?.title && (
                <div className="site-container reviews-header">
                    {copy.eyebrow && <p className="reviews-eyebrow">{copy.eyebrow}</p>}
                    <h2 className="reviews-title">{copy.title}</h2>
                    {copy.description && (
                        <p className="reviews-description">{copy.description}</p>
                    )}
                </div>
            )}

            {/* ── Quote stage ── */}
            <div
                className="reviews-stage"   onMouseEnter={() => (pauseRef.current = true)}
                onMouseLeave={() => (pauseRef.current = false)}
            >
                <div
                    className={`reviews-quote-wrap${exiting ? " reviews-quote-exit" : ""}`}
                    aria-live="polite"
                    aria-atomic="true"
                >
          <span className="reviews-quote-mark" aria-hidden="true">
            &ldquo;
          </span>

                    <p className="reviews-quote-text">{activeReview.text[language]}</p>

                    <div className="reviews-meta">
                        <div className="reviews-stars" aria-label="5 out of 5 stars">
                            {Array.from({length: 5}).map((_, i) => (
                                <StarIcon key={i} className="reviews-star-icon"/>
                            ))}
                        </div>
                        <span className="reviews-author-line">— {activeReview.author}</span>
                    </div>
                </div>

                {/* ── Pip progress bar ── */}
                <div className="reviews-pips" role="tablist" aria-label="Reviews">
                    {reviews.map((r, i) => (
                        <Button
                            key={r.author}
                            role="tab"
                            aria-selected={i === current}
                            aria-label={`Review by ${r.author}`}
                            className={`reviews-pip${i === current ? " reviews-pip-active" : ""}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            </div>

            {/* ── Divider ── */}
            <hr className="reviews-divider"/>

            {/* ── Ticker ── */}
            <Ticker
                reviews={reviews}
                language={language}
                onSelect={goTo}
                pauseRef={false}
            />
        </section>
    );
}