import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import styles from './BreadcrumbBanner.module.css';

/* ── Sub-components ── */
function BannerBackground({ bgVideo, bgImage }) {
  if (!bgVideo) return null;

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className={styles.bgVideo}
      poster={bgImage}
    >
      <source src={bgVideo} type="video/mp4" />
    </video>
  );
}

function BreadcrumbTrail({ breadcrumbs }) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <nav className={styles.breadcrumbNav}>
      <ul className={styles.breadcrumbList}>
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {crumb.link ? (
              <Link href={crumb.link} className={styles.breadcrumbLink}>
                {crumb.label}
              </Link>
            ) : (
              <span className={styles.breadcrumbCurrent}>{crumb.label}</span>
            )}
            
            {index < breadcrumbs.length - 1 && (
              <FiChevronRight className={styles.separator} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── Main Component ── */
export default function BreadcrumbBanner({ title, breadcrumbs = [], bgImage = '/jaganath-banner.webp', bgVideo }) {
  const inlineStyle = { backgroundImage: `url(${bgImage || '/jaganath-banner.webp'})` };

  return (
    <section className={styles.bannerSection} style={inlineStyle}>
      {/* <BannerBackground bgVideo={bgVideo} bgImage={bgImage} /> */}
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <BreadcrumbTrail breadcrumbs={breadcrumbs} />
      </div>
    </section>
  );
}
