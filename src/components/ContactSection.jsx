import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiShield,
  FiCompass,
  FiHeadphones,
  FiAward,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import ContactForm from '@/app/contact/ContactForm';
import { siteConfig, getWhatsAppLink } from '@/lib/siteConfig';
import styles from './ContactSection.module.css';

const { contact } = siteConfig;

/* ── Left Column: Travel Agency Info Banner ── */
function ContactInfoBanner() {
  return (
    <div className={styles.infoColumn}>
      <div className={styles.heroCard}>
        <div className={styles.imageWrapper}>
          <img
            src="/loved-destination-1.png"
            alt="Jagannath Holidays Odisha Tours"
            className={styles.bgImage}
          />
          <div className={styles.imageOverlay}>
            <div>
              <span className={styles.overlayBadge}>{siteConfig.companyName}</span>
              <h3 className={styles.overlayTitle}>Your Gateway to Holy Odisha</h3>
            </div>
          </div>
        </div>

        <div className={styles.heroContent}>
          <span className={styles.tagline}>Get in touch with our experts</span>
          <h2 className={styles.mainTitle}>
            Plan Your Dream Trip with Jagannath Holidays Tours
          </h2>
          <p className={styles.description}>
            Jagannath Holidays Tours will create a perfectly customised itinerary that will fit your interests while making  your trip truly unforgettable.
          </p>

          <div className={styles.quickActions}>
            <a href={`tel:${contact.phone}`} className={styles.callActionBtn}>
              <FiPhone className={styles.actionIcon} /> Call Now
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappActionBtn}
            >
              <FaWhatsapp className={styles.actionIcon} /> WhatsApp
            </a>
          </div>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <span className={styles.featureBullet}>✓</span>
              <span>Quick Response &amp; Custom Quote within 2 Hours</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureBullet}>✓</span>
              <span>100% Customized Itineraries for Families &amp; Groups</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureBullet}>✓</span>
              <span>Govt. Approved Local Tour Guides &amp; Clean Vehicles</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.hoursCard}>
        <div className={styles.hoursIconBox}>
          <FiClock />
        </div>
        <div className={styles.hoursText}>
          <h4>Office &amp; Support Hours</h4>
          <p>
            {contact.hours.days}: {contact.hours.time} ({contact.hours.note}).
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Contact Channel Cards ── */
function ContactCards() {
  return (
    <div className={styles.cardsRow}>
      <div className={styles.contactCard}>
        <div className={styles.iconBox}>
          <FiMapPin className={styles.cardIcon} />
        </div>
        <h3 className={styles.cardTitle}>Head Office</h3>
        <p className={styles.cardText}>{contact.address.short}</p>
        <a
          href={contact.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
        >
          View On Google Maps →
        </a>
      </div>

      <div className={styles.contactCard}>
        <div className={styles.iconBox}>
          <FiPhone className={styles.cardIcon} />
        </div>
        <h3 className={styles.cardTitle}>Call Us</h3>
        <p className={styles.cardText}>
          Speak directly with our senior travel consultant for instant assistance
          and tour booking.
        </p>
        <a href={`tel:${contact.phone}`} className={styles.cardLink}>
          {contact.phoneDisplay} →
        </a>
        <a href={`tel:9583357770`} className={styles.cardLink}>
         +91 9583357770 →
        </a>
      </div>

      <div className={styles.contactCard}>
        <div className={`${styles.iconBox} ${styles.whatsappIconBox}`}>
          <FaWhatsapp className={styles.cardIcon} />
        </div>
        <h3 className={styles.cardTitle}>WhatsApp Chat</h3>
        <p className={styles.cardText}>
          Prefer texting? Send us a quick WhatsApp message to receive instant
          itineraries and quotes.
        </p>
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
        >
          Chat on WhatsApp →
        </a>
      </div>

      <div className={styles.contactCard}>
        <div className={styles.iconBox}>
          <FiMail className={styles.cardIcon} />
        </div>
        <h3 className={styles.cardTitle}>Email Us</h3>
        <p className={styles.cardText}>
          Send us your detailed inquiry or corporate / group package requirements
          anytime.
        </p>
        <a href={`mailto:${contact.email}`} className={styles.cardLink}>
          {contact.email} →
        </a>
      </div>
    </div>
  );
}

/* ── Trust Pillars Section ── */
function TrustPillars() {
  return (
    <div className={styles.trustPillars}>
      <div className={styles.trustHeader}>
        <span className={styles.trustTag}>Why Choose {siteConfig.companyName}</span>
        <h3 className={styles.trustHeading}>Why Choose Jagannath Holidays Tours</h3>
      </div>

      <div className={styles.pillarsGrid}>
        <div className={styles.pillarItem}>
          <FiAward className={styles.pillarIcon} />
          <h4 className={styles.pillarTitle}>Odisha Tourism Approved</h4>
          <p className={styles.pillarDesc}>
           We are a certified travel agency and trusted for safe and genuine experiences.
          </p>
        </div>

        <div className={styles.pillarItem}>
          <FiCompass className={styles.pillarIcon} />
          <h4 className={styles.pillarTitle}>Custom Tour Plans</h4>
          <p className={styles.pillarDesc}>
            Your trip is designed based on your pace, budget, and interests.
          </p>
        </div>

        <div className={styles.pillarItem}>
          <FiShield className={styles.pillarIcon} />
          <h4 className={styles.pillarTitle}>Best Price Promise</h4>
          <p className={styles.pillarDesc}>
           No hidden costs and transparent pricing with direct vendor deals.
          </p>
        </div>

        <div className={styles.pillarItem}>
          <FiHeadphones className={styles.pillarIcon} />
          <h4 className={styles.pillarTitle}>24/7 Support</h4>
          <p className={styles.pillarDesc}>
            Get instant solutions from a dedicated trip coordinator during your holiday.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Interactive Office Location Map ── */
function ContactMap() {
  return (
    <div className={styles.mapSection}>
      <div className={styles.mapHeader}>
        <h3 className={styles.mapTitle}>Find Our Office in Bhubaneswar</h3>
        <p className={styles.mapSubtitle}>
          Conveniently located near Rasulgarh Square, Bhubaneswar, Odisha
        </p>
      </div>
      <div className={styles.mapContainer}>
        <iframe
          src={contact.mapEmbedUrl}
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Jagannath Holidays Office Location Map"
          className={styles.mapIframe}
        />
      </div>
    </div>
  );
}

/* ── Main Contact Section Export ── */
export default function ContactSection() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.topSplit}>
          <ContactInfoBanner />
          <div>
            <ContactForm
              formId={6}
              slug="contact-us"
              title="Send Us a Message"
              subtitle="Use the form below and fill out your details. Our team will get in touch with you with a well-planned itinerary within 2 hours. "
            />
          </div>
        </div>

        <ContactCards />
        <TrustPillars />
      </div>

      <ContactMap />
    </section>
  );
}
