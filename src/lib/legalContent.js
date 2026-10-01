/**
 * Centralised legal content store.
 *
 * Each entry is keyed by a unique slug and contains the data required to render
 * a legal page (Terms & Conditions, Privacy Policy, Reservation Policy, etc.).
 *
 * Shape:
 * {
 *   slug:        string,   // route segment, e.g. 'terms-and-conditions'
 *   title:       string,   // page + banner heading
 *   metaTitle:   string,   // <title>
 *   metaDescription: string,
 *   lastUpdated: string,
 *   intro:       string,   // short paragraph shown under the banner
 *   sections: [
 *     {
 *       title?: string,          // optional heading (omit when no heading is needed)
 *       list?: string[],         // bullet points rendered as <ul><li>
 *       paragraphs?: string[],   // optional free-flowing paragraphs (<p>)
 *     }
 *   ]
 * }
 */

export const legalPages = {
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    metaTitle: 'Terms & Conditions | Jagannath Holidays',
    metaDescription:
      'Read the Terms & Conditions governing bookings, payments, cancellations, vehicle usage, and other services provided by Jagannath Holidays.',
    lastUpdated: 'October 1, 2026',
    intro:
      'These Terms & Conditions outline the rules and regulations for using the services provided by Jagannath Holidays. By booking a tour or using our website, you accept these terms in full.',
    sections: [
      {
        list: [
          'All prices are in Indian Rupees.',
          'A 5% GST will be added to the total bill.',
          'Guests must check the vehicle before use and keep their belongings safe. The company is not responsible for any loss.',
          'If the requested car type is unavailable, a similar vehicle will be provided.',
          'Sightseeing will follow the itinerary and only on motorable roads.',
          'Drivers cannot be forced to exceed speed limits under the Indian Motor Vehicle Act. Late night travel should be avoided.',
          'Parking fees, tolls, and interstate permits will be paid by the company but reimbursed by guests to the driver with receipts at the end of duty.',
          'For local trips, a night allowance will be charged between 10:00 PM and 6:00 AM. Extra charges must be paid directly to the driver in cash.',
          'Air conditioning will remain off while driving on hilly roads.',
          'Guests must give prior notice for airport or railway transfers to avoid delays.',
          'Trip sheets must be signed by guests to confirm usage. Complaints after signing will not be accepted.',
          'Bills will be issued in the guest\u2019s name unless otherwise requested in writing. Payment method must be specified at booking.',
          'Bills are presented every two weeks. A maximum of 1 day credit is allowed unless an extension is requested in writing within 12 hours of bill receipt.',
          'Tariffs may increase if fuel prices or government taxes rise.',
          'Vehicle upgrades in Bhubaneswar are at the company\u2019s discretion.',
          'Payments can be made by cash, account payee cheque, UPI, or online transfer in favour of \u201cJagannath Holidays Tours.\u201d Credit/debit card payments will incur a 3% extra charge.',
          'For card payments, card details must be shared at booking. If payment fails, guests must pay in cash.',
          'For RTGS/NEFT payments, transaction details must be shared with the company.',
          'Cash payments of \u20b950,000 or more require a copy of the guest\u2019s PAN card.',
          'All disputes fall under Bhubaneswar legal jurisdiction only.',
        ],
      },
    ],
  },

  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy | Jagannath Holidays',
    metaDescription:
      'Learn how Jagannath Holidays collects, uses, stores, and protects your personal information when you use our website and services.',
    lastUpdated: 'October 1, 2026',
    intro:
      'This Privacy Policy explains how Jagannath Holidays collects, uses, and protects the personal information you provide when you use our website or book our services.',
    sections: [
      {
        title: '1. Information We Collect',
        list: [
          'Personal details such as your name, phone number, email address, and postal address.',
          'Booking information including travel dates, destinations, number of travellers, and vehicle preferences.',
          'Identity documents such as PAN card copies where required (for example, for cash payments of \u20b950,000 or more).',
          'Payment and transaction details shared for processing bookings.',
          'Technical data such as browser type, device information, and pages visited on our website.',
        ],
      },
      {
        title: '2. How We Use Your Information',
        list: [
          'To process and confirm your bookings and provide the services you request.',
          'To communicate with you regarding your tour, transport, billing, and support requests.',
          'To issue bills and process payments in accordance with applicable laws.',
          'To improve our website, services, and customer experience.',
          'To comply with legal, tax, and regulatory obligations.',
        ],
      },
      {
        title: '3. Sharing of Information',
        list: [
          'We do not sell your personal information. We may share it with trusted third parties such as hotels, transport operators, and payment processors strictly to fulfil your booking, or where required by law.',
        ],
      },
      {
        title: '4. Data Security',
        list: [
          'We take reasonable technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse. However, no method of transmission over the internet is completely secure.',
        ],
      },
      {
        title: '5. Cookies',
        list: [
          'Our website may use cookies and similar technologies to enhance your browsing experience and analyse website traffic. You can control cookies through your browser settings.',
        ],
      },
      {
        title: '6. Your Rights',
        list: [
          'You may request access to the personal information we hold about you.',
          'You may request correction of inaccurate or incomplete information.',
          'You may request deletion of your personal information, subject to legal and contractual obligations.',
        ],
      },
      {
        title: '7. Governing Law',
        list: [
          'This Privacy Policy is governed by the laws of India, and all disputes fall under Bhubaneswar legal jurisdiction only.',
        ],
      },
      {
        title: '8. Changes to This Policy',
        list: [
          'Jagannath Holidays may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.',
        ],
      },
    ],
  },

  'reservation-policy': {
    slug: 'reservation-policy',
    title: 'Reservation Policy',
    metaTitle: 'Reservation Policy | Jagannath Holidays',
    metaDescription:
      'Understand how reservations, confirmations, advance payments, and booking changes work at Jagannath Holidays.',
    lastUpdated: 'October 1, 2026',
    intro:
      'This Reservation Policy explains how bookings are made, confirmed, and managed at Jagannath Holidays. By making a reservation, you agree to the terms outlined below.',
    sections: [
      {
        title: '1. Making a Reservation',
        list: [
          'All reservations are subject to availability and confirmation by Jagannath Holidays.',
          'Bookings can be made through our website, by phone, or via email.',
          'Guests must provide accurate personal details, travel dates, destination, and the number of travellers at the time of booking.',
          'Special requests will be noted but are subject to availability and cannot be guaranteed.',
        ],
      },
      {
        title: '2. Confirmation & Advance Payment',
        list: [
          'A reservation is confirmed only after the required advance payment is received and a written confirmation is issued.',
          'The advance amount and payment schedule will be communicated at the time of booking.',
          'The balance payment must be made before the commencement of the tour unless otherwise agreed in writing.',
          'Bookings without the required advance payment may be released without prior notice.',
        ],
      },
      {
        title: '3. Pricing',
        list: [
          'All prices are quoted in Indian Rupees (INR).',
          'A 5% GST will be added to the total bill.',
          'Prices are based on the services, vehicle type, travel dates, and number of travellers selected at the time of booking.',
          'Tariffs may increase if fuel prices or government taxes rise.',
        ],
      },
      {
        title: '4. Changes to a Reservation',
        list: [
          'Requests to change travel dates, destinations, or vehicle type must be made in writing.',
          'Changes are subject to availability and may attract additional charges.',
          'Any increase in cost due to a change will be payable by the guest.',
        ],
      },
      {
        title: '5. Payment Methods',
        list: [
          'Payments can be made by cash, account payee cheque, UPI, or online transfer in favour of \u201cJagannath Holidays Tours.\u201d',
          'Credit/debit card payments will incur a 3% extra charge.',
          'For RTGS/NEFT payments, transaction details must be shared with the company.',
          'Cash payments of \u20b950,000 or more require a copy of the guest\u2019s PAN card.',
        ],
      },
      {
        title: '6. Billing',
        list: [
          'Bills will be issued in the guest\u2019s name unless otherwise requested in writing.',
          'The payment method must be specified at booking.',
          'Bills are presented every two weeks. A maximum of 1 day credit is allowed unless an extension is requested in writing within 12 hours of bill receipt.',
        ],
      },
      {
        title: '7. Cancellation',
        list: [
          'Cancellation requests must be submitted in writing via email or through our official contact channels.',
          'Refunds, where applicable, will be processed as per our Cancellation Policy.',
        ],
      },
      {
        title: '8. Governing Law',
        list: [
          'All disputes fall under Bhubaneswar legal jurisdiction only.',
        ],
      },
    ],
  },

  'cancellation-policy': {
    slug: 'cancellation-policy',
    title: 'Cancellation Policy',
    metaTitle: 'Cancellation Policy | Jagannath Holidays',
    metaDescription:
      'Read the cancellation, refund, and no-show rules applicable to bookings made with Jagannath Holidays.',
    lastUpdated: 'October 1, 2026',
    intro:
      'This Cancellation Policy explains the terms for cancelling a booking and the refunds applicable. By making a reservation, you agree to this policy.',
    sections: [
      {
        title: '1. Cancellation Requests',
        list: [
          'All cancellation requests must be submitted in writing via email or through our official contact channels.',
          'The cancellation date will be the date on which Jagannath Holidays receives the written request.',
          'Verbal cancellations will not be accepted.',
        ],
      },
      {
        title: '2. Cancellation Charges',
        list: [
          'Cancellations made well in advance may be eligible for a partial refund after deducting cancellation charges.',
          'Cancellations made closer to the travel date may attract higher cancellation charges.',
          'Cancellation charges may vary depending on the services booked, supplier terms, and the season.',
          'Any advance paid towards non-refundable services, permits, or bookings will not be refunded.',
        ],
      },
      {
        title: '3. Refunds',
        list: [
          'Refunds, where applicable, will be processed after deducting cancellation charges, supplier penalties, and applicable taxes.',
          'Refunds will be made through the original mode of payment or by bank transfer, at the discretion of Jagannath Holidays.',
          'Refund processing may take a reasonable period of time depending on the payment method and supplier settlement.',
        ],
      },
      {
        title: '4. No-Show & Unused Services',
        list: [
          'No refund will be provided for no-shows or failure to arrive on the scheduled date.',
          'No refund will be provided for unused services, early departure, or any part of the tour not availed.',
        ],
      },
      {
        title: '5. Cancellation by Jagannath Holidays',
        list: [
          'In rare circumstances, Jagannath Holidays may need to cancel a booking due to force majeure events, safety concerns, or circumstances beyond our control.',
          'In such cases, guests will be informed at the earliest, and a suitable alternative or refund will be offered as per applicable terms.',
        ],
      },
      {
        title: '6. Governing Law',
        list: [
          'All disputes fall under Bhubaneswar legal jurisdiction only.',
        ],
      },
    ],
  },
};

/**
 * Retrieve a legal page's content by slug.
 * @param {string} slug
 * @returns {object|null}
 */
export function getLegalPage(slug) {
  return legalPages[slug] || null;
}

/**
 * List all available legal page slugs.
 * @returns {string[]}
 */
export function getLegalPageSlugs() {
  return Object.keys(legalPages);
}

export default legalPages;
