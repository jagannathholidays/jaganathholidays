import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import styles from './LegalContent.module.css';

/* ── Sub-components ── */
function SectionBlock({ section }) {
  return (
    <div className={styles.section}>
      {section.title && <h2 className={styles.heading}>{section.title}</h2>}

      {section.paragraphs?.map((text, idx) => (
        <p key={idx} className={styles.paragraph}>
          {text}
        </p>
      ))}

      {section.list && (
        <ul className={styles.list}>
          {section.list.map((item, idx) => (
            <li key={idx} className={styles.listItem}>
              <FiChevronRight className={styles.bulletIcon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Generic renderer for legal pages (Terms, Privacy Policy, etc.).
 *
 * @param {object}   props.content   - Content object from `@/lib/legalContent`
 * @param {string}   [props.contactTitle] - Optional heading for the contact box
 */
export default function LegalContent({ content, contactTitle = 'Questions About This Policy?' }) {
  if (!content) {
    return (
      <section className={styles.termsSection}>
        <div className={styles.container}>
          <p className={styles.paragraph}>
            The requested content is currently unavailable. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const { lastUpdated, intro, sections = [] } = content;

  return (
    <section className={styles.termsSection}>
      <div className={styles.container}>
        <div className={styles.intro}>
          {lastUpdated && (
            <span className={styles.lastUpdated}>Last Updated: {lastUpdated}</span>
          )}
          {intro && <p className={styles.paragraph}>{intro}</p>}
        </div>

        {sections.map((section, idx) => (
          <SectionBlock key={idx} section={section} />
        ))}

        <div className={styles.contactBox}>
          <h3 className={styles.contactTitle}>{contactTitle}</h3>
          <p className={styles.contactText}>
            If you have any questions or concerns, please reach out to us:
          </p>
          <p className={styles.contactText}>
            <strong>Jagannath Holidays</strong>
            <br />
            Rasulgarh, Bhubaneswar, 751010, Odisha, India
            <br />
            Email:{' '}
            <a href="mailto:info@jagannathholidays.com" className={styles.contactLink}>
              info@jagannathholidays.com
            </a>
            <br />
            Phone:{' '}
            <a href="tel:+911234567890" className={styles.contactLink}>
              +91 1234567890
            </a>
          </p>
          <p className={styles.contactText}>
            You may also visit our{' '}
            <Link href="/contact" className={styles.contactLink}>
              Contact Us
            </Link>{' '}
            page.
          </p>
        </div>
      </div>
    </section>
  );
}
