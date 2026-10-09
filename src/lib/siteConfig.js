/**
 * Centralised site configuration.
 *
 * Single source of truth for company contact details so they can be updated
 * in one place and reused across the contact page, header, footer, legal
 * pages, and forms.
 */

export const siteConfig = {
  companyName: 'Jagannath Holidays',
  legalName: 'Jagannath Holidays Tours',

  contact: {
    // Raw phone number used inside `tel:` links (no spaces).
    phone: '+919583837770',
    // Human-readable phone number shown on the page.
    phoneDisplay: '+91 9583837770',
    // WhatsApp number for wa.me links (digits only, with country code).
    whatsapp: '+919876543210',
    email: 'info@jagannathholidays.com',
    website: 'https://www.jagannathholidays.com',
    websiteDisplay: 'www.jagannathholidays.com',
    address: {
      line1: 'Rasulgarh, Bhubaneswar, 751025, Odisha, India',
      short: 'Rasulgarh, Bhubaneswar, 751025, Odisha, India. Close to NH-16.',
      locality: 'Rasulgarh, Bhubaneswar, Odisha',
    },
    hours: {
      days: 'Monday \u2013 Sunday',
      time: '10:00 AM \u2013 7:00 PM',
      note: 'Emergency 24/7 Helpline available for active travelers',
    },
    mapLink: 'https://maps.google.com/?q=Rasulgarh+Bhubaneswar+Odisha',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14969.574483758153!2d85.83685984606774!3d20.283995876352934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190a07153b3dfb%3A0x6b7724775d0b9806!2sRasulgarh%2C%20Bhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1717320000000!5m2!1sen!2sin',
  },

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61594880006349',
    instagram: 'https://www.instagram.com/jagannathholidays/',
    youtube: 'https://www.youtube.com/@jagannathholidays',
  },
};

/**
 * Build a WhatsApp chat link with a pre-filled message.
 * @param {string} [message]
 * @returns {string}
 */
export function getWhatsAppLink(
  message = 'Hello Jagannath Holidays, I would like to inquire about a tour package.'
) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export default siteConfig;
