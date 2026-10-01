import Link from 'next/link';
import styles from './Footer.module.css';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaGlobe, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaYoutube, 
  FaTripadvisor 
} from 'react-icons/fa';

/* ── Footer Data ── */
const popularDestinations = [
  { label: 'Bhubaneswar', href: '/destination/bhubaneswar' },
  { label: 'Puri', href: '/destination/puri' },
  { label: 'Konark', href: '/destination/konark' },
  { label: 'Chilika', href: '/destination/chilika-lake' },
  { label: 'Koraput', href: '/destination/koraput' },
  { label: 'Bhitarakanika', href: '/destination/bhitarakanika' },
  { label: 'Rajahans', href: '/destination/rajahans-island-tour' },
  { label: 'Satapada', href: '/destination/satapada' },
  { label: 'Satkosia', href: '/destination/satkosia' }
];

const tourPackagesColumn1 = [
  { label: 'Jagannath Dham & Golden Beach', href: '/package/jagannath-dham-and-golden-beach' },
  { label: 'Bhubaneswar Puri Chilika Konark Tour', href: '/package/bhubaneswar-puri-chilika-konark-tour-packages' },
  { label: 'Honeymoon Tours', href: '/package/honeymoon-tours-in-odisha' },
  { label: 'Golden Triangle Tour', href: '/package/golden-triangle-tour-of-odisha' },
  { label: 'Konark Sun Temple Tour', href: '/package/konark-sun-tample-tour' },
  { label: 'Beach Tour', href: '/package/beach-tour-packages' },
  { label: 'Bhitarkanika Forest Tour', href: '/package/bhitarkanika-forest-crocodile-river-safari' },
  { label: 'Koraput Tour', href: '/package/koraput-tour-package' },
  { label: 'Puri Jagannath and Chilika Lake Tour', href: '/package/puri-jagannatha-and-chilika-lake-tour-packages' },
  { label: 'Ram Temple and Jagannath Puri', href: '/package/ram-temple-and-jagannath-puri-tour-packages' },
  { label: 'Chilika Island Puri Konark BBSR', href: '/package/chilika-island-puri-konark-bhubaneswar-tour-packages' }
];

const tourPackagesColumn2 = [
  { label: 'Rajahans Island Chilika Tour', href: '/package/rajahans-island-and-chilika-tour-package' },
  { label: 'Satkosia Wildlife Tour', href: '/package/satkosia-wildlife-tour-packages' },
  { label: 'Tribal Tours in Odisha', href: '/package/tribal-tours-in-odisha' },
  { label: 'Bhubaneswar City Tour', href: '/package/bhubaneswar-city-tour-packages' },
  { label: 'Family Tour in Odisha', href: '/package/family-tours-in-odisha' },
  { label: 'Senior Citizen Tour', href: '/package/senior-citizen-tour-packages-in-odisha' },
  { label: 'Similipal National Park Tour', href: '/package/simlipal-national-park-tour-packages' },
  { label: 'Puri Ratha Yatra Spiritual Tour', href: '/package/puri-ratha-yatra-spiritual-tour-packages' },
  { label: 'Satapada Dolphin Tour', href: '/package/satapada-dolphin-tour-package' },
  { label: 'Deomali Hills Adventure Tour', href: '/package/deomali-hills-adventure-tour' },
  { label: 'Jagannath Cart Festival Tour', href: '/package/jagannath-cart-festival-tour-packages-of-odisha' }
];

const bottomLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Reservation Policy', href: '/reservation-policy' },
  { label: 'Cancellation Policy', href: '/cancellation-policy' }
];

/* ── Sub-components ── */
function FooterBrand() {
  return (
    <div className={styles.brandColumn}>
      <div className={styles.logos}>
        <img src="/jaganath-holidays-logo.png" alt="Jagannath Holidays Logo" className={styles.logoImage} />
      </div>
      
      <ul className={styles.contactList}>
        <li>
          <FaMapMarkerAlt className={styles.contactIcon} />
          <div className={styles.contactText}>
            <strong>Jagannath Holidays</strong><br />
            Rasulgarh, Bhubaneswar, 751010, Odisha, India
          </div>
        </li>
        <li>
          <FaPhoneAlt className={styles.contactIcon} />
          <a href="tel:+911234567890" className={styles.contactLink}>+91 1234567890</a>
        </li>
        <li>
          <FaEnvelope className={styles.contactIcon} />
          <a href="mailto:info@jagannathholidays.com" className={styles.contactLink}>info@jagannathholidays.com</a>
        </li>
        <li>
          <FaGlobe className={styles.contactIcon} />
          <a href="https://www.jagannathholidays.com" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>www.jagannathholidays.com</a>
        </li>
      </ul>
    </div>
  );
}

function FooterLinkColumn({ title, links, className = '' }) {
  return (
    <div className={`${styles.linkColumn} ${className}`}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <ul className={styles.linkList}>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className={styles.bottomSection}>
      <p className={styles.copyright}>
        Copyright © 2026, Jagannath Holidays. All rights reserved.
      </p>

      <div className={styles.bottomLinks}>
        {bottomLinks.map((link, idx) => (
          <Link key={idx} href={link.href} className={styles.bottomLink}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className={styles.socialIcons}>
        <a href="https://www.facebook.com/profile.php?id=61594880006349" aria-label="Facebook"><FaFacebookF /></a>
        <a href="https://www.instagram.com/jagannathholidays/" aria-label="X (Twitter)">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
        </a>
        <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
        <a href="#" aria-label="TripAdvisor"><FaTripadvisor /></a>
        <a href="https://www.youtube.com/@jagannathholidays" aria-label="YouTube"><FaYoutube /></a>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <FooterBrand />
          <FooterLinkColumn 
            title="Popular Destinations" 
            links={popularDestinations} 
            className={styles.destColumn} 
          />
          <FooterLinkColumn 
            title="Tour Packages" 
            links={tourPackagesColumn1} 
            className={styles.packageColumn} 
          />
          <FooterLinkColumn 
            title="More Packages" 
            links={tourPackagesColumn2} 
            className={styles.packageColumn} 
          />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
