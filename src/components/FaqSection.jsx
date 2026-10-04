import styles from './FaqSection.module.css';
import FaqSectionClient from './FaqSectionClient';

export const fallbackFaqs = [
  {
    id: 0,
    question: "How Do I Book?",
    answer: "Click \"Book Now\" or contact via phone/email."
  },
  {
    id: 1,
    question: "Do I Have The Flexibility For Customizing My Tour Package?",
    answer: "Sure, we can customize all our packages to fit your travel plans, budget and preferences."
  },
  {
    id: 2,
    question: "Where Is Jagannath Holidays Situated?",
    answer: "Our main office is located at Rasulgarh, BBSR. We have also our branch in Puri to offer local coordination and on-the-ground support."
  },
  {
    id: 3,
    question: "What Are The Services Jagannath Holidays Offers?",
    answer: "We arrange tours, arrange accommodation, organise transportation, draft tour programs and provide tailor-made travel support."
  },
  {
    id: 4,
    question: "Is Jagannath Holidays Good for International Travellers?",
    answer: "Absolutely! We cater to both Indians as well as foreign tourists, and provide them with good support along with well-planned itineraries."
  },
  {
    id: 5,
    question: "Are your holiday packages suitable for families with children?",
    answer: "Yes. We offer flexible pacing, private air-conditioned transport, child-friendly hotels, as well as guided support for temple visits so that your little ones stay comfortable throughout the journey."
  },
  {
    id: 6,
    question: "Do You Offer Free Quote?",
    answer: "As a trusted and reputed travel agency, we always provide our clients with transparent, no-obligation quote without any hidden charges."
  },
  {
    id: 7,
    question: "How Can I Get In Touch With Your Customer Support?",
    answer: "You can always reach out to our 24/7 support team by phone at +91 9583837770 or send us an email at info@jagannathholidays.com."
  },
  {
    id: 8,
    question: "Do You Offer Railway and Airport Pickup Facility?",
    answer: "Yes. Our packages include both pick-up and drop-off facilities. We will handle all your transportation needs so that you can enjoy your trip comfortably."
  },
  {
    id: 9,
    question: "Are Your Tour Guides Knowledgeable and Certified?",
    answer: "Yes. All our guides are licensed, and they possess extensive knowledge about regional culture, folklore, hidden gems, history and more."
  },
  {
    id: 10,
    question: "Why Should I Choose You Over Other Agencies?",
    answer: "With more than 7 years of industry experience and trust, we combine global service standards with regional expertise. Apart from this, we are approved as well as recognised by major tourism and trade authorities, including IATA, OTOAI, ATOAI and more."
  }
];

async function fetchFaqs() {
  try {
    const payload = {
      slug: "faqs",
      content_type: "faqs"
    };

    const res = await fetch(`${process.env.CMS_API_URL || 'https://cmsapi.one9ty.com'}/api/v1/delivery/contents/show`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CMS_TOKEN || '141|PLIcQEisrq76oVJH35rTn3CqkZWZ6xaCSwNDWCiw2ea64d79'}`
      },
      body: JSON.stringify(payload),
      next: { revalidate: 86400 }
    });

    const result = await res.json();

    // Response shape: { success, data: { ...meta, data: { questions: [{question, answers}] } } }
    const questions = result?.data?.data?.questions;

    if (Array.isArray(questions) && questions.length > 0) {
      return questions.map((item, index) => ({
        id: index,
        question: item.question || 'Frequently Asked Question',
        answer: (item.answers || 'Please contact our support team for more details.').replace(/\s+also have a$/, '')
      }));
    }
  } catch (error) {
    console.error("Error fetching FAQs:", error);
  }
  return fallbackFaqs;
}

/* ── Main Component ── */
export default async function FaqSection({ heading = "Frequently Asked Questions" }) {
  const faqs = await fetchFaqs();
  const displayFaqs = (faqs && faqs.length > 0) ? faqs : fallbackFaqs;

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{heading}</h2>

        {displayFaqs && displayFaqs.length > 0 ? (
          <FaqSectionClient faqsData={displayFaqs} />
        ) : (
          <div className={styles.noResult}>No result available</div>
        )}
      </div>
    </section>
  );
}

