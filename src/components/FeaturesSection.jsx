'use client';

import styles from './FeaturesSection.module.css';
import { FiGlobe, FiPercent, FiHome, FiShield } from 'react-icons/fi';

/* ── Features Data ── */
const featuresData = [
  {
    icon: <FiGlobe className={styles.icon} />,
    title: '150+ DESTINATIONS',
    subtitle: 'Explore curated religious, historical, and adventure spots across India.'
  },
  {
    icon: <FiPercent className={styles.icon} />,
    title: 'BEST PRICE GUARANTEE',
    subtitle: 'Top-tier luxury holiday experiences offered at competitive and fair rates.'
  },
  {
    icon: <FiHome className={styles.icon} />,
    title: 'GREAT CUSTOMER SUPPORT',
    subtitle: 'Dedicated round-the-clock client assistance and local tour guides.'
  },
  {
    icon: <FiShield className={styles.icon} />,
    title: '100% SECURE PAYMENT',
    subtitle: 'Safe and encrypted online booking and invoicing systems.'
  }
];

/* ── Sub-component ── */
function FeatureCard({ icon, title, subtitle }) {
  return (
    <div className={styles.featureItem}>
      <div className={styles.iconCircle}>
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}

/* ── Main Component ── */
export default function FeaturesSection({ noBgImage = false }) {
  const sectionClass = noBgImage
    ? `${styles.featuresSection} ${styles.darkGradientBg}`
    : styles.featuresSection;

  return (
    <section className={sectionClass}>
      <h2 className={styles.sectionHeading}>Why Travel with Jagannath Holidays?</h2>
      <div className={styles.container}>
        {featuresData.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            subtitle={feature.subtitle}
          />
        ))}
      </div>
    </section>
  );
}
