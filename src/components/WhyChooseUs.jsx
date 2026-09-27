import { FiAward, FiCompass, FiTruck, FiHeart } from 'react-icons/fi';
import styles from './WhyChooseUs.module.css';

/* ── Data ── */
const reasonsData = [
  {
    icon: <FiAward className={styles.icon} />,
    title: "Packages for All",
    description: "Expertly curated itineraries to ensure every traveler experiences top destination, hidden gems, and cultural highlights comfortably."
  },
  {
    icon: <FiCompass className={styles.icon} />,
    title: "Reliable Customer Support",
    description: "Get quick assistance from our team during emergencies, or unexpected changes, ensuring peace of mind."
  },
  {
    icon: <FiTruck className={styles.icon} />,
    title: "Professional Guide",
    description: "Our guides are highly trained and knowledgeable. Don’t just see the places, learn every detail about them."
  },
  {
    icon: <FiHeart className={styles.icon} />,
    title: "Secure Booking",
    description: "We guarantee secure transactions and ensure your maximum safety during your journey."
  }
];

/* ── Sub-components ── */
function WhyChooseUsHeader() {
  return (
    <div className={styles.header}>
      <h4 className={styles.subtitle}>Why Choose Jagannath Holidays</h4>
      <h2 className={styles.title}>Your Dreams, Our Dedication</h2>
      <p className={styles.description}>
        We always go the extra mile to make sure you are enjoying a perfect vacation with your loved ones. Let’s make your journey memorable.</p>
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

