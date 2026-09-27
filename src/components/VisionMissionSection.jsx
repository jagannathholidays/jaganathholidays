import { FiEye, FiTarget } from 'react-icons/fi';
import styles from './VisionMissionSection.module.css';

/* ── Data ── */
const vmData = [
  {
    icon: <FiEye className={styles.icon} />,
    title: "Our Vision",
    description: "To become an innovative and trusted travel partner, helping people see the world and the diverse cultures in a different way. We always try our best to preserve the cultural and natural value of places we travel to for future generations. "
  },
  {
    icon: <FiTarget className={styles.icon} />,
    title: "Our Mission",
    description: "To offer personalised as well as exceptional experiences that will go beyond the expectations of our clients. We are committed to offering premium services and well-planned itineraries, while following sustainable and ethical practices. "
  }
];

/* ── Sub-component ── */
function VisionMissionCard({ icon, title, description }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

/* ── Main Component ── */
export default function VisionMissionSection() {
  return (
    <section className={styles.vmSection}>
      <div className={styles.container}>
        {vmData.map((item, index) => (
          <VisionMissionCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
