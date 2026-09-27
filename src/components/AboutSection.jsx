import styles from './AboutSection.module.css';
import AnimatedButton from './AnimatedButton';
import Link from 'next/link';

/* ── Sub-components ──────────────────────────────────── */

function SectionLabel({ children }) {
  return <h4 className={styles.subheading}>{children}</h4>;
}

function SectionHeading({ children }) {
  return <h2 className={styles.heading}>{children}</h2>;
}

function AboutText() {
  return (
    <>
      <p className={styles.paragraph}>
        A trip at Jagannath Holidays is more than just a holiday experience; It's an opportunity to unwind, recharge, and let go of the daily grind. Planning a holiday could sometimes be stressful, we know all too well how to make it easy, smooth and fun at all stages.
      </p>
      <p className={styles.paragraph}>
Our tour packages are well-designed, our tours are tailored according to your requirement and we are available for reliable bookings at good rates. Travel by yourself, with family or friends, we have you covered and make your trip comfortable and unforgettable.

      </p>
      <p className={styles.paragraph}>
From the outset, the emphasis has been placed on trust and to be professional.  After all we are a family-owned and operated business in Bhubaneswar. We can offer you tailor-made travel solutions with personalized support to make sure your travel has fantastic moments and memorable experiences.
      </p>
    </>
  );
}

function AboutImage() {
  return (
    <div className={styles.imageColumn}>
      <div className={styles.imageWrapper}>
        <img
          src="/360-view-new.webp"
          alt="Jagannath Holidays 360 View"
          className={styles.collageImage}
        />
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────── */

export default function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>

        {/* Left — Content */}
        <div className={styles.contentColumn}>
          <SectionLabel>Our Story</SectionLabel>
          <SectionHeading>About Jagannath Holidays</SectionHeading>
          <AboutText />
          <Link href="/about">
            <AnimatedButton>Read More</AnimatedButton>
          </Link>
        </div>

        {/* Right — Image */}
        <AboutImage />

      </div>
    </section>
  );
}
