import { FiCheck, FiX, FiMapPin, FiUsers, FiClock, FiGift, FiPhone, FiMail } from 'react-icons/fi';
import styles from './DestinationDetailsContent.module.css';
import PlanJourneyForm from './PlanJourneyForm';
import DestinationItinerary from './DestinationItinerary';

/* ── Sub-components: Left Column ── */

function ContentOverview({ description }) {
  const isHtmlDescription = typeof description === 'string' && (
    description.includes('<p') || description.includes('<h2') || description.includes('<div') || description.includes('<span')
  );

  return (
    <div className={styles.introBlock}>
      <h2 className={styles.sectionTitle}>Overview & Details</h2>
      {isHtmlDescription ? (
        <div 
          className={styles.richDescription}
          dangerouslySetInnerHTML={{ __html: description }} 
        />
      ) : description ? (
        <p className={styles.paragraph}>{description}</p>
      ) : (
        <>
          <p className={styles.paragraph}>
            Our tour package is one of the ideal choices to explore the most religious and historical places in the country. It will cover the visit to Lord of Universe Jagannath Darshan, Puri, and UNESCO World Heritage Site Konark Sun Temple Known as (Black Pagoda) and Chilika Lake on Satpada – The Largest Ramsar Site in Asia. Cruise to Sea-Mouth viewing Rare Irrawaddy Dolphins and Rajhans Island which are located on the Eastern India coast and as per Vedic literature and mythology.
          </p>
          <p className={styles.paragraph}>
            It is been said that it will be divine to take a holy dip in Sangam then visit Kapil Muni Ashram, Ganga Sagar (Bay Of Bengal), which in turn will help to purify and clean the soul of an individual.
          </p>
        </>
      )}
    </div>
  );
}

function ContentIncludes({ list }) {
  if (!list || list.length === 0) return null;
  return (
    <div className={styles.includesBlock}>
      <h3 className={styles.boxTitle}><FiCheck className={styles.titleIcon} /> Price Includes</h3>
      <ul className={styles.includesList}>
        {list.map((item, idx) => (
          <li key={idx}>
            <FiCheck className={styles.checkIcon} />
            <span>{typeof item === 'string' ? item : item?.text || item?.title || JSON.stringify(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContentExcludes({ list }) {
  if (!list || list.length === 0) return null;
  return (
    <div className={styles.excludesBlock}>
      <h3 className={styles.boxTitle}><FiX className={styles.titleIcon} /> Price Excludes</h3>
      <ul className={styles.excludesList}>
        {list.map((item, idx) => (
          <li key={idx}>
            <FiX className={styles.crossIcon} />
            <span>{typeof item === 'string' ? item : item?.text || item?.title || JSON.stringify(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContentComplementaries({ list }) {
  if (!list || list.length === 0) return null;
  return (
    <div className={styles.complementariesBlock}>
      <h3 className={styles.boxTitle}><FiGift className={styles.titleIcon} /> Complementary Gifts</h3>
      <ul className={styles.complementariesList}>
        {list.map((item, idx) => (
          <li key={idx}>
            <FiGift className={styles.giftIcon} />
            <span>{typeof item === 'string' ? item : item?.text || item?.title || JSON.stringify(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContentTerms({ termsConditions }) {
  if (!Array.isArray(termsConditions) || termsConditions.length === 0) return null;
  return (
    <div className={styles.termsBlock}>
      <h3 className={styles.boxTitle}>Terms & Conditions</h3>
      <ul className={styles.termsList}>
        {termsConditions.map((term, idx) => (
          <li key={idx}>
            <span>{typeof term === 'string' ? term : term?.text || term?.title || JSON.stringify(term)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Sub-components: Right Column Sidebar ── */

function SidebarTourInfo({ startingPoint, endPoint, duration }) {
  return (
    <div className={styles.infoBox}>
      <h3 className={styles.sidebarTitle}>Tour Information</h3>
      <div className={styles.infoItemList}>
        {(startingPoint || endPoint) && (
          <div className={styles.infoItem}>
            <div className={styles.iconWrapper}>
              <FiMapPin />
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Start Point - End Point</span>
              <span className={styles.infoValue}>
                {startingPoint && endPoint ? `${startingPoint} - ${endPoint}` : startingPoint || endPoint}
              </span>
            </div>
          </div>
        )}
        
        <div className={styles.infoItem}>
          <div className={styles.iconWrapper}>
            <FiUsers />
          </div>
          <div className={styles.infoText}>
            <span className={styles.infoLabel}>Tour Type</span>
            <span className={styles.infoValue}>Customizable / Private</span>
          </div>
        </div>
        
        {duration && (
          <div className={styles.infoItem}>
            <div className={styles.iconWrapper}>
              <FiClock />
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Duration</span>
              <span className={styles.infoValue}>{duration}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarNeedHelp() {
  return (
    <div className={styles.needHelpBox}>
      <h3 className={styles.needHelpTitle}>Need Help?</h3>
      <p className={styles.needHelpText}>
        Our travel experts are here to help you plan the perfect trip.
      </p>
      <div className={styles.contactItem}>
        <div className={styles.contactIconWrapper}><FiPhone /></div>
        <span>+91 9583837770</span>
      </div>
      <div className={styles.contactItem}>
        <div className={styles.contactIconWrapper}><FiMail /></div>
        <span>info@jagannathholidays.com</span>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function DestinationDetailsContent({
  description = "",
  itinerary = [],
  priceIncludes = [],
  priceExcludes = [],
  complementaries = [],
  termsConditions = [],
  startingPoint = "Bhubaneswar",
  endPoint = "Bhubaneswar",
  duration = "05 Nights 06 Days",
  packageTitle = "Tour Package"
}) {
  const defaultIncludes = [
    "Welcome drink on arrival (Non-alcoholic)",
    "Well-appointed A/C Accommodation",
    "Bed Tea and Breakfast on Paid Nights",
    "Transportation by well-condition AC Vehicle",
    "Driver allowance, Toll Tax, Parking, and State Govt. Tax",
    "Railway Station / Airport Pick up and Drop and Hotel Taxes"
  ];

  const defaultExcludes = [
    "Any personal expenses Fees for Camera & Video Camera",
    "Monument entry fees, Boating & Guide charges",
    "Porterage at hotels and airports",
    "Birthday Celebrations, tips, insurance & laundry",
    "Liquors, wine & telephone charges",
    "Air / Train fare and Any other which was not mentioned on tour inclusion"
  ];

  const defaultComplementaries = [
    "Jagannath Darshan by our Temple priest",
    "Sanitizer",
    "One Entrance Fees (Optional)"
  ];

  const incList = Array.isArray(priceIncludes) && priceIncludes.length > 0 ? priceIncludes : defaultIncludes;
  const excList = Array.isArray(priceExcludes) && priceExcludes.length > 0 ? priceExcludes : defaultExcludes;
  const compList = Array.isArray(complementaries) && complementaries.length > 0 ? complementaries : defaultComplementaries;

  return (
    <section id="introduction" className={styles.contentSection}>
      <div className={styles.container}>
        
        {/* Left Column: Information */}
        <div className={styles.leftColumn}>
          <ContentOverview description={description} />
          <DestinationItinerary itinerary={itinerary} embedded={true} />
          <ContentIncludes list={incList} />
          <ContentExcludes list={excList} />
          <ContentComplementaries list={compList} />
          <ContentTerms termsConditions={termsConditions} />
        </div>

        {/* Right Column: Sidebar */}
        <div className={styles.rightColumn}>
          <SidebarTourInfo startingPoint={startingPoint} endPoint={endPoint} duration={duration} />
          <PlanJourneyForm defaultPackage={packageTitle} />
          {/* <SidebarNeedHelp /> */}
        </div>

      </div>
    </section>
  );
}
