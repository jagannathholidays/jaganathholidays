import styles from './StatsSection.module.css';
import { FiUsers, FiMap, FiAward, FiSmile } from 'react-icons/fi';

/* ── Data ── */
const statsData = [
  { icon: <FiUsers className={styles.icon} />, number: "5k+", label: "Happy Travelers" },
  { icon: <FiMap className={styles.icon} />, number: "50+", label: "Tour Destinations" },
  { icon: <FiAward className={styles.icon} />, number: "7+", label: "Years Experience" },
  { icon: <FiSmile className={styles.icon} />, number: "1k+", label: "Positive Reviews" }
];

/* ── Sub-component ── */
function StatItem({ icon, number, label }) {
  return (
    <div className={styles.statItem}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <h3 className={styles.number}>{number}</h3>
      <p className={styles.label}>{label}</p>
    </div>
  );
}

/* ── Main Component ── */
export default function StatsSection() {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        {statsData.map((stat, index) => (
          <StatItem
            key={index}
            icon={stat.icon}
            number={stat.number}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
