import BreadcrumbBanner from '@/components/BreadcrumbBanner';
import ContactSection from '@/components/ContactSection';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Contact Us | Jagannath Holidays - Odisha Tour & Travel Specialists',
  description: `Connect with Jagannath Holidays for customized Odisha tour packages, Puri Jagannath Dham Darshan, Chilika Lake tours, and cab rentals. Call ${siteConfig.contact.phoneDisplay} or send an inquiry.`,
  keywords:
    'Contact Jagannath Holidays, Odisha tour operator, Puri holiday packages, travel agency Bhubaneswar, Jagannath Dham Yatra booking',
  openGraph: {
    title: 'Contact Us | Jagannath Holidays',
    description:
      'Get in touch with our local Odisha travel experts for customized holiday itineraries, spiritual tours, and travel assistance.',
    images: ['/jaganath-banner.webp'],
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Contact Us' },
  ];

  return (
    <main>
      <BreadcrumbBanner
        title="Contact Us"
        breadcrumbs={breadcrumbs}
        bgImage="/jaganath-banner.webp"
      />
      <ContactSection />
    </main>
  );
}
