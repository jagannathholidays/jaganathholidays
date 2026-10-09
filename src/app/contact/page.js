import BreadcrumbBanner from '@/components/BreadcrumbBanner';
import ContactSection from '@/components/ContactSection';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Contact Us - Customize Tour Packages Itinerary | Jagannath Holidays',
  description: `Planning your dream stopover in Odisha? Don’t worry! Fill out the contact us form on the Jagannath Holidays site or call us directly today!`,
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
