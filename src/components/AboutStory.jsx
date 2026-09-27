import Image from 'next/image';
import styles from './AboutStory.module.css';
import { FiCheckCircle } from 'react-icons/fi';

/* ── Data ── */
const defaultPoints = [
  "Professional and Knowledgeable Guides",
  "Premium Accommodations with Facilities",
  "Customised Packages for All",
  "24x7 Customer Support"
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
      <h2 className={styles.title}>Crafting Beautiful Memories Since 2020</h2>
      
      <p className={styles.description}>
        Welcome to Jagannath Holidays.  We are the people who always serve you the extraordinary sights of beautiful landscapes and the extraordinary cultural heritages of Odisha and beyond. Located in the capital city of Odisha, we are a family-owned and operated travel agency. Choose us and make your simple trip an extraordinary adventure. </p>
      
      <p className={styles.description}>
       We at Jagannath Holidays feel that travelling is not merely a matter of ticking off places and ticking off the next location, it is about living in the story of places, enjoying the authentic cultures and making life-long memories! We have a broad knowledge of the local area, hand select our properties and offer customer support 24/7, ensuring stress-free travel. </p>
      
      <p className={styles.description}>
      We will take care of all the planning for you and you just concentrate on the experience. Experience the essence of traveling with Jagannath Holidays.</p>
      
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

