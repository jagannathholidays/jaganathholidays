import { FiCheck } from 'react-icons/fi';
import styles from './DestinationWhatToExpect.module.css';

/* ── Data ── */
const defaultExpectations = [
  "Transport and accommodation is already organized",
  "Land of Peace & Spirituality",
  "The Best in Hospitality",
  "Local and knowledgeable guides",
  "Value for Money",
  "The Natural Paradise",
  "Tour the Incredible Wildlife",
  "Easy to Plan and Book",
  "Great Gift and Safety"
];

/* ── Sub-components ── */
function ExpectationHeader() {
  return <h2 className={styles.sectionTitle}>What to Expect</h2>;
}

function ExpectationCard({ text }) {
  const displayText = typeof text === 'string' ? text : (text?.title || text?.text || text?.name || '');
  return (
    <div className={styles.expectationCard}>
      <FiCheck className={styles.checkIcon} />
      <span className={styles.text}>{displayText}</span>
    </div>
  );
}

/* ── Main Component ── */
export default function DestinationWhatToExpect({ list, whatToExpect }) {
  const rawList = whatToExpect !== undefined ? whatToExpect : list;
  const items = Array.isArray(rawList) && rawList.length > 0 ? rawList : defaultExpectations;

  return (
    <section id="what-to-expect" className={styles.whatToExpectSection}>
      <div className={styles.container}>
        <ExpectationHeader />
        
        <div className={styles.grid}>
          {items.map((item, index) => (
            <ExpectationCard key={index} text={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
