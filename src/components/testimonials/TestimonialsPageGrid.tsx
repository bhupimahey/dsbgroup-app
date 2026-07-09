import Image from 'next/image';
import type { TextTestimonial, VideoTestimonial } from '@/lib/site/testimonials-content';

function StarRating() {
  return (
    <ul className="testimonials-stars" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3].map((star) => (
        <li key={star}>
          <span className="testimonials-star testimonials-star--filled" aria-hidden>
            ★
          </span>
        </li>
      ))}
      <li>
        <span className="testimonials-star testimonials-star--muted" aria-hidden>
          ★
        </span>
      </li>
    </ul>
  );
}

function QuoteIcon() {
  return (
    <div className="testimonials-quote-icon" aria-hidden>
      <svg viewBox="0 0 40 40" width="40" height="40">
        <path
          fill="currentColor"
          d="M8 22c0-5.5 2.2-10 6.6-13.5L12 6C5.4 10.8 2 17.2 2 25v9h12V22H8zm20 0c0-5.5 2.2-10 6.6-13.5L32 6c-6.6 4.8-10 11.2-10 19v9h12V22H28z"
        />
      </svg>
    </div>
  );
}

type Props = {
  videos: VideoTestimonial[];
  reviews: TextTestimonial[];
};

export default function TestimonialsPageGrid({ videos, reviews }: Props) {
  return (
    <>
      <section className="testimonials-page-section testimonials-page-section--videos">
        <div className="theme-inner-container">
          <h2 className="testimonials-page-heading">Video Testimonials</h2>
          <p className="testimonials-page-intro">
            Hear directly from clients on NBFC licensing, corporate advisory, and regulatory compliance.
          </p>

          <div className="testimonials-grid testimonials-grid--videos">
            {videos.map((video) => (
              <article key={video.embedUrl} className="testimonials-video-card">
                <div className="testimonials-video-frame">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="testimonials-video-title">{video.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-page-section testimonials-page-section--reviews">
        <div className="theme-inner-container">
          <h2 className="testimonials-page-heading">Testimonials From Our Valued Clients</h2>

          <div className="testimonials-grid testimonials-grid--reviews">
            {reviews.map((review) => (
              <article key={`${review.name}-${review.role}`} className="testimonials-text-card">
                <QuoteIcon />
                <StarRating />
                <p className="testimonials-quote">“{review.quote}”</p>
                <div className="testimonials-divider" />
                <div className="testimonials-author">
                  {review.imagePath ? (
                    <Image
                      src={review.imagePath}
                      alt=""
                      width={60}
                      height={60}
                      className="testimonials-avatar testimonials-avatar--photo"
                    />
                  ) : (
                    <div className="testimonials-avatar" aria-hidden />
                  )}
                  <div>
                    <p className="testimonials-name">{review.name}</p>
                    <p className="testimonials-role">{review.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
