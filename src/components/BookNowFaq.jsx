"use client";

import { useState } from 'react';
import styles from './BookNowFaq.module.css';

const bookingFaqs = [
  {
    question: "What Steps Should I Follow to Confirm My Booking?",
    answer: "After submitting your booking request online, our travel expert will contact you with a customized itinerary and price quote. Once you confirm, an advance deposit completes your reservation, and we issue an official booking confirmation voucher."
  },
  {
    question: "How Much Advance Payment Do I Need to Make for Booking?",
    answer: "We generally ask for 25 to 30 percent upfront to reserve cabs, hotels and experienced guides. Don’t worry about paying the full amount upfront. You can pay the remaining balance once you arrive in Odisha or before your trip begins. "
  },
  {
    question: "I Have Submitted My Booking Request. Can I Still Customize the Package?",
    answer: "Yes, absolutely! All our tour packages are 100% customizable. You can request changes to hotel categories, destinations, vehicle models, or travel dates prior to final confirmation."
  },
  {
    question: "How Flexible Is Your Cancellation and Refund Policy?",
    answer: "As a trusted travel agency, we keep our cancellation policies flexible as well as fair. If you need to cancel your trip 15+ days prior to travel, you will get a full refund after deducting a minimal administrative fee. You will get all the details regarding this with your booking quotation."
  },
  {
    question: "Can I Get Railway Station or Airport Pickup and Drop Facility?",
    answer: "Yes. All our tour packages include comfortable and hassle-free pickup and drop services from Bhubaneswar Railway Station, Airport and Puri Railway Station. From the moment you reach Odisha, your journey is smooth as well as worry‑free."
  },
  {
    question: "Is Everything Included in The Cab Fare like Tolls, Fuel and Parking?",
    answer: "Yes! Our cab fares are all‑inclusive. The cost we quote covers fuel, driver allowances, tolls, state permits, and parking fees. You can just relax and enjoy your trip knowing there are no hidden costs. We always maintain maximum transparency."
  }
];

export default function BookNowFaq() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Booking Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Have questions about booking your Odisha holiday? Here are answers to common queries regarding payments, cancellations, and travel arrangements.
          </p>
        </div>

        <div className={styles.faqList}>
          {bookingFaqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index} 
                className={`${styles.faqCard} ${isActive ? styles.activeCard : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className={styles.faqHeader}>
                  <h3 className={styles.question}>{faq.question}</h3>
                  <span className={styles.toggleIcon}>{isActive ? '−' : '+'}</span>
                </div>
                {isActive && (
                  <div className={styles.faqBody}>
                    <p className={styles.answer}>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
