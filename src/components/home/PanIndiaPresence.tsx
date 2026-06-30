import { OFFICE_LOCATIONS } from '@/lib/site/nav-links';

export default function PanIndiaPresence() {
  return (
    <section
      className="home2-pan-india"
      aria-label="Our locations"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="home2-container">
        <div className="home2-pan-india-locations">
          <span className="home2-pan-india-label">Our Location</span>
          <ul className="home2-pan-india-cities">
            {OFFICE_LOCATIONS.map((city, index) => (
              <li key={city}>
                {index > 0 ? <span className="home2-pan-india-sep" aria-hidden>|</span> : null}
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
