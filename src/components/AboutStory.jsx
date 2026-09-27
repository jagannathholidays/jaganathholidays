import Image from 'next/image';
import styles from './AboutStory.module.css';
import { FiCheckCircle } from 'react-icons/fi';

/* ── Data ── */
const defaultPoints = [
  "Tailored Tour Packages for Every Requirement",
  "Licensed Guides with Rich Cultural Knowledge",
  "Transparent Quotes with No Hidden Charges",
  "24/7 Dedicated Support & Local Coordination"
];

/* ── Sub-components ── */
function StoryImages() {
  return (
    <div className={styles.imageColumn}>
      <div className={styles.imageWrapperMain}>
        <Image 
          src="/loved-destination-1.png" 
          alt="Jagannath Holidays Tour Experience" 
          width={500} 
          height={600} 
          className={styles.mainImage}
        />
      </div>
      <div className={styles.imageWrapperSub}>
        <Image 
          src="/loved-destination-2.png" 
          alt="Odisha Cultural Heritage" 
          width={300} 
          height={300} 
          className={styles.subImage}
        />
      </div>
      <div className={styles.experienceBadge}>
        <span className={styles.badgeNumber}>7+</span>
        <span className={styles.badgeText}>Years of Trust & Service</span>
      </div>
    </div>
  );
}

function StoryFeatures({ points = [] }) {
  return (
    <ul className={styles.pointsList}>
      {points.map((point, index) => (
        <li key={index} className={styles.pointItem}>
          <FiCheckCircle className={styles.checkIcon} />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

function StoryContent({ points }) {
  return (
    <div className={styles.textColumn}>
      <h4 className={styles.subtitle}>Our Story</h4>
      <h2 className={styles.title}>More Than Just a Holiday Experience</h2>
      
      <p className={styles.description}>
        A trip at Jagannath Holidays is more than just a holiday experience; it's an opportunity to unwind, recharge, and let go of the daily grind. Planning a holiday could sometimes be stressful—we know all too well how to make it easy, smooth, and fun at all stages.
      </p>
      
      <p className={styles.description}>
        Our tour packages are well-designed, our tours are tailored according to your requirement, and we are available for reliable bookings at good rates. Whether you travel by yourself, with family, or with friends, we have you covered and make your trip comfortable and unforgettable.
      </p>
      
      <p className={styles.description}>
        From the outset, the emphasis has been placed on trust and professionalism. As a family-owned and operated business in Bhubaneswar with our branch in Puri offering local coordination and on-the-ground support, we provide tailor-made travel solutions with personalized care to make sure your travel has fantastic moments and memorable experiences.
      </p>
      
      <StoryFeatures points={points} />
    </div>
  );
}

/* ── Main Component ── */
export default function AboutStory() {
  return (
    <section className={styles.storySection}>
      <div className={styles.container}>
        <StoryImages />
        <StoryContent points={defaultPoints} />
      </div>
    </section>
  );
}

