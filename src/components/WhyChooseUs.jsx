import { FiAward, FiCompass, FiTruck, FiHeart } from 'react-icons/fi';
import styles from './WhyChooseUs.module.css';

/* ── Data ── */
const reasonsData = [
  {
    icon: <FiAward className={styles.icon} />,
    title: "7+ Years Industry Experience",
    description: "Combining global service standards with regional expertise, officially recognized & approved by major authorities including IATA, OTOAI, and ATOAI."
  },
  {
    icon: <FiCompass className={styles.icon} />,
    title: "Certified & Knowledgeable Guides",
    description: "All our guides are licensed and certified, possessing deep knowledge about regional culture, temple folklore, history, and hidden gems."
  },
  {
    icon: <FiTruck className={styles.icon} />,
    title: "Airport & Railway Pickup Facility",
    description: "Our tour packages include seamless pick-up and drop-off facilities. We handle all transportation needs with private AC vehicles so you can travel comfortably."
  },
  {
    icon: <FiHeart className={styles.icon} />,
    title: "Family & Tailor-Made Pacing",
    description: "Tailored to your plans and budget with flexible pacing, child-friendly hotels, and guided support for temple visits so every traveler stays comfortable."
  }
];

/* ── Sub-components ── */
function WhyChooseUsHeader() {
  return (
    <div className={styles.header}>
      <h4 className={styles.subtitle}>Why Choose Jagannath Holidays</h4>
      <h2 className={styles.title}>Your Journey, Our Commitment</h2>
      <p className={styles.description}>
        We go above and beyond to make sure your travel is easy, smooth, and fun at all stages with transparent quotes and zero hidden charges.
      </p>
    </div>
  );
}

function ReasonCard({ icon, title, description }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}

/* ── Main Component ── */
export default function WhyChooseUs() {
  return (
    <section className={styles.whySection}>
      <div className={styles.container}>
        <WhyChooseUsHeader />

        <div className={styles.grid}>
          {reasonsData.map((reason, index) => (
            <ReasonCard
              key={index}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

