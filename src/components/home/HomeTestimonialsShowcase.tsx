'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { TextTestimonial, VideoTestimonial } from '@/lib/site/testimonials-content';

export type { TextTestimonial, VideoTestimonial };

type HomeTestimonialsShowcaseProps = {
  videos: VideoTestimonial[];
  reviews: TextTestimonial[];
};

function CarouselControls({
  label,
  index,
  total,
  onPrev,
  onNext,
}: {
  label: string;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="home2-testimonial-controls">
      <button type="button" className="home2-testimonial-nav" onClick={onPrev} aria-label={`Previous ${label}`}>
        ‹
      </button>
      <span className="home2-testimonial-counter" aria-live="polite">
        {index + 1} / {total}
      </span>
      <button type="button" className="home2-testimonial-nav" onClick={onNext} aria-label={`Next ${label}`}>
        ›
      </button>
    </div>
  );
}

export default function HomeTestimonialsShowcase({ videos, reviews }: HomeTestimonialsShowcaseProps) {
  const [videoIndex, setVideoIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    if (videos.length <= 1) return undefined;
    const timer = setInterval(() => {
      setVideoIndex((current) => (current + 1) % videos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [videos.length]);

  useEffect(() => {
    if (reviews.length <= 1) return undefined;
    const timer = setInterval(() => {
      setReviewIndex((current) => (current + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const activeVideo = videos[videoIndex];
  const activeReview = reviews[reviewIndex];

  return (
    <div className="home2-testimonial-split">
      <div className="home2-testimonial-video-panel">
        <p className="home2-testimonial-panel-label">Video testimonials</p>
        <div className="home2-testimonial-video-frame">
          <iframe
            key={activeVideo.embedUrl}
            src={activeVideo.embedUrl}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="home2-testimonial-video-title">{activeVideo.title}</p>
        <CarouselControls
          label="video testimonial"
          index={videoIndex}
          total={videos.length}
          onPrev={() => setVideoIndex((current) => (current - 1 + videos.length) % videos.length)}
          onNext={() => setVideoIndex((current) => (current + 1) % videos.length)}
        />
      </div>

      <div className="home2-testimonial-review-panel">
        <p className="home2-testimonial-panel-label">Client reviews</p>
        <article className="home2-testimonial-card home2-testimonial-card--carousel">
          <p className="home2-testimonial-quote">“{activeReview.quote}”</p>
          <div className="home2-testimonial-author">
            {activeReview.imagePath ? (
              <Image
                src={activeReview.imagePath}
                alt=""
                width={60}
                height={60}
                className="home2-testimonial-avatar home2-testimonial-avatar--photo"
              />
            ) : (
              <div className="home2-testimonial-avatar" />
            )}
            <div>
              <p className="home2-testimonial-name">{activeReview.name}</p>
              <p className="home2-testimonial-role">{activeReview.role}</p>
            </div>
          </div>
        </article>
        <CarouselControls
          label="client review"
          index={reviewIndex}
          total={reviews.length}
          onPrev={() => setReviewIndex((current) => (current - 1 + reviews.length) % reviews.length)}
          onNext={() => setReviewIndex((current) => (current + 1) % reviews.length)}
        />
      </div>
    </div>
  );
}
