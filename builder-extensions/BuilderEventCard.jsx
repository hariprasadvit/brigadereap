"use client";

import React, { useState, useRef } from "react";

export default function BuilderEventCard({ event }) {
  const { title, subtitle, excerpt, images = [], website, tickets } = event;
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const dist = touchStartX.current - touchEndX.current;
    const threshold = 40; // px
    if (dist > threshold) next();
    else if (dist < -threshold) prev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <article className="builder-event-card" aria-labelledby={`event-${event.id}-title`}>
      <div
        className="builder-event-media"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images && images.length > 0 && (
          <img
            src={images[index].src}
            alt={images[index].alt || `${title} image ${index + 1}`}
            className="builder-event-image"
            loading="lazy"
          />
        )}

        <div className="builder-carousel-controls">
          <button
            aria-label="Previous"
            className="builder-carousel-btn"
            onClick={prev}
          >
            ‹
          </button>
          <div className="builder-carousel-dots" aria-hidden>
            {images.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            aria-label="Next"
            className="builder-carousel-btn"
            onClick={next}
          >
            ›
          </button>
        </div>
      </div>

      <div className="builder-event-body">
        <h3 id={`event-${event.id}-title`} className="builder-event-card-title">
          {title}
        </h3>
        <p className="builder-event-card-subtitle">{subtitle}</p>
        <p className="builder-event-card-excerpt">{excerpt}</p>

        <div className="builder-event-actions">
          <a
            className="builder-btn builder-btn-secondary"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
          <a
            className="builder-btn builder-btn-primary"
            href={tickets}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Tickets
          </a>
        </div>
      </div>
    </article>
  );
}
